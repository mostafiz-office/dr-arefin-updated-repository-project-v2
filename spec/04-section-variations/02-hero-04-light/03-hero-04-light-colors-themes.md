# 03 — Colors, Themes & Fonts: Hero LIGHT (Project 04)

**Section:** Hero (Light) · **Project sequence (YY):** 04
All values in HSL (per project rule). Hex shown only for human reference.

## Light hero color tokens (scoped to `.hero-04-light-band`)

Defined in `src/index.css` under the `@layer base` block.

| Token | HSL | Hex (ref) | Usage |
|-------|-----|-----------|-------|
| `--hero-light-bg` | `0 0% 100%` | `#FFFFFF` | Hero base surface (all 3 variations) |
| `--hero-light-surface` | `138 60% 95%` | `#E8F8EC` | Soft bright-green tint — ambient blob, portrait card backdrop |
| `--hero-light-primary` | `142 71% 45%` | `#22C55E` | **Dr. Arefin signature green** — eyebrow, highlighted H1 word, accent bar, pulse dot, outline CTA |
| `--hero-light-deep` | `0 0% 8%` | `#141414` | **Near-black** — H1, strong body, primary CTA background |
| `--hero-light-muted` | `0 0% 38%` | — | Body subtitle (neutral grey) |
| `--hero-light-border` | `138 35% 88%` | — | 1px hairlines on cards, portrait frame, header bottom |

### Forced text colors on the light band

| Slot | Color |
|------|-------|
| Eyebrow | `hsl(var(--hero-light-primary))` |
| H1 base | `hsl(var(--hero-light-deep))` |
| H1 highlight (`.text-sage`) | `hsl(var(--hero-light-primary))` |
| Subtitle | `hsl(var(--hero-light-muted))` |
| CTA primary bg | `hsl(var(--hero-light-deep))` (white text) |
| CTA primary hover | `filter: brightness(1.08)` + sage glow shadow |
| CTA outline | sage border + sage text → hover sage tint bg |
| Card body (Var B) | `hsl(var(--hero-light-deep) / 0.7)` |
| Bento label (Var C) | `hsl(var(--hero-light-muted))` |

## Font system

| Role | Family | Weight | Tailwind class |
|------|--------|--------|----------------|
| Headings (H1, card titles) | **Ubuntu** | 700 | `font-arefin-heading` |
| Body, eyebrow, subtitle, CTAs, labels | **Poppins** | 400 / 500 / 600 | `font-arefin` (default on `.arefin` scope) |

Already imported in `src/index.css` via Google Fonts.

## Spacing & radius

| Token | Value | Usage |
|-------|-------|-------|
| Container max-width | 1248px | Inherited |
| Section padding (desktop) | `py-20 md:py-24 lg:py-28` | All light variations |
| Section padding (mobile) | `py-14` | |
| Portrait frame radius | `1.5rem` (24px) | All variations |
| Credential card radius (Var B) | `0.75rem` (12px) | |
| Bento card radius (Var C) | `1rem` (16px) | |
| Vertical accent bar (Var C) | 4px wide, full column height, 9999px radius | |
| Header height | 72px | Sticky light header |

## Animation timing reference (reuses existing `.hero-anim-*` classes)

| Class | Effect | Duration | Easing |
|-------|--------|----------|--------|
| `hero-anim-fade-up` | Translate-up + fade entry | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `hero-anim-portrait` | Fade + scale 0.96→1 entry | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `hero-anim-card` | Fade + scale entry | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `hero-anim-halo` | Soft sage pulse loop (Var A portrait) | 4s | `ease-in-out infinite` |
| `hero-anim-float` / `-slow` | Floating credential cards (Var B) | 4s / 6s | `ease-in-out infinite` |
| `hero-anim-bar` | Vertical bar grow (Var C) | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `hero-anim-pulse-dot` | Availability pulse (Var C) | 1.5s | `ease-in-out infinite` |
| `hero-anim-ray` | Diagonal light ray drift (Var C) | 8s | `ease-in-out infinite` |

Stagger via `.hero-d-0/100/150/200/300/400/450/550/650/700` (all defined in `src/index.css`).

## Reduced motion

All `.arefin *` animations are auto-clamped to `0.01ms` under `@media (prefers-reduced-motion: reduce)` — already enforced in `src/index.css`.

## Header palette

The light header (`DrArefinHeaderLight`) uses:
- Background: `hsl(var(--hero-light-bg))` (white)
- Bottom border: `hsl(var(--hero-light-border))`
- Nav text: `hsl(var(--hero-light-deep) / 0.8)` → hover sage tint background
- "Book Appointment" CTA: deep-forest fill, white text
