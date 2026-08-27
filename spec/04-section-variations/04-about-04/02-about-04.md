# 02 — About Variations (Project 04)

**Section:** About Dr. Murshidul Arefin · **Project sequence:** 04
**Three variations (A / B / C)** — all light theme, premium medical aesthetic, CSS3 0.3s entrance.

---

## Shared structure (all variations)

```
<section class="hero-04-light-band arefin">
  <div class="container max-w-[1248px] mx-auto px-6 py-24 md:py-32">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      <!-- text column -->
      <!-- image column -->
    </div>
  </div>
</section>
```

Eyebrow label across all variants: `ABOUT THE SURGEON` — 12px Poppins 600, uppercase, `letter-spacing: 0.25em`, color `hsl(var(--hero-light-primary))`, prefixed by a 24×1px sage rule.

H2 heading: `font-arefin-heading`, 36px → 44px (md) → 52px (lg), `line-height: 1.1`, `letter-spacing: -0.02em`, color `hsl(var(--hero-light-deep))`.

Body paragraphs: 17px Poppins 400, `line-height: 1.75`, color `hsl(var(--hero-light-muted))`, paragraph gap `1.25rem`. Strong-anchor inline phrases use `hsl(var(--hero-light-deep))` weight 600 (and Variation B turns key phrases into anchored links).

CTA: `SlideButton` primary (filled sage) → `/about/`.

Image base: `src/assets/dr-arefin-portrait.jpeg`, `loading="lazy"`, `decoding="async"`, alt = `Dr. Murshidul Arefin — Hepatobiliary & Liver Transplant Surgeon, Dhaka`. `aspect-[4/5]`, `object-cover`, `rounded-2xl`, hairline `1px hsl(var(--hero-light-border))`.

---

## Variation A — Editorial Classic

**Vibe:** Magazine-style. Asymmetric grid (text 6 / image 6), portrait in soft frame, signature line under H2, generous whitespace.

| Element | Style |
|---------|-------|
| Grid | `lg:grid-cols-12` · text `lg:col-span-6` · image `lg:col-span-6` |
| Eyebrow | `ABOUT THE SURGEON` with 24×1px sage rule prefix |
| Heading | 36/44/52, weight 700, `letter-spacing: -0.02em` |
| Signature line | 56px × 2px sage bar below H2, `margin-top: 20px` |
| Body | 3 paragraphs, 17px / 1.75, gap 20px |
| CTA | `SlideButton` primary "Learn More" → `/about/` |
| Image | `aspect-[4/5]`, `rounded-2xl`, hairline border, hover: sharp zero-blur shadow `8px 8px 0 0 hsl(var(--hero-light-primary) / 0.18)`, no lift |
| Image position | right (`lg:order-2`) |

Animation: text column `hero-anim-fade-up hero-d-0`, image column `hero-anim-card hero-d-100`.

---

## Variation B — Credentials Showcase

**Vibe:** Trust-forward private practice. Floating credentials chip-strip overlay on image. Inline strong-anchor SEO links inside body.

| Element | Style |
|---------|-------|
| Grid | `lg:grid-cols-12` · text `lg:col-span-7` · image `lg:col-span-5` |
| Eyebrow | `ABOUT THE SURGEON` (same as A) |
| Heading | 36/44/52, weight 700 |
| Body | Same 3 paragraphs but with strong-anchor links: `<strong><a>Hepatobiliary and Pancreatic Surgery Specialist</a></strong>` → `/treatment/`, `BSMMU` (no link, just bold), `Liver Transplant Surgery` → `/treatment/`, `best hepatobiliary surgeons in Dhaka` → `/about/` |
| CTA row | Primary `SlideButton` "Learn More" + ghost text-link "Read full bio →" |
| Image wrapper | `relative` |
| Image | `aspect-[4/5]`, `rounded-2xl` |
| Credentials chip | Glass-morphic floating card bottom-left of image: `position: absolute`, `bottom: -16px`, `left: -16px`, `bg: hsl(0 0% 100% / 0.92)`, `backdrop-blur: 12px`, `border: 1px hsl(var(--hero-light-border))`, `rounded-xl`, `padding: 16px 20px`, `box-shadow: 0 12px 40px -16px hsl(var(--hero-light-deep) / 0.18)` |
| Chip content | 3 stacked rows: `MBBS · University of Dhaka` · `MS Hepatobiliary · BSMMU` · `Consultant · Popular Medical College` (each row 13px Poppins 500, sage dot bullet) |
| Image position | right |

Animation: text `hero-anim-fade-up hero-d-0`, image `hero-anim-card hero-d-100`, chip `hero-anim-fade-up hero-d-200`.

---

## Variation C — Clinical Authority (Stat Strip)

**Vibe:** Conversion-focused. Image left with offset sage accent block behind it. Stat strip with `CountUp`. Dual CTA.

| Element | Style |
|---------|-------|
| Grid | `lg:grid-cols-12` · image `lg:col-span-5` (left) · text `lg:col-span-7` (right) |
| Image wrapper | `relative` with `::before` accent block |
| Accent block | `position: absolute`, `inset: 16px -16px -16px 16px`, `background: hsl(var(--hero-light-primary))`, `border-radius: 1rem`, `z-index: 0` |
| Image | `relative z-1`, `aspect-[4/5]`, `rounded-2xl`, `border: 1px hsl(var(--hero-light-border))` |
| Eyebrow + Heading | Same as A |
| Body | 3 paragraphs, 17px / 1.75 |
| Stat strip | 3-column row below paragraphs, `padding-top: 24px`, `border-top: 1px hsl(var(--hero-light-border))`, `margin-top: 24px`. Each stat: number 32px Ubuntu 700 sage, label 12px Poppins 600 uppercase tracking `0.18em` muted. Stats: `7+ Years Experience` · `1000+ Successful Surgeries` · `100% Patient-First Care` |
| CTA row | Primary `SlideButton` "Learn More" → `/about/` + ghost link "Book Consultation" → `/contact/` |
| Image position | left (image first in DOM order on lg) |

Animation: image `hero-anim-card hero-d-0`, text `hero-anim-fade-up hero-d-100`, stats `hero-anim-fade-up hero-d-200`.

---

## Animation timing (all variations)

| Class | Duration | Easing |
|-------|----------|--------|
| `hero-anim-fade-up` | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `hero-anim-card` | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Stagger | 0 / 100 / 200 ms | — |
| Hover | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` |

All classes already exist in `src/index.css`. **No new CSS required.**

---

## Responsive behavior

| Breakpoint | Layout |
|-----------|--------|
| `< lg` (< 1024px) | 1 column stacked, image first then text. `py-16` |
| `lg` (≥ 1024px) | 12-col grid as specified per variation, `py-32` |

---

## Accessibility

- Single `<h2>` per variation (page H1 lives elsewhere)
- Image `alt` = full descriptive text (see Shared)
- Eyebrow rendered as plain `<span>` not heading
- Stat numbers use `aria-label` describing the full phrase
- All hover effects = color/shadow only — no positional translate
- Reduced motion handled by global `@media (prefers-reduced-motion: reduce)`

---

## Component file plan

```
src/components/arefin/about-variations/
  ├── AboutV04LightA.tsx
  ├── AboutV04LightB.tsx
  └── AboutV04LightC.tsx
```

Preview route: `/about-section` — sticky A/B/C jump-nav, intro strip identical to `/value-proposition` pattern, cross-links to Hero & Value Proposition variation pages.
