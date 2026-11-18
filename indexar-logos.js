// Registra los logos (carpeta logos/) y las fotos de los autos (carpeta fotos/)
// para que la app sepa cuáles existen.
// Correlo cada vez que agregues o borres un logo o una foto:   node indexar-logos.js
//
//   logos/<equipo>.png   → ej. logos/ferrari.png   (ver la tabla en el README)
//   fotos/<id-del-auto>.jpg → ej. fotos/312t2-1977-lauda.jpg  (el id está en data/autos.js)
const fs = require("fs"), path = require("path");

function indexar(carpeta, variable, archivo) {
  const dir = path.join(__dirname, carpeta);
  const map = {};
  for (const f of fs.existsSync(dir) ? fs.readdirSync(dir).sort() : []) {
    const m = /^(.+)\.(png|svg|gif|webp|jpe?g)$/i.exec(f);
    if (m && !map[m[1]]) map[m[1]] = `${carpeta}/${f}`;
  }
  fs.writeFileSync(path.join(__dirname, "data", archivo),
    `// Generado por indexar-logos.js — no editar a mano.\nwindow.${variable} = ${JSON.stringify(map, null, 2)};\n`);
  return map;
}

const logos = indexar("logos", "LOGOS", "logos.js");
console.log(`data/logos.js: ${Object.keys(logos).length} logos (${Object.keys(logos).join(", ") || "ninguno"})`);

const fotos = indexar("fotos", "FOTOS", "fotos.js");
// Si hay créditos (fotos/creditos.json, lo genera la descarga desde Wikimedia), se agregan a cada foto
const credPath = path.join(__dirname, "fotos", "creditos.json");
if (fs.existsSync(credPath)) {
  const cred = JSON.parse(fs.readFileSync(credPath, "utf8"));
  const conCredito = Object.fromEntries(Object.entries(fotos).map(([k, src]) => [k, cred[k] ? { src, credito: cred[k].credito } : src]));
  fs.writeFileSync(path.join(__dirname, "data", "fotos.js"),
    `// Generado por indexar-logos.js — no editar a mano.\nwindow.FOTOS = ${JSON.stringify(conCredito, null, 2)};\n`);
}
global.window = {};
require("./data/autos.js");
const ids = new Set(window.AUTOS.map((a) => a.id));
const raras = Object.keys(fotos).filter((k) => !ids.has(k));
console.log(`data/fotos.js: ${Object.keys(fotos).length} fotos de autos`);
if (raras.length) console.log(`  ⚠ estos nombres no coinciden con ningún auto: ${raras.join(", ")}`);
