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
  - conexiones: [{ id, texto }] enlaces a otros autos de la repisa. Los autos del
    mismo piloto se enlazan solos. La época (década) también se calcula sola.
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
    relato: "Este es el Red Bull RB18, el auto con el que Max Verstappen ganó su segundo título mundial. En 2022 la Fórmula 1 cambió por completo: volvió el efecto suelo, y casi todos los autos rebotaban en las rectas. El equipo de Adrian Newey fue el que mejor entendió las nuevas reglas. Max, que llevaba el número uno por primera vez, ganó quince carreras, un récord en ese momento. Tu modelo es el de Suzuka: una carrera bajo una lluvia tremenda, frenada con bandera roja y acortada. Max ganó y, por una regla que casi nadie recordaba, se repartieron todos los puntos. Así fue campeón ahí mismo, cuando ni él sabía que ya lo era. Red Bull también se llevó el campeonato de constructores, con diecisiete victorias en veintidós carreras.",
    audio: "audio/rb18-2022-verstappen.mp3"
  },

  {
    id: "mp4-4-1988-senna",
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
    relato: "El McLaren MP4/4 es, para muchos, el auto más dominante de la historia. En 1988 combinó un chasis bajísimo, con el piloto casi acostado, y el motor turbo de Honda. Y tuvo a los dos mejores pilotos del mundo: Ayrton Senna y Alain Prost. Ganó quince de las dieciséis carreras. La única que se le escapó fue Monza, donde Senna chocó con un rezagado a dos vueltas del final y Ferrari hizo un uno-dos, semanas después de la muerte de Enzo Ferrari. El título se definió en Japón: Senna casi se queda parado en la largada, remontó bajo la lluvia y ganó su primer campeonato mundial. Prost sumó más puntos en total, pero en esa época solo contaban los once mejores resultados.",
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
    relato: "El Williams FW14B parecía una nave espacial. En 1992 tenía suspensión activa, que mantenía el auto siempre a la altura justa, control de tracción y caja semiautomática, cosas que los rivales apenas estaban probando. Lo diseñaron Adrian Newey y Patrick Head, y lo empujaba un motor V10 de Renault. Nigel Mansell, el León, ganó las primeras cinco carreras del año, sumó nueve victorias y catorce poles, y fue campeón en agosto, en Hungría, con cinco carreras por delante. Fue el único título de su carrera, después de años de quedarse cerca. El auto era tan superior que, poco después, la FIA prohibió toda esa electrónica.",
    audio: "audio/fw14b-1992-mansell.mp3"
  },

  {
    id: "f2004-2004-schumacher",
    etiqueta: {
      equipo: "Ferrari",
      chasis: "F2004",
      anio: 2004,
      piloto: "Michael Schumacher",
      carrera: null
    },
    alias: ["F 2004", "SCUDERIA FERRARI"],
    color: "#c4000c",
    acento: "#ffffff",
    numero: 1,
    ficha: [
      ["Motor", "Ferrari Tipo 053 · 3.0 L V10"],
      ["Diseño", "Rory Byrne · Ross Brawn (director técnico) · Aldo Costa"],
      ["Neumáticos", "Bridgestone"]
    ],
    pilotos: [
      { nombre: "Michael Schumacher", numero: 1, resultado: "Campeón del mundo · 148 pts · 13 victorias" },
      { nombre: "Rubens Barrichello", numero: 2, resultado: "2.º · 114 pts · 2 victorias (Italia y China)" }
    ],
    temporada: {
      carreras: 18,
      victorias: 15,
      poles: null,
      constructores: "1.º — 262 pts",
      pilotos: "Schumacher campeón (7.º título)"
    },
    titulos: ["Campeonato de Pilotos 2004 — Michael Schumacher", "Campeonato de Constructores 2004 — Ferrari"],
    carreraModelo: null,
    importancia: [
      "Le dio a Schumacher su séptimo y último título, récord que recién Hamilton igualó en 2020.",
      "Ganó 15 de 18 carreras: la cima de la era dorada Schumacher–Ferrari.",
      "Quinto título consecutivo de Schumacher con Ferrari (2000–2004)."
    ],
    curiosidades: [
      "Schumacher ganó 12 de las primeras 13 carreras; la excepción fue Mónaco, donde chocó en el túnel detrás del auto de seguridad.",
      "Schumacher se aseguró el título en Spa, terminando segundo.",
      "Varios récords de vuelta del F2004 duraron muchos años."
    ],
    relato: "La Ferrari F2004 es la cumbre de la era de Michael Schumacher. Con Ross Brawn como director técnico, Rory Byrne en el diseño y un motor V10 de Ferrari, ganó quince de las dieciocho carreras de 2004. Schumacher ganó doce de las primeras trece. La única excepción fue Mónaco, donde chocó en el túnel mientras iba detrás del auto de seguridad. En Spa, terminando segundo, se aseguró su séptimo título mundial, el quinto seguido con Ferrari. Ese récord de siete coronas tardó dieciséis años en ser igualado, por Lewis Hamilton. Y varios de los récords de vuelta de este auto resistieron durante muchos años.",
    audio: "audio/f2004-2004-schumacher.mp3"
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
    alias: ["BGP001", "BGP 01", "BRAWN"],
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
    relato: "La historia del Brawn BGP 001 parece de película. A fines de 2008, Honda se retiró de la Fórmula 1 y dejó a cientos de personas a punto de quedarse sin trabajo. Ross Brawn se quedó con el equipo por una suma simbólica, le puso un motor Mercedes y salió a pista con un auto casi todo blanco, sin sponsors. Tenía un secreto: el doble difusor, una pieza en la parte trasera del piso que generaba mucha más carga aerodinámica. Los rivales protestaron, pero la FIA lo declaró legal. Jenson Button ganó seis de las primeras siete carreras y fue campeón en Brasil. El equipo ganó también el campeonato de constructores, en su única temporada. Al año siguiente lo compró Mercedes: es el origen del Mercedes que después dominó con Hamilton.",
    audio: "audio/bgp001-2009-button.mp3"
  },

  {
    id: "w11-2020-hamilton",
    etiqueta: {
      equipo: "Mercedes-AMG",
      chasis: "W11",
      anio: 2020,
      piloto: "Lewis Hamilton",
      carrera: null
    },
    alias: ["W 11", "F1 W11", "MERCEDES AMG", "PETRONAS"],
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
    carreraModelo: null,
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
    relato: "El Mercedes W11 corrió en 2020, el año de la pandemia, con una temporada reducida a diecisiete carreras. Mercedes lo pintó de negro como mensaje contra el racismo. Fue probablemente el auto más rápido de toda la era híbrida: quince poles y trece victorias. Tenía un truco único, el DAS: en las rectas, Hamilton podía empujar y tirar del volante para cambiar el ángulo de las ruedas delanteras. Con este auto, Lewis Hamilton superó en Portugal el récord de noventa y una victorias de Michael Schumacher. Y en Turquía, bajo la lluvia y largando sexto, ganó y alcanzó sus siete títulos mundiales, igualando al alemán.",
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
      { id: "f2004-2004-schumacher", texto: "Su evolución: la F2004, el séptimo título de Schumacher." },
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
    audio: "audio/r25-2005-alonso.mp3",
    conexiones: [
      { id: "tg184-1984-senna", texto: "Hecho en Enstone, la misma fábrica que el Toleman de Senna en 1984." },
      { id: "f2004-2004-schumacher", texto: "El auto al que destronó: la Ferrari de Schumacher." }
    ]
  }
];
