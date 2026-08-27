# Add "Research" category link to header

## Goal
Add a new header menu item labeled **Research** next to **Gallery**, linking to the Research category archive (`/category/research/`).

## Files to update
- `public/elementor-export/blocks/global/header.html`

## Changes
1. Insert a new `<li>` nav item in `.arefin-nav-desktop` between **Gallery** and the dual-CTA group.
2. Insert a matching mobile link in `.arefin-mobile-drawer` between **Gallery** and the mobile CTA row.
3. Use the site’s existing relative-path convention with trailing slash: `/category/research/`.
4. Reuse the same `arefin-nav-item` / `arefin-mobile-link` classes and title/aria attributes as neighboring items.

## Verification
- Confirm the Research link renders in both desktop and mobile menus.
- Confirm the link points to `/category/research/`.
