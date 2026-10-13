# Lovable Preview to WordPress — Exact-Copy Kit

A step-by-step method any human or AI can follow to publish a Lovable (TanStack Start + Vite + React) app on an existing WordPress site so that every page looks and behaves **exactly** like the Lovable preview, with full readable HTML in View Source for SEO.

Proven on a 56-route marketing site: 56/56 routes matched the preview on desktop and phone.

## The idea in one paragraph
Do not rebuild pages in WordPress. Build the real app, prerender every route to a complete HTML file, upload the JS/CSS/images to the WordPress media library, store each page's full HTML in a custom field (post meta) of its WordPress page, and install one small PHP snippet that prints that stored HTML directly — skipping the theme, page builder and SEO plugin output. React then hydrates on top, so menus, animations and links work exactly like the preview.

## What you need from the site owner
| Input | Example placeholder |
|---|---|
| WordPress site URL (HTTPS) | `{{WP_URL}}` |
| Admin username | `{{WP_USER}}` |
| Application Password (Users → Profile → Application Passwords) | `{{WP_APP_PASSWORD}}` |
| Short prefix for meta keys/snippet name | `{{PREFIX}}` (e.g. `acme`) |

## Read in order
| # | File | Purpose |
|---|---|---|
| 01 | why-exact-copy | Why rebuilding fails, why serving the real build works |
| 02 | inputs-and-safety | Credentials handling, permissions |
| 03 | architecture | Diagram of the whole pipeline |
| 04 | step-1-preflight | Check REST access, install Code Snippets |
| 05 | step-2-build | Prerender every route |
| 06 | step-3-readable-html | Make View Source readable and SEO-complete |
| 07 | step-4-assets | Upload JS/CSS/images safely |
| 08 | step-5-pages | Map routes to WordPress pages, store HTML |
| 09 | step-6-snippet | The PHP snippet that serves pages |
| 10 | step-7-verify | Prove it is exact |
| 11 | rollout-and-rollback | Homepage first, approvals, instant undo |
| 12 | pitfalls | Every bug we hit and the fix |
| 13 | scripts-reference | Reference implementation (`scripts/wp-exact/`) |
| 14 | acceptance-checklist | Tick list before calling it done |

## Quick start (reference scripts)
```bash
export WP_URL={{WP_URL}} WP_USER={{WP_USER}} WP_APP_PASSWORD='{{WP_APP_PASSWORD}}'
node scripts/wp-exact/snippet.mjs              # once: install the serving snippet
bash scripts/wp-exact/build.sh --all           # prerender every route in routes.json
DRY_RUN=1 node scripts/wp-exact/deploy.mjs --all   # optional local check
node scripts/wp-exact/deploy.mjs /             # homepage first, get approval
node scripts/wp-exact/deploy.mjs --all         # then everything
```
Never commit the password. Rotate it when finished.
- [15 — Dynamic pages](15-dynamic-pages.md): WordPress posts rendered in the exact Lovable design
