# Roberto Ibáñez Mingarro — Engineering Portfolio Website

A production-ready static portfolio site built with **vanilla HTML, CSS, and JavaScript**, designed to be deployed on **GitHub Pages** (project site mode).

The project showcases embedded systems case studies with a documentation-first approach: architecture decisions, implementation evidence, and technical deliverables (PDF dossiers).

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Live Site & Deployment Target](#live-site--deployment-target)
3. [Core Features](#core-features)
4. [Technology Stack](#technology-stack)
5. [Repository Architecture](#repository-architecture)
6. [Page Map](#page-map)
7. [Asset and PDF Management](#asset-and-pdf-management)
8. [GitHub Pages Compatibility Strategy](#github-pages-compatibility-strategy)
9. [Local Development](#local-development)
10. [Customization Guide](#customization-guide)
11. [Quality and Maintenance Checklist](#quality-and-maintenance-checklist)
12. [Troubleshooting](#troubleshooting)
13. [License and Ownership](#license-and-ownership)

---

## Project Overview

This repository contains a personal engineering portfolio site focused on:

- Embedded systems projects
- Hardware/firmware co-design documentation
- FPGA and CMOS digital design work
- Recruiter-friendly resume and contact pages

The site follows a **static-first architecture**:

- no build system required
- no framework runtime dependencies
- straightforward hosting on GitHub Pages, Netlify, or any static server

---

## Live Site & Deployment Target

This project is configured for **GitHub Pages project URLs**, typically:

```text
https://<username>.github.io/<repository-name>/
```

All linking conventions in the codebase are intentionally relative (or include runtime fallback logic) to keep pages functional when served from a repository subpath.

---

## Core Features

- Responsive marketing-style landing page with project cards.
- Dedicated project pages for:
  - MP4 reverse engineering
  - Autonomous sailboat control (STM32)
  - Digital wattmeter design
  - 8-bit pipelined RISC CPU (VHDL + FPGA)
  - Full-custom CMOS counter
- Resume page with direct PDF access.
- Contact page with one-click email copy behavior.
- Mobile navigation toggle.
- Runtime fallback logic for image/PDF path variants.
- GitHub Pages route correction when pages are opened from an incorrect root path.

---

## Technology Stack

- **HTML5** for semantic structure
- **CSS3** (`styles.css` + `responsive.css`) for layout and responsiveness
- **Vanilla JavaScript** (`js/main.js`) for navigation and client-side resilience helpers
- **Google Fonts** (`Inter`, `League Gothic`)
- Static assets: JPG/PNG/WebP images and PDF portfolios

---

## Repository Architecture

```text
.
├── index.html
├── googlea5635c1b2047652e.html
├── README.md
├── css/
│   ├── styles.css
│   └── responsive.css
├── js/
│   └── main.js
├── pages/
│   ├── portfolio.html
│   ├── resume.html
│   ├── contact.html
│   ├── mp4.html
│   ├── sailboat.html
│   ├── wattmeter.html
│   ├── cpu.html
│   └── cmos-counter.html
├── assets/
│   ├── img/...
│   └── pdf/...
└── pdfs/
    ├── Roberto_Ibanez_Mingarro_MSc.pdf
    ├── MP4_Portfolio.pdf
    ├── Sailboat_Portfolio.pdf
    ├── Wattmeter_Portfolio.pdf
    └── Portfolio_CMOS.pdf
```

> Note: There are PDF files in both `assets/pdf/` and `pdfs/` for compatibility with existing page links.

---

## Page Map

### Top-level entry

- `index.html`: Homepage with hero, positioning statement, project cards, and engineering background section.

### Main navigation pages

- `pages/portfolio.html`: Project directory/overview page.
- `pages/resume.html`: Resume content + downloadable PDF.
- `pages/contact.html`: Contact methods and quick actions.

### Project detail pages

- `pages/mp4.html`
- `pages/sailboat.html`
- `pages/wattmeter.html`
- `pages/cpu.html`
- `pages/cmos-counter.html`

Each project page is designed as a technical showcase and provides direct download/open actions for the corresponding PDF deliverable.

---

## Asset and PDF Management

### Images

Primary convention:

- `assets/img/...`

Recommendations:

- Keep filenames stable once referenced in HTML.
- Prefer lowercase filenames with hyphen separation.
- Optimize heavy images before committing.

### PDFs

In-use locations:

- `pdfs/...`
- `assets/pdf/...`

For long-term maintainability, choose one canonical location for new content (recommended: `pdfs/`) and update links consistently.

---

## GitHub Pages Compatibility Strategy

The JavaScript runtime (`js/main.js`) includes defensive logic for real-world Pages issues:

1. **Route correction** for wrongly opened `/pages/...` paths on `github.io` domains.
2. **Repository-name guessing** with fallback to `web` when path segments are ambiguous.
3. **Image fallback candidate resolution** (alternate folders and extensions).
4. **PDF fallback candidate resolution** (`pdfs` vs `PDFs`, filename variants).
5. **Hero image dynamic selection** across likely asset paths.

This increases robustness for deployments where assets were uploaded with minor naming/path differences.

---

## Local Development

From repository root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Why this matters:

- Avoids CORS/file-origin limitations you can hit when opening HTML directly via `file://`.
- Preserves relative path behavior close to production.

---

## Customization Guide

### 1) Update profile content

Edit:

- `index.html`
- `pages/resume.html`
- `pages/contact.html`

### 2) Add or replace a project

1. Duplicate an existing project page in `pages/`.
2. Update title, text, and media references.
3. Add/update project card links in:
   - `index.html`
   - `pages/portfolio.html`
4. Add PDF artifacts in the chosen canonical directory and update CTA links.

### 3) Update styling

- Global styling: `css/styles.css`
- Responsive overrides: `css/responsive.css`

### 4) Update interactions

- Navigation/fallback behavior: `js/main.js`
- Page-specific micro-interactions can stay inline if tightly scoped (as currently done on `contact.html`).

---

## Quality and Maintenance Checklist

Before publishing changes:

- [ ] Verify all navigation links from every page.
- [ ] Confirm project card thumbnails load correctly.
- [ ] Validate every “Download PDF” and “Open PDF in new tab” action.
- [ ] Test responsive behavior (mobile menu + layout breakpoints).
- [ ] Test on GitHub Pages URL format (`/<repo>/...`).
- [ ] Hard refresh after deploy (`Ctrl/Cmd + Shift + R`).

Recommended periodic improvements:

- Unify language attributes/content (several pages use `lang="es"` while content is mostly English).
- Consolidate PDF storage into one directory.
- Add basic automated link checking in CI.
- Add Open Graph and Twitter meta tags for better social sharing previews.

---

## Troubleshooting

### Images or PDFs do not load

1. Check exact filename, extension, and case sensitivity.
2. Confirm the referenced path matches the actual folder (`assets/img`, `pdfs`, or `assets/pdf`).
3. If deployed on GitHub Pages, ensure URL includes repo segment.
4. Wait 1–2 minutes for Pages rebuild/cache propagation.
5. Hard refresh browser cache.

### Project pages open locally but not on GitHub Pages

- This usually indicates root-relative path assumptions (`/assets/...`) somewhere in custom edits.
- Prefer relative links from each page location.

### Mobile menu is not toggling

- Ensure `js/main.js` is loaded.
- Verify `.menu-toggle` and `#mobile-menu` exist in page markup.

---

## License and Ownership

This repository represents personal portfolio content and engineering documentation by Roberto Ibáñez Mingarro.

If you plan to reuse structure or styling, request permission first and remove personal branding/assets.
