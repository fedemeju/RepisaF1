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
//
//   node audios.js azure
//      Lo mismo, pero con las voces argentinas de Microsoft (Azure): Tomás por defecto.
//      Gratis hasta 500.000 caracteres por mes (todos los relatos suman unos 40.000).
//      Necesita dos variables de entorno (no se guardan en ningún archivo):
//        AZURE_SPEECH_KEY     la clave del recurso de Voz (Azure → tu recurso → "Claves y punto de conexión")
//        AZURE_SPEECH_REGION  la región del recurso, ej. brazilsouth o eastus
//      Opcionales: AZURE_VOICE (es-AR-TomasNeural, o es-AR-ElenaNeural para la voz de mujer)
//                  AZURE_RATE  velocidad, ej. +5% o -5% (por defecto 0%)
//      Para probar con un solo auto: node audios.js azure rb18-2022-verstappen
//      Con --rehacer también reemplaza los mp3 que ya existen (ej. los hechos con otra voz).

const fs = require("fs");
const path = require("path");

global.window = {};
require("./data/autos.js");
// Opcional: limitar a algunos autos →  node audios.js guiones rb18-2022-verstappen w196-1955-fangio
const rehacer = process.argv.includes("--rehacer");
const soloIds = process.argv.slice(3).filter((x) => !x.startsWith("--"));
// Los autos con oculto: true no se muestran en la app: no se les hace audio (salvo que se pidan por id)
const AUTOS = soloIds.length ? window.AUTOS.filter((a) => soloIds.includes(a.id)) : window.AUTOS.filter((a) => !a.oculto);
const dir = path.join(__dirname, "audio");
fs.mkdirSync(dir, { recursive: true });

const segundos = (t) => Math.round(t.split(/\s+/).length / 2.6);

// Intervención de Juan Fossaroli (campo juan de cada auto). La app la pasa pegada al relato, como un
// solo audio:  relato → Juan: "Fernando…" → Fernando: "¿Sí, Juan?" → Juan: una entrada → Juan: el comentario.
// Las frases fijas y las entradas se graban UNA vez y sirven para todos los autos:
//   audio/juan/juan-fernando.mp3      (voz de Juan)      "Fernando…"
//   audio/juan/fernando-si-juan.mp3   (voz de Fernando)  "¿Sí, Juan?"
//   audio/juan/entrada-1.mp3 … entrada-4.mp3 (voz de Juan): cada vez suena una al azar (opcionales)
// y por auto solo el comentario:  audio/juan/<id del auto>.mp3  (voz de Juan)
// Mientras falte "Fernando…", "¿Sí, Juan?" o el comentario, la app pasa solo el relato.
// Los comandos generar y azure no los hacen (otra voz): los textos están en GUIONES.md.
const JUAN_FIJOS = [
  ["juan-fernando.mp3", "Juan", "Fernando…"],
  ["fernando-si-juan.mp3", "Fernando", "¿Sí, Juan?"],
  ["entrada-1.mp3", "Juan", "Esta no la tenías, Fer."],
  ["entrada-2.mp3", "Juan", "Mirá este dato."],
  ["entrada-3.mp3", "Juan", "Te tiro una que poca gente sabe."],
  ["entrada-4.mp3", "Juan", "Un dato de color, Fer."]
];

function guiones() {
  const ordenados = [...AUTOS].sort((a, b) => a.etiqueta.anio - b.etiqueta.anio);
  let md = `# Guiones para los audios\n\nUn mp3 por auto. Guardalo en esta carpeta (\`audio/\`) con el nombre exacto que figura en cada uno.\n` +
    `Duración estimada a ritmo normal de narración.\n\n`;
  let total = 0;
  const juan = [];
  for (const a of ordenados) {
    const e = a.etiqueta, file = path.basename(a.audio), s = segundos(a.relato);
    const hay = fs.existsSync(path.join(dir, file));
    total += a.relato.length;
    md += `---\n\n## ${e.equipo} ${e.chasis} · ${e.anio} · ${e.piloto}\n\n` +
      `**Archivo:** \`${file}\` ${hay ? "✅ ya está" : "⬜ falta"} · ~${s} s · ${a.relato.length} caracteres\n\n` +
      `${a.relato}\n\n`;
    if (a.juan) {
      const fj = `juan/${a.id}.mp3`, hayJ = fs.existsSync(path.join(dir, fj));
      juan.push(a);
      md += `**Comentario de Juan:** \`${fj}\` ${hayJ ? "✅ ya está" : "⬜ falta"} · ${a.juan.length} caracteres\n\n> ${a.juan}\n\n`;
    }
  }
  md += `---\n\nTotal: ${AUTOS.length} textos, ${total} caracteres.\n`;
  // Juan: las frases fijas (una sola vez) y la lista de comentarios
  const est = (f) => (fs.existsSync(path.join(dir, f)) ? "✅ ya está" : "⬜ falta");
  md += `\n---\n\n# Intervenciones de Juan Fossaroli (${juan.length} autos)\n\n` +
    `Suenan pegadas al final del relato: Juan: "Fernando…" → Fernando: "¿Sí, Juan?" → Juan: una entrada → Juan: el comentario.\n` +
    `Las entradas son opcionales: cada vez suena una al azar entre las que estén grabadas.\n` +
    `Mientras falte "Fernando…", "¿Sí, Juan?" o el comentario del auto, la app pasa solo el relato.\n\n` +
    `**Se graban una sola vez (sirven para todos los autos):**\n\n` +
    JUAN_FIJOS.map(([f, quien, t]) => `- \`juan/${f}\` ${est("juan/" + f)} · voz de ${quien}: "${t}"`).join("\n") +
    `\n\n**Un comentario por auto (voz de Juan),** el texto está arriba en cada auto:\n\n` +
    juan.map((a) => `- \`juan/${a.id}.mp3\` ${est(`juan/${a.id}.mp3`)} · ${a.etiqueta.equipo} ${a.etiqueta.chasis} ${a.etiqueta.anio}`).join("\n") + "\n";
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

const xml = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

async function azure() {
  const key = process.env.AZURE_SPEECH_KEY, region = (process.env.AZURE_SPEECH_REGION || "").trim();
  const voz = process.env.AZURE_VOICE || "es-AR-TomasNeural", rate = process.env.AZURE_RATE || "0%";
  if (!key || !region) {
    console.log("Faltan AZURE_SPEECH_KEY y/o AZURE_SPEECH_REGION. Mirá las instrucciones al principio de este archivo.");
    process.exit(1);
  }
  const pendientes = AUTOS.filter((a) => rehacer || !fs.existsSync(path.join(dir, path.basename(a.audio))));
  const chars = pendientes.reduce((n, a) => n + a.relato.length, 0);
  console.log(`${pendientes.length} audios por generar con ${voz} (${chars} caracteres).`);
  for (const a of pendientes) {
    const file = path.join(dir, path.basename(a.audio));
    process.stdout.write(`  ${path.basename(file)} … `);
    const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="es-AR">` +
      `<voice name="${voz}"><prosody rate="${rate}">${xml(a.relato)}</prosody></voice></speak>`;
    let res;
    for (let intento = 0; intento < 4; intento++) {
      res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": "audio-48khz-96kbitrate-mono-mp3",
          "User-Agent": "repisa-f1"
        },
        body: ssml
      });
      if (res.status !== 429) break;
      process.stdout.write("(esperando el límite por minuto) ");
      await esperar(20000); // el plan gratis acepta unos 20 pedidos por minuto
    }
    if (!res.ok) {
      console.log(`error ${res.status}: ${(await res.text()).slice(0, 200) || "(sin detalle)"}`);
      if (res.status === 401 || res.status === 403) { console.log("Revisá la clave y que la región sea la del recurso."); break; }
      continue;
    }
    fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    console.log("listo");
    await esperar(3200);
  }
  guiones();
}

const cmd = process.argv[2];
if (cmd === "guiones") guiones();
else if (cmd === "generar") generar();
else if (cmd === "azure") azure();
else console.log("Uso: node audios.js guiones   |   node audios.js generar   |   node audios.js azure");
