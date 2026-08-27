# Issue 07 — Mobile Menu Accordion Toggle Styling

## Summary
On mobile (< 1024px), the expanded accordion toggle (e.g., "Blog") had incorrect styling: no padding inside the button, no border-radius for the green pill shape, and missing border separators between menu items.

## Root Cause
The `.nav-mobile-link` class used `padding: 0.75rem 0` (no horizontal padding) and had no `border-bottom`. The `.nav-mobile-accordion.is-open .nav-mobile-toggle` state had no explicit styles for background, color, border-radius, or padding — those were likely inherited from the JS toggle but not visually styled in CSS.

## Fix (FD-CSS v1.2.3)
1. Added `padding: 0.75rem 1rem` to `.nav-mobile-link` for horizontal breathing room.
2. Added `border-bottom: 1px solid var(--ast-global-color-6)` to each menu item for visual separation.
3. Added `.nav-mobile-accordion.is-open .nav-mobile-toggle` styles: green background, white text, `border-radius: 0.5rem`, and transparent bottom border to form a clean pill shape.
4. Set chevron icon color to white when accordion is open.

## Prevention Rule
When adding new mobile accordion items or modifying toggle styles, always ensure the `.is-open` state includes: background color, text color, border-radius, and border override. All mobile nav items must have consistent horizontal padding and bottom borders.
