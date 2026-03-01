# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm install              # Install dependencies (sass, vite)
npm run dev              # Compile SCSS then start Vite dev server
npm run build            # Compile SCSS then production build to /build/
npm run sass             # Watch SCSS and recompile on changes
npm run sass:build       # One-shot SCSS compilation
```

There are no tests or linting configured.

## Architecture

This is a static multi-page portfolio website using **vanilla HTML/CSS/JS** with **Vite** as the dev server/bundler and **Sass** for stylesheets. No frameworks.

### Key structural decisions

- **`dist/` is the source directory**, not a build artifact. Hand-authored HTML lives here and Vite's `root` is set to `dist/`. The actual production build output goes to `/build/`.
- **Vite multi-page setup**: `vite.config.js` declares all four HTML pages (`index.html`, `about.html`, `work.html`, `contact.html`) as Rollup entry points.
- **SCSS compiles into `dist/css/`**: The `sass` CLI compiles `scss/` → `dist/css/main.css`. This compiled CSS is committed to git alongside the HTML.

### SCSS organization

`scss/main.scss` imports partials in this order:
1. `_config.scss` — Color variables (Tailwind-inspired slate/sky/cyan palette), shadow/radius tokens, `set-text-color()` function
2. `_utilities.scss` — Layout primitives (`.container`, `.btn-*`, `.bg-*`, `.py-*`, `.section-title`, `.bottom-line`)
3. `_item_grid.scss` — Work/portfolio grid (`.projects-grid`, `.project-card`, `.work-filter`)
4. `_media.scss` — Responsive breakpoints at 1024px, 768px, and 500px

### JavaScript

Single file: `dist/js/typewriter.js` — a `TypeWriter` class that reads `data-words` (JSON array) and `data-wait` attributes from the `.txt-type` element on the home page. Only loaded by `index.html`.

### Known discrepancies (work in progress)

- **SCSS ahead of HTML**: The SCSS defines modern components (`.projects-grid`, `.tech-grid`, `.experience-timeline`, `.education-grid`, `.work-filter`) that don't yet exist in the HTML. The HTML still uses older markup patterns (`.items`/`.item`).
- **Font mismatch**: HTML loads `Dosis` via Google Fonts CDN, but SCSS specifies `Inter` (body) and `Space Grotesk` (headings) — neither of which are loaded.
- **Testimonial images**: `about.html` references `person1.jpg`–`person4.jpg` but the actual files in `dist/img/testimonials/` are named by real people (anu-thomas, chris-allen, etc.).
- **Contact form**: Uses Netlify Forms integration (`data-netlify="true"`) with reCaptcha.
