# Category Archive — 2-Column Cards, Active Category First, Bottom Padding

## What changes

1. **Two cards per row instead of three.** Right now the grid uses `repeat(auto-fill, minmax(260px, 1fr))`, so with a 300px rail it fits three narrow cards and titles truncate ("Neuroendocrine Tumor of the Ampulla of Vater: A…"). It becomes a fixed 2-column grid on desktop (1 column on mobile), so cards are wider, images larger, and titles/excerpts breathe.

2. **Active category pinned to the top of the rail.** The rail currently lists categories by post count, so the active one (Research, 3) sits near the bottom. The active term will be rendered first, then "All Articles", then the remaining categories in the current count order. The active row keeps its green treatment and `aria-current="page"`.

3. **Bottom padding fix.** The last rail row and the last card row currently sit flush against the section end. The articles band gets proper bottom padding and the rail gets bottom padding inside its card, so nothing touches the edge.

## Layout after the change

```text
┌──────────────────────────────────────────────┐
│  HERO (dark): breadcrumb, H1, count, desc    │
├──────────────────────────┬───────────────────┤
│  card        card        │  CATEGORIES       │
│  card        card        │  Research      3  │← active first
│  card        card        │  All Articles     │
│  PAGINATION              │  Gallbladder  32  │
│                          │  Liver …      20  │
└──────────────────────────┴───────────────────┘
      bottom padding                bottom padding
```

## Technical changes

**`public/elementor-export/blocks/category/arefin-category-archive.php`** (v1.3.0)
- `arefin_cat_v10_rail_markup()`: pull the active term out of the loop and emit it as the first `<li>`, then "All Articles", then the rest.
- Bump the version constant/header and keep the inline fallback `<style>` in sync with the CSS below.

**`public/elementor-export/blocks/category/category.css`**
- `.arefin-cat-main .articles-grid`: `grid-template-columns: 1fr` on mobile, `repeat(2, minmax(0, 1fr))` from 768px up; remove the `auto-fill/260px` rule.
- Add bottom padding to `.arefin-category-archive .articles-light-band` and to `.arefin-cat-rail`.

**`public/elementor-export/global.css`**
- Mirror the same block so the pasted global CSS matches the PHP fallback exactly.

**`public/elementor-export/DEPLOYMENT.md`**
- Bump to v1.3.0.

## What you re-paste in WordPress

The PHP snippet in WPCode, and the global CSS snippet. Then purge SpeedyCache and check `/category/research/` in a private window.

No React app files change.
