// Servidor local para probar:  node servidor.js
//   En la compu:  http://localhost:8080
//   En el celu (mismo wifi):  http://<IP de la compu>:8080  (solo "Sacar foto"; la cámara en vivo pide https)
const http = require("http"), fs = require("fs"), path = require("path");
const root = __dirname, port = process.env.PORT || 8080;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".svg": "image/svg+xml", ".json": "application/json", ".webmanifest": "application/manifest+json", ".mp3": "audio/mpeg", ".jpg": "image/jpeg", ".png": "image/png", ".md": "text/markdown; charset=utf-8", ".txt": "text/plain; charset=utf-8" };

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(root, path.normalize(p));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end("No encontrado"); }
    const type = types[path.extname(file).toLowerCase()] || "application/octet-stream";
    // Soporte de "Range": el navegador lo usa para saber la duración de los audios y adelantarlos
    const m = /bytes=(\d*)-(\d*)/.exec(req.headers.range || "");
    if (m) {
      const start = m[1] ? +m[1] : st.size - +m[2];
      const end = m[1] && m[2] ? Math.min(+m[2], st.size - 1) : st.size - 1;
      if (start >= st.size || start > end) { res.writeHead(416, { "Content-Range": `bytes */${st.size}` }); return res.end(); }
      res.writeHead(206, { "Content-Type": type, "Content-Length": end - start + 1, "Content-Range": `bytes ${start}-${end}/${st.size}`, "Accept-Ranges": "bytes" });
      return fs.createReadStream(file, { start, end }).pipe(res);
    }
    res.writeHead(200, { "Content-Type": type, "Content-Length": st.size, "Accept-Ranges": "bytes" });
    fs.createReadStream(file).pipe(res);
  });
}).listen(port, () => console.log("Repisa F1 en http://localhost:" + port));
