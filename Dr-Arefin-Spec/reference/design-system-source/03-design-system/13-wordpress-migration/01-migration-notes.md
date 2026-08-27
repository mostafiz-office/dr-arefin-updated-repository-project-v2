# WordPress Migration Compatibility Notes

> WordPress implementation details are **not yet fully defined**. This section documents how the design system has been structured to ease future migration, without over-specifying implementation.

---

## 1. CSS Variable → WordPress theme.json

WordPress block themes support a `theme.json` file that maps directly to CSS custom properties:

```json
{
  "settings": {
    "color": {
      "palette": [
        { "slug": "primary", "color": "hsl(142, 71%, 45%)", "name": "Primary" },
        { "slug": "secondary", "color": "hsl(142, 60%, 93%)", "name": "Secondary" },
        { "slug": "background", "color": "hsl(140, 20%, 97%)", "name": "Background" }
      ]
    },
    "custom": {
      "radius": "0.75rem"
    }
  }
}
```

The variable-driven architecture means this mapping is direct.

---

## 2. Component → Block Mapping

| Design System Component | WordPress Equivalent |
|------------------------|---------------------|
| Navbar | `core/navigation` block or custom header template part |
| Hero Section | Custom block or `core/cover` with pattern |
| Card Grid | `core/query` loop or custom block |
| Footer | Footer template part |
| Search Module | `core/search` + custom filter block |
| CTA Section | `core/group` with pattern |

---

## 3. Database Content → WordPress

Current SQLite tables map to WordPress content types:

| SQLite Table | WordPress Equivalent |
|-------------|---------------------|
| `menu_items` | `wp_nav_menu` + menu items |
| `hero_content` | Custom fields (ACF or meta) |
| `greenhouse_gases` | Custom Post Type |
| `resource_links` | Custom Post Type or widget |
| `site_config` | Theme Customizer options |
| `filter_chips` | Taxonomy terms or custom options |

---

## 4. What to Preserve

1. **CSS variable names** — keep `--primary`, `--secondary`, etc. even in WordPress
2. **Class naming patterns** — WordPress can load the same Tailwind build or equivalent CSS
3. **Animation keyframes** — copy directly into WordPress theme CSS
4. **Component hierarchy** — header/content/footer structure matches WordPress template parts
5. **Data-driven content** — all content already comes from a database, mirroring WordPress's model

---

## 5. What to Decide Later

| Decision | Options |
|----------|---------|
| Theme type | Classic theme, Block theme, or Headless (API + React frontend) |
| CSS approach | Ship Tailwind in WordPress, or compile to vanilla CSS |
| Component rendering | Gutenberg blocks, shortcodes, or React via headless |
| Admin theming | Customizer fields, ACF options page, or custom settings page |

---

## 6. Migration Readiness Checklist

- [x] All colors are CSS variables (not hardcoded)
- [x] All content comes from a database (not hardcoded in components)
- [x] Components are self-contained with clear props/data contracts
- [x] Animation is pure CSS (no JS animation libraries to port)
- [x] Design tokens are documented and extractable
- [ ] WordPress theme.json not yet generated (future task)
- [ ] Block patterns not yet created (future task)

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
