# Issue 09 — Blog Hero Subtitle Missing on WordPress

## Summary
The blog archive page hero section displayed only "Notizie Fiscali" with no subtitle/description text, despite the HTML block containing a `<p class="caff-page-hero-subtitle">` element. Other pages (Chi Siamo, Servizi, Contatto) showed subtitles correctly.

## Root Cause
The blog page loads `blog.css` instead of `global.css`. The `.caff-page-hero`, `.caff-page-hero-title`, and `.caff-page-hero-subtitle` class definitions existed only in `global.css` and were never synced to `blog.css`. Without styling, the subtitle text rendered as invisible or collapsed.

## Fix
1. Added all `.caff-page-hero*` styles to `blog.v1.2.1.css` (synced from global.css).
2. Enhanced hero HTML with keyword-rich subtitle containing internal links to `/caf-730-online/`, `/caf-isee/`, `/patronato-inps/`, `/caf-dichiarazione-redditi/`, and location contact pages.
3. Added link styles for subtitle anchors (underlined, white on hover).
4. Applied `font-weight: 400` to `<strong>` tags per SEO link styling standard.

## Prevention Rule
**Every time page hero styles are modified in `global.css`, they MUST also be synced to `blog.css` and `single-post.css`.** This extends the existing sync rule from Issue 04 (footer padding) to cover ALL shared component styles.
