# 06 — Conversion Rate Optimization (CRO)

> Reviewer angle: if a worried patient lands here from Google on a phone at 11pm, will they (a) trust this doctor and (b) take the next step within 30 seconds? If not, flag what's blocking them.

---

## 1. Above-the-fold non-negotiables (every landing page)

Within the first viewport on mobile, the user must see:
1. **Who** — Dr. Arefin's name + specialty (e.g., "Hepatobiliary & Liver Transplant Surgeon").
2. **What** — the page's specific service / answer in one line.
3. **Where** — Dhaka / Dhanmondi / hospital affiliation.
4. **One primary CTA** — "Book a consultation" (or page-specific equivalent).
5. **One trust signal** — credential, years, case count, hospital, or rating.

Missing any of the 5 → 🟠 Major.

---

## 2. CTA hierarchy

- **Primary CTA**: solid green button (`variant="default"` or `"hero"`). Max ONE per section.
- **Secondary CTA**: outline/ghost. Supports primary, never competes.
- **Persistent CTA**: sticky header always shows "Book consultation" on ≥ tablet.
- **End-of-page CTA**: every long page ends with a final CTA band.

---

## 3. Trust signals to include (pick ≥ 3 per landing page)

- Fellowship + training credentials (with institution names)
- Years of practice / case volume / outcomes
- Hospital affiliation (Popular Medical College Hospital, Dhanmondi)
- Real patient testimonials (named, with condition)
- Professional society memberships
- Press / media mentions
- Before/after only with explicit consent — never AI-generated

---

## 4. Friction reducers

- Phone number tappable (`tel:`) on mobile, visible in header.
- WhatsApp link if used by clinic.
- Address with one-tap "Open in Maps".
- Hours of operation visible.
- Form: ask only what's needed (name, phone, condition/concern). No 10-field forms.
- No mandatory account creation to book.

---

## 5. Page-type playbooks

### 5.1 Home (`/`)
- Hero with H1 containing primary cluster + 1 primary + 1 secondary CTA.
- Social proof band within first 2 sections (logos / metrics / "X+ surgeries").
- Service overview (sticky-stack or grid linking to treatment pages).
- About snippet → link to `/about/`.
- Testimonials (real).
- Final CTA band.

### 5.2 Treatment / service page (e.g., `/treatment/liver-surgery/`)
- H1 with `[Procedure] in Dhaka` keyword.
- Lede answering "what is it + when do you need it" in 2–3 sentences.
- Procedure overview, recovery, risks (transparency builds trust).
- "Why Dr. Arefin" mini-bio block with credentials.
- FAQ (accordion) — also helps SEO via FAQPage schema.
- Final CTA: "Book a consultation about [procedure]".

### 5.3 Satellite SEO page (e.g., `/best-hepatobiliary-surgeon-dhaka/`)
- H1 matches search intent literally.
- Lede + 3–5 sections with high inline-link density (Atto-style).
- Pull credentials forward.
- Single CTA repeated 2–3 times down the page.
- Inline links to related satellite pages within prose — never as a cards grid.

### 5.4 About (`/about/`)
- Doctor portrait (real photo).
- Credentials timeline.
- Philosophy / approach.
- Affiliations + memberships.
- CTA: "Book a consultation" + "See treatments offered".

### 5.5 Contact (`/contact/`)
- Form above the fold on desktop, immediately scrollable on mobile.
- Address + phone + map adjacent.
- Hours.
- Response-time expectation set ("We respond within 24 hours").

---

## 6. Mobile-first conversion

- Primary CTA visible without scroll on 375px viewport.
- Tap targets ≥ 44px.
- No interstitials / popups within first 5 seconds.
- Click-to-call in header.
- Forms: numeric keyboard for phone, email keyboard for email, autocomplete attrs set.

---

## 7. CRO anti-patterns (auto-flag)

- ❌ Auto-playing video with sound
- ❌ Multiple competing primary CTAs in one section
- ❌ Slideshow hero (kills LCP and confuses CTA focus)
- ❌ Pop-up before user has read anything
- ❌ Required fields hidden behind expandable sections
- ❌ Generic stock testimonials
- ❌ "We're the best!" without evidence
