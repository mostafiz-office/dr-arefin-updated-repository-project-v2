# Staging workflow (current method, 2026-10-13)

```text
Lovable --scripts/wp-exact--> drarefin.com/staging/ --approve--> WP Staging Pro "Push" --> drarefin.com
```

Replaces the block-by-block Elementor export (files 00–06 in this folder and `public/elementor-export/`). Those files are kept only as reference for the old approach.

## Rules
- Scripts target only `WP_STAGING_URL` (`https://drarefin.com/staging`). `target.mjs` refuses to run against the site root.
- The REST API goes through `?rest_route=`, because `/staging/wp-json/` gives a 404.
- Page HTML is stored in the page field `arefin_raw_html`. The "Arefin exact pages" snippet (Code Snippets, id 5) serves it and sends the header `X-Arefin-Exact: 1`.
- Assets are uploaded to `/staging/wp-content/uploads/YYYY/MM/aw-*`. The snippet lets admins upload `aw-*.js/css` files.
- Staging builds use the router base `/staging`. Before the push, rebuild with `ROUTER_BASE= bash scripts/wp-exact/build.sh --all` and deploy again, so the HTML has root links.
- Pages are never created automatically. The shop, cart, checkout, account and appointment pages are never touched.
- Blog list, single posts and categories: not served yet. Templating (kit spec 15) comes after the static pages are approved.

## Commands
```bash
bash scripts/wp-exact/build.sh "/"          # or --all
node scripts/wp-exact/snippet.mjs
node scripts/wp-exact/deploy.mjs "/"        # or --all
```

## Rollback
- One page: `?arefin_legacy=1`, or clear its `arefin_raw_html` field.
- Everything: deactivate the "Arefin exact pages" snippet.

## Known limits
- The staging site requires login (WP Staging protection). Check it while logged into `/staging/wp-admin/`.
- The page is snapshot-rendered, and React re-renders it when it loads (no true hydration).

## Status
- [x] Homepage deployed to staging (page 12). Verified desktop and phone, no console errors.
- [ ] Other static pages, after approval
- [ ] Blog, single post and category templates
- [ ] Base `/` rebuild, then push
