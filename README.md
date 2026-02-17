# Roberto Ibáñez Mingarro Portfolio (GitHub Pages)

Sitio estático listo para publicarse en GitHub Pages con HTML/CSS/JS puro.

## Estructura

```text
/
  index.html
  /pages
    portfolio.html
    resume.html
    mp4.html
    sailboat.html
    wattmeter.html
    contact.html
  /css/styles.css
  /js/main.js
  /assets/img
    hero.jpg
    mp4-thumb.jpg
    sailboat-thumb.jpg
    wattmeter-thumb.jpg
    resume-thumb.jpg
  /pdfs
    Roberto_Ibanez_Mingarro_MSc.pdf
    MP4_Portfolio.pdf
    Sailboat_Portfolio.pdf
    Wattmeter_Portfolio.pdf
```

## Cómo añadir contenido

1. Coloca imágenes en `assets/img/` con los nombres indicados arriba.
2. Coloca los PDFs exactos en `pdfs/` con estos nombres:
   - `Roberto_Ibanez_Mingarro_MSc.pdf`
   - `MP4_Portfolio.pdf`
   - `Sailboat_Portfolio.pdf`
   - `Wattmeter_Portfolio.pdf`
3. Haz commit y push.

> Las páginas de proyecto muestran el PDF original embebido. Si falta un archivo, verás un aviso y un botón de descarga.

## Deploy en GitHub Pages

### Opción A (Branch deploy)

1. Sube el repositorio a GitHub.
2. Ve a **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Elige la rama (`main` o la que uses) y carpeta `/ (root)`.
5. Guarda y espera la URL pública.

### Opción B (GitHub Actions)

Si prefieres Actions, crea un workflow de Pages y publica el contenido estático de este root.

## Desarrollo local

Desde la raíz del repo:

```bash
python3 -m http.server 8000
```

Abre `http://localhost:8000`.
