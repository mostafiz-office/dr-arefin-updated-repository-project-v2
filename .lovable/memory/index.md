# Memory: index.md
Updated: just now

# Project Memory

## Core
- **Project Scope (CURRENT)**: Dr. Arefin — hepatobiliary surgery practice site (Dhaka). Active spec: `Dr-Arefin-Spec/`. Communication in English.
- **Project Scope (ARCHIVED)**: CAF Patronato Fondi (Italian fiscal services). Files in `_archive/caf/`. Reference only, not bundled or routed.
- **Routing**: `/` is Dr. Arefin home. CAF routes removed from `App.tsx`. Internal links must use relative paths with trailing slashes.
- **Design Parity**: 1:1 pixel-perfect visual parity with the React preview is mandatory.
- **CSS Rules**: Absolute NO `!important` or inline styles. Use kebab-case classes and high-specificity WP selectors when relevant. Use Tailwind utilities/CSS variables.
- **Mobile Stability**: Enforce `overflow-x: hidden` on `html` and `body` globally.
- **Accessibility**: Strict WCAG 2.1 AA contrast required (4.5:1 normal, 3:1 large text).
- **Interactions**: Hover states must not shift element position (no `translateY/X`). Use colors, shadows, filters.
- **Icons**: Use inline SVGs for critical UI icons instead of external JS libraries.
- **Imagery**: Professional, relevant. No cheesy metaphors; no AI text artifacts.
- **Dr. Arefin imagery**: NEVER use `imagegen` for Dr. Arefin, patients, real staff, real clinic, logos, or credentials. Always request a real upload from the user. AI is only OK for abstract backgrounds/textures/illustrations.
- **Archive policy**: Reference patterns from `_archive/caf/` for proven layouts (sticky stack, hero, CTA band, etc.) but do NOT import directly from `_archive/` — reimplement with Dr. Arefin tokens.

## Memories
- [No AI Images of Real People](mem://constraints/no-ai-images-of-real-people) — Dr. Arefin: never AI-generate doctor, patients, real clinic, logos, credentials
- [Aesthetic Direction](mem://style/aesthetic-direction) — Corporate minimal (Atto Property) + vibrant interactive (DesignMonks) [CAF reference]
- [Color Palette](mem://style/color-palette) — Atto greens, DesignMonks accent gradients [CAF reference]
- [Layout System](mem://style/layout-system) — 1248px max-width container, equal top/bottom padding constraints
- [Component Design](mem://style/component-design) — Standardized button sizes, radii, and light/dark variants
- [Layout Patterns](mem://features/layout-patterns) — Grid structural constraints and matched height requirements
- [Hero Interaction Design](mem://features/hero-design-system) — Clean interactive area, strict non-positional hover behaviors
- [Imagery Guidelines](mem://style/imagery-guidelines) — Restrictions on metaphors and AI artifacts
- [HTML Coding Standards](mem://seo/html-coding-standards) — Strict semantic constraints, unbolded links, title attr rules
- [Structured Data](mem://seo/structured-data-patterns) — LocalBusiness and Review JSON-LD requirements
- [Dark Hover States](mem://style/visual-legibility/dark-bg-hover-states) — Light green token for dark background legibility
- [Mobile UI Stability](mem://constraints/mobile-ui-stability) — Global overflow rules
- [Font System](mem://style/typography/font-system-config) — Ubuntu headings, Poppins body [CAF — Dr. Arefin uses different stack]
- [Dev Environment](mem://project/development-environment) — Reference URLs and mandatory glibc swc patch script
- [Hero Interaction Rules](mem://style/hero-interaction-design) — Non-positional dark section hover logic
- [Internal Linking](mem://seo/internal-linking-system) — High-density keyword linking logic within content blocks
- [Implementation Constraints](mem://style/implementation-constraints) — Tailwind/CSS vars only, kebab-case, no inline styles
- [Section Labels](mem://style/typography/section-label-standard) — Section label standardization
- [CSS Architecture](mem://tech/css-architecture) — The no `!important` policy
- [Content Readability](mem://seo/content-readability-standards) — Yoast transition word requirements
- [Nav Breakpoints](mem://tech/navigation/breakpoints) — Threshold for desktop/mobile toggle
- [Link Logic](mem://tech/navigation/link-logic) — Relative paths with trailing slashes
- [Radix UI Versioning](mem://tech/react/radix-ui-compatibility) — Locked Radix versions
- [Hover Shadow Standard](mem://style/visual-legibility/hover-shadow-standard) — Sharp zero-blur directional shadows
- [Accessibility Compliance](mem://constraints/accessibility-compliance) — WCAG 2.1 AA contrast requirements
- [Sticky Element Compatibility](mem://tech/architecture/sticky-element-compatibility) — Ancestor neutralization for sticky positioning
- [Sticky Stack Cards](mem://features/sticky-stack-cards) — DesignMonks-inspired stacking layout pattern
- [Sticky-Stack Section Pattern](mem://features/sticky-stack-section) — Reusable `.sss-*` section spec (class system, per-step palette, scroll constants, flip-video tile, a11y, content rules). Source: `Dr-Arefin-Spec/components/sticky-stack-section.md`
- [Brand Identifiers](mem://brand/typography/brand-identifiers) — "FONDI 730" nowrap [CAF only]
- [Documentation Standards](mem://project/documentation-standards) — Consolidated markdown tracking
- [Blog Hero Design](mem://features/blog-hero-design) — Atto Property replica spec [reusable pattern]
- [Single Post Design](mem://style/single-blog-post-design) — 2-column blog post layout
- [Keyword Strategy](mem://seo/keyword-strategy) — Italian fiscal keywords [CAF — Dr. Arefin uses Dhaka hepatobiliary]
- [Site Structure](mem://seo/site-structure) — CAF-specific URLs [CAF only]
- [Contact Information](mem://business/contact-information) — CAF branch locations [CAF only]
- [Area Contact System](mem://features/area-specific-contact-system) — CAF area-specific contact pages [CAF only]

## Archived (CAF-WordPress-specific, kept for reference if rebuilding the WP export)
- [Export Architecture](mem://tech/wordpress/export-architecture)
- [WP Utility Classes](mem://tech/wordpress/utility-classes)
- [WP Interactivity](mem://tech/wordpress/interactivity)
- [WP Specificity Strategy](mem://tech/wordpress/specificity-strategy)
- [WP Theme Neutralization](mem://tech/wordpress/theme-neutralization)
- [WP Elementor Workflow](mem://tech/wordpress/elementor-workflow)
- [Sticky Header logic](mem://tech/navigation/sticky-header)
- [WP CSS Template Sync](mem://tech/wordpress/css-template-sync)
- [Blog Archive Styling](mem://tech/wordpress/blog-archive-styling)
- [WP Deployment Standards](mem://tech/wordpress/deployment-standards)
- [WP Export Sync Constraint](mem://tech/wordpress/export-sync-constraint)
- [WP Style Overrides](mem://tech/wordpress/elementor-style-overrides-js)
- [WP Shadow Clipping](mem://tech/wordpress/shadow-clipping-prevention)
- [WP Asset Pathing](mem://tech/wordpress/asset-hosting-path)
- [WP Dynamic Shortcodes](mem://tech/wordpress/dynamic-content-shortcodes)
- [WP Blog Pagination](mem://tech/wordpress/blog-pagination-system)
- [WP Blog Hero Standards](mem://tech/wordpress/blog-hero-design-standards)
- [Icon Implementation](mem://tech/wordpress/icon-implementation-strategy)
- [WP Rendering Conflicts](mem://tech/wordpress/troubleshooting/rendering-conflicts)
