// Herramienta de audios de la repisa
//
//   node audios.js guiones
//      Crea audio/GUIONES.md: el texto de cada auto y el nombre exacto del mp3,
//      para copiar y pegar en ElevenLabs (o cualquier otra voz).
//
//   (a los dos comandos se les puede agregar al final ids de autos para hacer solo esos)
//
//   node audios.js generar
//      Genera todos los mp3 que falten usando la API de ElevenLabs.
//      Necesita dos variables de entorno (no se guardan en ningún archivo):
//        ELEVEN_API_KEY   tu clave de API (ElevenLabs → Profile → API Keys)
//        ELEVEN_VOICE_ID  el id de la voz elegida (Voices → la voz → "Copy voice ID")
//      Los mp3 que ya existen no se vuelven a generar (no gasta créditos de más).
//      Para regenerar uno, borrá su mp3 y corré de nuevo.

const fs = require("fs");
const path = require("path");

global.window = {};
require("./data/autos.js");
// Opcional: limitar a algunos autos →  node audios.js guiones rb18-2022-verstappen w196-1955-fangio
const soloIds = process.argv.slice(3);
const AUTOS = soloIds.length ? window.AUTOS.filter((a) => soloIds.includes(a.id)) : window.AUTOS;
const dir = path.join(__dirname, "audio");
fs.mkdirSync(dir, { recursive: true });

const segundos = (t) => Math.round(t.split(/\s+/).length / 2.6);

function guiones() {
  const ordenados = [...AUTOS].sort((a, b) => a.etiqueta.anio - b.etiqueta.anio);
  let md = `# Guiones para los audios\n\nUn mp3 por auto. Guardalo en esta carpeta (\`audio/\`) con el nombre exacto que figura en cada uno.\n` +
    `Duración estimada a ritmo normal de narración.\n\n`;
  let total = 0;
  for (const a of ordenados) {
    const e = a.etiqueta, file = path.basename(a.audio), s = segundos(a.relato);
    const hay = fs.existsSync(path.join(dir, file));
    total += a.relato.length;
    md += `---\n\n## ${e.equipo} ${e.chasis} · ${e.anio} · ${e.piloto}\n\n` +
      `**Archivo:** \`${file}\` ${hay ? "✅ ya está" : "⬜ falta"} · ~${s} s · ${a.relato.length} caracteres\n\n` +
      `${a.relato}\n\n`;
  }
  md += `---\n\nTotal: ${AUTOS.length} textos, ${total} caracteres.\n`;
  fs.writeFileSync(path.join(dir, "GUIONES.md"), md);
  console.log(`audio/GUIONES.md creado: ${AUTOS.length} textos, ${total} caracteres en total.`);
}

async function generar() {
  const key = process.env.ELEVEN_API_KEY, voice = process.env.ELEVEN_VOICE_ID;
  if (!key || !voice) {
    console.log("Faltan ELEVEN_API_KEY y/o ELEVEN_VOICE_ID. Mirá las instrucciones al principio de este archivo.");
    process.exit(1);
  }
  const pendientes = AUTOS.filter((a) => !fs.existsSync(path.join(dir, path.basename(a.audio))));
  const chars = pendientes.reduce((n, a) => n + a.relato.length, 0);
  console.log(`${pendientes.length} audios por generar (${chars} caracteres).`);
  for (const a of pendientes) {
    const file = path.join(dir, path.basename(a.audio));
    process.stdout.write(`  ${path.basename(file)} … `);
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`, {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({ text: a.relato, model_id: "eleven_multilingual_v2" })
    });
    if (!res.ok) {
      console.log(`error ${res.status}: ${(await res.text()).slice(0, 200)}`);
      if (res.status === 401 || res.status === 402 || res.status === 429) break; // clave mala, sin créditos o límite
      continue;
    }
    fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    console.log("listo");
  }
  guiones();
}

const cmd = process.argv[2];
if (cmd === "guiones") guiones();
else if (cmd === "generar") generar();
else console.log("Uso: node audios.js guiones   |   node audios.js generar");
