# Category Archive — Active Pill Hover Fix + Sticky Category Sidebar

## 1. The active-pill hover bug (confirmed)

The active pill is green-filled with white text. On hover, the generic pill rule in `global.css` (line 8454) sets `color: hsl(var(--primary-bright))` — the same green as the pill's own background — so the label disappears and only the count `(3)` stays readable. That is exactly what your screenshot shows.

Fix: give `.news-category-pill.is-active` its own hover state that keeps text white, darkens the green slightly (`--primary-darker`), and keeps the count legible. Also add `:focus-visible` parity and `aria-current="page"` on the active pill for accessibility.

## 2. Moving the category list to a sticky right rail

My honest take: yes, this is the better layout — but only on desktop.

Why it is better:
- Right now 25+ pills eat the entire first screen. A visitor landing on `/category/research/` scrolls past a wall of pills before seeing a single article. Content should come first.
- A right rail turns the taxonomy into persistent navigation instead of a one-time blocking band, so a reader can jump categories from anywhere on the page.
- It matches the single-post page, which already uses a two-column body + sidebar. The category page becomes visually consistent with it.

Trade-offs to be aware of:
- Below ~1024px there is no room for a rail. On tablet/mobile the list must collapse back to a horizontally scrollable pill row (or a "Browse categories" disclosure) placed *below* the hero, not above the grid.
- With a rail, the article grid drops from 3 columns to 2. That is fine — the cards get more breathing room and titles stop truncating.
- 25 categories in a vertical rail is tall. The rail will use a compact vertical list (name + count, not pills), capped with its own internal scroll so the sticky box never exceeds the viewport height.

## Proposed layout

```text
┌──────────────────────────────────────────────┐
│  HERO (full-bleed dark): breadcrumb, H1,     │
│  count, description                          │
├──────────────────────────┬───────────────────┤
│  ARTICLE GRID (2 cols)   │  CATEGORIES       │
│  card  card              │  (sticky, top:110)│
│  card  card              │  All Articles     │
│  card  card              │  Research      3  │
│  PAGINATION              │  Liver …      20  │
│                          │  … scrollable     │
└──────────────────────────┴───────────────────┘
```

- Grid area: `minmax(0,1fr) 300px`, gap 40px, max-width from `.arefin-container`.
- Rail: `position: sticky; top: 110px; max-height: calc(100vh - 140px); overflow-y: auto;` with a subtle scrollbar, card background, 1px border, rounded.
- Rail items: full-width rows, name left, count right in muted text, active row gets the green treatment (correct hover included).
- < 1024px: single column, rail renders above the grid as a horizontal scroll strip of pills.

## Technical changes

**`public/elementor-export/blocks/category/arefin-category-archive.php`** (v1.2.0)
- Wrap grid + pagination and the category list in a new `.arefin-cat-layout` two-column wrapper.
- Change the pill renderer to a rail renderer (`.arefin-cat-rail`, `.arefin-cat-rail-item`, `.arefin-cat-rail-count`), keep the "All Articles" row first, mark the current term with `is-active` + `aria-current="page"`.
- Keep the same PHP fallback `<style>` block in sync with the CSS file.

**`public/elementor-export/blocks/category/category.css`**
- Add `.arefin-cat-layout` grid, `.arefin-cat-rail` sticky styles, rail item states, mobile collapse.
- Add the corrected active hover/focus rules.

**`public/elementor-export/global.css`**
- Mirror the same block so the pasted global CSS matches the PHP fallback exactly.

**`public/elementor-export/DEPLOYMENT.md`**
- Bump to v1.2.0, note: re-paste the PHP snippet + CSS, then purge SpeedyCache and verify in a private window.

No React app files change.

## One decision for you

Should the rail be on the **right** (as you suggested, reading order = content first) or the **left**? Right is my recommendation and what the plan assumes.
