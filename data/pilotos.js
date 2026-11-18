/*
  FICHAS DE PILOTOS
  =================
  Un objeto por piloto. La app los enlaza solos con los autos: busca el nombre
  en la etiqueta del auto y en su lista de pilotos.

  - Los números (victorias, poles, carreras) son de toda su carrera en el Mundial de F1.
  - Para pilotos todavía en actividad los números cambian: se dejan en null
    (no se muestran) y se cuentan sus récords en "datos".
  - Cualquier dato que no sepas con certeza, dejalo en null.
*/
window.PILOTOS = [
  {
    id: "alberto-ascari",
    nombre: "Alberto Ascari",
    apodo: "Ciccio",
    pais: "Italia", bandera: "🇮🇹",
    nacimiento: 1918, fallecimiento: 1955,
    titulos: [1952, 1953],
    victorias: 13, poles: 14, carreras: 32,
    equipos: ["Ferrari", "Maserati", "Lancia"],
    resumen: "El primer gran campeón de Ferrari. Dominó 1952 y 1953 con una regularidad que nadie había visto: ganaba casi siempre desde la pole y liderando de punta a punta.",
    datos: [
      "Ganó 9 carreras del Mundial seguidas entre 1952 y 1953: récord que nadie superó hasta Verstappen en 2023.",
      "En 1955 cayó con su Lancia al agua del puerto de Mónaco y salió nadando. Cuatro días después murió probando un Ferrari en Monza.",
      "Su padre Antonio, también piloto, murió en un accidente de carrera a los 36 años. Alberto murió a la misma edad."
    ]
  },
  {
    id: "juan-manuel-fangio",
    nombre: "Juan Manuel Fangio",
    apodo: "El Chueco",
    pais: "Argentina", bandera: "🇦🇷",
    nacimiento: 1911, fallecimiento: 1995,
    titulos: [1951, 1954, 1955, 1956, 1957],
    victorias: 24, poles: 29, carreras: 51,
    equipos: ["Alfa Romeo", "Maserati", "Mercedes", "Ferrari"],
    resumen: "El Maestro. Cinco títulos mundiales con cuatro marcas distintas, en una época en que cada carrera podía ser la última. Ganó casi la mitad de las carreras que corrió.",
    datos: [
      "Ganó el 46 % de las carreras que largó: un porcentaje que ningún campeón igualó.",
      "Su récord de cinco títulos duró 46 años, hasta que lo superó Michael Schumacher en 2003.",
      "En Nürburgring 1957 remontó casi un minuto en pocas vueltas, batiendo el récord de vuelta una y otra vez. Dijo que nunca había manejado tan rápido y que no quería volver a hacerlo.",
      "En 1958 lo secuestraron en Cuba los rebeldes de Fidel Castro, la noche antes de una carrera. Lo liberaron al día siguiente."
    ]
  },
  {
    id: "james-hunt",
    nombre: "James Hunt",
    apodo: "Hunt the Shunt",
    pais: "Reino Unido", bandera: "🇬🇧",
    nacimiento: 1947, fallecimiento: 1993,
    titulos: [1976],
    victorias: 10, poles: 14, carreras: 92,
    equipos: ["Hesketh", "McLaren", "Wolf"],
    resumen: "Rápido, rebelde y fiestero: el piloto más rockstar de los años 70. Ganó el título de 1976 por un punto en la última carrera, contra Niki Lauda.",
    datos: [
      "Su apodo 'Hunt the Shunt' (algo así como 'Hunt el choque') venía de sus muchos accidentes en las categorías menores.",
      "Su rivalidad con Lauda, que fuera de la pista eran amigos, inspiró la película Rush (2013).",
      "Después de retirarse fue comentarista de F1 en la BBC junto a Murray Walker."
    ]
  },
  {
    id: "niki-lauda",
    nombre: "Niki Lauda",
    apodo: "La Computadora",
    pais: "Austria", bandera: "🇦🇹",
    nacimiento: 1949, fallecimiento: 2019,
    titulos: [1975, 1977, 1984],
    victorias: 25, poles: 24, carreras: 171,
    equipos: ["March", "BRM", "Ferrari", "Brabham", "McLaren"],
    resumen: "Tres veces campeón y protagonista de la vuelta más increíble del deporte: corrió de nuevo 42 días después de casi morir quemado en Nürburgring 1976.",
    datos: [
      "Le decían 'La Computadora' por su forma analítica y precisa de trabajar el auto.",
      "Ganó el título de 1984 por medio punto sobre Alain Prost, la diferencia más chica de la historia.",
      "Fundó su propia aerolínea, Lauda Air, y fue piloto comercial.",
      "Después de retirarse fue directivo de Mercedes durante su época dorada."
    ]
  },
  {
    id: "carlos-reutemann",
    nombre: "Carlos Reutemann",
    apodo: "El Lole",
    pais: "Argentina", bandera: "🇦🇷",
    nacimiento: 1942, fallecimiento: 2021,
    titulos: [],
    victorias: 12, poles: 6, carreras: 146,
    equipos: ["Brabham", "Ferrari", "Lotus", "Williams"],
    resumen: "El argentino más ganador después de Fangio. Rapidísimo y elegante, estuvo a un punto de ser campeón del mundo en 1981.",
    datos: [
      "Hizo la pole en su primera carrera de F1, en Buenos Aires 1972.",
      "Perdió el título de 1981 por un solo punto contra Nelson Piquet, en la última carrera.",
      "Después de la F1 fue gobernador de Santa Fe y senador nacional."
    ]
  },
  {
    id: "ayrton-senna",
    nombre: "Ayrton Senna",
    apodo: "Magic",
    pais: "Brasil", bandera: "🇧🇷",
    nacimiento: 1960, fallecimiento: 1994,
    titulos: [1988, 1990, 1991],
    victorias: 41, poles: 65, carreras: 161,
    equipos: ["Toleman", "Lotus", "McLaren", "Williams"],
    resumen: "Para muchos, el piloto más rápido de la historia. Tres títulos, una rivalidad legendaria con Prost y una forma de manejar bajo la lluvia que parecía de otro mundo.",
    datos: [
      "Sus 65 poles fueron récord durante 12 años, hasta que las superó Schumacher.",
      "Ganó 6 veces en Mónaco, más que nadie.",
      "Murió en Imola en 1994, manejando un Williams. Su muerte cambió para siempre la seguridad en la F1."
    ]
  },
  {
    id: "alain-prost",
    nombre: "Alain Prost",
    apodo: "El Profesor",
    pais: "Francia", bandera: "🇫🇷",
    nacimiento: 1955, fallecimiento: null,
    titulos: [1985, 1986, 1989, 1993],
    victorias: 51, poles: 33, carreras: 199,
    equipos: ["McLaren", "Renault", "Ferrari", "Williams"],
    resumen: "Cuatro títulos a fuerza de inteligencia: cuidaba el auto, los neumáticos y el combustible mejor que nadie. Su rivalidad con Senna es la más famosa de la F1.",
    datos: [
      "Sus 51 victorias fueron récord hasta que Schumacher lo superó en 2001.",
      "En 1989 y 1990, los títulos entre él y Senna se definieron con choques en Suzuka.",
      "Después de retirarse tuvo su propio equipo de F1: Prost Grand Prix."
    ]
  },
  {
    id: "nigel-mansell",
    nombre: "Nigel Mansell",
    apodo: "El León",
    pais: "Reino Unido", bandera: "🇬🇧",
    nacimiento: 1953, fallecimiento: null,
    titulos: [1992],
    victorias: 31, poles: 32, carreras: 187,
    equipos: ["Lotus", "Williams", "Ferrari", "McLaren"],
    resumen: "Puro coraje. Después de años de quedarse cerca, arrasó en 1992 con el Williams FW14B y fue campeón en agosto.",
    datos: [
      "Al año siguiente de ser campeón de F1 se fue a correr a Estados Unidos y ganó el campeonato de CART en su temporada debut.",
      "En 1986 perdió el título en la última carrera por una explosión de neumático a casi 300 km/h.",
      "Fue el último piloto elegido personalmente por Enzo Ferrari."
    ]
  },
  {
    id: "michael-schumacher",
    nombre: "Michael Schumacher",
    apodo: "Schumi",
    pais: "Alemania", bandera: "🇩🇪",
    nacimiento: 1969, fallecimiento: null,
    titulos: [1994, 1995, 2000, 2001, 2002, 2003, 2004],
    victorias: 91, poles: 68, carreras: 306,
    equipos: ["Jordan", "Benetton", "Ferrari", "Mercedes"],
    resumen: "Siete títulos, cinco de ellos seguidos con Ferrari. Llevó a la Scuderia de 21 años sin títulos de pilotos a la era más dominante de su historia.",
    datos: [
      "Su récord de 91 victorias duró hasta 2020, cuando lo superó Lewis Hamilton.",
      "Debutó en 1991 con Jordan en Spa, su circuito favorito, y ahí también ganó su primera carrera un año después.",
      "Volvió a la F1 con Mercedes entre 2010 y 2012, el equipo que después dominaría con Hamilton."
    ]
  },
  {
    id: "fernando-alonso",
    nombre: "Fernando Alonso",
    apodo: "El Nano",
    pais: "España", bandera: "🇪🇸",
    nacimiento: 1981, fallecimiento: null,
    titulos: [2005, 2006],
    victorias: null, poles: null, carreras: null,
    equipos: ["Minardi", "Renault", "McLaren", "Ferrari", "Alpine", "Aston Martin"],
    resumen: "Bicampeón con Renault, terminó con la era Schumacher y se convirtió en uno de los pilotos más completos y longevos de la historia.",
    datos: [
      "Tiene el récord de más carreras disputadas en la historia de la F1.",
      "Fuera de la F1 ganó dos veces las 24 Horas de Le Mans y el Mundial de Resistencia.",
      "En 2005, con 24 años, fue el campeón más joven de la historia hasta ese momento."
    ]
  },
  {
    id: "max-verstappen",
    nombre: "Max Verstappen",
    apodo: "Mad Max",
    pais: "Países Bajos", bandera: "🇳🇱",
    nacimiento: 1997, fallecimiento: null,
    titulos: [2021, 2022, 2023, 2024],
    victorias: null, poles: null, carreras: null,
    equipos: ["Toro Rosso", "Red Bull"],
    resumen: "El más joven en debutar y en ganar en la F1. Con Red Bull encadenó cuatro títulos seguidos y batió récords de victorias en una temporada.",
    datos: [
      "Debutó con 17 años y ganó su primera carrera con 18, en España 2016: ambos récords de precocidad.",
      "En 2023 ganó 19 de las 22 carreras, incluidas 10 seguidas: los dos son récords.",
      "Su padre, Jos Verstappen, también fue piloto de F1."
    ]
  },
  {
    id: "lewis-hamilton",
    nombre: "Lewis Hamilton",
    apodo: null,
    pais: "Reino Unido", bandera: "🇬🇧",
    nacimiento: 1985, fallecimiento: null,
    titulos: [2008, 2014, 2015, 2017, 2018, 2019, 2020],
    victorias: null, poles: null, carreras: null,
    equipos: ["McLaren", "Mercedes", "Ferrari"],
    resumen: "Siete títulos, igualando a Schumacher, y dueño de los récords de más victorias y más poles de la historia.",
    datos: [
      "Fue subcampeón en su año debut, 2007, y campeón al siguiente.",
      "Tiene los récords de más victorias y más poles de la historia.",
      "En 2025 se pasó a Ferrari."
    ]
  },
  {
    id: "jenson-button",
    nombre: "Jenson Button",
    apodo: null,
    pais: "Reino Unido", bandera: "🇬🇧",
    nacimiento: 1980, fallecimiento: null,
    titulos: [2009],
    victorias: 15, poles: 8, carreras: null,
    equipos: ["Williams", "Benetton", "Renault", "BAR", "Honda", "Brawn", "McLaren"],
    resumen: "Campeón con el cuento de hadas de Brawn GP en 2009. Famoso por su manejo suave y por brillar en carreras con lluvia cambiante.",
    datos: [
      "Ganó Canadá 2011 después de pasar seis veces por boxes y venir último: la carrera más larga de la historia de la F1.",
      "Su primera victoria llegó recién en su carrera número 113, en Hungría 2006."
    ]
  }
];
