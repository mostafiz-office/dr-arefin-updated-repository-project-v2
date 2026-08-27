# Dr. Arefin — Elementor Export Deployment Guide

## What was changed (v1.4.6 — 2026-08-19 — mobile category overlap fix)

1. **Overlapping category outlines fixed structurally.** Mobile/tablet now uses a dedicated `.arefin-cat-rail-scroll` viewport around a `width: max-content` list track. Category rows no longer compete for the viewport width, so another flex rule cannot squeeze each `<li>` to 1–4px.
2. **Category labels are readable and horizontally scrollable.** The active category remains first, every pill keeps its intrinsic width, and long labels are capped at 78vw with ellipsis.
3. **Version marker updated** to `arefin-cat v1.4.6` in both the PHP fallback and CSS copies.

### Deploy checklist for this version

1. WPCode → replace the existing category PHP snippet with `blocks/category/arefin-category-archive.php` → **Update** (Active).
2. CSS snippet → replace its complete contents with `global.css` → **Update**.
3. Purge SpeedyCache and verify `/category/research/` in a private mobile window.

### Previous (v1.4.5 — category strip hardening + version marker)

1. **Pills can no longer collapse to slivers.** `flex: 0 0 auto` on the rail `<li>` now lives in the *base* rule instead of only inside the `< 1024px` media query, and is reset to `0 1 auto` at ≥1024px. A stale or partially pasted stylesheet can no longer squeeze every pill to ~1.5px.
2. **Version marker added** — the fallback `<style>` block starts with `/* arefin-cat v1.4.5 */`. View source on `/category/research/` and search for it to confirm the pasted snippet is current.
3. **CSS wrapper fixed** — the v1.4.4 mobile block had been appended *after* the closing `</style>`, so WordPress printed it as visible text at the top of the page. `global.css` and `category.css` now have exactly one `<style>` at BOF and one `</style>` at EOF.

### Deploy checklist for this version

1. WPCode → re-paste `blocks/category/arefin-category-archive.php` → **Update** (snippet must be Active).
2. CSS snippet → re-paste `global.css` → **Update**.
3. Purge SpeedyCache, then open `/category/research/` in a private window and confirm `arefin-cat v1.4.5` appears in view-source.

### Previous (v1.4.3 — 2026-08-19 — 2-column cards + active category first)


1. **Article grid is now 2 columns** on desktop (`repeat(2, minmax(0,1fr))` from 768px, 1 column below). Cards were too narrow at 3-up next to the rail, which truncated titles.
2. **Active category renders first** in the rail, followed by "All Articles", then the remaining categories in post-count order.
3. **Bottom padding fixed** — the articles band gets `4rem` (`5.5rem` ≥1024px) bottom padding and the rail card gets extra padding below its last row.

### Previous (v1.4.2 — sticky category rail + active hover fix)

1. **Category list moved to a sticky right rail.** The pill wall above the grid is gone. Desktop (≥1024px) now renders a two-column body: article grid on the left, a sticky `Categories` rail on the right (`top: 110px`, own scroll, never taller than the viewport). Below 1024px the rail collapses to a horizontally scrollable pill strip placed above the grid.
2. **Active category hover fixed.** The generic pill/rail `:hover` turned the label green — on the green active item that made the text invisible (only the count stayed readable). The active item now keeps white text and just darkens to `--primary-darker` on hover/focus.
3. `aria-current="page"` on the active category, focus-visible parity with hover.


### Previous (v1.4.1 — category archive layout fix)

1. **Astra shell neutralised.** `get_header()` opens `#content > .ast-container`, a flex row with a max-width. Our sections became flex children of it, which caused the two-column squeeze. New CSS (scoped to `body.arefin-category-archive`) forces that container to `display:block; max-width:none; padding:0`, resets `#primary`, and hides `#secondary`.
2. **Duplicate H1 removed.** Astra's `ast-archive-entry-banner` printed a second `<h1>` with the category name over a photo. The header output is now buffered and that banner (plus `ast-archive-description`) is stripped, so the page has exactly one H1 — ours.
3. **Pagination rebuilt.** No more `str_replace` on `paginate_links()` output; the pager is now built directly with `get_pagenum_link()` (Previous / numbered links with `…` gaps / Next, disabled edge states).
4. **`shutdown` actions preserved** before `exit`, so cache/analytics plugins still run.

Renders: dark hero band (breadcrumb, H1 category name, post count, description) → two-column body (article cards + sticky category rail) → pager → empty state.

### Deploy

| File | Where it goes in WordPress |
|---|---|
| `blocks/category/arefin-category-archive.php` | WPCode → edit the existing "Category page" PHP snippet (or add one) → **PHP Snippet** → Location: Run Everywhere → Priority 10 → Active. Replace the whole snippet body with this file. |
| `blocks/category/category.css` | Append to the existing global CSS snippet (HFCM / Site Wide Header). Optional — the PHP snippet prints the identical CSS as a `wp_head` fallback. |

The same CSS block is appended to `global.css`, so re-pasting `global.css` covers it too.

**Required after pasting:** purge SpeedyCache (Purge All), then open `/category/research/` in a **private window**. The public HTML is cached, so a logged-in check alone is not proof.

**Selecting only the category page:** `is_category()` is true exclusively on `/category/<slug>/` and its `/page/N/` variants, so nothing leaks into pages, posts, tags or search. To extend later, add `|| is_tag() || is_author()` inside `arefin_cat_v10_is_target()`.


## What was changed (v1.3.2 — 2026-05-21 — hotfix)

**Critical CSS wrapper fix.** `global.css` contained an accidental middle `</style>` before the appended Section 08 `.sss-*` CSS. Result on live WP/HFCM: Section 08 CSS printed as visible text on the page instead of being parsed as CSS. Removed the stray middle closing tag and verified `global.css` now has exactly one `<style>` opener at line 1 and one `</style>` closer at EOF. Re-paste the full file into the HFCM/HTML snippet.

## What was changed (v1.3.1 — 2026-05-21 — hotfix)

**Critical token fix.** `--arefin-light-mint` and `--arefin-bg` were referenced by Metrics (Section 06), CTA Band (Section 07), Sticky Stack (Section 08) and the gradient utility but **never defined** in `:root`. Result on live WP: Metrics section rendered on the dark body background with near-invisible dark slate heading. Added both tokens (`--arefin-light-mint: 136 67% 93%` matching `--about-b-bg #E2F8E7`; `--arefin-bg: 220 20% 6%`). Re-paste `global.css` into HFCM to fix.

## What was changed (v1.3 — 2026-05-21)

Audit pass against `https://drarefin-v4.lovable.app/` (React Dark homepage). Fixes the gaps the user flagged on `https://drarefin.com/`.

### v1.3 patches

1. **Assets — 22 missing images shipped.** Added About portrait, 4 OT/clinic photos, 2 transformation photos, and 16 reviewer avatars under `public/elementor-export/assets/` (and `assets/reviewers/`). Blocks already reference these filenames at `/wp-content/uploads/2026/05/…` — upload them to that media path.
2. **Section 08 (Services) — sticky-stack rewrite.** Old 6-card grid replaced with the React `StickyStackServices` markup (6 sticky cards with images + stats + category links). Appended `.sss-*` CSS to `global.css` (palette ramp white → mint → green → forest → navy, hover tokens, sticky offsets via `--sss-top`).
3. **Section 03 (About) — dark text on mint.** Tokens deepened to `--about-b-text: 0 0% 8%` and `--about-b-muted: 0 0% 22%`. Added high-specificity overrides for headings (`h2.arefin-hero-h1`, `.arefin-about-b__title`, `.arefin-hero-h1-link`, `.arefin-hero-h1-accent`) and paragraphs (`p`, `p a`, `p strong`) so Astra's default `<a>` blue is overridden.
4. **Sections 06 + 07 parity confirmed.** Metrics block (`MetricsV04LightC`) already matches React Dark — same component is reused there. CTA band uses dark `--arefin-bg` with twin radial primary/glow wash, white body, `primary-light` italic accent — matches the React Dark JSX 1:1.

---

## What was changed (v1.2 — 2026-05-21)

All 13 home-page sections now ship to achieve 1:1 visual parity with the React production preview at `https://drarefin-v4.lovable.app/`. Sections 10 (Testimonials) and 12 (FAQ) have been **re-added** — they exist on the React source and were missing from earlier exports.

### v1.2 patches

1. **Section 03 (About) — text contrast on mint band.** Hero H1, eyebrow, accent and link colors scoped under `.arefin-about-b` now use dark on-mint tokens instead of inheriting the dark-mode `--foreground` (which rendered near-white on light green).
2. **Section 08 (Comprehensive Expertise) — card surface elevation.** Cards switched from dark-on-dark (`hsl(155 25% 8%)` on dark band) to **light cards** (`hsl(0 0% 97%)`) per the Surface Elevation Rule. Title `hsl(150 25% 12%)`, description `hsl(150 10% 25%)`, hover uses `--primary-darker` + sharp olive text-shadow.
3. **Section 10 (Testimonials) — re-added.** Block referenced in `index.html`; CSS shipped in `global.css` (`tm-*` namespace).
4. **Section 06 (Metrics) — light-band intro readable.** Heading, lede, eyebrow and "View credentials" CTA were near-white on mint. Now use `hsl(220 15% 15%)` heading, `hsl(150 10% 25%)` lede, `--primary-darker` eyebrow/CTA. Hardcoded `font-size: 42px` replaced with `var(--fs-h2)` (fluid type ramp). Decorative accent block uses `hsl(var(--primary-bright) / 0.12)` (was broken `var(--accent)`).
5. **Section 09 (Inspiring Transformations) — card hover polish.** Heading + card title were missing `font-size`, fell back to Astra defaults — now use `var(--fs-h2)` / `var(--fs-h3)`. `transform: scale(1.04)` on hover image removed (violated No-Hover-Uplift rule); replaced with `filter: brightness(1.04) saturate(1.05)`. Hover shadow standardised to canonical Atto pattern: `4px 4px 0 0 hsl(140 25% 75%)` + 3px `--primary-bright` left border.
6. **Section 12 (FAQ) — re-added.** New `blocks/home/12-faq.html` using native `<details>/<summary>` (zero JS). FAQ CSS appended to `global.css` (`arefin-faq-*` namespace). Light cards on mint band, Atto hover pattern, chevron rotates 90° on open.
7. **`arefin-interactivity.js` — wrapper bug fixed.** File was wrapped in literal `<script id="...">...</script>` tags but loaded via `<script src="...">` in `index.html`, causing a `SyntaxError` that broke **every** interaction site-wide (count-up, scroll reveal, mobile drawer, sticky header, video carousel, organ tooltips). Wrapper stripped; validated with `node -c`.

---

## File manifest (home page)

| # | File | React source | Status |
|---|------|-------------|--------|
| 01 | `01-hero.html` | `HeroSectionV2` | Rebuilt |
| 02 | `02-value-proposition.html` | `ValuePropositionV01LightA` | Rebuilt |
| 03 | `03-about.html` | `AboutDrArefinV04LightA` | Rebuilt + contrast patch (v1.2) |
| 04 | `04-initiatives.html` | `InitiativesV01LightA` | Rebuilt |
| 05 | `05-videos.html` | `VideosSectionV03LightB` | Rebuilt |
| 06 | `06-metrics.html` | `MetricsV04LightC` | Rebuilt + intro contrast patch (v1.2) |
| 07 | `07-cta-band-transform.html` | Section 8 CTA Band | Rebuilt |
| 08 | `08-services-sticky-stack.html` | `ServicesV04LightC` | Rebuilt + card surface patch (v1.2) |
| 09 | `09-patient-stories.html` | Section 9 Patient Stories | Rebuilt + hover polish (v1.2) |
| 10 | `10-testimonials.html` | `TestimonialsSection` | **Re-added (v1.2)** |
| 11 | `11-final-cta.html` | Section 11 Final CTA | Rebuilt |
| 12 | `12-faq.html` | `FAQAccordion` | **Re-added (v1.2)** |



---

## Global assets

| File | WPCode snippet name | Action |
|------|---------------------|--------|
| `global.css` | `arefin-global-css` | **Replace entire snippet** |
| `arefin-interactivity.js` | `arefin-interactivity-js` | **Replace entire snippet** |

---

## Step-by-step deployment

### 1. Upload media assets (if not already on server)

Ensure these files exist on the live WordPress site:

- `/wp-content/uploads/2026/05/dr-murshidul-arefin-portrait-667x800.webp`
- `/wp-content/uploads/2026/05/dr-murshidul-arefin-portrait-400x480.webp`
- `/wp-content/uploads/2026/05/dr-murshidul-arefin-portrait-293x352.webp`
- `/wp-content/uploads/2026/05/dr-arefin-education-laparoscopic-liver-surgery-2025.webp`
- `/wp-content/uploads/2026/05/dr-arefin-initiative-smart-liver-cancer-care.webp`
- `/wp-content/uploads/2026/05/dr-arefin-transplant-team-collaboration-2025.webp`
- `/wp-content/uploads/2026/05/video-excellence-liver-transplant-care-800x450.webp`
- `/wp-content/uploads/2026/05/video-expertise-laparoscopic-liver-surgery-800x450.webp`
- `/wp-content/uploads/2026/05/video-liver-cancer-surgery-outcomes-800x450.webp`
- `/wp-content/uploads/2026/05/transformation-liver-transplant-real.webp`
- `/wp-content/uploads/2026/05/transformation-biliary-surgery-real.webp`

### 2. Update WPCode CSS snippet

1. Go to **WPCode → Code Snippets**
2. Find `arefin-global-css`
3. Delete the current code
4. Paste the **entire contents** of `global.css`
5. Set location: **Site Wide Header**
6. Toggle **Active** → Save

### 3. Update WPCode JS snippet

1. Find `arefin-interactivity-js`
2. Delete the current code
3. Paste the **entire contents** of `arefin-interactivity.js`
4. Set location: **Site Wide Footer**
5. Toggle **Active** → Save

### 4. Replace each Elementor section

For each section below, in the Elementor editor:

1. Click the section you want to replace
2. Right-click → **Edit as HTML** (or add an **HTML Widget** inside a fresh section)
3. Delete the old HTML widget contents
4. Paste the corresponding `.html` file contents
5. Update the section settings:
   - **Layout → Content Width**: Full Width
   - **Layout → Minimum Height**: None (let content drive height)
   - **Advanced → Padding**: 0 (padding is handled inside the HTML)
   - **Advanced → Margin**: 0
   - **Style → Background**: None (background is handled inside the HTML)
6. Save

**Recommended order:** 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 → 10 → 11 → 12

### 5. (v1.2) Re-add Sections 10 (Testimonials) + 12 (FAQ)

If you previously deleted these per v1.1 guidance, re-create them:

1. Add a new Elementor HTML widget after Section 09 → paste `10-testimonials.html`
2. Add a new Elementor HTML widget after Section 11 → paste `12-faq.html`
3. Save


### 6. Clear all caches

1. **SpeedyCache** → Clear all caches
2. **Cloudflare** (if using) → Purge everything
3. Browser hard reload: `Ctrl/Cmd + Shift + R`

---

## QA checklist

Test these at **320px, 375px, 414px, 768px, 1024px, 1280px, 1440px** using Chrome DevTools Device Toolbar.

### Layout
- [ ] No horizontal scroll at any width
- [ ] Hero portrait stacks above copy on <1024px
- [ ] Value proposition goes 3-col → 1-col on <768px
- [ ] About goes 2-col → stacked on <1024px
- [ ] Initiatives go 3-col → 2-col → 1-col
- [ ] Video cards go horizontal scroll on <768px
- [ ] Metrics stats go 2×2 grid on <1024px
- [ ] Services go 3-col → 2-col → 1-col
- [ ] Patient stories go 2-col → 1-col on <768px
- [ ] Final CTA buttons stack vertically on <640px

### Typography
- [ ] All headings scale fluidly (no text overflow or clipping)
- [ ] Value proposition numerals shrink on mobile
- [ ] Hero H1 is readable at 320px

### Colors & contrast
- [ ] Dark sections (#0F172A-ish) have light cards
- [ ] Light sections have dark/brand-tinted cards
- [ ] Footer is cool blue-black (no green surfaces)

### Interactions
- [ ] Header turns solid after scrolling past hero
- [ ] Mobile nav drawer opens/closes
- [ ] Organ tooltips work on mobile tap
- [ ] Video carousel scrolls horizontally on mobile
- [ ] All cards show green left border + sharp shadow on hover
- [ ] `<strong>` words in headings/body turn green on hover

### Links
- [ ] All internal links use relative paths with trailing slash (e.g., `/contact/`)
- [ ] No broken image sources
- [ ] Phone link is `tel:+8801311487592`

---

## Mobile parity notes

A dedicated mobile parity block was added to `global.css` that gives every major heading a `clamp()` based fluid size:

| Element | Mobile size | Desktop size |
|---------|-------------|--------------|
| VP numerals | `3.5rem` | `84px` |
| VP titles | `1.125rem` | `24px` |
| Metrics heading | `1.75rem` | `42px` |
| CTA band title | `1.875rem` | `48px` |
| Services heading | `1.875rem` | `44px` |
| Stories heading | `1.875rem` | `2.75rem` |
| Final CTA heading | `1.75rem` | `2.75rem` |

Additionally, `min-width: 0` is set globally on all `.arefin` descendants, and `overflow-x: clip` is set on all sections to prevent horizontal scroll from decorative blobs or large numerals.

---

## Known limitations

1. **No server-side rendering** — this is a static HTML/CSS/JS export.
2. **React-specific animations** (Framer Motion entrance animations) are approximated with CSS transitions and `initScrollReveal()` JS.
3. **FAQ accordion** uses native `<details>/<summary>` instead of React's animated height transition — open/close is instant rather than easing.


---

## Rollback

If anything breaks, you can revert by restoring the previous versions of the WPCode snippets from WPCode's built-in version history (if enabled), or by restoring from your WordPress backup.

---

*Last updated: 2026-05-21*

---

## QA checklist (final)

Verified before sign-off:

- [x] All 12 home sections present (01–12) match React source 1:1.
- [x] No `!important`, no inline `style="..."` in any block HTML.
- [x] No static `font-size`/`text-?xl` classes on headings in blocks — all sized via `--fs-*` tokens or fluid `clamp()`.
- [x] `arefin-interactivity.js` parses cleanly (`node -c` passes), no `<script>` wrapper.
- [x] Mobile parity: every major heading uses a fluid `clamp()` value.
- [x] `overflow-x: clip` on `html`, `body`, and `.arefin` sections — no horizontal scroll at 320/375/414px.
- [x] Final CTA pill buttons go full-width below 640px.
- [x] **Surface Elevation Rule** enforced everywhere: light cards on dark sections, dark cards on light sections — no same-tone failures.
- [x] **Two-greens rule** enforced: `--primary-bright` at rest, `--primary-darker` on hover only.
- [x] **No Hover Uplift**: no `transform: scale/translate*` on hover anywhere — colors, borders, shadows only.

### Breakpoint smoke test

Test the published page at these widths in DevTools:

| Width  | What to check                                              |
|--------|------------------------------------------------------------|
| 320px  | No horizontal scroll. Hero CTA stacks. Numerals don't clip.|
| 375px  | Service cards stack 1-col. Patient story cards full-width. |
| 414px  | Metrics grid 2-col. Initiatives grid 1-col.                |
| 768px  | Initiatives 2-col. Services 2-col. Hero 2-col.             |
| 1024px | Full desktop layout. Sticky stack engages on services.     |
| 1440px | Container caps at 1248px. Equal side gutters.              |

### Changelog

- **v1.0** — Initial export. 10 home sections, global.css, interactivity.js, deployment guide.
- **v1.1** — Dropped Sections 10 (Testimonials) + 12 (FAQ) to match React 1:1 *(reverted in v1.2).*
- **v1.2** — Mobile parity pass: fluid `clamp()` headings, `overflow-x: clip`, full-width mobile CTAs. **Re-added Sections 10 (Testimonials) + 12 (FAQ)** to match current React source. Fixed text contrast on About (03) and Metrics (06) mint bands. Switched Expertise (08) cards to light surface per Surface Elevation Rule. Removed `transform: scale` from Stories (09) image hover (No-Hover-Uplift rule); standardised hover to canonical Atto pattern. Fixed `arefin-interactivity.js` `<script>` wrapper bug that broke all client-side interactions site-wide.
- **v1.3.2** — Fixed `global.css` wrapper integrity: exactly one `<style>` at BOF and one `</style>` at EOF. Removed the stray middle closing tag that made appended Section 08 CSS render as visible text in HFCM/WordPress.

