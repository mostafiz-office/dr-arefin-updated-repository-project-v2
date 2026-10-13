# 14 — Acceptance Checklist

Preflight
- [ ] HTTPS site, pretty permalinks, REST reachable
- [ ] Admin capabilities confirmed
- [ ] Code Snippets active; "{{PREFIX}} exact pages" snippet active

Build and deploy
- [ ] Every public route listed in routes.json; retired URLs have `redirect`
- [ ] Build used `base: "/"` and flat `aw-*` names
- [ ] No `/__l5e/` references left; all uploads' `source_url` match expected names
- [ ] Every page's stored HTML SHA matches what was sent; backups saved

Live verification (actually run, with evidence)
- [ ] All routes 200 with `X-{{PREFIX}}-Exact: 1`, desktop + phone
- [ ] URL never changes to uploads path; refresh on deep links works
- [ ] View Source shows title, description, OG tags, H1, body text, multi-line
- [ ] No theme CSS, no SEO-plugin title override
- [ ] Key pages visually match preview at 1280/768/390
- [ ] Main menu click-through passes; no bundle console errors
- [ ] Redirects return 301 to the right page
- [ ] Forms tested live

Cleanup
- [ ] No duplicate pages; sitemap clean
- [ ] Caches purged
- [ ] Owner approved each group
- [ ] Application Password rotated; no secrets in repo
- [ ] View Source shows one JS file (before `</body>`) and no `modulepreload` links
