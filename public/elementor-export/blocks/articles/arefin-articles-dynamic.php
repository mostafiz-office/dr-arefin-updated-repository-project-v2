<?php
/* AREFIN-ARTICLES v1.3.0 — Dr. Arefin Articles Dynamic Content (WPCode PHP Snippet)
   ─────────────────────────────────────────────────────────────
   WPCode → Add Snippet → PHP Snippet
   Location: Run Everywhere (Auto Insert)
   Status: Active
   ──────────────────────────────────────────────────────────────
   Adapted 1:1 from the CAF blog architecture.
   Pagination uses ONLY $_SERVER['REQUEST_URI'] parsing — no rewrite
   rules, no query vars. Paste → activate → purge cache. Done.
   ──────────────────────────────────────────────────────────────
   Primary route: /articles/  |  Legacy-compatible route: /news/

   Shortcodes:
     [arefin_news_categories]
     [arefin_news_posts count="9"]
   ────────────────────────────────────────────────────────────── */

if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! defined( 'AREFIN_ARTICLES_SLUG' ) ) {
    define( 'AREFIN_ARTICLES_SLUG', 'articles' );
}

/* Public-facing canonical host. WordPress can emit URLs from either its configured
   home_url(), stale WPCode snippets, or staging/update URLs stored inside media/permalink data.
   Use v13-prefixed helpers so older active snippets cannot hijack these functions. */
if ( ! defined( 'AREFIN_CANONICAL_HOST' ) ) {
    define( 'AREFIN_CANONICAL_HOST', 'https://drarefin.com' );
}

function arefin_articles_v13_canonical_host() {
    return rtrim( AREFIN_CANONICAL_HOST, '/' );
}

function arefin_articles_v13_legacy_hosts() {
    $home = rtrim( home_url(), '/' );
    return array_unique( array_filter( array(
        $home,
        preg_replace( '#^https?://www\.#i', 'https://', $home ),
        preg_replace( '#^https?://#i', 'https://www.', $home ),
        'https://drarefin.com',
        'http://drarefin.com',
        '//drarefin.com',
        'https://www.drarefin.com',
        'http://www.drarefin.com',
        '//www.drarefin.com',
    ) ) );
}

function arefin_articles_v13_canon_text( $value ) {
    $canon = arefin_articles_v13_canonical_host();
    $value = (string) $value;

    foreach ( arefin_articles_v13_legacy_hosts() as $legacy ) {
        if ( $legacy && $legacy !== $canon ) {
            $value = str_replace( $legacy, $canon, $value );
            $value = str_replace( str_replace( '/', '\\/', $legacy ), str_replace( '/', '\\/', $canon ), $value );
        }
    }

    return $value;
}

function arefin_articles_v13_canon_url( $url ) {
    return arefin_articles_v13_canon_text( $url );
}

function arefin_articles_v13_canon_html( $html ) {
    return arefin_articles_v13_canon_text( $html );
}

function arefin_articles_v13_is_articles_request() {
    if ( is_page( AREFIN_ARTICLES_SLUG ) ) return true;
    $path = isset( $_SERVER['REQUEST_URI'] ) ? '/' . trim( strtok( (string) $_SERVER['REQUEST_URI'], '?' ), '/' ) . '/' : '';
    return (bool) preg_match( '#/(?:articles|news)(?:/|$)#i', $path );
}

add_action( 'template_redirect', function () {
    if ( is_admin() || wp_doing_ajax() || ! arefin_articles_v13_is_articles_request() ) return;
    ob_start( 'arefin_articles_v13_canon_html' );
}, 0 );

/* =========================================================
   0. ENABLE SHORTCODES INSIDE ELEMENTOR HTML WIDGETS
   ========================================================= */
function arefin_articles_v13_register_shortcodes() {
    add_shortcode( 'arefin_news_categories', 'arefin_articles_v13_categories_shortcode' );
    add_shortcode( 'arefin_articles_categories', 'arefin_articles_v13_categories_shortcode' );
    add_shortcode( 'arefin_news_posts', 'arefin_articles_v13_posts_shortcode' );
    add_shortcode( 'arefin_articles_posts', 'arefin_articles_v13_posts_shortcode' );
}
arefin_articles_v13_register_shortcodes();
add_action( 'init', 'arefin_articles_v13_register_shortcodes', 9999 );
add_action( 'wp', 'arefin_articles_v13_register_shortcodes', 9999 );
add_filter( 'elementor/widget/render_content', function ( $content ) {
    arefin_articles_v13_register_shortcodes();
    return $content;
}, 1 );
add_filter( 'elementor/widget/render_content', 'do_shortcode', 20 );

/* =========================================================
   0.1. DETECT PAGE NUMBER — BULLETPROOF URI PARSER
   ========================================================= */
if ( ! function_exists( 'arefin_get_current_news_page' ) ) {
    function arefin_get_current_news_page() {
        $uri = '';
        foreach ( array( 'REQUEST_URI', 'REDIRECT_URL', 'PATH_INFO' ) as $key ) {
            if ( ! empty( $_SERVER[ $key ] ) ) {
                $uri = strtok( (string) $_SERVER[ $key ], '?' );
                break;
            }
        }

        $uri = '/' . trim( $uri, '/' ) . '/';

        if ( preg_match( '#/(?:articles|news)/page/(\d+)/?#i', $uri, $m ) ) {
            return max( 1, intval( $m[1] ) );
        }
        if ( preg_match( '#/(?:articles|news)/(\d+)/?#i', $uri, $m ) ) {
            return max( 1, intval( $m[1] ) );
        }

        foreach ( array( 'articles-page', 'news-page', 'paged', 'page' ) as $param ) {
            if ( isset( $_GET[ $param ] ) && intval( $_GET[ $param ] ) > 0 ) {
                return intval( $_GET[ $param ] );
            }
        }

        return 1;
    }
}

/* =========================================================
   0.2. BUILD PAGINATION URL
   ========================================================= */
if ( ! function_exists( 'arefin_news_page_url' ) ) {
    function arefin_news_page_url( $page_num ) {
        $page_num = max( 1, intval( $page_num ) );
        $base     = arefin_articles_v13_canon_url( home_url( '/' . AREFIN_ARTICLES_SLUG . '/' ) );
        if ( $page_num <= 1 ) {
            return $base;
        }
        return trailingslashit( $base . $page_num );
    }
}

/* =========================================================
   0.3. PREVENT WP CANONICAL REDIRECT ON /articles/N/ OR /news/N/
   ========================================================= */
add_filter( 'redirect_canonical', function ( $redirect_url, $requested_url ) {
    $path = '/' . trim( strtok( (string) $_SERVER['REQUEST_URI'], '?' ), '/' ) . '/';
    if ( preg_match( '#/(?:articles|news)/\d+/?#i', $path ) ) {
        return false;
    }
    return $redirect_url;
}, 10, 2 );

/* =========================================================
   0.4. MAKE /articles/N/ AND /news/N/ RESOLVE TO THE ARTICLES PAGE (not 404)
   ========================================================= */
add_action( 'parse_request', function ( $wp ) {
    if ( ! ( $wp instanceof WP ) ) return;

    $request = trim( (string) $wp->request, '/' );

    if ( preg_match( '#^(articles|news)/(?:page/)?(\d+)$#i', $request, $matches ) ) {
        $page = get_page_by_path( AREFIN_ARTICLES_SLUG );
        if ( ! $page && ! empty( $matches[1] ) ) {
            $page = get_page_by_path( sanitize_title( $matches[1] ) );
        }
        if ( $page ) {
            $wp->query_vars = array( 'page_id' => $page->ID );
        }
    }
} );

/* =========================================================
   0.5. REDIRECT LEGACY QUERY PARAMS → CLEAN URLs
   ========================================================= */
add_action( 'template_redirect', function () {
    if ( is_admin() || wp_doing_ajax() ) return;

    foreach ( array( 'articles-page', 'news-page' ) as $param ) {
        if ( isset( $_GET[ $param ] ) && intval( $_GET[ $param ] ) > 0 ) {
                wp_safe_redirect( arefin_news_page_url( intval( $_GET[ $param ] ) ), 301 );
            exit;
        }
    }
} );

/* =========================================================
   1. NEWS CATEGORIES — [arefin_news_categories]
   ========================================================= */
function arefin_articles_v13_categories_shortcode( $atts ) {

    $categories = get_categories( array(
        'orderby'    => 'count',
        'order'      => 'DESC',
        'hide_empty' => false,
    ) );

    if ( empty( $categories ) ) return '';

    $out  = '<!-- ==================== NEWS CATEGORIES (dynamic) ==================== -->';
    $out .= '<section class="arefin news-categories-band" aria-label="Article categories">';
    $out .= '<div class="arefin-container">';
    $out .= '<div class="news-categories">';

    foreach ( $categories as $cat ) {
        if ( $cat->slug === 'uncategorized' ) continue;

        $url   = arefin_articles_v13_canon_url( get_category_link( $cat->term_id ) );
        $name  = esc_html( $cat->name );
        $count = (int) $cat->count;
        $title = esc_attr( "Articles in the {$cat->name} category" );

        $out .= '<a href="' . esc_url( $url ) . '" class="news-category-pill" title="' . $title . '">';
        $out .= '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg> ';
        $out .= $name . ' <span class="news-category-count">(' . $count . ')</span>';
        $out .= '</a>';
    }

    $out .= '</div></div></section>';
    return arefin_articles_v13_canon_html( $out );
}

/* =========================================================
   2. LATEST POSTS — [arefin_news_posts count="9"]
   ========================================================= */
function arefin_articles_v13_posts_shortcode( $atts ) {

    $atts = shortcode_atts( array(
        'count' => 9,
    ), $atts, 'arefin_news_posts' );

    $per_page = max( 1, intval( $atts['count'] ) );

    $query = new WP_Query( array(
        'posts_per_page'      => -1,
        'ignore_sticky_posts' => 1,
        'post_status'         => 'publish',
        'orderby'             => 'date',
        'order'               => 'DESC',
    ) );

    if ( ! $query->have_posts() ) {
        wp_reset_postdata();
        return '<section class="arefin articles-light-band arefin-section-divider" aria-label="Articles"><div class="arefin-container"><div class="articles-empty"><p>No articles available right now. Please check back soon.</p></div></div></section>';
    }

    $total_posts = (int) $query->post_count;
    $total_pages = max( 1, (int) ceil( $total_posts / $per_page ) );
    $paged       = min( max( 1, arefin_get_current_news_page() ), $total_pages );

    $section_id = function_exists( 'wp_unique_id' ) ? wp_unique_id( 'arefin-articles-' ) : 'arefin-articles-' . uniqid();
    $base_url   = arefin_articles_v13_canon_url( home_url( '/' . AREFIN_ARTICLES_SLUG . '/' ) );

    $out  = '<!-- ==================== NEWS POSTS (dynamic, page ' . $paged . '/' . $total_pages . ') ==================== -->';
    $out .= '<section id="' . esc_attr( $section_id ) . '" class="arefin articles-light-band arefin-section-divider" aria-label="Articles" data-arefin-base-url="' . esc_url( $base_url ) . '" data-arefin-total-pages="' . $total_pages . '">';
    $out .= '<div class="arefin-container">';
    $out .= '<div class="articles-grid">';

    $index = 0;
    while ( $query->have_posts() ) {
        $query->the_post();

        $post_index    = $index + 1;
        $card_page_num = (int) ceil( $post_index / $per_page );

        $permalink = arefin_articles_v13_canon_url( get_permalink() );
        $title     = esc_html( get_the_title() );
        $excerpt   = wp_trim_words( get_the_excerpt() ?: get_the_content(), 28, ' […]' );
        $date      = get_the_date( 'F j, Y' );
        $iso       = get_the_date( 'Y-m-d' );
        $author    = get_the_author();

        $has_thumb = has_post_thumbnail();

        $style = ( $card_page_num === $paged ) ? '' : ' style="display:none"';
        $out  .= '<article class="article-card" data-arefin-page="' . $card_page_num . '"' . $style . ' title="' . esc_attr( $title ) . '">';

        $out .= '<div class="article-card-thumb"><a href="' . esc_url( $permalink ) . '">';
        if ( $has_thumb ) {
            $out .= arefin_articles_v13_canon_html( get_the_post_thumbnail( get_the_ID(), 'large', array(
                'alt'      => $title,
                'loading'  => 'lazy',
                'decoding' => 'async',
                'class'    => 'article-card-img',
            ) ) );
        } else {
            $out .= '<img src="' . esc_url( get_template_directory_uri() . '/screenshot.png' ) . '" alt="' . esc_attr( $title ) . '" loading="lazy" decoding="async" class="article-card-img" />';
        }
        $out .= '</a></div>';

        $out .= '<div class="article-card-body">';
        $out .= '<h2 class="article-card-title"><a href="' . esc_url( $permalink ) . '">' . $title . '</a></h2>';
        $out .= '<ul class="article-card-meta text-fluid-meta">';
        $out .= '<li><time datetime="' . esc_attr( $iso ) . '">' . esc_html( $date ) . '</time></li>';
        $out .= '<li>' . esc_html( $author ) . '</li>';
        $out .= '</ul>';
        $out .= '<p class="article-card-excerpt">' . esc_html( $excerpt ) . '</p>';
        $out .= '<a href="' . esc_url( $permalink ) . '" class="article-card-readmore">Read More <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>';
        $out .= '</div>';

        $out .= '</article>';
        $index++;
    }

    $out .= '</div>';

    if ( $total_pages > 1 ) {
        $out .= '<nav class="articles-pagination" aria-label="Pagination">';

        $prev_url = arefin_news_page_url( max( 1, $paged - 1 ) );
        $out .= '<a href="' . esc_url( $prev_url ) . '" data-arefin-prev="1" class="articles-page-btn" aria-label="Previous page" title="Previous page">';
        $out .= '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg><span>Previous</span>';
        $out .= '</a>';

        $out .= '<div class="articles-page-numbers">';
        for ( $i = 1; $i <= $total_pages; $i++ ) {
            $active = ( $i === $paged ) ? ' active' : '';
            $out .= '<a href="' . esc_url( arefin_news_page_url( $i ) ) . '" data-arefin-page-link="' . $i . '" class="articles-page-num' . $active . '"' . ( $i === $paged ? ' aria-current="page"' : '' ) . ' title="Page ' . $i . '">' . $i . '</a>';
        }
        $out .= '</div>';

        $next_url = arefin_news_page_url( min( $total_pages, $paged + 1 ) );
        $out .= '<a href="' . esc_url( $next_url ) . '" data-arefin-next="1" class="articles-page-btn" aria-label="Next page" title="Next page">';
        $out .= '<span>Next</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
        $out .= '</a>';

        $out .= '</nav>';
    }

    $out .= '</div></section>';

    $out .= '<script>(function(){'
        . 'var root=document.getElementById(' . wp_json_encode( $section_id ) . ');if(!root)return;'
        . 'var total=parseInt(root.getAttribute("data-arefin-total-pages")||"1",10);'
        . 'var base=(root.getAttribute("data-arefin-base-url")||"/articles/").replace(/\/+$/,"")+"/";'
        . 'var path=(window.location.pathname||"/").replace(/\/+$/,"")+"/";'
        . 'var page=1;var m=path.match(/\/(?:articles|news)\/(?:page\/)?(\d+)\/?$/i);'
        . 'if(m&&m[1]){page=parseInt(m[1],10)||1;}else{var qp=new URLSearchParams(window.location.search);page=parseInt(qp.get("articles-page")||qp.get("news-page")||qp.get("paged")||qp.get("page")||"1",10)||1;}'
        . 'if(page<1)page=1;if(page>total)page=total;'
        . 'var cards=root.querySelectorAll(".article-card[data-arefin-page]");'
        . 'cards.forEach(function(card){card.style.display=(parseInt(card.getAttribute("data-arefin-page"),10)===page)?"":"none";});'
        . 'var links=root.querySelectorAll("[data-arefin-page-link]");'
        . 'links.forEach(function(link){var n=parseInt(link.getAttribute("data-arefin-page-link"),10);var active=(n===page);link.classList.toggle("active",active);if(active){link.setAttribute("aria-current","page");}else{link.removeAttribute("aria-current");}link.setAttribute("href",n===1?base:(base+n+"/"));});'
        . 'var prev=root.querySelector("[data-arefin-prev]");if(prev){var pn=Math.max(1,page-1);prev.setAttribute("href",pn===1?base:(base+pn+"/"));prev.style.pointerEvents=(page<=1)?"none":"";prev.style.opacity=(page<=1)?"0.35":"";}'
        . 'var next=root.querySelector("[data-arefin-next]");if(next){var nn=Math.min(total,page+1);next.setAttribute("href",nn===1?base:(base+nn+"/"));next.style.pointerEvents=(page>=total)?"none":"";next.style.opacity=(page>=total)?"0.35":"";}'
        . '})();</script>';

    wp_reset_postdata();
    return arefin_articles_v13_canon_html( $out );
}
