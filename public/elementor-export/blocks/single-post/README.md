# Single Blog Post — WordPress Export

CAF-style port of the React `ArticleSingleDark.tsx` preview into the live
WordPress single post template. Layout, sticky sidebar and related band are
injected with PHP through the post content filter, so it works whether a post is
still using Elementor Single Template output or the native Astra single template.

Current hardened version: **AREFIN-SINGLE-POST v2.4.0**.

Reference design:
https://drarefin-v4.lovable.app/articles/gallbladder-stone-laparoscopic-removal/

## Files

| File | Where it goes |
|------|---------------|
| `arefin-single-post.php` | WPCode → **PHP Snippet**, Run Everywhere, Priority 10, Active |
| `single-post.css` | WPCode → **HTML Snippet**, condition `Singular > Posts`, Header, Priority 999 |
| `sidebar.html` | Static reference only — the markup the PHP injects |
| `00-head.html` | Reference for the per-post `<head>` meta / JSON-LD (handled by SEO plugin) |

> `single-post.css` must load **after** `global.css` (tokens, fonts, header,
> footer) and `article.css` (which styles `.entry-content` typography).

## How the CAF way works

The checked live URL still outputs Elementor Single Template `2490`, so Astra
content hooks do not fire there. The PHP snippet wraps the real post body
through WordPress `the_content` on every `is_singular('post')` post:

```text
the_content before return → open .arefin-sp-layout > .arefin-sp-main
[ Elementor Post Content widget output here ]
the_content after content → close .arefin-sp-main
                         → inject .arefin-sp-sidebar (CTA, treatments, contact)
                         → close .arefin-sp-layout
                         → inject .arefin-sp-related (3 newest posts, current excluded)
```

This keeps the CAF deployment style, but avoids depending on Elementor-specific
or Astra-specific wrapper hooks.

## Deployment steps

1. Disable/delete every older `AREFIN-SINGLE-POST` WPCode PHP snippet first. Only one single-post PHP snippet should remain active.
2. Paste `arefin-single-post.php` into WPCode → PHP Snippet → **Run Everywhere** → Priority 10 → Active.
3. Paste `single-post.css` into WPCode → **HTML Snippet** → condition `Singular > Posts` → Header → Priority 999 → Active.
4. Ensure `global.css` is deployed. `article.css` is optional because v2.3.0 includes a PHP-printed emergency CSS fallback.
5. Also deploy the latest `arefin-interactivity.js` globally; it now neutralizes Astra/Elementor overflow ancestors for `.arefin-sp-layout` / `.arefin-sp-sidebar`.
6. Purge WP + CDN cache and hard-refresh any post URL.

## Live debug checklist

On a working live post, page source must contain all of these markers:

- `<!-- AREFIN-SINGLE-POST v2.4.0 sticky-repair active -->`
- `id="arefin-single-post-v23-fallback"`
- `id="arefin-single-post-v24-sticky-repair"`
- `.arefin-sp-hero`
- `.arefin-sp-content-section`
- `.arefin-sp-layout`
- `.arefin-sp-sidebar`

If `.arefin-sp-layout` exists but `.arefin-sp-hero` and `.arefin-sp-content-section` are missing, WordPress is still running the old PHP snippet. Replace the WPCode PHP snippet with this file and purge cache.

If PHP markers exist but styles are missing, the CSS snippet is not loaded. v2.3.0 still prints fallback CSS from PHP, so the page should not be raw/broken while the separate CSS snippet is fixed.

## Acceptance

- Post renders in a 2-column grid on desktop (≥1024px): content left, sticky sidebar right.
- Sidebar shows: Book a Consultation CTA (Book Appointment + Call Now), Our Treatments links, Quick Contact (phone / WhatsApp / email).
- Below the article: a dark "Related Articles" band with 3 light Atto cards (current post excluded), Atto hover (green left border + 8px sharp shadow + dark-green title).
- Mobile (<1024px): sidebar stacks under the content, related grid collapses to 1 column.
- Desktop sticky test: when scrolling down and back up, `.arefin-sp-sidebar` remains pinned below the header until the article grid ends; ancestor `overflow` / `transform` must not cancel sticky positioning.
- No `!important`, no inline styles, all post data pulled from the CMS.
