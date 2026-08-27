# Issue #16 — CTA Band Dual-State Buttons (Atto Property Style)

## Summary
Applied the same dual-state hover animation from the hero section to the CTA Band buttons. On hover, button text swaps with a vertical slide transition.

## Button Mapping
| Button | Normal State | Hover State |
|--------|-------------|-------------|
| Primary (green) | "Prenota Appuntamento →" | "📞 Chiama Ora" |
| Secondary (outline) | "Contattaci" | "✉️ Scrivici" |

## Implementation
Reuses the existing `.caff-dual-btn` CSS classes (two-span structure with `overflow: hidden` and vertical slide animation). No new CSS was needed.

## Files Changed
- `src/components/CTABand.tsx` — React dual-state button markup
- `public/elementor-export/blocks/global/cta-band.html` — WordPress HTML

## WordPress Deployment
1. **Update HTML**: Replace the CTA Band HTML widget content with the new markup from `blocks/global/cta-band.html`. The buttons now use the `caff-dual-btn` class with two `<span>` children.
2. **No CSS changes needed** — the `.caff-dual-btn` classes already exist in `global.v1.2.3.css`.
3. Clear cache and verify hover effect.

## Prevention Rules
1. All CTA buttons site-wide must use the dual-state pattern for consistency.
2. The hover animation is internal (content swap) — the button itself must NOT shift position.
3. Both states must have identical padding/sizing to prevent layout jumps.
