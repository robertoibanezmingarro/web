const GITHUB_PAGES_RESERVED_SEGMENTS = new Set(['', 'pages', 'assets', 'css', 'js', 'pdfs', 'PDFs']);
const REPO_FALLBACK_NAME = 'web';

function guessRepoSegment() {
  const segment = window.location.pathname.split('/').filter(Boolean)[0] || '';
  return GITHUB_PAGES_RESERVED_SEGMENTS.has(segment) ? REPO_FALLBACK_NAME : segment;
}

function fixGithubPagesRootPath() {
  if (!window.location.hostname.endsWith('github.io')) return;

  const path = window.location.pathname;
  if (path.startsWith('/pages/')) {
    const repo = guessRepoSegment();
    window.location.replace(`/${repo}${path}${window.location.search}${window.location.hash}`);
  }
}

fixGithubPagesRootPath();

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
  for (const path of [...new Set(paths.filter(Boolean))]) {
    // eslint-disable-next-line no-await-in-loop
    if (await headExists(path)) return path;
  }
  return null;
};

function buildImageCandidates(src) {
  const candidates = [src];
  const replacements = [
    [/(^|\/)assets\/img\//, '$1assets/'],
    [/(^|\.\.)\/assets\/img\//, '$1/assets/'],
    [/\-thumb(?=\.[a-zA-Z0-9]+$)/, ''],
    [/\.jpg$/i, '.jpeg'],
    [/\.jpg$/i, '.png'],
    [/\.jpeg$/i, '.jpg'],
    [/\.png$/i, '.jpg'],
  ];

  for (const [pattern, replacement] of replacements) {
    candidates.push(src.replace(pattern, replacement));
  }

  return [...new Set(candidates)];
}

function initImageFallbacks() {
  document.querySelectorAll('img').forEach((img) => {
    const queue = buildImageCandidates(img.getAttribute('src') || '');
    const tried = new Set();

    const tryNext = () => {
      const nextSrc = queue.find((candidate) => candidate && !tried.has(candidate));
      if (!nextSrc) {
        img.classList.add('asset-missing');
        return;
      }
      tried.add(nextSrc);
      img.setAttribute('src', nextSrc);
    };

    img.addEventListener('error', tryNext);
  });
}

async function initHeroFallback() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const repo = guessRepoSegment();
  const heroCandidates = [
    'assets/img/hero.jpg',
    './assets/img/hero.jpg',
    'assets/hero.jpg',
    './assets/hero.jpg',
    `/${repo}/assets/img/hero.jpg`,
    `/${repo}/assets/hero.jpg`,
  ];

  const resolvedHero = await firstExistingPath(heroCandidates);
  if (resolvedHero) hero.style.backgroundImage = `url('${resolvedHero}')`;
}

function buildPdfCandidates(src) {
  return [
    src,
    src.replace('/pdfs/', '/PDFs/'),
    src.replace('../pdfs/', '../PDFs/'),
    src.replace('.pdf', '.PDF'),
    src.replace('_Portfolio.pdf', '.pdf'),
    src.replace('_Portfolio.pdf', '_portfolio.pdf'),
  ];
}

async function initPdfEmbed() {
  const wrapper = document.querySelector('[data-pdf-page]');
  if (!wrapper) return;

  const src = wrapper.dataset.pdfSrc;
  const title = wrapper.dataset.pdfTitle || 'PDF document';
  const viewer = wrapper.querySelector('.pdf-viewer');
  const missing = wrapper.querySelector('.pdf-missing');

  const resolvedPdf = await firstExistingPath(buildPdfCandidates(src));

  if (resolvedPdf) {
    const iframe = document.createElement('iframe');
    iframe.className = 'pdf-frame';
    iframe.src = `${resolvedPdf}#view=FitH&zoom=85`;
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
