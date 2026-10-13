# 04 — Step 1: Preflight

Run these checks with the Basic auth header (see 02).

1. **REST reachable**: `GET {{WP_URL}}/wp-json` returns JSON with namespaces. If `rest_no_route` on `/wp-json/wp/v2/...`, enable pretty permalinks (Settings → Permalinks → Post name).
2. **Auth + capabilities**: `GET /wp-json/wp/v2/users/me?context=edit` → check `capabilities` (02).
3. **Install Code Snippets** (if missing):
   - `GET /wp-json/wp/v2/plugins` — look for `code-snippets/code-snippets`.
   - Install: `POST /wp-json/wp/v2/plugins` body `{"slug":"code-snippets","status":"active"}`.
   - Or activate: `POST /wp-json/wp/v2/plugins/code-snippets/code-snippets` body `{"status":"active"}`.
   - Confirm `GET /wp-json/code-snippets/v1/snippets` works.
4. **Inventory existing pages**: `GET /wp-json/wp/v2/pages?per_page=100&_fields=id,slug,parent,link,status` (paginate). Record IDs for each route to reuse them.
5. **Note the SEO plugin / theme / cache plugin** in use (they will be bypassed for served pages, but caches may need purging after deploy).
6. **Upload limits**: check that JS bundles (often 300–800 KB) are below the site's max upload size.
