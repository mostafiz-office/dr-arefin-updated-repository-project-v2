# Issue #15 — Sticky Stack Card Background Colors

## Summary
The sticky stack cards in the WordPress export had outdated pastel background colors that didn't match the DesignMonks reference palette.

## Root Cause
The original card colors were generic pastels chosen during initial implementation. The DesignMonks reference design uses a more saturated, distinctive palette.

## Fix Description
Updated the background hex values for all four sticky stack card classes in `global.v1.2.3.css`:

| Card Class | Old Color | New Color | Name |
|-----------|-----------|-----------|------|
| `.caff-stack-card-1` | pastel mint | `#3DD9C0` | Teal |
| `.caff-stack-card-2` | pastel coral | `#FF6B5A` | Coral |
| `.caff-stack-card-3` | pastel gold | `#E6C44A` | Gold |
| `.caff-stack-card-4` | pastel lavender | `#7B8AE6` | Indigo |

## Files Changed
- `public/elementor-export/global.v1.2.3.css` — updated `.caff-stack-card-{1-4}` background colors

## Prevention Rules
1. Card background colors must match the DesignMonks reference palette documented in this issue.
2. When updating colors, ensure both React (`Index.tsx`) and WordPress export (`global.css`) are synced.

## Pending
- React `Index.tsx` sticky stack section still uses old inline colors — needs syncing (see Suggestion P01).
