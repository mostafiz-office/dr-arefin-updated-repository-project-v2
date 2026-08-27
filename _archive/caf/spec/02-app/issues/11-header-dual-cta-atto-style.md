# Issue #11 — Header Dual CTA: Atto Property Style

## Summary
Updated the header dual CTA button ("Chiamaci Or Contattaci") to match the Atto Property design exactly: unified pill container, floating "Or" circle with depth shadow, brightness-only hover effects.

## Changes from Previous Design

### "Or" Circle (Key Visual Change)
- **Size**: 30×30px (was 32×32px) — slightly tighter for premium feel
- **Shadow**: `0 2px 10px rgba(0,0,0,0.15)` — deeper floating shadow creating the "levitating" depth effect (was `0 1px 2px`)
- **Border**: `1px solid rgba(0,0,0,0.08)` — subtler border
- **Font**: 11px bold (was 12px)

### Container
- **Border**: Added subtle `1px solid rgba(0,0,0,0.06)` outer border
- **Shadow**: `0 2px 8px rgba(0,0,0,0.08)` — soft container shadow

### Hover (No Position Shifts)
- **"Chiamaci" (dark)**: `filter: brightness(1.25)` — navy lightens noticeably on hover
- **"Contattaci" (green)**: `filter: brightness(1.1)` — green brightens subtly
- **Removed**: `translateY(-1px)` lift — violates global no-position-shift rule
- **Transition**: 0.3s ease (was 0.2s)

### Padding
- **Buttons**: `px-6` / `1.5rem` (was `px-5` / `1.25rem`) — more breathing room

## Files Changed
- `src/components/Header.tsx` — React dual CTA
- `public/elementor-export/global.v1.2.3.css` — WordPress CSS
- `public/elementor-export/blocks/global/header.html` — (no structural change needed)

## WordPress Deployment
1. Copy `global.v1.2.3.css` content to WPCode "Global CSS" snippet
2. No HTML changes needed — structure is identical

## Prevention Rules
1. Dual CTA hover must ONLY use `filter: brightness()` — no translateY, scale, or position shifts.
2. "Or" circle must always have a visible depth shadow (`box-shadow`) to create the floating effect.
