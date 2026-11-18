// Pantallas: inicio (repisa) y ficha del auto. Rutas por hash: #/ y #/auto/<id>
(function () {
  const view = document.getElementById("view");
  const back = document.getElementById("back");
  const appbarTitle = document.getElementById("appbarTitle");
  const cars = [...AUTOS].sort((a, b) => a.etiqueta.anio - b.etiqueta.anio);
  const byId = Object.fromEntries(cars.map((c) => [c.id, c]));
  let query = "";
  let tab = "autos"; // pestaña del inicio: autos | pilotos
  const drivers = [...(window.PILOTOS || [])].sort((a, b) => (b.titulos.length - a.titulos.length) || a.nacimiento - b.nacimiento);
  const driverByName = Object.fromEntries(drivers.map((d) => [Matcher.norm(d.nombre), d]));
  const driverOf = (name) => driverByName[Matcher.norm(name)];
  // Autos de la repisa de un piloto: primero los que dice la etiqueta, después donde figura como compañero
  const carsOf = (d) => {
    const n = Matcher.norm(d.nombre);
    const main = cars.filter((c) => Matcher.norm(c.etiqueta.piloto) === n);
    const other = cars.filter((c) => !main.includes(c) && (c.pilotos || []).some((p) => Matcher.norm(p.nombre) === n));
    return { main, other };
  };
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
    chart: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    flag: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 4h12l-2 4 2 4H5"/></svg>',
    star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z"/></svg>',
    helmet: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14a9 9 0 0 1 18 0v3H9l-2 3H4a1 1 0 0 1-1-1z"/><path d="M12 12h9"/></svg>',
    gear: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>',
    bulb: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg>',
    book: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/></svg>',
    link: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
    chev: '<svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
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
          ${withAudio.has(c.id) ? `<span class="tag">${ICON.headphones} Audio</span>` : ""}
        </div>
      </div>
      <span class="num">${c.numero ?? ""}</span>
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
      <div class="searchbox">${ICON.search}<input class="search" id="q" type="search" placeholder="${tab === "autos" ? "Buscar equipo, piloto o año" : "Buscar piloto o país"}" value="${esc(query)}" autocomplete="off"></div>
      ${tab === "autos" ? `<nav class="jump" aria-label="Ir a década">${decades.map((d) => `<button class="chip" data-d="${d}">${decadeName(d)}</button>`).join("")}</nav>` : ""}
      <div id="list"></div>`;
    renderList();
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
      if (!q) return true;
      const e = c.etiqueta;
      return Matcher.norm([e.equipo, e.chasis, e.anio, e.piloto, e.carrera, ...(c.pilotos || []).map((p) => p.nombre)].join(" ")).includes(q);
    });
    if (!match.length) { list.innerHTML = `<div class="empty">No hay autos que coincidan con “${esc(query)}”.</div>`; return; }
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

  // ---------- Audio: mp3 si existe; si no, voz del celular leyendo el relato ----------
  function setupAudio(car) {
    const box = document.getElementById("audio");
    if (!box) return;
    const btn = box.querySelector(".play"), bar = box.querySelector(".progress i"), track = box.querySelector(".progress"), lbl = box.querySelector("small");
    const setPlaying = (on) => { btn.innerHTML = on ? ICON.pause : ICON.play; btn.setAttribute("aria-label", on ? "Pausar" : "Reproducir historia"); box.classList.toggle("playing", on); state.playing = on; };
    const state = { playing: false };
    setPlaying(false);

    let mode = "tts";
    const audio = car.audio ? new Audio(car.audio) : null;
    const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
    const ttsVoice = () => {
      const voices = speechSynthesis.getVoices();
      return voices.find((v) => /^es[-_](AR|419|US|MX)/i.test(v.lang)) || voices.find((v) => /^es/i.test(v.lang));
    };
    const stopAll = () => {
      if (audio) audio.pause();
      if ("speechSynthesis" in window) speechSynthesis.cancel();
      setPlaying(false);
    };

    if (audio) {
      audio.preload = "metadata";
      const durLabel = () => { lbl.textContent = isFinite(audio.duration) ? `Narración · ${fmt(audio.duration)}` : "Narración"; };
      audio.addEventListener("loadedmetadata", () => { mode = "mp3"; durLabel(); });
      audio.addEventListener("durationchange", () => { if (mode === "mp3") durLabel(); });
      audio.addEventListener("error", () => { mode = "tts"; lbl.textContent = "Voz del celular"; });
      audio.addEventListener("timeupdate", () => {
        if (!isFinite(audio.duration)) return;
        bar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
        if (state.playing) lbl.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
      });
      audio.addEventListener("ended", () => { setPlaying(false); bar.style.width = "0"; });
      // tocar o arrastrar la barra para adelantar
      const seek = (ev) => {
        if (mode !== "mp3" || !isFinite(audio.duration)) return;
        const r = track.getBoundingClientRect();
        audio.currentTime = Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width)) * audio.duration;
      };
      track.addEventListener("pointerdown", (ev) => { seek(ev); track.setPointerCapture(ev.pointerId); track.onpointermove = seek; });
      track.addEventListener("pointerup", () => { track.onpointermove = null; });
    }
    lbl.textContent = audio ? "Cargando…" : "Voz del celular";

    function play() {
      if (mode === "mp3" && audio) return audio.play().then(() => setPlaying(true));
      if (!("speechSynthesis" in window)) { lbl.textContent = "Este navegador no puede leer en voz alta"; return Promise.reject(); }
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(car.relato);
      u.lang = "es-AR"; const v = ttsVoice(); if (v) u.voice = v;
      u.onboundary = (ev) => { bar.style.width = (ev.charIndex / car.relato.length) * 100 + "%"; };
      u.onend = () => { setPlaying(false); bar.style.width = "0"; };
      speechSynthesis.speak(u);
      setPlaying(true);
      return Promise.resolve();
    }
    btn.onclick = () => (state.playing ? (audio && mode === "mp3" ? (audio.pause(), setPlaying(false)) : stopAll()) : play().catch(() => {}));
    player = { stop: stopAll };

    if (autoplayNext) {
      autoplayNext = false;
      setTimeout(() => play().catch(() => {}), audio ? 600 : 50);
    }
  }

  // ---------- Ficha ----------
  function detail(id) {
    const c = byId[id];
    if (!c) { location.hash = "#/"; return; }
    const e = c.etiqueta, t = c.temporada || {};
    const idx = cars.indexOf(c), prev = cars[idx - 1], next = cars[idx + 1];
    back.hidden = false;
    appbarTitle.textContent = `${e.chasis} · ${e.anio}`;
    const stat = (v, l) => (v == null ? "" : `<div class="stat"><b>${esc(v)}</b><small>${l}</small></div>`);
    const stats = [stat(t.victorias, "victorias"), stat(t.poles, "poles"), stat(t.carreras, "carreras")].filter(Boolean);
    const cx = connections(c);

    view.innerHTML = `
      <section class="hero ${isLight(c.color) ? "light" : ""}" style="${vars(c)}">
        <div class="stripes"></div>
        <span class="bignum">${c.numero ?? ""}</span>
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
          <div class="row"><b>Escuchá su historia</b><span class="eq-bars" aria-hidden="true"><i></i><i></i><i></i></span></div>
          <small></small>
          <div class="progress" role="slider" aria-label="Posición del audio"><i></i></div>
        </div>
      </div>` : ""}

      ${c.temporada ? `<section class="sec">${secHead("chart", `Temporada ${e.anio}`)}
        ${stats.length ? `<div class="stats" style="grid-template-columns:repeat(${stats.length},1fr)">${stats.join("")}</div>` : ""}
        <div class="facts">
          ${t.pilotos ? `<div class="fact"><small>Pilotos</small><b>${esc(t.pilotos)}</b></div>` : ""}
          ${t.constructores ? `<div class="fact"><small>Constructores</small><b>${esc(t.constructores)}</b></div>` : ""}
        </div></section>` : ""}

      ${c.titulos?.length ? `<section class="sec">${secHead("trophy", "Títulos")}<div class="titles">
        ${c.titulos.map((x) => `<div class="title">${ICON.trophy}<span>${esc(x)}</span></div>`).join("")}</div></section>` : ""}

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
    setupAudio(c);
  }

  // ---------- Ficha de piloto ----------
  function driverPage(id) {
    const d = drivers.find((x) => x.id === id);
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

  function route() {
    if (player) { player.stop(); player = null; }
    const m = location.hash.match(/^#\/auto\/(.+)$/);
    const p = location.hash.match(/^#\/piloto\/(.+)$/);
    if (m) detail(decodeURIComponent(m[1]));
    else if (p) driverPage(decodeURIComponent(p[1]));
    else home();
    view.style.animation = "none"; void view.offsetWidth; view.style.animation = "";
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();
  audioCheck.then(() => { if (!/^#\/(auto|piloto)\//.test(location.hash)) renderList(); });

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
