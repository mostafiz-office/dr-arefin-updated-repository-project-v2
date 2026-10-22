# Plan — Fix the broken links by creating the missing pages (2026-10-21)

Owner's direction (2026-10-21): create the missing pages step by step — first the
pages the HOMEPAGE links to, then the pages other pages link to — one page per step,
each created SEO-friendly and rank-able, the same way the existing pages were made.

## Measured baseline (live crawl, 2026-10-21 evening)

- 212 unique links inside the 12 published pages return 404; 10 more redirect (they
  land on a live page — not broken, left alone).
- 448 URLs in the sitemap; 426 are not live (404). Only the 12 exact routes + blog
  posts/categories resolve.
- Cause: the pages exist in the website app (Lovable/GitHub) but were never created
  in WordPress. Creating them through the same wp-exact pipeline as the first 12
  fixes the links and makes the pages indexable.

## How every page is created (the repeatable step — identical for all phases)

1. **Create the WordPress page** — exact slug from the app route, correct parent
   where the URL has one (parents always before children), status Published.
   Title = the app's own page title.
2. **Add the route** to the deploy list (`routes.json`).
3. **Snapshot the page** from the current app build — the app renders the complete
   SEO page: unique title tag, meta description, canonical, one H1, structured
   data (Physician / FAQ / breadcrumbs as the page defines), internal links.
   This is exactly how the existing 12 pages were created.
4. **Deploy that one page** through the pipeline (shared media is already on the
   server; only the page HTML is written, sha-verified).
5. **Verify live**: HTTP 200, `X-Arefin-Exact: 1`, correct title/H1 on the live URL.
6. Tick the page off the phase checklist; move to the next page.

After each phase: re-crawl the live site — that phase's broken count must be 0
before the next phase starts.

Rules: pages are created once, in the earliest phase that links to them (later
phases skip anything already live). No content is invented — every page is the
app's own existing page. Bengali video slugs are created exactly as the app
names them.

## Phase 1 — Pages linked from the HOMEPAGE (54 pages)

The homepage's own sections, initiatives, FAQ answers and footer link to these.
Order inside the phase: treatment hubs first (they are also parents for Phase 2),
then the satellite/journey pages, then FAQ-style pages, video pages last.

Treatment (10): /treatment/fatty-liver-management/, /treatment/liver-transplant-coordination/,
/treatment/laparoscopic-cholecystectomy-dhaka/, /treatment/laparoscopic-cholecystectomy/,
/treatment/liver-surgeon-dhaka/, /treatment/liver-transplant-surgery-dhaka/,
/treatment/pancreatic-cancer-surgery-dhaka/, /treatment/spleen-surgery/,
/treatment/whipple-procedure-dhaka/, /laparoscopic-cholecystectomy/

Homepage satellite/journey pages (34): /best-hepatobiliary-surgeon-dhaka/,
/compassionate-patient-care/, /complex-liver-gallbladder-pancreatic-surgery/,
/conferences-presented/, /diagnosis-surgery-recovery/, /dr-murshidul-arefin/,
/financial-assistance/, /hepatobiliary-liver-transplant-treatment/,
/hepatobiliary-pancreatic-surgery-specialist/, /is-financial-assistance-available/,
/liver-disease-prevention-education/, /liver-health-education/,
/liver-pancreas-biliary-tract/, /liver-transplant-triumph/,
/mbbs-university-of-dhaka/, /minimally-invasive-surgery/,
/ms-hepatobiliary-surgery-bsmmu/, /open-surgical-techniques/,
/patient-emotional-support-recovery/, /patient-first-philosophy/,
/patient-support-groups/, /patients-treated-care/, /patients-treated-count/,
/popular-medical-college-hospital/, /second-opinion/, /successful-hepatobiliary-surgeries/,
/successful-surgeries/, /surgery-assistance-program/, /surgery-financial-assistance/,
/surgical-conferences-academic/, /surgical-excellence-experience/,
/surgical-excellence/, /what-conditions-does-dr-arefin-treat/,
/where-does-dr-arefin-see-patients/, /years-of-experience/

FAQ-style (2): /how-can-i-book-a-consultation/ (+ any Phase-1 duplicates of Phase 3)

Video pages (8): the /video/<bengali-slug>/ pages the homepage video section links to
(created last in the phase; slugs copied exactly from the app).

## Phase 2 — Mega-menu matrix pages (120 pages)

The Treatment menu on every page links to "service in area" pages:
8 services × 15 areas = 120, all currently 404.
Setup first: confirm the 8 parent hubs — liver, gallbladder, pancreatic and
biliary-tract hubs are live; fatty-liver-management and liver-transplant-coordination
arrive in Phase 1; hepatobiliary-surgery and laparoscopic-surgery currently answer
301 (redirect) — inspect and settle their parent pages before creating children.
Then create the 120 area pages service by service (8 steps of 15), verifying the
menu links after each service.

KNOWN CAVEAT (owner's open P6 from the menu QA): these area pages have thin body
copy in the app (~178 words, highly similar between areas) — creating them fixes
the 404s and makes them indexable with correct titles/meta/schema, but strong
ranking needs the content-depth upgrade. That upgrade is NOT in this plan unless
the owner adds it (Phase 2B, separate approval).

## Phase 3 — Pages linked from the other main pages (158 pages)

Grouped by where the links live, highest intent first:
- Treatment satellites under /treatment/ (81) — procedure, cost, recovery pages.
- FAQ-answer pages at root (~50) — chamber address, booking, fees, costs,
  recovery-time and eligibility questions (the same pages the FAQ accordions and
  the new First-in-Bangladesh page link to).
- Mentorship subpages (19) + mentorship FAQ slugs (program length, fees,
  eligibility, certificate, criteria, application steps).
- Credentials (3): /credentials/1500-gallbladder-surgeries-dhaka/,
  /credentials/20-years-gallbladder-surgery-experience-dhaka/,
  /credentials/fcps-ms-hepatobiliary-gallbladder-surgeon-dhaka/ — NOTE: these are
  also linked from the new page's trust chips, so they may be pulled into Phase 1
  at the owner's call.
- About subpages (3) + "best … surgeon" satellites (4).

## Phase 4 — Sitemap-only pages (123 pages)

Pages no main page links to, created last for sitemap/SEO completeness:
/faq/ section (46), /gallery/ items (41), root journey pages (~29, incl. the
"why … is required" hubs), /conditions/ hub (1), a few treatment/mentorship pages (8).

## Totals and pace

~435 unique pages to create (426 sitemap + linked video routes), each one step:
create → snapshot → deploy → verify ≈ 2–3 minutes per page of machine time.
Phases run in order; progress is reported at the end of each phase with a fresh
crawl proving the broken count fell to zero for that phase. Any page that fails
verification is stopped on and reported, never skipped silently.

## Out of scope

Content rewrites (incl. the Phase 2B depth upgrade), the 10 redirecting links
(they resolve), FAQ figure reconciliation (1500+ vs the FAQ registry's 1,000+),
and any change to the 12 already-live pages beyond what creating children requires.

## Phase 1 execution record (2026-10-21 night)

- 40 pages CREATED in WordPress (ids 4884–4923), snapshotted from the current app
  build, deployed in 6 batches of ≤7, and verified live: 40/40 return HTTP 200 with
  the exact-page marker and their own titles (e.g. /second-opinion/,
  /treatment/whipple-procedure-dhaka/, /popular-medical-college-hospital/).
- /treatment/laparoscopic-cholecystectomy/ also resolves now — WordPress's 404-guess
  redirect sends it to the created /laparoscopic-cholecystectomy/ page.
- Homepage broken links: 54 → 13. The remaining 13 are NOT creatable pages:
  - 8 video links: the app has no /video/ pages at all (the cards link out to routes
    that were never built; slugs end in YouTube IDs). Owner decision pending.
  - 4 FAQ slugs (/how-can-i-book-a-consultation/, /is-financial-assistance-available/,
    /what-conditions-does-dr-arefin-treat/, /where-does-dr-arefin-see-patients/):
    no route exists in the app — the SPA renders the homepage for them, so creating
    them would publish homepage clones. Owner decision pending.
  - /best-hepatobiliary-surgeon-dhaka/: page id 4475 ALREADY EXISTS in WordPress,
    published, with hand-built legacy content (61 revisions). It was deliberately NOT
    overwritten. Its pretty URL returns 404 on fresh requests while WordPress
    resolves it via ?page_id=4475 (301 → 200 on the warm path) — consistent with a
    stale 404 in the host cache layer. Re-saving the page did not clear it. Owner
    options: full cache purge from wp-admin, replace with the app version, or leave.
- The 11 WordPress draft pages were inventoried first: all legacy (shop, dashboards,
  templates) — none collide with the missing app pages.

## Phase 2 execution record (2026-10-22)

- All 120 mega-menu matrix pages (8 services × 15 areas) created in WordPress as
  children of /treatment/ (ids 4964–5083), snapshotted from the app build
  (120/120 unique titles, no homepage fallbacks, h1=1, 0 errors), deployed in
  18 batches of ≤7 (batch 12 hit the proxy socket error and was re-run clean),
  and verified live by CONTENT (title + app bundle): 120/120.
- Verification lesson: once the host cache (LiteSpeed/SpeedyCache) warms, cached
  responses drop the X-Arefin-Exact PHP header and reformat the HTML — verify
  these pages by served title/content, not by the header. Rapid bulk checks can
  also trip the host bot-check ("One moment, please..."); re-check stragglers
  singly.
- Known caveat stands (owner's P6): the matrix pages' body copy is thin
  (~178 words in the app) — they are now live and indexable; the content-depth
  upgrade remains a separate decision.
- Published routes now: 172 of 447. Remaining: Phase 3 (158) + Phase 4 (123),
  minus overlaps between phases.
