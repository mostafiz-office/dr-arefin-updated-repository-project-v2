# Internal Linking Strategy — Satellite → Hub Pages

Each of the 10 Tier-1 satellite pages must link back to the three core hub
pages on every render, plus 2–3 lateral satellite siblings to spread link
equity. All internal links use **relative paths with trailing slashes**.

## Hub mapping (Italian-style naming → live routes)

| Strategy role | Live route             | Anchor text examples (Italian / English)         |
| ------------- | ---------------------- | ------------------------------------------------ |
| Servizi       | `/treatment/`          | "tutti i trattamenti" / "all treatments"         |
| Chi Siamo     | `/about/`              | "il chirurgo" / "about Dr. Arefin"               |
| Contatto      | `/contact/`            | "prenota visita" / "book a consultation"         |

## Mandatory link slots per satellite page

Every satellite page must contain, at minimum:

1. **Intro paragraph** — 1 contextual link to `/about/` (credentials anchor).
2. **Body** — 1 link to the most relevant `/treatment/<service>/` hub.
3. **Body** — 2–3 lateral links to sibling satellite pages (see matrix below).
4. **Closing CTA band** — 1 link to `/contact/` (book/consult anchor).
5. **Related grid** — 3 cards, each linking to a sibling satellite page.

Total: **6–8 internal links per satellite page**, of which **3 are hub links**
(Servizi, Chi Siamo, Contatto) and **3–5 are lateral**.

## Satellite → Hub + Lateral matrix

| # | Satellite page                                  | Servizi hub                              | Chi Siamo | Contatto    | Lateral siblings (3)                                                                                               |
| - | ----------------------------------------------- | ---------------------------------------- | --------- | ----------- | ------------------------------------------------------------------------------------------------------------------ |
| 1 | `/treatment/hepatobiliary-surgery/`             | `/treatment/`                            | `/about/` | `/contact/` | liver-surgeon-dhaka, bile-duct-surgery, best-hepatobiliary-surgeon-dhaka                                           |
| 2 | `/treatment/liver-surgeon-dhaka/`               | `/treatment/liver-surgery/`              | `/about/` | `/contact/` | hepatobiliary-surgery, fatty-liver-management, liver-transplant-coordination                                       |
| 3 | `/best-hepatobiliary-surgeon-dhaka/`            | `/treatment/`                            | `/about/` | `/contact/` | hepatobiliary-surgery, liver-surgeon-dhaka, popular-medical-college-hospital                                       |
| 4 | `/treatment/laparoscopic-surgery/`              | `/treatment/gallbladder-surgery/`        | `/about/` | `/contact/` | conditions/gallstones, bile-duct-surgery, hepatobiliary-surgery                                                    |
| 5 | `/conditions/gallstones/`                       | `/treatment/gallbladder-surgery/`        | `/about/` | `/contact/` | laparoscopic-surgery, bile-duct-surgery, fatty-liver-management                                                    |
| 6 | `/popular-medical-college-hospital/`            | `/treatment/`                            | `/about/` | `/contact/` | best-hepatobiliary-surgeon-dhaka, liver-surgeon-dhaka, hepatobiliary-surgery                                       |
| 7 | `/treatment/bile-duct-surgery/`                 | `/treatment/biliary-tract-surgery/`      | `/about/` | `/contact/` | hepatobiliary-surgery, conditions/gallstones, laparoscopic-surgery                                                 |
| 8 | `/treatment/fatty-liver-management/`            | `/treatment/liver-surgery/`              | `/about/` | `/contact/` | liver-surgeon-dhaka, liver-transplant-coordination, conditions/gallstones                                          |
| 9 | `/treatment/liver-transplant-coordination/`     | `/treatment/liver-surgery/`              | `/about/` | `/contact/` | liver-surgeon-dhaka, fatty-liver-management, hepatobiliary-surgery                                                 |
| 10| `/treatment/spleen-surgery/`                    | `/treatment/`                            | `/about/` | `/contact/` | hepatobiliary-surgery, laparoscopic-surgery, bile-duct-surgery                                                     |

## Anchor text rules

- **No bolded links.** Anchor text inherits weight from surrounding paragraph.
- **`title=""` attribute required** on every internal link, describing the
  destination (Yoast / accessibility).
- **Vary anchors** — never repeat the exact same anchor text for the same
  destination twice on a single page.
- **Keyword-rich, natural** — anchors must read as part of the sentence, not
  as standalone phrases.

## Reciprocal hub → satellite links

The three hub pages must surface the satellite cluster:

- `/treatment/` — feature all 10 satellite pages in a grid (already a sibling
  of the service hubs).
- `/about/` — contextual links to satellites #2, #3, #6 (credibility cluster).
- `/contact/` — links to satellites #6 (chamber location) and the relevant
  service hubs.

## Implementation note

The link sets above are encoded in the `related[]` field of each page in
`src/data/satellitePages.ts`. The three hub links (Servizi / Chi Siamo /
Contatto) are emitted by the shared `SatellitePageTemplate` so authors only
need to maintain the lateral siblings list per page.
