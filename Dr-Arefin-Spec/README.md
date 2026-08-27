# Dr-Arefin-Spec

Self-contained build spec for **drarefin.com** — Dr. Murshidul Arefin's hepatobiliary surgery practice site in Dhaka.

This spec inherits **all interaction, animation, layout, and SEO patterns** from the CAF Patronato Fondi project (the parent project), but with Dr. Arefin's brand colors, typography, and verbatim page content.

## Folder map

| File | Purpose |
|------|---------|
| `00-business-analysis.md` | Who Dr. Arefin is, audience, services, tone |
| `01-design-system.md` | Brand colors, fonts, spacing — **his palette + CAF patterns** |
| `02-site-architecture.md` | URL structure, navigation, page tree |
| `03-export-strategy.md` | Static HTML/CSS export rules (inherited from CAF) |
| `04-seo-standards.md` | Meta, schema, structured data |
| `05-seo-html-generation-rules.md` | HTML coding constraints (inherited from CAF) |
| `06-keyword-strategy.md` | Targeted Dhaka hepatobiliary keywords + 62 article URLs |
| `07-inherited-patterns.md` | **THE CONTRACT** — every CAF animation/hover/component to carry over |
| `issues/` | Pre-emptive issue prevention (lessons from CAF build) |
| `pages/` | One spec per page (verbatim content + section-by-section layout) |

## Build directive for any AI

1. Read `07-inherited-patterns.md` **first** — it defines what must be 1:1 from CAF.
2. Read `01-design-system.md` for tokens (replaces CAF tokens).
3. Read `02-site-architecture.md` for the routing tree.
4. For each page in `pages/`, build the React component using the section-by-section layout and verbatim content.
5. Use `06-keyword-strategy.md` for internal linking density.
6. Reference `issues/` to avoid known pitfalls.

## Source
- Live site: https://drarefin.com
- Scraped: 2026-04-20
- Total pages spec'd: 12 (8 menu + 4 legal) + 62 article URL list