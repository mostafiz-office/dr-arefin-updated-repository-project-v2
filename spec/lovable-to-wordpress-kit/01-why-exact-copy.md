# 01 — Why an Exact Copy (and not a rebuild)

## What fails: hand-rebuilding
Earlier attempts copied the preview's markup into WordPress/Elementor, then re-wrote CSS and re-created animations by hand. Every pass drifted:
- Theme CSS (fonts, gutters, heading sizes, button resets) leaked into pages.
- `wpautop` and page builders inserted `<p>`/`<br>` and wrappers that broke layouts.
- Tailwind classes, CSS variables and React interactions (menus, tabs, count-ups, sticky CTAs) had to be re-implemented and were never identical.
- SEO plugins replaced the page title/description.
- Each content change in the preview required redoing the WordPress copy.

## What works: serve the real build
The Lovable preview is already a production-quality app. TanStack Start can **prerender** each route to a full HTML document (all text, headings, meta tags) plus hashed JS/CSS bundles. If WordPress outputs *that exact document*, the browser receives the same bytes the preview would serve, so pixels and behaviour match by construction.

## Rules
1. Never edit the generated HTML/CSS/JS by hand for WordPress.
2. All content changes happen in the Lovable source, then redeploy.
3. WordPress keeps its pages (IDs, slugs, admin), only the front-end output is replaced.
4. The original `post_content` is never touched, so rollback is just clearing one field.
