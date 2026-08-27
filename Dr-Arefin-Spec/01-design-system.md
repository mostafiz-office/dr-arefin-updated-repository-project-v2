# Design System — Dr. Arefin

> **Inheritance rule**: All component patterns, hover behaviors, animations, layout system (1248px container), interaction rules, and CSS architecture are **inherited 1:1 from CAF Patronato Fondi**. See `07-inherited-patterns.md` for the full contract. This file documents only **brand-specific token replacements**.

## Color Tokens (HSL — required format)

All colors **MUST** be HSL in `src/index.css` and `tailwind.config.ts`. Hex shown only for reference.

### Primary brand

| Token | HSL | Hex (source) | Usage |
|-------|-----|------|-------|
| `--background-dark` | `213 39% 17%` | `#1C2A3C` | Hero, dark sections, primary surface |
| `--background-darker` | `216 41% 12%` | `#111A28` | Deeper section background |
| `--background-deepest` | `192 60% 6%` | `#061314` | Footer |
| `--foreground` | `0 0% 100%` | `#FFFFFF` | Primary text on dark |
| `--muted-foreground` | `220 9% 67%` | `#9CA3AF` | Secondary/muted text |

### Accent green (Dr. Arefin's signature) — **TWO GREENS ONLY**

> **Rule**: The entire system uses **only two greens**. Never introduce additional green hues. All other green-named tokens (`--primary`, `--primary-glow`, `--primary-deep`, `--primary-light`, `--primary-hover`) are **aliases** that resolve to one of the two below.

| Token | HSL | Hex | Usage |
|-------|-----|------|-------|
| `--primary-bright` | `133 80% 41%` | `#14bb3e` | **Resting / default green.** Buttons, CTAs, accent text, numerals, links at rest. Aliased by `--primary`, `--primary-glow`, `--primary-light`. |
| `--primary-darker` | `128 91% 32%` | `#079a14` | **Hover / emphasis / active green only.** Aliased by `--primary-deep`, `--primary-hover`. |

❌ Forbidden: `#22C55E`, `#0cd067`, `#379237`, `#54B435`, or any other green outside the two above.

### Light tints (for light sections)

| Token | HSL | Hex | Usage |
|-------|-----|------|-------|
| `--surface-light` | `0 0% 100%` | `#FFFFFF` | Card surfaces on light |
| `--surface-tint-1` | `97 71% 93%` | `#EDFBE2` | Subtle green tint background |
| `--surface-tint-2` | `102 78% 94%` | `#EEFCE5` | Alt green tint |
| `--border` | `0 0% 92%` | `#eaeaea` | Default borders |

### CTA pill (Call/Book toggle — signature element)

| Token | HSL | Hex | Usage |
|-------|-----|------|-------|
| `--cta-pill-bg` | `0 0% 100%` | `#FFFFFF` | "Call" half background |
| `--cta-pill-active` | `142 71% 45%` | `#22C55E` | "Book" half background (active green) |
| `--cta-pill-text-dark` | `213 39% 17%` | `#1C2A3C` | "Call" text |
| `--cta-pill-text-light` | `0 0% 100%` | `#FFFFFF` | "Book" text |

## Typography

### Font Stack
- **Headings**: `Ubuntu`, weight 700 — Google Fonts
- **Body / nav / buttons**: `Poppins`, weights 400 / 500 / 600 — Google Fonts
- **Fallback chain**: `'Ubuntu', 'Poppins', system-ui, -apple-system, sans-serif`

### Loading
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
```

### Type Scale
| Element | Size | Weight | Font |
|---------|------|--------|------|
| H1 hero | `clamp(2.5rem, 5vw, 4.5rem)` | 700 | Ubuntu |
| H2 section | `clamp(2rem, 4vw, 3rem)` | 700 | Ubuntu |
| H3 card | `1.5rem` | 700 | Ubuntu |
| Body | `1rem` (16px) | 400 | Poppins |
| Body large | `1.125rem` | 400 | Poppins |
| Section label | `0.75rem` uppercase tracking-widest | 600 | Poppins |
| Numerals (01/02/03) | `clamp(2.5rem, 5vw, 4rem)` | 700 | Ubuntu, color `var(--primary)` |

## Layout System (inherited from CAF)
- **Max container**: 1248px with `box-sizing: border-box`
- **Padding**: 24px (1.5rem) left/right
- **Visible content width**: 1200px
- **Section spacing**: `py-20 md:py-28` (standard) · `py-16 md:py-20` (compact)

## Component Patterns (inherited — see 07-inherited-patterns.md)
- All hover/animation/scroll-reveal patterns from CAF apply 1:1
- Replace CAF green (`#54B435`) → Dr. Arefin green (`#22C55E`)
- Replace CAF white-first design surfaces → Dr. Arefin dark navy (`#1C2A3C`) for hero/dark sections
- Cards: `bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/20 transition-all`
- Sticky stack cards (DesignMonks pattern) — keep
- Blog card hover (Atto Property pattern: 3px green left border + zero-blur shadow) — keep

## Logo
- **Source**: `https://drarefin.com/wp-content/uploads/2026/04/logos.png`
- **Dimensions**: 2000×632 (full) — use 555×174 for header
- **Wordmark**: "DR. M AREFIN" (top, bold) + "HEPATOBILIARY PANACEA" (subline, smaller)
- **Icon**: Liver/anatomy illustration (red/maroon) — preserve color when on dark backgrounds

## Forbidden
- ❌ No `!important` (project-wide CAF rule)
- ❌ No inline styles
- ❌ No raw color classes (`text-white`, `bg-black`) — semantic tokens only
- ❌ No hover position shifts (`translateY/X` forbidden — use color/shadow/filter)
- ❌ No serif fonts