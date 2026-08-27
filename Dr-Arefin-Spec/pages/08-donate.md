# Page 08 — Donate

- **URL**: `/donate/`
- **Source**: https://drarefin.com/donate/
- **Page type**: donate / fundraising

## SEO
- **Meta title**: Support Our Mission — Donate to Dr. Arefin's Hepatobiliary Care Initiative
- **Meta description**: Help Dr. Murshidul Arefin provide critical liver and hepatobiliary surgical care to patients in need. Your donation funds life-saving surgery and patient education.
- **Canonical**: https://drarefin.com/donate/
- **JSON-LD**: `WebPage` + `DonateAction`

## Section inventory

| # | Section | CAF component to reuse |
|---|---------|------------------------|
| 1 | Page hero | `PageHero` |
| 2 | Why donate (mission narrative) | Centered text block (TODO: real copy) |
| 3 | Donation amount tiers | Card grid (3-col) — TODO copy |
| 4 | Donation form / shortcode area | `ContactForm`-style or external donation embed |
| 5 | Final CTA | `CTABand` |

---

## Section 1 — Page Hero
- **CAF pattern**: `PageHero` (with optional warm-tone overlay)
- **H1**: Support Our Mission
- **Subtitle**:
  > Your generous contributions help us provide exceptional care for patients in need of liver surgery.
- **CTA**: { label: "Donate Now", href: "#donate-form" }

## Section 2 — Why Donate
- **CAF pattern**: Centered narrative block
- **Content**: Source page is sparse — only a heading "Book Appointment" and a `[sc_form id=420]` shortcode placeholder.
- **TODO copy** (placeholder for client to provide):
  > Every donation helps us deliver life-saving hepatobiliary surgery to patients who cannot afford treatment, fund liver-health awareness across Bangladesh, and support post-operative recovery for transplant patients.

## Section 3 — Donation Tiers (recommended structure)
- **CAF pattern**: 3-card grid (icon + amount + impact statement). Real numbers TBD.
- **Suggested cards**:
  - **Education** — funds liver-health seminars in rural communities.
  - **Surgery Support** — covers part of a hepatobiliary procedure for an underserved patient.
  - **Transplant Care** — supports post-transplant follow-up and medication.

## Section 4 — Donation Form / Embed
- Source uses `[sc_form id=420]` (legacy WP shortcode) labelled "Book Appointment" — likely a placeholder. In the React build, swap for either:
  - A dedicated donation form (Stripe / bKash / SSLCommerz integration), or
  - The same `ContactForm` with a "Donation" subject pre-selected.

## Section 5 — Final CTA
- **CAF pattern**: `CTABand`
- **H2**: Ready for Expert Consultation?
- **CTA**: { label: "Book an Appointment", href: "/contact/" }

## Internal links
- About Dr. Arefin → `/about/`
- Treatment → `/treatment/`

## Notes
- Source page is **content-incomplete** — the only real string on the page is the hero H1 + subtitle. All other body copy in this spec is recommended structure for any AI to scaffold; mark as TODO until client supplies real copy.
- Confirm with client whether donations route through a Bangladesh-local processor (bKash, SSLCommerz) or a global one (Stripe).