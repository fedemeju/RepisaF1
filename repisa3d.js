// Repisa en 3D: el mueble de verdad (10 filas × 6 columnas) con cada auto en su lugar.
// Sin librerías: transformaciones 3D de CSS. Cada auto es su foto de catálogo (repisa-salvat/<fila>-<col>.jpg);
// si falta, la foto de su cajita en el mueble (repisa/<fila>-<col>.webp).
//   - Arrastrar: gira el mueble. Con zoom: lo mueve.
//   - Pellizcar o los botones: acerca. Doble toque: acerca ahí / vuelve.
//   - Inclinar el celu: el mueble se mueve un poco (profundidad).
//   - Tocar un auto: la cajita sale para adelante y abajo aparece su ficha corta.
(function () {
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const IDLE = { rx: 4, ry: -10 };
  // El mueble se arma K veces más grande y se achica con la cámara: el navegador dibuja cada
  // cajita a su tamaño en el armado, así al acercar se ve nítida (al revés se ve pixelada).
  const K = 3;
  let saved = null; // vista que queda al salir (para volver al mismo lugar)

  function mount(view, api) {
    const R = window.REPISA;
    // De dónde salen las fotos de cada lugar: repisa-salvat/ (fotos de catálogo) o, con
    // { dir: "repisa", ext: "webp" }, los recortes de la foto del mueble. Si falta una, se usa la del mueble.
    const F = api.fotos || { dir: "repisa-salvat", ext: "jpg" };
    view.innerHTML = `
      <section class="r3d${F.dir !== "repisa" ? " r3d-cat" : ""}">
        <div class="r3d-stage" id="r3dStage">
          <div class="r3d-cam" id="r3dCam"><div class="r3d-world" id="r3dWorld"><div class="r3d-shelf" id="r3dShelf"></div></div></div>
          <p class="r3d-hint" id="r3dHint">Arrastrá para girar · pellizcá para acercar · tocá un auto</p>
          <div class="r3d-zoom">
            <button id="r3dIn" aria-label="Acercar">+</button>
            <button id="r3dOut" aria-label="Alejar">−</button>
            <button id="r3dReset" aria-label="Ver el mueble entero">⟲</button>
          </div>
        </div>
        <div class="r3d-panel" id="r3dPanel" hidden></div>
      </section>`;
    const $ = (id) => document.getElementById(id);
    const stage = $("r3dStage"), cam = $("r3dCam"), world = $("r3dWorld"), shelf = $("r3dShelf"), panel = $("r3dPanel");

    // ---------- medidas ----------
    let W, H, cw, ch, D, t;
    function build() {
      const avail = stage.clientWidth - 28;
      W = Math.min(avail, 820) * K; cw = W / R.columnas; ch = cw * 0.48; H = ch * R.filas;
      D = cw * 0.62; t = Math.max(3 * K, cw * 0.05);
      const Hv = H / K;
      stage.style.height = Math.round(Math.min(Hv + 120, innerHeight - 150 > Hv + 40 ? innerHeight - 150 : Hv + 120)) + "px";
      shelf.style.setProperty("--k", K);
      shelf.style.width = W + "px"; shelf.style.height = H + "px";
      shelf.style.left = -W / 2 + "px"; shelf.style.top = -H / 2 + "px";
      let html = `<div class="r3d-back" style="width:${W}px;height:${H}px;transform:translateZ(${-D}px)"></div>`;
      // Paredes y estantes en pedazos de un compartimento: así ningún plano atraviesa a otro
      // (si se cruzan, el navegador los dibuja cortados en triángulos).
      for (let i = 0; i <= R.columnas; i++) {
        // dos caras por pared: la que mira a la derecha y la que mira a la izquierda (distinta luz)
        for (let r = 0; r < R.filas; r++) for (const [cls, a] of [["r", 90], ["l", -90]]) html += `<div class="r3d-div ${cls}" style="left:${i * cw - D / 2}px;top:${r * ch}px;width:${D}px;height:${ch}px;transform:translateZ(${-D / 2}px) rotateY(${a}deg)"></div>`;
        html += `<div class="r3d-edge v${i === 0 || i === R.columnas ? " outer" : ""}" style="left:${i * cw - t / 2}px;width:${t}px;height:${H}px"></div>`;
      }
      for (let j = 0; j <= R.filas; j++) {
        // cara de arriba (donde apoya la cajita, con luz) y de abajo (en sombra)
        for (let c = 0; c < R.columnas; c++) for (const [cls, a] of [["top", 90], ["bot", -90]]) html += `<div class="r3d-board ${cls}" style="left:${c * cw}px;top:${j * ch - D / 2}px;width:${cw}px;height:${D}px;transform:translateZ(${-D / 2}px) rotateX(${a}deg)"></div>`;
        html += `<div class="r3d-edge h${j === 0 || j === R.filas ? " outer" : ""}" style="top:${j * ch - t / 2}px;width:${W}px;height:${t}px"></div>`;
      }
      R.lugares.forEach((fila, r) => fila.forEach((id, c) => {
        const car = id && api.byId[id];
        const key = `${r + 1}-${c + 1}`;
        const label = car ? `${car.etiqueta.equipo} ${car.etiqueta.chasis} · ${car.etiqueta.anio} · ${car.etiqueta.piloto}` : (R.sinFicha[key] || "Auto sin ficha");
        html += `<button class="r3d-cell${car ? "" : " sin"}" data-r="${r}" data-c="${c}" aria-label="${label.replace(/"/g, "&quot;")}"
            style="left:${c * cw + t / 2}px;top:${r * ch + t / 2}px;width:${cw - t}px;height:${ch - t}px;--z:${(-D * 0.68).toFixed(1)}px;--dg:${(D * 0.58).toFixed(1)}px;--pop:${(D * 0.55).toFixed(1)}px;--o:${((c - (R.columnas - 1) / 2) * -7 + (r - (R.filas - 1) / 2) * -1.5).toFixed(1)}">
            <span class="r3d-photo"><img src="${F.dir}/${String(r + 1).padStart(2, "0")}-${c + 1}.${F.ext}" alt="" draggable="false" loading="lazy"
              ${F.dir !== "repisa" ? `onerror="this.onerror=null;this.src='repisa/${String(r + 1).padStart(2, "0")}-${c + 1}.webp'"` : ""}></span>
            <span class="r3d-wall l"></span><span class="r3d-wall r"></span><span class="r3d-wall t"></span><span class="r3d-wall b"></span>
            <span class="r3d-glass"></span>
            ${car && api.heard(id) ? '<span class="r3d-b heard" title="Escuchado">✓</span>' : ""}
            ${car && api.fav(id) ? '<span class="r3d-b fav" title="Favorito">★</span>' : ""}
            ${car ? "" : '<span class="r3d-b sin">?</span>'}
          </button>`;
      }));
      shelf.innerHTML = html;
    }

    // ---------- cámara ----------
    const st = saved ? { ...saved } : { rx: IDLE.rx, ry: -26, s: 1, px: 0, py: 0 };
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    let sel = null, before = null;
    function apply() {
      const k = st.s / K;
      cam.style.transform = `translate(${st.px}px, ${st.py}px) scale3d(${k}, ${k}, ${k})`;
      world.style.transform = `rotateX(${(st.rx + tilt.x).toFixed(2)}deg) rotateY(${(st.ry + tilt.y).toFixed(2)}deg)`;
      // reflejo del acrílico: la franja de luz se corre al girar el mueble o inclinar el celu
      shelf.style.setProperty("--g", ((st.ry + tilt.y) * 1.2 - (st.rx + tilt.x) * 0.6 + st.px / 40).toFixed(1));
    }
    function animate(on) { stage.classList.toggle("anim", on); }
    function limitPan() {
      const mx = Math.max(0, (W / K * st.s - stage.clientWidth) / 2 + 40), my = Math.max(0, (H / K * st.s - stage.clientHeight) / 2 + 60);
      st.px = clamp(st.px, -mx, mx); st.py = clamp(st.py, -my, my);
    }
    function zoomTo(s, cx = 0, cy = 0) { // cx, cy: punto de la pantalla (relativo al centro) que queda fijo
      const k = s / st.s;
      st.px = cx - (cx - st.px) * k; st.py = cy - (cy - st.py) * k; st.s = s;
      if (s <= 1.001) { st.px = 0; st.py = 0; }
      limitPan();
    }

    build();
    apply();
    if (!saved) requestAnimationFrame(() => { animate(true); st.ry = IDLE.ry; apply(); setTimeout(() => animate(false), 900); });

    // ---------- selección ----------
    function select(cell) {
      const r = +cell.dataset.r, c = +cell.dataset.c, id = R.lugares[r][c];
      if (sel === cell) return openCar(id);
      if (sel) sel.classList.remove("pop"); else before = { ...st };
      sel = cell; cell.classList.add("pop");
      const s = clamp((stage.clientWidth * 0.78) / (cw / K), 1.6, 3.2);
      const cx = ((c + 0.5) * cw - W / 2) / K, cy = ((r + 0.5) * ch - H / 2) / K;
      animate(true);
      st.s = s; st.px = -cx * s; st.py = -cy * s - stage.clientHeight * 0.12; st.rx = 2; st.ry = 0;
      apply();
      setTimeout(() => animate(false), 650);
      showPanel(r, c, id);
    }
    function deselect() {
      if (!sel) return;
      sel.classList.remove("pop"); sel = null; panel.hidden = true;
      animate(true); Object.assign(st, before || { rx: IDLE.rx, ry: IDLE.ry, s: 1, px: 0, py: 0 }); apply();
      setTimeout(() => animate(false), 650);
    }
    function openCar(id, autoplay) {
      if (!id) return;
      saved = { ...st }; if (before) saved = { ...before };
      api.open(id, autoplay);
    }
    function showPanel(r, c, id) {
      const car = id && api.byId[id];
      if (!car) {
        panel.innerHTML = `<button class="r3d-x" aria-label="Cerrar">×</button>
          <div class="r3d-k">Fila ${r + 1} · lugar ${c + 1}</div>
          <h3>${R.sinFicha[`${r + 1}-${c + 1}`] || "Auto sin ficha"}</h3>
          <p class="r3d-sub">Todavía no está cargado en la app. Sacale una foto a su etiqueta y lo sumamos.</p>`;
      } else {
        const e = car.etiqueta;
        panel.innerHTML = `<button class="r3d-x" aria-label="Cerrar">×</button>
          <div class="r3d-k">${e.anio} · ${e.equipo}${api.isChampion(car) ? ' · <span class="gold">Campeón</span>' : ""}</div>
          <h3>${e.chasis}</h3>
          <p class="r3d-sub">${e.piloto}${e.carrera ? ` · ${e.carrera}` : ""}</p>
          <div class="r3d-act">
            ${api.hasAudio(id) ? `<button class="btn-play" id="r3dPlay">▶ Escuchar la historia</button>` : ""}
            <button class="btn-ficha" id="r3dOpen">Ver ficha ›</button>
          </div>`;
        const pl = document.getElementById("r3dPlay");
        if (pl) pl.onclick = () => openCar(id, true);
        document.getElementById("r3dOpen").onclick = () => openCar(id, false);
      }
      panel.querySelector(".r3d-x").onclick = deselect;
      panel.hidden = false;
    }

    // ---------- gestos ----------
    const pts = new Map();
    let gesture = null, lastTap = 0;
    const center = () => { const b = stage.getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; };
    stage.addEventListener("pointerdown", (ev) => {
      if (ev.target.closest(".r3d-zoom")) return;
      stage.setPointerCapture(ev.pointerId);
      pts.set(ev.pointerId, { x: ev.clientX, y: ev.clientY, x0: ev.clientX, y0: ev.clientY, t0: Date.now() });
      askGyro();
      $("r3dHint").classList.add("gone");
      if (pts.size === 2) {
        const [a, b] = [...pts.values()];
        gesture = { pinch: true, d0: Math.hypot(a.x - b.x, a.y - b.y), s0: st.s, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
      } else gesture = { pinch: false, moved: false };
    });
    stage.addEventListener("pointermove", (ev) => {
      const p = pts.get(ev.pointerId); if (!p) return;
      const dx = ev.clientX - p.x, dy = ev.clientY - p.y; p.x = ev.clientX; p.y = ev.clientY;
      if (Math.hypot(p.x - p.x0, p.y - p.y0) > 8) gesture.moved = true;
      if (gesture.pinch && pts.size === 2) {
        const [a, b] = [...pts.values()];
        const [cx, cy] = center();
        zoomTo(clamp(gesture.s0 * Math.hypot(a.x - b.x, a.y - b.y) / gesture.d0, 1, 4.5), gesture.mx - cx, gesture.my - cy);
        apply(); return;
      }
      if (!gesture.moved || sel) return;
      if (st.s > 1.05) { st.px += dx; st.py += dy; limitPan(); st.ry = clamp(st.ry + dx * 0.04, -30, 30); }
      else { st.ry = clamp(st.ry + dx * 0.22, -38, 38); st.rx = clamp(st.rx - dy * 0.18, -28, 28); }
      apply();
    });
    const up = (ev) => {
      const p = pts.get(ev.pointerId); if (!p) return;
      pts.delete(ev.pointerId);
      if (gesture && !gesture.pinch && !gesture.moved && Date.now() - p.t0 < 400) {
        const cell = document.elementFromPoint(ev.clientX, ev.clientY)?.closest(".r3d-cell");
        const now = Date.now();
        if (cell) select(cell);
        else if (sel) deselect();
        else if (now - lastTap < 320) { // doble toque en el mueble: acercar ahí o volver
          const [cx, cy] = center();
          animate(true); zoomTo(st.s > 1.3 ? 1 : 2.4, ev.clientX - cx, ev.clientY - cy); apply(); setTimeout(() => animate(false), 500);
        }
        lastTap = now;
      }
      if (pts.size === 0) gesture = null;
    };
    stage.addEventListener("pointerup", up);
    stage.addEventListener("pointercancel", up);
    const step = (k) => { animate(true); zoomTo(clamp(st.s * k, 1, 4.5)); apply(); setTimeout(() => animate(false), 400); };
    $("r3dIn").onclick = () => step(1.5);
    $("r3dOut").onclick = () => step(1 / 1.5);
    $("r3dReset").onclick = () => { if (sel) { sel.classList.remove("pop"); sel = null; panel.hidden = true; } animate(true); Object.assign(st, { rx: IDLE.rx, ry: IDLE.ry, s: 1, px: 0, py: 0 }); apply(); setTimeout(() => animate(false), 600); };

    // ---------- inclinar el celu ----------
    let raf = 0, gyroAsked = false;
    function onTilt(e) {
      if (e.gamma == null) return;
      tilt.ty = clamp(e.gamma * 0.35, -10, 10);
      tilt.tx = clamp(-(e.beta - 45) * 0.25, -8, 8);
      if (!raf) raf = requestAnimationFrame(loop);
    }
    function loop() {
      raf = 0;
      tilt.x += (tilt.tx - tilt.x) * 0.12; tilt.y += (tilt.ty - tilt.y) * 0.12;
      if (!stage.classList.contains("anim")) apply();
      if (Math.abs(tilt.tx - tilt.x) + Math.abs(tilt.ty - tilt.y) > 0.05) raf = requestAnimationFrame(loop);
    }
    function askGyro() {
      if (gyroAsked) return; gyroAsked = true;
      const D = window.DeviceOrientationEvent;
      if (D && typeof D.requestPermission === "function") D.requestPermission().then((r) => r === "granted" && addEventListener("deviceorientation", onTilt)).catch(() => {});
    }
    if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== "function") addEventListener("deviceorientation", onTilt);

    const onResize = () => { build(); limitPan(); apply(); };
    addEventListener("resize", onResize);
    return () => { // al salir de la pantalla
      removeEventListener("resize", onResize); removeEventListener("deviceorientation", onTilt);
      if (raf) cancelAnimationFrame(raf);
      if (!saved) saved = { ...(before || st) };
    };
  }

  window.Repisa3D = { mount, reset: () => { saved = null; } };
})();
