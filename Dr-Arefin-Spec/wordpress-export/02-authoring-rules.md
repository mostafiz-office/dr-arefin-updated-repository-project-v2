# Authoring Rules — Dr. Arefin Elementor Export

## HTML
- HTML5 doctype implied (Astra ships it).
- Use semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- Use `<figure>` + `<figcaption>` for images that have captions.
- Use `<details>` + `<summary>` for FAQ accordion — works without JS.
- Use `<button>` for interactive non-link elements (mobile nav toggle, carousel arrows).
- Every section: `<section id="<slug>" class="arefin-block arefin-<section-name>" aria-labelledby="<slug>-title">`.
- The `<h2>` inside that section gets `id="<slug>-title"`.

## CSS
- All custom classes prefixed `arefin-`.
- Kebab-case only (`arefin-card-title`, not `arefinCardTitle`).
- Tokens live in `:root` inside `global.css`. Components consume tokens only.
- NO `!important`. To beat Astra/Elementor:
  ```css
  body.wp-theme-astra .arefin .arefin-card-title { color: hsl(0 0% 95%); }
  ```
- Dark tokens are the **default** (Dr. Arefin ships dark). A light scope can be added later with `.arefin-light { ... }`.

## Tokens (excerpt)
```
--arefin-bg:              hsl(150 18% 8%);
--arefin-bg-darker:       hsl(150 18% 5%);
--arefin-bg-deepest:      hsl(220 18% 6%);    /* footer */
--arefin-fg:              hsl(0 0% 95%);
--arefin-fg-muted:        hsl(0 0% 75%);
--arefin-card-bg:         hsl(0 0% 97%);       /* light cards on dark sections */
--arefin-card-fg:         hsl(150 25% 12%);
--arefin-card-border:     hsl(140 10% 85%);
--arefin-primary-bright:  hsl(131 87% 41%);    /* #14bb3e — rest */
--arefin-primary-darker:  hsl(131 87% 32%);    /* #079a14 — hover */
--arefin-hover-shadow:    0 0 0;                /* sharp directional */
--arefin-radius:          0.875rem;
--arefin-container:       1248px;
--arefin-fs-h1:  clamp(2.25rem, 1.4rem + 3.5vw, 4.25rem);
--arefin-fs-h2:  clamp(1.875rem, 1.3rem + 2.4vw, 3.25rem);
--arefin-fs-h3:  clamp(1.25rem, 1.05rem + 0.9vw, 1.75rem);
--arefin-fs-lede: clamp(1.0625rem, 0.95rem + 0.55vw, 1.25rem);
--arefin-fs-body: clamp(1rem, 0.95rem + 0.2vw, 1.0625rem);
```

## Accessibility
- Color contrast ≥ 4.5:1 body, ≥ 3:1 large text.
- Every interactive element keyboard-focusable; visible focus ring (`outline: 2px solid var(--arefin-primary-bright); outline-offset: 2px;`).
- `aria-current="page"` on active nav link.
- `aria-expanded` on mobile nav toggle.
- `prefers-reduced-motion: reduce` disables all `transition`/`animation`.

## SEO
- One `<h1>` per page (hero).
- `<a>` tags get `title` attr matching the linked page topic.
- Internal links: relative + trailing slash.
- Images: descriptive `alt`, `loading="lazy"`, explicit `width`/`height` to prevent CLS.
- JSON-LD injected via WPCode snippet in `<head>`.
