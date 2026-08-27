# 02 — UI / UX Guidelines

> Reviewer angle: does the page feel calm, confident, and trustworthy on every device? Are interactions predictable and accessible?

---

## 1. Interaction rules

- **Hover**: color, border, shadow, text-shadow only. Never translate or scale (see `01` §5).
- **Focus**: visible focus ring on every interactive element (`focus-visible:ring-2 ring-ring ring-offset-2`).
- **Click target**: ≥ 44×44px on mobile.
- **Cursor**: `pointer` on actual interactive elements only.
- **Disabled state**: `opacity-50 pointer-events-none`. Never hide entirely.

---

## 2. Navigation

- Sticky header on all pages.
- Desktop nav ≥ 1024px; hamburger below.
- Active route visually distinguished (underline, color, or weight — pick one and stay consistent).
- Logo always links to `/`.
- All internal links: relative path **with trailing slash** (`/treatment/liver-surgery/`).

---

## 3. Mobile / Responsive

- Breakpoints: mobile <640, tablet 640–1023, desktop ≥1024.
- `overflow-x: hidden` on `html` and `body` (mandatory).
- No horizontal scroll on any page at any breakpoint.
- Test specifically at 375px, 768px, 1024px, 1440px.
- Tap targets, font size ≥ 14px on mobile body, ≥ 16px ideal.
- Hero illustrations may be cropped or hidden on mobile; never let them push the H1 below the fold.

---

## 4. Accessibility (WCAG 2.1 AA)

- Single `<h1>` per page.
- Heading order never skips levels (h1 → h2 → h3, no h1 → h4).
- All `<img>` need `alt` (decorative → `alt=""`).
- All form inputs have associated `<label>`.
- Color contrast meets 4.5:1 / 3:1 (see `01` §1.4).
- Color is never the only signal (icons + text on errors, not just red).
- Keyboard navigable: every action reachable via Tab + Enter.
- Skip-to-content link at top of `<body>`.
- ARIA only when no native semantic exists. Prefer `<button>`, `<nav>`, `<main>`, `<article>`, `<section>`.
- `prefers-reduced-motion` respected.

---

## 5. Loading & Performance

- Above-the-fold images: explicit `width`/`height` to prevent CLS.
- Lazy-load below-the-fold images and iframes.
- Fonts: `font-display: swap`, preload Ubuntu + Poppins primary weights.
- Avoid render-blocking JS in `<head>`.
- Tracking pixels: place `<noscript>` fallbacks in `<body>`, never in `<head>`.

---

## 6. Forms (UX)

- Label above input. Placeholder is not a label.
- Mark required fields explicitly.
- Inline validation on blur, not on every keystroke.
- Error message: text + icon, near the offending field, `text-destructive`.
- Submit state: disabled + spinner during request.
- Success: confirmation visible without scroll.

---

## 7. Empty / Error / Loading states

Every data-driven view must define all three. No blank screens.
