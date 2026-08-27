# CAF Patronato Fondi — Archived Reference

This folder contains the original CAF Patronato Fondi build, archived on 2026-04-21
when the project was repurposed as the **Dr. Arefin** site.

**Status:** Reference only. Not bundled, not routed, not deployed.

## What's here

| Path | What it was |
|------|-------------|
| `src-pages/` | All CAF React page components (Index, ChiSiamo, Servizi, Contatto, etc.) |
| `spec/01-app/` | CAF-specific app spec (design system, SEO, site architecture) |
| `spec/02-app/issues/` | CAF build issue post-mortems (17 issues) |
| `public/elementor-export/` | WordPress/Elementor static export of the CAF site |

## What stayed in the live project

- `src/components/` — shared components (PageHero, CTABand, ContactForm, ServiceCard,
  Header, Footer, etc.) are still imported by Dr. Arefin pages or kept as building blocks.
- `spec/` (root) — global, project-agnostic specs (`design-system.md`, `seo-standards.md`,
  `site-architecture.md`, `keyword-strategy.md`, `export-strategy.md`,
  `seo-html-generation-rules.md`) are kept as reusable patterns.
- `Dr-Arefin-Spec/` — the active spec for the current build.

## How to use this archive

When building a Dr. Arefin feature, reference the matching CAF page here for
proven patterns (hero layout, sticky stack, CTA band, etc.) and reimplement
with Dr. Arefin tokens — do **not** import directly from `_archive/`.

## Restoring (if ever needed)

Move the desired file from `_archive/caf/src-pages/X.tsx` back to
`src/pages/X.tsx` and add a `<Route>` for it in `src/App.tsx`.
