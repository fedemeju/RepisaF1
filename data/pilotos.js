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
  },
  {
    id: "mike-hawthorn",
    nombre: "Mike Hawthorn",
    apodo: null,
    pais: "Reino Unido", bandera: "🇬🇧",
    nacimiento: 1929, fallecimiento: 1959,
    titulos: [1958],
    victorias: 3, poles: 4, carreras: 45,
    equipos: ["Cooper", "Ferrari", "Vanwall", "BRM"],
    resumen: "El primer campeón británico. Alto, rubio y siempre con moñito: ganó el título de 1958 por un punto con una sola victoria en el año.",
    datos: [
      "Su primera victoria fue en Reims 1953, después de pelear rueda a rueda con Fangio toda la carrera.",
      "Se retiró apenas salió campeón y murió meses después en un accidente en la ruta."
    ]
  },
  {
    id: "jim-clark",
    nombre: "Jim Clark",
    apodo: null,
    pais: "Escocia (Reino Unido)", bandera: "🇬🇧",
    nacimiento: 1936, fallecimiento: 1968,
    titulos: [1963, 1965],
    victorias: 25, poles: 33, carreras: 72,
    equipos: ["Lotus"],
    resumen: "Para muchos pilotos de su época, el más rápido de todos. Corrió toda su carrera en Lotus y ganó dos títulos con una facilidad que asustaba.",
    datos: [
      "En 1965 fue campeón de F1 y además ganó las 500 Millas de Indianápolis.",
      "Era un granjero escocés tímido, que fuera del auto casi no hablaba.",
      "Murió en 1968 en una carrera de Fórmula 2 en Hockenheim."
    ]
  },
  {
    id: "lorenzo-bandini",
    nombre: "Lorenzo Bandini",
    apodo: null,
    pais: "Italia", bandera: "🇮🇹",
    nacimiento: 1935, fallecimiento: 1967,
    titulos: [],
    victorias: 1, poles: 1, carreras: 42,
    equipos: ["Centro Sud", "Ferrari"],
    resumen: "Piloto querido de Ferrari en los años 60. Su única victoria fue en Austria 1964, y ese mismo año ayudó a Surtees a ser campeón.",
    datos: [
      "Nació en Libia, que entonces era colonia italiana.",
      "Murió por un accidente en el GP de Mónaco de 1967, cuando iba segundo."
    ]
  },
  {
    id: "denis-hulme",
    nombre: "Denis Hulme",
    apodo: "El Oso",
    pais: "Nueva Zelanda", bandera: "🇳🇿",
    nacimiento: 1936, fallecimiento: 1992,
    titulos: [1967],
    victorias: 8, poles: 1, carreras: 112,
    equipos: ["Brabham", "McLaren"],
    resumen: "El único campeón del mundo de Nueva Zelanda. Callado y durísimo, le ganó el título de 1967 a su propio jefe, Jack Brabham.",
    datos: [
      "Después corrió muchos años en McLaren, el equipo de su amigo Bruce McLaren.",
      "Murió de un ataque al corazón mientras corría una carrera de turismos en Bathurst, Australia."
    ]
  },
  {
    id: "john-surtees",
    nombre: "John Surtees",
    apodo: null,
    pais: "Reino Unido", bandera: "🇬🇧",
    nacimiento: 1934, fallecimiento: 2017,
    titulos: [1964],
    victorias: 6, poles: 8, carreras: 111,
    equipos: ["Lotus", "Cooper", "Lola", "Ferrari", "Honda", "BRM", "Surtees"],
    resumen: "El único campeón del mundo en motos y en autos. Siete títulos en motociclismo y el de Fórmula 1 de 1964 con Ferrari.",
    datos: [
      "Ganó con Honda en Monza 1967 en el debut del RA300.",
      "Después armó su propio equipo de F1, Surtees, en los años 70."
    ]
  },
  {
    id: "pedro-rodriguez",
    nombre: "Pedro Rodríguez",
    apodo: null,
    pais: "México", bandera: "🇲🇽",
    nacimiento: 1940, fallecimiento: 1971,
    titulos: [],
    victorias: 2, poles: 0, carreras: 54,
    equipos: ["Lotus", "Ferrari", "Cooper", "BRM"],
    resumen: "El primer gran ídolo mexicano del automovilismo. Valiente y rapidísimo bajo la lluvia, ganó en Sudáfrica 1967 y en Spa 1970.",
    datos: [
      "Ganó las 24 Horas de Le Mans en 1968.",
      "Él y su hermano Ricardo murieron corriendo: por ellos el autódromo de Ciudad de México se llama Hermanos Rodríguez."
    ]
  },
  {
    id: "emerson-fittipaldi",
    nombre: "Emerson Fittipaldi",
    apodo: "Emmo",
    pais: "Brasil", bandera: "🇧🇷",
    nacimiento: 1946, fallecimiento: null,
    titulos: [1972, 1974],
    victorias: 14, poles: 6, carreras: 144,
    equipos: ["Lotus", "McLaren", "Fittipaldi"],
    resumen: "El primer campeón brasileño, y el más joven de la historia hasta 2005. Abrió el camino para Piquet y Senna.",
    datos: [
      "Fue campeón con Lotus en 1972 y con McLaren en 1974.",
      "Armó con su hermano Wilson su propio equipo de F1, con la marca de azúcar Copersucar.",
      "Ya veterano, ganó dos veces las 500 Millas de Indianápolis."
    ]
  },
  {
    id: "jean-pierre-beltoise",
    nombre: "Jean-Pierre Beltoise",
    apodo: null,
    pais: "Francia", bandera: "🇫🇷",
    nacimiento: 1937, fallecimiento: 2015,
    titulos: [],
    victorias: 1, poles: 0, carreras: 86,
    equipos: ["Matra", "BRM"],
    resumen: "Campeón de Francia en motos y piloto de autos con un brazo lesionado. Su única victoria fue una obra maestra bajo la lluvia en Mónaco 1972.",
    datos: [
      "Un accidente en 1964 le dejó el brazo izquierdo casi sin movimiento, y siguió corriendo igual.",
      "Su victoria en Mónaco fue la última de BRM en la F1."
    ]
  },
  {
    id: "jackie-stewart",
    nombre: "Jackie Stewart",
    apodo: null,
    pais: "Escocia (Reino Unido)", bandera: "🇬🇧",
    nacimiento: 1939, fallecimiento: null,
    titulos: [1969, 1971, 1973],
    victorias: 27, poles: 17, carreras: 99,
    equipos: ["BRM", "Matra", "March", "Tyrrell"],
    resumen: "Tres veces campeón y el piloto que más hizo por la seguridad en las carreras. Sus 27 victorias fueron récord durante 14 años.",
    datos: [
      "Se retiró en 1973 sin llegar a correr su carrera número 100.",
      "Peleó para que hubiera guardarraíles, médicos y cascos integrales cuando muchos lo criticaban por 'miedoso'.",
      "Tiene dislexia: se enteró recién de grande."
    ]
  },
  {
    id: "carlos-pace",
    nombre: "Carlos Pace",
    apodo: "Moco",
    pais: "Brasil", bandera: "🇧🇷",
    nacimiento: 1944, fallecimiento: 1977,
    titulos: [],
    victorias: 1, poles: 1, carreras: 72,
    equipos: ["Williams", "Surtees", "Brabham"],
    resumen: "Ganó una sola carrera, pero en su casa: Interlagos 1975. Hoy ese autódromo lleva su nombre.",
    datos: [
      "Fue compañero de Carlos Reutemann en Brabham.",
      "Murió en un accidente de avioneta en 1977."
    ]
  },
  {
    id: "vittorio-brambilla",
    nombre: "Vittorio Brambilla",
    apodo: "El Gorila de Monza",
    pais: "Italia", bandera: "🇮🇹",
    nacimiento: 1937, fallecimiento: 2001,
    titulos: [],
    victorias: 1, poles: 1, carreras: 74,
    equipos: ["March", "Surtees", "Alfa Romeo"],
    resumen: "Bruto, valiente y simpático. Ganó una sola carrera, Austria 1975, y la festejó chocando el auto después de la bandera a cuadros.",
    datos: [
      "Empezó en las motos y era también mecánico.",
      "Su única pole fue en Suecia 1975."
    ]
  },
  {
    id: "jody-scheckter",
    nombre: "Jody Scheckter",
    apodo: null,
    pais: "Sudáfrica", bandera: "🇿🇦",
    nacimiento: 1950, fallecimiento: null,
    titulos: [1979],
    victorias: 10, poles: 3, carreras: 112,
    equipos: ["McLaren", "Tyrrell", "Wolf", "Ferrari"],
    resumen: "El único campeón del mundo de África. Ganó la única carrera de la historia de un auto de seis ruedas y fue campeón con Ferrari en 1979.",
    datos: [
      "Después de su título, Ferrari tardó 21 años en tener otro campeón de pilotos: Schumacher en 2000.",
      "De joven tenía fama de alocado; con los años se volvió uno de los más regulares."
    ]
  },
  {
    id: "mario-andretti",
    nombre: "Mario Andretti",
    apodo: null,
    pais: "Estados Unidos", bandera: "🇺🇸",
    nacimiento: 1940, fallecimiento: null,
    titulos: [1978],
    victorias: 12, poles: 18, carreras: 128,
    equipos: ["Lotus", "March", "Ferrari", "Parnelli", "Alfa Romeo", "Williams"],
    resumen: "Uno de los pilotos más completos de la historia: campeón de F1, ganador de Indianápolis y de las 500 millas de Daytona.",
    datos: [
      "Nació en Italia y se mudó a Estados Unidos de chico, después de vivir en un campo de refugiados.",
      "Ganó en su debut con Ferrari, en Sudáfrica 1971.",
      "Es el último estadounidense campeón del mundo de F1."
    ]
  },
  {
    id: "jacques-laffite",
    nombre: "Jacques Laffite",
    apodo: null,
    pais: "Francia", bandera: "🇫🇷",
    nacimiento: 1943, fallecimiento: null,
    titulos: [],
    victorias: 6, poles: 7, carreras: 176,
    equipos: ["Williams", "Ligier"],
    resumen: "Simpático, rápido y fiel a Ligier, el equipo con el que ganó sus seis carreras. Una de ellas fue el GP de Argentina 1979.",
    datos: [
      "Ganó la primera victoria de Ligier, en Suecia 1977.",
      "Su carrera terminó con un accidente en Gran Bretaña 1986, en el que se fracturó las dos piernas."
    ]
  },
  {
    id: "bruno-giacomelli",
    nombre: "Bruno Giacomelli",
    apodo: null,
    pais: "Italia", bandera: "🇮🇹",
    nacimiento: 1952, fallecimiento: null,
    titulos: [],
    victorias: 0, poles: 1, carreras: 69,
    equipos: ["McLaren", "Alfa Romeo", "Toleman", "Life"],
    resumen: "Campeón europeo de Fórmula 2 en 1978, fue la cara de la vuelta de Alfa Romeo a la F1.",
    datos: [
      "Hizo la pole en Estados Unidos 1980 y lideró hasta que se le rompió el auto.",
      "En 1990 volvió a la F1 con el Life, uno de los peores autos de la historia."
    ]
  },
  {
    id: "clay-regazzoni",
    nombre: "Clay Regazzoni",
    apodo: null,
    pais: "Suiza", bandera: "🇨🇭",
    nacimiento: 1939, fallecimiento: 2006,
    titulos: [],
    victorias: 5, poles: 5, carreras: 132,
    equipos: ["Ferrari", "BRM", "Ensign", "Shadow", "Williams"],
    resumen: "Bigote, sonrisa y valentía. Compañero de Lauda en Ferrari, le dio a Williams su primera victoria en 1979.",
    datos: [
      "Ganó en Monza 1970 con Ferrari, en su primer año en la F1.",
      "En 1974 perdió el título por tres puntos con Fittipaldi.",
      "Un accidente en Long Beach 1980 lo dejó en silla de ruedas; siguió corriendo rallies con autos adaptados."
    ]
  },
  {
    id: "jean-pierre-jabouille",
    nombre: "Jean-Pierre Jabouille",
    apodo: null,
    pais: "Francia", bandera: "🇫🇷",
    nacimiento: 1942, fallecimiento: 2023,
    titulos: [],
    victorias: 2, poles: 6, carreras: 49,
    equipos: ["Tyrrell", "Renault", "Ligier"],
    resumen: "Piloto e ingeniero. Desarrolló el primer Renault turbo y le dio su primera victoria, en Francia 1979.",
    datos: [
      "Su otra victoria fue en Austria 1980.",
      "Se quebró las piernas en Canadá 1980 y nunca volvió a ser el mismo."
    ]
  },
  {
    id: "riccardo-patrese",
    nombre: "Riccardo Patrese",
    apodo: null,
    pais: "Italia", bandera: "🇮🇹",
    nacimiento: 1954, fallecimiento: null,
    titulos: [],
    victorias: 6, poles: 8, carreras: 256,
    equipos: ["Shadow", "Arrows", "Brabham", "Alfa Romeo", "Williams", "Benetton"],
    resumen: "El piloto que más carreras corrió durante muchos años: 256 en 17 temporadas. Subcampeón en 1992 con Williams, detrás de Mansell.",
    datos: [
      "Pasaron más de 6 años entre su segunda y su tercera victoria.",
      "Su récord de carreras lo superó Rubens Barrichello en 2008."
    ]
  },
  {
    id: "nelson-piquet",
    nombre: "Nelson Piquet",
    apodo: null,
    pais: "Brasil", bandera: "🇧🇷",
    nacimiento: 1952, fallecimiento: null,
    titulos: [1981, 1983, 1987],
    victorias: 23, poles: 24, carreras: 204,
    equipos: ["Ensign", "McLaren", "Brabham", "Williams", "Lotus", "Benetton"],
    resumen: "Tres veces campeón, astuto y provocador. Le ganó el título de 1981 a Reutemann por un punto y el de 1983 fue el primero de un motor turbo.",
    datos: [
      "Corría con el apellido de soltera de su mamá para que su papá no se enterara.",
      "Ganó el GP de Argentina 1981.",
      "Su hijo Nelsinho también corrió en la F1."
    ]
  },
  {
    id: "michele-alboreto",
    nombre: "Michele Alboreto",
    apodo: null,
    pais: "Italia", bandera: "🇮🇹",
    nacimiento: 1956, fallecimiento: 2001,
    titulos: [],
    victorias: 5, poles: 2, carreras: 194,
    equipos: ["Tyrrell", "Ferrari", "Larrousse", "Arrows", "Scuderia Italia", "Minardi"],
    resumen: "Elegante y querido, fue subcampeón en 1985 con Ferrari. Le dio al motor Cosworth DFV su última victoria.",
    datos: [
      "Fue el último italiano en pelear un título con Ferrari.",
      "Murió en 2001 probando un Audi de Le Mans."
    ]
  },
  {
    id: "jacques-villeneuve",
    nombre: "Jacques Villeneuve",
    apodo: null,
    pais: "Canadá", bandera: "🇨🇦",
    nacimiento: 1971, fallecimiento: null,
    titulos: [1997],
    victorias: 11, poles: 13, carreras: 163,
    equipos: ["Williams", "BAR", "Renault", "Sauber", "BMW Sauber"],
    resumen: "Hijo del ídolo Gilles Villeneuve. Llegó a la F1 después de ganar Indianápolis y el campeonato de Estados Unidos, y fue campeón en su segundo año.",
    datos: [
      "Fue subcampeón en su primer año, 1996, detrás de su compañero Damon Hill.",
      "Ganó el GP de Argentina 1997.",
      "Fue campeón en Jerez 1997 después de que Schumacher le tirara el auto encima."
    ]
  },
  {
    id: "mika-salo",
    nombre: "Mika Salo",
    apodo: null,
    pais: "Finlandia", bandera: "🇫🇮",
    nacimiento: 1966, fallecimiento: null,
    titulos: [],
    victorias: 0, poles: 0, carreras: 109,
    equipos: ["Lotus", "Tyrrell", "Arrows", "BAR", "Ferrari", "Sauber", "Toyota"],
    resumen: "Finlandés rápido que nunca tuvo un auto ganador, salvo las seis carreras que corrió reemplazando a Schumacher en Ferrari en 1999.",
    datos: [
      "En Alemania 1999 iba primero y le dejó la victoria a su compañero Irvine.",
      "Corrió varios años en Japón antes de llegar a la F1.",
      "Sumó el primer punto de la historia de Toyota en la F1, en Australia 2002."
    ]
  },
  {
    id: "heinz-harald-frentzen",
    nombre: "Heinz-Harald Frentzen",
    apodo: null,
    pais: "Alemania", bandera: "🇩🇪",
    nacimiento: 1967, fallecimiento: null,
    titulos: [],
    victorias: 3, poles: 2, carreras: 156,
    equipos: ["Sauber", "Williams", "Jordan", "Prost", "Arrows"],
    resumen: "En las categorías chicas le ganaba a Schumacher. En la F1 tuvo su gran año en 1999 con Jordan, cuando peleó el título hasta casi el final.",
    datos: [
      "Fue compañero de Schumacher en el programa de pilotos jóvenes de Mercedes.",
      "Ganó con Williams en San Marino 1997 y con Jordan en Francia e Italia 1999."
    ]
  },
  {
    id: "mika-hakkinen",
    nombre: "Mika Häkkinen",
    apodo: "El Finlandés Volador",
    pais: "Finlandia", bandera: "🇫🇮",
    nacimiento: 1968, fallecimiento: null,
    titulos: [1998, 1999],
    victorias: 20, poles: 26, carreras: 161,
    equipos: ["Lotus", "McLaren"],
    resumen: "Bicampeón con McLaren y el gran rival de Michael Schumacher, que dijo muchas veces que fue el piloto que más respetó.",
    datos: [
      "En Australia 1995 tuvo un accidente tremendo y le salvaron la vida en la misma pista.",
      "Su primera victoria llegó recién en Jerez 1997, la última carrera de ese año.",
      "Después de ese accidente volvió más rápido que antes y fue campeón dos veces seguidas."
    ]
  },
  {
    id: "felipe-massa",
    nombre: "Felipe Massa",
    apodo: null,
    pais: "Brasil", bandera: "🇧🇷",
    nacimiento: 1981, fallecimiento: null,
    titulos: [],
    victorias: 11, poles: 16, carreras: 269,
    equipos: ["Sauber", "Ferrari", "Williams"],
    resumen: "Campeón del mundo durante 38 segundos en Brasil 2008. Ganó 11 carreras con Ferrari y fue querido en todos los equipos.",
    datos: [
      "En Hungría 2009 un resorte de otro auto le golpeó el casco y estuvo meses sin correr.",
      "Ganó dos veces el GP de Brasil, en su casa."
    ]
  },
  {
    id: "rubens-barrichello",
    nombre: "Rubens Barrichello",
    apodo: "Rubinho",
    pais: "Brasil", bandera: "🇧🇷",
    nacimiento: 1972, fallecimiento: null,
    titulos: [],
    victorias: 11, poles: 14, carreras: 322,
    equipos: ["Jordan", "Stewart", "Ferrari", "Honda", "Brawn", "Williams"],
    resumen: "Seis años compañero de Schumacher en Ferrari y dos veces subcampeón. Fue el piloto con más carreras de la historia durante más de una década.",
    datos: [
      "Su primera victoria fue en Alemania 2000, largando 18.º.",
      "En Austria 2002 el equipo le ordenó dejar ganar a Schumacher en la última curva: el público silbó y la FIA terminó prohibiendo esas órdenes.",
      "Fue subcampeón en 2002 y 2004."
    ]
  },
  {
    id: "jarno-trulli",
    nombre: "Jarno Trulli",
    apodo: null,
    pais: "Italia", bandera: "🇮🇹",
    nacimiento: 1974, fallecimiento: null,
    titulos: [],
    victorias: 1, poles: 4, carreras: 252,
    equipos: ["Minardi", "Prost", "Jordan", "Renault", "Toyota", "Lotus"],
    resumen: "Uno de los mejores en clasificación de su época. Su única victoria fue en Mónaco 2004, largando desde la pole.",
    datos: [
      "Como era difícil pasarlo, a la fila de autos que se armaba atrás de él le decían 'el tren Trulli'.",
      "Además de piloto, hace vino en Italia."
    ]
  },
  {
    id: "kimi-raikkonen",
    nombre: "Kimi Räikkönen",
    apodo: "Iceman",
    pais: "Finlandia", bandera: "🇫🇮",
    nacimiento: 1979, fallecimiento: null,
    titulos: [2007],
    victorias: 21, poles: 18, carreras: 349,
    equipos: ["Sauber", "McLaren", "Ferrari", "Lotus", "Alfa Romeo"],
    resumen: "El hombre de hielo: pocas palabras, cero gestos y muchísima velocidad. Campeón con Ferrari en 2007 por un punto.",
    datos: [
      "Llegó a la F1 con apenas 23 carreras de autos en su vida.",
      "Entre 2010 y 2011 dejó la F1 para correr en el Mundial de Rally.",
      "Se retiró con 349 carreras: en ese momento, el récord de la historia."
    ]
  },
  {
    id: "robert-kubica",
    nombre: "Robert Kubica",
    apodo: null,
    pais: "Polonia", bandera: "🇵🇱",
    nacimiento: 1984, fallecimiento: null,
    titulos: [],
    victorias: 1, poles: 1, carreras: 99,
    equipos: ["BMW Sauber", "Renault", "Williams", "Alfa Romeo"],
    resumen: "El primer polaco de la F1. Ganó en Canadá 2008 y muchos lo veían como futuro campeón, hasta que un accidente de rally cambió todo.",
    datos: [
      "En 2011, en un rally, un guardarraíl atravesó su auto y casi pierde el brazo derecho.",
      "Ocho años después volvió a correr en la F1 con Williams."
    ]
  },
  {
    id: "sebastian-vettel",
    nombre: "Sebastian Vettel",
    apodo: null,
    pais: "Alemania", bandera: "🇩🇪",
    nacimiento: 1987, fallecimiento: null,
    titulos: [2010, 2011, 2012, 2013],
    victorias: 53, poles: 57, carreras: 299,
    equipos: ["BMW Sauber", "Toro Rosso", "Red Bull", "Ferrari", "Aston Martin"],
    resumen: "Cuatro títulos seguidos con Red Bull y el campeón más joven de la historia (23 años en 2010). Después corrió en Ferrari, el equipo de su ídolo Schumacher.",
    datos: [
      "Sumó un punto en su primera carrera, Estados Unidos 2007, reemplazando a Kubica.",
      "Le pone nombre de mujer a cada auto que maneja.",
      "Se retiró en 2022 y se dedica a causas ambientales."
    ]
  },
  {
    id: "valtteri-bottas",
    nombre: "Valtteri Bottas",
    apodo: null,
    pais: "Finlandia", bandera: "🇫🇮",
    nacimiento: 1989, fallecimiento: null,
    titulos: [],
    victorias: null, poles: null, carreras: null,
    equipos: ["Williams", "Mercedes", "Alfa Romeo", "Sauber", "Cadillac"],
    resumen: "Cinco años compañero de Lewis Hamilton en Mercedes, con el que ganó cinco títulos de constructores. Antes se hizo conocido en Williams.",
    datos: [
      "Ganó 10 carreras con Mercedes y fue subcampeón en 2019 y 2020.",
      "Eligió el número 77 cuando empezaron los números fijos, en 2014."
    ]
  }
];
