<?php
/**
 * AREFIN-CATEGORY-ARCHIVE v1.4.6 — Category Archive Layout (WPCode PHP Snippet)
 * ───────────────────────────────────────────────────────────────────────
 * Deploy via WPCode:
 *   - Snippet type : PHP Snippet
 *   - Location     : Run Everywhere (Auto Insert)
 *   - Priority     : 10
 *   - Status       : Active
 *
 * Targets ONLY category archives: /category/<slug>/ and /category/<slug>/page/N/
 * Selection happens through the WordPress conditional tag `is_category()`,
 * exactly the way arefin-single-post.php uses `is_singular('post')`.
 *
 * It renders:
 *   1. Dark hero band  — breadcrumb, H1 category name, post count, description
 *   2. Two-column body — article grid (left) + sticky category rail (right)
 *   3. Card grid       — same .articles-grid / .article-card markup as /articles/
 *   4. Pagination      — native WP paging, styled like the /articles/ pager
 *   5. Empty state
 *
 * A category archive has no `the_content` to filter, so the whole archive
 * template is taken over on `template_redirect` (Astra's archive markup never
 * prints). Header and footer still come from the theme / Elementor.
 *
 * New CSS lives in category.css and is also printed as a PHP fallback, so the
 * page is correct even when the global CSS snippet is not loaded on archives.
 * No !important. Kebab-case classes. Tokens come from global.css.
 * ─────────────────────────────────────────────────────────────────────── */

if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! defined( 'AREFIN_CAT_ARTICLES_SLUG' ) ) {
	define( 'AREFIN_CAT_ARTICLES_SLUG', 'articles' );
}

/* =========================================================
   0. CANONICAL HOST HELPERS (v10-prefixed, collision-safe)
   ========================================================= */
function arefin_cat_v10_canonical_host() {
	return defined( 'AREFIN_CANONICAL_HOST' ) ? rtrim( AREFIN_CANONICAL_HOST, '/' ) : rtrim( home_url(), '/' );
}

function arefin_cat_v10_canon_text( $value ) {
	if ( function_exists( 'arefin_articles_v13_canon_text' ) ) {
		return arefin_articles_v13_canon_text( $value );
	}

	$canon  = arefin_cat_v10_canonical_host();
	$home   = rtrim( home_url(), '/' );
	$legacy = array_unique( array_filter( array(
		$home,
		'https://drarefin.com',
		'http://drarefin.com',
		'//drarefin.com',
	) ) );

	$value = (string) $value;
	foreach ( $legacy as $host ) {
		if ( $host && $host !== $canon ) {
			$value = str_replace( $host, $canon, $value );
		}
	}
	return $value;
}

/* =========================================================
   1. TARGETING — category archives only
   ========================================================= */
function arefin_cat_v10_is_target() {
	if ( is_admin() || wp_doing_ajax() ) return false;
	if ( ! function_exists( 'is_category' ) ) return false;
	return (bool) is_category();
}

add_filter( 'body_class', function ( $classes ) {
	if ( arefin_cat_v10_is_target() ) {
		$classes[] = 'arefin-category-archive';
	}
	return $classes;
} );

add_action( 'wp_head', function () {
	if ( arefin_cat_v10_is_target() ) {
		arefin_cat_v10_print_fallback_css();
	}
}, 120 );

/* =========================================================
   2. TAKE OVER THE ARCHIVE TEMPLATE
   ========================================================= */
/* Astra prints its own archive banner (a second H1 with the category name).
   Disable it through the theme filters when available. */
add_filter( 'astra_get_option_archive-post-banner-layout', function ( $value ) {
	return arefin_cat_v10_is_target() ? 'layout-1' : $value;
} );
add_filter( 'astra_apply_dynamic_banner_layout', function ( $apply ) {
	return arefin_cat_v10_is_target() ? false : $apply;
} );

/* Remove any banner markup that still slipped into the theme header. */
function arefin_cat_v10_strip_theme_banner( $html ) {
	$html = preg_replace( '#<section[^>]*class="[^"]*ast-archive-entry-banner[^"]*"[^>]*>.*?</section>#is', '', $html );
	$html = preg_replace( '#<section[^>]*class="[^"]*ast-archive-description[^"]*"[^>]*>.*?</section>#is', '', $html );
	return (string) $html;
}

add_action( 'template_redirect', function () {
	if ( ! arefin_cat_v10_is_target() ) return;

	ob_start();
	get_header();
	$header = arefin_cat_v10_strip_theme_banner( (string) ob_get_clean() );

	ob_start();
	get_footer();
	$footer = (string) ob_get_clean();

	echo arefin_cat_v10_canon_text( $header . arefin_cat_v10_render_archive() . $footer ); // phpcs:ignore WordPress.Security.EscapeOutput

	/* Let cache / analytics plugins on `shutdown` still run before we stop. */
	if ( function_exists( 'do_action' ) ) {
		do_action( 'shutdown' );
		remove_all_actions( 'shutdown' );
	}
	exit;
}, 1 );

/* =========================================================
   3. RENDERERS
   ========================================================= */
function arefin_cat_v10_render_archive() {
	$term = get_queried_object();
	if ( ! $term || empty( $term->term_id ) ) return '';

	return arefin_cat_v10_hero_markup( $term )
		. arefin_cat_v10_grid_markup( $term );
}

/* ── 3.1 Hero band ── */
function arefin_cat_v10_hero_markup( $term ) {
	$name        = $term->name;
	$count       = (int) $term->count;
	$description = trim( wp_strip_all_tags( term_description( $term->term_id, 'category' ) ) );
	$articles    = home_url( '/' . AREFIN_CAT_ARTICLES_SLUG . '/' );

	ob_start();
	?>
	<section class="arefin arefin-cat-hero" aria-label="Category header">
		<div class="arefin-container">
			<nav class="arefin-cat-breadcrumb" aria-label="Breadcrumb">
				<ol>
					<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="Home">Home</a></li>
					<li aria-hidden="true">›</li>
					<li><a href="<?php echo esc_url( $articles ); ?>" title="Articles">Articles</a></li>
					<li aria-hidden="true">›</li>
					<li><span aria-current="page"><?php echo esc_html( $name ); ?></span></li>
				</ol>
			</nav>
			<p class="arefin-cat-eyebrow">Category</p>
			<h1 class="arefin-cat-title"><?php echo esc_html( $name ); ?></h1>
			<p class="arefin-cat-count"><?php echo esc_html( $count . ' ' . _n( 'article', 'articles', $count, 'arefin' ) ); ?></p>
			<?php if ( $description ) : ?>
				<p class="arefin-cat-desc"><?php echo esc_html( $description ); ?></p>
			<?php endif; ?>
		</div>
	</section>
	<?php
	return (string) ob_get_clean();
}

/* ── 3.2 Category rail (sticky right column on desktop, strip on mobile) ── */
function arefin_cat_v10_rail_markup( $term ) {
	$categories = get_categories( array(
		'orderby'    => 'count',
		'order'      => 'DESC',
		'hide_empty' => false,
	) );

	if ( empty( $categories ) ) return '';

	$out  = '<aside class="arefin-cat-rail-wrap" aria-label="Article categories">';
	$out .= '<nav class="arefin-cat-rail">';
	$out .= '<p class="arefin-cat-rail-title">Categories</p>';
	$out .= '<div class="arefin-cat-rail-scroll" tabindex="0" aria-label="Scroll through categories">';
	$out .= '<ul class="arefin-cat-rail-list">';

	// Active category first, then "All Articles", then the rest (count order).
	$active  = null;
	$rest    = array();
	foreach ( $categories as $cat ) {
		if ( $cat->slug === 'uncategorized' ) continue;
		if ( (int) $cat->term_id === (int) $term->term_id ) {
			$active = $cat;
		} else {
			$rest[] = $cat;
		}
	}

	$render_item = function ( $cat, $is_active ) {
		$classes = 'arefin-cat-rail-item' . ( $is_active ? ' is-active' : '' );
		$li  = '<li><a href="' . esc_url( get_category_link( $cat->term_id ) ) . '" class="' . esc_attr( $classes ) . '" title="' . esc_attr( 'Articles in the ' . $cat->name . ' category' ) . '"' . ( $is_active ? ' aria-current="page"' : '' ) . '>';
		$li .= '<span>' . esc_html( $cat->name ) . '</span>';
		$li .= '<span class="arefin-cat-rail-count">' . (int) $cat->count . '</span>';
		$li .= '</a></li>';
		return $li;
	};

	if ( $active ) {
		$out .= $render_item( $active, true );
	}

	$out .= '<li><a href="' . esc_url( home_url( '/' . AREFIN_CAT_ARTICLES_SLUG . '/' ) ) . '" class="arefin-cat-rail-item" title="All articles"><span>All Articles</span></a></li>';

	foreach ( $rest as $cat ) {
		$out .= $render_item( $cat, false );
	}

	$out .= '</ul></div></nav></aside>';
	return $out;
}

/* ── 3.3 Post grid + pagination ── */
function arefin_cat_v10_grid_markup( $term ) {
	global $wp_query;

	$rail = arefin_cat_v10_rail_markup( $term );

	if ( ! have_posts() ) {
		return '<section class="arefin articles-light-band arefin-section-divider" aria-label="Articles">'
			. '<div class="arefin-container"><div class="arefin-cat-layout">'
			. '<div class="arefin-cat-main"><div class="articles-empty">'
			. '<p>No articles in this category yet. Please check back soon.</p>'
			. '<p><a class="article-card-readmore" href="' . esc_url( home_url( '/' . AREFIN_CAT_ARTICLES_SLUG . '/' ) ) . '">Browse all articles</a></p>'
			. '</div></div>' . $rail . '</div></div></section>';
	}

	$out  = '<section class="arefin articles-light-band arefin-section-divider" aria-label="Articles">';
	$out .= '<div class="arefin-container"><div class="arefin-cat-layout">';
	$out .= '<div class="arefin-cat-main"><div class="articles-grid">';

	while ( have_posts() ) {
		the_post();

		$permalink = get_permalink();
		$title     = get_the_title();
		$excerpt   = wp_trim_words( get_the_excerpt() ?: get_the_content(), 28, ' […]' );
		$date      = get_the_date( 'F j, Y' );
		$iso       = get_the_date( 'Y-m-d' );
		$author    = get_the_author();

		$out .= '<article class="article-card" title="' . esc_attr( $title ) . '">';

		$out .= '<div class="article-card-thumb"><a href="' . esc_url( $permalink ) . '">';
		if ( has_post_thumbnail() ) {
			$out .= get_the_post_thumbnail( get_the_ID(), 'large', array(
				'alt'      => $title,
				'loading'  => 'lazy',
				'decoding' => 'async',
				'class'    => 'article-card-img',
			) );
		} else {
			$out .= '<img src="' . esc_url( get_template_directory_uri() . '/screenshot.png' ) . '" alt="' . esc_attr( $title ) . '" loading="lazy" decoding="async" class="article-card-img" />';
		}
		$out .= '</a></div>';

		$out .= '<div class="article-card-body">';
		$out .= '<h2 class="article-card-title"><a href="' . esc_url( $permalink ) . '">' . esc_html( $title ) . '</a></h2>';
		$out .= '<ul class="article-card-meta text-fluid-meta">';
		$out .= '<li><time datetime="' . esc_attr( $iso ) . '">' . esc_html( $date ) . '</time></li>';
		$out .= '<li>' . esc_html( $author ) . '</li>';
		$out .= '</ul>';
		$out .= '<p class="article-card-excerpt">' . esc_html( $excerpt ) . '</p>';
		$out .= '<a href="' . esc_url( $permalink ) . '" class="article-card-readmore">Read More <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>';
		$out .= '</div>';

		$out .= '</article>';
	}

	$out .= '</div>';
	$out .= arefin_cat_v10_pagination_markup();
	$out .= '</div>' . $rail . '</div></div></section>';

	wp_reset_postdata();
	return $out;
}

function arefin_cat_v10_pagination_markup() {
	global $wp_query;

	$total = (int) $wp_query->max_num_pages;
	if ( $total < 2 ) return '';

	$paged = max( 1, (int) get_query_var( 'paged' ) );
	$paged = min( $paged, $total );

	$prev_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';
	$next_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';

	$page_url = function ( $n ) {
		return arefin_cat_v10_canon_text( get_pagenum_link( max( 1, (int) $n ) ) );
	};

	$out = '<nav class="articles-pagination arefin-cat-pagination" aria-label="Pagination">';

	$prev_class = 'articles-page-btn' . ( $paged <= 1 ? ' is-disabled' : '' );
	$out .= '<a href="' . esc_url( $page_url( $paged - 1 ) ) . '" class="' . $prev_class . '" aria-label="Previous page" title="Previous page">' . $prev_icon . '<span>Previous</span></a>';

	$out .= '<div class="articles-page-numbers">';

	$window = 2;
	$last_printed = 0;
	for ( $i = 1; $i <= $total; $i++ ) {
		$in_window = ( $i === 1 || $i === $total || abs( $i - $paged ) <= $window );
		if ( ! $in_window ) continue;

		if ( $last_printed && $i - $last_printed > 1 ) {
			$out .= '<span class="articles-page-num is-dots" aria-hidden="true">&hellip;</span>';
		}

		$active = ( $i === $paged );
		$out   .= '<a href="' . esc_url( $page_url( $i ) ) . '" class="articles-page-num' . ( $active ? ' active' : '' ) . '"'
			. ( $active ? ' aria-current="page"' : '' ) . ' title="Page ' . (int) $i . '">' . (int) $i . '</a>';

		$last_printed = $i;
	}

	$out .= '</div>';

	$next_class = 'articles-page-btn' . ( $paged >= $total ? ' is-disabled' : '' );
	$out .= '<a href="' . esc_url( $page_url( $paged + 1 ) ) . '" class="' . $next_class . '" aria-label="Next page" title="Next page">' . '<span>Next</span>' . $next_icon . '</a>';

	$out .= '</nav>';
	return $out;
}

/* =========================================================
   4. FALLBACK CSS (mirror of category.css)
   ========================================================= */
function arefin_cat_v10_print_fallback_css() {
	?>
<style id="arefin-category-archive-fallback">
/* arefin-cat v1.4.6 */
/* ════════════════════════════════════════════════════════════════
   CATEGORY ARCHIVE (/category/<slug>/) — arefin-category-archive.php
   ════════════════════════════════════════════════════════════════ */

/* --- Astra shell neutralisation (scoped to category archives only) ---
   Astra's get_header() opens #content > .ast-container, which is a flex row
   with a max-width meant for #primary + #secondary. Our full-bleed sections
   must not become flex children of it. */
body.arefin-category-archive #content,
body.arefin-category-archive #content.site-content { padding: 0; margin: 0; }
body.arefin-category-archive #content > .ast-container {
  display: block; max-width: none; width: 100%; margin: 0; padding: 0;
}
body.arefin-category-archive #primary,
body.arefin-category-archive .content-area {
  width: 100%; max-width: none; margin: 0; padding: 0; float: none;
}
body.arefin-category-archive #secondary,
body.arefin-category-archive .ast-archive-entry-banner,
body.arefin-category-archive .ast-archive-description,
body.arefin-category-archive .ast-single-post-order { display: none; }
body.arefin-category-archive #content > .ast-container > .arefin { display: block; width: 100%; }

/* --- Hero band --- */
body.arefin-category-archive .arefin-cat-hero {
  background: hsl(var(--background, 220 20% 6%));
  color: hsl(var(--foreground, 0 0% 98%));
  padding: 3.5rem 0 2.25rem;
}
@media (min-width: 768px) { body.arefin-category-archive .arefin-cat-hero { padding: 5rem 0 2.5rem; } }
body.arefin-category-archive .arefin-cat-breadcrumb ol {
  display: flex; flex-wrap: wrap; align-items: center; gap: 8px;
  list-style: none; margin: 0 0 18px; padding: 0;
  font-family: 'Poppins', system-ui, sans-serif; font-size: 0.8rem;
  color: hsl(var(--muted-foreground, 0 0% 65%));
}
body.arefin-category-archive .arefin-cat-breadcrumb a { color: hsl(var(--muted-foreground, 0 0% 65%)); text-decoration: none; }
body.arefin-category-archive .arefin-cat-breadcrumb a:hover { color: hsl(var(--primary-bright, 131 87% 41%)); }
body.arefin-category-archive .arefin-cat-breadcrumb span[aria-current] { color: hsl(var(--foreground, 0 0% 98%)); }
body.arefin-category-archive .arefin-cat-eyebrow {
  margin: 0 0 6px; font-family: 'Poppins', system-ui, sans-serif;
  font-size: 0.78rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
  color: hsl(var(--primary-bright, 131 87% 41%));
}
body.arefin-category-archive .arefin-cat-title {
  margin: 0 0 10px; font-size: var(--fs-h1, clamp(2rem, 4vw, 3rem));
  line-height: 1.12; color: hsl(var(--foreground, 0 0% 98%));
}
body.arefin-category-archive .arefin-cat-count {
  margin: 0; font-family: 'Poppins', system-ui, sans-serif; font-size: 0.9rem;
  color: hsl(var(--muted-foreground, 0 0% 65%));
}
body.arefin-category-archive .arefin-cat-desc {
  margin: 14px 0 0; max-width: 68ch; font-size: 1rem; line-height: 1.7;
  color: hsl(var(--muted-foreground, 0 0% 72%));
}

/* --- Pills (kept for any pill row still rendered; active hover fix) --- */
body.arefin-category-archive .arefin-cat-pills-band { padding-top: 0.5rem; }
body.arefin-category-archive .news-category-pill.is-active {
  border-color: hsl(var(--primary-bright, 131 87% 41%));
  background: hsl(var(--primary-bright, 131 87% 41%));
  color: hsl(0 0% 100%);
}
body.arefin-category-archive .news-category-pill.is-active .news-category-count { color: hsl(0 0% 100% / 0.85); }
/* Generic pill :hover turns text green — on the green active pill that made the
   label invisible. Active pill keeps white text and only darkens. */
body.arefin-category-archive .news-category-pill.is-active:hover,
body.arefin-category-archive .news-category-pill.is-active:focus-visible {
  border-color: hsl(var(--primary-darker, 131 87% 30%));
  background: hsl(var(--primary-darker, 131 87% 30%));
  color: hsl(0 0% 100%);
}
body.arefin-category-archive .news-category-pill.is-active:hover .news-category-count,
body.arefin-category-archive .news-category-pill.is-active:focus-visible .news-category-count { color: hsl(0 0% 100% / 0.85); }

/* --- Two-column layout: articles + sticky category rail --- */
body.arefin-category-archive .arefin-cat-layout {
  display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: start;
}
@media (min-width: 1024px) {
  body.arefin-category-archive .arefin-cat-layout { grid-template-columns: minmax(0, 1fr) 300px; gap: 40px; }
}
body.arefin-category-archive .arefin-cat-main { min-width: 0; }
body.arefin-category-archive .arefin-cat-main .articles-grid {
  grid-template-columns: 1fr;
}
@media (min-width: 768px) {
  body.arefin-category-archive .arefin-cat-main .articles-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
body.arefin-category-archive .articles-light-band { padding-bottom: 4rem; }
@media (min-width: 1024px) {
  body.arefin-category-archive .articles-light-band { padding-bottom: 5.5rem; }
}

/* Rail: below 1024px it sits above the grid as a horizontal strip */
body.arefin-category-archive .arefin-cat-rail-wrap { order: -1; min-width: 0; }
@media (min-width: 1024px) { body.arefin-category-archive .arefin-cat-rail-wrap { order: 0; } }

body.arefin-category-archive .arefin-cat-rail {
  border: 1px solid hsl(0 0% 8% / 0.12);
  border-radius: 16px;
  background: hsl(0 0% 100% / 0.65);
  padding: 16px 14px 20px;
}
@media (min-width: 1024px) {
  body.arefin-category-archive .arefin-cat-rail {
    position: sticky; top: 110px;
    max-height: calc(100vh - 150px);
    overflow-y: auto; overscroll-behavior: contain;
    scrollbar-width: thin;
  }
  body.arefin-category-archive .arefin-cat-rail::-webkit-scrollbar { width: 6px; }
  body.arefin-category-archive .arefin-cat-rail::-webkit-scrollbar-thumb {
    background: hsl(0 0% 8% / 0.18); border-radius: 999px;
  }
}
body.arefin-category-archive .arefin-cat-rail-title {
  margin: 0 0 12px; padding: 0 6px;
  font-family: 'Poppins', system-ui, sans-serif;
  font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
  color: hsl(0 0% 8% / 0.55);
}
body.arefin-category-archive .arefin-cat-rail-list {
  list-style: none; margin: 0; padding: 0;
  display: flex; gap: 8px;
}
body.arefin-category-archive .arefin-cat-rail-scroll {
  min-width: 0; overflow-x: auto; overscroll-behavior-x: contain; scrollbar-width: none;
}
body.arefin-category-archive .arefin-cat-rail-scroll::-webkit-scrollbar { display: none; }
/* v1.4.6 — the list is an intrinsic-width track inside a separate scroll viewport.
   Its children therefore never share or shrink into the viewport width. */
body.arefin-category-archive .arefin-cat-rail-list { width: max-content; min-width: 100%; }
body.arefin-category-archive .arefin-cat-rail-list > li { display: block; flex: none; width: max-content; }
@media (min-width: 1024px) {
  body.arefin-category-archive .arefin-cat-rail-scroll { overflow: visible; }
  body.arefin-category-archive .arefin-cat-rail-list { display: block; width: 100%; min-width: 0; }
  body.arefin-category-archive .arefin-cat-rail-list > li { width: 100%; }
}
body.arefin-category-archive .arefin-cat-rail-item {
  display: inline-flex; align-items: center; justify-content: space-between; gap: 10px;
  white-space: nowrap; padding: 9px 14px; border-radius: 9999px;
  border: 1px solid hsl(0 0% 8% / 0.14); background: hsl(0 0% 100%);
  font-family: 'Poppins', system-ui, sans-serif; font-size: 0.85rem; font-weight: 500;
  color: hsl(0 0% 12%); text-decoration: none;
  transition: border-color 220ms ease, color 220ms ease, background-color 220ms ease;
}
@media (min-width: 1024px) {
  body.arefin-category-archive .arefin-cat-rail-list > li + li { margin-top: 4px; }
  body.arefin-category-archive .arefin-cat-rail-item {
    display: flex; width: 100%; white-space: normal;
    border: 1px solid transparent; background: transparent;
    border-radius: 10px; padding: 9px 10px; line-height: 1.35;
  }
}
body.arefin-category-archive .arefin-cat-rail-item:hover,
body.arefin-category-archive .arefin-cat-rail-item:focus-visible {
  border-color: hsl(var(--primary-bright, 131 87% 41%));
  color: hsl(var(--primary-darker, 131 87% 30%));
  background: hsl(var(--primary-bright, 131 87% 41%) / 0.08);
}
body.arefin-category-archive .arefin-cat-rail-count {
  flex-shrink: 0; font-size: 0.78rem; color: hsl(0 0% 8% / 0.5); font-variant-numeric: tabular-nums;
}
body.arefin-category-archive .arefin-cat-rail-item:hover .arefin-cat-rail-count,
body.arefin-category-archive .arefin-cat-rail-item:focus-visible .arefin-cat-rail-count {
  color: hsl(var(--primary-darker, 131 87% 30%));
}
body.arefin-category-archive .arefin-cat-rail-item.is-active,
body.arefin-category-archive .arefin-cat-rail-item.is-active:hover,
body.arefin-category-archive .arefin-cat-rail-item.is-active:focus-visible {
  background: hsl(var(--primary-bright, 131 87% 41%));
  border-color: hsl(var(--primary-bright, 131 87% 41%));
  color: hsl(0 0% 100%);
}
body.arefin-category-archive .arefin-cat-rail-item.is-active:hover,
body.arefin-category-archive .arefin-cat-rail-item.is-active:focus-visible {
  background: hsl(var(--primary-darker, 131 87% 30%));
  border-color: hsl(var(--primary-darker, 131 87% 30%));
}
body.arefin-category-archive .arefin-cat-rail-item.is-active .arefin-cat-rail-count { color: hsl(0 0% 100% / 0.85); }

/* --- Empty state + pagination --- */
body.arefin-category-archive .articles-empty { text-align: center; padding: 2rem 0 0; }
body.arefin-category-archive .arefin-cat-pagination .articles-page-num.is-dots {
  border-color: transparent; background: transparent; cursor: default; pointer-events: none;
}
body.arefin-category-archive .arefin-cat-pagination .articles-page-btn.is-disabled {
  pointer-events: none; opacity: 0.35;
}

/* --- v1.4.6 mobile / tablet category track (< 1024px) --------------------- */
@media (max-width: 1023.98px) {
  body.arefin-category-archive .arefin-cat-rail { padding: 14px 0 16px; }
  body.arefin-category-archive .arefin-cat-rail-title { padding: 0 16px; margin-bottom: 10px; }
  body.arefin-category-archive .arefin-cat-rail-scroll {
    -webkit-overflow-scrolling: touch; scroll-snap-type: x proximity;
  }
  body.arefin-category-archive .arefin-cat-rail-list {
    display: flex; flex-wrap: nowrap; gap: 10px;
    padding: 2px 16px 6px;
  }
  body.arefin-category-archive .arefin-cat-rail-list > li {
    flex: none; width: max-content; max-width: 78vw; scroll-snap-align: start;
  }
  body.arefin-category-archive .arefin-cat-rail-item {
    flex: 0 0 auto; width: auto; max-width: 78vw;
    white-space: nowrap; overflow: hidden;
  }
  body.arefin-category-archive .arefin-cat-rail-item > span:first-child {
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  body.arefin-category-archive .arefin-cat-hero { padding: 2.75rem 0 2rem; }
}
@media (min-width: 768px) and (max-width: 1023.98px) {
  body.arefin-category-archive .arefin-cat-hero { padding: 3.25rem 0 2.25rem; }
}
</style>
	<?php
}
