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

const headExists = async (path) => {
  try {
    const response = await fetch(path, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

const firstExistingPath = async (paths) => {
  for (const path of paths) {
    // eslint-disable-next-line no-await-in-loop
    if (await headExists(path)) return path;
  }
  return null;
};

function initImageFallbacks() {
  document.querySelectorAll('img').forEach((img) => {
    const tried = new Set([img.getAttribute('src') || '']);

    img.addEventListener('error', () => {
      const currentSrc = img.getAttribute('src') || '';
      const candidates = [];

      if (currentSrc.includes('../assets/img/')) candidates.push(currentSrc.replace('../assets/img/', '../assets/'));
      if (currentSrc.includes('assets/img/')) candidates.push(currentSrc.replace('assets/img/', 'assets/'));

      const nextSrc = candidates.find((candidate) => !tried.has(candidate));
      if (nextSrc) {
        tried.add(nextSrc);
        img.setAttribute('src', nextSrc);
        return;
      }

      img.classList.add('asset-missing');
    });
  });
}

async function initHeroFallback() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const heroCandidates = [
    'assets/img/hero.jpg',
    './assets/img/hero.jpg',
    'assets/hero.jpg',
    './assets/hero.jpg',
  ];

  const resolvedHero = await firstExistingPath(heroCandidates);
  if (resolvedHero) {
    hero.style.backgroundImage = `url('${resolvedHero}')`;
  }
}

async function initPdfEmbed() {
  const wrapper = document.querySelector('[data-pdf-page]');
  if (!wrapper) return;

  const src = wrapper.dataset.pdfSrc;
  const title = wrapper.dataset.pdfTitle || 'PDF document';
  const viewer = wrapper.querySelector('.pdf-viewer');
  const missing = wrapper.querySelector('.pdf-missing');

  const pdfCandidates = [
    src,
    src.replace('../pdfs/', '../PDFs/'),
    src.replace('/pdfs/', '/PDFs/'),
  ];

  const resolvedPdf = await firstExistingPath(pdfCandidates);

  if (resolvedPdf) {
    const iframe = document.createElement('iframe');
    iframe.className = 'pdf-frame';
    iframe.src = `${resolvedPdf}#view=FitH`;
    iframe.title = `${title} viewer`;
    viewer.appendChild(iframe);
    return;
  }

  if (missing) missing.hidden = false;
  const fallback = document.createElement('p');
  fallback.className = 'small';
  fallback.innerHTML = 'No se pudo cargar el visor. Puedes descargar el archivo directamente desde el botón “Download PDF”.';
  viewer.appendChild(fallback);
}

initImageFallbacks();
initHeroFallback();
initPdfEmbed();
