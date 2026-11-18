// Busca la placa negra (rectángulo oscuro, alargado, con letras claras adentro) en una imagen.
// Devuelve hasta `max` recortes candidatos en coordenadas de la imagen original, el mejor primero.
(function () {
  function findLabels(src, srcW, srcH, max = 3) {
    const W = 480, k = W / srcW, H = Math.round(srcH * k);
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(src, 0, 0, srcW, srcH, 0, 0, W, H);
    const d = ctx.getImageData(0, 0, W, H).data;
    const lum = new Uint8Array(W * H);
    for (let i = 0, j = 0; j < lum.length; i += 4, j++) lum[j] = (d[i] * 77 + d[i + 1] * 150 + d[i + 2] * 29) >> 8;

    // La placa puede verse más o menos negra según la luz y el acrílico:
    // se prueban varios umbrales y se juntan los candidatos.
    let all = [];
    // radio de cierre 2: letras finas; 4: letras grandes que ocupan casi toda la placa
    for (const R of [2, 4]) for (const T of [30, 42, 55, 70, 85, 100]) all = all.concat(atThreshold(T, R));
    all.sort((a, b) => b.score - a.score);
    const out = [];
    for (const c of all) {
      if (out.some((o) => iou(o, c) > 0.4)) continue;
      out.push(c);
      if (out.length >= max) break;
    }
    return out.map((c) => {
      const padX = c.bw * 0.04, padY = c.bh * 0.15;
      const x = Math.max(0, (c.x0 - padX) / k), y = Math.max(0, (c.y0 - padY) / k);
      return { score: c.score, x, y, w: Math.min(srcW - x, (c.bw + 2 * padX) / k), h: Math.min(srcH - y, (c.bh + 2 * padY) / k) };
    });

    function iou(a, b) {
      const ix = Math.max(0, Math.min(a.x0 + a.bw, b.x0 + b.bw) - Math.max(a.x0, b.x0));
      const iy = Math.max(0, Math.min(a.y0 + a.bh, b.y0 + b.bh) - Math.max(a.y0, b.y0));
      const i = ix * iy; return i / (a.bw * a.bh + b.bw * b.bh - i);
    }

    function atThreshold(T, R) {
    // máscara oscura, cerrada (dilatar + erosionar) para tapar las letras
    let m = new Uint8Array(W * H);
    for (let j = 0; j < lum.length; j++) m[j] = lum[j] < T ? 1 : 0;
    const dil = (a, r) => {
      const o = new Uint8Array(W * H);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        if (!a[y * W + x]) continue;
        for (let dy = -r; dy <= r; dy++) { const yy = y + dy; if (yy < 0 || yy >= H) continue;
          for (let dx = -r; dx <= r; dx++) { const xx = x + dx; if (xx >= 0 && xx < W) o[yy * W + xx] = 1; } }
      }
      return o;
    };
    const ero = (a, r) => { const inv = a.map((v) => 1 - v); return dil(inv, r).map((v) => 1 - v); };
    m = ero(dil(m, R), R);

    // componentes conexas
    const lab = new Int32Array(W * H), comps = [];
    const stack = [];
    for (let s = 0; s < m.length; s++) {
      if (!m[s] || lab[s]) continue;
      const id = comps.length + 1; let n = 0, x0 = W, y0 = H, x1 = 0, y1 = 0;
      stack.push(s); lab[s] = id;
      while (stack.length) {
        const p = stack.pop(), x = p % W, y = (p / W) | 0; n++;
        if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
        const nb = [p - 1, p + 1, p - W, p + W];
        for (let q = 0; q < 4; q++) {
          const v = nb[q];
          if (v < 0 || v >= m.length || lab[v] || !m[v]) continue;
          if ((q === 0 && x === 0) || (q === 1 && x === W - 1)) continue;
          lab[v] = id; stack.push(v);
        }
      }
      comps.push({ n, x0, y0, x1, y1 });
    }

    const cands = [];
    for (const cp of comps) {
      const bw = cp.x1 - cp.x0 + 1, bh = cp.y1 - cp.y0 + 1;
      const ar = bw / bh, fill = cp.n / (bw * bh);
      if (bw < W * 0.12 || bh < 6 || ar < 2.2 || ar > 12 || fill < 0.7) continue;
      // letras claras adentro (en la imagen sin cerrar) y fondo más claro alrededor
      let bright = 0, tot = 0, dark = 0;
      for (let y = cp.y0; y <= cp.y1; y++) for (let x = cp.x0; x <= cp.x1; x++) {
        const v = lum[y * W + x]; tot++;
        if (v > T + 50) bright++; else if (v < T) dark++;
      }
      const br = bright / tot;
      if (br < 0.02 || br > 0.45) continue;
      // contraste con el borde exterior (arriba y abajo de la placa)
      let ring = 0, rn = 0;
      for (let x = cp.x0; x <= cp.x1; x += 2) {
        for (const y of [cp.y0 - 4, cp.y1 + 4]) if (y >= 0 && y < H) { ring += lum[y * W + x]; rn++; }
      }
      const darkMean = T * 0.6;
      const edge = rn ? Math.min(1, Math.max(0, (ring / rn - darkMean) / 40)) : 0.5;
      const score = fill * fill * Math.min(1, br / 0.08) * Math.sqrt(bw * bh) * (ar >= 3 && ar <= 9 ? 1 : 0.6) * (0.3 + edge);
      cands.push({ score, x0: cp.x0, y0: cp.y0, bw, bh });
    }
    return cands;
    }
  }
  window.Detector = { findLabels };
})();
