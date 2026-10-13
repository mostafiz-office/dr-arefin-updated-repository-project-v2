# 07 — Step 4: Assets (JS, CSS, images)

## Rewrite URLs (before upload)
Let `BASE = /wp-content/uploads/YYYY/MM/`.
1. Lovable-hosted images (`/__l5e/assets-v1/<id>/<name>`) → copy to flat names `aw-img-<id8>-<name><realExt>` and replace every reference in HTML/JS/CSS.
2. Build files referenced as `/aw-...` → `BASE + aw-...` (match when preceded by `" ' \` ( = , space`).
3. Vite's modulepreload helper prefixes `"/"` → patch it to prefix `BASE`.
4. Favicon `/favicon.png` → `BASE + aw-favicon.png`.
5. Fail the deploy if any `/__l5e/` reference remains.
ES-module chunk imports are relative (`./aw-x.js`), so they resolve inside the uploads folder automatically.

## WordPress media quirks
| Quirk | Fix |
|---|---|
| Renames files with inner dots / `--` | Flat names, hash after `_` |
| Renames files whose extension does not match content | Detect real type from magic bytes (PNG/JPEG/WEBP/GIF) and use that extension |
| Refuses SVG uploads | Embed own SVG logos as `data:image/svg+xml;base64,...` |
| Adds `-1` suffix for duplicates | Before upload, `GET` the expected URL; same bytes → skip; different → delete old media (`DELETE /wp/v2/media/<id>?force=true`) then upload |

## Upload
`POST /wp-json/wp/v2/media` with raw body, `Content-Type` by extension, `Content-Disposition: attachment; filename="<name>"`. Verify response `source_url` ends with `BASE + name`; otherwise stop. Upload 4 at a time.

## Code files
Only one JS file (`aw-app_<hash>.js`) plus the stylesheets are uploaded per build. After every page uses a new bundle, old `aw-*.js` chunks from earlier builds can be deleted from the media library.
