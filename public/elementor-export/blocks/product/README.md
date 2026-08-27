# Product — WooCommerce single-product restyle

`product.css` is a **CSS-only** restyle of the default Astra + WooCommerce
single-product template (`/product/<slug>/`). No markup edits — it skins the
markup WooCommerce already outputs so the page matches the Dr. Arefin dark brand.

## What it fixes
- Empty grey box → the short-description `<pre>` is reset and turned into a
  branded card (green left border, dark surface, readable Poppins text).
- Full-bleed layout → centered 1248px container, gallery/summary 2-col grid.
- Default WooCommerce price/title/button → fluid Ubuntu title, green sale price,
  pill-shaped green **Book Appointment** button, dark quantity input.
- Tabs (Description / Reviews) → dark pill tabs.
- Responsive: stacks to one column ≤900px.

## Where to paste in WordPress
Pick **one** (recommend WPCode so it ships with the rest of the export):

1. **WPCode → Add Snippet → HTML** (recommended)
   - Paste the whole file *including* the `<style>…</style>` wrapper.
   - Location: **Site Wide Header**. Auto-insert.
   - Title: `AREFIN-PRODUCT-CSS`.

2. **Appearance → Customize → Additional CSS**
   - Paste the CSS **without** the `<style>` and `</style>` lines.

## Prerequisites
- `global.css` enqueued site-wide (provides the brand tokens). `product.css`
  also ships local token fallbacks, so it still works if global.css is missing.
- Astra page template for the product is fine as-is (default WooCommerce).

## House rules
- No `!important`, no inline styles. Beats Astra/Woo via deep
  `body.wp-theme-astra.single-product …` selector chains.
- Tokens consumed from `global.css` (`--primary-bright`, `--background`, etc.).
