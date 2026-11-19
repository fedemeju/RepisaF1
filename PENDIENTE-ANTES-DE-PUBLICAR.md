# ⚠️ Pendiente antes de publicar o compartir la app

Hoy la app tiene dos cosas que **solo sirven para uso personal**. Antes de subirla
(Netlify, Play Store, venderla o mandar el link a otros) hay que resolverlas:

## 1. La voz de los audios

Los mp3 de esta carpeta generados el 18/11/2026 usan un **clon de la voz de Fernando Tornello**
(ElevenLabs, clonación instantánea) **sin su permiso**.

Qué hacer: regenerar todos con una voz con licencia (biblioteca de ElevenLabs en plan pago)
o conseguir el permiso de Tornello.

Motivo: clonar la voz de una persona real sin consentimiento incumple las condiciones de ElevenLabs,
y en Argentina el art. 53 del Código Civil y Comercial exige consentimiento para reproducir la voz de alguien.

Audios con la voz de Tornello:

- 375indy-1952-ascari.mp3
- w196-1955-fangio.mp3
- 308b-1975-hunt.mp3
- 312t2-1977-lauda.mp3
- tg184-1984-senna.mp3
- mp4-8-1993-senna.mp3
- fw15c-1993-prost.mp3
- f2002-2002-schumacher.mp3
- r25-2005-alonso.mp3

## 2. Los logos de los equipos

La carpeta `logos/` tiene logos oficiales de escuderías (descargados de Wikimedia Commons,
fuentes en `logos/FUENTES.txt`). Son **marcas registradas**: usarlos en una app publicada,
gratis o paga, sin licencia, es infracción de marca y Google Play la puede dar de baja.

Qué hacer: borrar los archivos de `logos/` y correr `node indexar-logos.js`.
La app vuelve sola a los escudos con siglas y colores de cada equipo.

## 3. El nombre y el logo de F1

"F1", "Formula 1" y el logo de F1 (img/f1.webp, en la barra de arriba, y el ícono de la app en img/icono/) son marcas registradas:
la versión pública necesita otro nombre y sacar ese logo.

## 4. Fotos de los autos

Las fotos de `fotos/` salen de Wikimedia Commons con licencias libres (autor y licencia en
`fotos/creditos.json`, y la app muestra el crédito). Casi todas piden atribución (CC BY / BY-SA),
que ya está. La excepción es **f2001-2001-schumacher.jpg** (Monza 2001): la pasó el dueño de
la repisa y no se sabe de quién es; antes de publicar, reemplazarla por una con licencia.

## 5. Fotos de catálogo de la repisa 3D

La repisa 3D usa `repisa-salvat/`: fotos de estudio de las miniaturas Salvat bajadas de
coleccionablesblog.com.ar (con `node bajar-salvat.js`), más seis puestas a mano (W11, RB18, BT44B, TG184, 97T y FW15C,
sacadas de tiendas). **Ninguna tiene licencia libre**: solo uso personal.
Antes de publicar: borrar la carpeta `repisa-salvat/` (la repisa vuelve sola a los recortes del mueble
de `repisa/`), o reemplazarlas por fotos propias de las miniaturas con el mismo nombre.
