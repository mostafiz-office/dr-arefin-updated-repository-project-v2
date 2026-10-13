# Edit the staging site first, then push to live from WP Staging

## Agreed workflow
```text
Lovable  --deploy-->  drarefin.com/staging/  --you approve-->  WP Staging Pro "Push"  -->  drarefin.com
```
I only change staging. The live site is never touched by my scripts. When you're happy, you push from WP Staging Pro, which is already active on staging.

## What I checked on staging (read-only)
- The admin login works and has administrator access.
- 21 pages, the same as live.
- Yoast SEO Premium is active.
- **Code Snippets is not installed on staging.** I will install it there.
- The usual `/staging/wp-json/` address shows "Not Found". The alternative address (`?rest_route=`) works, so the scripts will use that. No change to your site is needed.

## Password
The new staging password was sent in chat. I'll save it securely as `WP_STAGING_APP_PASSWORD`, use it only for staging, and never show it. Please revoke both passwords after the launch.

## Steps
1. **Secrets**: `WP_STAGING_URL=https://drarefin.com/staging`, `WP_STAGING_APP_PASSWORD`.
2. **Update the spec**: add `Dr-Arefin-Spec/wordpress-export/08-staging-workflow.md` (the flow above, rules, how to undo), and mark the old Elementor block-by-block files as the old approach. Update `AGENTS.md`: scripts target staging only, and the live site goes live only through a WP Staging push.
3. **Update the scripts** (`scripts/wp-exact/`):
   - Read `WP_STAGING_URL` and refuse to run if it points at the live site.
   - Use the `?rest_route=` address.
   - Change the `awansoft_` prefix to `arefin_` (meta keys, snippet name, `X-Arefin-Exact` header).
   - Put assets under `/staging/wp-content/uploads/YYYY/MM/`.
   - Replace the TanStack prerender with: a normal Vite build, then a Playwright snapshot of each route.
4. **Links on staging**: pages from our build link to `/about/` and similar, which would open the live site. Fix: the WordPress build uses a site base path, `/staging/` while testing and `/` after the push. A small search-and-replace on the stored HTML before the push handles the rest. Before the push, I rebuild with base `/`, so the live site gets correct links.
5. **routes.json** from the audit: home, about, treatment, the 4 surgery pages, mentorship, gallery, contact and articles. The shop, cart, checkout, account and booking pages are never included.
6. **Install Code Snippets** on staging and add the "Arefin exact pages" snippet.
7. **Homepage first** on staging. I compare it with Lovable on desktop and phone and send you screenshots, then wait for your OK.
8. Then the other pages, then the blog list, single posts and categories (filled from WordPress posts).
9. **Before the push**: rebuild with base `/`, then you push from WP Staging Pro, then purge SpeedyCache.

## Notes
- Each page keeps its Elementor content saved. Turning off the snippet on staging (or on live after the push) restores the old pages.
- Yoast stays installed. Our pages carry their own title, description and schema, and pages we don't touch keep Yoast's.
