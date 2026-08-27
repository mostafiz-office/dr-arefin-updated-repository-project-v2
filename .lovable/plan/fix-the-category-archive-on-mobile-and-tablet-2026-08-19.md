# Fix the category archive on mobile and tablet

## What I checked

I loaded the live page `https://drarefin.com/category/research/` in a real browser at 390px (mobile) and 820px (tablet) and measured the DOM.

Findings:

- **The category strip is broken.** Below 1024px the rail renders as a horizontal flex row with `overflow-x: auto`, but the pills have no `flex: 0 0 auto`. So every pill shrinks to a few pixels wide — on mobile they are unreadable slivers, on tablet you see one or two letters per pill ("Go", "Liv", "Di", "P"...). Measured: pills report a content width of 180-300px but are squeezed into the 346px row.
- **The active pill is squeezed too**, so on mobile the "Research" label is not visible at all.
- Page-level horizontal overflow is fine (`scrollWidth == clientWidth` at both sizes) — the article cards, hero and 2-up grid behave correctly. The tablet grid is 2 columns, mobile 1 column, as intended.
- Secondary: on tablet the dark hero has a large empty gap above the breadcrumb (extra top padding from the Astra shell), and the strip has no visual hint that it scrolls sideways.

## What I'll change

All in the category CSS (`blocks/category/arefin-category-archive.php` fallback block, `blocks/category/category.css`, and `global.css` — same block in all three):

1. **Stop the pills from shrinking** — `flex: 0 0 auto` on the rail list items and pill anchors below 1024px, so each pill keeps its natural width and the row scrolls horizontally as designed.
2. **Make the strip feel scrollable** — snap scrolling, a little inline padding so the first/last pill isn't clipped by the card edge, and smooth touch scrolling.
3. **Keep the active pill first and fully readable** on small screens (it already renders first; it just needs the no-shrink fix).
4. **Tighten the hero top padding** on tablet so the dark band doesn't open with a big empty gap.
5. Reset the desktop rules so the 1024px+ sticky vertical rail is unaffected.

No markup or PHP logic changes are needed — the fix is CSS only.

## Files updated

- `public/elementor-export/blocks/category/arefin-category-archive.php` (WPCode snippet — re-paste)
- `public/elementor-export/global.css` (re-paste/append)
- `public/elementor-export/blocks/category/category.css` (reference copy)

After deploying: purge SpeedyCache, then re-check the page on a phone and tablet width in a private window. I'll re-run the browser check at 390px, 768px and 1024px against the live page once you've pasted it.
