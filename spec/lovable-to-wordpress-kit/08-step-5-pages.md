# 08 — Step 5: Pages

For each route in routes.json:

1. **Resolve the page ID**: use `id` if given; otherwise walk the path segments, `GET /wp/v2/pages?slug=<seg>&parent=<parentId>&status=publish,draft,private`. Publish drafts that match (e.g. default "Privacy Policy"). If none, create `POST /wp/v2/pages {title, slug, parent, status:"publish", template:"elementor_canvas"}` (template optional) and stop if WordPress altered the slug.
2. **Back up** current meta: `GET /wp/v2/pages/<id>?context=edit&_fields=id,link,meta` → save to a local backup file.
3. **Redirect routes**: `POST /wp/v2/pages/<id> {"meta":{"{{PREFIX}}_redirect":"/new-path","{{PREFIX}}_raw_html":""}}`.
4. **Normal routes**: readable + rewritten HTML (06, 07) → `POST /wp/v2/pages/<id> {"meta":{"{{PREFIX}}_raw_html":"<html>","{{PREFIX}}_redirect":""}}`.
5. **Verify storage**: read the meta back and compare SHA-256 with what was sent. Mismatch = stop.
6. Write a `deployed.json` record (route, id, link).

Notes
- The meta keys must be registered with `show_in_rest: true` (the snippet in 09 does this) or REST silently ignores them — install the snippet first.
- `post_content` is never modified.
- Avoid creating duplicate pages: always search by slug+parent before creating.
