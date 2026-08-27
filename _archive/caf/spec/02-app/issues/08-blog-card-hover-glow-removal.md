# Issue 08 — Blog Card Hover Glow Removal

## Summary
Blog archive cards on WordPress had an excessive glowing `box-shadow` on hover (`0 12px 32px rgba(0,0,0,0.1)`) that looked unprofessional. The green left-border accent on hover was correct but the glow amplified visual noise.

## Root Cause
The WordPress override selector `body.blog.ast-separate-container .ast-article-post.ast-archive-post:hover` applied a large, blurred box-shadow meant for depth but was too aggressive for the card design. The static export `.caff-blog-card:hover` had a similar issue.

## Fix
1. Set `box-shadow: none` on both `.caff-blog-card:hover` and the WordPress override hover selector.
2. Kept `transform: translateY(-4px)` lift and `border-left: 3px solid #379237` green accent.
3. Default state already has `border-left: 3px solid transparent` to prevent layout shift.
4. Renamed `blog.css` → `blog.v1.2.1.css` per versioning standard.

## Prevention Rule
**Blog card hover effects now use a subtle drop shadow (`0 10px 30px rgba(0, 0, 0, 0.08)`) matching Atto Property's design.** The green left-border accent and lift remain as primary hover feedback. Aggressive blurred glows are still prohibited — only this calibrated shadow is allowed.
