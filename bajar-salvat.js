// Fotos de catálogo de la colección Salvat para la repisa 3D.
// Baja de coleccionablesblog.com.ar la foto de cada entrega que está en el mueble (data/repisa.js)
// y la guarda en repisa-salvat/<fila>-<columna>.jpg, con el mismo nombre que usa repisa/.
//   node bajar-salvat.js
// ⚠️ Fotos con derechos del blog / Salvat: solo uso personal (ver PENDIENTE-ANTES-DE-PUBLICAR.md).
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
global.window = global;
require("./data/repisa.js");
const R = global.REPISA;

const PAGINA = "https://coleccionablesblog.com.ar/formula-1-the-car-collection/";
const DIR = path.join(__dirname, "repisa-salvat");

// número de entrega de Salvat de cada auto del mueble (null: no salió en la lista del blog;
// el W11 y el RB18 se pusieron a mano en repisa-salvat/10-4.jpg y 10-6.jpg, y la BT44B (03-1.jpg)
// el TG184 (05-5.jpg), el 97T (05-6.jpg) y el FW15C (06-6.jpg) se cambiaron por otras fotos. Las que ya existen no se vuelven a bajar: para rebajar una, borrala.)
const ENTREGA = {
  "375indy-1952-ascari": 41, "w196-1955-fangio": 9, "246f1-1958-hawthorn": 60, "lotus25-1963-clark": 30, "512f1-1964-bandini": 46, "ra300-1967-surtees": 45,
  "bt24-1967-hulme": 52, "p153-1970-rodriguez": 28, "p160b-1972-beltoise": 43, "72d-1972-fittipaldi": 7, "006-1973-stewart": 23, "751-1975-brambilla": 20,
  "bt44b-1975-pace": 16, "308b-1975-hunt": 42, "m23-1976-hunt": 27, "p34-1976-scheckter": 29, "312t2-1977-lauda": 2, "bt46b-1978-lauda": 55,
  "lotus79-1978-andretti": 34, "js11-1979-laffite": 40, "177-1979-giacomelli": 37, "fw07-1979-regazzoni": 57, "rs10-1979-jabouille": 31, "a1b-1979-patrese": 59,
  "bt49-1981-piquet": 13, "126c2-1982-andretti": 58, "011-1982-alboreto": 48, "bt52b-1983-piquet": 36, "tg184-1984-senna": 14, "97t-1985-senna": 39,
  "mp4-2b-1985-prost": 51, "fw11b-1987-piquet": 54, "191-1991-schumacher": 22, "fw14b-1992-mansell": 12, "mp4-8-1993-senna": 21, "fw15c-1993-prost": 17,
  "b194-1994-schumacher": 15, "fw19-1997-villeneuve": 25, "jordan199-1999-frentzen": 64, "mp4-14-1999-hakkinen": 32, "f399-1999-salo": 35, "f2001-2001-schumacher": 8,
  "f2002-2002-schumacher": 19, "f2004-2004-barrichello": 38, "c23-2004-massa": 26, "r24-2004-trulli": 49, "r25-2005-alonso": 4, "f2007-2007-raikkonen": 24,
  "mp4-23-2008-hamilton": 10, "str3-2008-vettel": 33, "ra106-2006-button": 63, "f108-2008-kubica": 50, "bgp001-2009-button": 6, "rb9-2013-vettel": 5,
  "f138-2013-alonso": 61, "fw36-2014-bottas": 66, "w05-2014-hamilton": 3, "w11-2020-hamilton": null, "sf70h-2017-vettel": 44, "rb18-2022-verstappen": null
};

(async () => {
  const html = await (await fetch(PAGINA, { headers: { "User-Agent": "Mozilla/5.0" } })).text();
  // En el post cada foto va después del texto "NN) Modelo (año) Piloto"
  const fotos = {};
  const re = /(\d{1,3})\)\s[^<]{3,90}|https:\/\/lh3\.googleusercontent\.com\/pw\/[A-Za-z0-9_-]+/g;
  let ultimo = null, m;
  while ((m = re.exec(html))) {
    if (m[1]) ultimo = +m[1];
    else if (ultimo && !fotos[ultimo]) fotos[ultimo] = m[0];
  }
  console.log(`Fotos encontradas en el blog: ${Object.keys(fotos).length}`);
  fs.mkdirSync(DIR, { recursive: true });
  let ok = 0;
  const faltan = [];
  R.lugares.forEach((fila, r) => fila.forEach((id, c) => {
    const n = ENTREGA[id], url = n && fotos[n];
    const dest = path.join(DIR, `${String(r + 1).padStart(2, "0")}-${c + 1}.jpg`);
    if (fs.existsSync(dest)) { ok++; return; } // ya bajada, o puesta a mano (W11 y RB18)
    if (!url) { faltan.push(`${r + 1}-${c + 1} ${id}`); return; }
    try { execFileSync("curl", ["-sfL", "-A", "Mozilla/5.0", "-o", dest, url + "=w1000-no"]); ok++; process.stdout.write("."); }
    catch (_) { faltan.push(`${r + 1}-${c + 1} ${id} (falló la descarga)`); }
  }));
  console.log(`\nListas: ${ok}. Sin foto (se usa la del mueble): ${faltan.length}`);
  faltan.forEach((f) => console.log("  - " + f));
})();
