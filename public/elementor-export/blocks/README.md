# Blocks — Copy-Paste Guide

Each `.html` file = the inner markup of **one** Elementor HTML widget.
Do NOT include `<html>`, `<head>`, `<body>` wrappers — those are owned by WordPress/Astra.

## Order

### Global (added once via WP template)
- `global/header.html` — sticky dark header with mobile drawer
- `global/footer.html` — cool blue-black footer
- `global/cta-band.html` — reusable CTA band (drop on any page that needs it)

### Homepage (`home/`)
1. `01-hero.html` — interactive organ hero with `<h1>`
2. `02-value-proposition.html`
3. `03-about.html`
4. `04-initiatives.html`
5. `05-videos.html`
6. `06-metrics.html`
7. `07-cta-band-transform.html`
8. `08-services-sticky-stack.html`
9. `09-patient-stories.html`
10. `11-final-cta.html`

> **Note:** Sections 10 (Testimonials) and 12 (FAQ) were dropped to match the React source 1:1.

## Prerequisites
- `global.css` enqueued globally.
- `arefin-interactivity.js` enqueued in the footer.
- Astra page template = **Elementor Full Width**.

## Per-page `<head>` snippets (WPCode)
Inject per route via WPCode "Page-specific" snippet:
- Homepage: see `Dr-Arefin-Spec/wordpress-export/snippets/home-head.html` (TODO)
  - `<title>`, `<meta name="description">`, canonical, og:*, JSON-LD `Physician` graph

## House rules
- No `!important`, no inline styles.
- Kebab-case classes, all prefixed `arefin-`.
- Internal links: relative + trailing slash (`/about/`).
- Use semantic HTML5 landmarks (see `Dr-Arefin-Spec/wordpress-export/02-authoring-rules.md`).
