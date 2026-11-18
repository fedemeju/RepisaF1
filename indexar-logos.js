// Registra los logos que hay en la carpeta logos/ para que la app sepa cuáles existen.
// Correlo cada vez que agregues o borres un logo:   node indexar-logos.js
const fs = require("fs"), path = require("path");
const dir = path.join(__dirname, "logos");
const map = {};
for (const f of fs.existsSync(dir) ? fs.readdirSync(dir) : []) {
  const m = /^(.+)\.(png|svg|gif|webp|jpe?g)$/i.exec(f);
  if (m && !map[m[1]]) map[m[1]] = `logos/${f}`;
}
fs.writeFileSync(path.join(__dirname, "data", "logos.js"),
  `// Generado por indexar-logos.js — no editar a mano.\nwindow.LOGOS = ${JSON.stringify(map, null, 2)};\n`);
console.log(`data/logos.js: ${Object.keys(map).length} logos (${Object.keys(map).join(", ") || "ninguno"})`);
