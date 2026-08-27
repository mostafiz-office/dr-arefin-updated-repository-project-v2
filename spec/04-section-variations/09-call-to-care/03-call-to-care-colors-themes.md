# 09 — Call to Care · Color & Theme Tokens

All colors are HSL CSS variables defined in `src/index.css` under the `.arefin` scope. **No raw hex.**

## Variation A — Editorial Calm
| Element | Token |
|---|---|
| Section background | `--background` |
| H2 | `--foreground` |
| Divider hairline | `--border` |
| Body text | `--muted-foreground` |
| Body `<strong>` | `--foreground` |
| CTA bg / text | `--primary` / `--primary-foreground` |

## Variation B — Cinematic Dark
| Element | Token |
|---|---|
| Section background | `--background-deepest` |
| Radial glow | `--primary-glow` @ 0.18 |
| Eyebrow | `--primary-light` |
| H2 | `--primary-foreground` (white) |
| Body | `--primary-foreground` @ 0.78 |
| Body `<strong>` | `--primary-light` |
| CTA bg / text | `--primary` / `--primary-foreground` |
| CTA ring | `--primary-light` @ 0.30 |

## Variation C — Split Card
| Element | Token |
|---|---|
| Outer band | `--surface-tint-2` |
| Card surface | `--card` |
| Card border | `--border` |
| Hover shadow | `--primary` @ 0.18 (sharp, 0 blur) |
| Eyebrow | `--primary` |
| H2 | `--foreground` |
| Body | `--muted-foreground` |
| Body `<strong>` | `--foreground` |
| CTA bg / text | `--primary` / `--primary-foreground` |

## Accessibility
All foreground/background combinations validated against WCAG 2.1 AA (4.5:1 normal, 3:1 large). Cinematic dark variant uses white on `--background-deepest` (very dark green) — comfortably exceeds AAA for large display type.
