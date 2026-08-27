# 02 — Value Proposition Variations (Project 04)

**Section:** Value Proposition · **Project sequence (YY):** 04
**Three variations (A / B / C)** — all light theme, CSS3 0.3s entrance.

---

## Shared structure

```
<section class="value-prop-04 arefin">
  <div class="container max-w-[1248px] mx-auto px-6 py-20 md:py-24">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      <article class="vp-col">
        <span class="vp-num" aria-hidden="true">01</span>
        <h3 class="vp-title">Surgical Excellence</h3>
        <p class="vp-desc">…</p>
      </article>
      <!-- ×3 -->
    </div>
  </div>
</section>
```

Content (all 3 variations use identical copy from `01-audit-gap-...`).

---

## Variation A — Minimalist Numerals

**Vibe:** Editorial / Swiss minimal. No card chrome — numerals do all the visual work.

| Element | Style |
|---------|-------|
| Step number | 72px Ubuntu 700, color `hsl(var(--hero-light-primary))`, `line-height: 1`, `letter-spacing: -0.04em` |
| Underline accent | 32px × 2px sage bar below number, `margin-top: 12px` |
| Title | 22px Ubuntu 700, `hsl(var(--hero-light-deep))`, `margin-top: 20px` |
| Description | 15px / 1.6 Poppins 400, `hsl(var(--hero-light-muted))`, `margin-top: 12px` |
| Column padding | none (flat layout) |
| Divider | `md:border-l border-[hsl(var(--hero-light-border))] md:pl-8` from 2nd column onward |
| Hover | Number shifts to `hsl(var(--hero-light-deep))` over 0.3s, sage bar grows to 48px |

**Animation:**
- `.hero-anim-fade-up` on each `.vp-col`
- Stagger: col1 `hero-d-0`, col2 `hero-d-100`, col3 `hero-d-200`

---

## Variation B — Card Stack with Sage Accent

**Vibe:** Trust-first medical card. Bordered surface, sage top-rule, gentle hover lift via shadow only.

| Element | Style |
|---------|-------|
| Card | `bg-white`, `rounded-2xl`, `border 1px hsl(var(--hero-light-border))`, `padding: 32px 28px`, `box-shadow: 0 1px 2px rgba(20,20,20,0.04)` |
| Top accent | 4px-tall sage bar at top, full card width, `border-top-left-radius: 16px; border-top-right-radius: 16px` |
| Step number | 14px Poppins 600, uppercase, `letter-spacing: 0.18em`, `color: hsl(var(--hero-light-primary))`, prefixed by sage dot |
| Step format | `● STEP 01` |
| Title | 20px Ubuntu 700, `hsl(var(--hero-light-deep))`, `margin-top: 16px` |
| Description | 15px / 1.65 Poppins 400, `hsl(var(--hero-light-deep) / 0.7)`, `margin-top: 12px` |
| Hover | `box-shadow: 0 12px 32px -16px hsl(var(--hero-light-primary) / 0.25)`, `border-color: hsl(var(--hero-light-primary) / 0.4)`, no positional shift |
| Hover transition | `0.3s cubic-bezier(0.16, 1, 0.3, 1)` |

**Animation:** `.hero-anim-card` + stagger `hero-d-0/100/200`.

---

## Variation C — Bento Numeral with Vertical Bar

**Vibe:** Bold, modern, asymmetric. Big sage numeral lives in left column, content stacks right.

| Element | Style |
|---------|-------|
| Card | `bg-[hsl(var(--hero-light-surface))]`, `rounded-2xl`, `padding: 28px`, `display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: start` |
| Vertical bar | 4px wide × 100% height, `background: hsl(var(--hero-light-primary))`, `border-radius: 9999px`, anchored left of number |
| Step number | 56px Ubuntu 700, color `hsl(var(--hero-light-primary))`, `line-height: 0.9` |
| Title | 20px Ubuntu 700, `hsl(var(--hero-light-deep))` |
| Description | 14.5px / 1.6 Poppins 400, `hsl(var(--hero-light-muted))`, `margin-top: 10px` |
| Hover | Card bg lifts to white, vertical bar grows from 4px → 6px wide via `scaleX`, all 0.3s |

**Animation:** `.hero-anim-card` (card fade+scale) + `.hero-anim-bar` (vertical bar grow) + stagger `hero-d-0/100/200`.

---

## Animation timing (all variations)

| Class | Duration | Easing | Trigger |
|-------|----------|--------|---------|
| `hero-anim-fade-up` | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` | mount |
| `hero-anim-card` | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` | mount |
| `hero-anim-bar` | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` | mount (Var C) |
| Stagger delays | 0 / 100 / 200 ms | — | per column |
| Hover transitions | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` | `:hover` |

All classes already exist in `src/index.css` (defined for Hero LIGHT) — **no new CSS required**.

---

## Responsive behavior

| Breakpoint | Layout |
|-----------|--------|
| `< md` (< 768px) | 1 column stacked, `gap: 20px`, `py-14` |
| `md` (≥ 768px) | 3 columns, `gap: 32px`, `py-24` |
| `lg` (≥ 1024px) | 3 columns, `gap: 32px`, `py-28` |

---

## Accessibility

- Step number is `aria-hidden="true"` decorative (does not interrupt screen readers).
- Each column uses `<article>` with `<h3>` as the semantic anchor.
- Focus states (when made interactive) inherit `:focus-visible` outline `2px hsl(var(--hero-light-primary))` with `2px` offset.
- Reduced motion: animations clamped via existing `@media (prefers-reduced-motion: reduce)` rule.

---

## Component file plan

```
src/components/arefin/value-prop-variations/
  ├── ValuePropV04LightA.tsx
  ├── ValuePropV04LightB.tsx
  └── ValuePropV04LightC.tsx
```

Render order on `/hero-variations`: each variation pairs with the matching hero (Hero A → ValueProp A, etc.).
