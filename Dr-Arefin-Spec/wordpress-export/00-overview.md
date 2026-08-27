# Dr. Arefin — WordPress / Elementor Export

## Goal
Ship the **dark** Dr. Arefin React site as static HTML/CSS/JS blocks that paste into Elementor (Astra theme), 1:1 visual parity with the React preview at `/`.

## Stack on WordPress
- Theme: **Astra** (page template = *Elementor Full Width*)
- Builder: **Elementor** (Flexbox containers, **no theme styles**, no padding)
- One **HTML widget** per block file
- Global enqueue: `elementor-export/global.css` + `blocks/arefin-interactivity.js`
- Dynamic data (articles, FAQs): **WPCode** PHP shortcodes

## Hard rules (inherited from CAF + Dr. Arefin memory)
1. **Semantic HTML5 only** — `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`, `<details>/<summary>` for FAQ.
2. **Single `<h1>` per page** (hero). Section headings are `<h2>`, card titles `<h3>`.
3. **Kebab-case classes**, prefix `arefin-` for every custom class — never collides with Astra/Elementor.
4. **NO `!important`. NO inline styles.** Override Astra with selector chains: `body.wp-theme-astra .arefin .arefin-block ...`
5. **Two greens only**: `--arefin-primary-bright` `#14bb3e` (rest), `--arefin-primary-darker` `#079a14` (hover).
6. **Surface elevation**: dark section → light cards (`hsl(0 0% 97%)` bg, dark text). Light section → dark cards.
7. **`<strong>` in body**: `color: inherit; font-weight: inherit;`. Hover state = green + 1px text-shadow only.
8. **Hover = color/border/shadow only**. No `translateY/X/scale`.
9. **Sharp 0-blur shadow** on card hover: `4px 4px 0 0 hsl(0 0% 0% / 0.35)`.
10. **Atto card hover**: 3px green left border on hover + dark-green title.
11. **Inline SVGs** for critical icons (no icon-library JS).
12. **Relative internal links** with trailing slash: `/about/`, `/treatment/liver-surgery/`.
13. **Fluid type ramp** via `clamp()` tokens (`--arefin-fs-h1` … `--arefin-fs-body`). Never hardcoded `font-size` on headings.
14. **Container**: `max-width: 1248px; padding: 0 1.5rem; box-sizing: border-box; margin: 0 auto;`
15. **All Astra/Elementor wrappers** between `body` and `.arefin-block` reset to `width: 100%`, zero padding/margin.

## SEO baseline per block
- Every `<section>` has `aria-labelledby` referencing its `<h2>` id.
- Every `<img>` has `alt`, `loading="lazy"` (except hero LCP image which uses `fetchpriority="high"`).
- Every `<a>` has descriptive `title` attribute.
- Section anchor ids are stable slugs (`#hero`, `#about`, `#services`).
- JSON-LD `Physician` graph is injected once in the page `<head>` (WPCode snippet).

## Folder layout
See `01-folder-structure.md`.

## Authoring rules
See `02-authoring-rules.md`.
