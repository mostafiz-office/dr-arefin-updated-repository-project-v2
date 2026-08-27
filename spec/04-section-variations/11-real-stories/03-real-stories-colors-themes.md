# Real Stories — Colors & Themes

All colors are HSL semantic tokens declared on `.arefin` in `src/index.css`. No raw hex in components except the official Google "G" logo brand colors (which must remain literal per Google brand guidelines).

## Tokens Used
| Purpose | Token |
|---|---|
| Section background (A, B) | `hsl(var(--background))` |
| Section background (C dark band) | `linear-gradient(135deg, hsl(var(--cta-bg)), hsl(var(--primary-darker)))` |
| Card surface | `hsl(var(--card))` |
| Card border | `hsl(var(--border))` |
| Heading text | `hsl(var(--foreground))` |
| Body / quote text | `hsl(var(--muted-foreground))` |
| Star fill | `hsl(var(--highlight))` (warm gold #F2B844-ish from `--highlight`) |
| Brand accent | `hsl(var(--primary))` |
| Avatar background | `hsl(var(--primary) / 0.12)` with `hsl(var(--primary))` initial text |
| Hover shadow | `8px 8px 0 hsl(var(--foreground) / 0.10)` (Variation B) |
| Quote glyph (A) | `hsl(var(--primary) / 0.18)` |

## Google Logo Brand Colors (Literal — Do Not Tokenize)
- Blue:   `#4285F4`
- Green:  `#34A853`
- Yellow: `#FBBC05`
- Red:    `#EA4335`

These are codified in `GoogleBadge.tsx` only. Keep them literal so Google's brand integrity is maintained.

## Motion
- Carousel A: 7000ms auto-advance, 500ms cross-fade
- Hover lifts: 200ms ease shadow + border transition (no positional translate per project rule)
- Marquee C: linear infinite scroll, 40s per loop, pause on hover, respects `prefers-reduced-motion`
