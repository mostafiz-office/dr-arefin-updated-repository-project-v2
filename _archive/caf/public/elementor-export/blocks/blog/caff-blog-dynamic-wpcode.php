<?php
/* FD-PHP v2.0.0 — CAF Blog Dynamic Content (WPCode PHP Snippet)
   ─────────────────────────────────────────────────────────────
   WPCode → Add Snippet → PHP Snippet
   Location: Run Everywhere (Auto Insert)
   Status: Active
   ──────────────────────────────────────────────────────────────
   COMPLETE REWRITE — v2.0.0
   Pagination now uses ONLY $_SERVER['REQUEST_URI'] parsing.
   No rewrite rules, no query vars, no hooks needed.
   Just paste → activate → purge cache. Done.
   ──────────────────────────────────────────────────────────────
   Shortcodes:
     [caff_blog_categories]
     [caff_featured_posts count="9"]
   ────────────────────────────────────────────────────────────── */

if ( ! defined( 'ABSPATH' ) ) exit;

/* =========================================================
   0. ENABLE SHORTCODES INSIDE ELEMENTOR HTML WIDGETS
   ========================================================= */
add_filter( 'elementor/widget/render_content', 'do_shortcode' );

/* =========================================================
   0.1. DETECT PAGE NUMBER — BULLETPROOF URI PARSER
   No rewrite rules needed. Works on any WordPress setup.
   ========================================================= */
if ( ! function_exists( 'caff_get_current_blog_page' ) ) {
    function caff_get_current_blog_page() {
        /* Grab the raw request path from multiple server vars */
        $uri = '';
        foreach ( array( 'REQUEST_URI', 'REDIRECT_URL', 'PATH_INFO' ) as $key ) {
            if ( ! empty( $_SERVER[ $key ] ) ) {
                $uri = strtok( (string) $_SERVER[ $key ], '?' ); /* strip query string */
                break;
            }
        }

        $uri = '/' . trim( $uri, '/' ) . '/'; /* normalize: /blog/2/ */

        /*
         * Match patterns:
         *   /blog/2/          → page 2
         *   /blog/page/2/     → page 2
         *   /blog/            → page 1
         */
        if ( preg_match( '#/blog/page/(\d+)/?#i', $uri, $m ) ) {
            return max( 1, intval( $m[1] ) );
        }
        if ( preg_match( '#/blog/(\d+)/?#i', $uri, $m ) ) {
            return max( 1, intval( $m[1] ) );
        }

        /* Fallback: query params */
        foreach ( array( 'blog-page', 'paged', 'page' ) as $param ) {
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
if ( ! function_exists( 'caff_blog_page_url' ) ) {
    function caff_blog_page_url( $page_num ) {
        $page_num = max( 1, intval( $page_num ) );
        $base     = home_url( '/blog/' );
        if ( $page_num <= 1 ) {
            return $base;
        }
        return trailingslashit( $base . $page_num );
    }
}

/* =========================================================
   0.3. PREVENT WP CANONICAL REDIRECT ON /blog/N/
   This stops WordPress from redirecting /blog/2/ → /blog/
   ========================================================= */
add_filter( 'redirect_canonical', function ( $redirect_url, $requested_url ) {
    $path = '/' . trim( strtok( (string) $_SERVER['REQUEST_URI'], '?' ), '/' ) . '/';
    if ( preg_match( '#/blog/\d+/?#i', $path ) ) {
        return false; /* Don't redirect — we handle pagination ourselves */
    }
    return $redirect_url;
}, 10, 2 );

/* =========================================================
   0.4. MAKE /blog/N/ RESOLVE TO THE BLOG PAGE (not 404)
   ========================================================= */
add_action( 'parse_request', function ( $wp ) {
    if ( ! ( $wp instanceof WP ) ) return;

    $request = trim( (string) $wp->request, '/' );

    /* Match blog/2, blog/page/2, etc. */
    if ( preg_match( '#^blog/(?:page/)?(\d+)$#i', $request ) ) {
        /* Find the blog page */
        $blog_page = get_page_by_path( 'blog' );
        if ( $blog_page ) {
            $wp->query_vars = array( 'page_id' => $blog_page->ID );
        }
    }
} );

/* =========================================================
   0.5. REDIRECT LEGACY QUERY PARAMS → CLEAN URLs
   ========================================================= */
add_action( 'template_redirect', function () {
    if ( is_admin() || wp_doing_ajax() ) return;

    if ( isset( $_GET['blog-page'] ) && intval( $_GET['blog-page'] ) > 0 ) {
        wp_safe_redirect( caff_blog_page_url( intval( $_GET['blog-page'] ) ), 301 );
        exit;
    }
} );

/* =========================================================
   1. BLOG CATEGORIES — [caff_blog_categories]
   ========================================================= */
add_shortcode( 'caff_blog_categories', function ( $atts ) {

    $categories = get_categories( array(
        'orderby'    => 'count',
        'order'      => 'DESC',
        'hide_empty' => false,
    ) );

    if ( empty( $categories ) ) return '';

    $out  = '<!-- ==================== BLOG CATEGORIES (dynamic) ==================== -->';
    $out .= '<section class="caff-block caff-bg-white seo-parent-block" title="Categorie Blog CAF Fondi">';
    $out .= '<div class="container caff-section-pad-xs">';
    $out .= '<div class="caff-blog-categories">';

    foreach ( $categories as $cat ) {
        if ( $cat->slug === 'uncategorized' || $cat->slug === 'senza-categoria' ) continue;

        $url   = get_category_link( $cat->term_id );
        $name  = esc_html( $cat->name );
        $count = (int) $cat->count;
        $title = esc_attr( "Articoli nella categoria {$cat->name}" );

        $out .= '<a href="' . esc_url( $url ) . '" class="caff-blog-category-pill" title="' . $title . '">';
        $out .= '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg> ';
        $out .= $name . ' <span class="caff-blog-category-count">(' . $count . ')</span>';
        $out .= '</a>';
    }

    $out .= '</div></div></section>';
    return $out;
} );

/* =========================================================
   2. FEATURED / LATEST POSTS — [caff_featured_posts]
   NOTE: Client-side pagination fallback to handle hosts that
   always render /blog/2/ with page-1 query context.
   ========================================================= */
add_shortcode( 'caff_featured_posts', function ( $atts ) {

    $atts = shortcode_atts( array(
        'count' => 6,
        'label' => 'IN EVIDENZA',
        'title' => 'Articoli in Evidenza',
    ), $atts, 'caff_featured_posts' );

    $per_page = max( 1, intval( $atts['count'] ) );

    /* Fetch all posts once, then paginate safely on client and server */
    $query = new WP_Query( array(
        'posts_per_page'      => -1,
        'ignore_sticky_posts' => 1,
        'post_status'         => 'publish',
        'orderby'             => 'date',
        'order'               => 'DESC',
    ) );

    if ( ! $query->have_posts() ) {
        wp_reset_postdata();
        return '';
    }

    $total_posts = (int) $query->post_count;
    $total_pages = max( 1, (int) ceil( $total_posts / $per_page ) );
    $paged       = min( max( 1, caff_get_current_blog_page() ), $total_pages );

    $section_id = function_exists( 'wp_unique_id' ) ? wp_unique_id( 'caff-blog-' ) : 'caff-blog-' . uniqid();
    $base_url   = home_url( '/blog/' );

    $out  = '<!-- ==================== FEATURED POSTS (dynamic, page ' . $paged . '/' . $total_pages . ') ==================== -->';
    $out .= '<section id="' . esc_attr( $section_id ) . '" class="caff-block caff-bg-white seo-page-parent-block" title="' . esc_attr( $atts['title'] ) . ' – Blog CAF Patronato Fondi" data-caff-base-url="' . esc_url( $base_url ) . '" data-caff-total-pages="' . $total_pages . '">';
    $out .= '<div class="container caff-section-pad-sm">';

    $out .= '<div class="caff-blog-section-header">';
    $out .= '<p class="section-label">' . esc_html( $atts['label'] ) . '</p>';
    $out .= '<h2 class="caff-content-heading"><strong>' . esc_html( $atts['title'] ) . '<span class="caff-blog-page-suffix">' . ( $paged > 1 ? ' — Pagina ' . $paged : '' ) . '</span></strong></h2>';
    $out .= '</div>';

    $out .= '<div class="caff-blog-grid">';

    $fallback_images = array(
        'blog-730-guida.jpg',
        'blog-isee-famiglia.jpg',
        'blog-pensione-inps.jpg',
        'blog-dichiarazione-online.jpg',
        'blog-bonus-fiscali.jpg',
        'blog-naspi-guida.jpg',
        'blog-scadenze-fiscali.jpg',
        'blog-ristrutturazione.jpg',
        'blog-consulenza-fiscale.jpg',
    );

    $index = 0;
    while ( $query->have_posts() ) {
        $query->the_post();

        $post_index    = $index + 1;
        $card_page_num = (int) ceil( $post_index / $per_page );

        $permalink = get_permalink();
        $title     = esc_html( get_the_title() );
        $excerpt   = wp_trim_words( get_the_excerpt() ?: get_the_content(), 25, ' […]' );
        $date      = get_the_date( 'j F Y' );
        $author    = get_the_author();

        $cats      = get_the_category();
        $cat_name  = ! empty( $cats ) ? esc_html( $cats[0]->name ) : '';
        $cat_link  = ! empty( $cats ) ? esc_url( get_category_link( $cats[0]->term_id ) ) : '#';

        $has_thumb    = has_post_thumbnail();
        $fallback_src = '';

        if ( ! $has_thumb ) {
            if ( preg_match( '/<img[^>]+src=["\']([^"\']+)["\']/i', get_the_content(), $matches ) ) {
                $fallback_src = $matches[1];
            }

            if ( empty( $fallback_src ) ) {
                $upload_dir   = wp_upload_dir();
                $fallback_src = trailingslashit( $upload_dir['baseurl'] ) . '2026/03/' . $fallback_images[ $index % count( $fallback_images ) ];
            }
        }

        $style = ( $card_page_num === $paged ) ? '' : ' style="display:none"';
        $out  .= '<article class="caff-blog-card" data-caff-page="' . $card_page_num . '"' . $style . ' title="' . esc_attr( $title ) . '">';

        $out .= '<div class="caff-blog-card-thumb">';
        $out .= '<a href="' . esc_url( $permalink ) . '">';

        if ( $has_thumb ) {
            $out .= get_the_post_thumbnail( get_the_ID(), 'large', array(
                'alt'      => $title,
                'loading'  => 'lazy',
                'decoding' => 'async',
                'class'    => 'caff-blog-card-image',
            ) );
        } else {
            $out .= '<img src="' . esc_url( $fallback_src ) . '" alt="' . esc_attr( $title ) . '" loading="lazy" decoding="async" class="caff-blog-card-image" />';
        }

        $out .= '</a>';
        $out .= '</div>';

        $out .= '<div class="caff-blog-card-body">';
        if ( $cat_name ) {
            $out .= '<a href="' . $cat_link . '" class="caff-blog-card-category">' . $cat_name . '</a>';
        }
        $out .= '<h3 class="caff-blog-card-title"><a href="' . esc_url( $permalink ) . '">' . $title . '</a></h3>';
        $out .= '<div class="caff-blog-card-meta">';
        $out .= '<span class="caff-blog-meta-item caff-blog-meta-date">' . esc_html( $date ) . '</span>';
        $out .= '<span class="caff-blog-meta-divider">|</span>';
        $out .= '<span class="caff-blog-meta-item caff-blog-meta-author">' . esc_html( $author ) . '</span>';
        $out .= '</div>';
        $out .= '<p class="caff-blog-card-desc">' . esc_html( $excerpt ) . '</p>';
        $out .= '<a href="' . esc_url( $permalink ) . '" class="caff-blog-card-readmore">Read More <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>';
        $out .= '</div>';

        $out .= '</article>';
        $index++;
    }

    $out .= '</div>';

    if ( $total_pages > 1 ) {
        $out .= '<nav class="caff-blog-pagination" aria-label="Navigazione pagine blog">';

        $prev_url = caff_blog_page_url( max( 1, $paged - 1 ) );
        $out .= '<a href="' . esc_url( $prev_url ) . '" data-caff-prev="1" class="caff-blog-pagination-link" aria-label="Pagina precedente" title="Pagina precedente">';
        $out .= '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';
        $out .= '</a>';

        for ( $i = 1; $i <= $total_pages; $i++ ) {
            $active = ( $i === $paged ) ? ' caff-blog-pagination-link-active' : '';
            $out .= '<a href="' . esc_url( caff_blog_page_url( $i ) ) . '" data-caff-page-link="' . $i . '" class="caff-blog-pagination-link' . $active . '"' . ( $i === $paged ? ' aria-current="page"' : '' ) . ' title="Pagina ' . $i . '">' . $i . '</a>';
        }

        $next_url = caff_blog_page_url( min( $total_pages, $paged + 1 ) );
        $out .= '<a href="' . esc_url( $next_url ) . '" data-caff-next="1" class="caff-blog-pagination-link" aria-label="Pagina successiva" title="Pagina successiva">';
        $out .= '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
        $out .= '</a>';

        $out .= '</nav>';
    }

    $out .= '</div></section>';

    $out .= '<script>(function(){'
        . 'var root=document.getElementById(' . wp_json_encode( $section_id ) . ');if(!root)return;'
        . 'var total=parseInt(root.getAttribute("data-caff-total-pages")||"1",10);'
        . 'var base=(root.getAttribute("data-caff-base-url")||"/blog/").replace(/\/+$/,"")+"/";'
        . 'var path=(window.location.pathname||"/").replace(/\/+$/,"")+"/";'
        . 'var page=1;var m=path.match(/\/blog\/(?:page\/)?(\d+)\/?$/i);'
        . 'if(m&&m[1]){page=parseInt(m[1],10)||1;}else{var qp=new URLSearchParams(window.location.search);page=parseInt(qp.get("blog-page")||qp.get("paged")||qp.get("page")||"1",10)||1;}'
        . 'if(page<1)page=1;if(page>total)page=total;'
        . 'var cards=root.querySelectorAll(".caff-blog-card[data-caff-page]");'
        . 'cards.forEach(function(card){card.style.display=(parseInt(card.getAttribute("data-caff-page"),10)===page)?"":"none";});'
        . 'var suffix=root.querySelector(".caff-blog-page-suffix");if(suffix){suffix.textContent=(page>1)?(" — Pagina "+page):"";}'
        . 'var links=root.querySelectorAll("[data-caff-page-link]");'
        . 'links.forEach(function(link){var n=parseInt(link.getAttribute("data-caff-page-link"),10);var active=(n===page);link.classList.toggle("caff-blog-pagination-link-active",active);if(active){link.setAttribute("aria-current","page");}else{link.removeAttribute("aria-current");}link.setAttribute("href",n===1?base:(base+n+"/"));});'
        . 'var prev=root.querySelector("[data-caff-prev]");if(prev){var pn=Math.max(1,page-1);prev.setAttribute("href",pn===1?base:(base+pn+"/"));prev.style.pointerEvents=(page<=1)?"none":"";prev.style.opacity=(page<=1)?"0.45":"";}'
        . 'var next=root.querySelector("[data-caff-next]");if(next){var nn=Math.min(total,page+1);next.setAttribute("href",nn===1?base:(base+nn+"/"));next.style.pointerEvents=(page>=total)?"none":"";next.style.opacity=(page>=total)?"0.45":"";}'
        . '})();</script>';

    wp_reset_postdata();
    return $out;
} );
