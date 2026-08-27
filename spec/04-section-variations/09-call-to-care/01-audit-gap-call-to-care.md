# 09 — Call to Care · Audit & Gap Analysis

**Source**: Dr-Arefin-Spec/pages/01-home.md → Section 8 "Transform Lives, One Surgery at a Time"
**Section name (chosen)**: **Call to Care**
**Route**: `/call-to-care`
**Position in homepage flow**: After Services grid, before Patient Stories / Testimonials.

## Source content (verbatim)
- **H2**: Transform Lives, One Surgery at a Time
- **Body**: Your trust and support help **Dr. Murshidul Arefin** deliver **critical liver and hepatobiliary surgeries** to **patients who need hope the most.**
- **CTA**: { label: "Book an Appointment", href: "/contact/" }

## Gap analysis vs. existing CAF `CTABand`
| Requirement | CAF `CTABand` | Dr. Arefin Call to Care |
|---|---|---|
| Single CTA only | dual-state pill | ✅ same — single primary CTA |
| Bold inline emphasis in body | not supported | ✅ render `**...**` as `<strong>` |
| Typography-only (no imagery) | text + decorative bg | ✅ keep typography-led |
| 3 distinct visual treatments | 1 fixed | ✅ produce A/B/C |

## Variation strategy (mixed spectrum)
- **A — Editorial Calm (light)**: Off-white surface, oversized serif-display H2 (`font-arefin-heading`), hairline divider above CTA, generous whitespace.
- **B — Cinematic Dark (full-bleed)**: Dark deep-green band (`--background-deepest`), glowing primary CTA, subtle radial light behind heading.
- **C — Split Card (mixed)**: Two-column quoted card on tinted surface (`--surface-tint-2`); H2 left, body + CTA right; subtle border + sharp directional shadow on hover.

## Constraints honored
- ✅ Typography only — no imagery, no AI-generated people (`mem://constraints/no-ai-images-of-real-people`).
- ✅ Tailwind tokens only — no hardcoded hex.
- ✅ Single CTA across all 3 variations.
- ✅ No positional hover lift on the section itself; CTA may scale per button system.
