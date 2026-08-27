# Mobile audit of /category/research/ — what the live page shows now

## Good news

- The stray CSS text at the top of the page is **gone**. The `</style>` fix worked.
- No horizontal page overflow at 390px or 820px (`scrollWidth == clientWidth`).
- Cards look right: 1 column on mobile, 2 columns on tablet, full titles, correct spacing.
- Hero, breadcrumb, "3 articles" count all render correctly.

## Still broken: the category strip

At 390px the "CATEGORIES" strip is still a row of thin slivers.

Measured live in a real browser:

- Each `<li>` in the strip is **1.5px wide** (computed `flex: 0 1 auto` — it is shrinking).
- The pill `<a>` inside keeps its natural width (97-241px), so all 28 pills overlap on top of each other. That is why you only see rounded edges.

Root cause: **the v1.4.4 fix is not on the live site at all.** I scanned every stylesheet loaded on the page — zero rules containing the `1023.98px` breakpoint. The page still loads the older `style#arefin-category-archive-fallback` from the PHP snippet, and the global CSS snippet also has no trace of the fix.

So this is a deployment problem, not a code problem: the updated PHP snippet and/or the updated global CSS were not actually saved/served yet (stale WPCode snippet, PHP opcache, or a SpeedyCache page still being served).

## Plan

1. **Harden the CSS so a single stale file can't break it again** — move `flex: 0 0 auto` onto the rail `<li>` in the *base* rule (the one that already ships and is already live-tested), not only inside the `max-width: 1023.98px` media query. The desktop block already resets the list to `display: block`, so the base rule is safe for 1024px+.
2. Keep the rest of the v1.4.4 block (scroll-snap, inline padding, touch scrolling, tablet hero padding) as-is.
3. Add a one-line version marker comment (`arefin-cat v1.4.5`) at the top of the fallback style block so I can tell from the live page whether the pasted snippet is current.
4. Apply the same change in all three copies: the PHP snippet, `global.css`, and `category.css`.

## Files to update

- `public/elementor-export/blocks/category/arefin-category-archive.php` (re-paste into WPCode)
- `public/elementor-export/global.css` (re-paste)
- `public/elementor-export/blocks/category/category.css` (reference copy)
- `public/elementor-export/DEPLOYMENT.md` (v1.4.5 note)

## On your side after I ship it

1. Re-paste the PHP snippet in WPCode and press **Update** (confirm the snippet is Active).
2. Re-paste `global.css` into the CSS snippet and Update.
3. Purge SpeedyCache, then open `/category/research/` in a private window.

I will then re-measure the live page at 390px and 820px and send screenshots to confirm.
