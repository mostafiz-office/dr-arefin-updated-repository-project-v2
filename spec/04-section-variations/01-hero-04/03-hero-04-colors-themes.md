# 03 — Colors, Themes & Fonts: Hero (Project 04)

**Section:** Hero · **Project sequence (YY):** 04 (Dr. Arefin)

All values are HSL (per project rule). Hex shown only for human reference.

## Color tokens used

| Token | HSL | Hex (ref) | Usage in hero |
|-------|-----|-----------|---------------|
| `--background-deepest` | `192 60% 4%` (dark) / `160 30% 12%` (light theme override) | `#061314` | Hero base surface (all 3 variations) |
| `--primary` | `142 71% 45%` | `#22C55E` | Highlight word in H1, CTAs, accent bar, pulse dot, halo, ray |
| `--primary-light` | `142 71% 75%` | — | Soft halo edges, hover-bright text on dark |
| `--primary-glow` | `141 90% 43%` | `#0CD067` | Variation A halo peak, Variation C pulse peak |
| `--primary-deep` | `120 47% 39%` | `#379237` | Pressed / active states on CTA buttons |
| `--card` | dark: `160 20% 10%` / light: `0 0% 100%` | — | Variation B floating credential cards (with `/90 backdrop-blur`) |
| `--border` | `150 13% 91%` (light) / `160 15% 20%` (dark) | — | 1px frame around portrait + cards |
| `--foreground` | `0 0% 95%` (dark) / `160 20% 10%` (light) | — | Body text on hero — but we pin to `0 0% 100%` (white) on the deep band |
| `--muted-foreground` | `160 10% 60%` (dark) | — | Subtitle and trust-strip labels |

## Fixed colors that override the theme on the deep hero band

Because the hero always uses `--background-deepest` (a deep dark band) regardless of light/dark mode, on-band text is forced:

| Slot | Color |
|------|-------|
| Eyebrow | `hsl(var(--primary))` |
| H1 base | `hsl(0 0% 100%)` (white) |
| H1 highlight | `hsl(var(--primary))` |
| Subtitle | `hsl(0 0% 100% / 0.72)` |
| Trust labels | `hsl(0 0% 100% / 0.5)` |
| Trust values | `hsl(0 0% 100%)` |
| Card body (Var B) | `hsl(0 0% 100% / 0.85)` |
| Availability text (Var C) | `hsl(0 0% 100% / 0.75)` |

## Font system

| Role | Family | Weight | Tailwind class |
|------|--------|--------|----------------|
| Headings (H1, card titles) | **Ubuntu** | 700 | `font-arefin-heading` |
| Body, eyebrow, subtitle, CTAs, labels | **Poppins** | 400 / 500 / 600 | `font-arefin` (default on `.arefin` scope) |

### Loading
Already imported in `src/index.css`:
```
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&family=Poppins:wght@400;500;600&display=swap');
```

### Tailwind config (already updated)
```ts
fontFamily: {
  arefin: ["Poppins", "system-ui", "sans-serif"],
  "arefin-heading": ["Ubuntu", "Poppins", "system-ui", "sans-serif"],
}
```

## Spacing & radius

| Token | Value | Usage |
|-------|-------|-------|
| Container max-width | 1248px | Inherited from project layout system |
| Section padding (desktop) | `py-24` to `py-32` | Hero generous breathing room |
| Section padding (mobile) | `py-16` | |
| Portrait frame radius | `1.5rem` (24px) | All variations |
| Credential card radius (Var B) | `0.75rem` (12px) | |
| Trust-strip divider | 1px × 24px primary/30 | Variation A |

## Animation timing reference

| Token | Value | Used by |
|-------|-------|---------|
| Base entry duration | `0.3s` | All entry animations |
| Stagger step | `0.1s` | Sequential reveals |
| Easing (entry) | `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out) | Entry animations |
| Easing (loop) | `ease-in-out` | Float, pulse, ray |
| Halo loop (Var A) | `4s ease-in-out infinite` | Portrait halo |
| Float loop (Var B) | `4–6s ease-in-out infinite` | Credential cards |
| Pulse dot (Var C) | `1.5s ease-in-out infinite` | Availability dot |
| Ray drift (Var C) | `8s ease-in-out infinite` | Diagonal light ray |

## Reduced-motion behavior

All infinite loops and entry animations are auto-clamped to `0.01ms` under `@media (prefers-reduced-motion: reduce)` — already enforced in `src/index.css` for the `.arefin` scope.
