# Issue 06 — Sticky Stack Cards Not Stacking on WordPress

## Summary

The sticky stack cards (`position: sticky`) scrolled as normal content instead of stacking one-by-one on the live WordPress/Elementor site.

## Root Cause

Two categories of issues were identified:

### Category A: Ancestor Properties (Fixed in v1.2.0)
Three CSS properties on ancestor elements break `position: sticky`:
1. **`overflow`** — Elementor's `.e-con-boxed` / `.e-con-inner` apply `overflow: hidden`. Astra applies `overflow-x: hidden` on `body`.
2. **`transform`** — Any ancestor with `transform` other than `none` creates a new containing block, breaking sticky.
3. **`contain`** — CSS `contain: layout | content | strict | paint` also breaks sticky.
4. **`will-change: transform`** — Same effect as an active transform.

### Category B: Wrong Sticky Target (Fixed in v1.2.1 — THE REAL FIX)
When full-card `<a class="caff-stack-card-link-wrap">` wrappers were added for clickability, `position: sticky` remained on the inner `.caff-stack-card` div. But `sticky` positions an element **within its parent's scrollable bounds**. Since each `<a>` wraps tightly around its card (no extra height), there's zero room for the card to "stick" — it scrolls away with the `<a>`.

**The fix**: Move `position: sticky`, `top`, `z-index`, and `margin-bottom` to `.caff-stack-card-link-wrap` (the `<a>` tag) so each link wrapper is sticky within `.caff-stack-container`.

## Fix

### v1.2.2 CSS — Sticky on `<a>` Wrapper
```css
/* .caff-stack-card — NO position:sticky */
.caff-stack-card {
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

/* .caff-stack-card-link-wrap — IS the sticky element */
.caff-stack-card-link-wrap {
  display: block;
  position: sticky;
  margin-bottom: 1.5rem;
}
.caff-stack-card-link-wrap:nth-child(1) { top: 130px; z-index: 1; }
.caff-stack-card-link-wrap:nth-child(2) { top: 150px; z-index: 2; }
.caff-stack-card-link-wrap:nth-child(3) { top: 170px; z-index: 3; }
.caff-stack-card-link-wrap:nth-child(4) { top: 190px; z-index: 4; }
```

### v1.2.0 JS (ancestor neutralizer — still required)
Section 7 in `caff-interactivity.js` walks the entire DOM tree from `.caff-stack-section` up to and including `body` and `html`, neutralizing overflow, transform, will-change, and contain.

## Prevention Rule

1. **`position: sticky` MUST be on the outermost element** that is a direct child of the scrolling container. If a clickable `<a>` wrapper is added around a sticky card, the sticky MUST move to the `<a>`.
2. **Any `position: sticky` component MUST include a JS ancestor neutralizer** in `caff-interactivity.js` that fixes ALL four sticky-breaking properties (overflow, transform, will-change, contain) on every ancestor including `body` and `html`.

## Iteration History

| Attempt | Approach | Result |
|---------|----------|--------|
| 1 | CSS `:has()` selectors in global.css v1.2.2 | ❌ Elementor inline styles override |
| 2 | JS DOM-walk v1.1.0 — overflow only, skips body/html | ❌ Missed body overflow-x, transform, contain |
| 3 | JS DOM-walk v1.2.0 — all 4 properties, includes body/html | ⚠️ Ancestor fix correct, but sticky on wrong element |
| 4 | Move `position: sticky` from `.caff-stack-card` to `.caff-stack-card-link-wrap` | ✅ Definitive fix |

## Files Changed

- `public/elementor-export/global.v1.2.2.css` — Sticky moved to `<a>` wrapper
- `public/elementor-export/blocks/caff-interactivity.js` — JS v1.2.0 ancestor neutralizer (unchanged)
- `.lovable/knowledge.md` — Updated prevention rule
