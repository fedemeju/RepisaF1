// Busca y baja fotos de los autos REALES desde Wikimedia Commons (licencias libres).
//   node bajar-fotos.js            → baja las que falten (va despacio: Wikimedia frena las descargas seguidas)
//   node bajar-fotos.js <id> ...   → solo esos autos (si ya tienen foto, borrala antes para cambiarla)
// Guarda fotos/<id>.jpg y el autor/licencia en fotos/creditos.json. Al final corre indexar-logos.js.
const fs = require("fs"), path = require("path");
global.window = {};
require("./data/autos.js");

const DIR = path.join(__dirname, "fotos");
const CRED = path.join(DIR, "creditos.json");
const API = "https://commons.wikimedia.org/w/api.php";
const UA = "repisa-app/1.0 (personal hobby project)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
fs.mkdirSync(DIR, { recursive: true });
const cred = fs.existsSync(CRED) ? JSON.parse(fs.readFileSync(CRED, "utf8")) : {};

const norm = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
const compact = (s) => norm(s).replace(/[^A-Z0-9]/g, "");
// Lo que NO queremos: modelos a escala, réplicas, cascos, motores, logos, etc.
const MALO = /model|scale|1[:_-]?(18|20|24|43)\b|diecast|die-cast|replica|lego|toy|miniatur|maqueta|helmet|casco|logo|badge|emblem|engine|motor\b|steering|cockpit|poster|stamp|sello|livery\b|drawing|sketch|\.svg$|pitot|probe|fl[uü]gel|\bnase\b|wheel|suspension|gearbox|detail|museum of jordan|jordan museum/i;

async function api(params) {
  for (let i = 0; i < 6; i++) {
    const r = await fetch(API + "?" + new URLSearchParams({ format: "json", ...params }), { headers: { "User-Agent": UA } });
    if (r.status === 429 || r.status >= 500) { await sleep(30000 * (i + 1)); continue; }
    return r.json();
  }
  throw new Error("la API no responde");
}

// Fotos elegidas a mano cuando el modelo es una versión especial (id del auto → archivo de Commons).
// Para cambiar una: poné acá el archivo que quieras, borrá fotos/<id>.jpg y corré  node bajar-fotos.js <id>
const FIJAS = {
  // la que encontraba sola era desde la tribuna, con el auto chiquito
  "fw14b-1992-mansell": "File:Nigel Mansell's World Championship Winning 1992 Williams Renault FW14B (49254927811).jpg",
  // la de Ascari era roja con el 12 (la blanca "Grant Piston Rings" es otra 375 Indy)
  "375indy-1952-ascari": "File:Ferrari 375 Indy 500.jpg",
  // tu modelo es la versión carenada (ruedas tapadas), no la de ruedas descubiertas
  "w196-1955-fangio": "File:Paris - Retromobile 2014 - Mercedes-Benz W 196 R Stromlinie- 1954 - 001.jpg",
  // la búsqueda automática eligió mal (estatua del museo de Jordania, Lotus rosa, auto diminuto…)
  "jordan199-1999-frentzen": "File:Heinz-Harald Frentzen 1999 Canada.jpg",
  "72d-1972-fittipaldi": "File:Emerson Fittipaldi 1972 Austrian GP.jpg",
  "312t2-1977-lauda": "File:Niki Lauda - Ferrari 312T2 - 1976 Race of Champions, Brands Hatch.jpg",
  "bgp001-2009-button": "File:Jenson Button 2009 Germany.jpg",
  // no las encontraba solo
  "a1b-1979-patrese": "File:Riccardo Patrese 1979 Imola.jpg",
  "bt52b-1983-piquet": "File:Nelson Piquet driving Brabham BT52 2013 Goodwood Festival of Speed.jpg",
  "512f1-1964-bandini": "File:Ferrari 1512 (35681758636).jpg",
  // el archivo que elegía la búsqueda está bloqueado en Wikimedia
  "m23-1976-hunt": "File:James Hunt's 1976 World Championship Winning McLaren M23 (6838108365).jpg",
  "mp4-23-2008-hamilton": "File:Lewis Hamilton's 2008 Mclaren MP4-23 (52337835592).jpg"
};

function puntaje(title, car) {
  const e = car.etiqueta, t = compact(title), tw = norm(title);
  const ch = compact(e.chasis);
  const surname = norm(e.piloto).split(/\s+/).pop();
  const team = norm(e.equipo).split(/\s+/).filter((w) => w.length > 2);
  const hasTeam = team.some((w) => tw.includes(w));
  let s = 0;
  if (ch.length >= 3 && !/^\d+$/.test(ch) && t.includes(ch)) s += 4;
  // chasis cortos o solo números (25, 512, 006): tiene que aparecer como palabra suelta y con el equipo
  else if (/^\d+$/.test(ch) || ch.length < 3) {
    const re = new RegExp(`(^|[^0-9A-Z])${norm(e.chasis).replace(/[^A-Z0-9]/g, "")}([^0-9A-Z]|$)`);
    if (re.test(tw.replace(/\s+/g, " ")) && hasTeam) s += 4;
  }
  if (surname && tw.includes(surname)) s += 2;
  if (hasTeam) s += 1;
  if (tw.includes(String(e.anio))) s += 1;
  return s;
}

async function buscar(car) {
  const e = car.etiqueta, surname = e.piloto.split(/\s+/).pop();
  const consultas = [`${e.equipo} ${e.chasis} ${surname}`, `${e.equipo} ${e.chasis}`, `${e.equipo} ${e.chasis} ${e.anio}`, `${e.chasis} ${e.anio}`, `${e.chasis} ${surname}`];
  const vistos = new Map();
  for (const q of consultas) {
    const j = await api({ action: "query", list: "search", srnamespace: "6", srlimit: "25", srsearch: q + " filetype:bitmap" });
    for (const r of (j.query && j.query.search) || []) {
      if (!/\.jpe?g$/i.test(r.title) || MALO.test(r.title)) continue;
      vistos.set(r.title, puntaje(r.title, car));
    }
    await sleep(1500);
  }
  const mejor = [...vistos].sort((a, b) => b[1] - a[1])[0];
  // hace falta el chasis más algo más (piloto, equipo o año) para confiar
  return mejor && mejor[1] >= 5 ? mejor[0] : null;
}

async function info(title) {
  const j = await api({ action: "query", prop: "imageinfo", iiprop: "url|extmetadata", iiurlwidth: "1280", titles: title });
  const p = Object.values(j.query.pages)[0];
  const ii = p.imageinfo && p.imageinfo[0];
  if (!ii) return null;
  const m = ii.extmetadata || {};
  const plano = (v) => String((v && v.value) || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  const autor = plano(m.Artist).slice(0, 60) || "autor desconocido";
  const lic = plano(m.LicenseShortName) || "ver Commons";
  // si la miniatura de 1280 no está generada Wikimedia responde 429: probamos 960 y después el original
  const urls = [ii.thumburl, ii.thumburl && ii.thumburl.replace(/\/1280px-/, "/960px-"), ii.url].filter((u, k, a) => u && a.indexOf(u) === k);
  return { urls, original: ii.url, pagina: ii.descriptionurl, credito: `${autor} · ${lic} · Wikimedia Commons` };
}

// El original puede pesar varios MB: lo dejamos en 1280 px de ancho (Windows, con System.Drawing).
function achicar(file) {
  const ps = `Add-Type -AssemblyName System.Drawing; $i=[System.Drawing.Image]::FromFile('${file}');
    if ($i.Width -le 1280) { $i.Dispose(); exit }
    $w=1280; $h=[int]($i.Height*1280/$i.Width); $b=New-Object System.Drawing.Bitmap $w,$h; $g=[System.Drawing.Graphics]::FromImage($b);
    $g.InterpolationMode='HighQualityBicubic'; $g.DrawImage($i,0,0,$w,$h); $i.Dispose();
    $c=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()|?{$_.MimeType -eq 'image/jpeg'}; $p=New-Object System.Drawing.Imaging.EncoderParameters 1;
    $p.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,[long]85); $b.Save('${file}',$c,$p)`;
  try { require("child_process").execFileSync("powershell", ["-NoProfile", "-Command", ps.replace(/\n\s*/g, " ")]); }
  catch (e) { console.log(`     (no pude achicar ${path.basename(file)}: queda el original)`); }
}

// Wikimedia le contesta 429 al fetch de Node con algunos archivos y a curl no: probamos curl primero.
function conCurl(url, dest) {
  try { require("child_process").execFileSync("curl", ["-sfL", "-A", UA, "-o", dest, url]); return fs.statSync(dest).size > 1000; }
  catch (_) { try { fs.unlinkSync(dest); } catch (__) {} return false; }
}

async function bajar(urls, dest) {
  for (const url of urls) if (conCurl(url, dest)) return url;
  for (const url of urls) {
    for (let i = 0; i < 3; i++) {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      if (r.ok) { fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer())); return url; }
      if (r.status !== 429 && r.status < 500) break;
      const espera = 60 * (i + 1);
      console.log(`     (Wikimedia frena: ${r.status}, espero ${espera}s)`);
      await sleep(espera * 1000);
    }
  }
  return null;
}

(async () => {
  const probar = process.argv.includes("--probar"); // solo muestra qué foto elegiría, sin bajar
  const soloIds = process.argv.slice(2).filter((x) => !x.startsWith("--"));
  const autos = window.AUTOS.filter((a) => (soloIds.length ? soloIds.includes(a.id) : !a.oculto))
    .filter((a) => !fs.readdirSync(DIR).some((f) => f.startsWith(a.id + ".")))
    .sort((a, b) => a.etiqueta.anio - b.etiqueta.anio);
  console.log(`${autos.length} autos sin foto`);
  let ok = 0, sinResultado = [];
  for (const car of autos) {
    const nombre = `${car.etiqueta.equipo} ${car.etiqueta.chasis} ${car.etiqueta.anio}`;
    try {
      const title = FIJAS[car.id] || await buscar(car);
      if (!title) { console.log(`✗ ${nombre}: no encontré una foto confiable`); sinResultado.push(car.id); continue; }
      if (probar) { console.log(`? ${nombre} ← ${title}`); ok++; continue; }
      const i = await info(title);
      if (!i) { console.log(`✗ ${nombre}: sin datos de ${title}`); sinResultado.push(car.id); continue; }
      const dest = path.join(DIR, car.id + ".jpg"), usada = await bajar(i.urls, dest);
      if (usada) {
        if (usada === i.original) achicar(dest);
        cred[car.id] = { credito: i.credito, archivo: title, pagina: i.pagina };
        fs.writeFileSync(CRED, JSON.stringify(cred, null, 2));
        ok++; console.log(`✓ ${nombre} ← ${title}`);
      } else { console.log(`✗ ${nombre}: no se pudo bajar`); sinResultado.push(car.id); }
    } catch (err) { console.log(`✗ ${nombre}: ${err.message}`); sinResultado.push(car.id); }
    if (!probar) await sleep(40000); // de a una, para que Wikimedia no bloquee
  }
  console.log(`\nFIN: ${ok} fotos ${probar ? "encontradas (prueba)" : "nuevas"}. Sin foto: ${sinResultado.join(", ") || "ninguno"}`);
  if (!probar) require("child_process").execFileSync("node", [path.join(__dirname, "indexar-logos.js")], { stdio: "inherit" });
})();
