# Issue #10 — Hero Floating Card: Animation & Interactivity

## Summary
The hero floating card ("730 Completato – Rimborso in arrivo") lacked entrance animation, hover interactivity, and was not clickable. Users could not navigate to the related service page.

## Root Cause
The card was a static `<div>` with no animation keyframes, no hover states, and no link wrapper.

## Fix Description

### Entrance Animation
- **Keyframe**: `float-card-in` — slides from right (`translateX(40px)`) with slight scale-down (`scale(0.92)`) to final position.
- **Timing**: 0.8s with `cubic-bezier(0.16, 1, 0.3, 1)` easing, delayed 1.5s after page load for staggered premium feel.

### Hover Animation (In-Place Only)
- **Border highlight**: transitions to `primary/50` border with a sharp zero-blur `box-shadow` (`0 0 0 1px`) — no glow, no blur spread.
- **Background**: subtle brightness increase (`rgba(255,255,255,0.14)`).
- **Icon**: `scale(1.1) rotate(8deg)` for playful micro-interaction.
- **Title text**: transitions to `primary-light` green.
- **NO position shifts**: No `translateY`, no lifts. Element stays exactly in place.

### Link
- Wrapped in `<a>` / `<Link>` pointing to `/caf-730-online/`.

## Files Changed
- `src/pages/Index.tsx` — React floating card
- `tailwind.config.ts` — `float-card-in` keyframe + animation
- `public/elementor-export/global.v1.2.3.css` — WordPress animation + hover styles
- `public/elementor-export/blocks/homepage/01-hero.html` — `<div>` → `<a>` wrapper

## Prevention Rules
1. **No position-shifting hover animations**: Never use `translateY`, `translateX`, or any transform that changes element position on hover. All hover effects must keep the element in its original position.
2. **Permitted hover effects**: border glow, box-shadow, background color/opacity shifts, icon scale/rotation, text color transitions, filter changes.
3. This constraint applies globally to all interactive elements, not just the floating card.
