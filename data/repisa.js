/*
  CÓMO ESTÁ ARMADA LA REPISA DE VERDAD (para la vista 3D)
  =======================================================
  10 filas × 6 columnas, de arriba a la izquierda hacia abajo a la derecha, igual que el mueble.
  Cada lugar: el id del auto (de data/autos.js) o null si el auto todavía no tiene ficha.
  La imagen de cada lugar es repisa-salvat/<fila>-<columna>.jpg (foto de catálogo); si no está,
  repisa/<fila>-<columna>.webp (recortada de la foto del mueble).
  Si movés un auto de lugar en el mueble, lo más fácil es reordenarlo en la app (repisa 3D → ⇄ o mantener
  apretado un auto): ese orden se guarda en cada celu/compu y cada auto sigue usando la foto de su lugar
  original de esta lista. Para que el orden nuevo quede fijo en todos lados, hay que pasarlo acá
  (y renombrar las fotos de repisa/ y repisa-salvat/ para que coincidan con el lugar nuevo).
*/
window.REPISA = {
  filas: 10,
  columnas: 6,
  lugares: [
    ["375indy-1952-ascari", "w196-1955-fangio", "246f1-1958-hawthorn", "lotus25-1963-clark", "512f1-1964-bandini", "ra300-1967-surtees"],
    ["bt24-1967-hulme", "p153-1970-rodriguez", "p160b-1972-beltoise", "72d-1972-fittipaldi", "006-1973-stewart", "751-1975-brambilla"],
    ["bt44b-1975-pace", "308b-1975-hunt", "m23-1976-hunt", "p34-1976-scheckter", "312t2-1977-lauda", "bt46b-1978-lauda"],
    ["lotus79-1978-andretti", "js11-1979-laffite", "177-1979-giacomelli", "fw07-1979-regazzoni", "rs10-1979-jabouille", "a1b-1979-patrese"],
    ["bt49-1981-piquet", "126c2-1982-andretti", "011-1982-alboreto", "bt52b-1983-piquet", "tg184-1984-senna", "97t-1985-senna"],
    ["mp4-2b-1985-prost", "fw11b-1987-piquet", "191-1991-schumacher", "fw14b-1992-mansell", "mp4-8-1993-senna", "fw15c-1993-prost"],
    ["b194-1994-schumacher", "fw19-1997-villeneuve", "jordan199-1999-frentzen", "mp4-14-1999-hakkinen", "f399-1999-salo", "f2001-2001-schumacher"],
    ["f2002-2002-schumacher", "f2004-2004-barrichello", "c23-2004-massa", "r24-2004-trulli", "r25-2005-alonso", "f2007-2007-raikkonen"],
    ["mp4-23-2008-hamilton", "str3-2008-vettel", "ra106-2006-button", "f108-2008-kubica", "bgp001-2009-button", "rb9-2013-vettel"],
    ["f138-2013-alonso", "fw36-2014-bottas", "w05-2014-hamilton", "w11-2020-hamilton", "sf70h-2017-vettel", "rb18-2022-verstappen"]
  ],
  // Autos que están en el mueble pero todavía no tienen ficha: "fila-columna": "descripción"
  sinFicha: {},
  // Lugares con el auto recortado sin fondo (repisa-salvat/recorte/<fila>-<columna>.png, PNG transparente):
  // en la repisa 3D el auto va suelto a mitad de la caja, entre el fondo blanco y el acrílico.
  recortes: ["04-3"]
};
