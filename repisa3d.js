// Repisa en 3D: el mueble de verdad (10 filas × 6 columnas) con cada auto en su lugar.
// Sin librerías: transformaciones 3D de CSS. Cada auto es su foto de catálogo (repisa-salvat/<fila>-<col>.jpg);
// si falta, la foto de su cajita en el mueble (repisa/<fila>-<col>.webp).
//   - Arrastrar: gira el mueble. Con zoom: lo mueve.
//   - Pellizcar o los botones: acerca. Doble toque: acerca ahí / vuelve.
//   - Inclinar el celu: el mueble se mueve un poco (profundidad).
//   - Tocar un auto: la cajita sale para adelante y abajo aparece su ficha corta.
//   - Mantener apretado un auto (o el botón ⇄): modo ordenar, para intercambiar autos de lugar.
(function () {
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  const IDLE = { rx: 4, ry: -10 };
  // El mueble se arma K veces más grande y se achica con la cámara: el navegador dibuja cada
  // cajita a su tamaño en el armado, así al acercar se ve nítida (al revés se ve pixelada).
  // En el celu (pantalla táctil) va el modo liviano: menos sobremuestreo (K), cajas sin paredes de
  // acrílico y el reflejo se acomoda recién cuando dejás de mover. Con todo, el celu se queda sin memoria
  // de video y los autos titilan.
  const LITE = matchMedia("(pointer: coarse)").matches;
  const K = LITE ? 2 : 3;
  // zoom máximo: en el celu la repisa entera mide ~350 px, así que deja acercar más para leer las placas
  const ZMAX = LITE ? 6.5 : 4.5;
  let saved = null; // vista que queda al salir (para volver al mismo lugar)

  // ---------- orden de los autos ----------
  // data/repisa.js es el orden original (y las fotos repisa/ y repisa-salvat/ están nombradas por ese
  // lugar original). Si reordenás desde la app, el orden nuevo se guarda en este celu/compu; cada auto
  // sigue usando la foto de su lugar original. Los lugares sin ficha se anotan "@fila-columna".
  const ORDEN_KEY = "repisa-orden";
  const pad = (n) => String(n).padStart(2, "0");
  function original() {
    return window.REPISA.lugares.map((fila, r) => fila.map((id, c) => id || `@${r + 1}-${c + 1}`));
  }
  function orden() {
    const base = original();
    try {
      const s = JSON.parse(localStorage.getItem(ORDEN_KEY) || "null");
      const ok = Array.isArray(s) && s.length === base.length && s.every((f, r) => Array.isArray(f) && f.length === base[r].length)
        && JSON.stringify(s.flat().slice().sort()) === JSON.stringify(base.flat().slice().sort());
      if (ok) return s;
    } catch (_) {}
    return base;
  }
  function guardarOrden(L) {
    try {
      if (JSON.stringify(L) === JSON.stringify(original())) localStorage.removeItem(ORDEN_KEY);
      else localStorage.setItem(ORDEN_KEY, JSON.stringify(L));
    } catch (_) {}
  }
  const idDe = (tok) => (tok && tok[0] !== "@" ? tok : null);

  function mount(view, api) {
    const R = window.REPISA;
    let L = orden();
    // foto de cada auto = la de su lugar original
    const foto = {};
    original().forEach((fila, r) => fila.forEach((tok, c) => { foto[tok] = `${pad(r + 1)}-${c + 1}`; }));
    // De dónde salen las fotos de cada lugar: repisa-salvat/ (fotos de catálogo) o, con
    // { dir: "repisa", ext: "webp" }, los recortes de la foto del mueble. Si falta una, se usa la del mueble.
    const F = api.fotos || { dir: "repisa-salvat", ext: "jpg" };
    view.innerHTML = `
      <section class="r3d${F.dir !== "repisa" ? " r3d-cat" : ""}">
        <div class="r3d-stage" id="r3dStage">
          <div class="r3d-cam" id="r3dCam"><div class="r3d-world" id="r3dWorld"><div class="r3d-shelf" id="r3dShelf"></div></div></div>
          <p class="r3d-hint" id="r3dHint">Arrastrá para girar · tocá un auto para verlo</p>
          <div class="r3d-editbar" id="r3dEditBar" hidden>
            <span>Arrastrá un auto sobre otro (o tocá los dos) para intercambiarlos</span>
            <button id="r3dEditReset">Orden original</button>
            <button id="r3dEditOk" class="ok">Listo</button>
          </div>
          <div class="r3d-zoom">
            <button id="r3dIn" aria-label="Acercar">+</button>
            <button id="r3dOut" aria-label="Alejar">−</button>
            <button id="r3dReset" aria-label="Ver el mueble entero">⟲</button>
            <button id="r3dEdit" aria-label="Ordenar los autos">⇄</button>
            ${api.startTour ? '<button id="r3dTour" class="r3d-tourbtn" aria-label="Recorrido guiado: la repisa se cuenta sola">▶</button>' : ""}
          </div>
        </div>
        <div class="r3d-panel" id="r3dPanel" hidden></div>
      </section>`;
    const $ = (id) => document.getElementById(id);
    const stage = $("r3dStage"), cam = $("r3dCam"), world = $("r3dWorld"), shelf = $("r3dShelf"), panel = $("r3dPanel");

    // ---------- la habitación: pared blanca atrás, piso gris donde se refleja el mueble ----------
    // Pared y piso son planos grandes de puro degradé: se dibujan chicos y se agrandan (SC), así no pesan.
    // El reflejo es real: una copia invertida de las dos filas de abajo, colgada debajo del piso, que se
    // ve a través del piso (semitransparente). Debajo hay un contrapiso opaco.
    const SC = 8;
    function room() {
      const ft = H + t / 2, FD = D + 3 + 700 * K, RH = 2 * ch, z0 = -D - 3;
      const plano = (cls, top, h, tf, extra = "") =>
        `<div class="r3d-room ${cls}" style="left:${-2 * W}px;top:${top}px;width:${(5 * W) / SC}px;height:${h / SC}px;transform:${tf} scale(${SC});${extra}"></div>`;
      let refl = "";
      for (let k = 0; k < 2; k++) L[R.filas - 2 + k].forEach((tok, c) => {
        refl += `<i style="left:${c * cw + t / 2}px;top:${k * ch + t / 2}px;width:${cw - t}px;height:${ch - t}px"><img src="${F.dir}/${foto[tok]}.${F.ext}" alt="" loading="lazy"></i>`;
      });
      return plano("wall", -1.6 * H, 2.6 * H + t / 2, `translateZ(${z0}px)`) +
        `<div class="r3d-room wsh" style="left:${-t / 2}px;top:${-t / 2}px;width:${W + t}px;height:${ft + t / 2}px;transform:translateZ(${z0 + 1}px)"></div>` +
        plano("sub", ft + RH + 2, FD, `translateZ(${z0}px) rotateX(90deg)`) +
        `<div class="r3d-refl" style="left:0;top:${ft}px;width:${W}px;height:${RH}px;transform:translateZ(${(-D * 0.1).toFixed(1)}px)"><div class="r3d-refl-in">${refl}</div></div>` +
        plano("floor", ft, FD, `translateZ(${z0}px) rotateX(90deg)`, `--sw:${((W * 0.62) / SC).toFixed(1)}px;--sd:${((D + 3) / SC).toFixed(1)}px`);
    }

    // ---------- medidas ----------
    let W, H, cw, ch, D, t, OY = 0; // OY: el mueble va un poco más arriba del centro (px de pantalla)
    function build() {
      const avail = stage.clientWidth - 28;
      // el mueble un poco más chico que el ancho, para que se vea la habitación alrededor
      W = Math.min(avail * 0.88, 760) * K; cw = W / R.columnas; ch = cw * 0.48; H = ch * R.filas;
      D = cw * 0.62; t = Math.max(3 * K, cw * 0.05);
      const Hv = H / K, piso = Math.min(140, Hv * 0.22); // lo que se ve de piso debajo del mueble
      stage.style.height = Math.round(Hv + piso + 70) + "px";
      shelf.style.setProperty("--k", K);
      shelf.style.width = W + "px"; shelf.style.height = H + "px";
      // centrado un poco más arriba: abajo queda lugar para el piso y el reflejo
      OY = -(piso - 70) / 2;
      shelf.style.left = -W / 2 + "px"; shelf.style.top = -H / 2 + OY * K + "px";
      let html = room() + `<div class="r3d-back" style="width:${W}px;height:${H}px;transform:translateZ(${-D}px)"></div>`;
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
      L.forEach((fila, r) => fila.forEach((tok, c) => {
        const id = idDe(tok), car = id && api.byId[id];
        const fk = foto[tok]; // foto (lugar original) de este auto
        const label = car ? `${car.etiqueta.equipo} ${car.etiqueta.chasis} · ${car.etiqueta.anio} · ${car.etiqueta.piloto}` : (R.sinFicha[tok.slice(1)] || "Auto sin ficha");
        html += `<button class="r3d-cell${car ? "" : " sin"}" data-r="${r}" data-c="${c}" aria-label="${label.replace(/"/g, "&quot;")}"
            style="left:${c * cw + t / 2}px;top:${r * ch + t / 2}px;width:${cw - t}px;height:${ch - t}px;--z:${(-D * 0.68).toFixed(1)}px;--dg:${(D * 0.58).toFixed(1)}px;--pop:${(D * 0.55).toFixed(1)}px;--o:${((c - (R.columnas - 1) / 2) * -7 + (r - (R.filas - 1) / 2) * -1.5).toFixed(1)}">
            <span class="r3d-photo"><img src="${F.dir}/${fk}.${F.ext}" alt="" draggable="false" loading="lazy"
              ${F.dir !== "repisa" ? `onerror="this.onerror=null;this.src='repisa/${fk}.webp'"` : ""}></span>
            ${LITE ? "" : '<span class="r3d-wall l"></span><span class="r3d-wall r"></span><span class="r3d-wall t"></span>'}<span class="r3d-floor"></span>
            <span class="r3d-glass"></span>
            <span class="r3d-base"><span class="r3d-plate">${car
              ? `<b>${esc(`${car.etiqueta.equipo} ${car.etiqueta.chasis} - ${car.etiqueta.anio}`)}</b><i>${esc(car.etiqueta.piloto)}</i>`
              : `<b>${esc(label)}</b>`}</span></span>
            ${car && api.heard(id) ? '<span class="r3d-b heard" title="Escuchado">✓</span>' : ""}
            ${car && api.fav(id) ? '<span class="r3d-b fav" title="Favorito">★</span>' : ""}
            ${car ? "" : '<span class="r3d-b sin">?</span>'}
          </button>`;
      }));
      shelf.innerHTML = html;
      if (editing) growForEdit(); // build vuelve a medir el escenario
    }

    // ---------- cámara ----------
    const st = saved ? { ...saved } : { rx: IDLE.rx, ry: -26, s: 1, px: 0, py: 0 };
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    let sel = null, before = null, glareT = 0, editing = false;
    function apply() {
      const k = st.s / K;
      cam.style.transform = `translate(${st.px}px, ${st.py}px) scale3d(${k}, ${k}, ${k})`;
      world.style.transform = `rotateX(${Math.min(st.rx + tilt.x, rxMax()).toFixed(2)}deg) rotateY(${(st.ry + tilt.y).toFixed(2)}deg)`;
      // reflejo del acrílico: la franja de luz se corre al girar el mueble o inclinar el celu
      const g = ((st.ry + tilt.y) * 1.2 - (st.rx + tilt.x) * 0.6 + st.px / 40).toFixed(1);
      if (!LITE) shelf.style.setProperty("--g", g);
      else { clearTimeout(glareT); glareT = setTimeout(() => shelf.style.setProperty("--g", g), 250); }
    }
    // rx positivo = mirar desde abajo. Hasta dónde se puede sin que la cámara baje del nivel del piso
    // (si baja, el piso tapa las filas de abajo). Depende del zoom: de cerca la cámara está más cerca.
    function rxMax() {
      const piso = H / 2 + t / 2 + OY * K, cam = (1100 * K) / st.s;
      return (Math.asin(Math.min(1, piso / cam)) * 180) / Math.PI - 1.5;
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
    // user: lo tocó la persona (no el recorrido guiado)
    function select(cell, user) {
      const r = +cell.dataset.r, c = +cell.dataset.c, tok = L[r][c], id = idDe(tok);
      if (user && id && api.onTap && api.onTap(id)) return;
      if (sel === cell) return user ? openCar(id) : undefined;
      if (sel) sel.classList.remove("pop"); else before = { ...st };
      sel = cell; cell.classList.add("pop");
      const s = clamp((stage.clientWidth * 0.78) / (cw / K), 1.6, LITE ? 4.6 : 3.2);
      const cx = ((c + 0.5) * cw - W / 2) / K, cy = ((r + 0.5) * ch - H / 2) / K + OY;
      animate(true);
      st.s = s; st.px = -cx * s; st.py = -cy * s - stage.clientHeight * 0.12; st.rx = 2; st.ry = 0;
      apply();
      setTimeout(() => animate(false), 650);
      showPanel(r, c, id, tok);
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
    function showPanel(r, c, id, tok) {
      const car = id && api.byId[id];
      if (!car) {
        panel.innerHTML = `<button class="r3d-x" aria-label="Cerrar">×</button>
          <div class="r3d-k">Fila ${r + 1} · lugar ${c + 1}</div>
          <h3>${esc(R.sinFicha[tok.slice(1)] || "Auto sin ficha")}</h3>
          <p class="r3d-sub">Todavía no está cargado en la app. Sacale una foto a su etiqueta y lo sumamos.</p>`;
      } else {
        const e = car.etiqueta;
        panel.innerHTML = `<button class="r3d-x" aria-label="Cerrar">×</button>
          <div class="r3d-k">${e.anio} · ${e.equipo}${api.isChampion(car) ? ' · <span class="gold">Campeón</span>' : ""}</div>
          <h3>${e.chasis}</h3>
          <p class="r3d-sub">${e.piloto}${e.carrera ? ` · ${e.carrera}` : ""}</p>
          <div class="r3d-act">
            ${api.touring && api.touring() ? '<span class="r3d-now"><i></i>Contando su historia</span>'
              : api.hasAudio(id) ? `<button class="btn-play" id="r3dPlay">▶ Escuchar la historia</button>` : ""}
            <button class="btn-ficha" id="r3dOpen">Ver ficha ›</button>
          </div>`;
        const pl = document.getElementById("r3dPlay");
        if (pl) pl.onclick = () => openCar(id, true);
        document.getElementById("r3dOpen").onclick = () => openCar(id, false);
      }
      panel.querySelector(".r3d-x").onclick = deselect;
      panel.hidden = false;
    }

    // ---------- ordenar los autos ----------
    // Mantener apretado un auto (o el botón ⇄) entra en "modo ordenar": el mueble se pone de frente,
    // y arrastrando un auto sobre otro (o tocando uno y después el otro) se intercambian.
    let picked = null, ghost = null, dropOn = null;
    const editBar = $("r3dEditBar");
    // la barra de "ordenar" va debajo del mueble: se agranda el escenario para que no tape las últimas filas
    const editExtra = () => editBar.offsetHeight + 14;
    function growForEdit() { stage.style.height = parseFloat(stage.style.height) + editExtra() + "px"; }
    function enterEdit() {
      if (editing || (api.touring && api.touring())) return;
      editing = true;
      if (sel) { sel.classList.remove("pop"); sel = null; panel.hidden = true; }
      stage.classList.add("editing"); editBar.hidden = false; $("r3dHint").classList.add("gone");
      growForEdit();
      tilt.tx = tilt.ty = tilt.x = tilt.y = 0;
      animate(true); st.rx = 0; st.ry = 0; st.py -= editExtra() / 2; apply(); setTimeout(() => animate(false), 600);
    }
    function exitEdit() {
      if (!editing) return;
      const extra = editExtra();
      editing = false; unpick(); endDrag();
      stage.classList.remove("editing"); editBar.hidden = true;
      stage.style.height = parseFloat(stage.style.height) - extra + "px";
      animate(true); st.rx = IDLE.rx; st.ry = IDLE.ry; st.py += extra / 2; limitPan(); apply(); setTimeout(() => animate(false), 600);
    }
    const unpick = () => { if (picked) picked.classList.remove("picked"); picked = null; };
    function swap(a, b) {
      const ra = +a.dataset.r, ca = +a.dataset.c, rb = +b.dataset.r, cb = +b.dataset.c;
      [L[ra][ca], L[rb][cb]] = [L[rb][cb], L[ra][ca]];
      guardarOrden(L);
      unpick(); build();
      for (const [r, c] of [[ra, ca], [rb, cb]]) {
        const cell = shelf.querySelector(`.r3d-cell[data-r="${r}"][data-c="${c}"]`);
        cell.classList.add("swapped"); setTimeout(() => cell.classList.remove("swapped"), 900);
      }
      if (navigator.vibrate) navigator.vibrate(15);
    }
    function startDrag(cell, x, y) {
      unpick();
      cell.classList.add("dragging");
      ghost = document.createElement("div"); ghost.className = "r3d-ghost";
      ghost.innerHTML = `<img src="${cell.querySelector("img").src}" alt="">`;
      stage.appendChild(ghost); moveGhost(x, y);
      return cell;
    }
    function moveGhost(x, y) {
      const b = stage.getBoundingClientRect();
      ghost.style.transform = `translate(${x - b.left}px, ${y - b.top}px) translate(-50%, -60%)`;
      const over = document.elementFromPoint(x, y)?.closest(".r3d-cell");
      const target = over && over !== gesture.src ? over : null;
      if (target !== dropOn) { if (dropOn) dropOn.classList.remove("drop"); dropOn = target; if (dropOn) dropOn.classList.add("drop"); }
    }
    function endDrag() {
      if (ghost) { ghost.remove(); ghost = null; }
      if (dropOn) { dropOn.classList.remove("drop"); dropOn = null; }
      shelf.querySelectorAll(".r3d-cell.dragging").forEach((c) => c.classList.remove("dragging"));
    }
    // ---------- PIN para ordenar: así nadie te cambia el orden desde tu celu o tu compu ----------
    // La primera vez en cada dispositivo se crea el PIN; queda guardado (como hash) en ese dispositivo.
    // Después de ponerlo bien, se puede ordenar (y mantener apretado un auto) hasta salir de la repisa.
    const PIN_KEY = "repisa-pin";
    let desbloqueado = false;
    const hashPin = (s) => { // no es seguridad fuerte (la app no tiene servidor): alcanza para que no toquen el orden
      let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
      for (const ch of "repisa-f1:" + s) { const k = ch.charCodeAt(0); h1 = Math.imul(h1 ^ k, 2654435761); h2 = Math.imul(h2 ^ k, 1597334677); }
      h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
      h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
      return (h2 >>> 0).toString(16) + (h1 >>> 0).toString(16);
    };
    const pinGuardado = () => { try { return localStorage.getItem(PIN_KEY); } catch (_) { return null; } };
    function pedirPin() {
      if (desbloqueado) return Promise.resolve(true);
      const nuevo = !pinGuardado();
      return new Promise((res) => {
        const box = document.createElement("form");
        box.className = "r3d-pin";
        box.innerHTML = `<div class="r3d-pin-card">
            <b>${nuevo ? "Creá un PIN para ordenar" : "PIN para ordenar la repisa"}</b>
            <small>${nuevo ? "Así nadie más te cambia el orden en este dispositivo. Elegí de 4 a 8 números." : "Ingresá tu PIN."}</small>
            <input type="password" inputmode="numeric" autocomplete="off" maxlength="8" placeholder="PIN" aria-label="PIN" required>
            ${nuevo ? '<input type="password" inputmode="numeric" autocomplete="off" maxlength="8" placeholder="Repetilo" aria-label="Repetí el PIN" required>' : ""}
            <em class="err" hidden></em>
            <div class="r3d-pin-act"><button type="button" class="no">Cancelar</button><button type="submit" class="ok">${nuevo ? "Guardar" : "Entrar"}</button></div>
          </div>`;
        const [a, b] = box.querySelectorAll("input"), err = box.querySelector(".err");
        const fin = (ok) => { box.remove(); res(ok); };
        const mal = (txt) => { err.textContent = txt; err.hidden = false; a.value = ""; if (b) b.value = ""; a.focus(); };
        box.querySelector(".no").onclick = () => fin(false);
        box.onsubmit = (ev) => {
          ev.preventDefault();
          const v = a.value.trim();
          if (nuevo) {
            if (!/^\d{4,8}$/.test(v)) return mal("Tienen que ser de 4 a 8 números.");
            if (v !== b.value.trim()) return mal("Los dos PIN no coinciden.");
            try { localStorage.setItem(PIN_KEY, hashPin(v)); } catch (_) {}
          } else if (hashPin(v) !== pinGuardado()) {
            if (navigator.vibrate) navigator.vibrate([30, 40, 30]);
            return mal("PIN incorrecto.");
          }
          desbloqueado = true; fin(true);
        };
        stage.appendChild(box);
        setTimeout(() => a.focus(), 50);
      });
    }
    $("r3dEdit").onclick = () => (editing ? exitEdit() : pedirPin().then((ok) => ok && enterEdit()));
    $("r3dEditOk").onclick = exitEdit;
    $("r3dEditReset").onclick = () => { L = original(); guardarOrden(L); unpick(); build(); };
    stage.addEventListener("contextmenu", (ev) => ev.preventDefault()); // sin menú al mantener apretado

    // ---------- gestos ----------
    const pts = new Map();
    let gesture = null, lastTap = 0, lpT = 0;
    const center = () => { const b = stage.getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; };
    stage.addEventListener("pointerdown", (ev) => {
      if (ev.target.closest(".r3d-zoom, .r3d-editbar, .r3d-pin")) return;
      try { stage.setPointerCapture(ev.pointerId); } catch (_) {}
      pts.set(ev.pointerId, { x: ev.clientX, y: ev.clientY, x0: ev.clientX, y0: ev.clientY, t0: Date.now() });
      askGyro();
      $("r3dHint").classList.add("gone");
      clearTimeout(lpT);
      if (pts.size === 2) {
        endDrag();
        const [a, b] = [...pts.values()];
        gesture = { pinch: true, d0: Math.hypot(a.x - b.x, a.y - b.y), s0: st.s, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
        return;
      }
      const cell = ev.target.closest(".r3d-cell");
      gesture = { pinch: false, moved: false, src: editing ? cell : null, dragging: false };
      // mantener apretado un auto: entra en modo ordenar y lo levanta (solo si ya se puso el PIN)
      if (!editing && cell && !sel && desbloqueado) {
        const p = pts.get(ev.pointerId);
        lpT = setTimeout(() => {
          if (!gesture || gesture.pinch || gesture.moved || pts.size !== 1) return;
          enterEdit();
          if (!editing) return;
          gesture.src = cell; gesture.dragging = true; gesture.lp = true;
          startDrag(cell, p.x, p.y);
          if (navigator.vibrate) navigator.vibrate(25);
        }, 550);
      }
    });
    stage.addEventListener("pointermove", (ev) => {
      const p = pts.get(ev.pointerId); if (!p) return;
      const dx = ev.clientX - p.x, dy = ev.clientY - p.y; p.x = ev.clientX; p.y = ev.clientY;
      if (Math.hypot(p.x - p.x0, p.y - p.y0) > 8) { gesture.moved = true; if (!gesture.dragging) clearTimeout(lpT); }
      if (gesture.pinch && pts.size === 2) {
        const [a, b] = [...pts.values()];
        const [cx, cy] = center();
        zoomTo(clamp(gesture.s0 * Math.hypot(a.x - b.x, a.y - b.y) / gesture.d0, 1, ZMAX), gesture.mx - cx, gesture.my - cy);
        apply(); return;
      }
      if (gesture.dragging) { moveGhost(p.x, p.y); return; }
      if (editing) {
        // en modo ordenar: arrastrar un auto lo levanta; arrastrar afuera mueve la vista (sin girar)
        if (gesture.src && gesture.moved) { gesture.dragging = true; startDrag(gesture.src, p.x, p.y); return; }
        if (gesture.moved && st.s > 1.05) { st.px += dx; st.py += dy; limitPan(); apply(); }
        return;
      }
      if (!gesture.moved || sel) return;
      if (st.s > 1.05) { st.px += dx; st.py += dy; limitPan(); st.ry = clamp(st.ry + dx * 0.04, -30, 30); }
      else { st.ry = clamp(st.ry + dx * 0.22, -38, 38); st.rx = clamp(st.rx - dy * 0.18, -28, rxMax()); }
      apply();
    });
    const up = (ev) => {
      const p = pts.get(ev.pointerId); if (!p) return;
      pts.delete(ev.pointerId);
      clearTimeout(lpT);
      if (gesture && gesture.dragging) { // soltar el auto arrastrado
        const target = dropOn, src = gesture.src;
        endDrag();
        if (target && ev.type === "pointerup") swap(src, target);
        if (pts.size === 0) gesture = null;
        return;
      }
      if (editing) { // tocar uno y después otro: se intercambian
        if (gesture && !gesture.pinch && !gesture.moved) {
          const cell = document.elementFromPoint(ev.clientX, ev.clientY)?.closest(".r3d-cell");
          if (cell && picked && picked !== cell) swap(picked, cell);
          else if (cell && picked === cell) unpick();
          else if (cell) { picked = cell; cell.classList.add("picked"); }
        }
        if (pts.size === 0) gesture = null;
        return;
      }
      if (gesture && !gesture.pinch && !gesture.moved && Date.now() - p.t0 < 400) {
        const cell = document.elementFromPoint(ev.clientX, ev.clientY)?.closest(".r3d-cell");
        const now = Date.now();
        if (cell) select(cell, true);
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
    const step = (k) => { animate(true); zoomTo(clamp(st.s * k, 1, ZMAX)); apply(); setTimeout(() => animate(false), 400); };
    $("r3dIn").onclick = () => step(1.5);
    $("r3dOut").onclick = () => step(1 / 1.5);
    if ($("r3dTour")) $("r3dTour").onclick = () => { exitEdit(); api.startTour(); };
    $("r3dReset").onclick = () => {
      if (sel) { sel.classList.remove("pop"); sel = null; panel.hidden = true; }
      animate(true); Object.assign(st, editing ? { rx: 0, ry: 0 } : { rx: IDLE.rx, ry: IDLE.ry }, { s: 1, px: 0, py: 0 }); apply(); setTimeout(() => animate(false), 600);
    };

    // ---------- inclinar el celu ----------
    let raf = 0, gyroAsked = false;
    function onTilt(e) {
      if (e.gamma == null || editing) return; // ordenando, el mueble queda quieto
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

    // ---------- control desde afuera (recorrido guiado) ----------
    const cellOf = (id) => {
      for (let r = 0; r < R.filas; r++) { const c = L[r].indexOf(id); if (c >= 0) return shelf.querySelector(`.r3d-cell[data-r="${r}"][data-c="${c}"]`); }
      return null;
    };
    const ctl = {
      focus: (id) => { const cell = cellOf(id); if (cell) { $("r3dHint").classList.add("gone"); select(cell, false); } },
      markHeard: (id) => {
        const cell = cellOf(id);
        if (cell && !cell.querySelector(".r3d-b.heard")) cell.insertAdjacentHTML("beforeend", '<span class="r3d-b heard" title="Escuchado">✓</span>');
      },
      clear: () => deselect()
    };
    window.Repisa3D.current = ctl;

    return () => { // al salir de la pantalla
      if (window.Repisa3D.current === ctl) window.Repisa3D.current = null;
      removeEventListener("resize", onResize); removeEventListener("deviceorientation", onTilt);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(glareT); clearTimeout(lpT);
      if (editing) { editing = false; st.rx = IDLE.rx; st.ry = IDLE.ry; }
      if (!saved) saved = { ...(before || st) };
    };
  }

  window.Repisa3D = { mount, reset: () => { saved = null; }, current: null, orden };
})();
