# 13 — Reference Implementation (`scripts/wp-exact/`)

Working code from the Awansoft project. To reuse in another project, copy the folder and replace the `awansoft_` meta prefix, snippet name, default `WP_URL`, and `routes.json`.

| File | What it does | Run |
|---|---|---|
| `routes.json` | Route list with optional WP page `id` or `redirect` | edit by hand |
| `build.sh` | Copies project to `/tmp/wpbuild`, writes build-only vite config (base `/`, flat `aw-*` names, prerender pages), runs `vite build`, records uploads base | `bash scripts/wp-exact/build.sh --all` or `... "/" "/about"` |
| `readable-html.py` | Line breaks inside tags + NUL escaping | called by deploy.mjs |
| `snippet.mjs` | Creates/updates the serving PHP snippet through Code Snippets REST | `WP_APP_PASSWORD=... node scripts/wp-exact/snippet.mjs` |
| `deploy.mjs` | Image mapping, URL rewrite, media upload (skip/replace), page resolve/create, meta save + SHA verify, backups, `deployed.json` | `WP_APP_PASSWORD=... node scripts/wp-exact/deploy.mjs --all` or `/=1090` |

Environment variables: `WP_URL`, `WP_USER`, `WP_APP_PASSWORD` (required), `WP_UPLOAD_BASE` (optional, default current month), `DRY_RUN=1` (local output only, in `/tmp/wpbuild/wp-out`).

Outputs: `/tmp/wpbuild/dist/client` (build), `/tmp/wpbuild/wp-out` (rewritten files), `/tmp/wpbuild/backups/page-<id>-meta.json`, `/tmp/wpbuild/deployed.json`.

Requirements: Node 18+ (global `fetch`), Python 3, the project's dependencies installed.

Note: `build.sh` produces one script `aw-app_<hash>.js`; `readable-html.py` strips preload links and asserts a single module script.

## cleanup.mjs

`WP_APP_PASSWORD=... node scripts/wp-exact/cleanup.mjs [--apply]` — dry run by default. Lists and (with `--apply`) trashes duplicate pages and permanently deletes `aw-*` JS/CSS media that no page's saved HTML references. See 11-rollout-and-rollback.md → Cleanup.
