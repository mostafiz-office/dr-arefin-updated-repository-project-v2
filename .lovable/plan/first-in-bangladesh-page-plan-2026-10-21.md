# Plan — "First in Bangladesh" direct-access page (2026-10-21)

Status: DRAFT for owner approval. Nothing is built until the owner approves this plan.
Direction given by the owner (2026-10-21): a dedicated page, linked from the homepage,
that is the fastest way to reach Dr. Arefin from the website — a first in Bangladesh.
Long descriptive slug; meaningful title; page must be structured to rank, with internal
links both ways; copy and data collected from the current homepage; existing branding.

## 1. Concept

In Bangladesh, reaching a doctor is painful: appointment serials are hard to get,
patients fight Dhaka traffic to reach a hospital, then wait — and there is no direct
way to ask the doctor's office a question. This page is the opposite: one page where a
patient reaches Prof. Dr. Murshidul Arefin's office directly — call, WhatsApp, or a
website query that his dedicated team (engineers and support staff) picks up with
immediate attention — backed by his expertise and surgical record.

## 2. Where the page will be placed

- **Public URL:** `https://drarefin.com/fastest-way-to-reach-a-doctor-in-bangladesh/`
- **App route:** new page component `src/pages/FirstInBangladesh.tsx`, registered in
  `src/App.tsx` for both `/fastest-way-to-reach-a-doctor-in-bangladesh` and the
  trailing-slash variant (same pattern as `/about`, `/contact`), and added to the
  generated sitemap.
- **WordPress:** ONE new top-level page created via REST (title below, slug
  `fastest-way-to-reach-a-doctor-in-bangladesh`, no parent, status publish), then
  served through the existing "Arefin exact pages" pipeline like the other 11 pages.
- **Homepage link (required by owner):** a slide-style banner section in
  `src/pages/DrArefinHomeDark.tsx` placed **immediately after the hero** (the hero
  itself is not changed). Dark branding, eyebrow "FIRST TIME IN BANGLADESH",
  headline "The fastest way to reach a doctor — right from this website.", one
  supporting line, green hero-style button "Reach Dr. Arefin →" linking to the page.
- **Contact page link:** one cross-link line in the `ContactDark` intro:
  "In a hurry? See the fastest way to reach Dr. Arefin →" linking to the page.
- **Footer link:** add to `DrArefinFooter` quick links **if** the footer exposes a
  quick-links list at build time (verified during build; skipped if not present).
- **Links out of the page:** the 8 treatment hub pages, the 3 credential pages
  (/credentials/1500-gallbladder-surgeries-dhaka/, /credentials/20-years-gallbladder-surgery-experience-dhaka/,
  /credentials/fcps-ms-hepatobiliary-gallbladder-surgeon-dhaka/), About, Contact, Articles.

## 3. Facts used (all from the current site — nothing invented)

- 1500+ surgeries; 20+ years (homepage hero trust chips, `HeroSection` defaults).
- FCPS · MS Hepatobiliary; Associate Professor, Popular Medical College Hospital;
  BSMMU-trained HPB surgeon (site FAQ registry + mega-menu trust line).
- Chamber: Popular Medical College Hospital, House 25, Road 2, Dhanmondi, Dhaka 1205;
  visits on scheduled afternoons and evenings (site FAQ registry).
- Phone `+880 1311 487592` (tel:+8801311487592); WhatsApp https://wa.me/8801311487592
  (already used by the site's TrustStrip).
- Fees answer reused from the FAQ registry (standard chamber rates; cash, card, bKash).
- Form: the site's existing appointment-request form (`src/lib/appointmentRequest.ts`)
  — fields name, email, phone, message — posting to the `arefin/v1/contact` route,
  which saves an `arefin_request` and emails the chamber inbox.
- KNOWN INCONSISTENCY (flagged, out of scope): a few FAQ answers say "1,000+
  procedures / over a decade". This page uses the homepage figures (1500+ / 20+).

## 4. Page blueprint — sections and draft copy

Design system: the site's dark branding — dark warm surfaces, two brand greens only
(--primary-bright rest, --primary-darker hover), Ubuntu headings, Poppins body,
hero CTA button pair (as approved for the dropdown), `Reveal` scroll animations,
existing portrait/OT imagery from `src/assets`. Header/footer: the standard
`DrArefinHeader` / `DrArefinFooter`.

1. **Hero** (dark, portrait right)
   - Eyebrow: FIRST TIME IN BANGLADESH
   - H1: "For the First Time in Bangladesh, Reach Your Doctor Directly."
   - Sub: "No serial queues. No fighting traffic just to ask a question. From this
     page, you reach Dr. Arefin's office directly — and every message gets
     immediate attention."
   - Buttons: Call Now (tel) · WhatsApp · Send a Query (scrolls to the form)
   - Trust chips row: FCPS · MS Hepatobiliary · 1500+ surgeries · 20+ years
2. **Stats band** — 20+ years of practice · 1500+ surgeries performed ·
   Associate Professor, Popular Medical College Hospital · BSMMU-trained HPB surgeon
3. **Why reaching a doctor in Bangladesh is so hard** (3 cards)
   - "Appointments are a battle." — Serials fill up before most patients get through.
   - "The journey itself hurts." — Hours in Dhaka traffic, while you are already unwell.
   - "Your questions wait." — There is normally no direct way to ask the doctor's office anything.
   Each card closes with the contrast: "Here, you start with a message — not a queue."
4. **The Dr. Arefin difference**
   - H2: "A direct line to the surgeon's office"
   - Copy: this website is watched by a dedicated team — engineers and support staff
     whose job is to make sure every call, WhatsApp message and form submission is
     picked up and answered with immediate attention. Behind that team is a surgeon
     with 20+ years and 1500+ surgeries in gallbladder, liver, bile duct and
     pancreatic care.
5. **Expertise** — H2: "Care you can reach, from a surgeon you can trust"
   8 cards from `src/data/menu.ts` (Liver Surgery, Gallbladder Surgery, Bile Duct
   Surgery, Pancreatic Surgery, Hepatobiliary Surgery, Laparoscopic Surgery, Liver
   Transplant Coordination, Fatty Liver Management), each linking to its hub page.
6. **How it works** — H2: "Reach Dr. Arefin in three steps"
   1. Call, WhatsApp, or send the form below. 2. His team responds with immediate
   attention and confirms your slot. 3. Meet Dr. Arefin at Popular Medical College
   Hospital, House 25, Road 2, Dhanmondi, Dhaka 1205.
7. **Query form** — H2: "Send a query — get immediate attention"
   The existing form (name, email, phone, message) + a line naming the promise.
   Beside it: chamber address, phone, WhatsApp card.
8. **FAQ** (`FAQAccordion`, entries from `faqRegistry`) — chamber address & visiting
   hours; how to consult Dr. Arefin in Dhanmondi; consultation fees & payment;
   laparoscopic gallbladder surgery at Popular Medical College Hospital.
9. **Final band** (`GlobalCTABand` pattern) — "Your doctor is one message away."
   + Call · WhatsApp · Book buttons.

## 5. SEO plan (built to rank)

- **Primary phrase:** "reach a doctor in Bangladesh"; supporting: "fastest way to
  reach a doctor", "book an appointment with a doctor in Dhaka", "gallbladder and
  liver specialist in Dhaka".
- **Title tag:** "Fastest Way to Reach a Doctor in Bangladesh — A First in
  Bangladesh | Dr. Arefin" (Helmet, with canonical + OG, same pattern as AboutDark).
- **Meta description:** "Reaching a doctor in Bangladesh usually means long serials,
  traffic and waiting. Dr. Arefin's website changes that — call, WhatsApp or send a
  query and get a direct response from his dedicated team."
- **Headings:** exactly one H1 (above); H2s carry the phrases naturally (sections
  4–7 headlines as drafted).
- **Structured data:** MedicalWebPage + the site's Physician entity +
  BreadcrumbList + FAQPage for section 8, via the existing `src/lib/structuredData`
  helpers (same as AboutDark).
- **Internal links:** in — homepage slide, contact-page line, footer (conditional);
  out — §2 links out list. Anchor texts use the service names, not "click here".
- **Images:** existing assets only, descriptive alt text with service + Dhaka terms.

## 6. Build steps (on approval)

1. Create `src/pages/FirstInBangladesh.tsx` from the AboutDark pattern
   (header/footer, Helmet, structured data, sections §4).
2. Register both route variants in `src/App.tsx`; regenerate sitemap.
3. Add the homepage slide section to `DrArefinHomeDark.tsx` (hero untouched) and
   the contact-page cross-link; footer link if the structure allows.
4. `vite build` + `tsc` clean; render-verify desktop + mobile (computed styles for
   the new buttons, one H1, no overflow), hover states measured like the menu work.
5. Push to GitHub (one batched commit) → owner checks the Lovable preview.

## 7. WordPress steps (after preview approval)

1. Create the one WP page via REST (title/slug above, publish).
2. Add the route to the deploy workspace `routes.json` (11 → 12 routes).
3. Rebuild the wp-exact bundle, snapshot `/` (new slide) and the new route,
   DRY_RUN, deploy both pages, SpeedyCache freshness check.
4. Live verification: page serves the new bundle, X-Arefin-Exact present, buttons
   measured on live bytes, and a clearly-labelled TEST form submission to confirm
   an `arefin_request` is saved (this also settles whether the chamber inbox email
   arrives — the owner confirms receipt).

## 8. Decisions / open items for the owner

- **Promise wording:** draft uses "immediate attention / immediate response" (the
  owner's words) with no clock-time claim. A concrete line ("replies the same
  day") is added only if the owner confirms the team can keep it.
- **FAQ figures:** page uses 1500+ / 20+; fixing the FAQ registry's "1,000+"
  answers is NOT in this scope unless the owner adds it.
- **Homepage hero:** not modified — the slide sits below it.

## 9. Out of scope

The 418-page missing-pages batch (separate decision), FAQ reconciliation, new
photography, any change to the contact form's fields or the submission route.
