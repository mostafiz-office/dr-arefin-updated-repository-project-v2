# Issue 11 — Single Post Breaks Because WPCode Runs Stale PHP and Missing CSS

- **Status**: Resolved in export files; pending live WPCode replacement/cache purge
- **Severity**: High
- **Date opened**: 2026-06-04
- **Date resolved**: 2026-06-04

## Symptom

Live single blog posts such as:

- `https://update.drarefin.com/https-drarefin-com-laparoscopic-surgery-dhaka-benefits-recovery-expectations/`

still look broken after updating PHP. The sidebar appears in the HTML, but the page does not match the React preview.

## Current live evidence

The live HTML check showed:

- `arefin-sp-layout` exists
- `arefin-sp-sidebar` exists
- `Book a Consultation` exists
- `arefin-sp-hero` is missing
- `arefin-sp-content-section` is missing
- `single-post.css` markers are missing

This means the site is not running the latest single-post export. It is running an older PHP snippet that only wraps content/sidebar, while the latest hero/content-section version and CSS snippet are not active on the live page.

## Root cause

Two problems were happening at the same time:

1. **Stale WPCode PHP snippet** — the live site still had an older single-post PHP snippet active. That old snippet injects `.arefin-sp-layout` and `.arefin-sp-sidebar`, but not the React-style hero or `.arefin-sp-content-section` wrapper.
2. **CSS snippet not loaded** — the live page source did not contain the `single-post.css` marker or selectors, so even injected layout markup rendered with Astra/default styling.

Because `.arefin-sp-layout` already existed in the content, the newer PHP guard returned early and did not add the missing hero/content-section when an old snippet had already modified the content.

## Fix

Updated `public/elementor-export/blocks/single-post/arefin-single-post.php` to **AREFIN-SINGLE-POST v2.3.0**:

- Uses v23-prefixed function names so it can coexist with stale older WPCode snippets without fatal function redeclaration.
- Adds a clear source marker: `<!-- AREFIN-SINGLE-POST v2.3.0 active -->`.
- Detects old partial output where `.arefin-sp-layout` exists but `.arefin-sp-hero` / `.arefin-sp-content-section` are missing.
- Repairs that partial output by prepending the hero and wrapping the old layout in `.arefin-sp-content-section`.
- Removes duplicate leading post `<h1>` when the title is now shown in the hero.
- Prints emergency fallback CSS from PHP via `wp_head` with marker `id="arefin-single-post-v23-fallback"`, so the post does not render raw if the separate CSS snippet is missing.

Updated `public/elementor-export/blocks/single-post/single-post.css`:

- Versioned to v2.3.0.
- Hides Astra `.entry-header` more reliably.
- Adds fallback spacing for older live markup where `.entry-content > .arefin-sp-layout` exists without `.arefin-sp-content-section`.

Updated `public/elementor-export/blocks/single-post/README.md`:

- Added v2.3.0 deployment steps.
- Added live source markers that must be present after deployment.

## Required live deployment

In WPCode:

1. Disable/delete every older `AREFIN-SINGLE-POST` PHP snippet.
2. Add the full latest `arefin-single-post.php` as a PHP Snippet.
3. Set Auto Insert to Run Everywhere, priority 10, Active.
4. Add the full latest `single-post.css` as an HTML Snippet in the Header for Singular → Posts.
5. Purge WordPress/CDN cache and hard refresh.

## Acceptance checks

Page source must contain:

- `<!-- AREFIN-SINGLE-POST v2.3.0 active -->`
- `id="arefin-single-post-v23-fallback"`
- `arefin-sp-hero`
- `arefin-sp-content-section`
- `arefin-sp-layout`
- `arefin-sp-sidebar`

If only `arefin-sp-layout` / `arefin-sp-sidebar` appear, the old PHP snippet is still running.

If PHP markers appear but the page is unstyled, the CSS HTML snippet is missing; the PHP fallback should still prevent total breakage.

## Prevention rule

Every WordPress export PHP snippet must include a unique version marker in the HTML output. When changing layout structure, the new snippet must repair or bypass old partial markup instead of returning early only because one old class exists.