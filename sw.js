// Guarda la app en el celular para que funcione sin internet.
// Subí el número de versión cuando cambies archivos para forzar la actualización.
const CACHE = "repisa-f1-v28";
const SHELL = ["./", "index.html", "app.css", "app.js", "matcher.js", "detector.js", "scanner.js", "reconocer.js", "data/autos.js", "data/pilotos.js", "data/logos.js", "data/repisa.js", "repisa3d.js", "data/fotos.js", "img/f1.webp", "manifest.webmanifest", "icon.svg", "img/icono/icon-192.png", "img/icono/favicon-64.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || req.headers.has("range")) return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  // Archivos propios: red primero (para ver cambios), cache si no hay señal.
  // Librería de OCR (CDN): cache primero.
  if (sameOrigin) {
    e.respondWith(
      fetch(req).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req).then((r) => r || caches.match("index.html")))
    );
  } else if (/jsdelivr|tessdata|unpkg|fonts.googleapis|fonts.gstatic/.test(url.host)) {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res;
      }))
    );
  }
});
