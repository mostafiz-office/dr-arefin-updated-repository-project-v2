# Export Strategy

> Moved from `/spec/export-strategy.md` — all app specs now live under `/spec/01-app/`

## Static HTML/CSS Export

Located in `public/elementor-export/` for Elementor compatibility.

### Critical CSS Rules for WordPress Deployment

1. **Every `.container` declaration MUST include**:
   - `box-sizing: border-box !important`
   - `padding-left: 1.5rem !important`
   - `padding-right: 1.5rem !important`
   - `max-width: 1280px !important`
   - `width: 100% !important`
   - `margin: 0 auto !important`

2. **All Astra/Elementor wrappers MUST be reset** to `width: 100% !important` with zero padding/margin. Target: `#page`, `.ast-container`, `#primary`, `.entry-content`, `article`, `.elementor`, `.e-con`, `.e-con-inner`, `.elementor-widget-container`.

3. **Use `!important` on all layout properties** — Astra theme uses `!important` internally and will override normal declarations.

### Naming Convention

- CSS classes use underscore-based naming: `.btn_primary`, `.nav_link`
- All page content wrapped in `.caff_site` div
- Content blocks marked with `.caff_block`

### Technology

- Lucide Icons via CDN (unpkg)
- Vanilla JavaScript for interactivity
- No inline styles — all styling via external CSS files

### Known Pitfalls and Prevention

See `/spec/02-app/issues/01-container-alignment-mismatch.md`
