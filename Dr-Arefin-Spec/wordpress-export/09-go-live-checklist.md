# 09 — Go-live checklist: main site vs staging (2026-10-13)

Read-only checks on drarefin.com; all fixes applied to staging only.

## Content parity
| Item | Main | Staging | Status |
|---|---|---|---|
| Pages | 21 | 21, same addresses | OK |
| Blog posts | 93 | 93 | OK |
| Categories | 28 | 28 | OK |
| Plugins | — | same + Code Snippets | OK |
| Lovable design pages | — | 11 (Home, About, Treatment + 4, Mentorship, Gallery, Contact, Articles), stored copy verified | OK |
| Single posts / categories (incl. Research) | Elementor | Lovable design, same addresses | OK (verified in preview + replay) |
| Menu: Home, About, Treatment, Mentorship, Articles, Research, Gallery | yes | yes | OK |
| Footer: disclaimer, privacy, cookie, social links | yes | yes | OK |
| Imprint / Donate links | not in footer | not in footer | Same as live |

## Contact page
| Item | Status |
|---|---|
| Form sends | FIXED. Was a fake "thank you" only. Now saved in wp-admin > Appointment requests and emailed to arefin-leads@googlegroups.com (same inbox as the Elementor form), from info@drarefin.com via GoSMTP |
| Spam protection | Hidden trap field, 5 requests/hour per visitor, server field checks |
| "Other" warning | FIXED. Red, full width, desktop + phone |
| Real test | 2 test requests sent on staging ("TEST … please ignore"); server reported saved + mail accepted. Inbox receipt: owner to confirm |
| Confirmation email to patient | Old Elementor form also emailed the patient; new form does not (ask if wanted) |

## Booking (WooCommerce)
| Item | Status |
|---|---|
| /shop/appointment/ product + add to cart | Live 200, untouched on staging |
| Links from the 11 pages to booking | None on live, none on staging (same) |
| Checkout flow on staging | Not tested — staging needs a logged-in browser; owner to test up to payment |

## SEO
| Item | Status |
|---|---|
| Title, description, canonical, one H1 per page | OK on all 11 |
| Homepage title | Fixed: "Gallbladder & Liver Surgeon in Dhaka \| Dr. Arefin" (live still old until push) |
| Internal links to non-existent addresses | 219 link targets on the new pages don't exist in WordPress (Lovable-only satellite/FAQ pages). 68 of them are already broken on live today. Not a new regression, but costs SEO — decide: create the pages or remove the links |
| Staging addresses | Build uses /staging links; must rebuild with live links before push |

## Speed
| Item | Status |
|---|---|
| JS | One 1.5 MB file (370 KB compressed) on every page — heavy for phones |
| Largest images | ~330–360 KB each |
| Google speed score | Not measured (Google's free test quota was used up; staging is login-only) |

| Menu Book → Contact on staging | FIXED (doubled /staging/staging address), see issue 14 |

## Ready to push?
**Not yet.** Remaining before push:
1. Owner confirms both test emails arrived in arefin-leads@googlegroups.com.
2. Owner tests booking on staging up to payment.
3. Decide on the 219 missing link targets.
4. Rebuild with live links (`ROUTER_BASE=`), push with WP Staging Pro, purge SpeedyCache, re-check live.
