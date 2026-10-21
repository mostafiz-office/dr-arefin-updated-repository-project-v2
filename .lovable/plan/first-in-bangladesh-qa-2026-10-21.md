# QA — "First in Bangladesh" page (2026-10-21)

Page: /fastest-way-to-reach-a-doctor-in-bangladesh/ (src/pages/FirstInBangladesh.tsx)
Method: production build rendered headlessly on the real origin; computed styles
measured (never eyeballed). Form styles compared field-by-field against the
live Contact page render from the same build.

Owner-reported defects that opened this round:
1. "Broken form" — ROOT CAUSE: the contact form's CSS lives only inside
   ContactDark.tsx's own <style> blocks; the new page used the same class names
   with no styles. FIX: the page now carries the same rules verbatim in its own
   <style> block; only the card rule is re-scoped (.contact-form-band →
   .reach-form-band). Contact page untouched.
2. "FAQ section not look good" — ROOT CAUSE: FAQAccordion renders its own
   kicker/heading/padding; the page wrapped it in a second heading ("Before you
   visit") + narrow container. FIX: extra heading removed; accordion now sits
   bare in the global mint band, exactly the homepage pattern.

## Test list & results

- T01 Title/meta — PASS. Title = plan text; canonical/OG set.
- T02 Single H1 — PASS (exactly 1, plan headline).
- T03 Hero CTAs — PASS. Call (tel:), WhatsApp (wa.me), Send a Query anchor
  scrolls to #query-form (verified by click + scroll position).
- T04 Trust chips — PASS (3 chips → the 3 credential routes).
- T05 Stats — PASS (20+ years / 1500+ / Associate Professor / BSMMU — homepage figures).
- T06 Pain cards — PASS (3 cards, approved copy).
- T07 Expertise — PASS (8 cards from MEGA_SERVICES, each linking its hub).
- T08 Steps — PASS (3 steps, chamber address correct).
- T09 Form — PASS all: (a) input parity vs Contact page (bg/border/radius/height
  identical: 52px, rgb(18,18,18), 10px); (b) card parity (bg rgb(26,26,26),
  padding 36px, radius 20px); (c) labels 12px/600/tracked; (d) honeypot hidden;
  (e) validation — native required on empty fields; schema error renders for a
  too-short phone ("Please enter your phone number"). End-to-end submission is
  verified at the WordPress phase (arefin/v1/contact), not in this harness.
- T10 FAQ — PASS all: single heading ("Common Questions"), 4 items, first item
  expands on click (panel 0→117px, correct chamber answer), FAQ schema emitted
  by the component.
- T11 Final band — PASS ("Your doctor is one message away." + Call/WhatsApp/query links).
- T12 Footer — PASS ("Reach Dr. Arefin Directly" in Quick Links).
- T13 Homepage slide — PASS (present under hero; button links to the page).
- T14 Contact cross-link — PASS (hero intro line links to the page).
- T15 Link audit — PASS. 33 unique internal hrefs; 32 in the sitemap route set;
  the 33rd (/category/research/) is the header's own nav item and resolves via
  the app's /category/:slug route (sitemap simply doesn't list categories).
- T16 Mobile (390px) — PASS (no horizontal overflow; form 358px within viewport).
- T17 Reveal safety — PASS (all sections visible after scroll pass).
- T18 Console — PASS. Only failures were Google Fonts requests blocked by the
  local harness itself (external hosts are aborted); no page errors.

Result: 18/18 test groups pass after the two fixes. Screenshots:
qa-form-fixed.png / qa-faq-fixed.png (agent workspace scratch).
