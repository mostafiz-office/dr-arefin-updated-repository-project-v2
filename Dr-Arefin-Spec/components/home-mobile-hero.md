# Home Mobile Hero — Full-Viewport Spec

Mobile-only homepage hero. Renders <1024px (mobile + tablet). Replaces the
existing `HeroV04InteractiveOrgans` on small screens.

---

## Hard constraints

- **Total height = `100svh` minus the sticky header (70px).** Section uses
  `min-height: calc(100svh - 70px)` so iOS toolbars don't crop it.
- **Everything visible without scrolling**: portrait + eyebrow + H1 + lede +
  primary CTA + phone CTA + trust line all fit inside one viewport.
- **Portrait first** (per user feedback). Image is the visual anchor.
- **No org orbs / floating med icons on mobile** — too noisy for compact viewport.
- **Two greens only** (`--primary-bright` rest, `--primary-darker` hover). No
  new tokens. No AI-generated portraits — re-use `arefin-portrait-light.webp`.
- **Type ramp**: H1 uses `var(--fs-h1)`; lede uses `var(--fs-body)`. Never
  hardcode font-size.
- **Conditional render**: in `DrArefinHomeDark.tsx`, gate the existing hero with
  `hidden lg:block` and render the new mobile hero with `lg:hidden`. No JS
  `useIsMobile` hook needed → no SSR/hydration flash.
- **Reduced motion**: respect `prefers-reduced-motion: reduce` for any animation.

---

## Three variants

### V1 — Stacked Compact (default)

```
┌───────────── 100svh ─────────────┐
│  [ portrait — circular crop, ~38vh ] │
│                                   │
│   eyebrow (uppercase, 11px)       │
│   H1 (2 lines, ~28px clamp)       │
│   1-line lede (~14px, 2 lines)    │
│                                   │
│   [ Book Appointment  →   ]       │
│   [ 📞 Call Now            ]      │
│                                   │
│   FCPS · MS · 1500+ surgeries     │
└───────────────────────────────────┘
```

- Vertical flex column, `justify-content: space-between`.
- Portrait wrapped in radial gradient halo (no rotating orbs).
- Trust line is a single comma-separated row, not the 2-column grid.

### V2 — Side-Aligned (image right, text left)

```
┌───────────── 100svh ─────────────┐
│ eyebrow                           │
│ H1 line 1            ┌─────────┐  │
│ H1 line 2            │ portrait│  │
│ lede 2 lines         │  3/4    │  │
│                      │  crop   │  │
│ [ Book →  ]          │         │  │
│ [ 📞 Call ]          └─────────┘  │
│ trust line                        │
└───────────────────────────────────┘
```

- 2-col grid `grid-cols-[1fr_40%]`.
- Portrait fills right column, anchored bottom-right, 60% viewport height max.
- Used best on landscape phones / tall narrow phones.

### V3 — Full-Bleed Background

```
┌───────────── 100svh ─────────────┐
│ ▒▒▒▒▒ portrait fills frame ▒▒▒▒▒ │
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │
│ ░░░ dark gradient overlay ░░░░░░ │
│                                   │
│   eyebrow (white)                 │
│   H1 (white, 3 lines)             │
│   lede (white/80)                 │
│   [ Book →  ]  [ Call ]           │
│   trust line                      │
└───────────────────────────────────┘
```

- `<img>` absolutely positioned, `object-fit: cover`, `object-position: top`.
- Gradient: `linear-gradient(180deg, transparent 0%, hsl(var(--background)/.6) 50%, hsl(var(--background)) 100%)`.
- Text block anchored bottom with safe-area padding.

---

## Files to create

- `src/components/arefin/hero-variations/HomeMobileHeroV1.tsx`
- `src/components/arefin/hero-variations/HomeMobileHeroV2.tsx`
- `src/components/arefin/hero-variations/HomeMobileHeroV3.tsx`
- `src/components/arefin/hero-variations/HomeMobileHero.tsx` — wrapper that
  picks a variant via prop (default V1). Lets us A/B by changing one line.

## Wire-up (in `DrArefinHomeDark.tsx`)

```tsx
<div className="lg:hidden"><HomeMobileHero variant="v1" /></div>
<div className="hidden lg:block"><HeroV04InteractiveOrgans /></div>
```

## Acceptance

- 360×640, 390×653, 414×896, 430×932 → no scroll needed; all 6 elements
  (portrait, eyebrow, H1, lede, 2 CTAs, trust) visible.
- Lighthouse mobile perf ≥ 90; LCP element = portrait, eager + preload.
- WCAG AA contrast on all text (V3 must check overlay opacity).
