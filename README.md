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

## Solución de problemas (PR y conflictos)

Si GitHub muestra `This branch has conflicts that must be resolved`, significa que tu rama del PR y `main` tienen cambios en los mismos archivos y GitHub no puede hacer merge automático.

### Qué hacer

1. Trae cambios de `main` a tu rama del PR y resuelve conflictos en local.
2. Haz commit de la resolución.
3. Haz push de la rama.
4. El PR se actualizará y desaparecerá el bloqueo de merge.

Ejemplo:

```bash
git checkout <tu-rama-pr>
git fetch origin
git merge origin/main
# resolver conflictos en los archivos indicados
git add .
git commit -m "Resolve merge conflicts with main"
git push origin <tu-rama-pr>
```

### Sobre el mensaje "placeholder PR message"

Si ves el texto `Codex generated this pull request...placeholder PR message`, no es un error de tu web: es solo la descripción automática del PR que falló al generarse.
Puedes editar el título y la descripción del PR manualmente desde GitHub sin afectar al código.
