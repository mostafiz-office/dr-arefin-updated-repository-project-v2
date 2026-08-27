<?php
/**
 * AREFIN-SINGLE-POST v2.10.0 — Single Blog Post Layout + Sticky Sidebar + Related
 * ───────────────────────────────────────────────────────────────────────
 * Deploy via WPCode:
 *   - Snippet type : PHP Snippet
 *   - Location     : Run Everywhere (Auto Insert)
 *   - Priority     : 10
 *   - Status       : Active
 *
 * Mirrors the React `ArticleSingleDark.tsx` preview:
 *   https://drarefin-v4.lovable.app/articles/gallbladder-stone-laparoscopic-removal/
 *
 * Hybrid-safe version: wraps the real post body through `the_content`, prints
 * a CSS fallback from PHP, and uses v26-prefixed function names so it can
 * coexist with an older WPCode snippet without a fatal redeclare error.
 *
 * On every single blog post it:
 *   1. Injects a React-style image hero with title and meta
 *   2. Wraps the WordPress post content in a 2-column grid (.arefin-sp-main + sidebar)
 *   3. Injects a sticky right sidebar (CTA box, treatments, quick contact)
 *   4. Appends a "Related Articles" band (3 newest Atto cards, current excluded)
 *
 * Styling lives in single-post.css (deploy as HTML Snippet, Singular > Posts).
 * No !important. Kebab-case classes. Tokens come from global.css.
 * ─────────────────────────────────────────────────────────────────────── */

if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'wp', function () {
	if ( is_admin() || ! is_singular( 'post' ) ) return;

	add_filter( 'the_content', 'arefin_sp_v26_content_layout', 999 );
	add_filter( 'body_class', 'arefin_sp_v26_body_class' );
	add_action( 'wp_head', 'arefin_sp_v26_print_fallback_css', 120 );
	add_action( 'wp_footer', 'arefin_sp_v26_print_sticky_repair_js', 120 );
} );

function arefin_sp_v26_body_class( $classes ) {
	$classes[] = 'arefin-single-post-enhanced';
	$classes[] = 'arefin-single-post-compact';
	return $classes;
}

function arefin_sp_v26_content_layout( $content ) {
	static $did_render = false;

	if ( $did_render || is_admin() || ! is_singular( 'post' ) ) return $content;
	if ( get_post_type() !== 'post' ) return $content;
	if ( (int) get_the_ID() !== (int) get_queried_object_id() ) return $content;

	$did_render = true;
	$marker = "\n<!-- AREFIN-SINGLE-POST v2.10.0 sticky-repair active -->\n";

	if ( strpos( $content, 'arefin-sp-layout' ) !== false ) {
		$hero = strpos( $content, 'arefin-sp-hero' ) === false ? arefin_sp_v26_hero_markup() : '';
		if ( strpos( $content, 'arefin-sp-content-section' ) === false ) {
			$content = arefin_sp_v26_strip_leading_title( $content );
			$related = '';
			$related_pos = strpos( $content, '<section class="arefin-sp-related"' );
			if ( $related_pos !== false ) {
				$related = substr( $content, $related_pos );
				$content = substr( $content, 0, $related_pos );
			}
			if ( $related === '' ) $related = arefin_sp_v26_related_markup();
			return $marker . $hero . '<section class="arefin-sp-content-section" aria-label="Article content">' . $content . '</section>' . $related;
		}
		return $marker . $hero . $content;
	}

	return $marker
		. arefin_sp_v26_hero_markup()
		. '<section class="arefin-sp-content-section" aria-label="Article content"><div class="arefin-sp-layout"><div class="arefin-sp-main">'
		. arefin_sp_v26_strip_leading_title( $content )
		. '</div>'
		. arefin_sp_v26_sidebar_markup()
		. '</div></section>'
		. arefin_sp_v26_related_markup();
}

function arefin_sp_v26_strip_leading_title( $content ) {
	$title = preg_quote( wp_strip_all_tags( get_the_title() ), '/' );
	$content = preg_replace( '/(<div class="arefin-sp-main">\s*)<h1[^>]*>\s*' . $title . '\s*<\/h1>/i', '$1', $content, 1 );
	return preg_replace( '/^\s*<h1[^>]*>\s*' . $title . '\s*<\/h1>/i', '', $content, 1 );
}

function arefin_sp_v26_hero_markup() {
	$post_id   = get_the_ID();
	$title     = get_the_title( $post_id );
	$permalink = get_permalink( $post_id );
	$date      = get_the_date( 'F j, Y', $post_id );
	$iso       = get_the_date( 'Y-m-d', $post_id );
	$author    = get_the_author_meta( 'display_name', (int) get_post_field( 'post_author', $post_id ) );
	$thumb_id  = get_post_thumbnail_id( $post_id );
	$image     = $thumb_id ? wp_get_attachment_image_url( $thumb_id, 'full' ) : '';
	$image_alt = $thumb_id ? get_post_meta( $thumb_id, '_wp_attachment_image_alt', true ) : '';
	$image_alt = $image_alt ?: $title;

	ob_start();
	?>
	<section class="arefin-sp-hero" aria-label="Article hero">
		<?php if ( $image ) : ?>
			<div class="arefin-sp-hero-bg">
				<img src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>" class="arefin-sp-hero-img" loading="eager" decoding="async" fetchpriority="high" />
			</div>
		<?php endif; ?>
		<div class="arefin-sp-hero-overlay"></div>
		<div class="arefin-sp-hero-inner">
			<nav class="arefin-sp-breadcrumb" aria-label="Breadcrumb">
				<ol>
					<li><a href="/" title="Home">Home</a></li>
					<li aria-hidden="true">›</li>
					<li><a href="/articles/" title="Articles">Articles</a></li>
					<li aria-hidden="true">›</li>
					<li><a href="<?php echo esc_url( $permalink ); ?>" aria-current="page" title="<?php echo esc_attr( $title ); ?>"><?php echo esc_html( $title ); ?></a></li>
				</ol>
			</nav>
			<h1 class="arefin-sp-hero-title"><a href="<?php echo esc_url( $permalink ); ?>" class="arefin-sp-hero-title-link" title="<?php echo esc_attr( $title ); ?>"><?php echo esc_html( $title ); ?></a></h1>
			<div class="arefin-sp-hero-meta" aria-label="Article details">
				<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg><time datetime="<?php echo esc_attr( $iso ); ?>"><?php echo esc_html( $date ); ?></time></span>
				<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></svg><?php echo esc_html( $author ); ?></span>
			</div>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

function arefin_sp_v26_sidebar_markup() {
	ob_start();
	?>
		<aside class="arefin-sp-sidebar" role="complementary" aria-label="Article sidebar">

			<!-- Book a Consultation -->
			<div class="arefin-sp-cta">
				<h3 class="arefin-sp-cta-title">Book a Consultation</h3>
				<p class="arefin-sp-cta-text">Get expert advice from Dr. Murshidul Arefin for your hepatobiliary concerns.</p>
				<div class="arefin-sp-cta-actions">
					<a href="/contact/" class="arefin-sp-btn arefin-sp-btn-primary" title="Book an appointment with Dr. Arefin">Book Appointment</a>
					<a href="tel:+8801311487592" class="arefin-sp-btn arefin-sp-btn-ghost" title="Call Dr. Arefin's chamber">Call Now</a>
				</div>
			</div>

			<!-- Our Treatments -->
			<div class="arefin-sp-box arefin-sp-treatments">
				<h3 class="arefin-sp-box-title">Our Treatments</h3>
				<ul class="arefin-sp-links">
					<li><a href="/treatment/liver-surgery/" class="arefin-sp-link" title="Liver Surgery"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>Liver Surgery</a></li>
					<li><a href="/treatment/gallbladder-surgery/" class="arefin-sp-link" title="Gallbladder Surgery"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>Gallbladder Surgery</a></li>
					<li><a href="/treatment/pancreatic-surgery/" class="arefin-sp-link" title="Pancreatic Surgery"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>Pancreatic Surgery</a></li>
					<li><a href="/treatment/biliary-tract-surgery/" class="arefin-sp-link" title="Biliary Tract Surgery"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>Biliary Tract Surgery</a></li>
					<li><a href="/articles/" class="arefin-sp-link" title="All Articles"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>All Articles</a></li>
				</ul>
			</div>

			<!-- Quick Contact -->
			<div class="arefin-sp-box">
				<h3 class="arefin-sp-box-title">Quick Contact</h3>
				<div class="arefin-sp-contact">
					<a href="tel:+8801311487592" class="arefin-sp-contact-link" title="Call Dr. Arefin">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
						<span>+880 1311-487592</span>
					</a>
					<a href="https://wa.me/8801311487592" target="_blank" rel="noopener" class="arefin-sp-contact-link" title="WhatsApp Dr. Arefin">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.18c-.25.69-1.45 1.32-1.99 1.36-.51.05-1.16.27-3.91-.82-3.3-1.3-5.4-4.66-5.56-4.88-.16-.22-1.33-1.77-1.33-3.38 0-1.6.84-2.39 1.14-2.72.3-.33.65-.41.87-.41.22 0 .43.01.62.01.2.01.47-.07.73.56.25.62.86 2.14.93 2.29.07.15.12.33.02.55-.1.22-.15.36-.3.55-.15.19-.31.42-.45.56-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.45.29.15.46.12.63-.07.17-.19.73-.85.93-1.14.2-.29.39-.24.65-.15.26.1 1.66.78 1.95.93.29.14.48.22.55.34.07.12.07.69-.18 1.38Z"/></svg>
						<span>WhatsApp</span>
					</a>
					<a href="mailto:dr.murshidul.arefin@gmail.com" class="arefin-sp-contact-link" title="Email Dr. Arefin">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
						<span>Email</span>
					</a>
				</div>
			</div>

		</aside>
		<?php
	return ob_get_clean();
}

function arefin_sp_v26_related_markup() {
	$related = new WP_Query( array(
			'posts_per_page'      => 3,
			'post__not_in'        => array( get_the_ID() ),
			'ignore_sticky_posts' => 1,
			'post_status'         => 'publish',
			'orderby'             => 'date',
			'order'               => 'DESC',
			'no_found_rows'       => true,
		) );

	if ( ! $related->have_posts() ) return '';

	ob_start();
	echo '<section class="arefin-sp-related" aria-label="Related articles">';
	echo '<div class="arefin-sp-related-inner">';
	echo '<h2 class="arefin-sp-related-title">Related <span>Articles</span></h2>';
	echo '<div class="arefin-sp-related-grid">';

	while ( $related->have_posts() ) {
		$related->the_post();

		$permalink = get_permalink();
		$title     = esc_html( get_the_title() );
		$excerpt   = wp_trim_words( get_the_excerpt() ?: wp_strip_all_tags( get_post_field( 'post_content', get_the_ID() ) ), 22, ' […]' );
		$date      = get_the_date( 'F j, Y' );
		$iso       = get_the_date( 'Y-m-d' );
		$author    = get_the_author();

		echo '<a href="' . esc_url( $permalink ) . '" class="arefin-sp-card" title="' . esc_attr( get_the_title() ) . '">';
		echo '<div class="arefin-sp-card-thumb">';
		if ( has_post_thumbnail() ) {
			echo get_the_post_thumbnail( get_the_ID(), 'large', array(
				'alt'      => $title,
				'loading'  => 'lazy',
				'decoding' => 'async',
				'class'    => 'arefin-sp-card-img',
			) );
		} else {
			echo '<img src="' . esc_url( get_template_directory_uri() . '/screenshot.png' ) . '" alt="' . esc_attr( get_the_title() ) . '" loading="lazy" decoding="async" class="arefin-sp-card-img" />';
		}
		echo '</div>';
		echo '<div class="arefin-sp-card-body">';
		echo '<h3 class="arefin-sp-card-title">' . $title . '</h3>';
		echo '<ul class="arefin-sp-card-meta"><li><time datetime="' . esc_attr( $iso ) . '">' . esc_html( $date ) . '</time></li>';
		if ( $author ) { echo '<li>' . esc_html( $author ) . '</li>'; }
		echo '</ul>';
		echo '<p class="arefin-sp-card-excerpt">' . esc_html( $excerpt ) . '</p>';
		echo '<span class="arefin-sp-card-readmore">Read More <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>';
		echo '</div>';
		echo '</a>';
	}

	echo '</div></div></section>';
	wp_reset_postdata();

	return ob_get_clean();
}

function arefin_sp_v26_print_fallback_css() {
	if ( is_admin() || ! is_singular( 'post' ) ) return;
	?>
<style id="arefin-single-post-v210-fallback">
/* AREFIN-SINGLE-POST v2.10.0 fallback — hides author box, compact treatment links, transparent header over hero */
body.single-post.wp-theme-astra.arefin-single-post-enhanced #masthead,body.single-post.wp-theme-astra.arefin-single-post-enhanced .site-header{position:absolute;top:0;left:0;right:0;width:100%;z-index:99;background:transparent;box-shadow:none;border-bottom:0}
body.single-post.wp-theme-astra.arefin-single-post-enhanced #masthead .main-header-bar,body.single-post.wp-theme-astra.arefin-single-post-enhanced #masthead .ast-primary-header-bar,body.single-post.wp-theme-astra.arefin-single-post-enhanced #masthead .main-header-bar-wrap,body.single-post.wp-theme-astra.arefin-single-post-enhanced #masthead .ast-above-header-wrap,body.single-post.wp-theme-astra.arefin-single-post-enhanced #masthead .ast-below-header-wrap{background:transparent;box-shadow:none;border-bottom:0}
body.single-post.wp-theme-astra.arefin-single-post-enhanced .ast-author-box,body.single-post.wp-theme-astra.arefin-single-post-enhanced .ast-single-author-box,body.single-post.wp-theme-astra.arefin-single-post-enhanced .ast-author-details,body.single-post.wp-theme-astra.arefin-single-post-enhanced #author-info{display:none}
body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-hero-title-link{color:inherit;text-decoration:none;transition:color 240ms ease,text-shadow 240ms ease}
body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-hero-title-link:hover,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-hero-title-link:focus-visible{color:hsl(var(--primary-bright));text-shadow:0 2px 20px hsl(0 0% 0% / .6),1px 0.7px 0 rgb(var(--hover-shadow-ink));outline:none}
body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main .info-box,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main .info-box p,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main .info-box li,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main .info-box strong{color:hsl(0 0% 12%)}
	body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main img,body.single-post.wp-theme-astra.arefin-single-post-enhanced .entry-content img,body.single-post.wp-theme-astra.arefin-single-post-enhanced article img,body.single-post.wp-theme-astra.arefin-single-post-enhanced article figure img,body.single-post.wp-theme-astra.arefin-single-post-enhanced article .wp-caption img{max-width:100%;height:auto;display:block;border-radius:12px;margin:0}body.single-post.wp-theme-astra.arefin-single-post-enhanced article figure,body.single-post.wp-theme-astra.arefin-single-post-enhanced article .wp-block-image,body.single-post.wp-theme-astra.arefin-single-post-enhanced article .wp-caption,body.single-post.wp-theme-astra.arefin-single-post-enhanced article p:has(> img){margin:0}
body.single-post.wp-theme-astra.arefin-single-post-enhanced .entry-header{display:none}body.single-post.wp-theme-astra.arefin-single-post-enhanced .ast-single-related-posts-container,body.single-post.wp-theme-astra.arefin-single-post-enhanced .post-navigation,body.single-post.wp-theme-astra.arefin-single-post-enhanced .nav-links{display:none}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-hero{position:relative;display:flex;align-items:flex-end;min-height:380px;overflow:hidden;background:hsl(var(--background))}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-hero-bg,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-hero-overlay{position:absolute;inset:0}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-hero-img{display:block;width:100%;height:100%;object-fit:cover;filter:brightness(.3)}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-hero-overlay{background:linear-gradient(to bottom,hsl(0 0% 0% / .2),hsl(0 0% 0% / .5) 60%,hsl(0 0% 0% / .7))}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-hero-inner{position:relative;z-index:1;width:100%;max-width:1248px;margin:0 auto;padding:112px 24px 48px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-breadcrumb ol{display:flex;align-items:center;flex-wrap:wrap;gap:8px;list-style:none;padding:0;margin:0 0 20px;font-family:Poppins,sans-serif;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:hsl(var(--primary-bright))}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-breadcrumb a{color:inherit;text-decoration:none}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-breadcrumb li:last-child a{color:hsl(0 0% 100%)}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-hero-title{font-family:Ubuntu,sans-serif;color:hsl(0 0% 100%);font-weight:700;line-height:1.16;margin:0;text-shadow:0 2px 20px hsl(0 0% 0% / .6);word-wrap:break-word;overflow-wrap:break-word}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-hero-meta{display:flex;flex-wrap:wrap;align-items:center;gap:12px 18px;margin-top:18px;font-family:Poppins,sans-serif;color:hsl(var(--primary-bright));font-size:.875rem;font-weight:500}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-hero-meta span{display:inline-flex;align-items:center;gap:7px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-content-section{background:hsl(var(--background));padding:48px 16px}body.single-post.wp-theme-astra.arefin-single-post-enhanced #page,body.single-post.wp-theme-astra.arefin-single-post-enhanced #content,body.single-post.wp-theme-astra.arefin-single-post-enhanced .site-content,body.single-post.wp-theme-astra.arefin-single-post-enhanced .content-area,body.single-post.wp-theme-astra.arefin-single-post-enhanced #primary,body.single-post.wp-theme-astra.arefin-single-post-enhanced .ast-container,body.single-post.wp-theme-astra.arefin-single-post-enhanced .ast-article-single,body.single-post.wp-theme-astra.arefin-single-post-enhanced .entry-content,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-content-section,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-layout{overflow:visible;overflow-x:visible;overflow-y:visible;transform:none;filter:none;perspective:none;contain:none}body.single-post.wp-theme-astra.arefin-single-post-enhanced .entry-content>.arefin-sp-layout,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-layout{display:grid;grid-template-columns:1fr;gap:32px;width:100%;max-width:1200px;margin:0 auto}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main{min-width:0}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main p,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main li{font-family:Poppins,sans-serif;color:hsl(var(--muted-foreground));line-height:1.85}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main h1,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main h2,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main h3,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main h4,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main h5,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main h6{font-family:Ubuntu,sans-serif;color:hsl(var(--foreground));line-height:1.25}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main p{margin:0 0 20px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main p strong,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-main li strong{color:inherit;font-weight:inherit}body.single-post.wp-theme-astra.arefin-single-post-enhanced .site-content #primary .ast-article-single{padding:0}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-sidebar{display:flex;flex-direction:column;gap:16px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-cta{padding:24px;border-radius:12px;background:hsl(var(--primary-bright) / .08);border:1px solid hsl(var(--primary-bright) / .2);text-align:center}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-cta-title,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-box-title{font-family:Ubuntu,sans-serif;font-weight:700;color:hsl(var(--foreground));margin:0 0 12px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-cta-text{font-family:Poppins,sans-serif;font-size:.875rem;color:hsl(var(--muted-foreground));line-height:1.6;margin:0 0 16px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-cta-actions{display:flex;flex-direction:column;gap:10px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:11px 18px;border-radius:9999px;font-family:Poppins,sans-serif;font-size:.875rem;font-weight:600;text-decoration:none;transition:background 240ms ease,color 240ms ease,border-color 240ms ease,box-shadow 240ms ease}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-btn-primary{background:hsl(var(--primary-bright));color:hsl(0 0% 100%);border:1px solid hsl(var(--primary-bright))}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-btn-primary:hover{background:hsl(var(--primary-darker));border-color:hsl(var(--primary-darker))}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-btn-ghost{background:transparent;color:hsl(var(--foreground));border:1px solid hsl(var(--border))}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-box{padding:20px;border-radius:12px;background:hsl(var(--card));border:1px solid hsl(var(--border))}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-links{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:2px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-link,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-contact-link{display:inline-flex;align-items:center;gap:8px;padding:7px 6px;min-height:0;font-family:Poppins,sans-serif;font-size:.875rem;color:hsl(var(--muted-foreground));text-decoration:none}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-link svg,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-contact-link svg{color:hsl(var(--primary-bright));flex-shrink:0}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-related{background:hsl(138 60% 95%);color:hsl(0 0% 8%);border-top:1px solid hsl(var(--border));padding:48px 16px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-related-inner{width:100%;max-width:1200px;margin:0 auto}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-related-title{font-family:Ubuntu,sans-serif;font-weight:600;color:hsl(0 0% 8%);text-align:center;line-height:1.2;margin:0 0 40px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-related-title span{color:hsl(var(--primary-bright))}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-related-grid{display:grid;grid-template-columns:1fr;gap:20px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-card{background:hsl(155 40% 8%);color:hsl(0 0% 98%);border:1px solid hsl(155 30% 14%);border-left:5px solid transparent;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px hsl(0 0% 0% / .08);transition:box-shadow 300ms ease,border-left-color 300ms ease;display:flex;flex-direction:column;height:100%;text-decoration:none}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-card:hover{border-left-color:hsl(var(--primary-bright));box-shadow:0 10px 25px hsl(0 0% 0% / .25)}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-card-thumb{width:100%;aspect-ratio:16 / 10;overflow:hidden}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-card-img{display:block;width:100%;height:100%;object-fit:cover}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-card-body{padding:16px 20px 20px;display:flex;flex-direction:column;flex:1}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-card-title{font-family:Ubuntu,sans-serif;font-size:1.05rem;font-weight:700;line-height:1.4;margin:0 0 12px;min-height:2.94em;color:hsl(0 0% 98%);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-card-title{transition:color 300ms ease,text-shadow 300ms ease}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-card:hover .arefin-sp-card-title{color:hsl(131 87% 55%);text-shadow:1px 0.7px 0 hsl(0 0% 0%)}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-card-meta{display:flex;align-items:center;gap:8px;list-style:none;padding:0;margin:0 0 14px;font-family:Poppins,sans-serif;font-size:.75rem;color:hsl(0 0% 72%)}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-card-meta li + li::before{content:"\2022";margin-right:8px;color:hsl(131 50% 45%)}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-card-excerpt{font-family:Poppins,sans-serif;font-size:.875rem;line-height:1.7;color:hsl(0 0% 82%);margin:0 0 18px;flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-card-readmore{display:inline-flex;align-items:center;gap:6px;font-family:Poppins,sans-serif;font-size:.8125rem;font-weight:600;color:hsl(131 87% 55%);text-decoration:none;transition:color 200ms ease,text-shadow 200ms ease}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-card:hover .arefin-sp-card-readmore{color:hsl(131 87% 70%);text-shadow:1px 0.7px 0 hsl(0 0% 0%)}@media (min-width:640px){body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-hero{min-height:480px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-hero-inner{padding:144px 24px 64px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-content-section{padding:64px 24px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .entry-content>.arefin-sp-layout,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-layout{gap:40px}}@media (min-width:768px){body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-related{padding:72px 24px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-related-grid{grid-template-columns:repeat(3,1fr)}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-card-thumb{aspect-ratio:auto;height:220px}}@media (min-width:1024px){body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-hero-inner{padding-top:176px;padding-bottom:96px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-content-section{padding-top:96px;padding-bottom:96px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .entry-content>.arefin-sp-layout,body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-layout{grid-template-columns:1fr 340px;gap:48px}body.single-post.wp-theme-astra.arefin-single-post-enhanced .arefin-sp-sidebar{position:-webkit-sticky;position:sticky;top:100px;align-self:flex-start;overflow:visible}}

body.single-post.wp-theme-astra.arefin-single-post-enhanced.arefin-single-post-compact .arefin-sp-sidebar,
body.single-post.wp-theme-astra.arefin-single-post-enhanced.arefin-single-post-compact .arefin-sp-treatments,
body.single-post.wp-theme-astra.arefin-single-post-enhanced.arefin-single-post-compact .arefin-sp-links{max-height:none;overflow:visible;overflow-x:visible;overflow-y:visible}
body.single-post.wp-theme-astra.arefin-single-post-enhanced.arefin-single-post-compact .arefin-sp-sidebar{gap:12px}
body.single-post.wp-theme-astra.arefin-single-post-enhanced.arefin-single-post-compact .arefin-sp-treatments,
body.single-post.wp-theme-astra.arefin-single-post-enhanced.arefin-single-post-compact .arefin-sp-box:has(.arefin-sp-links){padding:14px 16px}
body.single-post.wp-theme-astra.arefin-single-post-enhanced.arefin-single-post-compact .arefin-sp-treatments .arefin-sp-box-title,
body.single-post.wp-theme-astra.arefin-single-post-enhanced.arefin-single-post-compact .arefin-sp-box:has(.arefin-sp-links) .arefin-sp-box-title{margin-bottom:8px;padding-bottom:8px}
body.single-post.wp-theme-astra.arefin-single-post-enhanced.arefin-single-post-compact .arefin-sp-links{gap:0}
body.single-post.wp-theme-astra.arefin-single-post-enhanced.arefin-single-post-compact .arefin-sp-links li{margin:0;padding:0;line-height:1.2}
body.single-post.wp-theme-astra.arefin-single-post-enhanced.arefin-single-post-compact .arefin-sp-link{width:100%;min-height:26px;padding:4px 4px;line-height:1.2}
@media (min-width:640px){body.single-post.wp-theme-astra.arefin-single-post-enhanced.arefin-single-post-compact .arefin-sp-sidebar{gap:14px}}
</style>
	<?php
}


function arefin_sp_v26_print_sticky_repair_js() {
	if ( is_admin() || ! is_singular( 'post' ) ) return;
	?>
<script id="arefin-single-post-v26-sticky-repair">
(function () {
  var ready = function (fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  };
  function repair() {
    var roots = document.querySelectorAll('.arefin-sp-layout, .arefin-sp-sidebar');
    if (!roots.length) return;
    Array.prototype.forEach.call(roots, function (root) {
      var node = root.parentElement;
      while (node && node !== document.body) {
        var cs = window.getComputedStyle(node);
        if (cs.overflow !== 'visible' || cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
          node.style.overflow = 'visible';
          node.style.overflowX = 'visible';
          node.style.overflowY = 'visible';
        }
        if (cs.transform && cs.transform !== 'none') node.style.transform = 'none';
        if (cs.filter && cs.filter !== 'none') node.style.filter = 'none';
        if (cs.perspective && cs.perspective !== 'none') node.style.perspective = 'none';
        if (cs.contain && cs.contain !== 'none') node.style.contain = 'none';
        if (cs.willChange && cs.willChange !== 'auto') node.style.willChange = 'auto';
        node = node.parentElement;
      }
    });
    document.documentElement.style.overflowX = 'clip';
    document.body.style.overflowX = 'clip';
  }
  function schedule() {
    if (window.requestAnimationFrame) window.requestAnimationFrame(repair);
    else repair();
  }
  ready(schedule);
  window.addEventListener('load', schedule);
  window.addEventListener('resize', schedule);
}());
</script>
	<?php
}
