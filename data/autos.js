/*
  BASE DE DATOS DE LA REPISA
  ==========================
  Un objeto por auto. Todo funciona sin internet y sin IA: la app solo lee esto.

  Campos importantes:
  - etiqueta: lo que dice la placa negra del modelo. El escáner compara el texto
    leído con estos campos (chasis + año + piloto pesan más).
  - alias: otras formas en que puede aparecer escrito (ej. "MP4-4", "W 11").
  - audio: ruta a un mp3 dentro de /audio. Si el archivo no existe, la app ofrece
    leer el "relato" con la voz del celular.
  - relato: el texto que se lee en voz alta / el guion para generar el audio con IA.
  - juan: (opcional) comentario corto de Juan Fossaroli que suena pegado al relato, como un solo
    audio: Juan "Fernando…" → Fernando "¿Sí, Juan?" → Juan una entrada ("Esta no la tenías, Fer",
    "Mirá este dato"…, una al azar) → Juan este comentario. Las frases fijas y las entradas se graban
    una vez (audio/juan/) y el comentario va en audio/juan/<id>.mp3. Por eso el comentario va sin
    muletilla al principio: es el dato directo. Si falta algo, suena solo el relato (node audios.js guiones).
  - conexiones: [{ id, texto }] enlaces a otros autos de la repisa. Los autos del
    mismo piloto se enlazan solos. La época (década) también se calcula sola.
  - oculto: true → el auto queda guardado pero la app no lo muestra ni lo reconoce al escanear.
    Para que aparezca, borrá esa línea.
  - Cualquier campo que no sepas con certeza, dejalo en null y no se muestra.
*/
window.AUTOS = [
  {
    id: "rb18-2022-verstappen",
    etiqueta: {
      equipo: "Red Bull Racing",
      chasis: "RB18",
      anio: 2022,
      piloto: "Max Verstappen",
      carrera: "2022 Japanese Grand Prix"
    },
    alias: ["RB 18", "REDBULL"],
    color: "#1b2a6b",
    acento: "#e8002d",
    numero: 1,
    ficha: [
      ["Motor", "Red Bull Powertrains RBPTH001 · 1.6 L V6 turbo híbrido (desarrollado por Honda)"],
      ["Diseño", "Adrian Newey · Pierre Waché (director técnico)"],
      ["Neumáticos", "Pirelli P Zero, llantas de 18\""],
      ["Peso mínimo", "798 kg (con piloto)"],
      ["Reglamento", "Primer año del nuevo efecto suelo (túneles Venturi bajo el piso)"]
    ],
    pilotos: [
      { nombre: "Max Verstappen", numero: 1, resultado: "Campeón del mundo · 454 pts · 15 victorias" },
      { nombre: "Sergio Pérez", numero: 11, resultado: "3.º · 305 pts · 2 victorias (Mónaco y Singapur)" }
    ],
    temporada: {
      carreras: 22,
      victorias: 17,
      poles: 8,
      constructores: "1.º — 759 pts",
      pilotos: "Verstappen campeón (2.º título)"
    },
    titulos: ["Campeonato de Pilotos 2022 — Max Verstappen", "Campeonato de Constructores 2022 — Red Bull Racing"],
    carreraModelo: {
      nombre: "GP de Japón 2022 · Suzuka",
      texto: "Carrera bajo lluvia torrencial, interrumpida con bandera roja y reanudada con apenas 28 vueltas. Verstappen ganó y, como la carrera se reanudó, se otorgaron puntos completos: con la penalización a Leclerc en la última curva, Max quedó campeón matemático ahí mismo, con cuatro carreras por delante. Casi nadie en el circuito, ni el propio Max, sabía en el momento que ya era campeón."
    },
    importancia: [
      "Batió el récord de victorias en una temporada: 15 de Verstappen (luego él mismo lo superó en 2023).",
      "Fue el auto que mejor entendió el nuevo reglamento de efecto suelo, cuando casi todos sufrían el 'porpoising' (rebote).",
      "Arrancó la era de dominio de Red Bull que siguió con el RB19."
    ],
    curiosidades: [
      "A comienzo de año estaba excedido de peso; a medida que lo alivianaron se volvió casi imbatible.",
      "Ese año la FIA determinó que Red Bull había superado el tope presupuestario de 2021 y lo sancionó con multa y menos tiempo de túnel de viento.",
      "Pérez logró la pole en Arabia Saudita: la primera de su carrera."
    ],
    relato: "Quince victorias en un año. Ese récord de la Fórmula 1 lo puso este auto: el Red Bull RB18. En 2022 cambiaron todas las reglas y volvió el efecto suelo: los autos se pegaban al piso… y muchos rebotaban como pelotas en las rectas. El equipo de Adrian Newey fue el que mejor lo resolvió, y Max Verstappen, con el número uno en la trompa por primera vez, arrasó. Tu modelo es el de Japón, y esa carrera tiene una historia increíble: bajo una lluvia tremenda y con la carrera acortada, Max ganó, y por una regla que casi nadie conocía se dieron los puntos completos. Así fue campeón en ese mismo momento… y ni él lo sabía.",
    juan: "Max debutó en la Fórmula 1 con diecisiete años, antes de tener el registro para manejar un auto por la calle. Y lo lleva en la sangre: el padre, Jos, también corrió en la Fórmula 1, y fue compañero de Schumacher en Benetton.",
    audio: "audio/rb18-2022-verstappen.mp3"
  },

  {
    id: "mp4-4-1988-senna",
    oculto: true, // auto de ejemplo: no confirmado en la repisa
    etiqueta: {
      equipo: "McLaren",
      chasis: "MP4/4",
      anio: 1988,
      piloto: "Ayrton Senna",
      carrera: null
    },
    alias: ["MP4 4", "MP4-4", "MP44", "MARLBORO"],
    color: "#ffffff",
    acento: "#d40000",
    numero: 12,
    ficha: [
      ["Motor", "Honda RA168E · 1.5 L V6 turbo"],
      ["Diseño", "Steve Nichols, con Gordon Murray"],
      ["Neumáticos", "Goodyear"],
      ["Particularidad", "Chasis muy bajo ('low-line') con el piloto casi acostado"]
    ],
    pilotos: [
      { nombre: "Ayrton Senna", numero: 12, resultado: "Campeón del mundo · 90 pts · 8 victorias · 13 poles" },
      { nombre: "Alain Prost", numero: 11, resultado: "2.º · 87 pts · 7 victorias" }
    ],
    temporada: {
      carreras: 16,
      victorias: 15,
      poles: 15,
      constructores: "1.º — 199 pts",
      pilotos: "Senna campeón (1.er título)"
    },
    titulos: ["Campeonato de Pilotos 1988 — Ayrton Senna", "Campeonato de Constructores 1988 — McLaren"],
    carreraModelo: null,
    importancia: [
      "Ganó 15 de las 16 carreras del año: uno de los autos más dominantes de la historia.",
      "Último año de los motores turbo hasta 2014.",
      "Escenario de la rivalidad Senna–Prost dentro del mismo equipo."
    ],
    curiosidades: [
      "La única carrera que no ganó fue Monza: Senna chocó con un rezagado a dos vueltas del final y Ferrari hizo 1-2, semanas después de la muerte de Enzo Ferrari.",
      "Prost sumó más puntos totales, pero en esa época solo contaban los 11 mejores resultados: por eso el campeón fue Senna.",
      "Senna aseguró el título en Suzuka, después de quedarse casi parado en la largada y remontar."
    ],
    relato: "Quince de dieciséis. Esas son las carreras que ganó este auto en 1988: el McLaren MP4/4, para muchos el más dominante de la historia. Tenía un chasis tan bajo que el piloto iba casi acostado, el motor turbo de Honda… y a los dos mejores pilotos del mundo en el mismo equipo: Ayrton Senna y Alain Prost. La única carrera que se le escapó fue Monza: a dos vueltas del final, Senna chocó con un rezagado y Ferrari hizo un uno-dos, semanas después de la muerte de Enzo Ferrari. Y un dato que pocos saben: ese año Prost sumó más puntos que Senna. Pero solo contaban los once mejores resultados… y así Senna fue campeón por primera vez.",
    audio: "audio/mp4-4-1988-senna.mp3"
  },

  {
    id: "fw14b-1992-mansell",
    etiqueta: {
      equipo: "Williams",
      chasis: "FW14B",
      anio: 1992,
      piloto: "Nigel Mansell",
      carrera: null
    },
    alias: ["FW14 B", "FW 14B", "CANON", "RENAULT"],
    color: "#0a2a8a",
    acento: "#f5d000",
    numero: 5,
    ficha: [
      ["Motor", "Renault RS3C / RS4 · 3.5 L V10 atmosférico"],
      ["Diseño", "Adrian Newey · Patrick Head"],
      ["Neumáticos", "Goodyear"],
      ["Electrónica", "Suspensión activa, control de tracción y caja semiautomática"]
    ],
    pilotos: [
      { nombre: "Nigel Mansell", numero: 5, resultado: "Campeón del mundo · 108 pts · 9 victorias · 14 poles" },
      { nombre: "Riccardo Patrese", numero: 6, resultado: "2.º · 56 pts · 1 victoria (Japón)" }
    ],
    temporada: {
      carreras: 16,
      victorias: 10,
      poles: 15,
      constructores: "1.º — 164 pts",
      pilotos: "Mansell campeón (único título)"
    },
    titulos: ["Campeonato de Pilotos 1992 — Nigel Mansell", "Campeonato de Constructores 1992 — Williams"],
    carreraModelo: null,
    importancia: [
      "Se lo considera uno de los autos más avanzados tecnológicamente de la historia.",
      "Mansell fue campeón en Hungría, en agosto, con cinco carreras por delante.",
      "Su electrónica fue tan superior que la FIA prohibió esas ayudas para 1994."
    ],
    curiosidades: [
      "Mansell ganó las primeras cinco carreras del año seguidas.",
      "Las 14 poles de Mansell fueron récord durante años.",
      "Fue uno de los primeros grandes autos de Adrian Newey, que después diseñaría para McLaren y Red Bull."
    ],
    relato: "Este auto era tan avanzado que terminaron prohibiendo su tecnología. Es el Williams FW14B de 1992. Tenía suspensión activa: computadoras que mantenían el auto siempre a la altura perfecta. Además, control de tracción y caja semiautomática, cuando los rivales apenas lo estaban probando. Lo diseñó Adrian Newey, el mismo que años después haría los Red Bull campeones. Nigel Mansell, el León, ganó las primeras cinco carreras del año y fue campeón en agosto, con cinco fechas por delante. Era su primer título, después de años de quedarse cerca. ¿Y qué hizo al año siguiente? Se fue a correr a Estados Unidos… y también fue campeón ahí, en su primera temporada.",
    juan: "Al principio Mansell y su mujer vendieron su casa para poder pagarse las carreras. Y en la Fórmula Ford se rompió el cuello en un accidente: le dijeron que se olvidara de correr, y a las pocas semanas ya estaba arriba de un auto otra vez.",
    audio: "audio/fw14b-1992-mansell.mp3"
  },

  {
    id: "f2004-2004-barrichello",
    etiqueta: {
      equipo: "Ferrari",
      chasis: "F2004",
      anio: 2004,
      piloto: "Rubens Barrichello",
      carrera: null
    },
    alias: ["F 2004", "SCUDERIA FERRARI"],
    color: "#c4000c",
    acento: "#ffffff",
    numero: 2,
    ficha: [
      ["Motor", "Ferrari Tipo 053 · 3.0 L V10"],
      ["Diseño", "Rory Byrne · Ross Brawn (director técnico) · Aldo Costa"],
      ["Neumáticos", "Bridgestone"]
    ],
    pilotos: [
      { nombre: "Rubens Barrichello", numero: 2, resultado: "2.º · 114 pts · 2 victorias (Italia y China)" },
      { nombre: "Michael Schumacher", numero: 1, resultado: "Campeón del mundo · 148 pts · 13 victorias" }
    ],
    temporada: {
      carreras: 18,
      victorias: 15,
      poles: null,
      constructores: "1.º — 262 pts",
      pilotos: "Schumacher campeón (7.º título) · Barrichello 2.º"
    },
    titulos: ["Campeonato de Pilotos 2004 — Michael Schumacher", "Campeonato de Constructores 2004 — Ferrari"],
    carreraModelo: null,
    importancia: [
      "Ganó 15 de 18 carreras: la cima de la era dorada de Ferrari.",
      "Barrichello fue subcampeón, la mejor temporada de su carrera.",
      "Le dio a Schumacher su séptimo y último título, récord que recién Hamilton igualó en 2020."
    ],
    curiosidades: [
      "Barrichello ganó el primer GP de China de la historia, en Shanghái, desde la pole.",
      "En Monza paró muy temprano a cambiar gomas, cayó atrás y remontó hasta ganar delante de los tifosi.",
      "Las dos únicas victorias de Ferrari ese año que no fueron de Schumacher fueron las de Barrichello."
    ],
    relato: "Ser compañero de Michael Schumacher era el trabajo más difícil de la Fórmula 1. Rubens Barrichello lo hizo seis años. Esta es la F2004, la Ferrari más dominante de esa época: ganó quince de dieciocho carreras. Trece fueron de Schumacher… y las otras dos, de Rubinho. En Monza, delante de los tifosi, entró a boxes muy temprano, cayó atrás y remontó hasta ganar. Y unas semanas después ganó el primer Gran Premio de China de la historia, desde la pole. Terminó segundo en el campeonato, su mejor año. Barrichello se retiró con más de trescientas carreras, el récord de su época. Y en tu repisa también está la Ferrari con la que Schumacher arrasó en 2002.",
    juan: "Barrichello se crió al lado de Interlagos: de chico veía las carreras desde la casa de los abuelos. Su sueño era ganar ahí, y es una de esas cosas que el automovilismo no le dio: entre roturas y mala suerte, nunca pudo ganar en casa.",
    audio: "audio/f2004-2004-barrichello.mp3",
    conexiones: [
      { id: "f2002-2002-schumacher", texto: "La Ferrari anterior de la misma era dorada, con Schumacher." },
      { id: "bgp001-2009-button", texto: "En 2009 Barrichello fue compañero de Button en el Brawn campeón." }
    ]
  },

  {
    id: "bgp001-2009-button",
    etiqueta: {
      equipo: "Brawn GP",
      chasis: "BGP 001",
      anio: 2009,
      piloto: "Jenson Button",
      carrera: null
    },
    alias: ["BGP001", "BGP 01", "GP 01", "GP01", "BRAWN GP 01", "BRAWN"],
    color: "#f2f2f2",
    acento: "#c8f000",
    numero: 22,
    ficha: [
      ["Motor", "Mercedes-Benz FO 108W · 2.4 L V8"],
      ["Origen", "Proyecto heredado de Honda, que abandonó la F1 a fines de 2008"],
      ["Jefe de equipo", "Ross Brawn"],
      ["Neumáticos", "Bridgestone"],
      ["Clave técnica", "Doble difusor, declarado legal por la FIA en abril de 2009"]
    ],
    pilotos: [
      { nombre: "Jenson Button", numero: 22, resultado: "Campeón del mundo · 95 pts · 6 victorias" },
      { nombre: "Rubens Barrichello", numero: 23, resultado: "3.º · 77 pts · 2 victorias (Valencia y Monza)" }
    ],
    temporada: {
      carreras: 17,
      victorias: 8,
      poles: null,
      constructores: "1.º — 172 pts",
      pilotos: "Button campeón (único título)"
    },
    titulos: ["Campeonato de Pilotos 2009 — Jenson Button", "Campeonato de Constructores 2009 — Brawn GP"],
    carreraModelo: null,
    importancia: [
      "Un equipo que casi no existe ganó los dos campeonatos en su única temporada.",
      "Ganó 6 de las primeras 7 carreras gracias al doble difusor.",
      "Al año siguiente Mercedes compró el equipo: es el origen del Mercedes campeón de la era híbrida."
    ],
    curiosidades: [
      "Arrancó la pretemporada sin sponsors principales: por eso el auto era casi todo blanco.",
      "Lo compraron por una suma simbólica cuando Honda se retiró.",
      "Button cerró el título en Brasil remontando del 14.º al 5.º puesto."
    ],
    relato: "¿Cómo un equipo que estaba por desaparecer ganó el campeonato del mundo? Esta es la historia del Brawn BGP 001. A fines de 2008, Honda abandonó la Fórmula 1 de un día para otro. Ross Brawn se quedó con el equipo por una suma simbólica, le puso un motor Mercedes y salió a pista casi sin sponsors: por eso el auto es casi todo blanco. Tenía un secreto escondido en la parte trasera del piso: el doble difusor. Los rivales protestaron, pero era legal. Jenson Button ganó seis de las primeras siete carreras y fue campeón. Un solo año de vida, dos títulos… y al año siguiente lo compró Mercedes. De este auto nació el equipo que después dominó con Hamilton.",
    audio: "audio/bgp001-2009-button.mp3"
  },

  {
    id: "w11-2020-hamilton",
    etiqueta: {
      equipo: "Mercedes-AMG",
      chasis: "W11",
      anio: 2020,
      piloto: "Lewis Hamilton",
      carrera: "2020 Winner Turkish Grand Prix"
    },
    alias: ["W 11", "F1 W11", "W11 EQ", "EQ PERFORMANCE", "MERCEDES AMG", "PETRONAS", "TURKISH"],
    color: "#111111",
    acento: "#00d2be",
    numero: 44,
    ficha: [
      ["Motor", "Mercedes-AMG F1 M11 EQ Performance · 1.6 L V6 turbo híbrido"],
      ["Diseño", "James Allison (director técnico)"],
      ["Neumáticos", "Pirelli P Zero, llantas de 13\""],
      ["Clave técnica", "DAS (Dual Axis Steering): el volante se movía hacia adelante y atrás para cambiar la convergencia de las ruedas"]
    ],
    pilotos: [
      { nombre: "Lewis Hamilton", numero: 44, resultado: "Campeón del mundo · 347 pts · 11 victorias · 10 poles" },
      { nombre: "Valtteri Bottas", numero: 77, resultado: "2.º · 223 pts · 2 victorias" },
      { nombre: "George Russell", numero: 63, resultado: "Reemplazo en Sakhir por COVID de Hamilton" }
    ],
    temporada: {
      carreras: 17,
      victorias: 13,
      poles: 15,
      constructores: "1.º — 573 pts",
      pilotos: "Hamilton campeón (7.º título)"
    },
    titulos: ["Campeonato de Pilotos 2020 — Lewis Hamilton", "Campeonato de Constructores 2020 — Mercedes (7.º seguido)"],
    carreraModelo: {
      nombre: "GP de Turquía 2020 · Istanbul Park",
      texto: "El asfalto estaba recién puesto y, con lluvia, la pista resbalaba como hielo. Hamilton largó 6.º, estiró las gomas intermedias hasta dejarlas casi lisas y ganó con más de 30 segundos de ventaja. Con esa victoria se aseguró el séptimo título e igualó a Michael Schumacher."
    },
    importancia: [
      "Con él Hamilton igualó los 7 títulos de Michael Schumacher.",
      "Hamilton superó el récord de 91 victorias de Schumacher en Portugal 2020.",
      "Considerado el auto más rápido de la era híbrida."
    ],
    curiosidades: [
      "Corrió con librea negra como mensaje contra el racismo.",
      "Temporada reducida a 17 carreras por la pandemia.",
      "Hamilton cerró el título en Turquía, bajo lluvia, largando 6.º."
    ],
    relato: "Para muchos, el auto más rápido de la era híbrida. Es el Mercedes W11 de 2020, y corrió pintado de negro como mensaje contra el racismo. Tenía un truco que nadie más tenía: el DAS. En las rectas, Lewis Hamilton empujaba y tiraba del volante para cambiar el ángulo de las ruedas delanteras. Quince poles y trece victorias en diecisiete carreras. Con este auto, Hamilton superó las noventa y una victorias de Michael Schumacher y se convirtió en el piloto más ganador de la historia. Y en Turquía, bajo la lluvia y largando sexto, ganó y alcanzó sus siete títulos, igualando al alemán.",
    juan: "A Lewis le pusieron ese nombre por Carl Lewis, el atleta olímpico. Y el padre, Anthony, llegó a tener varios trabajos a la vez para poder pagarle el karting.",
    audio: "audio/w11-2020-hamilton.mp3",
    conexiones: [
      { id: "w196-1955-fangio", texto: "Mercedes ya había dominado en los años 50 con Fangio; el W11 es la cumbre de su regreso." }
    ]
  },

  // ======================= Autos de la repisa (fotos) =======================

  {
    id: "375indy-1952-ascari",
    etiqueta: {
      equipo: "Ferrari",
      chasis: "375 Indy",
      anio: 1952,
      piloto: "Alberto Ascari",
      carrera: "Indianapolis 500 1952"
    },
    alias: ["375", "375INDY", "INDIANAPOLIS"],
    color: "#b3121b",
    acento: "#f2f2f2",
    numero: 12,
    ficha: [
      ["Motor", "Ferrari V12 Lampredi · 4.5 L atmosférico"],
      ["Base", "Derivado del Ferrari 375 de Fórmula 1, adaptado para el óvalo de Indianápolis"],
      ["Ruedas", "Rayos de alambre (fueron su talón de Aquiles)"],
      ["Patrocinio", "Grant Piston Rings (el 'Grant' del costado)"]
    ],
    pilotos: [
      { nombre: "Alberto Ascari", numero: 12, resultado: "Campeón del mundo 1952 · 6 victorias (con el Ferrari 500)" }
    ],
    temporada: {
      carreras: 1,
      victorias: 0,
      poles: null,
      constructores: "No existía todavía (empezó en 1958)",
      pilotos: "Ascari campeón 1952 con el Ferrari 500"
    },
    titulos: [],
    carreraModelo: {
      nombre: "500 Millas de Indianápolis 1952",
      texto: "Entre 1950 y 1960 las 500 Millas de Indianápolis contaban para el Mundial de Fórmula 1, aunque casi ningún europeo iba. Ascari y Ferrari sí fueron: para eso se perdió el primer GP del año en Suiza. Largó 19.º y en la vuelta 40 una rueda de rayos colapsó y tuvo que abandonar. Ganó Troy Ruttman."
    },
    importancia: [
      "Es la única vez que Ferrari corrió oficialmente las 500 Millas de Indianápolis.",
      "Ascari fue uno de los poquísimos pilotos europeos de F1 que la corrieron cuando era parte del Mundial.",
      "Ese mismo año Ascari fue campeón mundial ganando todas las carreras europeas que corrió."
    ],
    curiosidades: [
      "Ascari encadenó 9 victorias seguidas en el Mundial entre 1952 y 1953: nadie lo superó hasta Verstappen en 2023.",
      "En 1986 Ferrari construyó un prototipo para Indy (el 637) como amenaza en una negociación con la F1, pero nunca corrió."
    ],
    relato: "¿Sabías que Ferrari corrió una sola vez, de manera oficial, las 500 Millas de Indianápolis? Fue con este auto. En 1952, Indianápolis contaba para el Mundial de Fórmula 1, pero los europeos casi nunca iban. Alberto Ascari, el mejor piloto del momento, se animó. Se perdió la primera carrera del año, en Suiza, para cruzar el océano con un Ferrari de motor V12 y el número doce. ¿Cómo le fue? Largó decimonoveno y en la vuelta cuarenta se le desarmó una rueda de rayos. Afuera. Pero la historia tiene revancha: volvió a Europa, ganó todas las carreras que corrió ese año y fue campeón del mundo. Ferrari nunca más volvió oficialmente a Indianápolis.",
    juan: "Ascari era muy cábala: corría siempre con el mismo casco celeste y la misma remera celeste, y no los cambiaba por nada del mundo. Para él, la suerte también se llevaba puesta.",
    audio: "audio/375indy-1952-ascari.mp3",
    conexiones: [
      { id: "f2002-2002-schumacher", texto: "Medio siglo después, otra Ferrari arrasó: la F2002 de Schumacher." }
    ]
  },

  {
    id: "w196-1955-fangio",
    etiqueta: {
      equipo: "Mercedes",
      chasis: "W196",
      anio: 1955,
      piloto: "Juan Manuel Fangio",
      carrera: null
    },
    alias: ["W 196", "W196R", "STROMLINIEN"],
    color: "#c0c4c8",
    acento: "#d11a2a",
    numero: 18,
    ficha: [
      ["Motor", "Mercedes M196 · 2.5 L 8 cilindros en línea, válvulas desmodrómicas e inyección directa"],
      ["Diseño", "Rudolf Uhlenhaut · Fritz Nallinger"],
      ["Director deportivo", "Alfred Neubauer"],
      ["Neumáticos", "Continental"],
      ["Versión", "Carrocería carenada (ruedas cubiertas), usada en circuitos muy rápidos como Reims y Monza"]
    ],
    pilotos: [
      { nombre: "Juan Manuel Fangio", numero: null, resultado: "Campeón del mundo · 40 pts · 4 victorias (Argentina, Bélgica, Países Bajos, Italia)" },
      { nombre: "Stirling Moss", numero: null, resultado: "2.º · ganó el GP de Gran Bretaña en Aintree" }
    ],
    temporada: {
      carreras: 7,
      victorias: 5,
      poles: null,
      constructores: "No existía todavía (empezó en 1958)",
      pilotos: "Fangio campeón (3.er título)"
    },
    titulos: ["Campeonato de Pilotos 1955 — Juan Manuel Fangio", "Campeonato de Pilotos 1954 — Juan Manuel Fangio (también con el W196)"],
    carreraModelo: null,
    importancia: [
      "Ganó 9 de las 12 carreras del Mundial que corrió entre 1954 y 1955.",
      "Le dio a Fangio dos de sus cinco títulos mundiales.",
      "Tecnología de avanzada para la época: inyección directa y válvulas desmodrómicas, cosas que los autos de calle tardaron décadas en tener."
    ],
    curiosidades: [
      "En el GP de Argentina 1955 hizo más de 40 °C: Fangio fue de los poquísimos que aguantaron toda la carrera sin pedir relevo, y ganó con una quemadura en la pierna por el escape.",
      "Tras la tragedia de Le Mans en junio de 1955, se cancelaron varios GP y Mercedes se retiró de las carreras a fin de año. Volvió a la F1 como equipo propio recién en 2010.",
      "Debutó en Reims 1954 con esta carrocería carenada y ganó con un 1-2."
    ],
    relato: "Este auto ganó en su debut, y parece de otro planeta. Es el Mercedes W196, la Flecha de Plata de Juan Manuel Fangio. Mirá las ruedas: están tapadas. Es la versión carenada, pensada para circuitos rapidísimos como Reims y Monza. Por dentro tenía inyección directa y válvulas desmodrómicas, tecnología que los autos de calle tardaron décadas en tener. En el Gran Premio de Argentina de 1955 hizo tanto calor, más de cuarenta grados, que muchos pilotos pidieron relevo en plena carrera. Fangio no. Aguantó todo, se quemó la pierna con el escape, y ganó. Ese año fue campeón por tercera vez. Después de la tragedia de Le Mans, Mercedes se retiró de las carreras, y no volvió a la Fórmula 1 con equipo propio hasta 2010.",
    juan: "A Fangio le decían el Chueco desde pibe, en Balcarce, porque jugaba al fútbol con las piernas arqueadas. Y antes de ser cinco veces campeón del mundo, fue mecánico: los autos los conocía por dentro antes de manejarlos.",
    audio: "audio/w196-1955-fangio.mp3",
    conexiones: [
      { id: "w11-2020-hamilton", texto: "Sesenta y cinco años después, Mercedes volvió a dominar con Hamilton." }
    ]
  },

  {
    id: "308b-1975-hunt",
    etiqueta: {
      equipo: "Hesketh",
      chasis: "308B",
      anio: 1975,
      piloto: "James Hunt",
      carrera: null
    },
    alias: ["308 B", "308"],
    color: "#f5f5f5",
    acento: "#d0021b",
    numero: 24,
    ficha: [
      ["Motor", "Ford Cosworth DFV · 3.0 L V8"],
      ["Diseño", "Harvey Postlethwaite"],
      ["Neumáticos", "Goodyear"],
      ["Dueño", "Lord Alexander Hesketh, que pagaba todo de su bolsillo"]
    ],
    pilotos: [
      { nombre: "James Hunt", numero: 24, resultado: "4.º · 33 pts · 1 victoria (Países Bajos)" }
    ],
    temporada: {
      carreras: 14,
      victorias: 1,
      poles: null,
      constructores: null,
      pilotos: "Hunt 4.º"
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "Ganó el GP de Países Bajos 1975 en Zandvoort aguantando a Niki Lauda: la única victoria de Hesketh en la F1.",
      "Un equipo de aristócratas sin sponsors que les ganó a las grandes marcas.",
      "Fue la vidriera que llevó a Hunt a McLaren y al título de 1976."
    ],
    curiosidades: [
      "Corría sin publicidad de cigarrillos: los colores eran los de la bandera británica y el logo era un osito de peluche.",
      "El equipo tenía fama de fiestero: champagne, Rolls-Royce y helicópteros en el paddock.",
      "Al año siguiente Hesketh se quedó sin plata y Hunt pasó a McLaren."
    ],
    relato: "Un lord inglés, un osito de peluche y champagne en los boxes. Así era Hesketh, el equipo más fiestero de la historia de la Fórmula 1. Lord Alexander Hesketh pagaba todo de su bolsillo. No tenía sponsors de cigarrillos: por eso el auto es blanco, con los colores de la bandera británica. Su piloto, James Hunt, era igual de rebelde. Nadie los tomaba en serio… hasta Zandvoort 1975. Ese día, Hunt aguantó la presión de Niki Lauda vuelta tras vuelta, y ganó. Fue la única victoria de Hesketh en la Fórmula 1. Al año siguiente se quedaron sin plata. Hunt se fue a McLaren y le ganó el título a Lauda por un punto. Esa rivalidad terminó siendo una película: Rush.",
    audio: "audio/308b-1975-hunt.mp3",
    conexiones: [
      { id: "312t2-1977-lauda", texto: "Su gran rival: Lauda. Hunt le ganó el título de 1976 por un punto, cuando Lauda corría con la 312 T2." }
    ]
  },

  {
    id: "312t2-1977-lauda",
    etiqueta: {
      equipo: "Ferrari",
      chasis: "312 T2",
      anio: 1977,
      piloto: "Niki Lauda",
      carrera: "1977 Brazilian Grand Prix"
    },
    alias: ["312T2", "312 T 2", "312"],
    color: "#d00000",
    acento: "#ffffff",
    numero: 11,
    ficha: [
      ["Motor", "Ferrari 015 · 3.0 L 12 cilindros boxer (plano)"],
      ["Diseño", "Mauro Forghieri"],
      ["Caja", "Transversal (la 'T' del nombre)"],
      ["Neumáticos", "Goodyear"],
      ["En pista", "1976 y 1977"]
    ],
    pilotos: [
      { nombre: "Niki Lauda", numero: 11, resultado: "Campeón del mundo · 72 pts · 3 victorias" },
      { nombre: "Carlos Reutemann", numero: 12, resultado: "4.º · ganó el GP de Brasil" }
    ],
    temporada: {
      carreras: 17,
      victorias: 4,
      poles: null,
      constructores: "1.º (tercer título seguido de Ferrari)",
      pilotos: "Lauda campeón (2.º título)"
    },
    titulos: ["Campeonato de Pilotos 1977 — Niki Lauda", "Campeonato de Constructores 1977 — Ferrari", "Campeonato de Constructores 1976 — Ferrari"],
    carreraModelo: {
      nombre: "GP de Brasil 1977 · Interlagos",
      texto: "Segunda fecha del año. Ganó el argentino Carlos Reutemann con la otra Ferrari 312 T2, James Hunt fue segundo y Lauda tercero. Ferrari arrancaba así la temporada que terminaría con Lauda bicampeón."
    },
    importancia: [
      "Es el auto del accidente de Lauda en Nürburgring 1976: volvió a correr apenas 6 semanas después.",
      "Con él Lauda volvió a ser campeón en 1977, un año después de casi morir.",
      "Ganó dos campeonatos de constructores seguidos para Ferrari."
    ],
    curiosidades: [
      "Lauda se fue de Ferrari apenas aseguró el título en 1977 y no corrió las dos últimas carreras: su lugar lo ocupó Gilles Villeneuve.",
      "El compañero de Lauda era Carlos Reutemann, 'el Lole'.",
      "En la última carrera de 1976, en Japón, Lauda se bajó por la lluvia y perdió el título con Hunt por un punto."
    ],
    relato: "Este auto casi le cuesta la vida a Niki Lauda… y después lo hizo campeón. Es la Ferrari 312 T2. En agosto de 1976, en Nürburgring, Lauda chocó, el auto se prendió fuego y quedó atrapado entre las llamas. Llegaron a darle la extremaunción. Cuarenta y dos días después, con las heridas todavía vendadas, volvió a correr. Ese año perdió el título por un solo punto. Pero en 1977, con este mismo modelo, fue campeón otra vez. Y apenas lo consiguió, se fue de Ferrari sin correr las dos últimas carreras. Tu modelo es el del Gran Premio de Brasil 1977, en Interlagos. ¿Quién ganó? Su compañero, el argentino Carlos Reutemann, con la otra 312 T2.",
    audio: "audio/312t2-1977-lauda.mp3",
    conexiones: [
      { id: "308b-1975-hunt", texto: "James Hunt, su gran rival, se hizo conocido con este Hesketh." }
    ]
  },

  {
    id: "tg184-1984-senna",
    etiqueta: {
      equipo: "Toleman",
      chasis: "TG184",
      anio: 1984,
      piloto: "Ayrton Senna",
      carrera: null
    },
    alias: ["TG 184", "TG18"],
    color: "#f5f5f5",
    acento: "#1d2f7a",
    numero: 19,
    ficha: [
      ["Motor", "Hart 415T · 1.5 L 4 cilindros turbo"],
      ["Diseño", "Rory Byrne"],
      ["Neumáticos", "Michelin (antes Pirelli)"],
      ["Sponsors", "Candy, Segafredo, Magirus"]
    ],
    pilotos: [
      { nombre: "Ayrton Senna", numero: 19, resultado: "9.º · 13 pts · 3 podios (Mónaco, Gran Bretaña, Portugal)" },
      { nombre: "Johnny Cecotto", numero: 20, resultado: "Se fracturó las piernas en Brands Hatch" }
    ],
    temporada: {
      carreras: 16,
      victorias: 0,
      poles: null,
      constructores: null,
      pilotos: "Senna 9.º en su año debut"
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "El auto del primer año de Senna en la F1.",
      "En Mónaco 1984, bajo lluvia, Senna remontaba hacia Prost cuando pararon la carrera: ahí nació la leyenda.",
      "Fue el primer gran diseño de Rory Byrne, que después hizo las Ferrari de Schumacher."
    ],
    curiosidades: [
      "Mónaco 1984 se detuvo antes de la mitad, así que dio solo medio puntaje: Senna se llevó 3 puntos por ese 2.º puesto.",
      "Toleman suspendió a Senna en Monza por haber firmado con Lotus sin avisarles.",
      "El equipo Toleman después fue Benetton, Renault, Lotus y hoy Alpine: la misma fábrica de Enstone."
    ],
    relato: "Este es el auto con el que el mundo conoció a Ayrton Senna. Toleman era un equipo chico, con un motor de cuatro cilindros, y Senna era un debutante. Pero en Mónaco 1984, bajo una lluvia torrencial, largó decimotercero y empezó a pasar autos como si la pista estuviera seca. Iba directo a alcanzar al líder, Alain Prost, cuando la carrera se suspendió. Terminó segundo, y nadie se olvidó más de ese nombre. Dos datos que pocos saben. El auto lo diseñó Rory Byrne, el mismo que años después hizo las Ferrari de Schumacher. Y el equipo Toleman nunca desapareció: se transformó en Benetton, después en Renault, y hoy es Alpine.",
    juan: "Ayrton en realidad era Ayrton Senna da Silva. Eligió correr con Senna, el apellido de la madre, porque Silva en Brasil hay millones. En sus primeras carreras en Inglaterra todavía figuraba como Ayrton da Silva.",
    audio: "audio/tg184-1984-senna.mp3",
    conexiones: [
      { id: "r25-2005-alonso", texto: "Mismo equipo, otra época: Toleman se convirtió en Renault y ganó con Alonso." },
      { id: "f2002-2002-schumacher", texto: "Rory Byrne, su diseñador, después creó la F2002." }
    ]
  },

  {
    id: "mp4-8-1993-senna",
    etiqueta: {
      equipo: "McLaren",
      chasis: "MP4/8",
      anio: 1993,
      piloto: "Ayrton Senna",
      carrera: null
    },
    alias: ["MP 4/8", "MP4 8", "MP48", "MP4-8"],
    color: "#f5f5f5",
    acento: "#e3001b",
    numero: 8,
    ficha: [
      ["Motor", "Ford HBE7 (Cosworth) · 3.5 L V8, como cliente"],
      ["Diseño", "Neil Oatley"],
      ["Neumáticos", "Goodyear"],
      ["Electrónica", "Suspensión activa y control de tracción"]
    ],
    pilotos: [
      { nombre: "Ayrton Senna", numero: 8, resultado: "2.º · 73 pts · 5 victorias" },
      { nombre: "Michael Andretti", numero: 7, resultado: "Dejó el equipo tras su podio en Monza" },
      { nombre: "Mika Häkkinen", numero: 7, resultado: "Reemplazo desde Portugal · podio en Japón" }
    ],
    temporada: {
      carreras: 16,
      victorias: 5,
      poles: null,
      constructores: "2.º",
      pilotos: "Senna subcampeón"
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "Con un motor inferior al de Williams, Senna le ganó 5 carreras al dominante FW15C.",
      "Donington 1993: la 'mejor primera vuelta de la historia', pasó de 5.º a 1.º bajo la lluvia.",
      "Ganó Mónaco por sexta vez: récord que todavía nadie superó."
    ],
    curiosidades: [
      "Fue el último McLaren de Senna. Su última victoria fue con este auto, en Australia 1993.",
      "En ese podio de Australia Senna y Prost se abrazaron: fue la última carrera de Prost.",
      "Häkkinen debutó en el equipo en Portugal y le ganó a Senna en la clasificación."
    ],
    relato: "En 1993, Ayrton Senna tenía un auto peor que el de su rival… y aun así hizo historia. McLaren había perdido los motores Honda y corría con un V8 de Ford, menos potente que el Williams de Prost. Senna hasta firmaba contrato carrera por carrera. Pero en Donington, bajo la lluvia, hizo lo que muchos llaman la mejor primera vuelta de la historia: pasó de quinto a primero en una sola vuelta. Ese año ganó Mónaco por sexta vez, un récord que todavía nadie superó. Y en Australia, la última carrera del año, ganó y se abrazó en el podio con Prost, su eterno enemigo. Fue la última victoria de Ayrton Senna.",
    audio: "audio/mp4-8-1993-senna.mp3",
    conexiones: [
      { id: "fw15c-1993-prost", texto: "El auto que Senna tuvo que enfrentar ese año: el Williams de Prost." }
    ]
  },

  {
    id: "fw15c-1993-prost",
    etiqueta: {
      equipo: "Williams",
      chasis: "FW15C",
      anio: 1993,
      piloto: "Alain Prost",
      carrera: null
    },
    alias: ["FW15 C", "FW 15C", "FW15"],
    color: "#0a2a8a",
    acento: "#f5d000",
    numero: 2,
    ficha: [
      ["Motor", "Renault RS5 · 3.5 L V10"],
      ["Diseño", "Adrian Newey · Patrick Head"],
      ["Neumáticos", "Goodyear"],
      ["Electrónica", "Suspensión activa, control de tracción, ABS, dirección asistida y caja semiautomática"]
    ],
    pilotos: [
      { nombre: "Alain Prost", numero: 2, resultado: "Campeón del mundo · 99 pts · 7 victorias · 13 poles" },
      { nombre: "Damon Hill", numero: 0, resultado: "3.º · 69 pts · 3 victorias (Hungría, Bélgica, Italia)" }
    ],
    temporada: {
      carreras: 16,
      victorias: 10,
      poles: 15,
      constructores: "1.º — 168 pts",
      pilotos: "Prost campeón (4.º título)"
    },
    titulos: ["Campeonato de Pilotos 1993 — Alain Prost", "Campeonato de Constructores 1993 — Williams"],
    carreraModelo: null,
    importancia: [
      "Para muchos, el auto con más ayudas electrónicas de la historia de la F1.",
      "Tanta tecnología que la FIA la prohibió para 1994.",
      "Le dio a Prost su cuarto título, en su última temporada."
    ],
    curiosidades: [
      "Prost puso en su contrato una cláusula para que Senna no pudiera entrar al equipo en 1993.",
      "Damon Hill corrió con el número 0 porque el campeón vigente, Mansell, se había ido a correr en Estados Unidos.",
      "Prost anunció su retiro en Portugal, la carrera donde aseguró el título."
    ],
    relato: "Para muchos, este es el auto más avanzado que corrió en la Fórmula 1. Es el Williams FW15C. Tenía suspensión activa, control de tracción, frenos ABS y dirección asistida, todo manejado por computadoras. Era tan superior que, para el año siguiente, la FIA prohibió casi todo eso. Alain Prost volvió de un año sabático para manejarlo, pero puso una condición en su contrato: Ayrton Senna no podía ser su compañero. Ganó siete carreras, hizo trece poles y fue campeón por cuarta vez. ¿Y después? Se retiró. Otro dato curioso: su compañero, Damon Hill, corrió con el número cero, porque el campeón del año anterior, Nigel Mansell, se había ido a correr a Estados Unidos.",
    juan: "A Prost le decían el Profesor, por lo calculador que era: pensaba la carrera entera antes de largar. Cuidaba las gomas, el auto y la nafta, y muchas veces ganaba sin que pareciera que iba rápido.",
    audio: "audio/fw15c-1993-prost.mp3",
    conexiones: [
      { id: "fw14b-1992-mansell", texto: "Su antecesor directo: el FW14B de Mansell." },
      { id: "mp4-8-1993-senna", texto: "Su rival ese año: el McLaren de Senna." }
    ]
  },

  {
    id: "f2002-2002-schumacher",
    etiqueta: {
      equipo: "Ferrari",
      chasis: "F2002",
      anio: 2002,
      piloto: "Michael Schumacher",
      carrera: null
    },
    alias: ["F 2002"],
    color: "#d40000",
    acento: "#ffffff",
    numero: 1,
    ficha: [
      ["Motor", "Ferrari Tipo 051 · 3.0 L V10"],
      ["Diseño", "Rory Byrne · Ross Brawn (director técnico)"],
      ["Neumáticos", "Bridgestone"],
      ["En pista", "Desde la 3.ª fecha de 2002; las dos primeras Ferrari corrió con la F2001"]
    ],
    pilotos: [
      { nombre: "Michael Schumacher", numero: 1, resultado: "Campeón del mundo · 144 pts · 11 victorias · podio en las 17 carreras" },
      { nombre: "Rubens Barrichello", numero: 2, resultado: "2.º · 77 pts · 4 victorias" }
    ],
    temporada: {
      carreras: 17,
      victorias: 15,
      poles: null,
      constructores: "1.º — 221 pts",
      pilotos: "Schumacher campeón (5.º título)"
    },
    titulos: ["Campeonato de Pilotos 2002 — Michael Schumacher", "Campeonato de Constructores 2002 — Ferrari"],
    carreraModelo: null,
    importancia: [
      "Schumacher subió al podio en todas las carreras del año.",
      "Fue campeón en julio, en Francia, con seis carreras por delante: el título más temprano de la historia.",
      "Ferrari sumó tantos puntos como todos los demás equipos juntos."
    ],
    curiosidades: [
      "Ganó en su debut, en Brasil.",
      "En Austria, Barrichello le dejó pasar a Schumacher en la última curva por orden del equipo; el escándalo hizo que se prohibieran las órdenes de equipo.",
      "En Estados Unidos intentaron llegar empatados y Barrichello ganó por 11 milésimas."
    ],
    relato: "Diecisiete carreras, diecisiete podios. Eso hizo Michael Schumacher en 2002, la temporada de esta Ferrari F2002. El auto ganó en su debut, en Brasil, y Schumacher fue campeón en julio, en Francia, cuando todavía faltaban seis carreras: el título más temprano de la historia. Ferrari sumó tantos puntos como todos los demás equipos juntos. Pero este auto también tiene su escándalo. En Austria, Rubens Barrichello iba ganando y, por orden del equipo, levantó en la última curva para dejar pasar a Schumacher. El público los abucheó en el podio, y la FIA terminó prohibiendo las órdenes de equipo. Ah, y lo diseñó Rory Byrne, el mismo del Toleman de Senna.",
    audio: "audio/f2002-2002-schumacher.mp3",
    conexiones: [
      { id: "f2004-2004-barrichello", texto: "Su evolución: la F2004, la del séptimo título de Schumacher, acá con Barrichello." },
      { id: "tg184-1984-senna", texto: "Rory Byrne, su diseñador, había hecho el Toleman de Senna en 1984." }
    ]
  },

  {
    id: "r25-2005-alonso",
    etiqueta: {
      equipo: "Renault",
      chasis: "R25",
      anio: 2005,
      piloto: "Fernando Alonso",
      carrera: null
    },
    alias: ["R 25", "MILD SEVEN"],
    color: "#2a8fd8",
    acento: "#f7c600",
    numero: 5,
    ficha: [
      ["Motor", "Renault RS25 · 3.0 L V10"],
      ["Diseño", "Bob Bell (director técnico) · Pat Symonds"],
      ["Jefe de equipo", "Flavio Briatore"],
      ["Neumáticos", "Michelin"],
      ["Reglamento", "Un solo juego de neumáticos para clasificación y carrera"]
    ],
    pilotos: [
      { nombre: "Fernando Alonso", numero: 5, resultado: "Campeón del mundo · 133 pts · 7 victorias" },
      { nombre: "Giancarlo Fisichella", numero: 6, resultado: "5.º · 1 victoria (Australia)" }
    ],
    temporada: {
      carreras: 19,
      victorias: 8,
      poles: null,
      constructores: "1.º — 191 pts",
      pilotos: "Alonso campeón (1.er título)"
    },
    titulos: ["Campeonato de Pilotos 2005 — Fernando Alonso", "Campeonato de Constructores 2005 — Renault"],
    carreraModelo: null,
    importancia: [
      "Cortó la racha de cinco títulos seguidos de Schumacher y Ferrari.",
      "Alonso fue el campeón más joven de la historia hasta ese momento, con 24 años.",
      "Primer título de constructores para Renault como equipo propio."
    ],
    curiosidades: [
      "En Imola, Alonso aguantó a Schumacher, mucho más rápido, durante las últimas vueltas sin cometer un error.",
      "Alonso aseguró el título en Brasil terminando 3.º.",
      "La fábrica de Enstone donde se hizo es la misma del Toleman de Senna."
    ],
    relato: "Cinco años seguidos ganó Michael Schumacher. Hasta que llegó este auto. Es el Renault R25, y lo manejaba un español de veintitrés años: Fernando Alonso. En 2005 había una regla rarísima: no se podían cambiar los neumáticos durante la carrera. Había que cuidarlos como oro. En Imola, Schumacher venía mucho más rápido, pegado atrás, vuelta tras vuelta. Alonso no cometió un solo error, y ganó. Terminó el año con siete victorias y fue campeón en Brasil, con veinticuatro años: el más joven de la historia hasta ese momento. Y un dato que pocos saben: este equipo es el mismo que en 1984 tenía a Senna, cuando se llamaba Toleman.",
    juan: "El primer karting de Alonso lo armó el padre para la hermana mayor, pero a ella no le gustó, y lo terminó manejando Fernando con tres años. Hoy tiene su propio museo en Asturias, con autos de toda su carrera.",
    audio: "audio/r25-2005-alonso.mp3",
    conexiones: [
      { id: "tg184-1984-senna", texto: "Hecho en Enstone, la misma fábrica que el Toleman de Senna en 1984." },
      { id: "f2004-2004-barrichello", texto: "El auto al que destronó: la Ferrari de la era Schumacher." }
    ]
  },

  // ======================= Colección (lista del 18/11/2026) =======================

  {
    id: "246f1-1958-hawthorn",
    etiqueta: {
      equipo: "Ferrari",
      chasis: "246 F1",
      anio: 1958,
      piloto: "Mike Hawthorn",
      carrera: "1958 Dutch Grand Prix"
    },
    alias: ["246F1", "246", "DINO 246", "DINO"],
    color: "#b3121b",
    acento: "#f2d21b",
    numero: null,
    ficha: [
      ["Motor", "Ferrari Dino · 2.4 L V6 delantero"],
      ["Nombre", "'Dino' por Alfredo 'Dino' Ferrari, el hijo de Enzo, que murió en 1956"],
      ["Neumáticos", "Englebert"],
      ["Época", "Uno de los últimos autos campeones con el motor adelante"]
    ],
    pilotos: [
      { nombre: "Mike Hawthorn", numero: null, resultado: "Campeón del mundo · 42 pts · 1 victoria (Francia)" },
      { nombre: "Peter Collins", numero: null, resultado: "Ganó en Gran Bretaña · murió en Nürburgring ese año" }
    ],
    temporada: {
      carreras: 11,
      victorias: 2,
      poles: null,
      constructores: "2.º (el primer Campeonato de Constructores lo ganó Vanwall)",
      pilotos: "Hawthorn campeón (único título)"
    },
    titulos: ["Campeonato de Pilotos 1958 — Mike Hawthorn"],
    carreraModelo: {
      nombre: "GP de los Países Bajos 1958 · Zandvoort",
      texto: "En las dunas de Zandvoort las Ferrari no anduvieron: ganó Stirling Moss con el Vanwall y los dos BRM completaron el podio. Hawthorn largó 6.º y terminó 5.º, a una vuelta. Esos dos puntos parecían poca cosa… pero al final del año el título se definió por un solo punto."
    },
    importancia: [
      "Hawthorn fue el primer campeón del mundo británico.",
      "Ganó el título por un punto sobre Moss, que había ganado cuatro carreras contra una sola de Hawthorn.",
      "1958 fue el primer año del Campeonato de Constructores."
    ],
    curiosidades: [
      "En Portugal quisieron descalificar a Hawthorn por empujar el auto en contra del sentido de la pista: Moss declaró a su favor y le salvó los puntos. Ese gesto le costó el campeonato.",
      "Ese año murieron sus dos compañeros, Luigi Musso y Peter Collins. Hawthorn se retiró apenas salió campeón.",
      "Murió en un accidente en la ruta en enero de 1959, pocos meses después de retirarse."
    ],
    relato: "Una victoria contra cuatro. Así terminó 1958: Stirling Moss ganó cuatro carreras, Mike Hawthorn una sola… y el campeón fue Hawthorn, por un punto. Lo hizo con este auto, la Ferrari Dino 246, con el motor adelante y el nombre del hijo de Enzo Ferrari, que había muerto dos años antes. Tu modelo es el de Holanda, en Zandvoort: ese día Hawthorn terminó quinto, a una vuelta. Parecía poca cosa, pero esos dos puntos valieron oro. Y hay más: en Portugal, Moss defendió a Hawthorn para que no lo descalificaran. Ese gesto de caballero le costó el título. Fue un año durísimo: murieron los dos compañeros de Hawthorn. Él se retiró apenas salió campeón, y pocos meses después murió en un accidente en la ruta.",
    juan: "Hawthorn corría con corbata moño. Sí, con moño, arriba de un auto de carrera. Alto, rubio y con moño: era su marca. En Inglaterra le decían el Volador de Farnham, por el pueblo donde la familia tenía su taller.",
    audio: "audio/246f1-1958-hawthorn.mp3"
  },

  {
    id: "lotus25-1963-clark",
    etiqueta: {
      equipo: "Lotus",
      chasis: "25",
      anio: 1963,
      piloto: "Jim Clark",
      carrera: null
    },
    alias: ["LOTUS 25", "LOTUS25"],
    color: "#0b5d2e",
    acento: "#f2d21b",
    numero: null,
    ficha: [
      ["Motor", "Coventry Climax FWMV · 1.5 L V8"],
      ["Diseño", "Colin Chapman"],
      ["Chasis", "Monocasco: el primero de la Fórmula 1 moderna"],
      ["Neumáticos", "Dunlop"]
    ],
    pilotos: [
      { nombre: "Jim Clark", numero: null, resultado: "Campeón del mundo · 7 victorias en 10 carreras" }
    ],
    temporada: {
      carreras: 10,
      victorias: 7,
      poles: null,
      constructores: "1.º",
      pilotos: "Clark campeón (1.er título)"
    },
    titulos: ["Campeonato de Pilotos 1963 — Jim Clark", "Campeonato de Constructores 1963 — Lotus"],
    carreraModelo: null,
    importancia: [
      "Fue el primer Fórmula 1 con chasis monocasco: en vez de un esqueleto de caños, una sola estructura tipo 'bañera'. Todos lo copiaron.",
      "Las 7 victorias de Clark en una temporada fueron récord hasta Senna en 1988.",
      "Empezó la era de Lotus y Colin Chapman como los grandes innovadores."
    ],
    curiosidades: [
      "El piloto iba casi acostado, para que el auto fuera lo más bajo y angosto posible.",
      "En Zandvoort 1963 Clark le sacó una vuelta a todos los demás."
    ],
    relato: "Este auto cambió cómo se construye un Fórmula 1. Es el Lotus 25, y fue el primero con chasis monocasco: en vez de un esqueleto de caños, una sola pieza como una bañera, liviana y durísima. Lo inventó Colin Chapman, el genio de Lotus, y todos los demás lo terminaron copiando. Adentro iba Jim Clark, casi acostado, un escocés tímido que en la pista era imparable. En 1963 ganó siete de las diez carreras y fue campeón. En Holanda le sacó una vuelta a todos. Ese récord de siete victorias en un año duró veinticinco años, hasta que llegó Ayrton Senna. Para muchos pilotos de su época, Clark fue el más rápido de todos.",
    juan: "Jim Clark, entre carrera y carrera, volvía a Escocia a trabajar en el campo de la familia, con las ovejas. Era un tipo tímido, callado, de campo, que se transformaba cuando se ponía el casco.",
    audio: "audio/lotus25-1963-clark.mp3"
  },

  {
    id: "512f1-1964-bandini",
    etiqueta: {
      equipo: "Ferrari",
      chasis: "512 F1",
      anio: 1964,
      piloto: "Lorenzo Bandini",
      carrera: "1964 Mexican Grand Prix"
    },
    alias: ["512F1", "1512", "512", "NART"],
    color: "#f2f2f2",
    acento: "#1f4fa3",
    numero: null,
    ficha: [
      ["Motor", "Ferrari · 1.5 L 12 cilindros horizontales (bóxer)"],
      ["Diseño", "Mauro Forghieri"],
      ["Equipo inscripto", "North American Racing Team (NART), de Luigi Chinetti"],
      ["Colores", "Blanco con franjas azules: los de Estados Unidos"]
    ],
    pilotos: [
      { nombre: "Lorenzo Bandini", numero: null, resultado: "3.º en México · ganó en Austria ese año (con otra Ferrari)" },
      { nombre: "John Surtees", numero: null, resultado: "Campeón del mundo con la Ferrari 158" }
    ],
    temporada: {
      carreras: 10,
      victorias: 3,
      poles: null,
      constructores: "1.º",
      pilotos: "Surtees campeón, con la Ferrari 158"
    },
    titulos: ["Campeonato de Constructores 1964 — Ferrari"],
    carreraModelo: {
      nombre: "GP de México 1964 · Ciudad de México",
      texto: "Última carrera y tres candidatos: Graham Hill, Jim Clark y John Surtees. Bandini tocó a Hill y lo hizo trompear; Clark se quedó sin aceite en la última vuelta. Ganó Dan Gurney, y Bandini, que iba segundo, levantó para dejar pasar a su compañero Surtees. Ese segundo puesto le dio el título a Surtees por un punto. Bandini terminó 3.º."
    },
    importancia: [
      "Es una de las poquísimas veces que una Ferrari oficial corrió sin el rojo: Enzo estaba peleado con la federación italiana y mandó los autos a nombre del equipo de su importador en Estados Unidos.",
      "Con la ayuda de Bandini, Surtees se convirtió en el único campeón del mundo en motos y en autos.",
      "Fue el primer motor de 12 cilindros horizontales de Ferrari en la F1."
    ],
    curiosidades: [
      "Lo de pintarla de blanco y azul fue una protesta: Enzo Ferrari estaba enojado porque no le homologaban un auto de carreras de resistencia.",
      "Debutó una carrera antes, en Estados Unidos, y abandonó por el motor.",
      "El nombre '512' viene de 1.5 litros y 12 cilindros."
    ],
    relato: "¿Una Ferrari blanca y azul? Sí, y no es un error. En 1964 Enzo Ferrari estaba tan peleado con la federación italiana que, en las dos últimas carreras, mandó sus autos a nombre del equipo de su importador en Estados Unidos, con los colores de ese país. Esta es la 512, con un motor de doce cilindros chato, y tu modelo es el de México, la final del campeonato. Había tres candidatos. Lorenzo Bandini tocó a Graham Hill y lo hizo girar; a Jim Clark se le rompió el motor en la última vuelta. Y Bandini, que iba segundo, levantó el pie para dejar pasar a su compañero John Surtees. Ese segundo puesto le dio el título a Surtees por un punto: el único campeón del mundo en motos y en autos.",
    audio: "audio/512f1-1964-bandini.mp3",
    conexiones: [
      { id: "ra300-1967-surtees", texto: "Surtees, el campeón que Bandini ayudó a coronar, ganó después con Honda." }
    ]
  },

  {
    id: "bt24-1967-hulme",
    etiqueta: {
      equipo: "Brabham",
      chasis: "BT24",
      anio: 1967,
      piloto: "Denis Hulme",
      carrera: null
    },
    alias: ["BT 24", "BT24 REPCO", "REPCO"],
    color: "#1f6b3a",
    acento: "#f2c21b",
    numero: null,
    ficha: [
      ["Motor", "Repco 740 · 3.0 L V8 (australiano)"],
      ["Diseño", "Ron Tauranac"],
      ["Dueño del equipo", "Jack Brabham, que también era piloto"],
      ["Neumáticos", "Goodyear"]
    ],
    pilotos: [
      { nombre: "Denis Hulme", numero: null, resultado: "Campeón del mundo · 51 pts · 2 victorias (Mónaco y Alemania)" },
      { nombre: "Jack Brabham", numero: null, resultado: "2.º · 46 pts · 2 victorias" }
    ],
    temporada: {
      carreras: 11,
      victorias: 4,
      poles: null,
      constructores: "1.º",
      pilotos: "Hulme campeón (único título)"
    },
    titulos: ["Campeonato de Pilotos 1967 — Denis Hulme", "Campeonato de Constructores 1967 — Brabham"],
    carreraModelo: null,
    importancia: [
      "Hulme es el único neozelandés campeón del mundo de F1.",
      "Segundo título seguido para Brabham, un equipo chico con un motor australiano.",
      "Ganó con regularidad, no con potencia: el Repco era más débil que el nuevo Ford Cosworth, pero se rompía mucho menos."
    ],
    curiosidades: [
      "Hulme le ganó el título a su propio jefe, Jack Brabham.",
      "Le decían 'El Oso' por su carácter seco y gruñón.",
      "Con el BT24 ganó en Nürburgring, el circuito más difícil del mundo."
    ],
    relato: "Imaginate ganarle el campeonato a tu propio jefe. Eso hizo Denis Hulme en 1967 con este auto, el Brabham BT24. El dueño del equipo era Jack Brabham, que además corría, y que el año anterior había sido campeón con su propio auto. El motor era australiano, un Repco, menos potente que los rivales… pero casi nunca se rompía. Hulme, un neozelandés de pocas palabras al que le decían el Oso, ganó en Mónaco y en Nürburgring, sumó puntos carrera tras carrera, y terminó campeón por cinco puntos sobre su jefe. Es el único campeón del mundo de Nueva Zelanda. Al año siguiente se fue a McLaren, el equipo de su amigo y compatriota Bruce McLaren.",
    audio: "audio/bt24-1967-hulme.mp3"
  },

  {
    id: "ra300-1967-surtees",
    etiqueta: {
      equipo: "Honda",
      chasis: "RA300",
      anio: 1967,
      piloto: "John Surtees",
      carrera: null
    },
    alias: ["RA 300", "HONDOLA"],
    color: "#f2f2f2",
    acento: "#c8102e",
    numero: 14,
    ficha: [
      ["Motor", "Honda · 3.0 L V12"],
      ["Chasis", "Hecho en Inglaterra junto con Lola: por eso le dijeron 'Hondola'"],
      ["Colores", "Blanco con el círculo rojo de Japón"]
    ],
    pilotos: [
      { nombre: "John Surtees", numero: 14, resultado: "Ganó en Italia en el debut del auto · 4.º en el campeonato" }
    ],
    temporada: {
      carreras: 11,
      victorias: 1,
      poles: null,
      constructores: null,
      pilotos: "Surtees 4.º"
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "Ganó en su primera carrera: Monza 1967.",
      "Fue la segunda victoria de Honda en la F1, y la última como equipo propio por casi 40 años.",
      "Lo armaron en pocas semanas, con el chasis de un auto de Indianápolis de Lola."
    ],
    curiosidades: [
      "En Monza, Surtees le ganó a Jack Brabham por dos décimas en un sprint hasta la última curva.",
      "La siguiente victoria de Honda como equipo propio llegó recién en Hungría 2006, con Jenson Button.",
      "Surtees fue campeón del mundo en motos siete veces antes de pasarse a los autos."
    ],
    relato: "Este auto se armó en unas pocas semanas y ganó en su primera carrera. Es el Honda RA300 de 1967. El motor V12 japonés era potente pero pesado, y John Surtees, el piloto, convenció a Honda de hacer el chasis en Inglaterra con la fábrica Lola, usando la base de un auto de Indianápolis. Los mecánicos lo bautizaron Hondola. Lo estrenaron en Monza, y la carrera fue una locura: en la última vuelta Surtees y Jack Brabham llegaron juntos a la última curva, y Surtees ganó por dos décimas. Fue la segunda victoria de Honda con equipo propio en la Fórmula 1. La tercera tardó casi cuarenta años: llegó en 2006, con Jenson Button.",
    audio: "audio/ra300-1967-surtees.mp3",
    conexiones: [
      { id: "ra106-2006-button", texto: "La siguiente victoria de Honda como equipo propio llegó 39 años después, con Button." }
    ]
  },

  {
    id: "p153-1970-rodriguez",
    etiqueta: {
      equipo: "BRM",
      chasis: "P153",
      anio: 1970,
      piloto: "Pedro Rodríguez",
      carrera: "1970 Belgian Grand Prix"
    },
    alias: ["P 153", "YARDLEY"],
    color: "#f2f2f2",
    acento: "#7a4a1f",
    numero: null,
    ficha: [
      ["Motor", "BRM · 3.0 L V12"],
      ["Diseño", "Tony Southgate"],
      ["Patrocinio", "Yardley (perfumes ingleses)"]
    ],
    pilotos: [
      { nombre: "Pedro Rodríguez", numero: null, resultado: "Ganó en Bélgica · la segunda y última victoria de su carrera" }
    ],
    temporada: {
      carreras: 13,
      victorias: 1,
      poles: null,
      constructores: null,
      pilotos: null
    },
    titulos: [],
    carreraModelo: {
      nombre: "GP de Bélgica 1970 · Spa-Francorchamps",
      texto: "El Spa viejo, de 14 km entre bosques y pueblos, era el circuito más rápido del mundo. Pedro Rodríguez peleó toda la carrera con Chris Amon y le ganó por poco más de un segundo, a un promedio de más de 240 km/h. Fue la primera victoria de BRM en cuatro años."
    },
    importancia: [
      "Rodríguez es, junto con Sergio Pérez, el mexicano que más ganó en la F1.",
      "Le devolvió a BRM una victoria después de cuatro años.",
      "Ganó en el circuito más rápido y temido de la época."
    ],
    curiosidades: [
      "El autódromo de Ciudad de México se llama Hermanos Rodríguez por Pedro y su hermano Ricardo, los dos muertos en carreras.",
      "Rodríguez era un especialista en lluvia y en autos sport: ganó las 24 Horas de Le Mans en 1968.",
      "Murió en 1971 en una carrera de autos sport en Alemania."
    ],
    relato: "El circuito más rápido del mundo y un mexicano que no levantaba el pie. Este es el BRM P153, y tu modelo es el del Gran Premio de Bélgica de 1970. Spa, en esa época, tenía catorce kilómetros entre bosques y pueblos, a fondo casi todo el tiempo. Pedro Rodríguez se tiró a pelear con Chris Amon vuelta tras vuelta, y le ganó por un segundo, a un promedio de más de doscientos cuarenta kilómetros por hora. Fue la primera victoria de BRM en cuatro años. Pedro y su hermano Ricardo fueron los primeros ídolos mexicanos del automovilismo, y los dos murieron corriendo. Por ellos, el autódromo de Ciudad de México se llama Hermanos Rodríguez.",
    audio: "audio/p153-1970-rodriguez.mp3"
  },

  {
    id: "72d-1972-fittipaldi",
    etiqueta: {
      equipo: "Lotus",
      chasis: "72D",
      anio: 1972,
      piloto: "Emerson Fittipaldi",
      carrera: null
    },
    alias: ["72 D", "LOTUS 72", "JOHN PLAYER SPECIAL", "JPS"],
    color: "#111111",
    acento: "#c9a227",
    numero: null,
    ficha: [
      ["Motor", "Ford Cosworth DFV · 3.0 L V8"],
      ["Diseño", "Colin Chapman · Maurice Philippe"],
      ["Forma", "Cuña, con los radiadores a los costados y frenos adentro del auto"],
      ["Patrocinio", "John Player Special (el negro y dorado)"]
    ],
    pilotos: [
      { nombre: "Emerson Fittipaldi", numero: null, resultado: "Campeón del mundo · 61 pts · 5 victorias" }
    ],
    temporada: {
      carreras: 12,
      victorias: 5,
      poles: null,
      constructores: "1.º",
      pilotos: "Fittipaldi campeón (1.er título)"
    },
    titulos: ["Campeonato de Pilotos 1972 — Emerson Fittipaldi", "Campeonato de Constructores 1972 — Lotus"],
    carreraModelo: null,
    importancia: [
      "Fittipaldi fue campeón con 25 años: el más joven de la historia hasta Alonso en 2005.",
      "Primer brasileño campeón del mundo: abrió el camino de Piquet y Senna.",
      "El Lotus 72 corrió seis temporadas y ganó 20 carreras: uno de los autos más exitosos de la historia."
    ],
    curiosidades: [
      "Muchos lo consideran el auto de F1 más lindo de todos los tiempos.",
      "Con el Lotus 72 Jochen Rindt fue campeón en 1970 después de morir: el único campeón póstumo.",
      "Fittipaldi aseguró el título en Monza ganando la carrera."
    ],
    relato: "Negro y dorado: para muchos, el Fórmula 1 más lindo de la historia. Es el Lotus 72, con los colores de John Player Special. Tenía forma de cuña, los radiadores a los costados y los frenos escondidos adentro: Colin Chapman otra vez un paso adelante. Este auto corrió seis temporadas y ganó veinte carreras. En 1972 lo manejaba un brasileño de veinticinco años, Emerson Fittipaldi. Ganó cinco carreras y se coronó en Monza: el campeón más joven de la historia hasta ese momento, y el primero de Brasil. Detrás de él vinieron Nelson Piquet y Ayrton Senna. Y una historia triste: con este mismo modelo, Jochen Rindt fue campeón en 1970… después de morir en un accidente.",
    juan: "Emerson después armó su propio equipo con su hermano Wilson: el Fittipaldi, el único equipo brasileño de la historia de la Fórmula 1. Corrió muchos años con el patrocinio de Copersucar, la empresa del azúcar, y su mejor resultado fue un segundo puesto de Emerson en Brasil.",
    audio: "audio/72d-1972-fittipaldi.mp3"
  },

  {
    id: "p160b-1972-beltoise",
    etiqueta: {
      equipo: "BRM",
      chasis: "P160B",
      anio: 1972,
      piloto: "Jean-Pierre Beltoise",
      carrera: "1972 Monaco Grand Prix"
    },
    alias: ["P160 B", "P 160B", "P160", "MARLBORO"],
    color: "#f2f2f2",
    acento: "#c8102e",
    numero: 17,
    ficha: [
      ["Motor", "BRM · 3.0 L V12"],
      ["Diseño", "Tony Southgate"],
      ["Patrocinio", "Marlboro"]
    ],
    pilotos: [
      { nombre: "Jean-Pierre Beltoise", numero: 17, resultado: "Ganó en Mónaco · su única victoria" }
    ],
    temporada: {
      carreras: 12,
      victorias: 1,
      poles: null,
      constructores: null,
      pilotos: null
    },
    titulos: [],
    carreraModelo: {
      nombre: "GP de Mónaco 1972",
      texto: "Llovió durante toda la carrera. Beltoise largó 4.º, pasó a todos en la primera curva y no lo vio nadie más: lideró de punta a punta, sin errores, mientras los favoritos se tocaban y trompeaban en las calles mojadas. Fue la única victoria de su carrera y la última de BRM en la F1."
    },
    importancia: [
      "Fue la última victoria de BRM, un equipo que había sido campeón en 1962 con Graham Hill.",
      "Una de las grandes carreras bajo lluvia de la historia de Mónaco.",
      "Beltoise ganó con el brazo izquierdo casi sin movimiento, por un accidente de 1964."
    ],
    curiosidades: [
      "Beltoise también fue campeón de Francia en motos.",
      "Fue cuñado de François Cevert, el compañero de Jackie Stewart."
    ],
    relato: "Mónaco, 1972. Llueve durante toda la carrera, las calles son una pista de patinaje y los mejores pilotos del mundo trompean contra los guardarraíles. Uno solo no se equivoca nunca: Jean-Pierre Beltoise, con este BRM blanco y rojo. Largó cuarto, pasó adelante en la primera curva y no lo vio nadie más. Ganó de punta a punta. Y lo hizo con el brazo izquierdo casi sin movimiento, por un accidente que había tenido ocho años antes. Fue la única victoria de su vida… y la última de BRM, un equipo histórico que había sido campeón del mundo. Por eso esta es una de esas carreras que en Mónaco todavía se recuerdan cuando llueve.",
    audio: "audio/p160b-1972-beltoise.mp3",
    conexiones: [
      { id: "p153-1970-rodriguez", texto: "Dos años antes, el BRM anterior había ganado en Spa con Pedro Rodríguez." }
    ]
  },

  {
    id: "006-1973-stewart",
    etiqueta: {
      equipo: "Tyrrell",
      chasis: "006",
      anio: 1973,
      piloto: "Jackie Stewart",
      carrera: null
    },
    alias: ["TYRRELL 006", "ELF"],
    color: "#1c3f94",
    acento: "#f2f2f2",
    numero: 5,
    ficha: [
      ["Motor", "Ford Cosworth DFV · 3.0 L V8"],
      ["Diseño", "Derek Gardner"],
      ["Jefe de equipo", "Ken Tyrrell, que tenía un aserradero"],
      ["Patrocinio", "Elf (por eso el azul francés)"]
    ],
    pilotos: [
      { nombre: "Jackie Stewart", numero: 5, resultado: "Campeón del mundo · 71 pts · 5 victorias" },
      { nombre: "François Cevert", numero: 6, resultado: "4.º · murió en la clasificación de la última carrera" }
    ],
    temporada: {
      carreras: 15,
      victorias: 5,
      poles: null,
      constructores: "2.º",
      pilotos: "Stewart campeón (3.er título)"
    },
    titulos: ["Campeonato de Pilotos 1973 — Jackie Stewart"],
    carreraModelo: null,
    importancia: [
      "Le dio a Stewart su tercer título y su victoria número 27: récord hasta Prost en 1987.",
      "Con este auto Stewart superó las 25 victorias de su amigo Jim Clark.",
      "Último campeonato de Tyrrell, un equipo que empezó en un depósito de madera."
    ],
    curiosidades: [
      "Stewart ya había decidido retirarse a fin de año y no se lo había contado a casi nadie.",
      "Su carrera número 100 iba a ser en Estados Unidos, pero no la corrió: su compañero François Cevert murió en la clasificación y el equipo se retiró.",
      "Stewart dedicó el resto de su vida a mejorar la seguridad de los autódromos."
    ],
    relato: "Este es el último auto que manejó Jackie Stewart. El Tyrrell 006, azul como los autos franceses por su sponsor, Elf. En 1973 Stewart ganó cinco carreras, superó las veinticinco victorias de su gran amigo Jim Clark, llegó a veintisiete, un récord que duró catorce años, y fue campeón por tercera vez. Lo que nadie sabía es que ya había decidido retirarse. La última carrera del año, en Estados Unidos, iba a ser la número cien de su vida. Pero en la clasificación murió su compañero, François Cevert, el piloto al que preparaba para reemplazarlo. El equipo se retiró, y Stewart nunca corrió su carrera cien. Después dedicó su vida a que el automovilismo fuera más seguro.",
    juan: "Jackie Stewart era disléxico y se enteró recién pasados los cuarenta, cuando le diagnosticaron lo mismo a uno de sus hijos. Toda la vida había pensado que era lento para aprender. Después dedicó mucho tiempo a ayudar a chicos con dislexia.",
    audio: "audio/006-1973-stewart.mp3",
    conexiones: [
      { id: "lotus25-1963-clark", texto: "Con este auto Stewart superó las 25 victorias de Clark, su amigo." }
    ]
  },

  {
    id: "bt44b-1975-pace",
    etiqueta: {
      equipo: "Brabham",
      chasis: "BT44B",
      anio: 1975,
      piloto: "Carlos Pace",
      carrera: "1975 Brazilian Grand Prix"
    },
    alias: ["BT44 B", "BT 44B", "BT44", "MARTINI"],
    color: "#f2f2f2",
    acento: "#c8102e",
    numero: 8,
    ficha: [
      ["Motor", "Ford Cosworth DFV · 3.0 L V8"],
      ["Diseño", "Gordon Murray"],
      ["Chasis", "Monocasco de sección triangular, muy limpio de líneas"],
      ["Patrocinio", "Martini"]
    ],
    pilotos: [
      { nombre: "Carlos Pace", numero: 8, resultado: "Ganó en Brasil · su única victoria" },
      { nombre: "Carlos Reutemann", numero: 7, resultado: "Ganó en Alemania · 3.º en el campeonato" }
    ],
    temporada: {
      carreras: 14,
      victorias: 2,
      poles: null,
      constructores: "2.º",
      pilotos: "Reutemann 3.º"
    },
    titulos: [],
    carreraModelo: {
      nombre: "GP de Brasil 1975 · Interlagos",
      texto: "En su casa y delante de su gente, Carlos Pace aprovechó el abandono del líder y ganó por primera vez. Segundo llegó Emerson Fittipaldi: el primer 1-2 brasileño de la historia, en Interlagos. Fue la única victoria de Pace en la F1."
    },
    importancia: [
      "Primer 1-2 brasileño de la historia de la F1, en Brasil.",
      "Tenía de compañero a un argentino, Carlos Reutemann, que ganó con este mismo auto en Nürburgring.",
      "Es uno de los primeros grandes diseños de Gordon Murray, que después haría el McLaren MP4/4."
    ],
    curiosidades: [
      "Pace murió en un accidente de avioneta en 1977. Desde entonces el autódromo de Interlagos se llama oficialmente José Carlos Pace.",
      "Los dos pilotos del equipo se llamaban Carlos: Pace y Reutemann.",
      "Le decían 'Moco'."
    ],
    relato: "Un brasileño gana en Brasil y otro brasileño llega segundo. Eso pasó en Interlagos en 1975, con este auto: el Brabham BT44B, blanco con las rayas de Martini, diseñado por Gordon Murray. El ganador fue Carlos Pace, que aprovechó el abandono del líder. Detrás llegó Emerson Fittipaldi. Fue la única victoria de Pace en la Fórmula 1. Y un dato para nosotros: su compañero de equipo era Carlos Reutemann, que con este mismo auto ganó ese año en Alemania. Dos Carlos en el mismo box. Pace murió dos años después en un accidente de avioneta, y desde entonces el autódromo de Interlagos lleva su nombre: José Carlos Pace.",
    audio: "audio/bt44b-1975-pace.mp3",
    conexiones: [
      { id: "72d-1972-fittipaldi", texto: "Fittipaldi, el que llegó segundo ese día, fue el primer campeón brasileño." }
    ]
  },

  {
    id: "751-1975-brambilla",
    etiqueta: {
      equipo: "March",
      chasis: "751",
      anio: 1975,
      piloto: "Vittorio Brambilla",
      carrera: "1975 Austrian Grand Prix"
    },
    alias: ["MARCH 751", "BETA"],
    color: "#f07a1a",
    acento: "#111111",
    numero: null,
    ficha: [
      ["Motor", "Ford Cosworth DFV · 3.0 L V8"],
      ["Diseño", "Robin Herd"],
      ["Patrocinio", "Beta (herramientas italianas)"]
    ],
    pilotos: [
      { nombre: "Vittorio Brambilla", numero: null, resultado: "Ganó en Austria · su única victoria" },
      { nombre: "Lella Lombardi", numero: null, resultado: "Sumó medio punto en España: la única mujer que puntuó en la F1" }
    ],
    temporada: {
      carreras: 14,
      victorias: 1,
      poles: null,
      constructores: null,
      pilotos: null
    },
    titulos: [],
    carreraModelo: {
      nombre: "GP de Austria 1975 · Österreichring",
      texto: "Diluviaba. Brambilla pasó adelante y la carrera se suspendió en la vuelta 29, poco más de la mitad: ganó él, y por no haber completado la distancia se dio la mitad de los puntos. Al cruzar la llegada soltó el volante para festejar con los dos brazos… y estrelló el auto contra el guardarraíl. Dio la vuelta de honor con la trompa rota."
    },
    importancia: [
      "Una de las pocas victorias de March en la F1.",
      "Una de las carreras más raras de la historia: ganada bajo diluvio, a media distancia y con choque incluido.",
      "Ese mismo año, con el March, Lella Lombardi sumó medio punto en España: la única mujer que puntuó en la F1."
    ],
    curiosidades: [
      "A Brambilla le decían 'El Gorila de Monza' por su estilo bruto y su físico.",
      "Por la carrera cortada le dieron medio puntaje: 4,5 puntos en vez de 9."
    ],
    relato: "La victoria más loca de la historia de la Fórmula 1. Austria, 1975, diluvio total. Vittorio Brambilla, un italiano grandote al que le decían el Gorila de Monza, se pone adelante con este March naranja. Llueve tanto que paran la carrera en la vuelta veintinueve, poco más de la mitad. Ganó. Y estaba tan feliz que, al cruzar la meta, soltó el volante para festejar con los dos brazos arriba… y se estrelló contra el guardarraíl. Dio la vuelta de honor con la trompa rota, saludando igual. Como no se completó la carrera, le dieron la mitad de los puntos. Fue la única victoria de su vida, y no cambiaría ese festejo por nada.",
    audio: "audio/751-1975-brambilla.mp3"
  },

  {
    id: "m23-1976-hunt",
    etiqueta: {
      equipo: "McLaren",
      chasis: "M23",
      anio: 1976,
      piloto: "James Hunt",
      carrera: null
    },
    alias: ["M 23", "MARLBORO"],
    color: "#f2f2f2",
    acento: "#d40000",
    numero: 11,
    ficha: [
      ["Motor", "Ford Cosworth DFV · 3.0 L V8"],
      ["Diseño", "Gordon Coppuck"],
      ["Neumáticos", "Goodyear"],
      ["Patrocinio", "Marlboro"]
    ],
    pilotos: [
      { nombre: "James Hunt", numero: 11, resultado: "Campeón del mundo · 69 pts · 6 victorias" },
      { nombre: "Jochen Mass", numero: 12, resultado: null }
    ],
    temporada: {
      carreras: 16,
      victorias: 6,
      poles: null,
      constructores: "2.º",
      pilotos: "Hunt campeón (único título)"
    },
    titulos: ["Campeonato de Pilotos 1976 — James Hunt", "Campeonato de Pilotos 1974 — Emerson Fittipaldi (también con el M23)"],
    carreraModelo: null,
    importancia: [
      "Ganó dos títulos de pilotos: Fittipaldi en 1974 y Hunt en 1976.",
      "Es el auto de la temporada de la película Rush: Hunt contra Lauda.",
      "Hunt le ganó el título a Lauda por un punto, en la última carrera."
    ],
    curiosidades: [
      "En Japón, bajo un diluvio, Lauda se bajó del auto a las dos vueltas: dijo que no valía la pena arriesgar la vida. Hunt terminó 3.º y salió campeón.",
      "Hunt no supo que era campeón hasta que le confirmaron el resultado, después de cruzar la meta.",
      "Lauda había vuelto a correr 42 días después de casi morir quemado en Nürburgring."
    ],
    relato: "Un punto. Esa fue la diferencia en el campeonato más famoso de la historia, el que inspiró la película Rush. Este es el McLaren M23 de James Hunt. En 1976 Hunt y Niki Lauda pelearon todo el año. En Alemania, Lauda casi muere quemado en Nürburgring… y cuarenta y dos días después volvió a correr, con las vendas todavía puestas. La final fue en Japón, bajo un diluvio. Lauda se bajó del auto a las dos vueltas: dijo que su vida valía más que un título. Hunt siguió, tuvo que parar a cambiar gomas, y terminó tercero. Le alcanzó: campeón por un punto. Fuera de la pista eran amigos. Y este mismo modelo de auto ya había sido campeón dos años antes, con Emerson Fittipaldi.",
    juan: "Antes de la Fórmula 1, a Hunt le decían Hunt the Shunt, algo así como Hunt el choque, por la cantidad de autos que rompía. Después se calmó un poco, salió campeón del mundo con este auto, pero el apodo le quedó para siempre.",
    audio: "audio/m23-1976-hunt.mp3",
    conexiones: [
      { id: "312t2-1977-lauda", texto: "La Ferrari 312 T2 era el auto de Lauda en esa pelea de 1976." },
      { id: "72d-1972-fittipaldi", texto: "Fittipaldi fue campeón con el M23 en 1974, después de su título con Lotus." }
    ]
  },

  {
    id: "p34-1976-scheckter",
    etiqueta: {
      equipo: "Tyrrell",
      chasis: "P34",
      anio: 1976,
      piloto: "Jody Scheckter",
      carrera: null
    },
    alias: ["P 34", "TYRRELL P34", "SEIS RUEDAS"],
    color: "#1c3f94",
    acento: "#f2f2f2",
    numero: 3,
    ficha: [
      ["Motor", "Ford Cosworth DFV · 3.0 L V8"],
      ["Diseño", "Derek Gardner"],
      ["Ruedas", "Seis: cuatro chiquitas adelante (de 10 pulgadas) y dos normales atrás"],
      ["Patrocinio", "Elf"]
    ],
    pilotos: [
      { nombre: "Jody Scheckter", numero: 3, resultado: "3.º · 49 pts · ganó en Suecia" },
      { nombre: "Patrick Depailler", numero: 4, resultado: "4.º · 2.º en Suecia" }
    ],
    temporada: {
      carreras: 16,
      victorias: 1,
      poles: null,
      constructores: "3.º",
      pilotos: "Scheckter 3.º"
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "El único auto de seis ruedas que ganó una carrera de F1: Suecia 1976, con un 1-2.",
      "La idea: ruedas delanteras más chicas para que el aire pegue menos, y cuatro para no perder agarre.",
      "Uno de los autos más reconocibles de toda la historia."
    ],
    curiosidades: [
      "Tenía ventanitas a los costados del habitáculo para que el piloto pudiera ver las ruedas de adelante.",
      "Al año siguiente los proveedores de gomas dejaron de desarrollar las ruedas chiquitas y el auto perdió rendimiento.",
      "Más tarde la FIA limitó los autos a cuatro ruedas: nunca más hubo otro."
    ],
    relato: "Contá las ruedas. Sí, son seis. Este es el Tyrrell P34, el auto más raro que ganó una carrera de Fórmula 1. La idea del diseñador Derek Gardner fue poner cuatro ruedas chiquitas adelante: así el aire chocaba menos contra ellas y no se perdía agarre. Tenía hasta unas ventanitas a los costados para que el piloto viera las ruedas delanteras. Muchos se rieron… hasta el Gran Premio de Suecia de 1976, donde Jody Scheckter ganó y Patrick Depailler llegó segundo. Un uno-dos de seis ruedas. Scheckter terminó tercero en el campeonato y tres años después fue campeón con Ferrari. Después las reglas limitaron los autos a cuatro ruedas, y el P34 quedó único para siempre.",
    audio: "audio/p34-1976-scheckter.mp3",
    conexiones: [
      { id: "006-1973-stewart", texto: "Mismo diseñador y mismo equipo que el auto del último título de Stewart." }
    ]
  },

  {
    id: "lotus79-1978-andretti",
    etiqueta: {
      equipo: "Lotus",
      chasis: "79",
      anio: 1978,
      piloto: "Mario Andretti",
      carrera: null
    },
    alias: ["LOTUS 79", "LOTUS79", "JPS", "BLACK BEAUTY"],
    color: "#111111",
    acento: "#c9a227",
    numero: 5,
    ficha: [
      ["Motor", "Ford Cosworth DFV · 3.0 L V8"],
      ["Diseño", "Colin Chapman y su equipo técnico"],
      ["Clave técnica", "Efecto suelo: los costados tenían forma de ala invertida y unas 'polleras' que sellaban contra el piso"],
      ["Patrocinio", "John Player Special"]
    ],
    pilotos: [
      { nombre: "Mario Andretti", numero: 5, resultado: "Campeón del mundo · 64 pts · 6 victorias" },
      { nombre: "Ronnie Peterson", numero: 6, resultado: "2.º · murió tras el accidente de Monza" }
    ],
    temporada: {
      carreras: 16,
      victorias: 8,
      poles: null,
      constructores: "1.º",
      pilotos: "Andretti campeón (único título)"
    },
    titulos: ["Campeonato de Pilotos 1978 — Mario Andretti", "Campeonato de Constructores 1978 — Lotus"],
    carreraModelo: null,
    importancia: [
      "El primer auto que aprovechó a fondo el efecto suelo: el aire que pasaba por debajo lo chupaba contra el piso.",
      "Los rivales lo copiaron enseguida: cambió el diseño de los autos para siempre.",
      "Último título de Lotus."
    ],
    curiosidades: [
      "Le decían 'Black Beauty' (la belleza negra).",
      "Andretti aseguró el título en Monza el mismo día del accidente en la largada que le costó la vida a su compañero Ronnie Peterson.",
      "Andretti es el último estadounidense campeón del mundo de F1."
    ],
    relato: "Este auto descubrió un secreto: el aire que pasa por debajo puede pegarte al piso. Es el Lotus 79, la Belleza Negra. Colin Chapman le dio a los costados forma de ala de avión invertida, con unas polleras que sellaban contra el asfalto. El auto doblaba como si fuera sobre rieles. En 1978 Mario Andretti ganó seis carreras y su compañero Ronnie Peterson llegaba segundo una y otra vez, obedeciendo las órdenes del equipo. Pero el título tuvo un final triste: en Monza, el día en que Andretti se aseguró el campeonato, Peterson tuvo un accidente en la largada y murió al día siguiente. Andretti, nacido en Italia y criado en Estados Unidos, es hasta hoy el último campeón estadounidense.",
    juan: "Mario Andretti es mellizo: su hermano Aldo también corría, y arrancaron juntos de pibes en Estados Unidos. Aldo tuvo un accidente fuerte y dejó de correr, pero la familia siguió: su hijo, John Andretti, también fue piloto.",
    audio: "audio/lotus79-1978-andretti.mp3",
    conexiones: [
      { id: "72d-1972-fittipaldi", texto: "Otro Lotus negro y dorado campeón, seis años antes." },
      { id: "fw07-1979-regazzoni", texto: "Williams copió y mejoró el efecto suelo del 79 para su FW07." }
    ]
  },

  {
    id: "bt46b-1978-lauda",
    etiqueta: {
      equipo: "Brabham",
      chasis: "BT46B",
      anio: 1978,
      piloto: "Niki Lauda",
      carrera: "1978 Sweden Grand Prix"
    },
    alias: ["BT46 B", "BT 46B", "BT46", "FAN CAR", "PARMALAT", "SWEDISH"],
    color: "#c8102e",
    acento: "#f2f2f2",
    numero: 1,
    ficha: [
      ["Motor", "Alfa Romeo · 3.0 L 12 cilindros horizontales"],
      ["Diseño", "Gordon Murray"],
      ["Clave técnica", "Un ventilador enorme atrás: oficialmente enfriaba el motor; en realidad chupaba el aire de abajo del auto y lo pegaba al piso"],
      ["Patrocinio", "Parmalat"]
    ],
    pilotos: [
      { nombre: "Niki Lauda", numero: 1, resultado: "Ganó en Suecia · 4.º en el campeonato con 44 pts" },
      { nombre: "John Watson", numero: 2, resultado: null }
    ],
    temporada: {
      carreras: 16,
      victorias: 2,
      poles: null,
      constructores: "3.º",
      pilotos: "Lauda 4.º"
    },
    titulos: [],
    carreraModelo: {
      nombre: "GP de Suecia 1978 · Anderstorp",
      texto: "La única carrera que corrió. Los rivales protestaron desde que lo vieron: decían que el ventilador tiraba piedras y tierra a los de atrás. Lauda ganó por más de medio minuto. Después de la carrera Bernie Ecclestone, dueño de Brabham, lo retiró él mismo para no pelearse con los otros equipos."
    },
    importancia: [
      "Corrió una sola carrera y la ganó: un récord perfecto.",
      "Era la respuesta de Brabham al efecto suelo del Lotus 79, sin copiarlo.",
      "Nunca lo descalificaron: la victoria quedó en los libros."
    ],
    curiosidades: [
      "Si Lauda aceleraba con el auto parado, el auto bajaba hacia el piso.",
      "Lauda llevaba el número 1 porque era el campeón de 1977."
    ],
    relato: "Una sola carrera, una sola victoria. Este es el Brabham BT46B, el auto aspiradora. ¿Ves el ventilador gigante atrás? Gordon Murray dijo que era para enfriar el motor. Mentira a medias: en realidad chupaba el aire de abajo del auto y lo pegaba al piso, como el Lotus 79, pero a lo bruto. Si Niki Lauda aceleraba parado, el auto se agachaba. Lo estrenaron en Suecia, en 1978. Los rivales protestaron: decían que les tiraba piedras. Lauda los dejó a todos a más de medio minuto. Y después de la carrera pasó algo increíble: Bernie Ecclestone, el dueño de Brabham, lo guardó para siempre, para no pelearse con los demás equipos. Nunca lo descalificaron: corrió una vez y ganó una vez.",
    audio: "audio/bt46b-1978-lauda.mp3",
    conexiones: [
      { id: "lotus79-1978-andretti", texto: "La respuesta al efecto suelo del Lotus 79, ese mismo año." }
    ]
  },

  {
    id: "js11-1979-laffite",
    etiqueta: {
      equipo: "Ligier",
      chasis: "JS11",
      anio: 1979,
      piloto: "Jacques Laffite",
      carrera: null
    },
    alias: ["JS 11", "GITANES"],
    color: "#2f6fc0",
    acento: "#f2f2f2",
    numero: 26,
    ficha: [
      ["Motor", "Ford Cosworth DFV · 3.0 L V8"],
      ["Diseño", "Gérard Ducarouge"],
      ["Clave técnica", "Efecto suelo, como el Lotus 79"],
      ["Patrocinio", "Gitanes (el azul francés)"]
    ],
    pilotos: [
      { nombre: "Jacques Laffite", numero: 26, resultado: "4.º · 36 pts · ganó en Argentina y Brasil" },
      { nombre: "Patrick Depailler", numero: 25, resultado: "Ganó en España" }
    ],
    temporada: {
      carreras: 15,
      victorias: 3,
      poles: null,
      constructores: "3.º",
      pilotos: "Laffite 4.º"
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "Ganó las dos primeras carreras de 1979: Argentina y Brasil.",
      "Laffite ganó el GP de Argentina 1979 en el Autódromo de Buenos Aires, desde la pole.",
      "Fue el mejor año de Ligier: llegó a ser el auto a vencer a principio de temporada."
    ],
    curiosidades: [
      "Ligier usó durante muchos años los números 25 y 26.",
      "Después de las dos primeras carreras, los rivales entendieron el efecto suelo y Ligier no volvió a ganar ese año con Laffite.",
      "Guy Ligier, el dueño, había sido jugador de rugby y piloto."
    ],
    relato: "Enero de 1979, Autódromo de Buenos Aires. La primera carrera del año la gana este auto: el Ligier JS11, azul francés, con Jacques Laffite. Largó desde la pole, y dos semanas después volvió a ganar en Brasil. Parecía imbatible. ¿El secreto? El efecto suelo, el mismo truco con el que el Lotus 79 había arrasado el año anterior… pero mejor hecho. El diseñador era Gérard Ducarouge, el mismo que años después haría el Lotus de la primera victoria de Ayrton Senna. Su compañero, Patrick Depailler, ganó en España. Pero los rivales aprendieron rápido, y Laffite no volvió a ganar ese año. Terminó cuarto. Igual, su nombre quedó para siempre en la historia del Gran Premio de Argentina.",
    audio: "audio/js11-1979-laffite.mp3",
    conexiones: [
      { id: "97t-1985-senna", texto: "Mismo diseñador, Gérard Ducarouge: el Lotus de la primera victoria de Senna." }
    ]
  },

  {
    id: "177-1979-giacomelli",
    etiqueta: {
      equipo: "Alfa Romeo",
      chasis: "177",
      anio: 1979,
      piloto: "Bruno Giacomelli",
      carrera: null
    },
    alias: ["ALFA 177", "ALFA ROMEO 177"],
    color: "#c8102e",
    acento: "#f2f2f2",
    numero: null,
    ficha: [
      ["Motor", "Alfa Romeo · 3.0 L 12 cilindros horizontales"],
      ["Diseño", "Carlo Chiti (Autodelta, el área de carreras de Alfa)"],
      ["Debut", "GP de Bélgica 1979, en Zolder"]
    ],
    pilotos: [
      { nombre: "Bruno Giacomelli", numero: null, resultado: "Debutó con el auto en Bélgica 1979" }
    ],
    temporada: {
      carreras: 15,
      victorias: 0,
      poles: null,
      constructores: null,
      pilotos: null
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "Marca la vuelta de Alfa Romeo como equipo propio después de casi 30 años.",
      "Alfa Romeo había ganado los dos primeros Mundiales de la historia, en 1950 (Farina) y 1951 (Fangio).",
      "Fue un auto de transición: casi enseguida lo reemplazó el 179."
    ],
    curiosidades: [
      "El número 177 viene de que el proyecto empezó en 1977.",
      "Antes de volver con equipo propio, Alfa le daba los motores a Brabham: el mismo motor del 'auto aspiradora' de Lauda.",
      "Giacomelli después hizo la única pole de su carrera con Alfa Romeo, en Estados Unidos 1980."
    ],
    relato: "Los dos primeros Mundiales de la Fórmula 1, en 1950 y 1951, se ganaron con Alfa Romeo: el segundo, con Juan Manuel Fangio. Después se fue. Casi treinta años más tarde volvió con equipo propio, y este fue el auto del regreso: el Alfa Romeo 177. Lo llamaron así porque el proyecto había arrancado en 1977. El motor era un doce cilindros chato, el mismo que Alfa le daba a Brabham, el del famoso auto aspiradora de Niki Lauda. Debutó en Bélgica en 1979, manejado por un joven italiano, Bruno Giacomelli. No ganó nada: era pesado y llegó tarde. Pero abrió la puerta a la segunda etapa de Alfa Romeo en la Fórmula 1.",
    audio: "audio/177-1979-giacomelli.mp3",
    conexiones: [
      { id: "bt46b-1978-lauda", texto: "Mismo motor Alfa Romeo de 12 cilindros que el Brabham 'aspiradora'." },
      { id: "w196-1955-fangio", texto: "Fangio fue campeón con Alfa Romeo en 1951, antes de sus títulos con Mercedes." }
    ]
  },

  {
    id: "fw07-1979-regazzoni",
    etiqueta: {
      equipo: "Williams",
      chasis: "FW07",
      anio: 1979,
      piloto: "Clay Regazzoni",
      carrera: null
    },
    alias: ["FW 07", "FW7", "SAUDIA"],
    color: "#f2f2f2",
    acento: "#0b6b3a",
    numero: 28,
    ficha: [
      ["Motor", "Ford Cosworth DFV · 3.0 L V8"],
      ["Diseño", "Patrick Head"],
      ["Clave técnica", "Efecto suelo copiado del Lotus 79… y mejorado"],
      ["Patrocinio", "Saudia (aerolínea saudí)"]
    ],
    pilotos: [
      { nombre: "Clay Regazzoni", numero: 28, resultado: "5.º · 29 pts · ganó en Gran Bretaña" },
      { nombre: "Alan Jones", numero: 27, resultado: "3.º · 40 pts · 4 victorias" }
    ],
    temporada: {
      carreras: 15,
      victorias: 5,
      poles: null,
      constructores: "2.º",
      pilotos: "Jones 3.º · Regazzoni 5.º"
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "Le dio a Williams su primera victoria: Silverstone 1979, con Regazzoni.",
      "Su evolución, el FW07B, ganó los dos campeonatos de 1980 con Alan Jones.",
      "Empezó la historia del equipo Williams, que después ganaría nueve títulos de constructores."
    ],
    curiosidades: [
      "En Silverstone iba ganando Jones, pero se le rompió la bomba de agua y Regazzoni heredó la victoria.",
      "Regazzoni tenía casi 40 años: era el veterano del equipo.",
      "Con el FW07C Carlos Reutemann peleó el título de 1981 hasta la última carrera."
    ],
    relato: "Acá empieza la historia de Williams. Frank Williams llevaba años con equipos chicos y sin plata. En 1979 su ingeniero, Patrick Head, miró el Lotus 79, entendió el efecto suelo y lo hizo mejor: el FW07. En el Gran Premio de Gran Bretaña, en Silverstone, iba ganando Alan Jones, pero se le rompió la bomba de agua. Y el que heredó la punta fue el veterano del equipo, el suizo Clay Regazzoni, con casi cuarenta años. Primera victoria de Williams, en casa. Desde ahí, Jones ganó cuatro carreras más ese año y fue campeón en 1980 con este mismo auto mejorado. Y en 1981, Carlos Reutemann peleó el título hasta la última carrera con su última versión.",
    audio: "audio/fw07-1979-regazzoni.mp3",
    conexiones: [
      { id: "lotus79-1978-andretti", texto: "El auto que Williams estudió y mejoró." },
      { id: "bt49-1981-piquet", texto: "En 1981 el FW07C de Reutemann perdió el título contra el Brabham de Piquet." }
    ]
  },

  {
    id: "rs10-1979-jabouille",
    etiqueta: {
      equipo: "Renault",
      chasis: "RS10",
      anio: 1979,
      piloto: "Jean-Pierre Jabouille",
      carrera: null
    },
    alias: ["RS 10", "RE10", "TURBO"],
    color: "#f2c21b",
    acento: "#111111",
    numero: 15,
    ficha: [
      ["Motor", "Renault Gordini EF1 · 1.5 L V6 turbo"],
      ["Neumáticos", "Michelin"],
      ["Patrocinio", "Elf"],
      ["Apodo", "'La tetera amarilla', por el humo que largaba cuando se rompía"]
    ],
    pilotos: [
      { nombre: "Jean-Pierre Jabouille", numero: 15, resultado: "Ganó en Francia · la primera victoria de un motor turbo" },
      { nombre: "René Arnoux", numero: 16, resultado: "3.º en Francia tras el duelo con Villeneuve" }
    ],
    temporada: {
      carreras: 15,
      victorias: 1,
      poles: null,
      constructores: null,
      pilotos: null
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "Primera victoria de un motor turbo en la F1: GP de Francia 1979, en Dijon.",
      "Una victoria 100 % francesa: piloto, auto, motor, nafta y gomas de Francia.",
      "Abrió la era turbo: pocos años después todos los equipos usaban turbo."
    ],
    curiosidades: [
      "Ken Tyrrell se burlaba del Renault diciéndole 'la tetera amarilla' porque se rompía y largaba humo blanco.",
      "Esa misma carrera tuvo la pelea por el segundo puesto más famosa de la historia: Gilles Villeneuve contra René Arnoux, tocándose rueda contra rueda.",
      "Jabouille también fue ingeniero y participó en el desarrollo del auto."
    ],
    relato: "Al principio se reían de él. Le decían la tetera amarilla, porque cada vez que el motor se rompía largaba una nube de humo blanco. Era el Renault de Fórmula 1, el primero con motor turbo: apenas un litro y medio, contra los tres litros de los demás. En 1979, en el Gran Premio de Francia, Jean-Pierre Jabouille largó desde la pole con este auto, el RS10, y ganó. Primera victoria de un turbo en la historia. Victoria cien por ciento francesa: auto, piloto, motor, nafta y gomas. Y casi nadie miró al ganador, porque detrás pasó algo legendario: Gilles Villeneuve y René Arnoux se tocaron rueda contra rueda durante las últimas vueltas peleando por el segundo puesto. Pocos años después, todos los equipos usaban turbo.",
    audio: "audio/rs10-1979-jabouille.mp3",
    conexiones: [
      { id: "r25-2005-alonso", texto: "Veintiséis años después, Renault fue campeón con Alonso." }
    ]
  },

  {
    id: "a1b-1979-patrese",
    etiqueta: {
      equipo: "Arrows",
      chasis: "A1B",
      anio: 1979,
      piloto: "Riccardo Patrese",
      carrera: null
    },
    alias: ["A1 B", "A 1B", "A1", "WARSTEINER"],
    color: "#e8742a",
    acento: "#f2f2f2",
    numero: 29,
    ficha: [
      ["Motor", "Ford Cosworth DFV · 3.0 L V8"],
      ["Equipo", "Fundado en 1977 por ex integrantes de Shadow"],
      ["Nombre", "Arrows sale de las iniciales de los fundadores"]
    ],
    pilotos: [
      { nombre: "Riccardo Patrese", numero: 29, resultado: null },
      { nombre: "Jochen Mass", numero: 30, resultado: null }
    ],
    temporada: {
      carreras: 15,
      victorias: 0,
      poles: null,
      constructores: null,
      pilotos: null
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "Arrows corrió más de 380 Grandes Premios entre 1978 y 2002 y nunca ganó uno.",
      "Patrese llegó a ser el piloto con más carreras de la historia (256), récord que después superó Barrichello.",
      "El equipo nació en medio de un juicio: Shadow lo acusó de copiar su auto, y por eso Arrows tuvo que hacer el A1 de cero."
    ],
    curiosidades: [
      "El primer Arrows lo diseñaron en pocas semanas, y en su segunda carrera Patrese estuvo a punto de ganar en Sudáfrica 1978.",
      "Patrese ganó seis carreras en su carrera, pero ninguna con Arrows."
    ],
    relato: "Más de trescientas ochenta carreras y ni una sola victoria. Ese es el récord triste de Arrows, el equipo de este auto, el A1B. El nombre viene de las iniciales de sus fundadores, que se habían ido de otro equipo, Shadow. Shadow los demandó por copiar su auto y ganó el juicio, así que tuvieron que hacer este de cero. Su piloto era un italiano joven y rapidísimo, Riccardo Patrese. Patrese corrió diecisiete temporadas, ganó seis carreras con otros equipos y llegó a ser el piloto con más Grandes Premios de la historia: doscientos cincuenta y seis. Lo superó después un brasileño que también está en tu repisa: Rubens Barrichello.",
    audio: "audio/a1b-1979-patrese.mp3",
    conexiones: [
      { id: "f2004-2004-barrichello", texto: "Barrichello le sacó a Patrese el récord de más carreras corridas." }
    ]
  },

  {
    id: "bt49-1981-piquet",
    etiqueta: {
      equipo: "Brabham",
      chasis: "BT49",
      anio: 1981,
      piloto: "Nelson Piquet",
      carrera: null
    },
    alias: ["BT 49", "BT49C", "PARMALAT"],
    color: "#1c3f94",
    acento: "#f2f2f2",
    numero: 5,
    ficha: [
      ["Motor", "Ford Cosworth DFV · 3.0 L V8"],
      ["Diseño", "Gordon Murray"],
      ["Truco", "Suspensión hidroneumática: en boxes medía la altura mínima reglamentaria; en pista bajaba y quedaba pegado al piso"],
      ["Patrocinio", "Parmalat"]
    ],
    pilotos: [
      { nombre: "Nelson Piquet", numero: 5, resultado: "Campeón del mundo · 50 pts · 3 victorias" }
    ],
    temporada: {
      carreras: 15,
      victorias: 3,
      poles: null,
      constructores: "2.º",
      pilotos: "Piquet campeón (1.er título)"
    },
    titulos: ["Campeonato de Pilotos 1981 — Nelson Piquet"],
    carreraModelo: null,
    importancia: [
      "Le dio a Piquet el primero de sus tres títulos.",
      "Le ganó el campeonato a Carlos Reutemann por un punto, en la última carrera.",
      "Su truco de la suspensión obligó a reescribir el reglamento."
    ],
    curiosidades: [
      "Piquet ganó con este auto el GP de Argentina 1981, en Buenos Aires.",
      "En la final, en un estacionamiento de un hotel de Las Vegas, Reutemann largó desde la pole y terminó 8.º. Piquet llegó 5.º, deshidratado y casi desmayado.",
      "La FIA exigía 6 cm de altura al piso; el BT49 los cumplía solo cuando estaba quieto."
    ],
    relato: "Esta historia nos duele un poco a los argentinos. 1981, última carrera en Las Vegas, en un circuito armado en el estacionamiento de un hotel. Carlos Reutemann llega primero en el campeonato, un punto adelante de Nelson Piquet y su Brabham BT49. Reutemann larga desde la pole… y algo le pasa: termina octavo, sin puntos. Piquet, deshidratado y casi desmayado por el calor, llega quinto. Le alcanza: campeón por un punto. Este auto tenía su truco: una suspensión que en boxes respetaba la altura mínima, pero en pista bajaba y lo pegaba al piso. Lo había diseñado Gordon Murray. Y ese mismo año, con este auto, Piquet había ganado el Gran Premio de Argentina.",
    juan: "Piquet en realidad se apellida Souto Maior. Corría con el apellido de la madre para que el padre no se enterara, porque el padre quería que fuera tenista. Y la verdad, al tenis jugaba bastante bien.",
    audio: "audio/bt49-1981-piquet.mp3",
    conexiones: [
      { id: "fw07-1979-regazzoni", texto: "El Williams FW07 era el auto de Reutemann en esa pelea de 1981." },
      { id: "bt52b-1983-piquet", texto: "Dos años después, Piquet volvió a ser campeón con Brabham, ahora con turbo." }
    ]
  },

  {
    id: "011-1982-alboreto",
    etiqueta: {
      equipo: "Tyrrell",
      chasis: "011",
      anio: 1982,
      piloto: "Michele Alboreto",
      carrera: null
    },
    alias: ["TYRRELL 011"],
    color: "#f2f2f2",
    acento: "#1c3f94",
    numero: null,
    ficha: [
      ["Motor", "Ford Cosworth DFV · 3.0 L V8 atmosférico"],
      ["Diseño", "Maurice Philippe"],
      ["Época", "Uno de los últimos autos sin turbo capaces de ganar"]
    ],
    pilotos: [
      { nombre: "Michele Alboreto", numero: null, resultado: "Ganó en Las Vegas, la última carrera del año: su primera victoria" }
    ],
    temporada: {
      carreras: 16,
      victorias: 1,
      poles: null,
      constructores: null,
      pilotos: null
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "Le dio a Alboreto su primera victoria, en Las Vegas 1982.",
      "En Detroit 1983, con este mismo modelo, Alboreto le dio al motor Cosworth DFV su victoria número 155: la última de un motor que había ganado desde 1967.",
      "Fue la última victoria de Tyrrell en la F1."
    ],
    curiosidades: [
      "1982 tuvo 11 ganadores distintos en 16 carreras: récord de la historia. Alboreto fue el último de ellos.",
      "Enzo Ferrari lo vio y lo fichó: Alboreto corrió en Ferrari desde 1984.",
      "Murió en 2001 probando un auto de Le Mans en Alemania."
    ],
    relato: "1982 fue el año más loco de la Fórmula 1: once ganadores distintos en dieciséis carreras. Y el último de ellos lo consiguió con este auto, el Tyrrell 011. Michele Alboreto, un italiano joven y elegante, ganó la última carrera del año, en Las Vegas: su primera victoria. Enzo Ferrari se fijó en él y lo llevó a Ferrari. Pero este auto tiene otro récord escondido: al año siguiente, en Detroit, Alboreto volvió a ganar con él. Fue la victoria número ciento cincuenta y cinco del motor Ford Cosworth, uno de los más ganadores de la historia, que había debutado en 1967. Y fue la última, porque llegaban los turbo. También fue la última victoria de Tyrrell.",
    audio: "audio/011-1982-alboreto.mp3",
    conexiones: [
      { id: "006-1973-stewart", texto: "Del mismo equipo que fue campeón con Stewart." }
    ]
  },

  {
    id: "126c2-1982-andretti",
    etiqueta: {
      equipo: "Ferrari",
      chasis: "126 C2",
      anio: 1982,
      piloto: "Mario Andretti",
      carrera: "1982 Italian Grand Prix"
    },
    alias: ["126C2", "126 C 2", "126"],
    color: "#c8102e",
    acento: "#f2f2f2",
    numero: 28,
    ficha: [
      ["Motor", "Ferrari · 1.5 L V6 turbo"],
      ["Chasis", "Harvey Postlethwaite: el primer monocasco de panal de abeja de Ferrari"],
      ["Neumáticos", "Goodyear"]
    ],
    pilotos: [
      { nombre: "Mario Andretti", numero: 28, resultado: "Pole y 3.º en Monza, reemplazando a Pironi" },
      { nombre: "Didier Pironi", numero: 28, resultado: "2.º en el campeonato aunque se perdió las últimas 5 carreras" },
      { nombre: "Patrick Tambay", numero: 27, resultado: "Ganó en Alemania" }
    ],
    temporada: {
      carreras: 16,
      victorias: 3,
      poles: null,
      constructores: "1.º",
      pilotos: "Pironi 2.º"
    },
    titulos: ["Campeonato de Constructores 1982 — Ferrari"],
    carreraModelo: {
      nombre: "GP de Italia 1982 · Monza",
      texto: "Con Gilles Villeneuve muerto en Zolder y Didier Pironi lesionado en Hockenheim, Ferrari llamó a Mario Andretti, que tenía 42 años y no corría en F1 desde hacía meses. En Monza hizo la pole ante una multitud de tifosi enloquecidos y terminó 3.º. Ayudó a que Ferrari ganara el campeonato de constructores."
    },
    importancia: [
      "Ganó el campeonato de constructores en el año más triste de Ferrari.",
      "Fue el primer campeonato de constructores ganado con un motor turbo.",
      "La pole de Andretti en Monza fue la última de su carrera."
    ],
    curiosidades: [
      "Andretti había debutado con Ferrari en 1971 ganando en Sudáfrica: volvió 11 años después.",
      "Llevaba el 28 de Pironi. El 27, el número de Villeneuve, lo usó Patrick Tambay.",
      "Fue una de las últimas carreras de Andretti en la F1."
    ],
    relato: "1982 fue el año más triste de Ferrari. Gilles Villeneuve murió en Bélgica. Didier Pironi, que iba primero en el campeonato, tuvo un accidente gravísimo en Alemania y nunca volvió a correr. Para el Gran Premio de Italia, en Monza, Ferrari llamó a un viejo conocido: Mario Andretti, campeón del mundo, de cuarenta y dos años, que estaba corriendo en Estados Unidos. Se subió a esta Ferrari 126 C2, con motor turbo y el número veintiocho de Pironi… y en casa de Ferrari hizo la pole. Los tifosi enloquecieron. En carrera terminó tercero. Y con esos puntos, Ferrari ganó el campeonato de constructores, en un año en que perdió a sus dos pilotos.",
    audio: "audio/126c2-1982-andretti.mp3",
    conexiones: [
      { id: "lotus79-1978-andretti", texto: "Andretti había sido campeón cuatro años antes con el Lotus 79." }
    ]
  },

  {
    id: "bt52b-1983-piquet",
    etiqueta: {
      equipo: "Brabham",
      chasis: "BT52B",
      anio: 1983,
      piloto: "Nelson Piquet",
      carrera: null
    },
    alias: ["BT52 B", "BT 52B", "BT52", "BMW", "PARMALAT"],
    color: "#1c3f94",
    acento: "#f2f2f2",
    numero: 5,
    ficha: [
      ["Motor", "BMW M12/13 · 1.5 L 4 cilindros turbo"],
      ["Diseño", "Gordon Murray"],
      ["Forma", "Punta de flecha: casi todo el peso atrás, porque ese año se prohibió el efecto suelo"],
      ["Patrocinio", "Parmalat"]
    ],
    pilotos: [
      { nombre: "Nelson Piquet", numero: 5, resultado: "Campeón del mundo · 59 pts · 3 victorias" },
      { nombre: "Riccardo Patrese", numero: 6, resultado: "Ganó en Sudáfrica" }
    ],
    temporada: {
      carreras: 15,
      victorias: 4,
      poles: null,
      constructores: "3.º",
      pilotos: "Piquet campeón (2.º título)"
    },
    titulos: ["Campeonato de Pilotos 1983 — Nelson Piquet"],
    carreraModelo: null,
    importancia: [
      "Primer campeón del mundo con motor turbo.",
      "El motor BMW era un 4 cilindros, derivado de un motor de calle, que en clasificación pasaba los 1.000 caballos.",
      "Piquet le ganó el título a Alain Prost en la última carrera, en Sudáfrica."
    ],
    curiosidades: [
      "Brabham fue de los primeros en hacer paradas a cargar nafta en plena carrera: salía liviano y rápido, y paraba a mitad de carrera.",
      "Su compañero era Riccardo Patrese, que también está en tu repisa con el Arrows."
    ],
    relato: "Un motor de cuatro cilindros, como el de un auto de calle… con más de mil caballos. Ese era el corazón de este Brabham BT52, el primer auto campeón del mundo con motor turbo. En 1983 se prohibió el efecto suelo, y Gordon Murray dibujó esta punta de flecha con casi todo el peso atrás. Y tenía una estrategia nueva: salía con poca nafta, liviano y rapidísimo, y paraba a mitad de carrera a cargar. Nelson Piquet llegó a la última carrera, en Sudáfrica, dos puntos detrás de Alain Prost. Prost abandonó, Piquet terminó tercero, y fue campeón por segunda vez. Era la segunda vez también que Brabham lo hacía campeón, después del BT49.",
    audio: "audio/bt52b-1983-piquet.mp3",
    conexiones: [
      { id: "bt49-1981-piquet", texto: "El Brabham con el que Piquet había sido campeón dos años antes." },
      { id: "a1b-1979-patrese", texto: "Patrese, su compañero en 1983, cuando empezaba en Arrows." }
    ]
  },

  {
    id: "97t-1985-senna",
    etiqueta: {
      equipo: "Lotus",
      chasis: "97T",
      anio: 1985,
      piloto: "Ayrton Senna",
      carrera: null
    },
    alias: ["97 T", "LOTUS 97T", "JPS"],
    color: "#111111",
    acento: "#c9a227",
    numero: 12,
    ficha: [
      ["Motor", "Renault EF15 · 1.5 L V6 turbo"],
      ["Diseño", "Gérard Ducarouge"],
      ["Neumáticos", "Goodyear"],
      ["Patrocinio", "John Player Special"]
    ],
    pilotos: [
      { nombre: "Ayrton Senna", numero: 12, resultado: "4.º · 38 pts · 2 victorias (Portugal y Bélgica)" },
      { nombre: "Elio de Angelis", numero: 11, resultado: "Ganó en San Marino" }
    ],
    temporada: {
      carreras: 16,
      victorias: 3,
      poles: null,
      constructores: "4.º",
      pilotos: "Senna 4.º"
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "Primera victoria y primera pole de Ayrton Senna: Portugal 1985.",
      "Con este auto Senna empezó a ser el rey de las clasificaciones: hizo 7 poles ese año.",
      "Volvió el negro y dorado de Lotus, el de los títulos de Fittipaldi y Andretti."
    ],
    curiosidades: [
      "En Estoril llovió a cántaros: Senna llegó con más de un minuto de ventaja y le sacó una vuelta a todos menos al segundo, Michele Alboreto.",
      "Al cruzar la meta levantó los dos brazos fuera del auto, todavía a toda velocidad.",
      "Senna había corrido su primer año en Toleman, que también está en tu repisa."
    ],
    relato: "Estoril, Portugal, 21 de abril de 1985. Llueve tanto que los autos parecen lanchas. En la pole, por primera vez, está un brasileño de veinticinco años con este Lotus negro y dorado: Ayrton Senna. Sale primero y no lo ve nadie más. Mientras los demás trompean, él va cada vez más rápido. Llega con más de un minuto de ventaja y le saca una vuelta a todos, menos al segundo. Primera pole y primera victoria de Senna en la Fórmula 1, en su segundo año. Ese día el mundo entendió que con lluvia había un piloto distinto a todos. Este Lotus 97T es, para muchos, donde empezó la leyenda.",
    juan: "El casco de Ayrton, amarillo, verde y azul como la bandera de Brasil, se lo pintaba Sid Mosca, el mismo que le hacía los cascos a Emerson Fittipaldi. Y Ayrton nunca lo quiso cambiar: con los años le retocaron los tonos, pero el diseño fue siempre el mismo.",
    audio: "audio/97t-1985-senna.mp3",
    conexiones: [
      { id: "tg184-1984-senna", texto: "El auto de su primer año, con el que casi gana en Mónaco bajo la lluvia." },
      { id: "011-1982-alboreto", texto: "Alboreto fue el único que Senna no dobló ese día en Estoril." }
    ]
  },

  {
    id: "b194-1994-schumacher",
    etiqueta: {
      equipo: "Benetton",
      chasis: "B194",
      anio: 1994,
      piloto: "Michael Schumacher",
      carrera: null
    },
    alias: ["B 194", "MILD SEVEN"],
    color: "#2f8fd8",
    acento: "#f2f2f2",
    numero: 5,
    ficha: [
      ["Motor", "Ford Zetec-R · 3.5 L V8"],
      ["Diseño", "Rory Byrne · Ross Brawn (director técnico)"],
      ["Neumáticos", "Goodyear"],
      ["Patrocinio", "Mild Seven"]
    ],
    pilotos: [
      { nombre: "Michael Schumacher", numero: 5, resultado: "Campeón del mundo · 92 pts · 8 victorias" }
    ],
    temporada: {
      carreras: 16,
      victorias: 8,
      poles: null,
      constructores: "2.º",
      pilotos: "Schumacher campeón (1.er título)"
    },
    titulos: ["Campeonato de Pilotos 1994 — Michael Schumacher"],
    carreraModelo: null,
    importancia: [
      "Primer título de Michael Schumacher, el primero de siete.",
      "El primer título para Alemania en la F1.",
      "Lo hicieron Byrne y Brawn, el mismo dúo que después armó la Ferrari imbatible de los 2000."
    ],
    curiosidades: [
      "Fue la temporada de la muerte de Senna en Imola.",
      "Lo descalificaron en Gran Bretaña por ignorar una bandera negra y en Bélgica por el desgaste de la tabla de abajo del auto, y además lo suspendieron dos carreras.",
      "En la última carrera, en Australia, chocó con Damon Hill y los dos abandonaron: Schumacher campeón por un punto."
    ],
    relato: "1994 fue un año durísimo para la Fórmula 1. En Imola murió Ayrton Senna, y el campeonato quedó para un alemán de veinticinco años con este Benetton azul: Michael Schumacher. Ganó seis de las primeras siete carreras. Pero el año se llenó de polémicas: lo descalificaron dos veces y lo suspendieron dos carreras más. Damon Hill, con Williams, se acercó hasta llegar a la última carrera, en Australia, un punto atrás. Schumacher iba adelante, tocó el muro, y cuando Hill intentó pasarlo, chocaron. Los dos afuera. Schumacher, campeón por un punto. Fue su primer título. El equipo que hizo este auto, con Ross Brawn y Rory Byrne, después se fue con él a Ferrari.",
    audio: "audio/b194-1994-schumacher.mp3",
    conexiones: [
      { id: "f2002-2002-schumacher", texto: "Brawn y Byrne, los de este auto, armaron después la Ferrari de Schumacher." },
      { id: "r25-2005-alonso", texto: "El mismo equipo de Enstone, años después como Renault, fue campeón con Alonso." }
    ]
  },

  {
    id: "fw19-1997-villeneuve",
    etiqueta: {
      equipo: "Williams",
      chasis: "FW19",
      anio: 1997,
      piloto: "Jacques Villeneuve",
      carrera: null
    },
    alias: ["FW 19", "ROTHMANS"],
    color: "#1c2f6b",
    acento: "#f2f2f2",
    numero: 3,
    ficha: [
      ["Motor", "Renault RS9 · 3.0 L V10"],
      ["Diseño", "Adrian Newey · Patrick Head"],
      ["Neumáticos", "Goodyear"],
      ["Patrocinio", "Rothmans"]
    ],
    pilotos: [
      { nombre: "Jacques Villeneuve", numero: 3, resultado: "Campeón del mundo · 81 pts · 7 victorias" },
      { nombre: "Heinz-Harald Frentzen", numero: 4, resultado: "2.º en el campeonato (tras la exclusión de Schumacher) · ganó en San Marino" }
    ],
    temporada: {
      carreras: 17,
      victorias: 8,
      poles: null,
      constructores: "1.º",
      pilotos: "Villeneuve campeón (único título)"
    },
    titulos: ["Campeonato de Pilotos 1997 — Jacques Villeneuve", "Campeonato de Constructores 1997 — Williams"],
    carreraModelo: null,
    importancia: [
      "Último título de pilotos y de constructores de Williams hasta hoy.",
      "Villeneuve, hijo del ídolo Gilles Villeneuve, fue campeón en su segundo año.",
      "Último auto campeón con motor Renault hasta el R25 de Alonso."
    ],
    curiosidades: [
      "Villeneuve ganó con este auto el GP de Argentina 1997, en Buenos Aires.",
      "En la final, en Jerez, Schumacher le tiró el auto encima. Villeneuve siguió y terminó 3.º: campeón. A Schumacher lo excluyeron de todo el campeonato.",
      "Villeneuve ya había ganado las 500 Millas de Indianápolis antes de llegar a la F1."
    ],
    relato: "Jerez, España, última carrera de 1997. Michael Schumacher va primero en el campeonato, un punto adelante de Jacques Villeneuve y este Williams FW19. Faltando veinte vueltas, Villeneuve se le tira por adentro en una curva… y Schumacher le cierra la puerta a propósito. Chocan. Pero el que queda varado en la grava es Schumacher; Villeneuve sigue, con el auto tocado, y termina tercero. Campeón del mundo. Después la FIA hizo algo inédito: le borró a Schumacher todos los puntos del año. Villeneuve era hijo de Gilles, el ídolo de Ferrari, y ya había ganado Indianápolis. Ese año, además, ganó el Gran Premio de Argentina. Fue el último título de Williams.",
    audio: "audio/fw19-1997-villeneuve.mp3",
    conexiones: [
      { id: "fw15c-1993-prost", texto: "Otro Williams-Renault campeón, cuatro años antes, con Prost." },
      { id: "jordan199-1999-frentzen", texto: "Frentzen, su compañero ese año, brilló después en Jordan." }
    ]
  },

  {
    id: "f399-1999-salo",
    etiqueta: {
      equipo: "Ferrari",
      chasis: "F399",
      anio: 1999,
      piloto: "Mika Salo",
      carrera: null
    },
    alias: ["F 399", "F399 SALO"],
    color: "#d40000",
    acento: "#f2f2f2",
    numero: 3,
    ficha: [
      ["Motor", "Ferrari Tipo 048 · 3.0 L V10"],
      ["Diseño", "Rory Byrne · Ross Brawn (director técnico)"],
      ["Neumáticos", "Bridgestone"]
    ],
    pilotos: [
      { nombre: "Mika Salo", numero: 3, resultado: "Reemplazó a Schumacher 6 carreras · 2.º en Alemania y 3.º en Italia" },
      { nombre: "Michael Schumacher", numero: 3, resultado: "Se quebró la pierna en Silverstone" },
      { nombre: "Eddie Irvine", numero: 4, resultado: "2.º en el campeonato · 4 victorias" }
    ],
    temporada: {
      carreras: 16,
      victorias: 6,
      poles: null,
      constructores: "1.º",
      pilotos: "Irvine 2.º, a dos puntos de Häkkinen"
    },
    titulos: ["Campeonato de Constructores 1999 — Ferrari"],
    carreraModelo: null,
    importancia: [
      "Le dio a Ferrari el campeonato de constructores después de 16 años sin ganarlo.",
      "Salo, un reemplazo de emergencia, fue clave para Irvine en la pelea por el título.",
      "Fue el paso previo a la racha de Schumacher y Ferrari entre 2000 y 2004."
    ],
    curiosidades: [
      "En Alemania, Salo iba primero y le dejó la victoria a Irvine por orden del equipo: llegó 2.º.",
      "Schumacher se rompió la pierna en la primera vuelta de Silverstone y se perdió seis carreras.",
      "Salo nunca ganó una carrera de F1: Hockenheim 1999 fue lo más cerca que estuvo."
    ],
    relato: "Un reemplazo que casi hace historia. En 1999 Michael Schumacher se quebró la pierna en Silverstone, y Ferrari llamó a un finlandés que estaba sin equipo: Mika Salo. En su segunda carrera con este auto, la F399, en Alemania, Salo iba primero. Iba a ganar. Pero desde el box le pidieron que dejara pasar a su compañero, Eddie Irvine, que peleaba el campeonato. Salo obedeció y llegó segundo. Nunca ganó una carrera en la Fórmula 1: esa fue la más cerca. Irvine perdió el título por dos puntos contra Mika Häkkinen, el otro finlandés. Pero con la ayuda de Salo, Ferrari ganó el campeonato de constructores, después de dieciséis años.",
    audio: "audio/f399-1999-salo.mp3",
    conexiones: [
      { id: "mp4-14-1999-hakkinen", texto: "El McLaren de Häkkinen, el otro Mika, que ganó el título de pilotos ese año." }
    ]
  },

  {
    id: "jordan199-1999-frentzen",
    etiqueta: {
      equipo: "Jordan",
      chasis: "199",
      anio: 1999,
      piloto: "Heinz-Harald Frentzen",
      carrera: null
    },
    alias: ["JORDAN 199", "JORDAN199", "BENSON HEDGES"],
    color: "#f2c21b",
    acento: "#111111",
    numero: 8,
    ficha: [
      ["Motor", "Mugen-Honda · 3.0 L V10"],
      ["Diseño", "Mike Gascoyne"],
      ["Neumáticos", "Bridgestone"],
      ["Patrocinio", "Benson & Hedges (el amarillo)"]
    ],
    pilotos: [
      { nombre: "Heinz-Harald Frentzen", numero: 8, resultado: "3.º · 54 pts · ganó en Francia e Italia" },
      { nombre: "Damon Hill", numero: 7, resultado: "Su última temporada en la F1" }
    ],
    temporada: {
      carreras: 16,
      victorias: 2,
      poles: null,
      constructores: "3.º",
      pilotos: "Frentzen 3.º"
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "La mejor temporada de la historia de Jordan: 3.º entre los constructores.",
      "Frentzen peleó el campeonato hasta casi el final, con un equipo chico.",
      "Ganó en Magny-Cours con lluvia y en Monza."
    ],
    curiosidades: [
      "Williams había despedido a Frentzen al final de 1998. Un año después terminó adelante de los dos Williams.",
      "En el GP de Europa 1999 iba primero y con chances de título, y se le apagó el auto saliendo de boxes.",
      "Eddie Jordan, el dueño, era un irlandés famoso por su carisma y por tocar la batería."
    ],
    relato: "El mejor año de un equipo chico. Jordan era una escudería irlandesa, alegre y sin el presupuesto de los grandes. En 1999 contrató a un alemán que Williams había despedido: Heinz-Harald Frentzen. Y con este auto amarillo, el Jordan 199, Frentzen tuvo la temporada de su vida. Ganó en Francia, bajo la lluvia, y en Monza. A falta de tres carreras, peleaba el campeonato con Häkkinen e Irvine. En el Nürburgring iba primero… y el auto se le apagó al salir de boxes. Ahí se terminó el sueño. Igual terminó tercero en el campeonato, adelante de los Williams que lo habían echado, y Jordan fue tercero entre los constructores. Nunca más llegaron tan alto.",
    audio: "audio/jordan199-1999-frentzen.mp3",
    conexiones: [
      { id: "fw19-1997-villeneuve", texto: "El Williams del que Frentzen fue compañero de Villeneuve." }
    ]
  },

  {
    id: "mp4-14-1999-hakkinen",
    etiqueta: {
      equipo: "McLaren",
      chasis: "MP4/14",
      anio: 1999,
      piloto: "Mika Hakkinen",
      carrera: null
    },
    alias: ["MP 4/14", "MP4 14", "MP4-14", "MP414", "WEST"],
    color: "#c0c4c8",
    acento: "#111111",
    numero: 1,
    ficha: [
      ["Motor", "Mercedes-Benz FO110H · 3.0 L V10"],
      ["Diseño", "Adrian Newey"],
      ["Neumáticos", "Bridgestone"],
      ["Patrocinio", "West"]
    ],
    pilotos: [
      { nombre: "Mika Hakkinen", numero: 1, resultado: "Campeón del mundo · 76 pts · 5 victorias" },
      { nombre: "David Coulthard", numero: 2, resultado: "4.º · 2 victorias" }
    ],
    temporada: {
      carreras: 16,
      victorias: 7,
      poles: null,
      constructores: "2.º",
      pilotos: "Häkkinen campeón (2.º título)"
    },
    titulos: ["Campeonato de Pilotos 1999 — Mika Häkkinen"],
    carreraModelo: null,
    importancia: [
      "Le dio a Häkkinen su segundo título seguido.",
      "Era el auto más rápido del año, pero también el que más se rompía: por eso el título se definió en la última carrera.",
      "Otro diseño de Adrian Newey campeón."
    ],
    curiosidades: [
      "En Monza, Häkkinen iba primero, se equivocó de cambio y trompeó. Las cámaras lo encontraron llorando entre los árboles.",
      "Definió el título ganando la última carrera, en Japón, contra Eddie Irvine."
    ],
    relato: "Un campeón que lloró en público. Mika Häkkinen, el finlandés volador, manejaba este McLaren plateado, el MP4/14, el auto más rápido de 1999 y también el que más se rompía. En Monza iba primero, puso mal un cambio y trompeó. Se bajó, caminó hasta los árboles, y las cámaras lo encontraron llorando, solo, agachado entre las plantas. Todo el mundo lo vio. Parecía que el título se le escapaba contra Eddie Irvine, de Ferrari. Pero llegó a la última carrera, en Japón, ganó, y fue campeón por segunda vez seguida. Michael Schumacher, su gran rival, dijo muchas veces que Häkkinen fue el piloto que más respetó.",
    audio: "audio/mp4-14-1999-hakkinen.mp3",
    conexiones: [
      { id: "f399-1999-salo", texto: "La Ferrari con la que Irvine y Salo pelearon ese año." },
      { id: "mp4-8-1993-senna", texto: "En 1993 Häkkinen era el piloto de pruebas de McLaren, detrás de Senna." }
    ]
  },

  {
    id: "f2001-2001-schumacher",
    etiqueta: {
      equipo: "Ferrari",
      chasis: "F2001",
      anio: 2001,
      piloto: "Michael Schumacher",
      carrera: "2001 Italian Grand Prix"
    },
    alias: ["F 2001", "TROMPA NEGRA"],
    color: "#d40000",
    acento: "#111111",
    numero: 1,
    ficha: [
      ["Motor", "Ferrari Tipo 050 · 3.0 L V10"],
      ["Diseño", "Rory Byrne · Ross Brawn (director técnico)"],
      ["Neumáticos", "Bridgestone"],
      ["En Monza", "Sin publicidad y con la trompa negra, de luto"]
    ],
    pilotos: [
      { nombre: "Michael Schumacher", numero: 1, resultado: "Campeón del mundo · 123 pts · 9 victorias" },
      { nombre: "Rubens Barrichello", numero: 2, resultado: "3.º · 2.º en Monza" }
    ],
    temporada: {
      carreras: 17,
      victorias: 9,
      poles: null,
      constructores: "1.º",
      pilotos: "Schumacher campeón (4.º título)"
    },
    titulos: ["Campeonato de Pilotos 2001 — Michael Schumacher", "Campeonato de Constructores 2001 — Ferrari"],
    carreraModelo: {
      nombre: "GP de Italia 2001 · Monza",
      texto: "Cinco días después de los atentados del 11 de septiembre en Estados Unidos, Ferrari corrió en casa sin publicidad y con la trompa pintada de negro. El día anterior, Alex Zanardi había tenido un accidente gravísimo en Alemania. Ganó Juan Pablo Montoya, su primera victoria; Barrichello llegó 2.º y Schumacher, ya campeón, 4.º."
    },
    importancia: [
      "Schumacher se aseguró el título en Hungría, con cuatro carreras por delante.",
      "Con este auto igualó y superó las 51 victorias de Alain Prost: se convirtió en el piloto más ganador de la historia.",
      "Segundo título seguido de Schumacher con Ferrari."
    ],
    curiosidades: [
      "La trompa negra de tu modelo es única: Ferrari la usó solo en Monza 2001.",
      "Schumacher ganó en Hungría, igualó a Prost, y en la carrera siguiente, en Bélgica, lo superó.",
      "Ganó con 58 puntos de ventaja sobre el segundo."
    ],
    relato: "Mirá la trompa: es negra. Esta Ferrari, la F2001, corrió así una sola vez. Fue en Monza, en septiembre de 2001, cinco días después de los atentados a las Torres Gemelas. Ferrari decidió correr en su casa sin ninguna publicidad y con la trompa pintada de negro, de luto. Michael Schumacher ya era campeón: lo había asegurado en Hungría, ganando, el mismo día que igualó las cincuenta y una victorias de Alain Prost, el récord de la historia. Una carrera después lo superó. Pero ese domingo en Monza no tenía ganas de festejar. Ganó Juan Pablo Montoya, el primero de su carrera, y Schumacher terminó cuarto. Por eso tu modelo es tan especial.",
    juan: "Michael aprendió a manejar en el kartódromo de Kerpen, donde el padre trabajaba de encargado. La familia no tenía plata, así que corría con karts usados y con las gomas que tiraban otros pilotos.",
    audio: "audio/f2001-2001-schumacher.mp3",
    conexiones: [
      { id: "f2002-2002-schumacher", texto: "Su sucesora, la F2002, fue todavía más dominante." }
    ]
  },

  {
    id: "c23-2004-massa",
    etiqueta: {
      equipo: "Sauber",
      chasis: "C23",
      anio: 2004,
      piloto: "Felipe Massa",
      carrera: null
    },
    alias: ["C 23", "SAUBER C23", "PETRONAS"],
    color: "#1b3c74",
    acento: "#00a19c",
    numero: 12,
    ficha: [
      ["Motor", "Petronas 04A · 3.0 L V10 (un Ferrari con otro nombre)"],
      ["Neumáticos", "Bridgestone"],
      ["Patrocinio", "Petronas"]
    ],
    pilotos: [
      { nombre: "Felipe Massa", numero: 12, resultado: "12 pts · su mejor resultado fue 4.º en Bélgica" },
      { nombre: "Giancarlo Fisichella", numero: 11, resultado: null }
    ],
    temporada: {
      carreras: 18,
      victorias: 0,
      poles: null,
      constructores: "6.º",
      pilotos: null
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "Era casi una Ferrari F2003-GA pintada de azul: Sauber tenía un acuerdo técnico con Ferrari.",
      "Fue el paso de Massa antes de llegar a Ferrari en 2006.",
      "Sauber, un equipo suizo chico, terminó 6.º entre los constructores."
    ],
    curiosidades: [
      "Massa había debutado en Sauber en 2002, pasó 2003 como piloto de pruebas de Ferrari y volvió a Sauber en 2004.",
      "Años después Sauber se convirtió en Audi."
    ],
    relato: "¿Una Ferrari azul? Casi. Este es el Sauber C23 de 2004. Sauber era un equipo suizo chico que tenía un acuerdo con Ferrari: le compraba el motor, y este auto se parecía muchísimo a la Ferrari campeona del año anterior. Su piloto era un brasileño joven, Felipe Massa. Había debutado en Sauber en 2002, rápido pero desprolijo; Ferrari lo tuvo un año aprendiendo como piloto de pruebas, al lado de Michael Schumacher, y lo devolvió a Sauber más maduro. En 2004 su mejor resultado fue un cuarto puesto en Bélgica. Dos años después saltó a Ferrari, ganó once carreras, y en 2008 fue campeón del mundo… durante treinta y ocho segundos.",
    juan: "En Brasil a Massa le dicen Felipinho, algo así como Felipito, y así le siguen diciendo. Es de San Pablo, igual que Ayrton y que Rubens: tres brasileños de la misma ciudad que llegaron a manejar una Ferrari o un McLaren.",
    audio: "audio/c23-2004-massa.mp3",
    conexiones: [
      { id: "mp4-23-2008-hamilton", texto: "En 2008 Massa perdió el título por un punto contra Hamilton y este McLaren." },
      { id: "f2004-2004-barrichello", texto: "La Ferrari de ese mismo año, con otro brasileño al volante." }
    ]
  },

  {
    id: "r24-2004-trulli",
    etiqueta: {
      equipo: "Renault",
      chasis: "R24",
      anio: 2004,
      piloto: "Jarno Trulli",
      carrera: null
    },
    alias: ["R 24", "MILD SEVEN"],
    color: "#2f8fd8",
    acento: "#f2c21b",
    numero: 8,
    ficha: [
      ["Motor", "Renault RS24 · 3.0 L V10"],
      ["Neumáticos", "Michelin"],
      ["Patrocinio", "Mild Seven"]
    ],
    pilotos: [
      { nombre: "Jarno Trulli", numero: 8, resultado: "Ganó en Mónaco desde la pole: su única victoria" },
      { nombre: "Fernando Alonso", numero: 7, resultado: "4.º en el campeonato" }
    ],
    temporada: {
      carreras: 18,
      victorias: 1,
      poles: null,
      constructores: "3.º",
      pilotos: null
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "Le ganó a la Ferrari imbatible de 2004 en Mónaco: una de las solo tres carreras que Ferrari no ganó ese año.",
      "Única victoria de Jarno Trulli en la F1.",
      "Fue el auto anterior al R25, campeón con Alonso."
    ],
    curiosidades: [
      "Trulli era famoso por clasificar rapidísimo: hizo la pole en Mónaco y aguantó toda la carrera.",
      "Ese mismo año se peleó con el equipo y se fue a Toyota antes de que terminara la temporada.",
      "Su compañero era Fernando Alonso, que al año siguiente fue campeón."
    ],
    relato: "En 2004 la Ferrari de Schumacher ganó quince de dieciocho carreras. Una de las tres que se le escaparon fue Mónaco, y la ganó este auto, el Renault R24. Su piloto era Jarno Trulli, un italiano conocido por ser rapidísimo en clasificación. En las calles de Montecarlo, donde casi no se puede pasar, eso vale oro: Trulli hizo la pole y aguantó adelante toda la carrera. Fue la única victoria de su vida en la Fórmula 1. Su compañero era un español joven, Fernando Alonso. A Trulli las cosas con el equipo terminaron mal, y se fue antes de fin de año. Al siguiente, con el R25, el que salió campeón fue Alonso.",
    juan: "Trulli tiene viñedos en Italia y hace su propio vino. Y en el paddock había una broma: el tren Trulli, porque cuando iba adelante, aunque fuera más lento, armaba una fila de autos atrás que no lo podían pasar.",
    audio: "audio/r24-2004-trulli.mp3",
    conexiones: [
      { id: "r25-2005-alonso", texto: "El sucesor: el R25 con el que Alonso fue campeón en 2005." }
    ]
  },

  {
    id: "ra106-2006-button",
    etiqueta: {
      equipo: "Honda",
      chasis: "RA106",
      anio: 2006,
      piloto: "Jenson Button",
      carrera: null
    },
    alias: ["RA 106", "HONDA RA106"],
    color: "#f2f2f2",
    acento: "#c8102e",
    numero: 12,
    ficha: [
      ["Motor", "Honda RA806E · 2.4 L V8"],
      ["Neumáticos", "Michelin"],
      ["Equipo", "Ex BAR, comprado por Honda a fines de 2005"]
    ],
    pilotos: [
      { nombre: "Jenson Button", numero: 12, resultado: "6.º · 56 pts · ganó en Hungría" },
      { nombre: "Rubens Barrichello", numero: 11, resultado: null }
    ],
    temporada: {
      carreras: 18,
      victorias: 1,
      poles: null,
      constructores: "4.º",
      pilotos: "Button 6.º"
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "Primera victoria de Jenson Button, en su carrera número 113.",
      "Primera victoria de Honda como equipo propio desde Monza 1967, con John Surtees.",
      "Es el antecesor directo del Brawn campeón de 2009."
    ],
    curiosidades: [
      "En Hungría Button largó 14.º por una penalización por cambiar el motor, y ganó bajo una lluvia que iba y venía.",
      "Fue la única victoria de Honda con equipo propio en esa etapa.",
      "Tres años después, el mismo equipo y el mismo piloto fueron campeones con el nombre Brawn GP."
    ],
    relato: "Ciento doce carreras sin ganar. Eso cargaba Jenson Button cuando llegó a Hungría en 2006 con este Honda RA106. Encima largaba decimocuarto, castigado por cambiar el motor. Pero llovió, paró, volvió a llover, y Button, que manejaba suave como pocos sobre piso mojado, fue pasando a todos. Ganó. Su primera victoria. Y para Honda fue algo histórico: la primera victoria con equipo propio desde 1967, cuando John Surtees ganó en Monza con el RA300. Treinta y nueve años después. Lo mejor llegó más tarde: Honda se fue a fines de 2008, el equipo pasó a llamarse Brawn, y en 2009 Button fue campeón del mundo.",
    audio: "audio/ra106-2006-button.mp3",
    conexiones: [
      { id: "ra300-1967-surtees", texto: "La victoria anterior de Honda como equipo propio: Monza 1967." },
      { id: "bgp001-2009-button", texto: "Tres años después, el mismo equipo y el mismo piloto fueron campeones." }
    ]
  },

  {
    id: "f2007-2007-raikkonen",
    etiqueta: {
      equipo: "Ferrari",
      chasis: "F2007",
      anio: 2007,
      piloto: "Kimi Raikkonen",
      carrera: "2007 Formula 1 Australian Grand Prix"
    },
    alias: ["F 2007", "AUSTRALIAN"],
    color: "#d40000",
    acento: "#f2f2f2",
    numero: 6,
    ficha: [
      ["Motor", "Ferrari Tipo 056 · 2.4 L V8"],
      ["Neumáticos", "Bridgestone"],
      ["Época", "Primer año de Ferrari sin Michael Schumacher desde 1995"]
    ],
    pilotos: [
      { nombre: "Kimi Raikkonen", numero: 6, resultado: "Campeón del mundo · 110 pts · 6 victorias" },
      { nombre: "Felipe Massa", numero: 5, resultado: "4.º · 3 victorias" }
    ],
    temporada: {
      carreras: 17,
      victorias: 9,
      poles: null,
      constructores: "1.º",
      pilotos: "Räikkönen campeón (único título)"
    },
    titulos: ["Campeonato de Pilotos 2007 — Kimi Räikkönen", "Campeonato de Constructores 2007 — Ferrari"],
    carreraModelo: {
      nombre: "GP de Australia 2007 · Albert Park",
      texto: "La primera carrera de Ferrari sin Schumacher. Räikkönen, recién llegado, hizo la pole, ganó y marcó la vuelta más rápida. Nadie ganaba en su debut con Ferrari desde Nigel Mansell en 1989."
    },
    importancia: [
      "Räikkönen fue campeón por un punto sobre Hamilton y Alonso, después de estar 17 puntos atrás con dos carreras por delante.",
      "Le dio a Ferrari el título de pilotos en su primer año sin Schumacher.",
      "Ganó el campeonato en la última carrera, en Brasil."
    ],
    curiosidades: [
      "Fue el año del 'Spygate': McLaren fue excluida del campeonato de constructores por tener información secreta de Ferrari.",
      "A Räikkönen le dicen 'Iceman' (el hombre de hielo) por lo poco que se le mueve la cara, gane o pierda.",
      "Durante muchos años fue el último campeón del mundo con Ferrari."
    ],
    relato: "La primera carrera de Ferrari sin Michael Schumacher. Australia, 2007. El elegido para reemplazarlo era un finlandés que casi no hablaba: Kimi Räikkönen, el Iceman. Se subió a este auto, la F2007, hizo la pole, ganó la carrera y marcó la vuelta más rápida. Todo en su debut. Pero lo mejor llegó al final del año. A dos carreras del cierre, Räikkönen estaba diecisiete puntos detrás de Lewis Hamilton, que peleaba con su compañero Fernando Alonso. Hamilton tuvo problemas, Alonso no alcanzó, y Kimi ganó las dos últimas. Campeón por un punto. ¿Y cómo lo festejó? Como festejaba todo el Iceman: casi sin mover la cara.",
    juan: "Ese mismo año Kimi corrió una carrera de motos de nieve en Finlandia con nombre falso: se anotó como James Hunt. Era fanático de Hunt, el campeón del 76, que tampoco se tomaba nada demasiado en serio.",
    audio: "audio/f2007-2007-raikkonen.mp3",
    conexiones: [
      { id: "mp4-14-1999-hakkinen", texto: "El otro finlandés campeón, ocho años antes." }
    ]
  },

  {
    id: "f108-2008-kubica",
    etiqueta: {
      equipo: "BMW Sauber",
      chasis: "F1.08",
      anio: 2008,
      piloto: "Robert Kubica",
      carrera: null
    },
    alias: ["F1 08", "F108", "F1.08", "BMW"],
    color: "#f2f2f2",
    acento: "#1c4fa0",
    numero: 4,
    ficha: [
      ["Motor", "BMW P86/8 · 2.4 L V8"],
      ["Neumáticos", "Bridgestone"],
      ["Equipo", "BMW compró Sauber en 2006"]
    ],
    pilotos: [
      { nombre: "Robert Kubica", numero: 4, resultado: "4.º · 75 pts · ganó en Canadá" },
      { nombre: "Nick Heidfeld", numero: 3, resultado: "2.º en Canadá" }
    ],
    temporada: {
      carreras: 18,
      victorias: 1,
      poles: null,
      constructores: "3.º",
      pilotos: "Kubica 4.º"
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "La única victoria de BMW Sauber y de Robert Kubica: Canadá 2008, con un 1-2.",
      "Kubica, el primer polaco de la F1, llegó a ir primero en el campeonato.",
      "Kubica hizo con este auto la única pole de su carrera, en Bahréin."
    ],
    curiosidades: [
      "Ganó en Montreal un año después de tener ahí mismo un accidente tremendo, del que salió casi sin lesiones.",
      "En esa carrera Hamilton chocó a Räikkönen en la salida de boxes, con el semáforo en rojo.",
      "Kubica volvió a la F1 en 2019 después de un accidente de rally que casi le cuesta el brazo."
    ],
    relato: "Montreal, 2007. Robert Kubica choca a doscientos treinta kilómetros por hora y el auto se desarma en pedazos. Parece imposible que haya sobrevivido. Se perdió una sola carrera. Y un año después, en el mismo circuito, ganó con este auto, el BMW Sauber F1.08. Su compañero, Nick Heidfeld, llegó segundo: un uno-dos para BMW. Ese día, además, Lewis Hamilton chocó a Kimi Räikkönen en la salida de boxes, con el semáforo en rojo. Kubica quedó primero en el campeonato. Fue la única victoria del equipo y del primer piloto polaco de la Fórmula 1. Años después, un accidente de rally casi le cuesta el brazo… y aun así volvió a correr en la Fórmula 1.",
    audio: "audio/f108-2008-kubica.mp3"
  },

  {
    id: "mp4-23-2008-hamilton",
    etiqueta: {
      equipo: "McLaren",
      chasis: "MP4/23",
      anio: 2008,
      piloto: "Lewis Hamilton",
      carrera: null
    },
    alias: ["MP 4/23", "MP4 23", "MP4-23", "MP423", "VODAFONE"],
    color: "#c0c4c8",
    acento: "#d40000",
    numero: 22,
    ficha: [
      ["Motor", "Mercedes-Benz FO108V · 2.4 L V8"],
      ["Neumáticos", "Bridgestone"],
      ["Patrocinio", "Vodafone"]
    ],
    pilotos: [
      { nombre: "Lewis Hamilton", numero: 22, resultado: "Campeón del mundo · 98 pts · 5 victorias" },
      { nombre: "Heikki Kovalainen", numero: 23, resultado: "Ganó en Hungría" }
    ],
    temporada: {
      carreras: 18,
      victorias: 6,
      poles: null,
      constructores: "2.º",
      pilotos: "Hamilton campeón (1.er título)"
    },
    titulos: ["Campeonato de Pilotos 2008 — Lewis Hamilton"],
    carreraModelo: null,
    importancia: [
      "Primer título de Lewis Hamilton, el primero de siete.",
      "Hamilton fue el campeón más joven de la historia hasta ese momento (23 años).",
      "El final de campeonato más dramático de la historia: se definió en la última curva de la última carrera."
    ],
    curiosidades: [
      "En Brasil, Massa ganó la carrera y fue campeón durante unos 38 segundos, hasta que Hamilton pasó a Timo Glock en la última curva y quedó 5.º.",
      "En Silverstone, bajo la lluvia, Hamilton ganó por más de un minuto.",
      "Hamilton ganó el título por un solo punto: 98 a 97."
    ],
    relato: "Interlagos, 2 de noviembre de 2008. Última vuelta del campeonato. Felipe Massa cruza la meta primero, en su casa, y su familia festeja en el box de Ferrari: es campeón. Lewis Hamilton, con este McLaren, va sexto, y así pierde el título. Pero empieza a llover, y adelante, Timo Glock, con gomas de seco, casi no puede avanzar. En la última curva de la última vuelta, Hamilton lo pasa. Quinto. Campeón por un punto. Massa fue campeón del mundo durante treinta y ocho segundos. Hamilton tenía veintitrés años y fue el campeón más joven de la historia hasta ese momento. Era el primero de sus siete títulos.",
    juan: "Hamilton, con diez años, lo encaró a Ron Dennis en una entrega de premios y le dijo que algún día iba a manejar para McLaren. Ron Dennis le escribió que lo llamara en nueve años. No hizo falta esperar tanto: a los trece ya estaba en el programa de jóvenes de McLaren.",
    audio: "audio/mp4-23-2008-hamilton.mp3",
    conexiones: [
      { id: "c23-2004-massa", texto: "Massa, el que perdió por un punto, empezó en Sauber." }
    ]
  },

  {
    id: "str3-2008-vettel",
    etiqueta: {
      equipo: "Toro Rosso",
      chasis: "STR3",
      anio: 2008,
      piloto: "Sebastian Vettel",
      carrera: "2008 Formula 1 Italian Grand Prix"
    },
    alias: ["STR 3", "TORO ROSSO", "TOROROSSO", "ITALIAN"],
    color: "#1b2a6b",
    acento: "#c8102e",
    numero: 15,
    ficha: [
      ["Motor", "Ferrari Tipo 056 · 2.4 L V8"],
      ["Diseño", "Basado en el Red Bull RB4 de Adrian Newey"],
      ["Neumáticos", "Bridgestone"],
      ["Equipo", "Ex Minardi, de Faenza (Italia): Red Bull lo compró en 2005"]
    ],
    pilotos: [
      { nombre: "Sebastian Vettel", numero: 15, resultado: "8.º · 35 pts · ganó en Italia" },
      { nombre: "Sébastien Bourdais", numero: 14, resultado: null }
    ],
    temporada: {
      carreras: 18,
      victorias: 1,
      poles: null,
      constructores: "6.º",
      pilotos: "Vettel 8.º"
    },
    titulos: [],
    carreraModelo: {
      nombre: "GP de Italia 2008 · Monza",
      texto: "Bajo la lluvia, Vettel hizo la pole y ganó de punta a punta, con 21 años: el ganador más joven de la historia en ese momento. Fue la primera victoria de Toro Rosso, el equipo chico de Red Bull, antes que el equipo grande."
    },
    importancia: [
      "Primera victoria de Sebastian Vettel, que después ganaría cuatro títulos.",
      "El equipo 'chico' de Red Bull ganó antes que el grande.",
      "El equipo de Faenza, como Minardi, nunca había ganado nada."
    ],
    curiosidades: [
      "Vettel tenía 21 años: fue el ganador y el poleman más joven de la historia hasta ese momento.",
      "Ganó en Italia, con un equipo italiano y motor Ferrari."
    ],
    relato: "Monza, 2008. Llueve. El equipo más chico de la grilla, Toro Rosso, el hermano menor de Red Bull, que antes se llamaba Minardi y nunca había ganado nada. Y en la pole, un alemán de veintiún años con cara de nene: Sebastian Vettel. Al día siguiente, con este auto, el STR3, salió primero y nadie lo pudo alcanzar. Ganó de punta a punta. Fue el ganador más joven de la historia en ese momento, y el equipo chico de Red Bull ganó antes que el equipo grande. En Italia, con un auto italiano y motor Ferrari, los tifosi lo festejaron como propio. Al año siguiente Vettel pasó a Red Bull, y de ahí salieron cuatro títulos seguidos.",
    audio: "audio/str3-2008-vettel.mp3",
    conexiones: [
      { id: "rb9-2013-vettel", texto: "Cinco años después, ya en Red Bull, Vettel ganó su cuarto título." }
    ]
  },

  {
    id: "f138-2013-alonso",
    etiqueta: {
      equipo: "Ferrari",
      chasis: "F138",
      anio: 2013,
      piloto: "Fernando Alonso",
      carrera: null
    },
    alias: ["F 138", "F138 ALONSO"],
    color: "#d40000",
    acento: "#f2f2f2",
    numero: 3,
    ficha: [
      ["Motor", "Ferrari Tipo 056 · 2.4 L V8"],
      ["Neumáticos", "Pirelli"],
      ["Nombre", "F + 13 (por 2013) + 8 (por el V8)"]
    ],
    pilotos: [
      { nombre: "Fernando Alonso", numero: 3, resultado: "2.º · 242 pts · ganó en China y España" },
      { nombre: "Felipe Massa", numero: 4, resultado: null }
    ],
    temporada: {
      carreras: 19,
      victorias: 2,
      poles: null,
      constructores: "3.º",
      pilotos: "Alonso 2.º"
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "Último año de los motores V8: desde 2014 llegaron los turbo híbridos.",
      "Alonso fue subcampeón detrás del Red Bull de Vettel, otra vez.",
      "El GP de España 2013, en casa, fue la última victoria de Alonso con Ferrari."
    ],
    curiosidades: [
      "Alonso salió segundo en el campeonato tres veces con Ferrari (2010, 2012 y 2013), las tres detrás de Vettel.",
      "En Barcelona ganó largando 5.º, delante de su público.",
      "Fue el último año de Massa en Ferrari."
    ],
    relato: "Este auto es la historia de un casi. Fernando Alonso, bicampeón del mundo, llegó a Ferrari para ganar el tercer título. Y casi lo logra varias veces, siempre contra el mismo rival: Sebastian Vettel y su Red Bull. 2013 fue otra vez así. Con esta Ferrari, la F138, Alonso ganó en China y después en España, en Barcelona, delante de su gente, largando quinto. Fue una fiesta. Pero en la segunda mitad del año Vettel ganó todo, y Alonso terminó segundo por tercera vez en cuatro años. Esa victoria en España fue su última con Ferrari. Y este fue el último año de los motores V8: al siguiente llegaban los híbridos.",
    audio: "audio/f138-2013-alonso.mp3",
    conexiones: [
      { id: "rb9-2013-vettel", texto: "El auto que le ganó el campeonato ese año." },
      { id: "r25-2005-alonso", texto: "El Renault de su primer título, en 2005." }
    ]
  },

  {
    id: "rb9-2013-vettel",
    etiqueta: {
      equipo: "Red Bull",
      chasis: "RB9",
      anio: 2013,
      piloto: "Sebastian Vettel",
      carrera: null
    },
    alias: ["RB 9", "REDBULL", "INFINITI"],
    color: "#1b2a6b",
    acento: "#e8002d",
    numero: 1,
    ficha: [
      ["Motor", "Renault RS27 · 2.4 L V8"],
      ["Diseño", "Adrian Newey"],
      ["Neumáticos", "Pirelli"]
    ],
    pilotos: [
      { nombre: "Sebastian Vettel", numero: 1, resultado: "Campeón del mundo · 397 pts · 13 victorias" },
      { nombre: "Mark Webber", numero: 2, resultado: "3.º · su último año en la F1" }
    ],
    temporada: {
      carreras: 19,
      victorias: 13,
      poles: null,
      constructores: "1.º",
      pilotos: "Vettel campeón (4.º título seguido)"
    },
    titulos: ["Campeonato de Pilotos 2013 — Sebastian Vettel", "Campeonato de Constructores 2013 — Red Bull Racing"],
    carreraModelo: null,
    importancia: [
      "Cuarto título seguido de Vettel y de Red Bull.",
      "Vettel ganó las últimas 9 carreras seguidas: récord hasta Verstappen en 2023.",
      "Cerró la era de los motores V8."
    ],
    curiosidades: [
      "En Malasia, el equipo le ordenó a Vettel no pasar a Webber con el mensaje 'Multi 21'. Vettel lo pasó igual.",
      "Vettel le pone nombre a cada auto: este se llamaba 'Hungry Heidi'.",
      "Después de cada victoria, Vettel levantaba el dedo índice: el público terminó silbándolo de tanto que ganaba."
    ],
    relato: "Nueve carreras seguidas. Ese fue el final de temporada de Sebastian Vettel en 2013 con este Red Bull, el RB9. Desde Bélgica hasta Brasil no perdió nunca. En total ganó trece carreras y su cuarto título seguido, con apenas veintiséis años. El auto era otra obra de Adrian Newey, y fue el último de la era de los motores V8. Pero no todo fue fiesta: en Malasia el equipo le ordenó por radio no pasar a su compañero Mark Webber, con un mensaje en código: Multi veintiuno. Vettel lo pasó igual. Webber se retiró a fin de año. Y otro detalle: Vettel le ponía nombre a sus autos. A este le decía Hungry Heidi.",
    audio: "audio/rb9-2013-vettel.mp3",
    conexiones: [
      { id: "str3-2008-vettel", texto: "La primera victoria de Vettel, con el equipo chico de Red Bull." },
      { id: "rb18-2022-verstappen", texto: "Otro Red Bull de Newey: el que inició la era Verstappen." }
    ]
  },

  {
    id: "fw36-2014-bottas",
    etiqueta: {
      equipo: "Williams",
      chasis: "FW36",
      anio: 2014,
      piloto: "Valtteri Bottas",
      carrera: null
    },
    alias: ["FW 36", "MARTINI"],
    color: "#f2f2f2",
    acento: "#1c3f94",
    numero: 77,
    ficha: [
      ["Motor", "Mercedes PU106A Hybrid · 1.6 L V6 turbo híbrido"],
      ["Neumáticos", "Pirelli"],
      ["Patrocinio", "Martini: volvieron las rayas clásicas"]
    ],
    pilotos: [
      { nombre: "Valtteri Bottas", numero: 77, resultado: "4.º · 186 pts · 6 podios" },
      { nombre: "Felipe Massa", numero: 19, resultado: "7.º · pole en Austria" }
    ],
    temporada: {
      carreras: 19,
      victorias: 0,
      poles: 1,
      constructores: "3.º",
      pilotos: "Bottas 4.º"
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "Williams volvió a pelear arriba: 3.º entre los constructores después de años malos.",
      "Con el motor Mercedes, el mejor de la nueva era híbrida, fue el segundo mejor auto en muchas carreras.",
      "Bottas consiguió sus primeros podios y llamó la atención de Mercedes."
    ],
    curiosidades: [
      "En Austria los dos Williams coparon la primera fila: Massa en la pole y Bottas al lado.",
      "Volvieron las rayas de Martini, que habían estado en Brabham y Lotus en los 70.",
      "Bottas eligió el 77 cuando se pudo empezar a elegir número fijo, justamente en 2014."
    ],
    relato: "Las rayas de Martini volvieron a la Fórmula 1, y en un Williams. Este es el FW36 de 2014, el primer año de los motores híbridos. Williams venía de temporadas malísimas, pero tomó una gran decisión: comprarle el motor a Mercedes, que era el mejor de todos. En Austria, los dos Williams coparon la primera fila: Felipe Massa en la pole y un finlandés callado al lado, Valtteri Bottas. Bottas sumó seis podios y terminó cuarto en el campeonato, solo detrás de los dos Mercedes y de Daniel Ricciardo. Mercedes lo anotó en la libreta: más tarde lo contrató para reemplazar al campeón Nico Rosberg, como compañero de Lewis Hamilton.",
    audio: "audio/fw36-2014-bottas.mp3",
    conexiones: [
      { id: "w05-2014-hamilton", texto: "El Mercedes de ese año, con el mismo motor." },
      { id: "bt44b-1975-pace", texto: "Las rayas de Martini ya habían estado en el Brabham de Pace y Reutemann." }
    ]
  },

  {
    id: "w05-2014-hamilton",
    etiqueta: {
      equipo: "Mercedes",
      chasis: "F1 W05 Hybrid",
      anio: 2014,
      piloto: "Lewis Hamilton",
      carrera: null
    },
    alias: ["W05", "W 05", "F1 W05", "W05 HYBRID", "PETRONAS"],
    color: "#c0c4c8",
    acento: "#00d2be",
    numero: 44,
    ficha: [
      ["Motor", "Mercedes PU106A Hybrid · 1.6 L V6 turbo híbrido"],
      ["Neumáticos", "Pirelli"],
      ["Clave técnica", "Turbo partido: la turbina de un lado del motor y el compresor del otro"]
    ],
    pilotos: [
      { nombre: "Lewis Hamilton", numero: 44, resultado: "Campeón del mundo · 384 pts · 11 victorias" },
      { nombre: "Nico Rosberg", numero: 6, resultado: "2.º · 317 pts · 5 victorias" }
    ],
    temporada: {
      carreras: 19,
      victorias: 16,
      poles: 18,
      constructores: "1.º",
      pilotos: "Hamilton campeón (2.º título)"
    },
    titulos: ["Campeonato de Pilotos 2014 — Lewis Hamilton", "Campeonato de Constructores 2014 — Mercedes"],
    carreraModelo: null,
    importancia: [
      "Primer auto de la era híbrida y el comienzo del dominio de Mercedes: ganó 16 de 19 carreras.",
      "Le dio a Hamilton su segundo título, el primero con Mercedes.",
      "Mercedes ganó ocho campeonatos de constructores seguidos, de 2014 a 2021."
    ],
    curiosidades: [
      "La pelea entre Hamilton y Rosberg, que se conocían desde chicos en el karting, se volvió cada vez más dura: en Bélgica se tocaron.",
      "La última carrera, en Abu Dhabi, daba doble puntaje: la única vez que se usó esa regla.",
      "Su secreto era el turbo partido en dos, con un eje que pasaba por el medio del motor."
    ],
    relato: "Acá empezó el imperio. En 2014 la Fórmula 1 cambió los motores: llegaron los V6 turbo híbridos, con baterías y energía recuperada. Mercedes se preparó como nadie, y el resultado fue este auto, el W05. Ganó dieciséis de las diecinueve carreras. El secreto estaba escondido adentro: el turbo partido en dos, la turbina de un lado del motor y el compresor del otro. Como nadie más podía seguirlos, la pelea fue en casa: Lewis Hamilton contra Nico Rosberg, amigos de la infancia en el karting que terminaron sin hablarse. Hamilton ganó once carreras y su segundo título. Mercedes siguió ganando el campeonato de constructores ocho años seguidos.",
    audio: "audio/w05-2014-hamilton.mp3",
    conexiones: [
      { id: "w11-2020-hamilton", texto: "Seis años después, el W11 fue el punto más alto de esta era." },
      { id: "bgp001-2009-button", texto: "El equipo nació del Brawn campeón de 2009." }
    ]
  },

  {
    id: "sf15t-2015-vettel",
    etiqueta: {
      equipo: "Ferrari",
      chasis: "SF15-T",
      anio: 2015,
      piloto: "Sebastian Vettel",
      carrera: "2015 Formula 1 Malaysia Grand Prix"
    },
    alias: ["SF15 T", "SF15T", "SF15", "SF 15 T", "MALAYSIA"],
    color: "#d40000",
    acento: "#f2f2f2",
    numero: 5,
    ficha: [
      ["Motor", "Ferrari 059/4 · 1.6 L V6 turbo híbrido"],
      ["Neumáticos", "Pirelli"],
      ["Nombre", "SF por Scuderia Ferrari, 15 por el año y T por turbo"]
    ],
    pilotos: [
      { nombre: "Sebastian Vettel", numero: 5, resultado: "3.º · 278 pts · 3 victorias" },
      { nombre: "Kimi Raikkonen", numero: 7, resultado: "4.º" }
    ],
    temporada: {
      carreras: 19,
      victorias: 3,
      poles: null,
      constructores: "2.º",
      pilotos: "Vettel 3.º"
    },
    titulos: [],
    carreraModelo: {
      nombre: "GP de Malasia 2015 · Sepang",
      texto: "Segunda carrera de Vettel con Ferrari. Con un calor tremendo, Ferrari cuidaba mejor las gomas que Mercedes: cuando salió el auto de seguridad, los Mercedes pararon y Vettel siguió en pista. Ganó, cortando una racha de dominio de Mercedes, y por la radio le agradeció al equipo en italiano."
    },
    importancia: [
      "Primera victoria de Vettel con Ferrari, en su segunda carrera con el equipo.",
      "Primera victoria de Ferrari en casi dos años: desde España 2013.",
      "Le ganó a Mercedes en la temporada en que parecía imbatible."
    ],
    curiosidades: [
      "Vettel había ido a Ferrari como su ídolo Michael Schumacher.",
      "Ese año ganó también en Hungría y en Singapur.",
      "En la radio, después de ganar, gritó 'Grazie ragazzi!'."
    ],
    relato: "Sepang, Malasia, 2015. Sebastian Vettel corre su segunda carrera con Ferrari, el equipo de su ídolo, Michael Schumacher. Mercedes viene ganando todo, y nadie espera nada. Pero ese día hace un calor tremendo, y esta Ferrari, la SF15-T, cuida las gomas mejor que nadie. Sale el auto de seguridad, los Mercedes paran en boxes, y Vettel sigue en pista. Queda primero, y ya no lo alcanzan. Primera victoria de Vettel con Ferrari, y la primera de Ferrari en casi dos años. Por la radio, emocionado, le gritó al equipo en italiano: grazie ragazzi, gracias muchachos. Ese año ganó tres carreras y terminó tercero.",
    audio: "audio/sf15t-2015-vettel.mp3",
    conexiones: [
      { id: "rb9-2013-vettel", texto: "El Red Bull de su último título, dos años antes." },
      { id: "sf70h-2017-vettel", texto: "Dos años después, con la SF70H, peleó el título." }
    ]
  },

  {
    id: "sf70h-2017-vettel",
    etiqueta: {
      equipo: "Ferrari",
      chasis: "SF70H",
      anio: 2017,
      piloto: "Sebastian Vettel",
      carrera: null
    },
    alias: ["SF70 H", "SF 70H", "SF70"],
    color: "#d40000",
    acento: "#f2f2f2",
    numero: 5,
    ficha: [
      ["Motor", "Ferrari 062 · 1.6 L V6 turbo híbrido"],
      ["Neumáticos", "Pirelli (más anchas desde ese año)"],
      ["Nombre", "SF por Scuderia Ferrari, 70 por los 70 años de Ferrari y H por híbrido"]
    ],
    pilotos: [
      { nombre: "Sebastian Vettel", numero: 5, resultado: "2.º · 317 pts · 5 victorias" },
      { nombre: "Kimi Raikkonen", numero: 7, resultado: "4.º" }
    ],
    temporada: {
      carreras: 20,
      victorias: 5,
      poles: null,
      constructores: "2.º",
      pilotos: "Vettel 2.º"
    },
    titulos: [],
    carreraModelo: null,
    importancia: [
      "La primera Ferrari de la era híbrida que peleó el título de igual a igual con Mercedes.",
      "Ganó la primera carrera del año, en Australia, y Vettel lideró el campeonato durante media temporada.",
      "Primer año de los autos más anchos y con más carga aerodinámica."
    ],
    curiosidades: [
      "El nombre festeja los 70 años de Ferrari como fabricante de autos (1947–2017).",
      "En Singapur, Vettel largó desde la pole y se tocó en la largada con Räikkönen y Verstappen: ahí se le escapó el título.",
      "Ganó en Australia, Bahréin, Mónaco, Hungría y Brasil."
    ],
    relato: "Por fin una Ferrari que le hacía frente a Mercedes. Esta es la SF70H, de 2017: el setenta es por los setenta años de Ferrari. Ese año cambiaron las reglas, los autos se hicieron más anchos y más rápidos, y Ferrari acertó. Sebastian Vettel ganó la primera carrera, en Australia, y durante media temporada fue líder del campeonato contra Lewis Hamilton. Ganó cinco carreras, incluida Mónaco con un uno-dos. Pero en Singapur todo se vino abajo: Vettel largó desde la pole y, en los primeros metros, se tocó con su compañero Räikkönen y con Max Verstappen: los tres quedaron afuera. Desde ahí Hamilton se escapó. Vettel terminó segundo, el más cerca que estuvo de ser campeón con Ferrari.",
    audio: "audio/sf70h-2017-vettel.mp3",
    conexiones: [
      { id: "sf15t-2015-vettel", texto: "La primera victoria de Vettel con Ferrari, en Malasia 2015." },
      { id: "w11-2020-hamilton", texto: "Hamilton, el rival de esa pelea, después llegó a los siete títulos." }
    ]
  },

  {
    id: "191-1991-schumacher",
    etiqueta: {
      equipo: "Jordan",
      chasis: "191",
      anio: 1991,
      piloto: "Michael Schumacher",
      carrera: "1991 Belgian Grand Prix"
    },
    alias: [
      "JORDAN 191",
      "JORDAN191",
      "7UP"
    ],
    color: "#0f8a3c",
    acento: "#1d4e9e",
    numero: 32,
    ficha: [
      [
        "Motor",
        "Ford HB (Cosworth) · 3.5 L V8, como cliente"
      ],
      [
        "Diseño",
        "Gary Anderson"
      ],
      [
        "Neumáticos",
        "Goodyear"
      ],
      [
        "Patrocinio",
        "7UP (el verde) y Fujifilm"
      ]
    ],
    pilotos: [
      {
        nombre: "Michael Schumacher",
        numero: 32,
        resultado: "Debut en Spa: 7.º en la clasificación, abandonó en la primera vuelta"
      },
      {
        nombre: "Bertrand Gachot",
        numero: 32,
        resultado: "Titular hasta agosto, cuando fue preso en Londres"
      },
      {
        nombre: "Andrea de Cesaris",
        numero: 33,
        resultado: "Mejor resultado: 4.º en Canadá y en México"
      }
    ],
    temporada: {
      carreras: 16,
      victorias: 0,
      poles: 0,
      constructores: "5.º — 13 pts (en su primer año)",
      pilotos: "Schumacher corrió una sola carrera con este auto"
    },
    titulos: [],
    carreraModelo: {
      nombre: "GP de Bélgica 1991 · Spa-Francorchamps",
      texto: "La única carrera de Schumacher con Jordan. Llegó como reemplazo de último momento, clasificó séptimo con un auto de un equipo nuevo y sorprendió a todo el paddock. En carrera se le rompió el embrague en la primera vuelta. En esa misma carrera, Andrea de Cesaris iba segundo con el otro Jordan hasta que el motor dijo basta a pocas vueltas del final."
    },
    importancia: [
      "El auto del debut de Michael Schumacher en la Fórmula 1.",
      "Primer año de Jordan en la F1: terminó 5.º entre los constructores, una gran temporada para un equipo nuevo.",
      "Para muchos, uno de los autos más lindos de la historia, con su verde de 7UP."
    ],
    curiosidades: [
      "Schumacher dijo que conocía Spa, pero nunca había corrido ahí: aprendió el circuito dando vueltas en bicicleta.",
      "Después de esa carrera, Benetton lo contrató de inmediato y el caso terminó en los tribunales.",
      "Su lugar en Jordan lo ocupó Roberto Moreno, que hizo el camino inverso desde Benetton."
    ],
    relato: "Una sola carrera, y cambió la historia de la Fórmula 1. Agosto de 1991: el piloto de Jordan, Bertrand Gachot, termina preso en Londres por rociar con gas a un taxista. Eddie Jordan necesita un reemplazo urgente para Spa, y aparece un alemán de veintidós años: Michael Schumacher. Le preguntan si conoce el circuito y dice que sí. Mentira: nunca había corrido ahí, y lo aprendió dando vueltas en bicicleta. En la clasificación, con este Jordan verde, termina séptimo y deja a todos con la boca abierta. En la carrera abandona en la primera vuelta. No importó: antes de la carrera siguiente, Benetton ya se lo había llevado. Así empezó la era Schumacher.",
    audio: "audio/191-1991-schumacher.mp3",
    conexiones: [
      {
        id: "jordan199-1999-frentzen",
        texto: "Ocho años después, Jordan vivió su mejor temporada con Frentzen."
      },
      {
        id: "b194-1994-schumacher",
        texto: "Tres años después de este debut, Schumacher fue campeón por primera vez."
      }
    ]
  },

  {
    id: "mp4-2b-1985-prost",
    etiqueta: {
      equipo: "McLaren",
      chasis: "MP4/2B",
      anio: 1985,
      piloto: "Alain Prost",
      carrera: null
    },
    alias: ["MP 4/2B", "MP4 2B", "MP4-2B", "MP42B", "TAG"],
    color: "#f2f2f2",
    acento: "#d40000",
    numero: 2,
    ficha: [
      ["Motor", "TAG-Porsche TTE PO1 · 1.5 L V6 turbo"],
      ["Diseño", "John Barnard"],
      ["Chasis", "Monocasco de fibra de carbono, la idea con la que McLaren se adelantó a todos"],
      ["Neumáticos", "Goodyear"]
    ],
    pilotos: [
      { nombre: "Alain Prost", numero: 2, resultado: "Campeón del mundo · 5 victorias" },
      { nombre: "Niki Lauda", numero: 1, resultado: "Ganó en Países Bajos: la última victoria de su carrera" }
    ],
    temporada: {
      carreras: 16,
      victorias: 6,
      poles: null,
      constructores: "1.º",
      pilotos: "Prost campeón (1.er título)"
    },
    titulos: ["Campeonato de Pilotos 1985 — Alain Prost", "Campeonato de Constructores 1985 — McLaren"],
    carreraModelo: null,
    importancia: [
      "Primer título de Alain Prost y primer campeón del mundo francés.",
      "El chasis de fibra de carbono de McLaren, que todos copiaron después.",
      "Segundo año seguido de McLaren campeón: en 1984 ganó Lauda con el MP4/2."
    ],
    curiosidades: [
      "Prost ganó en San Marino y lo descalificaron: el auto pesaba menos que el mínimo porque se había quedado sin nafta.",
      "Su compañero era Niki Lauda, que en 1984 le había ganado el título por medio punto.",
      "Lauda ganó en Zandvoort con este auto, la última de sus 25 victorias, y a fin de año se retiró."
    ],
    relato: "Medio punto. Por esa diferencia Alain Prost perdió el campeonato de 1984 contra su compañero Niki Lauda. Al año siguiente, con este McLaren MP4/2B, se tomó revancha. El auto tenía un chasis de fibra de carbono, la gran idea del diseñador John Barnard, y un motor turbo de Porsche. Prost ganó cinco carreras. Y podrían haber sido seis: en San Marino cruzó primero, pero el auto se había quedado sin nafta y pesaba menos que el mínimo. Lo descalificaron. Igual fue campeón, el primero de Francia en la historia. Lauda, en su último año, ganó una vez más en Holanda, la última victoria de su carrera, y se retiró. Era el comienzo de la era Prost.",
    audio: "audio/mp4-2b-1985-prost.mp3",
    conexiones: [
      { id: "fw15c-1993-prost", texto: "Ocho años después Prost ganó su cuarto y último título con el Williams FW15C." },
      { id: "312t2-1977-lauda", texto: "Lauda, su compañero ese año, había sido campeón con Ferrari." }
    ]
  },

  {
    id: "fw11b-1987-piquet",
    etiqueta: {
      equipo: "Williams",
      chasis: "FW11B",
      anio: 1987,
      piloto: "Nelson Piquet",
      carrera: null
    },
    alias: ["FW 11B", "FW11 B", "FW11", "CANON", "HONDA"],
    color: "#0a2a8a",
    acento: "#f5d000",
    numero: 6,
    ficha: [
      ["Motor", "Honda RA167E · 1.5 L V6 turbo"],
      ["Diseño", "Patrick Head · Frank Dernie"],
      ["Neumáticos", "Goodyear"],
      ["Patrocinio", "Canon"]
    ],
    pilotos: [
      { nombre: "Nelson Piquet", numero: 6, resultado: "Campeón del mundo · 3 victorias" },
      { nombre: "Nigel Mansell", numero: 5, resultado: "2.º · 6 victorias" }
    ],
    temporada: {
      carreras: 16,
      victorias: 9,
      poles: null,
      constructores: "1.º",
      pilotos: "Piquet campeón (3.er título)"
    },
    titulos: ["Campeonato de Pilotos 1987 — Nelson Piquet", "Campeonato de Constructores 1987 — Williams"],
    carreraModelo: null,
    importancia: [
      "Tercer título de Nelson Piquet, que igualó así a Lauda, Brabham y Stewart.",
      "Williams-Honda fue el auto a vencer: ganó nueve carreras y los dos campeonatos.",
      "En Monza, Piquet ganó con suspensión activa: el comienzo de la tecnología del FW14B."
    ],
    curiosidades: [
      "Piquet y Mansell, compañeros de equipo, no se hablaban: la pelea más dura del año era adentro del box.",
      "Piquet tuvo un accidente fortísimo en Imola y se perdió esa carrera, pero siguió corriendo.",
      "Mansell se lastimó la espalda en la clasificación de Japón y Piquet quedó campeón sin correr esa carrera."
    ],
    relato: "Ganar menos y ser campeón. Eso hizo Nelson Piquet en 1987 con este Williams FW11B. Su compañero, Nigel Mansell, ganó seis carreras; Piquet, solo tres. Pero Piquet sumaba puntos siempre, y los dos se llevaban tan mal que casi no se hablaban dentro del mismo equipo. El auto, con motor turbo Honda, era el mejor de la grilla. En Imola, Piquet tuvo un accidente tremendo en la curva Tamburello, y aun así siguió peleando. En Monza ganó con un auto de suspensión activa, la tecnología que años después haría imbatible al FW14B. Y en Japón, Mansell se golpeó la espalda en la clasificación y no pudo correr. Piquet fue campeón por tercera vez.",
    audio: "audio/fw11b-1987-piquet.mp3",
    conexiones: [
      { id: "bt52b-1983-piquet", texto: "Su título anterior, con el Brabham turbo de 1983." },
      { id: "fw14b-1992-mansell", texto: "Mansell, su rival en el box, fue campeón con el FW14B en 1992." }
    ]
  }
];
