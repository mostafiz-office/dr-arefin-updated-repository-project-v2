# Issue #14 — Trust Strip Inline Color Override

## Summary
The trust strip (4-stat bar below hero) displayed old colors (#5CD6C4) instead of the DesignMonks palette because Elementor applies inline `style="background-color:..."` on container elements, which has higher specificity than any CSS class selector.

## Root Cause
Elementor's drag-and-drop editor stores background colors as inline styles directly on the container HTML elements. Inline styles have the highest CSS specificity (only `!important` can override them), and the project prohibits `!important`.

## Fix Description
Added a JavaScript runtime override in `caff-interactivity.js` that:
1. Selects elements by their utility CSS classes (`.caff-strip-teal`, `.caff-strip-cyan`, etc.)
2. Applies the correct hex value directly via `el.style.backgroundColor`
3. Runs after DOM load, overriding Elementor's inline styles

### Color Map
| CSS Class | Hex Color |
|-----------|-----------|
| `.caff-strip-teal` | `#3DD9C0` |
| `.caff-strip-cyan` | `#2BC4D6` |
| `.caff-strip-indigo` | `#7B8AE6` |
| `.caff-strip-gold` | `#E6C44A` |

## Alternative Solution (Preferred)
In Elementor, remove the background color from each container's **Style → Background** setting (set to transparent/none), then add the CSS class in **Advanced → CSS Classes**. This avoids the JS workaround entirely.

## Files Changed
- `public/elementor-export/blocks/caff-interactivity.js` — added strip color override block
- `public/elementor-export/global.v1.2.3.css` — CSS classes already existed

## Iterations
1. First attempted CSS-only fix with high-specificity selectors — failed because inline styles beat any selector chain
2. Added JS runtime override as workaround — works

## Prevention Rules
1. **Never set background colors via Elementor's Style panel** when custom CSS classes exist for that element. Always use Advanced → CSS Classes.
2. When Elementor inline styles cannot be removed, use JS runtime overrides in `caff-interactivity.js` as a last resort.
3. Document the JS override color map so future color changes are made in both CSS and JS.
