# Homepage Feedback — 2026-05-13

Source: voice walkthrough of `https://drarefin-v4.lovable.app/` (route `/`, viewport 1021×653).

## How to use this file

- Each task below is **atomic** and **independently executable**.
- On user command **"next"**, the AI picks the **first unchecked** task, implements it, and ticks the checkbox `[x]`.
- Do **not** batch tasks unless the user says "do all" or "next 3".
- All new internal links must use the `SeoLink` component (`src/components/arefin/SeoLink.tsx`) — relative path with trailing slash, unique keyword-rich `title` attr (50–200 chars).
- New keyword slugs follow the **satellite-page pattern** — register them in `src/data/satellitePages.ts` so 404 today becomes a real page later. Slug format: kebab-case, e.g. `/surgical-excellence/`, `/laparoscopic-hepatobiliary-surgery/`.
- Hover behavior on all new links must follow project memory: **no positional shift** (no translate/scale), color + shadow + border only.
- Body-text `<strong>` rule still applies: `color: inherit; font-weight: inherit;` — never style strong tags.

---

## Section 2 — "Surgical Excellence / Advanced Treatment / Compassionate Care" (Value Proposition)

- [x] **T01** — Convert the three card titles ("Surgical Excellence", "Advanced Treatment", "Compassionate Care") into `SeoLink`s. Register slugs `/surgical-excellence/`, `/advanced-hepatobiliary-treatment/`, `/compassionate-patient-care/` in `satellitePages.ts`. Add unique 50–200 char `title` attrs.
- [x] **T02** — In the same three cards' body copy, wrap every meaningful keyword phrase already shown in **bold** (e.g. "laparoscopic", "hepatobiliary", "minimally invasive", etc.) with `SeoLink` (bold prop). Each gets a unique slug + title attr. Cursor must show pointer + green hover.
- [x] **T03** — Audit the section for any remaining unlinked `<strong>` keyword phrases and link them per T02 conventions. _Verified: zero `<strong>` tags remain in `ValuePropV04LightA.tsx`._

## Section 3 — About (homepage About block)

- [x] **T04** — Wrap the name **"Dr. Murshidul Arefin"** in a `SeoLink` to `/dr-murshidul-arefin/` (register slug). Title attr describes him as Dhaka's leading hepatobiliary & liver surgeon.
- [x] **T05** — Convert every bolded keyword phrase inside the About body paragraph into `SeoLink`s. Register each slug. Examples to cover: "hepatobiliary surgeon", "liver transplant", "gallbladder surgery", "pancreatic surgery", "minimally invasive surgery", plus any others currently bolded.

## Section 4 — Our Initiatives (Surgery Assistance / Health Education / Support Groups)

- [x] **T06** — Convert the 3 initiative card titles into `SeoLink`s. Slugs: `/surgery-assistance-program/`, `/liver-health-education/`, `/patient-support-groups/`. Register + title attrs.
- [x] **T07** — Inside each initiative card body, wrap bolded keyword phrases as `SeoLink`s. Register slugs.

## Section 5 — Metrics / Hepatobiliary Expertise

- [x] **T08** — Wrap each metric **number** (e.g. "8", "800+", any others currently displayed) in a `SeoLink` to a relevant slug (e.g. `/years-of-experience/`, `/successful-surgeries/`). Hover color change as per existing keyword links. Register slugs.
- [x] **T09** — Wrap each metric **label** (e.g. "Hepatobiliary Expertise", "Years of Experience", etc.) in a `SeoLink` with a unique slug + title attr.

## Section 6 — Videos block ("Our Expertise / Comprehensive Hepatobiliary…")

- [x] **T10** — Add an animated GIF-style overlay on each video thumbnail to telegraph "this is a playable video". Suggested implementation: a subtle looping pulse on the YouTube play icon + a soft "shimmer" sweep on the thumbnail every ~3s. Respect `prefers-reduced-motion`.
- [x] **T11** — Implement hover-to-reveal video: on card hover, animate (slide/fade ~250ms) from static thumbnail → embedded YouTube `<iframe>` (lite-youtube facade for perf). Click plays inline. On mouseleave, revert to thumbnail (or keep iframe if play started). Must not cause layout shift. _Inline-only; clicking title still routes to internal /video/{slug} page._
- [x] **T12** — Verify all 6 video cards render after the recent edge-function fix; fix any remaining thumbnail/title mapping issues. _Verified: edge function returns 12 items; after dedup + `slice(0, 8)` the carousel renders 8 cards with thumbnails + titles correctly mapped._

## Section 7 — Transformations ("Inspiring Transformation / bariatric surgery …")

- [x] **T13** — Items that currently change color on hover are not actual links. Convert each into a `SeoLink` with proper slug + title attr (e.g. `/bariatric-surgery/`, `/inspiring-transformations/`, etc.).

## Section 8 — Call to Care ("Transform Lives, One Surgery at a Time")

- [x] **T14** — In the body sentence, wrap as `SeoLink`s: **"Dr. Murshidul Arefin"** → `/dr-murshidul-arefin/`; **"hepatobiliary surgery"** → `/hepatobiliary-surgery/`; **"critical liver"** (full phrase "critical liver and hepatobiliary surgeries") → `/critical-liver-surgery/`; **"patients who need hope the most"** → `/patients-who-need-hope/`. Register all slugs + title attrs.
- [x] **T15** — **Color contrast bug**: on dark variant of this section, link text currently appears **off-white / dimmer** than non-link text. Fix so **all body text is the same exact white** at rest; links differentiate only on hover (green + shadow per project standard). Audit `--foreground` vs link color tokens in this section's component.

## Section 9 — FAQ ("Common Questions")

- [x] **T16** — Rename the section heading from "Common Questions" → **"Frequently Asked Questions"**.
- [x] **T17** — Change the small section label/eyebrow from "Frequently Asked …" → **"FAQ"** (uppercase eyebrow).
- [x] **T18** — Resize the new H2 to match the standardized section-heading size used by other homepage sections (use the `type-*` fluid token already in the design system — do **not** hardcode font-size). Verify visual parity with neighboring section headings.
- [x] **T19** — **Click bug**: clicking an FAQ item title currently navigates away instead of toggling the accordion. Fix so clicking the title toggles the accordion open/closed. Ensure the link to the dedicated FAQ page lives only in the "Show more" CTA (T22), not on the title.
- [x] **T20** — Inside FAQ answer body, links currently render **green + underlined at rest**. Change so links inherit body text color and weight at rest (no underline), and only turn green (with hover-shadow per standard) on hover. Apply project-wide `<strong>` body rule.
- [x] **T21** — On hover of an FAQ accordion title, color must become **white** (in dark sections) — confirm token and add hover state.
- [x] **T22** — Add a **"Show more"** link at the end of each FAQ answer body. It must link to that FAQ's dedicated single-FAQ page (use existing `FAQSinglePage` route + slug from `faqRegistry.ts`). Style as a subtle inline link, not a button.

## Cross-cutting

- [x] **T23** — Add all newly-registered slugs to `src/data/satellitePages.ts` with placeholder metadata (title, h1, intent) so `SatellitePage.tsx` renders a real page when the route is hit (instead of hard 404). This enables click-through for QA today.
- [x] **T24** — Update `public/sitemap.xml` to include every new satellite slug introduced by T01–T22. ✅ Added `/financial-assistance/`, `/laparoscopic-cholecystectomy/`, `/second-opinion/`.
- [x] **T25** — Verify on mobile (≤640px) that all new keyword links don't break line-height or wrap awkwardly; respect `whitespace-nowrap` only for brand identifiers. ✅ Verified at 390×844: hero title wraps cleanly, FAQ "Show more →" links inline-wrap, footer specialty-pages list wraps in 2-per-row, no horizontal overflow. No `whitespace-nowrap` applied to FAQ/keyword copy.
- [x] **T26** — Final pass: run a homepage QA — every new link has (a) unique `title` attr 50–200 chars, (b) pointer cursor, (c) green hover color, (d) no positional shift, (e) registered slug, (f) trailing slash. ✅ `SeoLink` enforces required `title`, anchor pointer cursor, `var(--primary)` green hover with dark-mode variant, color/text-decoration-only transitions (no transform). All `to=` paths use trailing slashes. Fixed 3 prefix mismatches in `TransformationsV04LightA.tsx`: `/conditions/end-stage-liver-disease/` → `/end-stage-liver-disease/`, `/conditions/chronic-bile-duct-obstruction/` → `/chronic-bile-duct-obstruction/`, `/treatment/minimally-invasive-surgery/` → `/minimally-invasive-surgery/` (matching their satellite registrations). Note: footer legal links (`/cookie-policy-eu/`, `/disclaimer/`, `/privacy-statement-eu/`, `/technical-article/`) remain unregistered — pre-existing, out of T01–T22 scope; tracked separately.

---

## Open questions for the user

1. For **T11** (hover-to-reveal video), should clicking still open YouTube in a new tab as a fallback, or is inline-only acceptable?
2. For **T22** (FAQ "Show more"), confirm the destination page is the existing `FAQSinglePage` (route `/faq/:slug/`) — yes/no?
3. For metric numbers (T08), should each number link to a **dedicated stat page**, or all link to a single "About / Credentials" page? Default = dedicated.
