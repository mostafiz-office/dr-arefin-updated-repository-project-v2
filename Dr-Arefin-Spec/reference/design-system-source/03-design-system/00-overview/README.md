# AI-Adaptable Design System — Overview

> Version 1.0 · Generated from the GreenHouse Effect reference implementation.
> This specification is designed so that **any AI** (or human developer) can read it and reproduce the same visual language, interaction patterns, and component behavior for a new website — simply by swapping the centralized theme variables.

---

## Purpose

This design system captures every visual and behavioral rule of the GreenHouse Effect website so that:

1. **Any AI can build new pages** that feel like they belong to the same product.
2. **Any AI can build an entirely new website** by changing the theme variables defined in `01-colors-themes/01-theme-variables.md`.
3. **The system can later migrate to WordPress** (classic theme, block theme, or headless) without restructuring the design language.

---

## File Map

```
spec/03-design-system/
├── 00-overview/
│   └── README.md                  ← you are here
├── 01-colors-themes/
│   ├── 01-theme-variables.md      ← single source of truth for colors & tokens
│   ├── 02-color-usage-rules.md    ← how to apply colors in components
│   └── 03-dark-mode.md            ← dark / branded variant derivation
├── 02-menu/
│   ├── 01-header-layout.md        ← header structure & spacing
│   ├── 02-nav-item-behavior.md    ← hover, underline, accent transitions
│   ├── 03-dropdown-behavior.md    ← dropdown open/close, animation
│   ├── 04-mobile-menu.md          ← responsive hamburger menu
│   └── 05-icon-hover-transitions.md ← logo & icon interaction
├── 03-hero-section/
│   └── 01-hero-pattern.md         ← hero layout, gradient, floating orbs
├── 04-typography/
│   └── 01-type-system.md          ← font stack, sizes, weights, spacing
├── 05-buttons/
│   ├── 01-button-system.md        ← default, hover, active, focus states
│   ├── 02-join-us-slide-button.md ← CSS3 slide-text interaction
│   └── 03-highlight-button.md     ← "Climate AI" style floating button
├── 06-search-filters/
│   └── 01-search-and-chips.md     ← search bar, filter chip hover behavior
├── 07-cards-sections/
│   ├── 01-gas-card-pattern.md     ← interactive card with icon, badge, hover
│   └── 02-team-section-pattern.md ← "Team Greenhouse" reusable section
├── 08-footer/
│   └── 01-footer-pattern.md       ← footer layout, newsletter, social icons
├── 09-motion-transitions/
│   └── 01-css3-motion-system.md   ← all animation & transition rules
├── 10-spacing-layout/
│   └── 01-spacing-rhythm.md       ← container, grid, gap, padding rules
├── 11-borders-radius/
│   └── 01-borders-and-shape.md    ← border thickness, radius, state changes
├── 12-new-page-rules/
│   └── 01-page-creation-guide.md  ← how to build new pages consistently
├── 13-wordpress-migration/
│   └── 01-migration-notes.md      ← CMS mapping & compatibility notes
└── 14-accessibility/
    └── 01-a11y-guidelines.md      ← contrast, focus, reduced-motion
```

---

## Core Design Principles

| # | Principle | Description |
|---|-----------|-------------|
| 1 | **Variable-first** | Every color, radius, shadow, and spacing value is a CSS custom property. Components never use hardcoded hex/rgb/hsl literals. |
| 2 | **CSS3-native motion** | All hover, focus, and state transitions use CSS `transition` and `@keyframes`. No JavaScript-driven animation for visual states. |
| 3 | **Semantic tokens** | Raw palette values feed into semantic tokens (`--primary`, `--muted`, etc.) which feed into component tokens. Changing the palette re-skins everything. |
| 4 | **Progressive disclosure** | Interactions (dropdowns, mobile menu) animate in with scale/fade. Nothing appears or disappears instantly. |
| 5 | **Gentle motion** | Durations stay between 150 ms and 700 ms. Easing is `ease-out` for entrances, `ease-in` for exits. No bounce or overshoot. |
| 6 | **Elevation through shadow & border** | Interactive surfaces lift on hover via `translateY`, increased `box-shadow`, and border-color shift toward `--primary`. |
| 7 | **Responsive coherence** | The same design tokens apply at all breakpoints. Layout shifts (e.g., menu → hamburger) change structure, not visual personality. |

---

## How to Use This Spec

### For an AI building a new page
1. Read `01-colors-themes/01-theme-variables.md` — copy the variable block.
2. Read `12-new-page-rules/01-page-creation-guide.md` — follow the page scaffold.
3. Pick component patterns from sections 02–08.
4. Apply motion rules from `09-motion-transitions/01-css3-motion-system.md`.

### For an AI building a completely new website
1. Read the full spec.
2. Replace values in `01-theme-variables.md` with the new brand colors.
3. All component specs remain valid — only the visual "skin" changes.

### For WordPress migration
1. Read `13-wordpress-migration/01-migration-notes.md`.
2. Map CSS variables to WordPress theme.json / Customizer fields.
3. Map component patterns to Gutenberg blocks or shortcodes.

---

## Ambiguities & Open Questions

These items are noted explicitly rather than assumed:

| # | Item | Status |
|---|------|--------|
| 1 | Whether the system should ship multiple theme presets (e.g., "Ocean", "Forest") or a single customizable base | **Not yet decided** — spec supports single base with easy extension |
| 2 | WordPress target: classic theme, block theme, or headless | **Not yet decided** — spec is written to be compatible with all three |
| 3 | Whether admin-configurable theming should be real-time (live preview) or build-time | **Not yet decided** — spec keeps variables runtime-swappable |
| 4 | Exact pages beyond the homepage are not yet designed | **Noted** — `12-new-page-rules` provides creation guidance |

---

## Dependency Diagram (Text)

```
┌─────────────────────────────────┐
│   Theme Variables (CSS :root)   │  ← Change here to re-skin everything
│   01-theme-variables.md         │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│   Semantic Tokens               │  ← --primary, --muted, --accent ...
│   (derived from theme vars)     │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│   Component Tokens              │  ← --btn-bg, --card-border ...
│   (optional layer for complex   │
│    components)                  │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│   Component States              │  ← default, hover, active, focus,
│   (each state references        │     disabled, selected
│    tokens above)                │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│   Page Composition              │  ← Hero + Nav + Cards + Footer ...
│   12-new-page-rules             │
└─────────────────────────────────┘
```

---

*Proceed to `01-colors-themes/` for the full token architecture.*

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
- Sections still to write: colors/themes details, menu interactions, hero section, typography, buttons (including Join Us slide), search/filters, cards/sections, footer, motion system, spacing, borders, new page rules, WordPress migration, accessibility.
Do you understand? Say "next" to continue.
```
