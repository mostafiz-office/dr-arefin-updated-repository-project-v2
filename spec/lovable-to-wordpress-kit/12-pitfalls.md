# 12 — Pitfalls (real bugs hit, with fixes)

| Symptom | Cause | Fix |
|---|---|---|
| After load, address bar changes to `/wp-content/uploads/...` | Vite `base` set to uploads folder; TanStack uses base as router basepath | Keep `base: "/"`, rewrite asset URLs after build (07) |
| Local test passed but live broke | Local mock server served files at the same paths, hiding the base bug | Always verify on the live site |
| Uploaded file has a different name (`_`, `-1`, `.png_`) | WordPress sanitizes names / dedupes | Flat names, hash after `_`, real extension, verify `source_url` |
| Image upload rejected or renamed | Extension does not match content (e.g. WEBP named .png) | Magic-byte detection |
| SVG upload refused | WordPress blocks SVG | Inline as data URI |
| Meta saved as empty via REST | Meta key not registered with `show_in_rest` | Install snippet before deploying pages |
| Page HTML truncated | Raw NUL bytes in inline router data | Escape to `\u0000` |
| Title differs from preview | SEO plugin rewrites title | Snippet runs at priority 0 and exits before plugins output |
| Theme fonts/gutters leak in | Page rendered through theme | Serve full document, never inside theme template |
| Hydration warnings after "beautifying" HTML | Whitespace added between inline elements | Only break lines inside tag syntax (06) |
| Duplicate pages (`privacy-policy-2`…) | Earlier tool created pages without searching first | Search slug+parent before create; clean up and recheck sitemap |
| Forms do nothing / open mail app | Preview used `mailto:` or a backend not reachable from WP | Decide form backend explicitly; test submission live |
| Changes not visible | Cache plugin / CDN | Purge after deploy |
| Hand-rebuilt pages drift every pass | Re-implementing CSS/motion | Don't. Serve the real build (01) |

## Dozens of JS files in View Source
Default Vite/TanStack builds split code per route and list every chunk as `modulepreload` in `<head>`. Use the single-bundle settings in 05 and the preload removal in 06.
