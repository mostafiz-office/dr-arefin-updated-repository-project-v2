# 14 — Staging: menu "Book" didn't open the Contact page

- **Symptom:** on staging, clicking Book (and other in-app links) went to `/staging/staging/contact/`.
- **Cause:** `scripts/wp-exact/deploy.mjs` added the `/staging` base to router `to:"/x"` values inside the JS bundle; React Router adds the basename again.
- **Fix:** in the JS bundle only plain `href` links get the base; router `to` values stay root-relative. HTML snapshots unchanged.
- **Verified:** Book clicked from Home, About, Treatment, Articles, Research, Gallery on 1280px and 390px — all open `/staging/contact/` with the appointment form. No `/staging/staging` left in the build. Redeployed all 11 pages, snippet active.
- **Before push:** the same rule applies to the live rebuild (`ROUTER_BASE=` empty, so no prefix at all).
