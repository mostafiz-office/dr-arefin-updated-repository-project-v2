# 08 — Services Section Spec

**Section name:** Comprehensive Hepatobiliary & Liver Care Services
**Route preview:** `/services`
**Production placement:** Homepage (after Initiatives, before CTA band) and `/treatment/` summary block.

## Header
- Eyebrow: `OUR SERVICES`
- Title: **Comprehensive Hepatobiliary & Liver Care Services**
- Alignment: center
- Optional subtitle (B/C only): "Six focused programs covering liver, gallbladder, pancreatic, and upper-GI care."

## Service items (6)

| # | Title | Icon (lucide) | Keywords |
|---|---|---|---|
| 1 | Advanced Liver Surgery | `Activity` | liver tumors, transplant, minimally invasive |
| 2 | Gallbladder & Biliary Surgery | `Stethoscope` | gallstones, bile duct, laparoscopic |
| 3 | Pancreatic & Upper GI Surgery | `HeartPulse` | pancreatic disorders, upper GI |
| 4 | Laparoscopic & Minimally Invasive Surgery | `Microscope` | keyhole, scarring, fast recovery |
| 5 | Liver Transplant Consultation & Follow-Up | `ClipboardCheck` | pre-transplant, post-transplant |
| 6 | Hepatology & Liver Disease Management | `ShieldCheck` | fatty liver, hepatitis, cirrhosis |

(Descriptions verbatim from source JSON.)

## Variations

| Variant | Direction | Card surface | Layout |
|---|---|---|---|
| **A — Dark Bento (spec-true)** | Source-spec aligned: dark `#111827`-equivalent cards on white | `--background-deepest` | 3-col grid, 16px radius, hover lift + green keyword chips |
| **B — Light Editorial** | Swiss medical-journal alternative, all-light | `--card` w/ border | 3-col, hairline dividers, icon top-left, keyword inline |
| **C — Gradient Glass Showcase** | Premium: alternating-row split with primary-tinted gradient surface and glass-card layer | gradient + `--card`/95 backdrop-blur | 2-col asymmetric (zigzag), large icon disc, CTA chip per card |

## Linking
Each card title → `/treatment/#<slug>` (per `Dr-Arefin-Spec/pages/03-treatment.md`).
Slugs:
1. `liver-tumor-cancer-surgery`
2. `gallstone-gallbladder-surgery`
3. `pancreatic-cancer-surgery`
4. `laparoscopic-minimally-invasive-surgery` (NEW slug, not in 14-card list — link to `/treatment/`)
5. `liver-transplant-coordination-followup-care`
6. `fatty-liver-surgical-intervention`

## Accessibility
- Cards are `<article>` with H3 title.
- Color contrast: white-on-`#111827` = 17.4:1 (AAA).
- Icons `aria-hidden`, decorative.
- Keyboard-focus ring uses `--ring`.
