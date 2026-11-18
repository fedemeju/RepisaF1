// Escáner: cámara + OCR (Tesseract.js, corre en el celular, sin IA en la nube)
(function () {
  const $ = (id) => document.getElementById(id);
  const el = {
    root: $("scanner"), video: $("video"), guide: $("guide"),
    status: $("scanStatus"), ocr: $("scanOcr"), cands: $("scanCands"),
    torch: $("btnTorch"), close: $("btnCloseScan"), file: $("fileInput"), photo: $("photo")
  };
  let stream = null, running = false, worker = null, workerPromise = null, torchOn = false;
  let recent = [];
  let onFound = () => {};

  function getWorker() {
    if (worker) return Promise.resolve(worker);
    if (!workerPromise) {
      workerPromise = (async () => {
        let tries = 0;
        while (!window.Tesseract) {
          if (++tries > 100) throw new Error("No se pudo cargar el lector de texto (¿sin internet la primera vez?)");
          await new Promise((r) => setTimeout(r, 100));
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

  // Rectángulo guía (pantalla) -> coordenadas del video (object-fit: cover)
  function guideToVideo() {
    const v = el.video, vr = v.getBoundingClientRect(), gr = el.guide.getBoundingClientRect();
    const VW = v.videoWidth, VH = v.videoHeight;
    const scale = Math.max(vr.width / VW, vr.height / VH);
    const ox = (vr.width - VW * scale) / 2, oy = (vr.height - VH * scale) / 2;
    // margen extra por si la etiqueta asoma del recuadro
    const padX = gr.width * 0.06, padY = gr.height * 0.15;
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
    let ranked = Matcher.score(clean, AUTOS);
    let car = Matcher.decide(ranked);
    if (!car && recent.length > 1) {
      ranked = Matcher.score(recent.join(" "), AUTOS);
      car = Matcher.decide(ranked);
    }
    if (car) { found(car); return true; }
    showCands(ranked);
    return false;
  }

  async function loop() {
    let w;
    try {
      el.status.textContent = "Preparando lector de texto…";
      w = await getWorker();
    } catch (e) { el.status.textContent = e.message; return; }
    el.status.textContent = "Buscando la etiqueta…";
    let frame = 0;
    while (running) {
      if (el.video.readyState >= 2 && el.video.videoWidth) {
        const [sx, sy, sw, sh] = guideToVideo();
        // alterna tamaños entre cuadros; las últimas lecturas se combinan en handleText
        const canvas = prep(el.video, sx, sy, sw, sh, frame++ % 2 ? 900 : 1400);
        try {
          const { data } = await w.recognize(canvas);
          if (!running) break;
          if (handleText(data.text)) break;
        } catch (e) { console.warn(e); }
      }
      await new Promise((r) => setTimeout(r, 250));
    }
  }

  async function open(cb) {
    onFound = cb; recent = [];
    el.root.hidden = false; el.guide.classList.remove("hit"); el.photo.hidden = true;
    el.cands.innerHTML = ""; el.ocr.textContent = "";
    el.status.textContent = "Iniciando cámara…";
    getWorker().catch(() => {});
    // Sin https (por ejemplo http://192.168.x.x) el navegador no ofrece cámara en vivo:
    // abrimos directo la cámara del celular para sacar una foto (tiene que ser en el mismo toque).
    if (!window.isSecureContext || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      el.status.textContent = "Sacá una foto de cerca de la etiqueta negra.";
      el.ocr.textContent = "La cámara en vivo necesita que la app esté en https.";
      el.file.click();
      return;
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
      el.video.srcObject = stream;
      await el.video.play();
      const track = stream.getVideoTracks()[0];
      const caps = track.getCapabilities ? track.getCapabilities() : {};
      el.torch.hidden = !caps.torch;
      if (caps.focusMode && caps.focusMode.includes("continuous")) {
        track.applyConstraints({ advanced: [{ focusMode: "continuous" }] }).catch(() => {});
      }
      running = true;
      loop();
    } catch (e) {
      el.status.textContent = "No pude abrir la cámara en vivo. Usá «Sacar foto».";
    }
  }

  function close() {
    running = false;
    if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; }
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
        el.status.textContent = Matcher.score(text, AUTOS)[0]?.score >= 4 ? "¿Es alguno de estos?" : "No la pude leer. Tocá de nuevo o sacá otra foto más cerca.";
      }
    };
  }

  async function fromPhoto(file) {
    running = false;
    if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; }
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
  el.file.onchange = () => { const f = el.file.files[0]; el.file.value = ""; if (f) fromPhoto(f); };
  el.torch.onclick = async () => {
    const t = stream && stream.getVideoTracks()[0]; if (!t) return;
    torchOn = !torchOn;
    t.applyConstraints({ advanced: [{ torch: torchOn }] }).catch(() => {});
  };

  window.Scanner = { open, close, fromPhoto, set onFound(f) { onFound = f; } };
})();
