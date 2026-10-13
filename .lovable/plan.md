# Live vs staging comparison and go-live readiness check

## Goal
Compare drarefin.com (live) with drarefin.com/staging/ page by page, produce one clear checklist, and answer: is staging ready to push to the main domain? No changes to the live site. Fixes found along the way are listed for your approval first, not applied automatically.

## Early warning (already seen in the code)
The Lovable contact form appears to only show a "Message received" pop-up — it may not actually send the message anywhere. If confirmed, the staging Contact page would lose real appointment requests after the push. This is the top item to check, and it likely blocks going live until fixed.

## What will be checked

1. **Every page (11 Lovable pages + blog)** — live vs staging: loads OK, main heading, page title and Google description (Yoast), canonical address, no broken links or images, desktop and phone screenshots side by side.
2. **Pages that must stay on Elementor/WooCommerce** — shop, appointment booking (/shop/appointment/), cart, checkout, my account, donate, imprint, privacy, cookie, disclaimer, "best hepatobiliary surgeon" page: confirm they still open on staging exactly like live and are not replaced.
3. **Menu and footer** — every menu item (incl. Research) and footer link opens the right page on staging; compare against live menu and footer link lists; flag anything missing.
4. **Blog** — Articles list shows all 92 posts with paging, all 19 categories open (incl. Research), sample of single posts open at the same address as live, images load, post titles/descriptions match Yoast.
5. **Contact page** — confirm whether the form sends; compare with the live Elementor form (where it emails, what fields, the "Other" warning). Check phone, WhatsApp, email, map links.
6. **Booking page** — the WooCommerce appointment flow on staging: product opens, add to cart, checkout page loads (stop before paying). Confirm every "Book appointment" button on the new pages points to the real booking page.
7. **SEO** — titles, descriptions, canonicals, one H1 per page, structured data present, robots not blocking, sitemaps still list the same addresses, no staging addresses leaking into the final build.
8. **Speed** — Lighthouse (mobile + desktop) on home, contact, articles, one post, live vs staging; note file sizes and slow images.

## How
- Logged-in test browser on staging using the staging Application Password session (staging hides pages from logged-out visitors); public browser for live.
- Read-only REST checks on both sites for pages, posts, categories, menus and Yoast data.
- No writes to live. No writes to staging during the audit.

## Deliverable
- `Dr-Arefin-Spec/wordpress-export/09-go-live-checklist.md`: a table per area with Live / Staging / Status (OK, Missing, Broken) and evidence (screenshot names).
- A short "Ready to push? Yes/No" answer with the blocking items, and a proposed fix list for your approval (for example: wire the contact form so it really sends, any missing menu/footer links).
- Final pre-push steps kept in the checklist: rebuild with live addresses, your WP Staging push, purge SpeedyCache, re-check live.

## Technical notes
- `ContactSection` falls back to a fake toast when no `onSubmit` is passed; the audit will confirm which page usage passes one. Likely fix options: send to the existing WordPress form handler / email, or a Lovable Cloud function that emails the chamber.
- If the WP Staging login blocks automated access, the logged-in visual checks fall back to replaying the build under the staging URL, and that limitation will be stated in the report.
