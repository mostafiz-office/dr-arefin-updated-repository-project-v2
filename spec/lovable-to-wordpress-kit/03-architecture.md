# 03 — Architecture

```text
 Lovable source (same code as preview)
        |
        | build.sh : vite build + TanStack prerender (one HTML per route)
        v
 dist/client/
   index.html, solutions/index.html, ...   <- full HTML documents
   aw-app_<hash>.js (ONE script), aw-*.css, aw-*.png  <- flat, hashed names
        |
        | deploy.mjs
        |   1. rewrite asset URLs -> /wp-content/uploads/YYYY/MM/
        |   2. readable-html.py  (line breaks inside tags, NUL escaping)
        |   3. upload assets via REST  POST /wp/v2/media
        |   4. find/create WP page per route, save HTML in meta {{PREFIX}}_raw_html
        v
 WordPress
   wp_postmeta: {{PREFIX}}_raw_html = <!DOCTYPE html>...   (per page)
   Code Snippets plugin -> "{{PREFIX}} exact pages" (PHP)
        |
        | on template_redirect (priority 0):
        |   if page has {{PREFIX}}_redirect -> 301
        |   if page has {{PREFIX}}_raw_html -> echo it, exit (no theme)
        v
 Browser: identical HTML -> loads JS/CSS from uploads -> React hydrates
```

## Why each piece exists
| Piece | Reason |
|---|---|
| Prerender | Real content and meta tags in View Source (SEO), fast first paint |
| Flat asset names | WordPress media renames files with inner dots or `--` |
| Uploads folder | Only place REST can write files without FTP |
| Post meta, not post_content | Avoids wpautop/kses filters; post_content kept for rollback |
| Code Snippets plugin | Lets us add PHP over REST with no FTP/theme edit |
| template_redirect priority 0 | Runs before the theme, page builder and SEO plugin |
