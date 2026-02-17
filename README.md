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

## Nota importante sobre GitHub Pages

Este sitio está preparado con rutas **relativas** para funcionar correctamente cuando se publica como
`https://usuario.github.io/nombre-del-repo/` (project pages).

Si cambias archivos manualmente, evita usar rutas absolutas como `/assets/...` o `/pdfs/...` porque en project pages apuntan al dominio raíz y rompen imágenes/PDFs.

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

## Si no se ven imágenes o PDFs

1. Revisa que los archivos estén subidos con los nombres exactos en `assets/img/` y `pdfs/`.
2. Espera 1-2 minutos a que GitHub Pages regenere y recarga con `Ctrl + F5`.
3. Este sitio también intenta fallback automático si subiste imágenes en `assets/` o PDFs en `PDFs/`, pero lo recomendado es mantener la estructura oficial.

4. Si abres una página de proyecto manualmente, usa siempre la URL con el nombre del repo, por ejemplo: `https://usuario.github.io/web/pages/mp4.html` (no `https://usuario.github.io/pages/mp4.html`).
