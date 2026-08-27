# Issue 04 — Footer Padding Missing on Blog/Single-Post Pages

## Summary
The footer on blog and single-post pages had no top padding, causing the footer content to appear cramped against the CTA band above it. The `.caff-footer-pad` utility class (and several other footer utility classes) existed in `global.css` but were never synced to `blog.css` and `single-post.css`.

## Root Cause
When footer utility classes were added to `global.css` during iterative development, they were not propagated to the blog-specific CSS files. Since blog and single-post pages load their own CSS (not global.css), the footer lost its padding and several layout utilities.

## Missing Classes
- `.caff-footer-pad` — padding-top: 4rem; padding-bottom: 5rem
- `.caff-mb-6` — margin-bottom: 1.5rem
- `.caff-footer-brand-heading` — margin-bottom: 1rem
- `.caff-footer-desc-text` — description text styling
- `.caff-footer-contact-link` — inline-flex contact link layout

## Fix
Added all missing footer utility classes to both `blog.css` and `single-post.css` after the existing footer section.

## Prevention Rule
**Every time a new utility or component class is added to `global.css`, it MUST also be added to `blog.css` and `single-post.css` if that class is used in the header or footer HTML blocks (which appear on all page types).** A sync audit should be performed after any global.css footer/header changes.
