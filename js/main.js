const bodyPage = document.body.dataset.page;

document.querySelectorAll('[data-nav]').forEach((link) => {
  if (link.dataset.nav === bodyPage) link.classList.add('active');
});

const toggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.hidden = expanded;
  });
}

async function initPdfEmbed() {
  const wrapper = document.querySelector('[data-pdf-page]');
  if (!wrapper) return;

  const src = wrapper.dataset.pdfSrc;
  const title = wrapper.dataset.pdfTitle || 'PDF document';
  const viewer = wrapper.querySelector('.pdf-viewer');
  const missing = wrapper.querySelector('.pdf-missing');

  try {
    const response = await fetch(src, { method: 'HEAD' });
    if (!response.ok) throw new Error('Missing PDF');

    const iframe = document.createElement('iframe');
    iframe.className = 'pdf-frame';
    iframe.src = `${src}#view=FitH`;
    iframe.title = `${title} viewer`;
    viewer.appendChild(iframe);
  } catch {
    if (missing) missing.hidden = false;
    const fallback = document.createElement('p');
    fallback.className = 'small';
    fallback.innerHTML = `No se pudo cargar el visor. Puedes descargar el archivo directamente desde el botón “Download PDF”.`;
    viewer.appendChild(fallback);
  }
}

initPdfEmbed();
