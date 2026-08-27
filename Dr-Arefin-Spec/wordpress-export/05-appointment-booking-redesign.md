# Appointment Booking Page — Redesign Spec

> Route: `/shop/appointment/` (WooCommerce **simple product** = "Dr Arefin Online Appointment")
> Goal: turn the generic WooCommerce product page into a credible, conversion-focused
> **online doctor consultation booking** page, matching international tele-health booking
> standards (Practo, Zocdoc, Doctolib, Teladoc, Amwell).
> Approach: **CSS-only restyle** (no PHP/markup changes), scoped under
> `body.wp-theme-astra.single-product`. Token source: `global.css`.
> Asset to update: `public/elementor-export/blocks/product/product.css`.

---

## 1. Current problems (from live screenshots, 2026-06-22)

Captured at `https://drarefin.com/shop/appointment/`:

| # | Severity | Problem |
|---|---|---|
| 1 | **Blocker** | **Description tab text is invisible** — light/white body text sits on a light-grey (`~hsl(210 20% 92%)`) panel. The Description / "What you get" / "How it works" copy is unreadable. The tab panel background is light but the brand text color is near-white → fails WCAG badly. |
| 2 | **High** | **Mobile horizontal overflow** — the gallery image is wider than the viewport, the H1 ("Dr Arefin Online Appointmen…") is clipped on the right, and the page scrolls sideways. |
| 3 | High | **Reads as a "product", not a booking** — no doctor credentials, no "what's included" checklist as cards, no reassurance (secure payment, refund, response time), no trust signals. It looks like buying a physical item. |
| 4 | Medium | Single static portrait with a lightbox magnifier — no supporting context (no badges, no rating, no "X consultations done"). |
| 5 | Medium | Price block is bare; no "per 20-min session" qualifier, no savings call-out on the `1,200 → 990` discount. |
| 6 | Medium | No visible booking steps / expectation setting above the fold (user must read a paragraph to learn it's a video call). |
| 7 | Low | Tabs (Description / Reviews) and meta are generic; "Reviews (0)" exposes emptiness — should be reframed as trust content. |

---

## 2. Reference patterns (international doctor booking)

Distilled from Zocdoc, Practo, Doctolib, Teladoc, Amwell:

1. **Sticky booking card** — price + CTA stay visible while scrolling (right column on
   desktop, sticky bottom bar on mobile).
2. **Doctor identity block** — name, specialty, hospital, credentials, rating/▶ count
   *above* the fold next to the photo.
3. **"What's included" as an icon checklist** — not a paragraph. (e.g. ✓ 20-min private
   video call, ✓ Secure Google Meet / Zoom link, ✓ Personalised advice, ✓ Follow-up note).
4. **3-step "How it works" strip** — Pay → Pick a slot → Join the call. Numbered, visual.
5. **Trust row under the CTA** — 🔒 Secure payment · ↺ Easy reschedule · ⏱ Reply within 24h.
6. **Session meta chips** — Duration · Mode (Video) · Language · Channel (Meet/Zoom).
7. **Clear value framing on price** — strike original, show savings ("Save ৳210"), qualify
   the unit ("/ 20-min session").
8. **Reassurance / FAQ** below the fold instead of an empty "Reviews (0)" tab.

---

## 3. Target layout

```text
DESKTOP ( > 900px )
┌───────────────────────────────────────────────────────────────┐
│  Breadcrumb                                                     │
│ ┌───────────────┐   ┌───────────────────────────────────────┐ │
│ │               │   │ CONSULTATION (eyebrow)                 │ │
│ │   Doctor      │   │ Dr Arefin Online Appointment (H1)      │ │
│ │   portrait    │   │ ★ rating · N consultations  (optional) │ │
│ │  (rounded,    │   │ [Video] [20 min] [English] [Meet/Zoom] │ │ <- meta chips
│ │   16px)       │   │                                        │ │
│ │               │   │ ~~৳1,200~~  ৳990  · Save ৳210          │ │
│ │  trust badges │   │ /20-min session                        │ │
│ │  under image  │   │ ┌───────────────────────────────────┐  │ │
│ └───────────────┘   │ │ What's included (✓ checklist card)│  │ │
│                     │ └───────────────────────────────────┘  │ │
│                     │ [ ▸ Book Appointment ]  (green pill)    │ │ <- sticky group
│                     │ 🔒 Secure · ↺ Reschedule · ⏱ 24h reply │ │
│                     └───────────────────────────────────────┘ │
│  ── How it works ────────────────────────────────────────────  │
│  (1) Pay securely   (2) Pick your slot   (3) Join the video call│
│  ── Description / FAQ (dark, readable) ───────────────────────  │
└───────────────────────────────────────────────────────────────┘

MOBILE ( <= 900px )  — single column, no horizontal scroll
  Image (full-width, capped height) → identity → meta chips →
  price → included checklist → How it works → description.
  CTA becomes a STICKY BOTTOM BAR: "৳990  [ Book Appointment ]".
```

---

## 4. Design tokens (consume from `global.css`, do not redefine)

| Element | Token / value |
|---|---|
| Canvas | `hsl(var(--background))` (220 20% 6%) |
| Section surface / cards | `hsl(var(--surface-section))` / `hsl(var(--card))` |
| Body text | `hsl(var(--foreground))` (0 0% 95%) — **NEVER on a light panel** |
| Muted text | `hsl(var(--muted-foreground))` |
| Primary (rest) | `hsl(var(--primary-bright))` #14bb3e |
| Primary (hover) | `hsl(var(--primary-darker))` #079a14 |
| Border / hairline | `hsl(var(--border))` |
| Container | `var(--container-max)` 1248px |
| Heading font | Ubuntu (`--font-heading`), fluid `--fs-*` ramp |
| Body font | Poppins (`--font-body`) |
| Radius | 16px cards / 9999px pills |

**Two greens only.** No new greens. No `!important`, no inline styles. Beat Astra with
`body.wp-theme-astra.single-product …` selector chains.

---

## 5. Component specs

### 5.1 Fix #1 — Description tab readability (BLOCKER)
The tab panel must be a **dark** surface so the existing near-white text is readable.
```css
body.wp-theme-astra.single-product .woocommerce-tabs .woocommerce-Tabs-panel {
  background: hsl(var(--surface-section));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
  border-radius: 16px;
  padding: clamp(1.25rem, 1rem + 2vw, 2.5rem);
}
body.wp-theme-astra.single-product .woocommerce-tabs .woocommerce-Tabs-panel * {
  color: inherit;
}
body.wp-theme-astra.single-product .woocommerce-tabs .woocommerce-Tabs-panel h2,
body.wp-theme-astra.single-product .woocommerce-tabs .woocommerce-Tabs-panel h3 {
  color: hsl(var(--foreground));
  font-family: var(--font-heading);
}
```
> Root cause: current CSS leaves the Astra/WooCommerce default light panel background in
> place while brand text is near-white. Force a dark panel (matching brand) instead of
> trying to darken every text node.

### 5.2 Fix #2 — Mobile overflow (HIGH)
```css
@media (max-width: 900px) {
  body.wp-theme-astra.single-product div.product { grid-template-columns: 1fr; }
  body.wp-theme-astra.single-product div.product .woocommerce-product-gallery,
  body.wp-theme-astra.single-product div.product .woocommerce-product-gallery img {
    width: 100%; max-width: 100%; height: auto;
  }
  body.wp-theme-astra.single-product .summary .product_title.entry-title {
    overflow-wrap: anywhere; word-break: break-word;
  }
}
/* global safety — already a project rule */
html, body { overflow-x: hidden; }
```

### 5.3 Meta chips (Video · 20 min · English · Meet/Zoom)
Render as pill row using the existing `.product_meta` / category area, or style any
`.summary` list WooCommerce outputs. If markup can't be added CSS-only, repurpose the
short-description first line into chips via `::before` content is **not** allowed (no fake
content for real info) — instead instruct the editor to author them as a small `<ul>` in
the short description; CSS then styles `ul li` as chips:
```css
body.wp-theme-astra.single-product .summary .woocommerce-product-details__short-description ul {
  list-style: none; display: flex; flex-wrap: wrap; gap: .5rem; margin: 0; padding: 0;
}
body.wp-theme-astra.single-product .summary .woocommerce-product-details__short-description ul li {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .35rem .75rem; border-radius: 9999px;
  background: hsl(var(--card)); border: 1px solid hsl(var(--border));
  font: 600 .8125rem/1 var(--font-body); color: hsl(var(--foreground));
}
```

### 5.4 Price with savings
```css
body.wp-theme-astra.single-product .summary p.price { align-items: baseline; gap: .65rem; }
/* original */ del .amount { color: hsl(var(--muted-foreground)); text-decoration: line-through; font-size: 1.1rem; }
/* sale     */ ins .amount { color: hsl(var(--primary-bright)); font: 700 1.9rem/1 var(--font-heading); }
```
Add a "/ 20-min session" qualifier + "Save ৳210" badge — author in WP short description
(plain text/HTML) so it stays CSS-styleable; do not hardcode amounts in CSS.

### 5.5 "What's included" checklist card
Author as a `<ul>` block in the long description or short description; style with a green
check glyph via `li::marker`-free custom bullet:
```css
.arefin-included li { position: relative; padding-left: 1.6rem; }
.arefin-included li::before {
  content: ""; position: absolute; left: 0; top: .35em;
  width: .9rem; height: .9rem;
  background: hsl(var(--primary-bright));
  -webkit-mask: url("data:image/svg+xml,...check...") center/contain no-repeat;
          mask: url("data:image/svg+xml,...check...") center/contain no-repeat;
}
```

### 5.6 Sticky booking CTA
- Desktop: wrap price+CTA+trust in a sticky right-column card (`position: sticky; top: 96px`).
  The site header is sticky and uses `backdrop-filter` — keep `top` clear of the header
  height; do **not** put `backdrop-filter`/`filter`/`transform` on any ancestor of the
  sticky card (it breaks sticky/fixed, see mobile-menu issue #earlier).
- Mobile: fixed bottom bar with price + Book button, `padding-bottom: env(safe-area-inset-bottom)`.
```css
@media (max-width: 900px) {
  body.wp-theme-astra.single-product .summary form.cart {
    position: fixed; left: 0; right: 0; bottom: 0; z-index: 50;
    display: flex; gap: .75rem; align-items: center;
    padding: .75rem 1rem calc(.75rem + env(safe-area-inset-bottom, 0px));
    background: hsl(var(--surface-section));
    border-top: 1px solid hsl(var(--border));
  }
  body.wp-theme-astra.single-product { padding-bottom: 88px; } /* room for the bar */
}
```

### 5.7 Trust row
Three inline items under the CTA: 🔒 Secure payment · ↺ Easy reschedule · ⏱ Reply within 24h.
Use inline SVGs (project rule: inline SVG for critical UI icons), `--muted-foreground`,
green on hover, no positional hover shift.

### 5.8 "How it works" 3-step strip
Full-width band (`grid-column: 1 / -1`), 3 numbered cards. Card contrast rule: dark section
→ light/elevated cards (`hsl(var(--card))`), green number badge.

---

## 6. Constraints (inherited — non-negotiable)

- No `!important`, no inline styles, kebab-case classes, tokens consumed not redefined.
- **Surface elevation rule**: dark section → lighter card; never same-tone; never neutral grey.
- **No hover uplift**: only color/border/shadow change on hover (no translate/scale).
- WCAG 2.1 AA contrast (4.5:1 body, 3:1 large). The Description-panel fix is the priority.
- Two greens only. `whitespace-nowrap` brand identifiers where applicable.
- Mobile: enforce `overflow-x: hidden`; no element wider than the viewport.
- Sticky elements: no `backdrop-filter`/`transform`/`filter` on ancestors.

---

## 7. Content follow-ups (author in WP, not CSS)

- [ ] Re-author the short description as: 1-line summary + meta-chip `<ul>` + price qualifier.
- [ ] Add a "What's included" `<ul class="arefin-included">` (4 items).
- [ ] Add a short FAQ (3–4 Q/A) into the long description to replace the empty Reviews tab value.
- [ ] Confirm doctor credentials line (specialty + hospital) for the identity block.
- [ ] Assign a real product category (already "Consultation" — good).

---

## 8. Deployment

1. Update `public/elementor-export/blocks/product/product.css` per sections 5.x.
2. WPCode → snippet `AREFIN-PRODUCT-CSS` (HTML snippet, Site Wide Header) → paste full
   `product.css` (keep `<style>` wrapper) → Save.
3. Author content follow-ups (§7) in the product editor.
4. Elementor → Regenerate CSS & Data; purge SpeedyCache + CDN; hard-refresh.
5. QA: desktop 1280 + mobile 390 — verify (a) Description text readable, (b) no horizontal
   scroll, (c) sticky CTA works, (d) AA contrast on price/links/checklist.

---

## 9. Acceptance criteria

- ✅ Description/long-text fully readable (dark panel, AA contrast).
- ✅ Zero horizontal scroll at 360–430px; H1 never clipped.
- ✅ Booking CTA always reachable (sticky desktop card + mobile bottom bar).
- ✅ Page communicates *online video consultation* above the fold without reading a paragraph.
- ✅ Trust + "how it works" + "what's included" present and on-brand.
- ✅ No `!important`, no inline styles, two greens only, no hover uplift.
