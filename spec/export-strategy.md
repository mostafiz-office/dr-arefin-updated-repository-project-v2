# Export Strategy

## Static HTML/CSS Export
Located in `public/elementor-export/` for Elementor compatibility.

### Naming Convention
- CSS classes use hyphen-based (kebab-case) naming: `.btn-primary`, `.nav-link`
- All page content wrapped in `.caff_site` div
- Content blocks marked with `.caff_block`

### Technology
- Lucide Icons via CDN (unpkg)
- Vanilla JavaScript for interactivity (sticky header, mobile menu, FAQ accordion)
- No inline styles — all styling via external CSS files
- Dependent on Astra global CSS variables
- CSS files intended for HFCM/WPCode paste must be HTML-snippet safe: exactly one `<style>` tag at the first line and one `</style>` tag at EOF. Never close the style block before appended CSS.

### Files
- `public/elementor-export/global.css` — shared styles
- `public/elementor-export/blog.css` — blog-specific styles
- `public/elementor-export/index.html` — homepage
- `public/elementor-export/chi-siamo.html` — about page
- `public/elementor-export/servizi.html` — services page
- `public/elementor-export/contatto.html` — contact page
