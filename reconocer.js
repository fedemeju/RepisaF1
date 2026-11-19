// Reconocer el auto por cómo se ve (plan B del escáner, cuando la etiqueta no se lee).
//
// Cómo funciona: busca puntos característicos (bordes de letras de sponsors, números, cortes de
// la pintura) con ORB, los compara con los de la foto de cada auto de la repisa (repisa/<fila>-<col>.webp)
// y verifica que los que coinciden estén en la misma posición relativa (homografía con RANSAC).
// El puntaje es cuántos puntos coinciden bien. Probado con fotos reales (79 tomas distintas):
// con ≥15 puntos y el doble que el segundo abre directo y no se equivocó nunca; si no, ofrece opciones.
// (Con 12 y 1,5× se equivocaba en la R25 contra la R24, que son casi iguales.)
//
// OpenCV.js (~10 MB) se baja recién la primera vez que se usa, y después queda guardado.
(function () {
  const CV_URL = "https://cdn.jsdelivr.net/npm/@techstark/opencv-js@4.10.0-release.1/dist/opencv.js";
  const ANCHO = 640, PUNTOS = 2000, RATIO = 0.8, MIN_OK = 15, VENTAJA = 2;
  // Dos pasadas: con los 500 puntos más fuertes se eligen los 10 autos más parecidos y solo
  // esos se verifican con todos los puntos (igual de preciso y ~4 veces más rápido).
  const PRIMERA = 500, FINALISTAS = 10;
  let cvP = null, refsP = null;

  function cargarCv() {
    if (cvP) return cvP.then((o) => o.cv);
    cvP = new Promise((resolve, reject) => {
      // Ojo: el módulo de OpenCV tiene un .then propio que no hay que usar (con promesas se cuelga
      // o rompe la página). Se lo saca y se guarda el módulo adentro de un objeto.
      const listo = (m) => { try { m.then = undefined; } catch (_) {} resolve({ cv: m }); };
      const anda = (c) => { try { new c.Mat().delete(); return true; } catch (_) { return false; } };
      const esperar = () => {
        const c = window.cv;
        if (!c) return reject(new Error("No se pudo cargar el reconocedor"));
        if (c.Mat && anda(c)) return listo(c);
        const prev = c.onRuntimeInitialized;
        c.onRuntimeInitialized = () => { if (prev) prev(); listo(c); };
      };
      if (window.cv) return esperar();
      const s = document.createElement("script");
      s.src = CV_URL; s.async = true;
      s.onload = esperar;
      s.onerror = () => reject(new Error("Sin internet no se puede bajar el reconocedor la primera vez"));
      document.head.appendChild(s);
    });
    cvP.catch(() => { cvP = null; });
    return cvP.then((o) => o.cv);
  }

  // Imagen (canvas, bitmap o img) → gris, 640 de ancho, contraste parejo por zonas (CLAHE)
  function preparar(cv, fuente, r) {
    const W = ANCHO, H = Math.max(40, Math.round((r.h / r.w) * W));
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(fuente, r.x, r.y, r.w, r.h, 0, 0, W, H);
    const rgba = cv.imread(c), gris = new cv.Mat(), eq = new cv.Mat();
    cv.cvtColor(rgba, gris, cv.COLOR_RGBA2GRAY);
    const clahe = new cv.CLAHE(2.0, new cv.Size(8, 8));
    clahe.apply(gris, eq);
    rgba.delete(); gris.delete(); clahe.delete();
    return eq;
  }

  function puntos(cv, img) {
    const orb = new cv.ORB(PUNTOS), kps = new cv.KeyPointVector(), des = new cv.Mat(), sin = new cv.Mat();
    orb.detectAndCompute(img, sin, kps, des);
    const n = kps.size(), xy = new Float32Array(n * 2), fuerza = new Float32Array(n);
    for (let i = 0; i < n; i++) { const k = kps.get(i); xy[2 * i] = k.pt.x; xy[2 * i + 1] = k.pt.y; fuerza[i] = k.response; }
    orb.delete(); kps.delete(); sin.delete();
    return { xy, des, fuerza };
  }

  const cargarImg = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });

  // Puntos de cada auto de la repisa (una vez por sesión)
  function referencias(onProgreso) {
    if (refsP) return refsP;
    refsP = (async () => {
      const cv = await cargarCv();
      const R = window.REPISA, lista = [];
      R.lugares.forEach((fila, r) => fila.forEach((id, c) => { if (id) lista.push({ id, src: `repisa/${String(r + 1).padStart(2, "0")}-${c + 1}.webp` }); }));
      const out = [];
      for (const [i, it] of lista.entries()) {
        const img = await cargarImg(it.src);
        const g = preparar(cv, img, { x: 0, y: 0, w: img.naturalWidth, h: img.naturalHeight });
        out.push({ id: it.id, ...puntos(cv, g) }); g.delete();
        if (onProgreso) onProgreso((i + 1) / lista.length);
        if (i % 6 === 5) await new Promise((r) => setTimeout(r)); // que la pantalla no se trabe
      }
      return out;
    })();
    refsP.catch(() => { refsP = null; });
    return refsP;
  }

  // Coincidencias que pasan la prueba del cociente (el mejor bastante mejor que el segundo)
  function coincidencias(cv, bf, dq, dr, conPuntos, q, ref) {
    const mm = new cv.DMatchVectorVector(), a = [], b = [];
    let n = 0;
    bf.knnMatch(dq, dr, mm, 2);
    for (let i = 0; i < mm.size(); i++) {
      const par = mm.get(i);
      if (par.size() === 2) {
        const m1 = par.get(0), m2 = par.get(1);
        if (m1.distance < RATIO * m2.distance) {
          n++;
          if (conPuntos) { a.push(q.xy[2 * m1.queryIdx], q.xy[2 * m1.queryIdx + 1]); b.push(ref.xy[2 * m1.trainIdx], ref.xy[2 * m1.trainIdx + 1]); }
        }
      }
      par.delete();
    }
    mm.delete();
    return conPuntos ? { a, b } : n;
  }

  // Cuántos puntos coinciden en la misma posición relativa (homografía con RANSAC)
  function verificados(cv, a, b) {
    const n = a.length / 2;
    if (n < 6) return n * 0.1;
    const A = cv.matFromArray(n, 1, cv.CV_32FC2, a), B = cv.matFromArray(n, 1, cv.CV_32FC2, b), mask = new cv.Mat();
    const H = cv.findHomography(A, B, cv.RANSAC, 6.0, mask);
    let ok = 0;
    if (!H.empty()) for (let i = 0; i < mask.rows; i++) ok += mask.data[i] ? 1 : 0;
    A.delete(); B.delete(); mask.delete(); H.delete();
    return ok;
  }

  // Devuelve [{ id, score }] de mayor a menor
  async function ranking(fuente, region) {
    const cv = await cargarCv(), refs = await referencias();
    const g = preparar(cv, fuente, region), q = puntos(cv, g); g.delete();
    const bf = new cv.BFMatcher(cv.NORM_HAMMING, false);
    const out = refs.map((r) => ({ id: r.id, score: 0 }));
    const nq = q.des.rows;
    if (nq >= 8) {
      // 1.ª pasada: los puntos más fuertes contra todos los autos
      const orden = Array.from(q.fuerza.keys()).sort((i, j) => q.fuerza[j] - q.fuerza[i]).slice(0, PRIMERA);
      const d1 = new cv.Mat(orden.length, q.des.cols, q.des.type());
      orden.forEach((src, dst) => d1.data.set(q.des.data.subarray(src * q.des.cols, (src + 1) * q.des.cols), dst * q.des.cols));
      const pre = refs.map((ref, i) => ({ i, n: ref.des.rows >= 8 ? coincidencias(cv, bf, d1, ref.des, false) : 0 }));
      d1.delete();
      pre.sort((x, y) => y.n - x.n);
      // 2.ª pasada: todos los puntos y verificación geométrica, solo con los finalistas
      for (const { i } of pre.slice(0, FINALISTAS)) {
        const ref = refs[i];
        if (ref.des.rows < 8) continue;
        const { a, b } = coincidencias(cv, bf, q.des, ref.des, true, q, ref);
        out[i].score = verificados(cv, a, b);
      }
    }
    q.des.delete(); bf.delete();
    return out.sort((x, y) => y.score - x.score);
  }

  // ¿Está seguro? (umbral medido con fotos reales)
  const seguro = (r) => r.length > 0 && r[0].score >= MIN_OK && r[0].score >= VENTAJA * (r[1] ? r[1].score : 0);

  window.Reconocer = { cargarCv, referencias, ranking, seguro, MIN_OK };
})();
