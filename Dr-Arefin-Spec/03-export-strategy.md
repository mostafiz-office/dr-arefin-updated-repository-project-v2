# Export Strategy — Dr. Arefin

## Build target
- **React + Vite + TypeScript + Tailwind + shadcn/ui** (same stack as CAF)
- **English-only** (no i18n)
- **No WordPress / Elementor static export** in initial scope (CAF has one; Dr-Arefin does not require it)

## If WordPress export is added later
Inherit the entire CAF export architecture verbatim (`spec/01-app/export-strategy.md`):
- Static blocks under `public/elementor-export/blocks/`
- All wrappers reset to `width: 100%`
- `.container` enforced with `box-sizing: border-box` + `max-width: 1248px` + `padding: 1.5rem`
- High-specificity selectors (`body.wp-theme-astra .entry-content ...`) instead of `!important`
- Kebab-case CSS class naming
- Vanilla JS for interactivity (no framework runtime in WP)

## Asset hosting
- Logo + images: import from `src/assets/` in React build
- Source logo: https://drarefin.com/wp-content/uploads/2026/04/logos.png (download to `src/assets/logo.png`)
- Hero/gallery photography: download from source `wp-content/uploads/` paths during page-spec phase

## SEO/sitemap
- Generate `public/sitemap.xml` with all 12 pages + 62 article URLs (when blog is built)
- `public/robots.txt` allowing all crawlers
- Per-page meta + JSON-LD via `react-helmet-async` (already in CAF)