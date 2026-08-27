# Initiatives Section — Color & Theme Mapping (Project 04)

---

## Theme Inheritance

This section inherits from the **light theme** (hero-04-light palette) with sage-green medical aesthetic.

---

## Token Mapping

| Element | Token | HSL Value |
|---------|-------|-----------|
| Section background | `--background` | 140 20% 97% (sage-tinted white) |
| Card background | `--card` | 0 0% 100% (pure white) |
| Card border | `--border` | 150 13% 91% (soft sage border) |
| Heading | `--foreground` | 160 20% 10% (deep forest) |
| Body text | `--muted-foreground` | 160 9% 46% (sage gray) |
| Icon background | `--accent` | 142 60% 93% (soft mint) |
| Icon color | `--primary` | 142 71% 45% (brand green) |
| Icon hover | `--primary-deep` | 120 47% 39% (darker green) |
| Eyebrow accent | `--primary` | 142 71% 45% |
| Hover shadow | Custom | `0 8px 30px -8px hsl(var(--primary) / 0.12)` |

---

## Variant-Specific Colors

### Variation A (Editorial)
- Divider lines: `--border` at 50% opacity
- Icon hover: `--primary-deep`
- Accent bar: `--primary` (appears on hover)

### Variation B (Elevated)
- Card shadow rest: `0 4px 20px -6px hsl(var(--foreground) / 0.05)`
- Card shadow hover: `0 12px 40px -10px hsl(var(--primary) / 0.15)`
- Icon container gradient: `linear-gradient(135deg, hsl(var(--accent)), hsl(var(--secondary)))`
- Border hover: `--primary-light` (142 71% 75%)

### Variation C (Feature Grid)
- Number color rest: `--muted-foreground` at 30% opacity
- Number color hover: `--primary` at 60% opacity
- Background hover: `--accent` (142 60% 93%)
- CTA color: `--primary`

---

## Accessibility

- All text meets WCAG 2.1 AA (4.5:1 contrast)
- Icon + background combinations exceed 3:1
- Focus states use `--ring` token (primary green outline)