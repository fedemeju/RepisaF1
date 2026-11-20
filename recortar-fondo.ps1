param([string]$src, [string]$dest, [int]$sat = 28, [int]$lum = 120, [int]$sombra = 1, [string]$mascara = "", [string]$png = "")
# Saca el fondo gris de estudio de una foto de catálogo, centra el auto y lo pone sobre blanco.
#
# Uso (PowerShell):  .\recortar-fondo.ps1 repisa-salvat\04-3.jpg salida.jpg -png repisa-salvat\recorte\04-3.png
#   -png   el auto solo, con fondo transparente (lo que usa la repisa 3D; anotalo en data/repisa.js → recortes)
#   -sat / -lum  qué cuenta como fondo (gris poco saturado y claro); bajalos si se come partes plateadas del auto
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.Collections.Generic;
public static class Fondo {
  public static int HUECO = 30;
  public static string Run(string src, string dest, int SAT, int LUM, bool sombra, string maskOut, string pngOut) {
    int huecos = 0;
    Bitmap bmp;
    using (var tmp = new Bitmap(src)) bmp = new Bitmap(tmp);
    int w = bmp.Width, h = bmp.Height;
    var R = new int[w*h]; var G = new int[w*h]; var B = new int[w*h];
    for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) { var c = bmp.GetPixel(x, y); int i = y*w+x; R[i]=c.R; G[i]=c.G; B[i]=c.B; }
    Func<int,bool> esFondo = i => {
      int mx = Math.Max(R[i], Math.Max(G[i], B[i])), mn = Math.Min(R[i], Math.Min(G[i], B[i]));
      return (mx - mn) <= SAT && (R[i]+G[i]+B[i])/3 >= LUM;
    };
    // 1) fondo = lo que se conecta con el borde y parece fondo (gris, poco saturado, claro)
    var bg = new bool[w*h]; var q = new Queue<int>();
    for (int x = 0; x < w; x++) { foreach (int i in new[]{ x, (h-1)*w+x }) if (!bg[i] && esFondo(i)) { bg[i]=true; q.Enqueue(i); } }
    for (int y = 0; y < h; y++) { foreach (int i in new[]{ y*w, y*w+w-1 }) if (!bg[i] && esFondo(i)) { bg[i]=true; q.Enqueue(i); } }
    while (q.Count > 0) {
      int i = q.Dequeue(), x = i % w, y = i / w;
      int[] nb = { x>0?i-1:-1, x<w-1?i+1:-1, y>0?i-w:-1, y<h-1?i+w:-1 };
      foreach (int j in nb) if (j >= 0 && !bg[j] && esFondo(j)) { bg[j]=true; q.Enqueue(j); }
    }
    // 1b) huecos encerrados (dentro del aro, debajo del alerón): fondo si tienen el mismo color que el fondo de esa altura
    var filaR = new double[h]; var filaG = new double[h]; var filaB = new double[h];
    for (int y = 0; y < h; y++) { double sr=0, sg=0, sb=0; int n=0; for (int x = 0; x < w; x++) { int i=y*w+x; if (bg[i]) { sr+=R[i]; sg+=G[i]; sb+=B[i]; n++; } }
      if (n > 0) { filaR[y]=sr/n; filaG[y]=sg/n; filaB[y]=sb/n; } else if (y > 0) { filaR[y]=filaR[y-1]; filaG[y]=filaG[y-1]; filaB[y]=filaB[y-1]; } }
    var visto = new bool[w*h];
    Func<int,bool> comoFondo = i => { int y = i / w; return Math.Abs(R[i]-filaR[y]) + Math.Abs(G[i]-filaG[y]) + Math.Abs(B[i]-filaB[y]) < HUECO; };
    for (int s = 0; s < w*h; s++) {
      if (bg[s] || visto[s] || !comoFondo(s)) continue;
      var pix = new List<int>(); q.Enqueue(s); visto[s] = true;
      while (q.Count > 0) { int i = q.Dequeue(), x = i % w, y = i / w; pix.Add(i);
        int[] nb = { x>0?i-1:-1, x<w-1?i+1:-1, y>0?i-w:-1, y<h-1?i+w:-1 };
        foreach (int j in nb) if (j >= 0 && !bg[j] && !visto[j] && comoFondo(j)) { visto[j] = true; q.Enqueue(j); } }
      if (pix.Count < 6) continue;
      int parecidos = 0;
      foreach (int i in pix) { int y = i / w; double d = Math.Abs(R[i]-filaR[y]) + Math.Abs(G[i]-filaG[y]) + Math.Abs(B[i]-filaB[y]); if (d < HUECO) parecidos++; }
      if (parecidos >= pix.Count * 0.7) { huecos++; foreach (int i in pix) bg[i] = true; }
    }
    // 2) quedarse solo con las manchas grandes (el auto), sacar puntitos sueltos
    var comp = new int[w*h]; int nc = 0; var tam = new List<int>{0};
    for (int s = 0; s < w*h; s++) {
      if (bg[s] || comp[s] != 0) continue;
      nc++; int n = 0; q.Enqueue(s); comp[s] = nc;
      while (q.Count > 0) { int i = q.Dequeue(), x = i % w, y = i / w; n++;
        int[] nb = { x>0?i-1:-1, x<w-1?i+1:-1, y>0?i-w:-1, y<h-1?i+w:-1 };
        foreach (int j in nb) if (j >= 0 && !bg[j] && comp[j] == 0) { comp[j] = nc; q.Enqueue(j); } }
      tam.Add(n);
    }
    int mayor = 0; for (int t = 1; t <= nc; t++) mayor = Math.Max(mayor, tam[t]);
    var car = new float[w*h];
    for (int i = 0; i < w*h; i++) car[i] = (!bg[i] && tam[comp[i]] >= mayor * 0.02) ? 1f : 0f;
    // 3) borde suave: promedio 3x3 de la máscara
    var a = new float[w*h];
    for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) {
      float s = 0; int n = 0;
      for (int dy = -1; dy <= 1; dy++) for (int dx = -1; dx <= 1; dx++) { int xx = x+dx, yy = y+dy; if (xx<0||yy<0||xx>=w||yy>=h) continue; s += car[yy*w+xx]; n++; }
      a[y*w+x] = car[y*w+x] > 0 ? 0.35f + 0.65f * s/n : 0f;
    }
    // 4) recorte al auto
    int x0=w, y0=h, x1=-1, y1=-1;
    for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) if (car[y*w+x] > 0) { if (x<x0)x0=x; if(x>x1)x1=x; if(y<y0)y0=y; if(y>y1)y1=y; }
    int cw = x1-x0+1, ch = y1-y0+1;
    var recorte = new Bitmap(cw, ch, PixelFormat.Format32bppArgb);
    for (int y = 0; y < ch; y++) for (int x = 0; x < cw; x++) {
      int i = (y0+y)*w + x0+x; float al = a[i];
      recorte.SetPixel(x, y, Color.FromArgb((int)(al*255), R[i], G[i], B[i]));
    }
    if (pngOut != "") recorte.Save(pngOut, ImageFormat.Png);
    if (maskOut != "") {
      var m = new Bitmap(w, h);
      for (int i = 0; i < w*h; i++) { int v = (int)(a[i]*255); m.SetPixel(i%w, i/w, Color.FromArgb(v,v,v)); }
      m.Save(maskOut, ImageFormat.Png); m.Dispose();
    }
    // 5) lienzo blanco del mismo tamaño, auto centrado (ocupa ~90% del ancho o ~78% del alto)
    double k = Math.Min(w * 0.90 / cw, h * 0.78 / ch);
    int dw = (int)Math.Round(cw*k), dh = (int)Math.Round(ch*k), ox = (w-dw)/2, oy = (h-dh)/2;
    var outb = new Bitmap(w, h, PixelFormat.Format24bppRgb);
    using (var g = Graphics.FromImage(outb)) {
      g.Clear(Color.White);
      g.InterpolationMode = InterpolationMode.HighQualityBicubic; g.PixelOffsetMode = PixelOffsetMode.HighQuality; g.SmoothingMode = SmoothingMode.HighQuality;
      if (sombra) {
        // sombra suave debajo, para que el auto no flote
        var r = new RectangleF(ox + dw*0.04f, oy + dh - dh*0.10f, dw*0.92f, dh*0.18f);
        using (var path = new GraphicsPath()) { path.AddEllipse(r);
          using (var br = new PathGradientBrush(path)) { br.CenterColor = Color.FromArgb(70, 0, 0, 0); br.SurroundColors = new[]{ Color.FromArgb(0, 0, 0, 0) }; g.FillPath(br, path); } }
      }
      using (var ia = new ImageAttributes()) { ia.SetWrapMode(WrapMode.TileFlipXY); g.DrawImage(recorte, new Rectangle(ox, oy, dw, dh), 0, 0, cw, ch, GraphicsUnit.Pixel, ia); }
    }
    var enc = Array.Find(ImageCodecInfo.GetImageEncoders(), e => e.MimeType == "image/jpeg");
    var ps = new EncoderParameters(1); ps.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 92L);
    outb.Save(dest, enc, ps);
    outb.Dispose(); recorte.Dispose(); bmp.Dispose();
    return string.Format("auto {0}x{1} en ({2},{3}); escala {4:0.00}; manchas {5}; huecos de fondo {6}", cw, ch, x0, y0, k, nc, huecos);
  }
}
"@
[Fondo]::Run($src, $dest, $sat, $lum, [bool]$sombra, $mascara, $png)

