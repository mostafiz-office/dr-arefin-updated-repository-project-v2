# Product Page Redesign Spec — WooCommerce Single Product

> Route: `/product/<slug>/` (e.g. `/product/doctor-arefin-online-consultation-appointment/`)
> Type: WooCommerce **simple product** rendered by the default Astra + WooCommerce template.
> Approach: **CSS-only restyle** — no markup/PHP changes. Skin the existing WooCommerce output.
> Asset: `public/elementor-export/blocks/product/product.css`

---

## 1. Problem (current state)

The product page uses the raw Astra + WooCommerce template, so it does **not**
match the Dr. Arefin dark brand. Observed issues:

1. **Empty grey box** under the price — the WooCommerce *short description* was
   authored as a `<pre>` containing a `<span>` with Tailwind arbitrary classes
   (`bg-[var(--bg-muted)]/[0.4]`). Those classes don't exist in WordPress, so it
   renders as a default light-grey `<pre>` block with monospace text.
2. **Full-bleed, off-grid layout** — gallery and summary are not constrained to
   the 1248px brand container; alignment doesn't match other pages.
3. **Unstyled price** — `<del>`/`<ins>` use default WooCommerce styling; the sale
   price isn't in brand green.
4. **Default WooCommerce button + quantity** — the white quantity input and the
   green-but-square "Book Appointment" button don't match the brand pill CTA.
5. **Default tabs** (Description / Reviews) — light underlined tabs.
6. **Category shown as "Uncategorized"** — content issue (assign a real product
   category in WP admin), not a CSS concern.

## 2. Target design (brand parity)

| Element | Target |
|---|---|
| Canvas | `--background` (220 20% 6%), centered `--container-max` 1248px |
| Layout | 2-col grid: gallery left, summary right; stacks ≤900px |
| Gallery | rounded 16px, 1px `--border`, soft shadow |
| Breadcrumb | small Poppins, muted, green on hover |
| Category eyebrow | uppercase, 0.14em tracking, `--primary-bright` |
| Title | Ubuntu, `--fs-h1` fluid ramp, -0.015em |
| Price (sale) | `--primary-bright`, 1.75rem bold; original price struck-through muted |
| Short description | branded card: dark `--surface-section`, 3px green left border, Poppins body — overrides the broken `<pre>` |
| Quantity | dark `--card` input, 52px, green focus ring |
| Book Appointment | green pill (`--primary-bright`), hover `--primary-darker` + shadow |
| Product meta | top hairline divider, muted text, green links |
| Tabs | dark pill tabs; active = green |

All values come from `global.css` tokens. `product.css` ships local fallbacks so
it degrades gracefully if `global.css` is not loaded on the shop template.

## 3. Constraints (inherited)

- **No `!important`, no inline styles.** Beat Astra/WooCommerce with deep
  `body.wp-theme-astra.single-product …` selector chains.
- Kebab-case classes; tokens consumed, never redefined (except documented fallbacks).
- WCAG AA contrast: green price/links on dark pass; white button text on green passes large-text.
- `prefers-reduced-motion` disables button transitions.
- Two greens only: `--primary-bright` rest, `--primary-darker` hover.

## 4. Deployment

Paste `product.css` via **WPCode → HTML snippet → Site Wide Header**
(keep the `<style>` wrapper), titled `AREFIN-PRODUCT-CSS`.
Alternatively, **Customize → Additional CSS** (strip the `<style>` tags).
Requires `global.css` enqueued site-wide for full token coverage.

## 5. Follow-ups (content, not CSS)

- [ ] Assign the product a real category (currently "Uncategorized").
- [ ] Re-author the short description as plain text/HTML in WP (drop the pasted
      Tailwind `<span>`); the CSS already normalizes it either way.
- [ ] Confirm the "Book Appointment" flow (cart → checkout) is also brand-styled
      in a later pass (`cart.css` / `checkout.css`).
