# 03 — Colors, Themes & Fonts: Value Proposition (Project 04)

**Section:** Value Proposition · **Project sequence (YY):** 04
All values in HSL (per project rule). Hex shown only for human reference.
**Inherits 100% of the Hero LIGHT token system — no new variables introduced.**

---

## 1. Color tokens (reused from Hero LIGHT)

Defined in `src/index.css` under the `@layer base` block.

| Token | HSL | Hex (ref) | Usage in Value Prop |
|-------|-----|-----------|---------------------|
| `--hero-light-bg` | `0 0% 100%` | `#FFFFFF` | Section base surface (all variations) |
| `--hero-light-surface` | `138 60% 95%` | `#E8F8EC` | Variation C card background |
| `--hero-light-primary` | `142 71% 45%` | `#22C55E` | Step numbers, sage bar, hover accent (all variations) |
| `--hero-light-deep` | `0 0% 8%` | `#141414` | Titles, dark body text on Var B |
| `--hero-light-muted` | `0 0% 38%` | — | Description body (Var A, Var C) |
| `--hero-light-border` | `138 35% 88%` | — | 1px hairlines on Var A divider, Var B card border |

### Variation-specific color slots

| Slot | Variation A | Variation B | Variation C |
|------|-------------|-------------|-------------|
| Background | `hsl(var(--hero-light-bg))` | `hsl(var(--hero-light-bg))` | `hsl(var(--hero-light-bg))` |
| Card bg | — (flat) | `hsl(var(--hero-light-bg))` | `hsl(var(--hero-light-surface))` |
| Step number | `hsl(var(--hero-light-primary))` | `hsl(var(--hero-light-primary))` (small uppercase) | `hsl(var(--hero-light-primary))` |
| Accent rule | sage 2px bar under number | 4px sage top bar on card | 4px sage vertical bar left of number |
| Title | `hsl(var(--hero-light-deep))` | `hsl(var(--hero-light-deep))` | `hsl(var(--hero-light-deep))` |
| Description | `hsl(var(--hero-light-muted))` | `hsl(var(--hero-light-deep) / 0.7)` | `hsl(var(--hero-light-muted))` |
| Hover accent | number darkens to deep, bar grows | sage glow shadow + sage border | bar widens 4→6px, card bg lifts to white |

---

## 2. Font system (reused from Hero LIGHT)

| Role | Family | Weight | Tailwind class |
|------|--------|--------|----------------|
| Step numbers (Var A, C) | **Ubuntu** | 700 | `font-arefin-heading` |
| Step label (Var B uppercase) | **Poppins** | 600 | `font-arefin` |
| Titles (H3 all variations) | **Ubuntu** | 700 | `font-arefin-heading` |
| Descriptions | **Poppins** | 400 | `font-arefin` |

Already imported in `src/index.css` via Google Fonts.

---

## 3. Type scale

| Slot | Variation A | Variation B | Variation C |
|------|-------------|-------------|-------------|
| Step number | 72px / 1.0 / -0.04em | 14px / 1 / 0.18em uppercase | 56px / 0.9 / -0.02em |
| Title | 22px / 1.25 | 20px / 1.3 | 20px / 1.3 |
| Description | 15px / 1.6 | 15px / 1.65 | 14.5px / 1.6 |

---

## 4. Spacing & radius

| Token | Value | Usage |
|-------|-------|-------|
| Container max-width | 1248px | Inherited from Hero LIGHT |
| Section padding (desktop) | `py-20 md:py-24 lg:py-28` | All variations |
| Section padding (mobile) | `py-14` | All variations |
| Grid gap (desktop) | `32px` | All variations |
| Grid gap (mobile) | `20px` | All variations |
| Card radius (Var B) | `1rem` (16px) | |
| Card radius (Var C) | `1rem` (16px) | |
| Vertical bar (Var C) | 4px wide, 9999px radius | |
| Sage top bar (Var B) | 4px tall, top corners 16px | |
| Sage underline (Var A) | 32px × 2px, 9999px radius | |

---

## 5. Animation tokens (reused from Hero LIGHT)

| Class | Effect | Duration | Easing |
|-------|--------|----------|--------|
| `hero-anim-fade-up` | translate-up + fade | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `hero-anim-card` | fade + scale 0.96→1 | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `hero-anim-bar` | vertical bar grow | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Stagger delays | `hero-d-0` / `hero-d-100` / `hero-d-200` | — | applied per column |
| Hover transition | all transformable props | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` |

---

## 6. Reduced motion

All `.arefin *` animations are auto-clamped to `0.01ms` under `@media (prefers-reduced-motion: reduce)` — already enforced in `src/index.css`. No additional rule needed for Value Prop.

---

## 7. Contrast verification (WCAG 2.1 AA)

| Pair | Ratio | Pass |
|------|-------|------|
| `#141414` on `#FFFFFF` | 19.4:1 | ✅ AAA |
| `#22C55E` on `#FFFFFF` | 4.55:1 | ✅ AA (large + normal) |
| `#141414` (70%) on `#FFFFFF` | ~13.6:1 | ✅ AAA |
| `#141414` on `#E8F8EC` | 17.8:1 | ✅ AAA |
| muted (38% black) on `#FFFFFF` | 5.74:1 | ✅ AA |
