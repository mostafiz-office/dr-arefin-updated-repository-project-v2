# /articles/ — WordPress Export

1:1 port of the React `ArticlesDark.tsx` preview into a dynamic, CMS-driven
WordPress page. Posts, categories and pagination are pulled live from WordPress.

## Files

| File | Where it goes |
|------|---------------|
| `arefin-articles-dynamic.php` | WPCode → **PHP Snippet**, Run Everywhere, Active |
| `00-head.html` | Page `<head>` (Elementor → Page Settings → Custom Code, or theme head) |
| `01-page-hero.html` | Elementor HTML widget (top of page) |
| `02-categories.html` | Elementor HTML widget — outputs `[arefin_articles_categories]` |
| `03-posts.html` | Elementor HTML widget — outputs `[arefin_articles_posts count="9"]` |
| `04-related-services.html` | Elementor HTML widget (bottom of page) |

Listing styles live in `public/elementor-export/global.css` (already loaded on
every page), so no extra stylesheet is needed.

## Deployment steps

1. Paste `arefin-articles-dynamic.php` into WPCode → PHP Snippet → **Run Everywhere** → Active.
2. Create or edit the WordPress Page with slug **`articles`**, Elementor **Full-Width / Canvas** template.
3. Add Elementor **HTML** widgets in this order:
   hero → `[arefin_articles_categories]` → `[arefin_articles_posts count="9"]` → related-services.
4. Settings → Permalinks → **Post name**, then Save (flushes rewrite rules).
5. Purge WP + CDN cache and hard-refresh `/articles/`.

## Acceptance

- `/articles/` lists newest-first posts in a 3-col responsive grid of Atto cards.
- Category pills link to category archives.
- `/articles/2/` shows page 2 (no 404, no redirect to `/articles/`); prev/next + numbers work.
- Each card: featured image, title, date + author, excerpt, "Read More →".
- Single posts inherit `article.css` / `article.js`.
- No `!important`, no hardcoded post HTML — all post data from the CMS.
