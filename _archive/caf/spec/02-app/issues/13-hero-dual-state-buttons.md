# Issue #13 — Hero Dual-State Buttons (Atto Property Style)

## Summary
The hero CTA buttons were static with no hover text/icon swap. Implemented Atto Property-style dual-state buttons that swap content on hover with a vertical slide animation.

## Implementation

### Mechanism
Each button contains two overlapping `<span>` layers:
- **Normal state**: visible by default, slides up and fades out on hover
- **Hover state**: hidden below (translateY(100%)), slides up into view on hover

### Button Mapping
| Button | Normal State | Hover State |
|--------|-------------|-------------|
| Primary (green) | "Prenota Appuntamento →" | "📞 Chiama Ora" |
| Secondary (outline) | "Esplora Servizi" | "Scopri →" |

### CSS Properties
- `overflow: hidden` on button container to clip sliding content
- `transition: transform 0.3s ease, opacity 0.3s ease` for smooth swap
- Normal: `translateY(0)` → `translateY(-100%)` on hover
- Hover: `translateY(100%)` → `translateY(0)` on hover
- No position shift on the button itself — animation is internal only

## Files Changed
- `src/pages/Index.tsx` — React dual-state button markup
- `public/elementor-export/blocks/homepage/01-hero.html` — WordPress HTML
- `public/elementor-export/global.v1.2.3.css` — `.caff-dual-btn` CSS classes

## WordPress Deployment Guide
1. **Update HTML**: In Elementor, edit the Hero section HTML widget. Replace the `<div class="caff-hero-buttons">...</div>` block with the new markup from `blocks/homepage/01-hero.html` (lines 33–42). The new HTML wraps each button's content in two `<span>` elements (`caff-dual-btn-normal` and `caff-dual-btn-hover`).
2. **Update CSS**: In WPCode, find the `global.v1.2.3.css` snippet. Add the `.caff-dual-btn` CSS block (search for "Dual-State Button" in the CSS file).
3. **Both are required**: CSS alone will NOT work — the HTML must contain the two-span structure for the slide animation. Updating only CSS without updating HTML will have no visible effect.
4. **Clear cache** and verify hover effect on both buttons.

## Prevention Rules
1. Dual-state buttons must always use `overflow: hidden` to clip sliding content.
2. The hover animation is internal (content swap) — the button itself must NOT shift position.
3. Both states must have identical padding/sizing to prevent layout jumps.
4. **Deployment rule**: Any feature requiring new HTML structure must include explicit deployment instructions noting that BOTH HTML and CSS updates are needed.
