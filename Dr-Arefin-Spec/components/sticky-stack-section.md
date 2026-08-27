# Sticky-Stack Section — Reusable Component Spec

> **Status:** canonical pattern. Source of truth for any "scroll-pinned cards over a media panel" section across the Dr. Arefin codebase.
> **Reference implementation:** `src/components/arefin/StickyStackServices.tsx` (Section 8 — *Our Expertise / Comprehensive Hepatobiliary & Liver Care Services*).
> **Exported clone:** `public/elementor-export/blocks/home/08-services-sticky-stack.html` + `.sss-*` rules in `public/elementor-export/global.css`.

This document exists so a new team (CV/marketing/dev) can spin up another sticky-stack section — e.g. *Mentorship Curriculum*, *Patient Journey Steps*, *Surgical Process* — without reinventing the scroll math, palette, or accessibility contract. It defines the **HTML contract**, the **CSS token contract**, the **scroll & interactivity contract**, and the **content contract**.

---

## 1. When to use this pattern

Use a sticky-stack section when **all** of the following are true:

1. You have **3–7 ordered items** that share a single visual rhythm (services, steps, capabilities, phases).
2. Each item carries a **rich payload**: category eyebrow, headline, paragraph with inline keyword links, two metrics, a CTA, and a media tile (video or photo).
3. The order matters narratively — readers should encounter item 1 before item 2.
4. You want a **wow moment** that isn't just a grid: scrolling should feel like stacking physical cards.

Do **not** use this pattern for:
- Unordered feature grids → use the standard card grid (atto-card-hover).
- Long lists (8+ items) → readers get fatigued by the pin.
- Sections without a paired media tile → the right column visually collapses.

---

## 2. HTML contract

```html
<section class="sss-section arefin" id="{section-id}" aria-label="{plain-language label}">
  <div class="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28">

    <!-- Header (centered, 48rem max) -->
    <div class="sss-head-wrap text-center mb-14 md:mb-20 max-w-3xl mx-auto">
      <p class="sss-eyebrow">{Eyebrow Label}</p>
      <h2 class="sss-heading font-arefin-heading text-fluid-h2 lg:text-[44px] leading-tight">
        {Plain headline} <em>{italic accent}</em> {trailing words}
      </h2>
      <p class="sss-intro mt-5 text-base leading-relaxed">
        {1–2 sentence intro with <strong>2–3 inline emphasis spans</strong>.}
      </p>
    </div>

    <!-- Stack (one sticky-wrapper per card, with --sss-top stagger) -->
    <div class="sss-stack">
      <div class="sss-sticky-wrapper" style="--sss-top: 90px;  z-index: 1;">
        <article class="sss-card" data-step="1">
          <div class="sss-card-content">
            <a class="sss-category-link" href="{link}"><span class="sss-category">{Category}</span></a>
            <h3 class="sss-card-title"><a class="sss-card-title-link" href="{link}">{Card title}</a></h3>
            <p class="sss-card-desc">
              {Body with <a class="sss-desc-link" href="{link}"><strong>2–3 inline keyword links</strong></a>.}
            </p>
            <div class="sss-stats">
              <div class="sss-stat"><span class="sss-stat-value">{Number}</span><span class="sss-stat-label">{LABEL CAPS}</span></div>
              <div class="sss-stat"><span class="sss-stat-value">{Number}</span><span class="sss-stat-label">{LABEL CAPS}</span></div>
            </div>
            <a class="sss-cta" href="{link}">Learn more →</a>
          </div>
          <div class="sss-card-media">
            <!-- Static image fallback OR sss-flip video card (see §5) -->
            <img class="sss-card-img" src="{poster}" alt="{descriptive alt}" width="560" height="400" loading="lazy" />
          </div>
        </article>
      </div>

      <div class="sss-sticky-wrapper" style="--sss-top: 110px; z-index: 2;">
        <article class="sss-card" data-step="2"> … </article>
      </div>
      <!-- repeat: --sss-top grows by CARD_OFFSET (20px) per card; data-step increments -->
    </div>

  </div>
</section>
```

**Hard rules:**

- `data-step` is **1-indexed** and drives the per-card palette (see §3). Never skip a number.
- `--sss-top` follows the formula `FIRST_STICKY_TOP + (index * CARD_OFFSET)` = `90 + (i * 20)` px. This staggers the resting positions so each new card lands slightly below the previous one — the "fanned deck" look.
- `z-index` must equal `data-step` so later cards paint over earlier ones.
- Wrap every sticky card in its own `.sss-sticky-wrapper`. Never put `position: sticky` directly on `.sss-card`.
- The `.arefin` class on `<section>` is required for design-token scoping.

---

## 3. Color contract (per-card palette by `data-step`)

Each card carries a **self-contained palette** via CSS variables defined on `[data-step="N"]`. The body inherits these via `var(--c-*)`. This is the **only place** you may introduce non-standard hexes — they live here as scoped overrides, never bleed out.

| step | `--c-bg` | `--c-text` | `--c-mute` | `--c-faint` | `--c-border` | `--c-hover` |
|------|----------|------------|------------|-------------|--------------|-------------|
| 1 | `#FAF6EE` (warm ivory) | `#0B0E14` | `hsl(150 12% 22%)` | `hsl(150 10% 38%)` | `hsl(0 0% 0% / 0.18)` | `var(--primary-darker)` |
| 2 | `#E8F5E9` (pale mint) | `#0B2912` | `hsl(140 25% 18%)` | `hsl(140 18% 32%)` | `hsl(140 30% 20% / 0.22)` | `var(--primary-darker)` |
| 3 | `var(--primary-bright)` `#14bb3e` | `#000` | `hsl(0 0% 0% / 0.85)` | `hsl(0 0% 0% / 0.7)` | `hsl(0 0% 0% / 0.35)` | `#fff` |
| 4 | `var(--primary-bright)` `#14bb3e` | `#000` | `hsl(0 0% 0% / 0.85)` | `hsl(0 0% 0% / 0.7)` | `hsl(0 0% 0% / 0.35)` | `#fff` |
| 5 | `#0B5E22` (deep forest) | `#fff` | `hsl(0 0% 100% / 0.78)` | `hsl(0 0% 100% / 0.55)` | `hsl(0 0% 100% / 0.4)` | `var(--primary-light)` |
| 6 | `#0B1733` (midnight ink) | `#fff` | `hsl(0 0% 100% / 0.78)` | `hsl(0 0% 100% / 0.55)` | `hsl(0 0% 100% / 0.4)` | `var(--primary-light)` |

**Why this ramp:** the deck walks the reader from soft ivory → mint → brand green peak → forest → ink. It mirrors the "deepening expertise" narrative.

**Adapting the ramp for a different section:**

- Keep the **first card warm and light** and the **last card dark/inky**. The mid-stack is where you place the bright `--primary-bright` peak.
- Steps 3 & 4 should share the **brand green peak** unless your section has 5 or fewer cards (then peak at step 3 only).
- Greens are locked to `--primary-bright` (`#14bb3e`) and `--primary-darker` (`#079a14`). Never introduce a third green here. See `mem://style/color-palette-greens-two-only`.
- Section background is **always** `hsl(var(--arefin-light-mint, 140 40% 95%))` — this ensures the lightest card still sits on a tinted band, not pure white.

---

## 4. Scroll & sizing contract

| Constant | Value | Purpose |
|----------|-------|---------|
| `FIRST_STICKY_TOP` | `90px` | Distance from viewport top where card 1 pins. Accounts for sticky header height. |
| `CARD_OFFSET` | `20px` | Per-card vertical offset added to each subsequent pin position. |
| `--sss-top` | `calc(FIRST_STICKY_TOP + index * CARD_OFFSET)` | Resolved per card and applied as `top:` on the wrapper. |
| Card height | `min-height: clamp(420px, 60vh, 560px)` | Keeps the deck stable across viewports. |
| Card max-width | `100%` of `.sss-stack` (which is the 1248px container) | No nested max-widths. |
| Card radius | `24px` | Matches the brand "card" radius token. |
| Card grid | 2 columns desktop (`1fr 1fr`), single column ≤ 768px | Media tile drops below content on mobile. |

**Ancestor neutralization (required).** `position: sticky` silently breaks if any ancestor sets `overflow: hidden | auto | clip` on any axis. The reference component walks up the DOM in `useEffect`, temporarily setting overflowed ancestors to `overflow: visible`, and clipping `<html>` and `<body>` on the X-axis instead. New sections **must** do the same or be guaranteed-clean ancestry from `<body>` down. Function: `initStickyStackFix()` in `public/elementor-export/blocks/arefin-interactivity.js`.

---

## 5. Media tile contract

Each card's right column holds one of two media types. **Pick one per section — do not mix within a single stack.**

### 5a. Static image (default)

```html
<img class="sss-card-img"
     src="{poster}"
     alt="{descriptive alt}"
     width="560" height="400"
     loading="lazy" />
```

- Always provide explicit `width` and `height` to prevent CLS.
- Always `loading="lazy"` — only card 1 is visible above the fold.
- Alt text describes the actual scene, not the marketing message.

### 5b. Flip-to-video card (when a YouTube ID is available)

The "video card" pattern in `StickyStackServices` is a **flip card**: image on the front with an animated play badge, iframe on the back. Hover (desktop) or tap (touch) flips Y; hover-out flips back and unmounts the iframe after the 700ms flip completes (so audio stops cleanly).

Markup:

```html
<div class="sss-flip" data-flipped="false">
  <div class="sss-flip-inner">
    <button class="sss-flip-face sss-flip-front sss-video-thumb" aria-label="Play video: {alt}">
      <img class="sss-card-img" … />
      <span class="sss-play-btn sss-play-btn--pulse"><!-- inline YouTube play SVG --></span>
    </button>
    <div class="sss-flip-face sss-flip-back" aria-hidden="true">
      <!-- iframe mounted only while flipped="true" -->
    </div>
  </div>
</div>
```

Behavior contract:

- `160ms` hover-intent delay before flip (avoids accidental flips during scroll).
- `120ms` leave-intent delay before flipping back.
- Touch / coarse pointer → flip on tap only, never on hover.
- Iframe `src` carries `autoplay=1&mute={1|0}&playsinline=1&rel=0`.
- Iframe unmounts via `setTimeout(700ms)` after flip-back — required to stop audio.

YouTube ID resolution (only relevant if you wire to the feed):
1. Hard-coded `videoId` on the card wins.
2. Otherwise, keyword-score against the channel feed (exact substring = 10, token match = 5, partial = 2).
3. Highest score wins; round-robin fills the rest. Each video used at most once.

---

## 6. Typography contract

| Element | Class | Token |
|---------|-------|-------|
| Section eyebrow | `.sss-eyebrow` | `text-xs / uppercase / tracking-[0.25em] / color: var(--primary-deep)` |
| Section H2 | `.sss-heading` | `font-arefin-heading / text-fluid-h2` (lg desktop: `44px` hard-pin allowed) |
| Section intro | `.sss-intro` | `text-base / leading-relaxed / color: hsl(150 15% 25%)` |
| Card category | `.sss-category` | `italic / 0.85rem / font-heading / uppercase / color: var(--c-faint)` |
| Card H3 | `.sss-card-title` | `font-heading / clamp(1.4rem, 2.5vw, 1.85rem) / weight 700 / color: var(--c-text)` |
| Card body | `.sss-card-desc` | `0.9rem / line-height 1.75 / color: var(--c-mute)` |
| Stat value | `.sss-stat-value` | `font-heading / 1.75rem / weight 700 / color: var(--c-text)` |
| Stat label | `.sss-stat-label` | `0.7rem / uppercase / tracking 0.1em / color: var(--c-faint)` |
| CTA | `.sss-cta` | `0.875rem / weight 600 / color: var(--c-text) / underline on hover via border` |

**Hard rules carried from project memory:**
- `<strong>` inside `.sss-card-desc` / `.sss-intro` must use `color: inherit; font-weight: inherit`. Hover-only change: color → `var(--primary)`, plus the inkblot text-shadow. See `mem://style/strong-tag-body-text-rule`.
- Never set `font-size` on H2/H3/p outside the fluid ramp tokens. See `mem://style/typography/responsive-type-ramp`.
- Heading hover uses the unified `--hover-shadow-ink` token: `1px 0.7px 0 hsl(var(--hover-shadow-ink) / 0.25)`. See `mem://style/visual-legibility/hover-shadow-ink-token`.

---

## 7. Interaction contract

| Trigger | Behavior |
|---------|----------|
| Scroll into section | Each card pins at `--sss-top` and stays pinned while its successor scrolls in. |
| Hover card | Title color → `var(--c-hover)`, text-shadow inkblot, **no translate/scale**. |
| Hover keyword `<strong>` inside body | Color → `var(--primary)`, text-shadow inkblot. |
| Hover video tile (desktop) | 160ms intent delay → flip Y, autoplay muted. |
| Hover-out video tile | 120ms intent delay → flip back; iframe unmounts at 700ms. |
| Tap video tile (touch) | Flip + autoplay with audio. Second tap flips back. |
| Focus card title link | Outline ring `2px solid var(--c-hover)` with `2px` offset. Never hide focus. |
| `prefers-reduced-motion: reduce` | Disable the flip transition. Card title hover keeps color change, drops text-shadow. |

**Forbidden:**
- `translateY/translateX/scale` on hover (see `mem://constraints/no-hover-uplift`).
- Inline styles, `!important`, or Tailwind classes on `<strong>` inside `.sss-card-desc`.
- Re-introducing intermediate greens between `#14bb3e` and `#079a14`.

---

## 8. Accessibility contract

- Section root `<section>` carries `aria-label` describing the group (not just "Services").
- Each card is an `<article>` so screen readers announce it as a discrete unit.
- Card title is an `<h3>` (section H2 stays unique). Title is itself a link — wrap it in `<a>` rather than putting the link inside the heading text.
- Inline keyword links inside `.sss-card-desc` always carry `title="{Keyword} — {Card title}"` for keyboard users hovering with screen reader on.
- Video play button is a real `<button>` with `aria-label="Play video: {alt}"`. The back face is `aria-hidden` until flipped.
- Color contrast at every step ≥ 4.5:1 for body text and ≥ 3:1 for the H3 (large text). The peak-green step (3 & 4) uses **black text** on `#14bb3e` precisely to clear AA — never white text on bright green. See `mem://constraints/accessibility-compliance`.
- Focus rings on every link/button. Default browser outline is fine; never `outline: none` without a replacement.

---

## 9. Content contract

A sticky-stack section reads as **one sentence per card** when you skim only the H3s in order. Compose card titles so that, read top-to-bottom, they tell a coherent story.

| Slot | Length | Style |
|------|--------|-------|
| Eyebrow | 2–3 words | Title case, e.g. *Our Expertise*, *Patient Journey*, *Surgical Process* |
| Section H2 | 4–8 words | One italic accent span inside the H2 (`<em>`), no other emphasis |
| Section intro | 1–2 sentences | 2–3 `<strong>` highlights, each a keyword that the cards will expand on |
| Card category | 1–2 words | Discipline, sub-specialty, or phase name |
| Card title | 3–6 words | Active, specific, no marketing fluff |
| Card body | 28–55 words | 2–3 inline keyword links wrapped as `<a><strong>{keyword}</strong></a>` |
| Card stat × 2 | Number + ALL-CAPS label | Numbers stay tight (e.g. *1500+*, *>95%*, *2–3 days*) |
| Card CTA | 2–4 words | `Learn more →` is the default; vary only when the destination warrants it |

---

## 10. Class-name reuse outside the services context

`.sss-*` stands for **S**ticky **S**tack **S**ection — the prefix is intentionally generic. To build a new sticky-stack section (mentorship curriculum, patient journey, etc.):

1. Copy the markup in §2 verbatim. Keep all `sss-*` classes.
2. Override only the **content**. Do not introduce a parallel class system (`mentorship-stack-*`, etc.).
3. If you need section-scoped palette tweaks (e.g. mentorship uses indigo accents), override the per-step `--c-*` vars under a single section selector — never duplicate the whole rule set:

   ```css
   body.wp-theme-astra #mentorship-stack .sss-card[data-step="3"],
   body.wp-theme-astra #mentorship-stack .sss-card[data-step="4"] {
     --c-bg: #4c1d95;
     --c-text: #fff;
     --c-hover: #c4b5fd;
   }
   ```

4. Section background stays `var(--arefin-light-mint)` unless the surrounding page explicitly calls for a different band.
5. Re-use `initStickyStackFix()` from `arefin-interactivity.js` for sticky-ancestor neutralization. Don't write a second copy.

---

## 11. Files to touch when adding a new sticky-stack section

| Concern | File | What changes |
|---------|------|--------------|
| React component | `src/components/arefin/{NewName}StickyStack.tsx` | New file. Compose from the StickyStackServices template; only data + `id` differ. |
| React route mount | `src/pages/{Page}.tsx` | Import + render the new component in section order. |
| WP export HTML | `public/elementor-export/blocks/{scope}/{NN-name}.html` | Static mirror per `mem://tech/wordpress/export-architecture`. |
| WP export CSS | `public/elementor-export/global.css` | Only add the `#{section-id}` scope overrides from §10.3 — do **not** duplicate `.sss-*` base rules. |
| WP export JS | `public/elementor-export/blocks/arefin-interactivity.js` | No change unless you need a non-standard interaction. `initStickyStackFix()` already runs for every `.sss-section` on the page. |

---

## 12. Definition of done

A new sticky-stack section is shippable when **all** of the following hold:

- [ ] Markup matches §2 verbatim — no parallel class prefixes.
- [ ] Per-card `--c-*` palette ramps light → brand → dark (§3 contract).
- [ ] Section background is `--arefin-light-mint`.
- [ ] `--sss-top` follows `90 + index*20` (§4).
- [ ] All `<strong>` in body text obey the inherit/inherit rule.
- [ ] No `translate*/scale` in any hover.
- [ ] Color contrast verified ≥ AA at every step (especially black-on-green at the peak).
- [ ] Focus rings visible on every interactive element.
- [ ] Sticky positioning verified to **not** break when nested inside any wrapper — ancestor overflow neutralized.
- [ ] `prefers-reduced-motion` disables the flip transition.
- [ ] Skim test: reading only the eyebrow + H2 + 6 card H3s tells a coherent story.

---

*Last updated: 2026-05-24. Maintainer: any team. Changes to the palette ramp or scroll constants require updating this file in the same commit.*
