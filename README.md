# Mi Repisa F1

App web para el celular: escaneás la etiqueta negra del modelo y abre la ficha del auto.
No usa IA: toda la información está escrita en `data/autos.js` y el reconocimiento de
texto (Tesseract) corre dentro del propio celular.

## Cómo está armada

| Archivo | Qué hace |
|---|---|
| `data/autos.js` | La base de datos: un bloque por auto. **Es lo único que hay que ir completando.** |
| `audio/` | Los mp3 narrados (uno por auto, con el nombre que diga el campo `audio`). |
| `scanner.js` | Cámara + lectura de la etiqueta. |
| `matcher.js` | Compara lo leído con la base (chasis, año, piloto) y tolera errores de lectura. |
| `app.js` / `app.css` | Pantallas: repisa, búsqueda, filtros por época, ficha y reproductor. |
| `data/pilotos.js` | Fichas de pilotos. Se enlazan solas con los autos por el nombre. |
| `logos/` + `indexar-logos.js` | Logos de equipos (opcional). Después de agregar o borrar uno: `node indexar-logos.js` |
| `servidor.js` | Para probar en la compu: `node servidor.js` → http://localhost:8080 |

> ⚠️ **Antes de publicar o compartir el link:** los audios usan un clon de la voz de
> Fernando Tornello sin permiso y la carpeta `logos/` tiene logos oficiales (marcas registradas).
> Las dos cosas son solo para uso personal. Qué hacer en `PENDIENTE-ANTES-DE-PUBLICAR.md`.

## Ponerla en el celular

La cámara en vivo solo funciona por **https**. La forma más simple y gratis:

1. Entrá a https://app.netlify.com/drop
2. Arrastrá la carpeta `f1-repisa` entera.
3. Te da un link `https://…netlify.app`. Abrilo en el celu → menú → **Agregar a la pantalla de inicio**.

Después de la primera vez funciona sin internet. Si cambiás algo, volvé a arrastrar la
carpeta y subí el número de `CACHE` en `sw.js` (ej. `repisa-f1-v2`).

## Audios

1. Copiá el texto del campo `relato` de cada auto.
2. Generá la voz con la herramienta que prefieras (ElevenLabs, etc.), en mp3.
3. Guardalo en `audio/` con el nombre exacto del campo `audio` (ej. `audio/rb18-2022-verstappen.mp3`).

**Con la voz argentina de Microsoft (Tomás), todo de una:** con las variables `AZURE_SPEECH_KEY` y
`AZURE_SPEECH_REGION` cargadas, `node audios.js azure` genera todos los mp3 que falten (gratis hasta
500.000 caracteres por mes). Detalles al principio de `audios.js`.

Si un auto todavía no tiene mp3, el botón de play lee el relato con la voz del celular.
Al escanear un auto, el audio arranca solo.

## Logos de los equipos (opcional, solo uso personal)

Guardá la imagen en la carpeta `logos/` con el nombre del equipo en minúsculas, en `.png` o `.svg`.
Si no hay archivo, la app muestra un escudo con las siglas y los colores del equipo.

| Equipo en la etiqueta | Archivo |
|---|---|
| Ferrari | `logos/ferrari.png` |
| McLaren | `logos/mclaren.png` |
| Williams | `logos/williams.png` |
| Mercedes / Mercedes-AMG | `logos/mercedes.png` |
| Red Bull Racing | `logos/red-bull.png` |
| Renault | `logos/renault.png` |
| Brawn GP | `logos/brawn.png` |
| Toleman | `logos/toleman.png` |
| Hesketh | `logos/hesketh.png` |

Preferí imágenes con fondo transparente. Ojo: los logos son marcas registradas.
Para uso personal no hay problema, pero no los incluyas si publicás la app.

## Consejos para escanear

- Acercá el celu hasta que la etiqueta llene el recuadro blanco.
- Evitá el reflejo de la vitrina de acrílico: inclinalo un poco o sacá la tapa.
- Si duda entre dos autos, te muestra botones para elegir.
- Si la etiqueta no se lee, tocá **Reconocer el auto** (abajo a la derecha) y encuadrá la cajita entera:
  reconoce el auto por cómo se ve, comparándolo con las fotos de `repisa/` (`reconocer.js`). La primera vez
  baja OpenCV (~10 MB) y después anda sin internet. Si no está seguro, te muestra los más parecidos.
