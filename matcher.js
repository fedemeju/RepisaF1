// Compara el texto leído por OCR con la base de autos. Sin IA: puntaje por coincidencias.
(function () {
  const GENERIC = new Set(["GRAND", "PRIX", "GP", "RACING", "TEAM", "F1", "FORMULA", "THE", "DE", "AND"]);

  function norm(s) {
    return String(s || "")
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim();
  }
  // Confusiones típicas del OCR, llevadas a letras o a dígitos
  const toLetters = (s) => s.replace(/0/g, "O").replace(/1/g, "I").replace(/5/g, "S").replace(/8/g, "B").replace(/2/g, "Z").replace(/L/g, "I");
  const toDigits = (s) => s.replace(/[OQD]/g, "0").replace(/[IL|]/g, "1").replace(/S/g, "5").replace(/B/g, "8").replace(/Z/g, "2");

  function lev(a, b) {
    if (a === b) return 0;
    const m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[n];
  }
  const sim = (a, b) => 1 - lev(a, b) / Math.max(a.length, b.length);

  // Mejor similitud de una palabra contra los tokens leídos (y pares de tokens pegados)
  function best(word, toks, loose) {
    const w = loose ? toLetters(word) : word;
    let b = 0;
    for (const t of toks) {
      const s = sim(w, loose ? toLetters(t) : t);
      if (s > b) b = s;
    }
    return b;
  }

  function features(car) {
    const e = car.etiqueta;
    const chassis = [e.chasis, ...(car.alias || [])]
      .map((x) => norm(x).replace(/ /g, ""))
      .filter((x) => x.length >= 2);
    const driverWords = norm(e.piloto).split(" ").filter(Boolean);
    return {
      chassis: [...new Set(chassis)],
      year: String(e.anio),
      surname: driverWords[driverWords.length - 1] || "",
      first: driverWords.length > 1 ? driverWords[0] : "",
      team: norm(e.equipo).split(" ").filter((w) => w.length >= 3 && !GENERIC.has(w)),
      race: norm(e.carrera).split(" ").filter((w) => w.length >= 4 && !GENERIC.has(w) && !/^\d+$/.test(w))
    };
  }

  const cache = new WeakMap();
  function score(text, cars) {
    const all = norm(text).split(" ").filter(Boolean);
    const words = all.filter((w) => w.length >= 2);
    // tokens + pares y tríos pegados ("MP4 4" -> "MP44", "MP 4 8" -> "MP48", "BGP 001" -> "BGP001").
    // Para pegar se usan también los sueltos de un carácter ("4", "8").
    const toks = [...words];
    for (let i = 0; i < all.length - 1; i++) {
      toks.push(all[i] + all[i + 1]);
      if (i < all.length - 2) toks.push(all[i] + all[i + 1] + all[i + 2]);
    }
    // Años. El OCR confunde mucho 9→8 y 6→5 (1993 sale "1883").
    // Exacto = 3, igual con esa confusión = 2.5, un dígito distinto = 1.5, tres primeros dígitos = 1
    const loose = (s) => s.replace(/9/g, "8").replace(/6/g, "5");
    const digitToks = words.map(toDigits).filter((w) => /^\d{3,4}$/.test(w));
    const yearScore = (y) => {
      let b = 0;
      for (const t of digitToks) {
        if (t === y) return 3;
        if (t.length === 4 && loose(t) === loose(y)) b = Math.max(b, 2.5);
        else if (t.length === 4 && t.slice(0, 2) === y.slice(0, 2) && lev(loose(t), loose(y)) === 1) b = Math.max(b, 1.5);
        else if (t.length === 3 && y.startsWith(t)) b = Math.max(b, 1);
      }
      return b;
    };

    const out = cars.map((car) => {
      let f = cache.get(car);
      if (!f) { f = features(car); cache.set(car, f); }
      let s = 0; const why = [];
      let cs = 0;
      for (const c of f.chassis) cs = Math.max(cs, best(c, toks, true));
      // exacto pesa mucho más que parecido: MP4/4 y MP4/8 difieren en un solo carácter
      if (cs >= 0.75) { s += cs === 1 ? 6 : cs >= 0.8 ? 4 : 3; why.push("chasis"); }
      const ys = yearScore(f.year);
      if (ys) { s += ys; why.push("año"); }
      const ds = f.surname ? best(f.surname, words, false) : 0;
      if (ds >= 0.72) { s += 4 * ds; why.push("piloto"); }
      if (f.first) { const fs = best(f.first, words, false); if (fs >= 0.75) s += 1 * fs; }
      for (const t of f.team) { const ts = best(t, words, false); if (ts >= 0.8) s += 1; }
      for (const r of f.race) { const rs = best(r, words, false); if (rs >= 0.8) s += 0.7; }
      return { car, score: Math.round(s * 10) / 10, why };
    });
    out.sort((a, b) => b.score - a.score);
    return out;
  }

  // ¿Es suficientemente claro como para abrir la ficha solo?
  function decide(ranked) {
    const [a, b] = ranked;
    if (!a || a.score < 7) return null;
    if (b && b.score > a.score - 2.5) return null;
    return a.car;
  }

  window.Matcher = { score, decide, norm };
})();
