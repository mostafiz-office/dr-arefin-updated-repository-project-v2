# Dr. Arefin — Dark Version Homepage (Overview)

## What this is
A second homepage variant for Dr. Arefin that mirrors the **dark visual treatment of the live site `https://drarefin.com/`**, while keeping the **same section order and content** as our existing light homepage (`/dr-arefin`).

## Route
- **Path**: `/home-dark`
- **Page component**: `src/pages/DrArefinHomeDark.tsx`
- **Root class**: `<div className="arefin dark …">` — activates the existing `.arefin.dark` token block in `src/index.css`.

## Scope (locked decisions)
| Decision | Choice |
|---|---|
| Section order | **Same as `/dr-arefin`** — Hero → Value Prop → About → Initiatives → Metrics → Videos → Services → CTA Band #1 → Transformations → Final CTA |
| Header | **Transparent dark header** — sits over the dark hero, white nav links, white/green Call-Book pill on the right |
| Hero portrait | Reuse existing Dr. Arefin PNG (background already removed) over the new dark navy hero |
| Component reuse | All `*V04Light*` variation components are reused — they already consume `hsl(var(--…))` tokens and auto-flip on `.dark` |
| New components | **Zero** new section components for v1. Only a new page file + minor dark-only CSS overrides if needed |
| Light homepage | **Untouched** — `/dr-arefin` keeps current behavior |

## Reference
- Live site studied: `https://drarefin.com/` (homepage screenshot captured during planning)
- Existing dark tokens already aligned with the live site's palette (see `01-dark-design-system.md`)

## Files in this spec
| File | Purpose |
|---|---|
| `00-overview.md` | This file — locked decisions, route, scope |
| `01-dark-design-system.md` | Full HSL token table, typography, spacing, hover rules, forbidden list |
| `02-homepage-structure.md` | Section-by-section breakdown matching `/dr-arefin` order |
| `03-section-adaptations.md` | Per-section dark-mode notes: surface tokens, hover treatments, anything that needs a dark-only override |
| `04-implementation-guide.md` | Step-by-step build instructions, file paths, verification steps |

## Inheritance rule
Everything not explicitly overridden here **inherits from**:
1. `Dr-Arefin-Spec/01-design-system.md` (Dr. Arefin brand)
2. `Dr-Arefin-Spec/07-inherited-patterns.md` (CAF base patterns: 1248px container, no `!important`, no inline styles, no hover position shifts, WCAG AA contrast)
