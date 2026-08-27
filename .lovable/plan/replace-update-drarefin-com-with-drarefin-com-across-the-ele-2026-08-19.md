# Replace update.drarefin.com with drarefin.com across the Elementor export

## What's there now

The staging domain `https://update.drarefin.com` appears in 33 files inside `public/elementor-export/` — roughly 250 occurrences. Two kinds:

1. **Navigation / page links** — header, footer, hero CTAs, service cards, breadcrumbs, checkout, and the two PHP snippets (articles + category archive).
2. **Media URLs** — `wp-content/uploads/...webp` image sources (the large majority, e.g. 82 in the gallery grid).

## What I'll do

Replace every `update.drarefin.com` with `drarefin.com` (keeping `https://`) across all files in `public/elementor-export/`, including:

- All `blocks/**/*.html` (home, about, treatment, contact, gallery, mentorship, articles, checkout, and the four surgery sections)
- `blocks/global/header.html` and `blocks/global/footer.html`
- `blocks/articles/arefin-articles-dynamic.php`
- `blocks/category/arefin-category-archive.php`
- `DEPLOYMENT.md` references

No markup, layout, or styling changes — only the hostname.

## Note on images

The image URLs also point at the staging host. After the swap they will load from `https://drarefin.com/wp-content/uploads/...`. If the media library on the live site holds the same uploads (same file names and date folders), they will resolve fine. If any 404, the fix is to re-upload those files on live — I'll flag it rather than guess.

## Files to re-paste in WordPress after the change

- The header and footer HTML blocks
- Any page block you have already pasted that contains links or images
- The two WPCode PHP snippets (articles + category archive)

Then purge SpeedyCache and verify in a private window.
