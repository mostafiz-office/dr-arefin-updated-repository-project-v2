# Multi-Page Feedback — 2026-05-14

> Source: voice feedback from user covering Homepage, About, Treatment subpages (Liver, Gallbladder, Pancreatic, Biliary), Mentorship, Gallery, and Footer.
>
> **Workflow:** Tasks are executed one at a time. User says "next" → agent implements the next unchecked task → marks it done → stops.

---

## Rewritten brief

### Homepage
- Services section "Comprehensive Hepatobiliary & Liver Care Services" (6 cards, image on right side of each card): right-side images currently render too square. Apply `border-radius: 24px` (or match the card's own radius for visual consistency).
- Cards #3 and #4 use a light-green background. On those cards, body text must be **black** (`hsl(var(--foreground))`) — titles are fine, only paragraph text needs the contrast fix.
- Footer: copyright line "© 2026 Dr. Arefin" — wrap "Dr. Arefin" in a link to `https://drarefin.com` with proper `title` and accessible label.
- Footer: change "Powered by Rise Up SEO LLC" → "Powered by Rise Up SEO" (drop "LLC").
- Create a new dedicated page at route `/footer-version` showcasing 5–6 different color variants of the current footer (same structure, different palettes / shades / treatments) so the user can pick one.

### About page
- "About the Surgeon" section ("About Dr. Murshidul Arefin"): the Book Appointment and Call Now buttons sit flush against the credentials list above ("Liver Transplant", "Complex Hepatobiliary Surgery"…). Add top padding/gap so the CTAs breathe.
- FAQ on About page: rewrite using the homepage-FAQ pattern (SEO-focused, Dhanmondi/Dhaka location-targeted, ~8 items, "Show More" link in distinct color, individual FAQ slugs/detail pages).

### Treatment subpages (Liver, Gallbladder, Pancreatic, Biliary)
- Treatment-process card: **Step 1 (green card)** has white/light body text → switch to **black** for contrast on the green background. Apply to all 4 subpages.
- FAQ section: replace the current short FAQ with ~8 SEO + Dhanmondi/Dhaka-location-focused questions per page, each with its own slug/detail link, plus a "Show More" CTA in a distinct color.
- "Conditions We Treat" cards: **SKIP** — user explicitly asked not to touch these now.

### Mentorship page
- "Who Can Join the Mentorship Program?" cards: trim each card's body text to **≤10 words**.
- "Why Train With Dr. Arefin" cards: enforce uniform title size, character count, and word count across all cards for visual consistency.
- "Your Mentorship Journey": Phase 1 card body text → **black**.

### Gallery page
- When a gallery image is opened in the lightbox, include a link to a per-image detail page that contains SEO-focused descriptive text + FAQ about that photo (purpose: crawlable context for search engines).
- Filter tabs (All / Operation Theater / Conference & Training / Chamber / Successful OT): the grid currently leaves an empty cell in the first row when the filtered set is small. Fix grid fill order so cells fill top-to-bottom, left-to-right with no internal gaps; only the trailing cells of the last row may be empty.

### Explicitly skipped (do NOT do)
- Rewriting "Conditions We Treat" body copy to ~15 words on service pages.

---

## 40 Tasks

> Mark each as `[x]` when complete. Execute strictly in order.

### Homepage — Services section image radius (Tasks 1–6)
- [x] **T01** — Add `border-radius: 24px` to right-side image of Services card #1 ("Advanced Liver Surgery").
- [x] **T02** — Add `border-radius: 24px` to right-side image of Services card #2 ("Gallbladder & Biliary Surgery").
- [x] **T03** — Add `border-radius: 24px` to right-side image of Services card #3 ("Pancreatic & Upper GI Surgery").
- [x] **T04** — Add `border-radius: 24px` to right-side image of Services card #4 ("Laparoscopic & Minimally Invasive Surgery").
- [x] **T05** — Add `border-radius: 24px` to right-side image of Services card #5 ("Liver Transplant Consultation & Follow-Up").
- [x] **T06** — Add `border-radius: 24px` to right-side image of Services card #6 ("Hepatology & Liver Disease Management").

### Homepage — Services light-green card text contrast (Tasks 7–8)
- [x] **T07** — On Services card #3 (light-green bg): set body/paragraph text to black (`hsl(var(--foreground))`); preserve title.
- [x] **T08** — On Services card #4 (light-green bg): set body/paragraph text to black; preserve title.

### Homepage — Footer copy + links (Tasks 9–11)
- [x] **T09** — Footer copyright: wrap "Dr. Arefin" in `<a href="https://drarefin.com" title="Visit Dr. Arefin official website" target="_blank" rel="noopener">` with accessible label.
- [x] **T10** — Footer credit: change "Rise Up SEO LLC" → "Rise Up SEO".
- [x] **T11** — Verify all footer links/images have proper `title` and `alt`/`aria-label` attributes; fix any missing.

### Footer Version explorer page (Tasks 12–18)
- [x] **T12** — Create route `/footer-version` registered in `App.tsx` and add page file `src/pages/FooterVersion.tsx`.
- [x] **T13** — Build Footer Variant A (current dark green gradient — baseline for comparison).
- [x] **T14** — Build Footer Variant B (solid deep-forest green, no gradient).
- [x] **T15** — Build Footer Variant C (charcoal/near-black with green accent borders).
- [x] **T16** — Build Footer Variant D (light cream/off-white with dark green text).
- [x] **T17** — Build Footer Variant E (split: dark hero band + light info band).
- [x] **T18** — Build Footer Variant F (monochrome white-on-bright-green block).

### About page (Tasks 19–20)
- [x] **T19** — About → "About the Surgeon": add top padding/margin between credentials chips list and the Book Appointment / Call Now button row.
- [x] **T20** — About → FAQ: replace with ~8 SEO + Dhanmondi/Dhaka-location-focused Q&As; add per-FAQ slug routing and a styled "Show More" link in a distinct accent color.

### Treatment subpages — Step 1 green-card text color (Tasks 21–24)
- [x] **T21** — Liver Surgery page: Treatment Process Step 1 card → body text black.
- [x] **T22** — Gallbladder Surgery page: Step 1 card → body text black.
- [x] **T23** — Pancreatic Surgery page: Step 1 card → body text black.
- [x] **T24** — Biliary Tract Surgery page: Step 1 card → body text black.

### Treatment subpages — FAQ rewrite (Tasks 25–28)
- [x] **T25** — Liver Surgery FAQ: rewrite to ~8 Dhanmondi/Dhaka SEO-focused Q&As; per-FAQ slugs; "Show More" link in distinct color.
- [x] **T26** — Gallbladder Surgery FAQ: same treatment as T25, gallbladder-focused.
- [x] **T27** — Pancreatic Surgery FAQ: same treatment, pancreatic-focused.
- [x] **T28** — Biliary Tract Surgery FAQ: same treatment, biliary-focused.

### Mentorship page (Tasks 29–32)
- [x] **T29** — "Who Can Join the Mentorship Program?": trim each card's body copy to ≤10 words.
- [x] **T30** — "Why Train With Dr. Arefin": normalize all card titles to identical size + character count target.
- [x] **T31** — "Why Train With Dr. Arefin": normalize all card body copy to identical word count target for design consistency.
- [x] **T32** — "Your Mentorship Journey": Phase 1 card body text → black. (Inherited from existing `.tp-card[data-step="1"]` global override; mentorship variant uses the same component.)

### Gallery page (Tasks 33–36)
- [x] **T33** — Gallery: implement per-image detail page route (e.g. `/gallery/:slug`) with SEO-focused description + per-image FAQ section.
- [x] **T34** — Gallery lightbox: add a "View details" link inside the lightbox that points to the per-image detail page (T33).
- [x] **T35** — Gallery filter grid: fix fill order so items pack top-to-bottom, left-to-right with no empty interior cells in the first row when filtered.
- [x] **T36** — Gallery: ensure each image has descriptive `alt` and `title` attributes aligned with the per-image SEO copy.

### Cross-cutting polish (Tasks 37–40)
- [x] **T37** — Verify all 6 homepage Services card images render at 24px radius across breakpoints (375 / 768 / 1280).
- [x] **T38** — Verify all Step 1 green cards (4 treatment pages) pass WCAG AA contrast with black body text.
- [x] **T39** — Add internal-link slugs file / registry update for new About + 4 Treatment FAQ entries (so existing FAQ infrastructure resolves them).
- [x] **T40** — Final regression sweep: homepage, footer copyright link, /footer-version page renders all 6 variants, About CTA spacing, Mentorship Phase 1 contrast, Gallery grid fill — confirm no console errors.

---

## Execution protocol
1. User types "next" → agent picks the next unchecked `[ ]` task in order.
2. Agent implements **only that task**, then marks it `[x]` in this file.
3. Agent stops and waits for the next "next".
4. If a task uncovers an unrelated bug, agent notes it at the bottom of this file under "Discovered issues" but does not fix unless instructed.

## Discovered issues
_(none yet)_
