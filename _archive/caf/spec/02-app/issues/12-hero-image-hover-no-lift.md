# Issue #12 — Hero Image Hover: Remove Lift, Add Right-Side Border

## Summary
The hero image hover effect used `translateY(-2px)` which shifted the image position upward on hover. This violated the project's no-position-shift hover constraint and was visually jarring.

## Root Cause
Both `src/index.css` (`.img-shadow:hover`) and `global.v1.2.3.css` (`.caff-img-shadow:hover`, `.caff-hero-image:hover`) applied `transform: translateY(-2px)` along with a full-border `box-shadow: 0 0 0 3px`.

## Fix Description
1. **Removed** `transform: translateY(-2px)` entirely from both React and WordPress CSS.
2. **Removed** `transform` from the transition property (no longer needed).
3. **Replaced** the spread-only ring (`0 0 0 3px`) with a **right-side-only** drop shadow: `box-shadow: 3px 0 0 0` — zero blur, 1px-style clean edge on the right, inspired by Atto Property's blog card left-border hover effect.

## Files Changed
- `src/index.css` — `.img-shadow` / `.img-shadow:hover`
- `public/elementor-export/global.v1.2.3.css` — `.caff-img-shadow` / `.caff-hero-image` hover rules

## Prevention Rules
1. **Never use translateY, translateX, or any position-shifting transform on image hover**. This is a global project constraint.
2. **Image hover effects must be non-positional**: only box-shadow, border-color, filter, or opacity changes are permitted.
3. **Preferred image hover pattern**: A single-side border shadow (`Npx 0 0 0` or `0 0 0 Npx`) with zero blur, providing a clean accent edge without affecting layout or position.
