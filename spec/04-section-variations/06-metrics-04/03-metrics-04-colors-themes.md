# Metrics Section — Color Tokens (Project 04)

Inherits the `hero-light` semantic token system. No raw colors — HSL semantic tokens only.

## Token Usage

| Element | Token | Notes |
|---------|-------|-------|
| Section background | `hsl(var(--background))` | Light cream / off-white |
| Card surface (B) | `hsl(var(--card))` | Slightly elevated |
| Card border | `hsl(var(--border))` | Subtle 1px |
| Eyebrow + category | `hsl(var(--primary))` | Sage primary |
| H2 + numeral | `hsl(var(--foreground))` | Deep charcoal |
| Label | `hsl(var(--muted-foreground))` | Soft secondary |
| Divider lines (A) | `hsl(var(--border) / 0.5)` | Whisper-soft |
| Accent stripe (B) | `hsl(var(--primary))` | 4px top edge |
| Category chip bg (B) | `hsl(var(--accent))` | Pale sage |
| Offset block (C) | `hsl(var(--accent))` | Behind stats grid |

## Hover States

- **B card hover**: shadow `0 8px 24px hsl(var(--primary) / 0.12)`, border → `hsl(var(--primary) / 0.4)`
- **C stat hover**: label color → `hsl(var(--foreground))`, no transform
- **C CTA arrow**: `translate-x-1` on hover (icon only, not the button)

## Contrast Compliance
- Numeral on background: ≥ 12:1 ✅
- Label on background: ≥ 4.5:1 ✅
- Category (primary) on background: ≥ 4.5:1 ✅
