# Deploy the Dr. Arefin site to WordPress as an exact copy

## Short answer
Yes, it is possible. The uploaded kit's method fits: instead of copying blocks into Elementor, we upload the real site build to the WordPress staging site, and one small WordPress snippet serves each page exactly as it looks in Lovable. Blog list, single posts and categories can stay editable in WordPress and show in the same design.

One difference from the kit: it was written for a different kind of Lovable project. This site uses an older setup, so the "build every page" step needs adapting. This is the main technical risk, so we start with the homepage only and check it before doing the rest.

## What I need from you (please don't put it in chat files)
1. Staging site address (https)
2. WordPress admin username
3. Application Password (Users > Profile > Application Passwords). I will store it as a protected secret, never in files.
4. The "Code Snippets" plugin installed on staging
5. Confirmation that the staging site is a clone, so blog posts and categories already exist there

## Steps
1. **Save the kit into the project**: guides to `spec/lovable-to-wordpress-kit/`, scripts to `scripts/wp-exact/`, and a note in the project's `AGENTS.md` that WordPress deploys only go through these scripts.
2. **Page list**: list Dr. Arefin pages only (home, about, treatment and its sub-pages, mentorship, gallery, contact, donate, legal pages, FAQ, extra service/area pages). Leave out old CAF pages, design-test pages and internal dashboards.
3. **Adapt the build** so each page is saved as a finished HTML file with its title, description and heading readable in View Source.
4. **Check staging access**, then install the serving snippet (prefix `arefin`).
5. **Homepage first**: deploy `/` and compare it with the Lovable preview on desktop and phone. You approve before anything else goes up.
6. **All static pages**, each checked the same way.
7. **Blog**: articles list, single post and category pages filled from WordPress posts, using the same Lovable design (kit section 15). The current WPCode article shortcodes stay as a backup.
8. **Final checks**: kit checklist (section 14), a list of what passed, and how to undo instantly (turn off the snippet). Then you change the Application Password.

## Are we aligned with the spec?
Mostly yes. Conflicts to know about:
- The new method replaces our older block-by-block Elementor export rules (`Dr-Arefin-Spec/wordpress-export/`). Those files will be marked as the old approach, not deleted.
- The contact page "Other" warning would be built into the page itself, so the separate HFCM snippet won't be needed on staging.
- The theme, Elementor and the SEO plugin's output are skipped on these pages. Page titles and SEO tags come from our build.

## Technical details
- The project is React Router + Vite (client rendered), not TanStack Start. The kit's `tanstackStart.prerender` step doesn't apply. Plan: build in a temp folder (`/tmp/wpbuild`) with a separate vite config (`base:"/"`, single `aw-app_[hash].js`, `cssCodeSplit:false`, `inlineDynamicImports`), serve it locally, and use Playwright to snapshot the final rendered HTML of each route into `dist/<route>/index.html`. Then run `readable-html.py`.
- On load the browser re-renders the page over the snapshot (not true hydration). The look stays the same, but we'll check for any flash at the top of the page.
- Find where each page's title and description are set (Helmet or not) so the snapshot captures them.
- Blog: add hidden template routes with `⟦AW:…⟧` tokens. Article and category pages read `<script id="aw-wp-data">` when it exists, and use local data otherwise.
- Edit the scripts: change `awansoft_` to `arefin_` and the `/dev-server` paths, and write a project-specific routes.json. Secrets come from env (`WP_URL`, `WP_USER`, `WP_APP_PASSWORD`).
- Verify each page has the `X-Arefin-Exact: 1` header, readable View Source, no console errors, and desktop and phone screenshots that match.
