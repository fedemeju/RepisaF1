// Escáner: cámara + OCR (Tesseract.js, corre en el celular, sin IA en la nube)
//
// Cómo lee:
//  - En vivo: mira el recuadro cada un ratito. Si la imagen está borrosa no intenta leer y avisa.
//  - Botón disparador: saca una foto con la resolución completa de la cámara (enfoca al sacarla),
//    busca la placa negra en toda la foto y la lee. Es lo más confiable.
//  - "Cámara del celu": usa la app de cámara del teléfono (mejor foco y macro en muchos modelos).
(function () {
  // Solo se reconocen los autos visibles (los "oculto: true" se ignoran)
  const VISIBLES = AUTOS.filter((a) => !a.oculto);
  const $ = (id) => document.getElementById(id);
  const el = {
    root: $("scanner"), video: $("video"), guide: $("guide"), tip: $("guideTip"),
    status: $("scanStatus"), ocr: $("scanOcr"), cands: $("scanCands"),
    torch: $("btnTorch"), close: $("btnCloseScan"), file: $("fileInput"), photo: $("photo"),
    shutter: $("btnShutter"), zoom: $("zoomBar"), ring: $("focusRing")
  };
  let stream = null, track = null, running = false, busy = false, worker = null, workerPromise = null, torchOn = false;
  let recent = [];
  let holdUntil = 0;
  let onFound = () => {};
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function getWorker() {
    if (worker) return Promise.resolve(worker);
    if (!workerPromise) {
      workerPromise = (async () => {
        let tries = 0;
        while (!window.Tesseract) {
          if (++tries > 100) throw new Error("No se pudo cargar el lector de texto (¿sin internet la primera vez?)");
          await sleep(100);
        }
        const w = await Tesseract.createWorker("eng");
        // Solo letras, números, guion y barra: evita lecturas como "200%" o "«©"
        await w.setParameters({
          tessedit_pageseg_mode: "6",
          tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/ "
        });
        worker = w;
        return w;
      })();
      workerPromise.catch(() => { workerPromise = null; });
    }
    return workerPromise;
  }

  // Pasa a gris, invierte si el fondo es oscuro (etiqueta negra) y estira el contraste
  function prep(src, sx, sy, sw, sh, targetW) {
    const scale = Math.max(1, targetW / sw);
    const c = document.createElement("canvas");
    c.width = Math.round(sw * scale); c.height = Math.round(sh * scale);
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(src, sx, sy, sw, sh, 0, 0, c.width, c.height);
    const img = ctx.getImageData(0, 0, c.width, c.height), d = img.data;
    let sum = 0, min = 255, max = 0;
    const g = new Uint8ClampedArray(d.length / 4);
    for (let i = 0, j = 0; i < d.length; i += 4, j++) {
      const v = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      g[j] = v; sum += v;
    }
    const dark = sum / g.length < 110;
    for (let j = 0; j < g.length; j++) { if (dark) g[j] = 255 - g[j]; if (g[j] < min) min = g[j]; if (g[j] > max) max = g[j]; }
    const k = 255 / Math.max(1, max - min);
    for (let i = 0, j = 0; i < d.length; i += 4, j++) {
      const v = (g[j] - min) * k;
      d[i] = d[i + 1] = d[i + 2] = v;
    }
    ctx.putImageData(img, 0, 0);
    return c;
  }

  // Nitidez de una zona: varianza del laplaciano (alto = bordes marcados = enfocado)
  function sharpness(src, sx, sy, sw, sh) {
    const W = 320, H = Math.max(8, Math.round((sh / sw) * W));
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(src, sx, sy, sw, sh, 0, 0, W, H);
    const d = ctx.getImageData(0, 0, W, H).data, g = new Float32Array(W * H);
    for (let i = 0, j = 0; j < g.length; i += 4, j++) g[j] = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    let s = 0, s2 = 0, n = 0;
    for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
      const p = y * W + x, l = 4 * g[p] - g[p - 1] - g[p + 1] - g[p - W] - g[p + W];
      s += l; s2 += l * l; n++;
    }
    return n ? s2 / n - (s / n) ** 2 : 0;
  }
  // Calibrado con fotos reales de etiquetas: se leen con nitidez ≳170 y dejan de leerse ≲150.
  const SHARP_MIN = 120;

  // Rectángulo guía (pantalla) -> coordenadas del video (object-fit: cover)
  function guideToVideo() {
    const v = el.video, vr = v.getBoundingClientRect(), gr = el.guide.getBoundingClientRect();
    const VW = v.videoWidth, VH = v.videoHeight;
    const scale = Math.max(vr.width / VW, vr.height / VH);
    const ox = (vr.width - VW * scale) / 2, oy = (vr.height - VH * scale) / 2;
    const padX = gr.width * 0.06, padY = gr.height * 0.15; // margen por si la etiqueta asoma
    let sx = (gr.left - vr.left - ox - padX) / scale, sy = (gr.top - vr.top - oy - padY) / scale;
    let sw = (gr.width + 2 * padX) / scale, sh = (gr.height + 2 * padY) / scale;
    sx = Math.max(0, sx); sy = Math.max(0, sy);
    sw = Math.min(VW - sx, sw); sh = Math.min(VH - sy, sh);
    return [sx, sy, sw, sh];
  }

  function showCands(ranked) {
    const good = ranked.filter((r) => r.score >= 4).slice(0, 3);
    el.cands.innerHTML = "";
    for (const r of good) {
      const e = r.car.etiqueta;
      const b = document.createElement("button");
      b.className = "btn btn-light";
      b.textContent = `¿${e.equipo} ${e.chasis} · ${e.anio} · ${e.piloto}?`;
      b.onclick = () => found(r.car);
      el.cands.appendChild(b);
    }
  }

  function found(car) {
    el.guide.classList.add("hit");
    if (navigator.vibrate) navigator.vibrate(60);
    setTimeout(() => { close(); onFound(car); }, 250);
  }

  function handleText(text) {
    const clean = text.replace(/\s+/g, " ").trim();
    el.ocr.textContent = clean ? "Leí: " + clean : "";
    if (!clean) return false;
    recent.push(clean); if (recent.length > 3) recent.shift();
    let ranked = Matcher.score(clean, VISIBLES);
    let car = Matcher.decide(ranked);
    if (!car && recent.length > 1) {
      ranked = Matcher.score(recent.join(" "), VISIBLES);
      car = Matcher.decide(ranked);
    }
    if (car) { found(car); return true; }
    showCands(ranked);
    return false;
  }

  // ---------- Lectura en vivo ----------
  async function loop() {
    let w;
    try {
      el.status.textContent = "Preparando lector de texto…";
      w = await getWorker();
    } catch (e) { el.status.textContent = e.message; return; }
    let frame = 0;
    while (running) {
      if (!busy && Date.now() > holdUntil && el.video.readyState >= 2 && el.video.videoWidth) {
        const [sx, sy, sw, sh] = guideToVideo();
        const sh_ = sharpness(el.video, sx, sy, sw, sh);
        const blurry = sh_ < SHARP_MIN;
        el.guide.classList.toggle("blurry", blurry);
        if (blurry) {
          el.status.textContent = "Está borroso: alejá un poco el celu o tocá la pantalla para enfocar";
        } else {
          el.status.textContent = "Leyendo… o tocá el botón para capturar";
          const canvas = prep(el.video, sx, sy, sw, sh, frame++ % 2 ? 900 : 1400);
          try {
            const { data } = await w.recognize(canvas);
            if (!running) break;
            if (!busy && handleText(data.text)) break;
          } catch (e) { console.warn(e); }
        }
      }
      await sleep(blurryDelay());
    }
  }
  const blurryDelay = () => (el.guide.classList.contains("blurry") ? 200 : 300);

  // ---------- Captura con el botón: foto en máxima resolución ----------
  async function grabStill() {
    if (window.ImageCapture && track) {
      try {
        const blob = await new ImageCapture(track).takePhoto();
        return await createImageBitmap(blob);
      } catch (_) { /* algunos celus no lo soportan: uso el cuadro del video */ }
    }
    const c = document.createElement("canvas");
    c.width = el.video.videoWidth; c.height = el.video.videoHeight;
    c.getContext("2d").drawImage(el.video, 0, 0);
    return c;
  }

  async function capture() {
    if (busy || !stream) return;
    busy = true; el.shutter.classList.add("busy");
    el.status.textContent = "Capturando…"; el.cands.innerHTML = "";
    try {
      // dónde estaba el recuadro, en proporción del video
      const VW = el.video.videoWidth, VH = el.video.videoHeight;
      const [gx, gy, gw, gh] = guideToVideo();
      const still = await grabStill();
      const W = still.width, H = still.height;
      // la foto puede tener otra proporción que el video (4:3 vs 16:9): ajusto como recorte centrado
      const s = Math.max(W / VW, H / VH), ox = (W - VW * s) / 2, oy = (H - VH * s) / 2;
      const guided = { x: Math.max(0, gx * s + ox), y: Math.max(0, gy * s + oy), w: Math.min(W, gw * s), h: Math.min(H, gh * s) };
      el.status.textContent = "Leyendo la etiqueta…";
      const w = await getWorker();
      // primero la placa detectada adentro (o cerca) del recuadro, después el recuadro tal cual
      const regions = [...Detector.findLabels(still, W, H, 2), guided];
      const sorted = regions.sort((a, b) => dist(a, guided) - dist(b, guided)).slice(0, 2);
      for (const r of sorted) {
        if (handleText(await readRegion(w, still, r))) return;
      }
      el.status.textContent = sharpness(still, guided.x, guided.y, guided.w, guided.h) < SHARP_MIN
        ? "Salió borrosa. Alejá un poco el celu (o usá el zoom) y probá de nuevo."
        : "No la pude leer. Probá de nuevo, más de frente y sin reflejo.";
    } catch (e) {
      el.status.textContent = "No pude capturar: " + e.message;
    } finally {
      busy = false; el.shutter.classList.remove("busy");
      holdUntil = Date.now() + 3500; // que se llegue a leer el resultado antes de seguir en vivo
    }
  }
  const dist = (a, b) => Math.hypot(a.x + a.w / 2 - (b.x + b.w / 2), a.y + a.h / 2 - (b.y + b.h / 2));

  // ---------- Zoom y enfoque ----------
  function setupZoom(caps) {
    el.zoom.innerHTML = "";
    if (!caps.zoom || caps.zoom.max <= 1.2) { el.zoom.hidden = true; return; }
    const levels = [1, 2, 3].filter((z) => z >= caps.zoom.min && z <= caps.zoom.max);
    const set = (z) => {
      track.applyConstraints({ advanced: [{ zoom: z }] }).catch(() => {});
      el.zoom.querySelectorAll("button").forEach((b) => b.classList.toggle("on", +b.dataset.z === z));
    };
    for (const z of levels) {
      const b = document.createElement("button"); b.dataset.z = z; b.textContent = z + "x";
      b.onclick = (ev) => { ev.stopPropagation(); set(z); };
      el.zoom.appendChild(b);
    }
    el.zoom.hidden = false;
    // arranca en 2x: así se puede alejar el celu a la distancia donde enfoca bien
    set(levels.includes(2) ? 2 : levels[levels.length - 1]);
  }

  function tapToFocus(ev) {
    if (!track || ev.target.closest("button, label")) return;
    const r = el.video.getBoundingClientRect();
    el.ring.style.left = ev.clientX + "px"; el.ring.style.top = ev.clientY + "px";
    el.ring.hidden = false; clearTimeout(tapToFocus.t); tapToFocus.t = setTimeout(() => (el.ring.hidden = true), 900);
    const caps = track.getCapabilities ? track.getCapabilities() : {};
    const adv = {};
    if (caps.focusMode && caps.focusMode.includes("single-shot")) adv.focusMode = "single-shot";
    if ("pointsOfInterest" in (track.getSettings ? track.getSettings() : {}) || caps.pointsOfInterest !== undefined) {
      adv.pointsOfInterest = [{ x: (ev.clientX - r.left) / r.width, y: (ev.clientY - r.top) / r.height }];
    }
    if (Object.keys(adv).length) {
      track.applyConstraints({ advanced: [adv] }).catch(() => {});
      if (adv.focusMode) setTimeout(() => track && track.applyConstraints({ advanced: [{ focusMode: "continuous" }] }).catch(() => {}), 1500);
    }
  }

  async function open(cb) {
    onFound = cb; recent = [];
    el.root.hidden = false; el.guide.classList.remove("hit", "blurry"); el.photo.hidden = true;
    el.cands.innerHTML = ""; el.ocr.textContent = ""; el.zoom.hidden = true; el.shutter.hidden = true;
    el.status.textContent = "Iniciando cámara…";
    getWorker().catch(() => {});
    // Sin https (por ejemplo http://192.168.x.x) el navegador no ofrece cámara en vivo:
    // abrimos directo la cámara del celular para sacar una foto (tiene que ser en el mismo toque).
    if (!window.isSecureContext || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      el.status.textContent = "Sacá una foto de la etiqueta negra.";
      el.ocr.textContent = "La cámara en vivo necesita que la app esté en https.";
      el.file.click();
      return;
    }
    try {
      // pedimos la máxima resolución: el texto de la placa es muy chico
      stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: { ideal: "environment" }, width: { ideal: 3840 }, height: { ideal: 2160 } }
      });
      el.video.srcObject = stream;
      await el.video.play();
      track = stream.getVideoTracks()[0];
      const caps = track.getCapabilities ? track.getCapabilities() : {};
      el.torch.hidden = !caps.torch;
      if (caps.focusMode && caps.focusMode.includes("continuous")) {
        track.applyConstraints({ advanced: [{ focusMode: "continuous" }] }).catch(() => {});
      }
      setupZoom(caps);
      el.shutter.hidden = false;
      running = true;
      loop();
    } catch (e) {
      el.status.textContent = "No pude abrir la cámara en vivo. Usá «Cámara del celu».";
    }
  }

  function close() {
    running = false; busy = false;
    if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; }
    track = null;
    el.video.srcObject = null;
    el.photo.hidden = true; el.photo.onclick = null;
    el.root.hidden = true; torchOn = false;
  }

  // Lee un recorte dos veces a distinto tamaño: cada lectura se equivoca distinto
  // y juntas suelen tener el dato bien escrito al menos una vez.
  async function readRegion(w, img, r) {
    let text = "";
    for (const width of [1400, 900]) {
      const { data } = await w.recognize(prep(img, r.x, r.y, r.w, r.h, width));
      text += " " + data.text;
    }
    return text;
  }

  // Muestra la foto para que el usuario toque la etiqueta
  function askTap(img, w) {
    const cv = el.photo, k = Math.min(innerWidth / img.width, (innerHeight - 220) / img.height);
    cv.width = img.width; cv.height = img.height;
    cv.style.width = img.width * k + "px"; cv.style.height = img.height * k + "px";
    cv.getContext("2d").drawImage(img, 0, 0);
    cv.hidden = false;
    el.status.textContent = "Tocá la etiqueta negra en la foto";
    cv.onclick = async (ev) => {
      ev.stopPropagation();
      const rect = cv.getBoundingClientRect();
      const px = (ev.clientX - rect.left) / rect.width * img.width;
      const py = (ev.clientY - rect.top) / rect.height * img.height;
      el.status.textContent = "Leyendo…";
      // primero busca la placa cerca del toque; si no, recorta una franja alrededor
      const near = Detector.findLabels(img, img.width, img.height, 5)
        .filter((r) => px >= r.x - 20 && px <= r.x + r.w + 20 && py >= r.y - 20 && py <= r.y + r.h + 20);
      const bw = img.width * 0.42, bh = bw / 4;
      const region = near[0] || { x: Math.max(0, px - bw / 2), y: Math.max(0, py - bh / 2), w: bw, h: bh };
      const text = await readRegion(w, img, region);
      if (!handleText(text)) {
        el.status.textContent = Matcher.score(text, VISIBLES)[0]?.score >= 4 ? "¿Es alguno de estos?" : "No la pude leer. Tocá de nuevo o sacá otra foto más cerca.";
      }
    };
  }

  async function fromPhoto(file) {
    running = false;
    if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; track = null; }
    el.zoom.hidden = true; el.shutter.hidden = true;
    el.status.textContent = "Buscando la etiqueta en la foto…";
    el.cands.innerHTML = ""; el.ocr.textContent = ""; recent = [];
    const img = await createImageBitmap(file);
    try {
      const w = await getWorker();
      const regions = Detector.findLabels(img, img.width, img.height, 2);
      for (const r of regions) {
        const text = await readRegion(w, img, r);
        if (handleText(text)) return;
      }
      askTap(img, w);
    } catch (e) { el.status.textContent = e.message; }
  }

  el.close.onclick = close;
  el.shutter.onclick = (ev) => { ev.stopPropagation(); capture(); };
  el.video.addEventListener("click", tapToFocus);
  el.file.onchange = () => { const f = el.file.files[0]; el.file.value = ""; if (f) fromPhoto(f); };
  el.torch.onclick = async (ev) => {
    ev.stopPropagation();
    if (!track) return;
    torchOn = !torchOn;
    track.applyConstraints({ advanced: [{ torch: torchOn }] }).catch(() => {});
  };

  window.Scanner = { open, close, fromPhoto, set onFound(f) { onFound = f; }, _sharpness: sharpness };
})();
