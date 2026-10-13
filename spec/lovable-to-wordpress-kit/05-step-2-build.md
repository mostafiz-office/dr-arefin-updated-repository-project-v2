# 05 — Step 2: Build (prerender every route)

## Route list
Keep a `routes.json` listing every public route:
```json
[
  { "route": "/", "id": 1090 },
  { "route": "/about-us/our-story" },
  { "route": "/services/old-offer", "redirect": "/services/new-offer" }
]
```
- `id` optional: existing WordPress page to reuse. Without it, the page is found/created by slug path.
- `redirect`: no HTML, served as 301.

## Build in a temporary copy
Copy the project to `/tmp/wpbuild` (excluding node_modules/.git/dist), symlink node_modules, and write a build-only `vite.config.ts` (never change the project's real config):
- `base: "/"` — **must stay root**. A non-root base makes TanStack Router treat it as the site path and the browser jumps to `/wp-content/uploads/...`.
- `assetsDir: ""`, `sourcemap: false`.
- Rollup names: `aw-<flatname>_[hash].js|css|ext`, where flatname replaces every non `[A-Za-z0-9-]` with `-`. Put the hash after `_` (WordPress collapses `--`, and hashes can start with `-`).
- `tanstackStart.prerender: { enabled: true, crawlLinks: false, autoStaticPathsDiscovery: false }` and `pages: [{ path: "/" }, ...]` from routes.json.

Output: `dist/client/<route>/index.html` plus `aw-*` files. Record the target uploads folder (`/wp-content/uploads/YYYY/MM/`, the month WordPress will place uploads in) for step 4.

## Check
Every listed route has an `index.html`, containing its `<title>`, meta description and one `<h1>`.

## One script file per page (WordPress convention)
The WordPress build (not the preview) disables code-splitting so every page loads a single `aw-app_<hash>.js` placed just before `</body>`:
- `build.cssCodeSplit: false`, `build.modulePreload: false`
- `rollupOptions.output.inlineDynamicImports: true`, `entryFileNames: "aw-app_[hash].js"`
Without this, View Source shows ~30 `modulepreload` links (one per route/component chunk). Trade-off: the single file is larger (Awansoft: 1.8 MB, ~518 KB gzipped) but is downloaded once and cached for every page.
