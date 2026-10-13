# 12 — Staging: single posts not opening, Research menu missing (2026-10-13)

**Reported by:** Alim. Clicking a post on the staging Articles page did not open it; the live site's "Research" menu item (`/category/research/`) was missing.

**Causes**
1. Lovable Articles page listed 9 built-in sample articles linking to `/articles/<slug>/`, an address that does not exist in WordPress (real posts live at `/<slug>/`).
2. No Lovable template for single posts or category archives yet.
3. Staging clone had "Plain" permalinks, so pretty addresses (and `/wp-json/`) 404'd on staging.
4. Lovable header lacked the Research item.

**Fix**
- Articles, single posts and category pages now load real WordPress posts (`src/lib/wpApi.ts`); routes `/:slug/` and `/category/:slug/` in `src/App.tsx`.
- Research added to the header (desktop + mobile) between Articles and Gallery.
- Snippet serves posts/categories with the app shell + Yoast title/description/canonical; forces `/%postname%/` permalinks on staging.
- Deploy link rewrite no longer doubles `/staging/staging` on the logo link.

**Verified:** preview (desktop + 390px phone) and the staging build replayed in a test browser (Research → 3 posts → post opens at its real address, no errors). Not verified: the logged-in staging site itself (staging only opens for logged-in users).
