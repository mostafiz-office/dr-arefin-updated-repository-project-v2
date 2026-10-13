# 11 — Rollout and Rollback

## Rollout
1. Preflight (04) and snippet (09).
2. Build all routes (05); optional `DRY_RUN=1` writes final files locally for inspection.
3. Deploy **homepage only**; verify (10); send the owner the live link + screenshots; wait for approval.
4. Deploy the next group (e.g. Solutions, then Services, About, Resources, legal) with approval after each.
5. Purge any cache plugin / CDN after each group.
6. Check the WordPress sitemap for duplicates or leftover pages.
7. Ask the owner to rotate the Application Password.

## Updating later
Change content in Lovable → rebuild → redeploy the affected routes. Unchanged assets are skipped automatically (hash names + byte compare).

## Rollback
| Scope | Action |
|---|---|
| One page, instantly | Clear meta: `POST /wp/v2/pages/<id> {"meta":{"{{PREFIX}}_raw_html":""}}` |
| Look at old page without changing anything | Add `?{{PREFIX}}_legacy=1` |
| Whole site | Deactivate the "{{PREFIX}} exact pages" snippet |
| Restore previous meta | Use the backup JSON saved in step 5 |

## Cleanup after rollout

Old build files pile up in the media library because every build has new hashed names. Clean them only after the whole site is live:

1. Run `scripts/wp-exact/cleanup.mjs` **without** `--apply` first. It lists duplicate pages (slug pattern set in the script) and every `aw-*.js`/`aw-*.css` file that no page's saved HTML (`awansoft_raw_html`) mentions. It stops if no page references the main `aw-app_*.js`.
2. Save that list in the issue folder.
3. Re-run with `--apply`. Pages go to WordPress **Trash** (restorable); unreferenced files are deleted permanently.
4. Point removed page addresses at the real page with a 301 (the snippet does this for 404s matching the pattern). Note: inside the JS template literal in `snippet.mjs`, write `[0-9]`, not `\d` — the backslash is eaten.
5. Check: the real page loads, old addresses 301, the sitemap no longer lists them, and every script/style file on sample pages returns 200.
