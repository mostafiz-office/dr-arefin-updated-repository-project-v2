# Live site audit — drarefin.com (2026-10-13, read-only, public sitemaps)

Totals: 21 pages, 92 posts, 19 categories, 2 shop items, 1 product category, 3 author pages, 1 locations.kml.

## Pages
| Live URL | Lovable match | Action |
|---|---|---|
| / | DrArefinHomeDark | Replace (first, after approval) |
| /about/ | AboutDark | Replace |
| /treatment/ | TreatmentDark | Replace |
| /treatment/liver-surgery/ | yes | Replace |
| /treatment/gallbladder-surgery/ | yes | Replace |
| /treatment/pancreatic-surgery/ | yes | Replace |
| /treatment/biliary-tract-surgery/ | yes | Replace |
| /mentorship/ | yes | Replace |
| /gallery/ | GalleryDark | Replace |
| /contact/ | ContactDark | Replace (the "Other" warning must be built into the Lovable page first) |
| /articles/ | ArticlesDark | Replace, filled from WordPress posts |
| /best-hepatobiliary-surgeon-in-dhaka/ | catch-all route only, check it | Check before replacing |
| /donate/, /imprint/, /disclaimer/, /privacy-statement-eu/, /cookie-policy-eu/ | no named route (catch-all only) | Leave alone until a Lovable page exists |
| /shop/, /shop/appointment/, /cart/, /checkout/, /my-account/, /customer-cabinet/ | none (WooCommerce) | Never touch |

## Blog
- 92 single posts: content stays in WordPress and is shown in the Lovable single-post design (kit section 15). Each post keeps its address.
- 19 `/category/<slug>/` pages: same approach, using the Lovable category design.
- `/category/uncategorized/`: leave alone. Also suggest setting it to noindex.

## Leave untouched
`/product-category/consultation/`, `/author/*`, `/locations.kml`, and the SEO plugin's sitemaps.

## SEO keep-list
Every replaced page keeps its exact address (with the trailing slash). Its title and description are compared with the live SEO plugin values before it goes live, and any difference is shown for approval.

## Risks
1. WooCommerce appointment booking must keep working. Those pages are not touched.
2. Pages that only exist through the catch-all route would show the Lovable "not found" layout. They are not included until a real Lovable page exists.
3. Rollback: the Elementor content stays saved. Turning off the "Arefin exact pages" snippet restores the whole site.
