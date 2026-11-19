// Pantallas: inicio (repisa) y ficha del auto. Rutas por hash: #/ y #/auto/<id>
(function () {
  const view = document.getElementById("view");
  const back = document.getElementById("back");
  const appbarTitle = document.getElementById("appbarTitle");
  // Los autos con "oculto: true" quedan en la base pero no se muestran
  const cars = AUTOS.filter((a) => !a.oculto).sort((a, b) => a.etiqueta.anio - b.etiqueta.anio);
  const byId = Object.fromEntries(cars.map((c) => [c.id, c]));
  let query = "";
  let tab = "autos"; // pestaña del inicio: autos | pilotos
  const allDrivers = [...(window.PILOTOS || [])].sort((a, b) => (b.titulos.length - a.titulos.length) || a.nacimiento - b.nacimiento);
  const driverByName = Object.fromEntries(allDrivers.map((d) => [Matcher.norm(d.nombre), d]));
  const driverOf = (name) => driverByName[Matcher.norm(name)];
  // Autos de la repisa de un piloto: primero los que dice la etiqueta, después donde figura como compañero
  const carsOf = (d) => {
    const n = Matcher.norm(d.nombre);
    const main = cars.filter((c) => Matcher.norm(c.etiqueta.piloto) === n);
    const other = cars.filter((c) => !main.includes(c) && (c.pilotos || []).some((p) => Matcher.norm(p.nombre) === n));
    return { main, other };
  };
  // En la pestaña Pilotos solo aparecen los que tienen algún auto en la repisa
  const drivers = allDrivers.filter((d) => { const { main, other } = carsOf(d); return main.length + other.length > 0; });
  let player = null;        // audio en curso
  let autoplayNext = false; // al llegar desde el escáner, arranca el audio solo
  const withAudio = new Set();

  // ---------- utilidades ----------
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[m]);
  const isLight = (hex) => {
    const h = (hex || "#000").replace("#", "");
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16));
    return 0.299 * r + 0.587 * g + 0.114 * b > 170;
  };
  const vars = (c) => `--c1:${c.color || "#333"};--c2:${c.acento || "#e10600"}`;
  const decadeOf = (c) => Math.floor(c.etiqueta.anio / 10) * 10;
  const decadeName = (d) => (d < 2000 ? `Años ${d % 100}` : `Años ${d}`);
  const isChampion = (c) => (c.titulos || []).some((t) => /Pilotos/i.test(t));

  const ICON = {
    trophy: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></svg>',
    trophyBig: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/><path d="M10 8.5l1.3 1.2L14 7" stroke-width="1.8"/></svg>',
    stopwatch: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="7"/><path d="M12 14l3-3M10 3h4M12 3v4"/></svg>',
    chart: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    flag: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 4h12l-2 4 2 4H5"/></svg>',
    star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z"/></svg>',
    helmet: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14a9 9 0 0 1 18 0v3H9l-2 3H4a1 1 0 0 1-1-1z"/><path d="M12 12h9"/></svg>',
    gear: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>',
    bulb: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg>',
    book: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/></svg>',
    link: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
    chev: '<svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    cube: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2.5l8.5 4.8v9.4L12 21.5l-8.5-4.8V7.3z"/><path d="M3.5 7.3L12 12l8.5-4.7M12 12v9.5"/></svg>',
    search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    headphonesBig: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="5" height="7" rx="2"/><rect x="16" y="14" width="5" height="7" rx="2"/></svg>',
    headphones: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="5" height="7" rx="2"/><rect x="16" y="14" width="5" height="7" rx="2"/></svg>',
    play: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l10.5-6.5z"/></svg>',
    pause: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6.5" y="5" width="4" height="14" rx="1"/><rect x="13.5" y="5" width="4" height="14" rx="1"/></svg>'
  };
  const secHead = (icon, title) => `<div class="sec-h"><span class="ic">${ICON[icon]}</span><h2>${title}</h2></div>`;

  // ---------- Escudos de equipo: logo propio si existe en /logos, si no siglas ----------
  // Para usar logos: guardá por ej. logos/ferrari.png o logos/red-bull.svg (ver LEEME).
  const logoKey = (equipo) => Matcher.norm(equipo).toLowerCase().replace(/ /g, "-")
    .replace(/-(racing|f1-team|team|amg|gp)$/g, "").replace(/-(racing|amg|gp)$/g, "");
  const initials = (key) => {
    const parts = key.split("-");
    return (parts.length > 1 ? parts.map((p) => p[0]).join("") : key.slice(0, 3)).toUpperCase();
  };
  const badge = (c, cls = "") => {
    const k = logoKey(c.etiqueta.equipo);
    return `<span class="badge ${cls}" data-logo="${k}" style="${vars(c)}" aria-hidden="true">${initials(k)}</span>`;
  };
  const logoCache = new Map(); // key -> url | null | Promise
  function probe(url) {
    return new Promise((res) => { const i = new Image(); i.onload = () => res(url); i.onerror = () => res(null); i.src = url; });
  }
  async function findLogo(key) {
    // data/logos.js (generado) dice qué logos hay; así no se buscan archivos que no existen
    if (window.LOGOS) return window.LOGOS[key] || null;
    if (logoCache.has(key)) return logoCache.get(key);
    const p = (async () => (await probe(`logos/${key}.png`)) || (await probe(`logos/${key}.svg`)))();
    logoCache.set(key, p);
    const url = await p; logoCache.set(key, url); return url;
  }
  // Recorta el margen blanco o transparente de un logo (muchos vienen con mucho aire alrededor)
  const trimCache = new Map();
  function trimmed(url) {
    if (trimCache.has(url)) return trimCache.get(url);
    const p = new Promise((res) => {
      const img = new Image();
      img.onload = () => {
        try {
          const max = 400, k = Math.min(1, max / Math.max(img.naturalWidth || max, img.naturalHeight || max));
          const W = Math.max(1, Math.round((img.naturalWidth || max) * k)), H = Math.max(1, Math.round((img.naturalHeight || max) * k));
          const c = document.createElement("canvas"); c.width = W; c.height = H;
          const ctx = c.getContext("2d", { willReadFrequently: true });
          ctx.drawImage(img, 0, 0, W, H);
          const d = ctx.getImageData(0, 0, W, H).data;
          let x0 = W, y0 = H, x1 = -1, y1 = -1;
          for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
            const i = (y * W + x) * 4;
            const bg = d[i + 3] < 16 || (d[i] > 238 && d[i + 1] > 238 && d[i + 2] > 238);
            if (!bg) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
          }
          if (x1 < 0) return res({ src: url, ratio: W / H });
          const pad = Math.round(Math.max(x1 - x0, y1 - y0) * 0.03);
          x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(W - 1, x1 + pad); y1 = Math.min(H - 1, y1 + pad);
          const out = document.createElement("canvas"); out.width = x1 - x0 + 1; out.height = y1 - y0 + 1;
          out.getContext("2d").drawImage(c, x0, y0, out.width, out.height, 0, 0, out.width, out.height);
          res({ src: out.toDataURL("image/png"), ratio: out.width / out.height });
        } catch (_) { res({ src: url, ratio: (img.naturalWidth || 1) / (img.naturalHeight || 1) }); }
      };
      img.onerror = () => res(null);
      img.src = url;
    });
    trimCache.set(url, p);
    return p;
  }

  function hydrateLogos(root) {
    root.querySelectorAll("[data-logo]").forEach(async (el) => {
      const url = await findLogo(el.dataset.logo);
      if (!url || !el.isConnected) return;
      const t = await trimmed(url);
      if (!t || !el.isConnected) return;
      // demasiado alargado (una palabra larga y finita): no se leería, quedan las siglas
      if (t.ratio > 10) return;
      // logos alargados (palabras) usan un escudo más ancho para que se lean
      if (t.ratio > 1.6) el.classList.add("wide");
      const img = new Image(); img.alt = ""; img.src = t.src;
      el.classList.add("has-logo"); el.textContent = ""; el.appendChild(img);
    });
  }

  // ---------- Qué autos ya tienen mp3 ----------
  const audioCheck = Promise.all(cars.map(async (c) => {
    if (!c.audio || !location.protocol.startsWith("http")) return;
    try { const r = await fetch(c.audio, { method: "HEAD" }); if (r.ok) withAudio.add(c.id); } catch (_) {}
  }));

  // Conexiones: las escritas a mano + otros autos del mismo piloto en la repisa
  function connections(c) {
    const out = [], seen = new Set([c.id]);
    for (const k of c.conexiones || []) {
      if (byId[k.id] && !seen.has(k.id)) { out.push({ car: byId[k.id], texto: k.texto }); seen.add(k.id); }
    }
    const mine = Matcher.norm(c.etiqueta.piloto);
    for (const o of cars) {
      if (seen.has(o.id)) continue;
      const names = [o.etiqueta.piloto, ...(o.pilotos || []).map((p) => p.nombre)].map(Matcher.norm);
      if (names.includes(mine)) { out.push({ car: o, texto: `Otro auto de ${c.etiqueta.piloto} en tu repisa.` }); seen.add(o.id); }
    }
    return out;
  }

  // ---------- Escuchados y favoritos (se guardan en este celu, en el navegador) ----------
  const store = (() => {
    const K = "repisa-estado";
    let s = {};
    try { s = JSON.parse(localStorage.getItem(K) || "{}") || {}; } catch (_) { s = {}; }
    s.h = s.h || {}; s.f = s.f || {};
    const save = () => { try { localStorage.setItem(K, JSON.stringify(s)); } catch (_) {} };
    return {
      heard: (id) => !!s.h[id],
      fav: (id) => !!s.f[id],
      setHeard(id) { if (!s.h[id]) { s.h[id] = Date.now(); save(); } },
      toggleFav(id) { if (s.f[id]) delete s.f[id]; else s.f[id] = Date.now(); save(); return !!s.f[id]; }
    };
  })();
  let listFilter = "todos"; // todos | favoritos | sin-escuchar
  const STAR = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.6l6.1-.8z"/></svg>';
  const CHECK = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

  // ---------- Inicio ----------
  function cardHtml(c) {
    const e = c.etiqueta;
    return `<a class="card" href="#/auto/${c.id}" style="${vars(c)}">
      ${badge(c)}
      <div class="meta">
        <div class="yr">${e.anio} · ${esc(e.equipo)}</div>
        <h3>${esc(e.chasis)}</h3>
        <p>${esc(e.piloto)}</p>
        <div class="tags">
          ${isChampion(c) ? `<span class="tag gold">Campeón</span>` : ""}
          ${store.heard(c.id) ? `<span class="tag heard">${CHECK} Escuchado</span>` : withAudio.has(c.id) ? `<span class="tag">${ICON.headphones} Audio</span>` : ""}
        </div>
      </div>
      <span class="num">${c.numero ?? ""}</span>
      ${store.fav(c.id) ? `<span class="card-fav" aria-label="Favorito">${STAR}</span>` : ""}
    </a>`;
  }

  function home() {
    back.hidden = true;
    appbarTitle.textContent = `${cars.length} autos`;
    const decades = [...new Set(cars.map(decadeOf))];
    const champs = cars.filter(isChampion).length;
    view.innerHTML = `
      <section class="intro">
        <div class="kicker">Colección</div>
        <h1>Tu repisa</h1>
        <div class="kpis">
          <div class="kpi"><b>${cars.length}</b><small>autos</small></div>
          <div class="kpi gold"><b>${champs}</b><small>campeones</small></div>
          <div class="kpi"><b>${cars[cars.length - 1].etiqueta.anio - cars[0].etiqueta.anio}</b><small>años de historia</small></div>
        </div>
      </section>
      <div class="tabs" role="tablist">
        <button role="tab" class="tab ${tab === "autos" ? "on" : ""}" data-tab="autos" aria-selected="${tab === "autos"}">Autos <span>${cars.length}</span></button>
        <button role="tab" class="tab ${tab === "pilotos" ? "on" : ""}" data-tab="pilotos" aria-selected="${tab === "pilotos"}">Pilotos <span>${drivers.length}</span></button>
      </div>
      <button class="tour-cta" id="tourBtn">
        <span class="tc-ic">${ICON.headphonesBig}</span>
        <span class="tc-txt"><b>Escuchar la repisa</b><small>Las historias una tras otra, como en un museo</small></span>
        ${ICON.chev}
      </button>
      <a class="tour-cta r3d-cta" href="#/repisa">
        <span class="tc-ic">${ICON.cube}</span>
        <span class="tc-txt"><b>Ver la repisa en 3D</b><small>Tu mueble, cada auto en su lugar</small></span>
        ${ICON.chev}
      </a>
      <div class="searchbox">${ICON.search}<input class="search" id="q" type="search" placeholder="${tab === "autos" ? "Buscar equipo, piloto o año" : "Buscar piloto o país"}" value="${esc(query)}" autocomplete="off"></div>
      ${tab === "autos" ? `<div class="filters" role="group" aria-label="Mostrar">
          ${[["todos", "Todos", cars.length], ["favoritos", "★ Favoritos", cars.filter((c) => store.fav(c.id)).length], ["sin-escuchar", "Sin escuchar", cars.filter((c) => withAudio.has(c.id) && !store.heard(c.id)).length]]
            .map(([k, l, n]) => `<button class="filter ${listFilter === k ? "on" : ""}" data-f="${k}">${l} <span>${n}</span></button>`).join("")}
        </div>
        <nav class="jump" aria-label="Ir a década">${decades.map((d) => `<button class="chip" data-d="${d}">${decadeName(d)}</button>`).join("")}</nav>` : ""}
      <div id="list"></div>`;
    renderList();
    document.getElementById("tourBtn").onclick = openTourSheet;
    view.querySelectorAll(".filter").forEach((b) => (b.onclick = () => { listFilter = b.dataset.f; home(); }));
    const qi = document.getElementById("q");
    qi.oninput = () => { query = qi.value; renderList(); };
    view.querySelectorAll(".tab").forEach((b) => (b.onclick = () => { if (tab !== b.dataset.tab) { tab = b.dataset.tab; query = ""; home(); } }));
    view.querySelectorAll(".chip").forEach((b) => (b.onclick = () => {
      const t = document.getElementById("d" + b.dataset.d);
      if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
    }));
  }

  function driverCardHtml(d) {
    const { main, other } = carsOf(d);
    const n = main.length + other.length;
    return `<a class="dcard" href="#/piloto/${d.id}">
      <span class="flag-big" aria-hidden="true">${d.bandera || ""}</span>
      <div class="meta">
        <div class="yr">${esc(d.pais)}${d.apodo ? ` · “${esc(d.apodo)}”` : ""}</div>
        <h3>${esc(d.nombre)}</h3>
        <div class="tags">
          ${d.titulos.length ? `<span class="tag gold">${d.titulos.length} ${d.titulos.length === 1 ? "título" : "títulos"}</span>` : `<span class="tag">Sin títulos</span>`}
          ${n ? `<span class="tag">${n} ${n === 1 ? "auto" : "autos"} en tu repisa</span>` : ""}
        </div>
      </div>
      ${d.titulos.length ? `<span class="crowns" aria-hidden="true">${"★".repeat(Math.min(d.titulos.length, 7))}</span>` : ""}
    </a>`;
  }

  function renderList() {
    const list = document.getElementById("list");
    if (!list) return;
    const q = Matcher.norm(query);
    if (tab === "pilotos") {
      const ds = drivers.filter((d) => !q || Matcher.norm([d.nombre, d.apodo, d.pais, ...d.equipos].join(" ")).includes(q));
      list.innerHTML = ds.length
        ? `<div class="grid dgrid">${ds.map(driverCardHtml).join("")}</div>`
        : `<div class="empty">No hay pilotos que coincidan con “${esc(query)}”.</div>`;
      return;
    }
    const match = cars.filter((c) => {
      if (listFilter === "favoritos" && !store.fav(c.id)) return false;
      if (listFilter === "sin-escuchar" && (!withAudio.has(c.id) || store.heard(c.id))) return false;
      if (!q) return true;
      const e = c.etiqueta;
      return Matcher.norm([e.equipo, e.chasis, e.anio, e.piloto, e.carrera, ...(c.pilotos || []).map((p) => p.nombre)].join(" ")).includes(q);
    });
    if (!match.length) {
      list.innerHTML = `<div class="empty">${query ? `No hay autos que coincidan con “${esc(query)}”.`
        : listFilter === "favoritos" ? "Todavía no marcaste favoritos. Tocá la estrella en la ficha de un auto."
        : listFilter === "sin-escuchar" ? "¡Ya escuchaste todas las historias!" : "No hay autos."}</div>`;
      return;
    }
    const groups = new Map();
    for (const c of match) { const d = decadeOf(c); if (!groups.has(d)) groups.set(d, []); groups.get(d).push(c); }
    list.innerHTML = [...groups].map(([d, cs]) => `
      <section class="decade" id="d${d}">
        <div class="decade-head"><h2>${decadeName(d)}</h2><span>${cs.length} ${cs.length === 1 ? "auto" : "autos"}</span></div>
        <div class="grid">${cs.map(cardHtml).join("")}</div>
      </section>`).join("");
    hydrateLogos(list);
  }

  function startScan() {
    if (player) player.stop();
    Scanner.open((car) => { autoplayNext = true; location.hash = "#/auto/" + car.id; });
  }
  document.getElementById("fab").onclick = startScan;

  // ---------- Audio: solo nuestras grabaciones (mp3). Sin mp3, el reproductor queda apagado ----------
  function setupAudio(car) {
    const box = document.getElementById("audio");
    if (!box) return;
    const btn = box.querySelector(".play"), bar = box.querySelector(".progress i"), track = box.querySelector(".progress"), lbl = box.querySelector("small");
    const state = { playing: false };
    const setPlaying = (on) => { btn.innerHTML = on ? ICON.pause : ICON.play; btn.setAttribute("aria-label", on ? "Pausar" : "Reproducir historia"); box.classList.toggle("playing", on); state.playing = on; };
    const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
    const unavailable = () => {
      box.classList.add("off"); btn.disabled = true; btn.innerHTML = ICON.play;
      lbl.textContent = "Narración próximamente";
      player = { stop: () => {} };
      autoplayNext = false; // que no quede pendiente para el próximo auto
      if (tour) setTimeout(() => tourStep(1), 800); // en el recorrido, sigue con el próximo
    };
    setPlaying(false);
    if (!car.audio) return unavailable();

    const audio = new Audio(car.audio);
    audio.preload = "metadata";
    // Esperamos a saber si el mp3 existe (en el celu con datos puede tardar unos segundos)
    let estado = "cargando";
    const ready = new Promise((res) => {
      audio.addEventListener("loadedmetadata", () => { estado = "ok"; res(); }, { once: true });
      audio.addEventListener("error", () => { estado = "falta"; unavailable(); res(); }, { once: true });
      setTimeout(res, 10000);
    });
    const durLabel = () => { lbl.textContent = isFinite(audio.duration) ? `Narración · ${fmt(audio.duration)}` : "Narración"; };
    audio.addEventListener("loadedmetadata", durLabel);
    audio.addEventListener("durationchange", () => { if (estado === "ok") durLabel(); });
    audio.addEventListener("timeupdate", () => {
      if (!isFinite(audio.duration)) return;
      bar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
      if (state.playing) lbl.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
      if (audio.currentTime / audio.duration > 0.9 && !store.heard(car.id)) { store.setHeard(car.id); markHeardUI(); }
    });
    audio.addEventListener("ended", () => {
      setPlaying(false); bar.style.width = "0"; durLabel();
      store.setHeard(car.id); markHeardUI();
      if (tour) setTimeout(() => tourStep(1), 1500); // recorrido: pausa corta y al próximo auto
      else tourBarSync();
    });
    const markHeardUI = () => { const h = box.querySelector(".heard-badge"); if (h) h.hidden = false; };
    // tocar o arrastrar la barra para adelantar
    const seek = (ev) => {
      if (estado !== "ok" || !isFinite(audio.duration)) return;
      const r = track.getBoundingClientRect();
      audio.currentTime = Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width)) * audio.duration;
    };
    track.addEventListener("pointerdown", (ev) => { seek(ev); track.setPointerCapture(ev.pointerId); track.onpointermove = seek; });
    track.addEventListener("pointerup", () => { track.onpointermove = null; });
    lbl.textContent = "Cargando…";

    let cancelled = false;
    const stop = () => { cancelled = true; audio.pause(); setPlaying(false); };
    async function play() {
      cancelled = false;
      if (estado === "cargando") { await ready; if (cancelled) return; }
      if (estado === "falta") return;
      await audio.play();
      setPlaying(true);
      tourBarSync();
    }
    const pause = () => { audio.pause(); setPlaying(false); tourBarSync(); };
    btn.onclick = () => (state.playing ? pause() : play().catch(() => {}));
    player = { stop, toggle: () => (state.playing ? pause() : play().catch(() => {})), isPlaying: () => state.playing };

    if (autoplayNext) {
      autoplayNext = false;
      play().catch(() => {});
    }
  }

  // ---------- Tarjeta de campeón ----------
  function championCard(c) {
    const anio = c.etiqueta.anio;
    const titles = (c.titulos || []).map((x) => {
      const m = /Campeonato de (Pilotos|Constructores)\s+(\d{4})\s*[—–-]\s*(.+)/i.exec(x);
      return m ? { tipo: m[1], anio: +m[2], quien: m[3].trim() } : { tipo: "", anio: null, quien: x };
    });
    if (!titles.length) return "";
    const hasP = titles.some((t) => /pilotos/i.test(t.tipo) && t.anio === anio);
    const hasC = titles.some((t) => /constructores/i.test(t.tipo) && t.anio === anio);
    const headline = hasP && hasC ? "Campeón de pilotos y constructores" : hasP ? "Campeón del mundo" : hasC ? "Campeón de constructores" : "Títulos";
    return `<section class="trophy-card">
      <div class="tc-icon" aria-hidden="true">${ICON.trophyBig}</div>
      <div class="tc-body">
        <div class="tc-kicker">${hasP || hasC ? `Temporada ${anio}` : "Títulos"}</div>
        <h2>${headline}</h2>
        <ul class="tc-list">${titles.map((t) => `<li>
          <span class="tc-type">${t.tipo ? `${esc(t.tipo)} · ${t.anio}` : ""}</span>
          <b>${esc(t.quien)}</b></li>`).join("")}</ul>
      </div>
    </section>`;
  }

  // ---------- Panel de la temporada ----------
  // Posición a partir del texto: "campeón" → 1, "subcampeón" → 2, "3.º" → 3
  function posOf(txt) {
    if (!txt || /no exist/i.test(txt)) return null;
    if (/subcampe/i.test(txt)) return 2;
    if (/campe[oó]n/i.test(txt)) return 1;
    const m = /(\d+)\s*\.?\s*[º°]/.exec(txt);
    return m ? +m[1] : null;
  }
  function seasonPanel(c) {
    const t = c.temporada; if (!t) return "";
    const e = c.etiqueta;
    const tile = (v, label, icon, main) => (v == null ? "" : `<div class="kpi-tile ${main ? "main" : ""}"><span class="kt-ic">${ICON[icon]}</span><b>${esc(v)}</b><small>${label}</small></div>`);
    const tiles = [tile(t.victorias, t.victorias === 1 ? "victoria" : "victorias", "trophy", true), tile(t.poles, t.poles === 1 ? "pole" : "poles", "stopwatch"), tile(t.carreras, "carreras", "flag")].filter(Boolean);
    const pct = t.victorias != null && t.carreras ? Math.round((t.victorias / t.carreras) * 100) : null;
    const posCard = (label, txt) => {
      if (!txt) return "";
      const p = posOf(txt);
      // Sin repetir la posición que ya muestra la medalla: "1.º — 759 pts" → "759 pts"
      let det = txt.replace(/^\s*\d+\s*\.?\s*[º°]\s*[—–-]?\s*/, "").replace(/^\((.*)\)$/, "$1").trim();
      if (!det) det = p === 1 ? "Campeón" : p === 2 ? "Subcampeón" : `${p}.º puesto`;
      det = det.charAt(0).toUpperCase() + det.slice(1);
      return `<div class="pos-card ${p && p <= 3 ? "p" + p : ""}">
        <span class="medal">${p ? `${p}<sup>º</sup>` : "–"}</span>
        <div><small>${label}</small><b>${esc(det)}</b></div></div>`;
    };
    return `<section class="sec">${secHead("chart", `Temporada ${e.anio}`)}
      <div class="season">
        <div class="kpi-tiles" style="grid-template-columns:${tiles.length > 1 ? `1.3fr repeat(${tiles.length - 1},1fr)` : "1fr"}">${tiles.join("")}</div>
        ${pct != null ? `<div class="winrate">
          <div class="wr-top"><span>Ganó <b>${t.victorias}</b> de ${t.carreras} ${t.carreras === 1 ? "carrera" : "carreras"}</span><b>${pct}%</b></div>
          <div class="wr-bar"><i style="width:${Math.max(pct, 2)}%"></i></div></div>` : ""}
        <div class="positions">${posCard("Campeonato de pilotos", t.pilotos)}${posCard("Campeonato de constructores", t.constructores)}</div>
      </div></section>`;
  }

  // ---------- Ficha ----------
  function detail(id) {
    const c = byId[id];
    if (!c) { location.hash = "#/"; return; }
    const e = c.etiqueta, t = c.temporada || {};
    const idx = cars.indexOf(c), prev = cars[idx - 1], next = cars[idx + 1];
    back.hidden = false;
    appbarTitle.textContent = `${e.chasis} · ${e.anio}`;
    const cx = connections(c);
    // fotos/<id>.jpg, registrada con indexar-logos.js (puede traer el crédito del autor)
    const photoInfo = (window.FOTOS || {})[c.id];
    const photo = typeof photoInfo === "string" ? photoInfo : photoInfo && photoInfo.src;
    const credit = photoInfo && photoInfo.credito;

    view.innerHTML = `
      <section class="hero ${isLight(c.color) ? "light" : ""} ${photo ? "has-photo" : ""}" style="${vars(c)}">
        <div class="stripes"></div>
        ${photo ? `<img class="car-photo" src="${photo}" alt="Foto del ${esc(e.chasis)}" loading="eager"><div class="photo-fade"></div>${credit ? `<span class="photo-credit">Foto: ${esc(credit)}</span>` : ""}` : `<span class="bignum">${c.numero ?? ""}</span>`}
        <button class="fav-btn ${store.fav(c.id) ? "on" : ""}" id="favBtn" aria-pressed="${store.fav(c.id)}" aria-label="Marcar como favorito">${STAR}</button>
        <div class="top">${badge(c, "lg")}<div><div class="eq">${esc(e.equipo)}</div><div class="yr">Temporada ${e.anio}</div></div></div>
        <h1>${esc(e.chasis)}</h1>
        ${driverOf(e.piloto)
          ? `<a class="sub sub-link" href="#/piloto/${driverOf(e.piloto).id}">${driverOf(e.piloto).bandera} ${esc(e.piloto)} ›</a>`
          : `<div class="sub">${esc(e.piloto)}</div>`}
        ${isChampion(c) ? `<div class="champ">${ICON.trophy} Campeón del mundo ${e.anio}</div>` : ""}
        <div class="label-plate">${esc(e.equipo)} ${esc(e.chasis)} - ${e.anio}<br>${esc(e.piloto)}${e.carrera ? "<br>" + esc(e.carrera) : ""}</div>
      </section>

      ${c.relato ? `<div class="player" id="audio">
        <button class="play" aria-label="Reproducir historia"></button>
        <div class="info">
          <div class="row"><b>Escuchá su historia</b><span class="heard-badge" ${store.heard(c.id) ? "" : "hidden"}>${CHECK} Escuchada</span><span class="eq-bars" aria-hidden="true"><i></i><i></i><i></i></span></div>
          <small></small>
          <div class="progress" role="slider" aria-label="Posición del audio"><i></i></div>
        </div>
      </div>` : ""}

      ${championCard(c)}

      ${seasonPanel(c)}

      ${c.carreraModelo ? `<section class="sec">${secHead("flag", "La carrera de tu modelo")}
        <div class="race"><b>${esc(c.carreraModelo.nombre)}</b><p>${esc(c.carreraModelo.texto)}</p></div></section>` : ""}

      ${c.importancia?.length ? `<section class="sec">${secHead("star", "Por qué es importante")}
        <ul class="bul">${c.importancia.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}

      ${c.pilotos?.length ? `<section class="sec">${secHead("helmet", "Pilotos")}<div class="drivers">
        ${c.pilotos.map((p) => {
          const d = driverOf(p.nombre);
          const inner = `<span class="n">${p.numero ?? "–"}</span><div class="meta"><b>${d ? d.bandera + " " : ""}${esc(p.nombre)}</b><small>${esc(p.resultado)}</small></div>`;
          return d ? `<a class="driver" href="#/piloto/${d.id}">${inner}${ICON.chev}</a>` : `<div class="driver">${inner}</div>`;
        }).join("")}
      </div></section>` : ""}

      ${c.ficha?.length ? `<section class="sec">${secHead("gear", "Ficha técnica")}<dl class="kv">
        ${c.ficha.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl></section>` : ""}

      ${c.curiosidades?.length ? `<section class="sec">${secHead("bulb", "Curiosidades")}
        <ul class="bul alt">${c.curiosidades.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}

      ${c.relato ? `<section class="sec">${secHead("book", "Historia")}<div class="story">${esc(c.relato)}</div></section>` : ""}

      ${cx.length ? `<section class="sec">${secHead("link", "Conexiones en tu repisa")}<div class="links">
        ${cx.map((x) => `<a class="link-card" href="#/auto/${x.car.id}">
          ${badge(x.car)}
          <div class="meta"><b>${esc(x.car.etiqueta.chasis)} <span>· ${x.car.etiqueta.anio} · ${esc(x.car.etiqueta.piloto)}</span></b>
          <small>${esc(x.texto)}</small></div>${ICON.chev}</a>`).join("")}
      </div></section>` : ""}

      <nav class="pager" aria-label="Otros autos">
        ${prev ? `<a href="#/auto/${prev.id}"><small>‹ Anterior</small><b>${esc(prev.etiqueta.chasis)}</b></a>` : ""}
        ${next ? `<a class="next" href="#/auto/${next.id}"><small>Siguiente ›</small><b>${esc(next.etiqueta.chasis)}</b></a>` : ""}
      </nav>`;
    hydrateLogos(view);
    const favBtn = document.getElementById("favBtn");
    favBtn.onclick = () => {
      const on = store.toggleFav(c.id);
      favBtn.classList.toggle("on", on); favBtn.setAttribute("aria-pressed", on);
      if (navigator.vibrate) navigator.vibrate(on ? 30 : 15);
    };
    setupAudio(c);
  }

  // ---------- Ficha de piloto ----------
  function driverPage(id) {
    const d = allDrivers.find((x) => x.id === id);
    if (!d) { location.hash = "#/"; return; }
    back.hidden = false;
    appbarTitle.textContent = d.nombre;
    const { main, other } = carsOf(d);
    const stat = (v, l) => (v == null ? "" : `<div class="stat"><b>${esc(v)}</b><small>${l}</small></div>`);
    const stats = [stat(d.victorias, "victorias"), stat(d.poles, "poles"), stat(d.carreras, "carreras")].filter(Boolean);
    const years = `${d.nacimiento}${d.fallecimiento ? ` – ${d.fallecimiento}` : ""}`;
    const carLink = (c, note) => `<a class="link-card" href="#/auto/${c.id}">
        ${badge(c)}
        <div class="meta"><b>${esc(c.etiqueta.chasis)} <span>· ${c.etiqueta.anio} · ${esc(c.etiqueta.equipo)}</span></b>
        <small>${esc(note)}</small></div>${ICON.chev}</a>`;
    const resultOf = (c) => ((c.pilotos || []).find((p) => Matcher.norm(p.nombre) === Matcher.norm(d.nombre)) || {}).resultado || "";

    view.innerHTML = `
      <section class="hero dhero">
        <div class="stripes"></div>
        <span class="flag-hero" aria-hidden="true">${d.bandera || ""}</span>
        <div class="top"><div><div class="eq">${esc(d.pais)}</div><div class="yr">${years}</div></div></div>
        <h1>${esc(d.nombre)}</h1>
        ${d.apodo ? `<div class="sub">“${esc(d.apodo)}”</div>` : ""}
        ${d.titulos.length ? `<div class="champ">${ICON.trophy} ${d.titulos.length === 1 ? "Campeón del mundo" : d.titulos.length + " veces campeón del mundo"}</div>` : ""}
      </section>

      <p class="lead">${esc(d.resumen)}</p>

      ${d.titulos.length ? `<section class="sec">${secHead("trophy", "Títulos")}
        <div class="years">${d.titulos.map((y) => `<span class="year">${y}</span>`).join("")}</div></section>` : ""}

      ${stats.length ? `<section class="sec">${secHead("chart", "Números en la F1")}
        <div class="stats" style="grid-template-columns:repeat(${stats.length},1fr)">${stats.join("")}</div></section>`
        : (d.fallecimiento == null ? `<section class="sec">${secHead("chart", "Números en la F1")}<div class="note">Sigue en actividad: sus números cambian carrera a carrera.</div></section>` : "")}

      ${main.length || other.length ? `<section class="sec">${secHead("link", "En tu repisa")}<div class="links">
        ${main.map((c) => carLink(c, resultOf(c) || "Su auto")).join("")}
        ${other.map((c) => carLink(c, "Fue parte del equipo: " + (resultOf(c) || ""))).join("")}
      </div></section>` : ""}

      ${d.equipos?.length ? `<section class="sec">${secHead("flag", "Equipos")}
        <div class="years">${d.equipos.map((x) => `<span class="year team">${esc(x)}</span>`).join("")}</div></section>` : ""}

      ${d.datos?.length ? `<section class="sec">${secHead("bulb", "Datos que pocos saben")}
        <ul class="bul alt">${d.datos.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}`;
    hydrateLogos(view);
  }

  // ---------- Modo recorrido: "Escuchar la repisa" ----------
  let tour = null; // { ids, i, nombre }
  let wakeLock = null;
  const fab = document.getElementById("fab");
  const tourBar = document.createElement("div");
  tourBar.className = "tour-bar"; tourBar.hidden = true;
  document.body.appendChild(tourBar);
  const minutos = (n) => Math.max(1, Math.round((n * 42) / 60)); // ~42 s por historia

  // la pantalla no se apaga mientras dura el recorrido (si el celu lo permite)
  async function keepAwake() { try { wakeLock = await navigator.wakeLock.request("screen"); } catch (_) {} }
  document.addEventListener("visibilitychange", () => { if (tour && document.visibilityState === "visible") keepAwake(); });

  function openTourSheet() {
    const pool = cars.filter((c) => withAudio.size ? withAudio.has(c.id) : !!c.audio);
    const opts = [
      ["todo", "Toda la repisa", pool],
      ["sin", "Las que no escuchaste", pool.filter((c) => !store.heard(c.id))],
      ["fav", "Tus favoritos", pool.filter((c) => store.fav(c.id))],
      ...[...new Set(pool.map(decadeOf))].map((d) => ["d" + d, decadeName(d), pool.filter((c) => decadeOf(c) === d)])
    ].filter(([, , list]) => list.length);
    const sheet = document.createElement("div");
    sheet.className = "sheet-back";
    sheet.innerHTML = `<div class="sheet" role="dialog" aria-label="Escuchar la repisa">
      <div class="sheet-grab"></div>
      <h2>Escuchar la repisa</h2>
      <p>Las historias se reproducen una tras otra, mostrando cada auto. Dejá el celu y que la repisa se cuente sola.</p>
      <div class="sheet-opts">${opts.map(([k, l, list], i) => `<button class="sheet-opt ${i === 0 ? "main" : ""}" data-k="${k}">
        <b>${l}</b><small>${list.length} ${list.length === 1 ? "historia" : "historias"} · ~${minutos(list.length)} min</small>${ICON.chev}</button>`).join("")}</div>
      <button class="btn sheet-cancel">Cancelar</button></div>`;
    document.body.appendChild(sheet);
    const close = () => sheet.remove();
    sheet.onclick = (ev) => { if (ev.target === sheet) close(); };
    sheet.querySelector(".sheet-cancel").onclick = close;
    sheet.querySelectorAll(".sheet-opt").forEach((b) => (b.onclick = () => {
      const [, l, list] = opts.find(([k]) => k === b.dataset.k);
      close();
      startTour(list.map((c) => c.id), l);
    }));
  }

  function startTour(ids, nombre) {
    if (!ids.length) return;
    tour = { ids, i: 0, nombre };
    keepAwake();
    goTour();
  }
  function goTour() {
    autoplayNext = true;
    const h = "#/auto/" + tour.ids[tour.i];
    if (location.hash === h) route(); else location.hash = h;
    tourBarSync();
  }
  function tourStep(d) {
    if (!tour) return;
    const n = tour.i + d;
    if (n < 0) return;
    if (n >= tour.ids.length) { endTour(true); return; }
    tour.i = n; goTour();
  }
  function endTour(terminado) {
    tour = null;
    if (wakeLock) { wakeLock.release().catch(() => {}); wakeLock = null; }
    tourBarSync();
    if (terminado) { location.hash = "#/"; }
  }
  function tourBarSync() {
    if (!tour) { tourBar.hidden = true; fab.hidden = false; return; }
    fab.hidden = true; tourBar.hidden = false;
    const c = byId[tour.ids[tour.i]];
    const playing = player && player.isPlaying && player.isPlaying();
    tourBar.innerHTML = `
      <div class="tb-info"><small>${esc(tour.nombre)} · ${tour.i + 1} de ${tour.ids.length}</small><b>${esc(c.etiqueta.chasis)} · ${c.etiqueta.anio}</b>
        <div class="tb-prog"><i style="width:${((tour.i + 1) / tour.ids.length) * 100}%"></i></div></div>
      <button class="tb-btn" data-a="prev" aria-label="Anterior" ${tour.i === 0 ? "disabled" : ""}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h2v14H6zM20 5v14L9 12z"/></svg></button>
      <button class="tb-btn main" data-a="play" aria-label="${playing ? "Pausar" : "Seguir"}">${playing ? ICON.pause : ICON.play}</button>
      <button class="tb-btn" data-a="next" aria-label="Siguiente"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 5h2v14h-2zM4 5v14l11-7z"/></svg></button>
      <button class="tb-btn" data-a="stop" aria-label="Terminar recorrido"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>`;
    tourBar.querySelectorAll(".tb-btn").forEach((b) => (b.onclick = () => {
      const a = b.dataset.a;
      if (a === "prev") tourStep(-1);
      else if (a === "next") tourStep(1);
      else if (a === "stop") endTour(false);
      else if (player && player.toggle) player.toggle();
    }));
  }

  // ---------- Repisa 3D (repisa3d.js + data/repisa.js) ----------
  let unmount3d = null, volverA = "#/";
  function shelf3d() {
    back.hidden = false;
    appbarTitle.textContent = "Tu repisa";
    unmount3d = Repisa3D.mount(view, {
      byId, isChampion,
      heard: (id) => store.heard(id), fav: (id) => store.fav(id), hasAudio: (id) => withAudio.has(id),
      open: (id, autoplay) => { autoplayNext = !!autoplay; location.hash = "#/auto/" + id; }
    });
  }

  function route() {
    // si el usuario se va a otra pantalla, el recorrido termina
    if (tour && location.hash !== "#/auto/" + tour.ids[tour.i]) endTour(false);
    if (player) { player.stop(); player = null; }
    const m = location.hash.match(/^#\/auto\/(.+)$/);
    const p = location.hash.match(/^#\/piloto\/(.+)$/);
    if (unmount3d) { unmount3d(); unmount3d = null; }
    // la flecha de volver lleva a la lista o a la repisa 3D, según de dónde se vino
    if (location.hash === "#/repisa") volverA = "#/repisa";
    else if (!m && !p) volverA = "#/";
    back.setAttribute("href", volverA);
    if (location.hash === "#/repisa") shelf3d();
    else if (m) detail(decodeURIComponent(m[1]));
    else if (p) driverPage(decodeURIComponent(p[1]));
    else home();
    view.style.animation = "none"; void view.offsetWidth; view.style.animation = "";
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();
  // cuando se sabe qué autos tienen mp3, se actualiza el inicio (etiquetas y contadores)
  audioCheck.then(() => {
    if (location.hash === "#/repisa") route();
    else if (!/^#\/(auto|piloto)\//.test(location.hash)) { const y = scrollY; home(); scrollTo(0, y); }
  });

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
