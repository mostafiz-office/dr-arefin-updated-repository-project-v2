# 08 — Services Section: Audit & Gap Analysis

## Source content
JSON-defined "Comprehensive Hepatobiliary & Liver Care Services" — 6 service cards on white background, with dark card surface (`#111827`) and white text in original spec.

## Existing pattern reuse
- `Dr-Arefin-Spec/pages/03-treatment.md` defines the canonical 14-card treatment grid; this 6-card section is a **homepage condensation** — top 6 high-traffic services that link into `/treatment/#<slug>`.
- Reuses semantic tokens (`--primary`, `--card`, `--foreground`) instead of hardcoded `#FFFFFF / #111827`. We honor the *intent* (high-contrast dark cards on light page) by mapping to a token-driven dark surface variant (Variation A) plus two complementary light/editorial alternatives (B, C) so the user can choose tonal direction.

## Gap vs. spec source palette
| Source spec value | Token mapping |
|---|---|
| `background: #FFFFFF` | `hsl(var(--background))` |
| `card_background: #111827` | `hsl(var(--background-deepest))` (already defined `160 30% 12%` — close to `#111827`) |
| `text_color_primary: #FFFFFF` | `hsl(var(--primary-foreground))` / white token |
| `text_color_secondary: #D1D5DB` | `hsl(0 0% 82%)` derived inline — acceptable per spec |
| `border_radius: 16px` | `rounded-2xl` (Tailwind) |

## Decision
Build 3 variations on `/services` route, all using design tokens, no hardcoded hex except where derived from token math.
