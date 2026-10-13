# AI: Start Here — Deploy this Lovable project to WordPress (exact copy)

You are an AI working inside a Lovable (TanStack Start + Vite) project. Goal: publish every page to the user's WordPress site so it looks and behaves exactly like the Lovable preview.

## 1. Install the kit into the project
- Copy `spec/*`  -> `spec/lovable-to-wordpress-kit/`
- Copy `scripts/wp-exact/*` -> `scripts/wp-exact/`
- Rename `scripts/wp-exact/routes.example.json` -> `routes.json` and replace with THIS project's routes (list every file in `src/routes/`; skip dynamic `$param` routes unless you list concrete paths; leave out `id` so pages are found/created by slug).
- Add to the project's AGENTS.md: "Deploy to WordPress only through scripts/wp-exact/ (real prerendered build served by the exact-pages snippet); never hand-rebuild pages for WordPress."

## 2. Ask the user for (never store them in files, memory or commits)
1. WordPress site URL (HTTPS)
2. Administrator username
3. Application Password (wp-admin -> Users -> Profile -> Application Passwords)
4. A short prefix (e.g. `acme`) for meta keys and the snippet name

## 3. Adapt the scripts (project-specific values)
Search and replace in `scripts/wp-exact/`:
- `awansoft_` -> `<prefix>_`, "Awansoft exact pages" -> "<Prefix> exact pages"
- default `WP_URL` (`https://awansoft.riseup-asia.co`) -> the user's URL (or always pass `WP_URL` env)
- `blog-posts.mjs` and `/tpl-blog-*` are only for a WordPress-powered blog (see spec 15); skip if not needed.

## 4. Run (read spec 00 -> 14 first)
```bash
export WP_URL=https://site WP_USER=admin WP_APP_PASSWORD='xxxx xxxx xxxx xxxx xxxx xxxx'
node scripts/wp-exact/snippet.mjs                 # install serving snippet (needs Code Snippets plugin, see spec 04)
bash scripts/wp-exact/build.sh "/"                # build homepage
node scripts/wp-exact/deploy.mjs "/"              # deploy homepage -> GET USER APPROVAL
bash scripts/wp-exact/build.sh --all && node scripts/wp-exact/deploy.mjs --all
node scripts/wp-exact/cleanup.mjs                 # optional dry-run cleanup
```
Note: `build.sh` contains `/dev-server` paths (Lovable sandbox project root); change them if the project lives elsewhere.

## 5. Verify (spec 10 + 14) — never claim success without checking
Each route: response header `X-<prefix>-Exact: 1`, View Source shows full content, desktop + phone match the preview, no console errors. Tell the user to rotate the Application Password afterwards.
