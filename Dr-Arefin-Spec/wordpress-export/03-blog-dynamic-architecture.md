# 03 — Blog / News Dynamic Architecture (WordPress)

> How the Dr. Arefin **/news/** blog index and **single post** pages are built on
> WordPress, modelled 1:1 on the proven CAF Patronato Fondi blog system found in
> `_archive/caf/public/elementor-export/blocks/blog/`.
>
> Goal: posts are authored in the WordPress CMS, but the **listing, categories,
> pagination, and cards** are rendered by a **WPCode PHP snippet** that exposes
> shortcodes pasted into Elementor HTML widgets. Styling comes from CSS only — no
> hardcoded post HTML.

---

## 1. How CAF did it (reference breakdown)

CAF's blog page is assembled from four Elementor HTML-widget blocks + one PHP snippet:

| File | Type | Role |
|------|------|------|
| `blocks/blog/01-page-hero.html` | static HTML | Atto-style hero: H1, SEO paragraphs with keyword links, CTA pill bar |
| `blocks/blog/02-categories.html` | shortcode call | `[caff_blog_categories]` — renders category pills |
| `blocks/blog/03-featured-posts.html` | shortcode call | `[caff_featured_posts count="9"]` — renders the post grid + pagination |
| `blocks/blog/04-related-services.html` | static HTML | internal-link service block + CTA |
| `blocks/blog/caff-blog-dynamic-wpcode.php` | **PHP snippet** | registers the shortcodes, builds cards from `WP_Query`, handles pagination |

### Key mechanics learned from `caff-blog-dynamic-wpcode.php`

1. **Shortcodes inside Elementor HTML widgets** are enabled with:
   ```php
   add_filter( 'elementor/widget/render_content', 'do_shortcode' );
   ```
2. **Pagination without rewrite rules** — page number is parsed straight from the
   request URI (`/blog/2/`, `/blog/page/2/`) via `$_SERVER['REQUEST_URI']`, with
   query-param fallback (`?blog-page=2`). No `.htaccess`, no custom query vars.
3. **Canonical-redirect guard** (`redirect_canonical` filter returns `false` for
   `/blog/N/`) so WordPress doesn't bounce `/blog/2/` back to `/blog/`.
4. **`parse_request` hook** maps `/blog/N/` to the blog page ID so it doesn't 404.
5. **One query, hybrid pagination**: it fetches ALL posts once (`posts_per_page => -1`),
   stamps each card with `data-caff-page="N"`, shows only the current page server-side,
   then a tiny inline `<script>` re-syncs visibility on the client (covers hosts that
   always render page-1 query context).
6. **Cards are fully server-built**: permalink, title, trimmed excerpt (`wp_trim_words`),
   date, author, category pill, featured image (`get_the_post_thumbnail`) with a
   fallback that scrapes the first `<img>` from content or uses a placeholder set.
7. **Accessibility & SEO baked in**: `aria-label`, `aria-current="page"`, `title`
   attributes, inline SVG icons, `loading="lazy"`, `decoding="async"`.

---

## 2. Dr. Arefin adaptation — naming & rules

Reuse the architecture verbatim, change only the brand prefix and theme tokens.

| CAF | Dr. Arefin |
|-----|-----------|
| prefix `caff_` / `caff-` | prefix `arefin_` / `arefin-` |
| base URL `/blog/` | base URL `/news/` |
| Italian strings | English strings |
| green Atto palette | Dr. Arefin dark theme tokens (from `global.css`) |
| `[caff_blog_categories]` | `[arefin_news_categories]` |
| `[caff_featured_posts count="9"]` | `[arefin_news_posts count="9"]` |

**Hard rules (inherit from `00-overview.md`)**: semantic HTML5, single `<h1>`,
kebab-case `arefin-` classes, **NO `!important`, NO inline styles** (the only inline
`<script>`/`style="display:none"` exceptions are the pagination toggles, exactly as
CAF does), two greens only, surface elevation (dark page → light cards), `<strong>`
inherits, hover = color/border/shadow only, inline SVG icons, relative links with
trailing slash.

---

## 3. Files to produce

```text
public/elementor-export/blocks/news/
  01-page-hero.html          # static — Atto hero (H1 + SEO copy + CTA pills)
  02-categories.html         # [arefin_news_categories]
  03-posts.html              # [arefin_news_posts count="9"]
  04-related-services.html   # static — internal links + CTA band
  arefin-news-dynamic.php    # WPCode PHP snippet (shortcodes + pagination)
public/elementor-export/news.css      # listing + single-post styles (already started as article.css)
```

Single-post styling already lives in `public/elementor-export/article.css` and targets
the real Elementor/HFE single-post DOM (`.entry-content`, `.hfe-post-card`, etc.).
The **listing** page (`/news/`) is what this PHP snippet renders.

---

## 4. PHP snippet skeleton (`arefin-news-dynamic.php`)

WPCode → Add Snippet → **PHP Snippet** → Run Everywhere → Active.

```php
<?php
if ( ! defined( 'ABSPATH' ) ) exit;

/* enable shortcodes inside Elementor HTML widgets */
add_filter( 'elementor/widget/render_content', 'do_shortcode' );

/* ---- page number from URI (/news/2/, /news/page/2/) ---- */
function arefin_news_page() {
    $uri = '/' . trim( strtok( (string) $_SERVER['REQUEST_URI'], '?' ), '/' ) . '/';
    if ( preg_match( '#/news/(?:page/)?(\d+)/?#i', $uri, $m ) ) return max(1, (int) $m[1]);
    foreach ( ['news-page','paged','page'] as $p )
        if ( isset($_GET[$p]) && (int)$_GET[$p] > 0 ) return (int) $_GET[$p];
    return 1;
}
function arefin_news_url( $n ) {
    $n = max(1,(int)$n); $base = home_url('/news/');
    return $n <= 1 ? $base : trailingslashit( $base . $n );
}

/* ---- don't redirect /news/N/ back to /news/ ---- */
add_filter( 'redirect_canonical', function( $r ) {
    $path = '/' . trim( strtok((string)$_SERVER['REQUEST_URI'],'?'), '/' ) . '/';
    return preg_match('#/news/\d+/?#i',$path) ? false : $r;
}, 10, 1 );

/* ---- /news/N/ resolves to the news page (not 404) ---- */
add_action( 'parse_request', function( $wp ) {
    if ( ! ( $wp instanceof WP ) ) return;
    if ( preg_match('#^news/(?:page/)?(\d+)$#i', trim((string)$wp->request,'/')) ) {
        $pg = get_page_by_path('news');
        if ( $pg ) $wp->query_vars = ['page_id' => $pg->ID];
    }
});

/* ---- [arefin_news_categories] ---- */
add_shortcode( 'arefin_news_categories', function() {
    $cats = get_categories(['orderby'=>'count','order'=>'DESC','hide_empty'=>false]);
    if ( ! $cats ) return '';
    $out = '<section class="arefin arefin-block arefin-news-cats"><div class="arefin-container">';
    $out .= '<div class="arefin-news-category-row">';
    foreach ( $cats as $c ) {
        if ( in_array($c->slug, ['uncategorized']) ) continue;
        $out .= '<a class="arefin-news-pill" href="'.esc_url(get_category_link($c->term_id)).'" title="'.esc_attr($c->name).'">'
              . esc_html($c->name).' <span class="arefin-news-pill-count">('.(int)$c->count.')</span></a>';
    }
    return $out . '</div></div></section>';
});

/* ---- [arefin_news_posts count="9"] ---- */
add_shortcode( 'arefin_news_posts', function( $atts ) {
    $a = shortcode_atts(['count'=>9], $atts, 'arefin_news_posts');
    $per = max(1,(int)$a['count']);
    $q = new WP_Query(['posts_per_page'=>-1,'post_status'=>'publish','orderby'=>'date','order'=>'DESC']);
    if ( ! $q->have_posts() ) { wp_reset_postdata(); return ''; }

    $total = (int) ceil( $q->post_count / $per );
    $paged = min( max(1, arefin_news_page()), max(1,$total) );
    $base  = home_url('/news/');
    $id    = wp_unique_id('arefin-news-');

    $out  = '<section id="'.esc_attr($id).'" class="arefin arefin-block arefin-news-list" '
          . 'data-base="'.esc_url($base).'" data-total="'.$total.'"><div class="arefin-container">';
    $out .= '<div class="arefin-news-grid">';

    $i = 0;
    while ( $q->have_posts() ) { $q->the_post(); $i++;
        $cardPage = (int) ceil( $i / $per );
        $hide = ( $cardPage === $paged ) ? '' : ' style="display:none"';
        $img  = has_post_thumbnail()
              ? get_the_post_thumbnail( get_the_ID(), 'large', ['class'=>'arefin-news-card-img','loading'=>'lazy','alt'=>get_the_title()] )
              : '';
        $cats = get_the_category();
        $out .= '<article class="arefin-news-card" data-page="'.$cardPage.'"'.$hide.'>';
        $out .= '<a class="arefin-news-card-thumb" href="'.esc_url(get_permalink()).'">'.$img.'</a>';
        $out .= '<div class="arefin-news-card-body">';
        if ( $cats ) $out .= '<span class="arefin-news-card-cat">'.esc_html($cats[0]->name).'</span>';
        $out .= '<h3 class="arefin-news-card-title"><a href="'.esc_url(get_permalink()).'">'.esc_html(get_the_title()).'</a></h3>';
        $out .= '<p class="arefin-news-card-meta">'.esc_html(get_the_date('F j, Y')).'</p>';
        $out .= '<p class="arefin-news-card-excerpt">'.esc_html( wp_trim_words( get_the_excerpt() ?: get_the_content(), 22, ' …' ) ).'</p>';
        $out .= '<a class="arefin-news-card-readmore" href="'.esc_url(get_permalink()).'">Read more →</a>';
        $out .= '</div></article>';
    }
    $out .= '</div>';

    /* numeric pagination — same pattern as CAF (prev / 1..N / next) */
    if ( $total > 1 ) {
        $out .= '<nav class="arefin-news-pagination" aria-label="News pages">';
        for ( $p = 1; $p <= $total; $p++ ) {
            $act = $p === $paged ? ' arefin-news-page-active' : '';
            $out .= '<a class="arefin-news-page'.$act.'" data-page-link="'.$p.'" href="'.esc_url(arefin_news_url($p)).'"'
                  . ($p===$paged?' aria-current="page"':'').'>'.$p.'</a>';
        }
        $out .= '</nav>';
    }
    $out .= '</div></section>';
    /* + inline client re-sync script — copy verbatim from CAF, swap /blog/ → /news/ */
    wp_reset_postdata();
    return $out;
});
```

> The inline client-side re-sync `<script>` (CAF lines 311–326) must be ported as-is,
> replacing `caff` → `arefin` and `/blog/` → `/news/`.

---

## 5. CSS scope

- **Listing** classes (`arefin-news-card`, `arefin-news-grid`, `arefin-news-pill`,
  `arefin-news-pagination`) styled in `news.css` (or appended to `global.css`),
  scoped `body.wp-theme-astra .arefin …`.
- **Cards on the dark page** follow the surface-elevation rule: light card
  (`hsl(0 0% 97%)`), dark text, Atto hover (3px green left-border + sharp 0-blur
  shadow + dark-green title). Identical to the related-cards block already in
  `article.css`.
- **Single post** already handled by `article.css` (Elementor/HFE native selectors).

---

## 6. Deployment checklist

1. Paste `arefin-news-dynamic.php` → WPCode **PHP Snippet**, Run Everywhere, Active.
2. Create a WordPress **page** with slug `news`, Elementor Full-Width template.
3. Add Elementor **HTML widgets** in order: hero → `[arefin_news_categories]` →
   `[arefin_news_posts count="9"]` → related-services.
4. Ensure `global.css` (tokens/header/footer) + `news.css` load on `/news/`.
5. Ensure `article.css` + `article.js` load on **Singular > Posts** (single article).
6. Permalinks: Settings → Permalinks → **Post name**; re-save to flush rules.
7. Purge WP + CDN cache; verify `/news/`, `/news/2/`, and a single post.

---

## 7. Acceptance criteria

- `/news/` lists newest-first posts in a 3-col responsive grid of Atto cards.
- Category pills link to category archives; current page highlighted.
- `/news/2/` shows page 2 (no 404, no redirect to `/news/`); prev/next + numbers work.
- Each card: featured image, category, title, date, excerpt, "Read more →".
- Single posts inherit `article.css` (dark theme, typography, related cards).
- No `!important`, no hardcoded post HTML, all post data from the CMS.
