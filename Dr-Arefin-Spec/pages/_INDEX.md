# Pages Index

## Status of page specs

| # | Page | Spec status | Source URL |
|---|------|-------------|------------|
| 01 | [Home](./01-home.md) | ✅ Done | https://drarefin.com/ |
| 02 | [About](./02-about.md) | ✅ Done | https://drarefin.com/about/ |
| 03 | [Treatment](./03-treatment.md) | ✅ Done (14 service cards) | https://drarefin.com/treatment/ |
| 04 | [Mentorship](./04-mentorship.md) | ✅ Done (testimonials are placeholder lorem on source) | https://drarefin.com/mentorship/ |
| 05 | [Articles](./05-articles.md) | ✅ Done — ⚠️ source body is stale Atto template, build clean blog index | https://drarefin.com/technical-article/ |
| 06 | [Gallery](./06-gallery.md) | ✅ Done (media-driven, no body copy) | https://drarefin.com/gallery/ |
| 07 | [Contact](./07-contact.md) | ✅ Done (form fields + FAQ verbatim) | https://drarefin.com/contact/ |
| 08 | [Donate](./08-donate.md) | ✅ Done — ⚠️ source content-incomplete, body marked TODO | https://drarefin.com/donate/ |
| 09 | [Imprint](./09-imprint.md) | ✅ Done — ⚠️ source data malformed (US address, broken email, German clauses); render verbatim + flag for legal review | https://drarefin.com/imprint/ |
| 10 | [Privacy (EU)](./10-privacy.md) | ✅ Done — placeholder body (source returns "Region EU not activated") | https://drarefin.com/privacy-statement-eu/ |
| 11 | [Cookie (EU)](./11-cookie.md) | ✅ Done — placeholder body (source returns "Region EU not activated") | https://drarefin.com/cookie-policy-eu/ |
| 12 | [Disclaimer](./12-disclaimer.md) | ✅ Done — ⚠️ flag broken email `info@ex.comdrarefin.com` for client | https://drarefin.com/disclaimer/ |

## Phase 3 complete — 2026-04-20

All 12 per-page specs written as **plain-text content + CAF component mapping** (no HTML/CSS). Any AI can now generate HTML by reusing the existing CAF React components (`PageHero`, `ServiceCard`, `CTABand`, `ContactForm`, `Footer`, etc.) and substituting brand tokens from `01-design-system.md`.

### Cross-cutting issues caught during scraping
1. **`/technical-article/`** (Articles) — live page renders unrelated steam-cleaning content. Build a fresh blog index; do not copy source body.
2. **`/imprint/`** — address is in Wyoming USA but country says Bangladesh; clauses 1.2/1.3 are German on an English site. Needs legal review.
3. **`/disclaimer/` & `/imprint/`** — email `info@ex.comdrarefin.com` is malformed (likely `info@drarefin.com`).
4. **`/donate/`** — only the hero (H1 + subtitle) has real content; rest is a `[sc_form id=420]` shortcode placeholder.
5. **`/mentorship/`** — trainee testimonials are lorem-ipsum with stock names ("Martin Smith / CEO Acme Industries"). Needs real quotes.
6. **`/privacy-statement-eu/` & `/cookie-policy-eu/`** — source returns "Region EU not activated"; specs include placeholder body copy.
7. **30+ inline strong-anchor links** across pages point to `https://drarefin.com/<keyword-slug>` satellite SEO pages. In React, route them to the closest real page (`/about/`, `/treatment/`, `/contact/`) — do NOT replicate satellite routes.

## Per-page spec template (use for each page)

```markdown
# Page NN — [Page Name]

- **URL**: /path/
- **Source**: https://drarefin.com/path/
- **Page type**: home | service | about | gallery | contact | legal

## SEO
- **Meta title**: ...
- **Meta description**: ...
- **Canonical**: ...
- **JSON-LD**: LocalBusiness | MedicalBusiness | WebPage | Article

## Sections (top → bottom)

### Section 1 — [Hero / etc.]
- **CAF pattern to use**: PageHero | sticky-stack | service-grid | etc.
- **Background**: --background-dark
- **H1**: "..." (verbatim)
- **Subtitle**: "..." (verbatim)
- **CTAs**: [{ label, href }]
- **Image**: URL + alt text

### Section 2 — [...]
...verbatim content per section, with which CAF component to reuse...

## Internal links
- Outbound from this page → list with anchor text + target URL (for SEO link density)

## Notes
- Any quirks from the source page
```

## Phase 3 (next session) — fill out each `pages/01-home.md` … `pages/12-disclaimer.md`

The raw HTML for all 12 pages is already saved in `/tmp/drarefin/*.html` (will need re-scraping in next session since `/tmp` is ephemeral). Spec writer should:
1. Re-fetch each page
2. Extract verbatim text content per section
3. Map each section to the appropriate inherited CAF component pattern
4. Capture all internal links with anchor text for `06-keyword-strategy.md`