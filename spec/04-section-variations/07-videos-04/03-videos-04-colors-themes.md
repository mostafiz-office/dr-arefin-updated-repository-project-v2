# 07 — Videos Section: Color Tokens

Inherits the `.arefin` light-theme system (see `src/index.css`). No new tokens introduced.

## Token usage
| Element | Token |
|---|---|
| Section bg | `hsl(var(--background))` |
| Heading text | `hsl(var(--foreground))` |
| Body / caption | `hsl(var(--muted-foreground))` |
| Eyebrow chip | `hsl(var(--primary))` |
| Card bg | `hsl(var(--card))` |
| Card border | `hsl(var(--border))` |
| Hover border | `hsl(var(--primary) / 0.4)` |
| Play icon bg | `hsl(var(--primary))` |
| Play icon fg | `hsl(var(--primary-foreground))` |
| Skeleton bg | `hsl(var(--muted))` |
| Modal backdrop | `rgba(0,0,0,0.8)` (literal — outside theme system, intentional for focus) |

## Hover states
- Thumbnail scale: `scale-[1.02]` (300ms ease-out)
- Card shadow on hover: `0 8px 24px hsl(var(--primary) / 0.12)`
- Play icon: opacity 0 → 1 on thumbnail hover

## Dark mode
All tokens auto-adjust via `.arefin.dark` overrides already defined in `index.css`.
