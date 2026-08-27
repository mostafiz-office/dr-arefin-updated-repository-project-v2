# 09 — Call to Care · Copy

The base copy is **identical across A/B/C** (single source of truth from `Dr-Arefin-Spec/pages/01-home.md` Section 8). Only the eyebrow label differs to match each variation's visual register.

## Shared
- **H2**: `Transform Lives, One Surgery at a Time`
- **Body** (with bold markers preserved):
  > Your trust and support help **Dr. Murshidul Arefin** deliver **critical liver and hepatobiliary surgeries** to **patients who need hope the most.**
- **CTA**: `Book an Appointment` → `/contact/`

## Per-variation eyebrow (optional pre-heading label)
| Variation | Eyebrow |
|---|---|
| A — Editorial Calm | _(none — pure typography)_ |
| B — Cinematic Dark | `THE MISSION` |
| C — Split Card | `CALL TO CARE` |

## Bold-emphasis rendering
The body string contains 3 emphasized phrases. They MUST render as `<strong>` (semantic, screen-reader friendly), not just visually bold via CSS. Use the shared `renderBold` regex pattern already established in `services-variations` components.
