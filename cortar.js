// Corta un mp3 largo en varios, sin recodificar (copia los cuadros MP3 tal cual).
//
//   node cortar.js <archivo.mp3> <id1>@<inicio> <id2>@<inicio> ...
//
// Cada <inicio> es el segundo donde empieza ese auto dentro del archivo largo.
// Cada pedazo va hasta el inicio del siguiente (el último, hasta el final).
// Los mp3 se guardan en audio/<id>.mp3 (pisa los que existan con ese nombre).
//
// Ejemplo:
//   node cortar.js audio/completo.mp3 w196-1955-fangio@0 308b-1975-hunt@45.9 312t2-1977-lauda@87.4

const fs = require("fs");
const path = require("path");

const [file, ...specs] = process.argv.slice(2);
if (!file || !specs.length) { console.log("Uso: node cortar.js <archivo.mp3> <id>@<segundo> ..."); process.exit(1); }
const cuts = specs.map((s) => { const [id, t] = s.split("@"); return { id, t: parseFloat(t) }; }).sort((a, b) => a.t - b.t);

const buf = fs.readFileSync(file);
let pos = 0;
if (buf.slice(0, 3).toString() === "ID3") {
  pos = 10 + (((buf[6] & 127) << 21) | ((buf[7] & 127) << 14) | ((buf[8] & 127) << 7) | (buf[9] & 127));
}

// Tablas MPEG-1 Layer III
const BR = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0];
const SR = [44100, 48000, 32000, 0];

const frames = []; // { start, end, time }
let time = 0;
while (pos + 4 <= buf.length) {
  const h = buf.readUInt32BE(pos);
  const sync = (h >>> 21) === 0x7ff, ver = (h >> 19) & 3, layer = (h >> 17) & 3;
  const br = BR[(h >> 12) & 15], sr = SR[(h >> 10) & 3], pad = (h >> 9) & 1;
  if (!sync || ver !== 3 || layer !== 1 || !br || !sr) { pos++; continue; } // busca el próximo cuadro válido
  const size = Math.floor((144000 * br) / sr) + pad;
  frames.push({ start: pos, end: pos + size, time });
  time += 1152 / sr;
  pos += size;
}
console.log(`${frames.length} cuadros, ${time.toFixed(1)} s`);

fs.mkdirSync(path.join(__dirname, "audio"), { recursive: true });
cuts.forEach((c, i) => {
  const t1 = c.t, t2 = i + 1 < cuts.length ? cuts[i + 1].t : Infinity;
  const sel = frames.filter((f) => f.time >= t1 && f.time < t2);
  if (!sel.length) { console.log(`  ${c.id}: vacío, revisá los tiempos`); return; }
  const out = Buffer.concat(sel.map((f) => buf.slice(f.start, f.end)));
  const dest = path.join(__dirname, "audio", c.id + ".mp3");
  fs.writeFileSync(dest, out);
  console.log(`  ${c.id}.mp3  ${t1.toFixed(1)}s → ${(sel[sel.length - 1].time + 0.026).toFixed(1)}s  (${(sel.length * 1152 / 44100).toFixed(1)} s)`);
});
