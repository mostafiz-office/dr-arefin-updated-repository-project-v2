# Page 05 — Articles (Technical Article index)

- **URL**: `/articles/` (recommended) — source uses `/technical-article/`
- **Source**: https://drarefin.com/technical-article/
- **Page type**: blog index

## ⚠️ CRITICAL — Source content is invalid

The live source page `/technical-article/` is rendering a **stale Atto Property steam-cleaning article template** — completely unrelated to Dr. Arefin or hepatobiliary surgery. None of the body copy on the source page is usable.

**Action for any AI implementing this page**: do **NOT** copy the source body. Build a clean blog index using the patterns below, populated with the real article titles inventoried in `06-keyword-strategy.md` once available.

## SEO
- **Meta title**: Liver Health & Hepatobiliary Articles — Dr. Murshidul Arefin
- **Meta description**: Educational articles on liver health, hepatobiliary surgery, gallstones, pancreatic disease and patient recovery by Dr. Murshidul Arefin, Dhaka.
- **Canonical**: https://drarefin.com/articles/ (or `/technical-article/` if URL is preserved)
- **JSON-LD**: `Blog` + `BreadcrumbList`

## Section inventory

| # | Section | CAF component to reuse |
|---|---------|------------------------|
| 1 | Page hero (Atto-style blog hero) | Blog hero (per `mem://features/blog-hero-design`) |
| 2 | Category filter pills | Horizontal pill filter |
| 3 | Featured article grid | 3-col blog card grid |
| 4 | Pagination | Numeric pagination |
| 5 | Final CTA | `CTABand` |

---

## Section 1 — Page Hero
- **CAF pattern**: Atto Property blog hero (full 1248px container)
- **H1**: Articles
- **Subtitle**:
  > Insights, guidance, and patient education on **liver, gallbladder, pancreatic and biliary health** — written by **Dr. Murshidul Arefin** and his team.

## Section 2 — Categories
- **CAF pattern**: Horizontal scrollable pills
- **Categories** (recommended starter list — confirm with Dr. Arefin):
  - All
  - Liver Health
  - Gallbladder & Biliary
  - Pancreatic Disease
  - Patient Recovery
  - Surgical Techniques

## Section 3 — Article Grid
- **CAF pattern**: 3-col blog card (image top, content bottom — sharp corners, no glow on hover, per CAF blog spec)
- **Card fields**: Featured image · Category pill · H3 title · 1-line excerpt · "Read more →"
- **Initial population**: pull from the 62 article URLs inventoried in `06-keyword-strategy.md`. Until then, leave placeholder cards.

## Section 4 — Pagination
- **CAF pattern**: Numeric pagination (1, 2, 3 … Next)

## Section 5 — Final CTA
- **CAF pattern**: `CTABand`
- **H2**: Ready for Expert Consultation?
- **CTA**: { label: "Book an Appointment", href: "/contact/" }

## Internal links
- Each article card → `/articles/<slug>/`
- Book an Appointment → `/contact/`

## Notes
- **DO NOT scrape** body content from the source `/technical-article/` page — it is stale Atto Property content. Treat the page as structurally empty until real articles are loaded.
- The 62 article slugs harvested from sitemap are listed in `06-keyword-strategy.md`. They are stub URLs only at this stage.
- Final URL: prefer `/articles/` over `/technical-article/`. If URL must be preserved for backlinks, set up a 301 redirect from `/technical-article/` → `/articles/`.