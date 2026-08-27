# Category Archive Page Design (WordPress)

## What is happening now

`https://drarefin.com/category/research/` is still rendering the Astra theme's default archive template. Nothing on the site's design system is applied there, so the band is grey, post titles are invisible on dark, and there are no cards. This is expected: every custom page on this site is drawn by a WPCode PHP snippet, and no snippet targets category archives yet.

Two snippets exist today:

- `arefin-articles-dynamic.php` — the `/articles/` listing: category pills, 3-column card grid, JS pagination. Runs through shortcodes placed in Elementor.
- `arefin-single-post.php` — the single article page. Runs automatically: it hooks `wp` and checks `is_singular('post')`, then filters `the_content` to inject hero + 2-column layout + sidebar + related posts.

The single-post snippet is the right model for the category page, because a category archive is not an Elementor page — you cannot drop a shortcode into it. It has to be taken over from PHP.

## How the category page gets selected

The exact same mechanism the single-post snippet uses, just a different conditional tag:

```text
single post   ->  add_action('wp', ...) + is_singular('post')
category page ->  add_action('wp', ...) + is_category()
```

`is_category()` is true only on `/category/<slug>/` URLs (and their `/page/2/` variants), so the design cannot leak into any other page. The snippet then takes over the whole archive template instead of filtering content, since archives have no `the_content` to hook.

## What will be built

A new PHP snippet, `arefin-category-archive.php`, deployed in WPCode as a PHP Snippet, Run Everywhere, Active. It will:

1. Detect `is_category()` (optionally also tag/author/search archives — see Open question).
2. Take over the archive output via `template_include`, pointing at a small inline template rendered by the snippet, so the Astra archive markup never prints.
3. Render, in this order, matching the Articles page and single-post visual language:
   - Hero band: breadcrumb (Home > Articles > Category name), `<h1>` with the category name, post count, and the category description if one is set in WP.
   - Category pill row — reuses the existing `[arefin_news_categories]` renderer so the pills, counts and active state match `/articles/` exactly; the current category is marked active.
   - Post grid — the same `.articles-grid` / `.article-card` markup as the Articles page (thumb, title, date + author meta, excerpt, read-more), so all existing card CSS applies with zero new styling.
   - Pagination — server-side `paginate_links()` styled to look like the Articles pager, with proper `/category/<slug>/page/2/` URLs (WordPress handles these natively; no URI hacks needed here, unlike `/articles/`).
   - Empty state when a category has no posts.
4. Add a `arefin-category-archive` body class so CSS can scope safely.
5. Reuse the canonical-host helpers so no `update.drarefin.com` URLs leak.

## CSS

Almost everything is already covered: `.arefin-container`, `.news-category-pill`, `.articles-grid`, `.article-card*` all live in `global.css`. Only a small block of new CSS is needed:

- `.arefin-cat-hero` (dark band, breadcrumb, title, description, count)
- `.news-category-pill.is-active` state
- `.arefin-cat-pagination` numbers

This will be appended to the export CSS and printed as a PHP fallback from the snippet itself (same trick `arefin_sp_v26_print_fallback_css` uses), so the page is correct even if the CSS snippet is not loaded on archives. No `!important`, kebab-case, tokens from `global.css`.

## Where things get pasted

| File | Where it goes in WordPress |
| --- | --- |
| `arefin-category-archive.php` | WPCode > Add Snippet > PHP Snippet > Run Everywhere > Active |
| new CSS block | appended to the existing global CSS snippet (Site Wide Header), or left to the PHP fallback |

Then purge cache and reload `/category/research/`.

## Files in this project

- New: `public/elementor-export/blocks/category/arefin-category-archive.php`
- New: `public/elementor-export/blocks/category/category.css` (the small new block)
- Updated: `public/elementor-export/global.css` (append the same new block so the React/export preview matches)
- Updated: `public/elementor-export/DEPLOYMENT.md` (deployment row for the new snippet)

No React page is required for this, but if you want a live preview to review before pasting into WordPress, a `CategoryArchiveDark.tsx` page can be added the same way `ArticlesDark.tsx` mirrors the articles snippet.

## Open questions

1. Should tag archives (`/tag/...`), author archives and search results get the same treatment in the same snippet, or category only for now?
2. Do you want the React preview page as well, or PHP + CSS only?
