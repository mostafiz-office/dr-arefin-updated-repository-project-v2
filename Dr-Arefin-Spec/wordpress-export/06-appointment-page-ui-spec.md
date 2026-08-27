# Appointment Page — Premium UI Spec (v3)

> Route: `/shop/appointment/` — WooCommerce **simple product** "Dr Arefin Online Appointment".
> Goal: a booking page people *want* to book from. Calm, credible, conversion-focused —
> the visual quality of Practo / Zocdoc / Doctolib, on the Dr Arefin dark brand.
> Constraint: **CSS-only** restyle of the default Astra + WooCommerce markup (no PHP / no
> markup changes) **plus** small, plain WordPress content blocks the editor pastes into the
> product (the short & long description). Token source: `global.css`.
> Implementation target: `public/elementor-export/blocks/product/product.css` (v3.2.0).
> Deploy target: WPCode snippet `AREFIN-PRODUCT-CSS`.

This file supersedes the UI direction in `05-appointment-booking-redesign.md`. Spec 05's
diagnosis stays valid; this file is the **single source of truth for the layout & CSS**.

---

## 1. The reading order (what the customer should experience)

A first-time visitor should understand and act **without reading a paragraph**. Top to bottom:

1. **Who** — doctor portrait (trust at a glance).
2. **What** — eyebrow ("CONSULTATION") + clear title.
3. **Cost** — price, the discount, what the price buys ("/ 20-min session").
4. **What you get** — 3–4 line "What's included" checklist (scannable, not prose).
5. **Act** — one big, obvious **Book Appointment** button.
6. **Reassurance** — a quiet trust line under the button (secure payment · reschedule · reply time).
7. **Detail (optional)** — "How it works" 3 steps + full description, below the fold.

> Design intent in one line: **portrait on the left, a bright white booking card on the
> right that holds title → price → what's included → button → trust.** Everything else is
> secondary and lives below.

---

## 2. Layout

```text
DESKTOP ( > 900px )                         container max 1248px
┌───────────────────────────────────────────────────────────────────┐
│  Home / Shop / Consultation / Dr Arefin Online Appointment          │  breadcrumb
│ ┌───────────────────┐   ┌───────────────────────────────────────┐  │
│ │                   │   │  ▌ booking card (WHITE, non-sticky)    │  │
│ │   Doctor          │   │  [ CONSULTATION ]  (green pill)        │  │
│ │   portrait        │   │  Dr Arefin Online Appointment (H1)     │  │
│ │   (dark frame,    │   │  ৳1,200  ৳990   · / 20-min session     │  │
│ │    rounded 20px,  │   │  ┌─────────────────────────────────┐   │  │
│ │    fills column)  │   │  │ What's included (✓ checklist)   │   │  │
│ │                   │   │  └─────────────────────────────────┘   │  │
│ │                   │   │  [   ▸  Book Appointment   ]  (green)   │  │
│ │                   │   │  🔒 Secure · ↺ Reschedule · ⏱ 24h reply │  │
│ └───────────────────┘   │  Category: Consultation                │  │
│                         └───────────────────────────────────────┘  │
│  ── How it works ─────────────────────────────────────────────────  │
│   (1) Pay securely    (2) Pick your slot    (3) Join the video call  │
│  ── Description (dark panel, fully readable) ──────────────────────  │
└───────────────────────────────────────────────────────────────────┘

MOBILE ( <= 900px )  — single column, ZERO horizontal scroll
  portrait → eyebrow → title → price → what's included → description
  Book button becomes a FIXED bottom bar (full-width green, safe-area inset).
```

**Column ratio (desktop):** `grid-template-columns: minmax(0, 0.82fr) minmax(0, 1fr)`.
The portrait image **fills its column** (width 100%, capped ~480px) so there is **no empty
gutter** — the #1 bug in the previous build was a tiny image floating in a huge column.

**Scroll behavior:** the white booking card must scroll normally with the page. Do **not** use
`position: sticky`, fixed positioning, transform-based pinning, or any JS pinning on the right
side card.

---

## 3. Surfaces & contrast (non-negotiable)

Page background is dark (`--background`, 220 20% 6%). Per the **Surface Elevation Rule**
(dark section → lighter card), the elements are:

| Element | Surface | Text |
|---|---|---|
| Page canvas | `hsl(var(--background))` dark | — |
| **Booking card** (focal) | **`hsl(0 0% 98%)` light/white** | dark `hsl(220 20% 10%)` |
| Portrait frame | dark `hsl(var(--card))` | — |
| "What's included" (inside white card) | `hsl(220 16% 96%)` very light | dark text |
| Description tab panel | **dark `hsl(var(--surface-section))`** | light `hsl(var(--foreground))` |
| "How it works" cards | `hsl(var(--card))` dark, elevated | light text + green number |

The booking card is the **one bright object** on the page — it pulls the eye straight to the
price + button. The description panel is dark to match the rest of the site and to kill the
"near-white text on light-grey" invisibility bug for good (text color is forced, never inherited
from Astra).

**Green on light card:** small/bold green text on the white card must use `--primary-darker`
(#079a14) for AA; the eyebrow is a green **pill with white text** (always AA). Price (large)
may use `--primary-darker`. Two greens only — no new greens.

---

## 4. Component specs (map to CSS selectors)

All selectors are scoped `body.wp-theme-astra.single-product …`. No `!important`, no inline
styles, kebab-case, tokens consumed (not redefined except the local fallback block).

### 4.1 Portrait — `.woocommerce-product-gallery`
- Width 100% of column, `max-width: 480px`, natural aspect (image is portrait — **do not**
  force `aspect-ratio`/crop).
- `border-radius: 20px`, `1px solid hsl(var(--border))`, soft deep shadow.
- Magnifier trigger styled as a small dark chip, top-right.
- **No CSS-injected caption** under the image (the old `::after` "Video consultation · …" is
  removed — that's real info and must be authored if wanted).

### 4.2 Booking card — `.summary.entry-summary`
- `background: hsl(0 0% 98%)`, `color: hsl(220 20% 10%)`, `border-radius: 20px`,
  `padding: clamp(1.5rem, 1rem + 2vw, 2.25rem)`, `display:flex; flex-direction:column; gap:1.1rem`.
- Scrolls normally on desktop; no sticky/pinned right-side behavior.

### 4.3 Eyebrow — `.single-product-category`
- Green pill: `background: hsl(var(--primary-bright))`, `color:#fff`, uppercase, `letter-spacing:.12em`,
  `font-size:.72rem`, `border-radius:9999px`, `padding:.4rem .8rem`, `width:fit-content`.

### 4.4 Title — `.product_title.entry-title`
- `font-family: var(--font-heading)`, fluid `clamp(2rem, 1.5rem + 2vw, 3.25rem)`,
  `line-height:1.05`, `color: hsl(220 20% 10%)`.
- `overflow-wrap: anywhere` so it never clips on mobile.

### 4.5 Price — `p.price`
- Row: `display:flex; align-items:baseline; flex-wrap:wrap; gap:.6rem .8rem`.
- `del` (original): `hsl(220 10% 45%)`, line-through, `1.1rem`.
- `ins` (sale): `hsl(var(--primary-darker))`, `font-weight:800`, `~2rem`, no underline.
- **Qualifier ("/ 20-min session") and "Save ৳210" are authored in the short description**,
  not injected by CSS.

### 4.6 Short description box — `.woocommerce-product-details__short-description`
- Light inner panel inside the white card: `background: hsl(220 16% 96%)`,
  `border-left:3px solid hsl(var(--primary-bright))`, `border-radius:12px`, `padding:1rem 1.15rem`,
  dark text. Renders the editor's summary line + meta chips.

### 4.7 Meta chips — `…short-description ul li` (authored `<ul>`)
- `<ul>` → `display:flex; flex-wrap:wrap; gap:.5rem; list-style:none`.
- `<li>` → pill: `background:#fff; border:1px solid hsl(220 14% 88%); border-radius:9999px;
  padding:.35rem .75rem; font:600 .8125rem/1; color:hsl(220 20% 15%)`.

### 4.8 "What's included" — `ul.arefin-included` (authored `<ul class="arefin-included">`)
- Card: light panel, grid gap .6rem.
- Each `li`: `padding-left:1.7rem`, green check via masked SVG `::before` (decorative only).

### 4.9 Book button — `form.cart .single_add_to_cart_button`
- Full-width green pill: `background: hsl(var(--primary-bright))`, white text, `min-height:56px`,
  `border-radius:9999px`, `font-weight:700`. Hover → `--primary-darker` + soft shadow
  (color/shadow only — **no translate/scale**, per no-hover-uplift rule).
- Quantity field hidden for this product (single session) if present.

### 4.10 Trust row — `.arefin-trust` (authored, optional) or `.product_meta`
- Quiet line under the button: 🔒 Secure payment · ↺ Easy reschedule · ⏱ Reply within 24h.
- Inline SVG icons (project rule), `color: hsl(220 10% 40%)`, green on hover, no shift.

### 4.11 Tabs / Description panel — `.woocommerce-Tabs-panel`
- Tabs as pills (active = green). **Reviews tab hidden** (`display:none`) until real reviews exist.
- Panel: dark `hsl(var(--surface-section))`, `border-radius:16px`, `1px solid hsl(var(--border))`,
  text `hsl(var(--foreground))`, **every descendant `color: inherit`** so nothing stays near-white-
  on-light. Headings `var(--font-heading)`, links `--primary-bright`.

### 4.12 "How it works" — `.arefin-steps` (authored block, full width)
- 3 numbered dark cards (`hsl(var(--card))`), green circular number badge, light title + muted
  body. Lives in the long description or just above the tabs.

---

## 5. Content the editor pastes in WordPress (plain, CSS styles it)

Real text is **authored**, never injected by CSS. Paste these in the product editor.

**Short description** (Product data → "Product short description"):
```html
<p>Private online video consultation with Dr Arefin — clear answers and a plan you can act on.</p>
<ul>
  <li>🎥 Video call</li><li>⏱ 20 minutes</li><li>🌐 English / বাংলা</li><li>🔗 Google Meet / Zoom</li>
</ul>
<p><strong>৳990</strong> <span>/ 20-min session · Save ৳210</span></p>
<ul class="arefin-included">
  <li>20-minute private video consultation</li>
  <li>Personalised advice for your condition</li>
  <li>Prescription / report review</li>
  <li>Short written follow-up note</li>
</ul>
```

**Long description** (main editor) — start with the steps block, then details:
```html
<div class="arefin-steps">
  <div><span>1</span><h3>Pay securely</h3><p>Checkout with card or mobile banking.</p></div>
  <div><span>2</span><h3>Pick your slot</h3><p>Use the link we email to choose a time.</p></div>
  <div><span>3</span><h3>Join the call</h3><p>Open the Meet/Zoom link at your slot.</p></div>
</div>
<h2>About this consultation</h2>
<p>…(existing detail copy)…</p>
```

(Optional trust line under the button — author in the short description if desired:)
```html
<p class="arefin-trust">🔒 Secure payment · ↺ Easy reschedule · ⏱ Reply within 24h</p>
```

---

## 6. Constraints (inherited — must hold)

- No `!important`, no inline styles, kebab-case classes, tokens consumed not redefined.
- Surface elevation: dark page → lighter focal card; dark description panel with forced light
  text. Never same-tone, never neutral grey-on-grey.
- No hover uplift (color/border/shadow only).
- WCAG 2.1 AA (4.5:1 body, 3:1 large). Green-on-white uses `--primary-darker`.
- Two greens only. `overflow-x:hidden` on `html,body`; nothing wider than the viewport.
- Sticky card: no `transform`/`filter`/`backdrop-filter` on any ancestor.
- **No real informational text injected via CSS `content:`** — only decorative glyphs/icons.

---

## 7. Acceptance criteria

- ✅ Reading order = portrait → eyebrow → title → price → what's included → button → trust.
- ✅ Booking card is the single bright focal element; button is unmissable.
- ✅ Description panel fully readable (dark panel, forced light text, AA).
- ✅ Zero horizontal scroll at 360–430px; H1 never clipped.
- ✅ Desktop: no empty gutter — portrait fills its column; booking card scrolls normally.
- ✅ Mobile: fixed bottom Book bar with safe-area inset.
- ✅ No `!important`, no inline styles, two greens only, no hover uplift, no CSS-injected info text.

---

## 8. Deploy

1. Update `public/elementor-export/blocks/product/product.css` to v3.0.0 per §4.
2. WPCode → `AREFIN-PRODUCT-CSS` (HTML snippet, Site-wide Header) → paste **entire** file
   (keep the single `<style>…</style>` wrapper) → Save & activate.
3. Paste the §5 content blocks into the product editor.
4. Elementor → Regenerate CSS & Data → purge SpeedyCache + CDN → hard refresh.
5. QA at 1280 and 390 against §7.
