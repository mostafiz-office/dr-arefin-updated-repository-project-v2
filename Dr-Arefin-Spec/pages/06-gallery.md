# Page 06 — Gallery

- **URL**: `/gallery/`
- **Source**: https://drarefin.com/gallery/
- **Page type**: gallery

## SEO
- **Meta title**: Gallery — Operation Theater, Conferences & Patient Care | Dr. Arefin
- **Meta description**: Photo gallery of Dr. Murshidul Arefin's surgical practice — operation theater, conferences, training and consultation moments at Popular Medical College Hospital, Dhaka.
- **Canonical**: https://drarefin.com/gallery/
- **JSON-LD**: `ImageGallery`

## Section inventory

| # | Section | CAF component to reuse |
|---|---------|------------------------|
| 1 | Page hero | `PageHero` (compact) |
| 2 | Filter tabs | Horizontal pill filter |
| 3 | Masonry / grid gallery | Image grid with lightbox |
| 4 | Final CTA | `CTABand` |

---

## Section 1 — Page Hero
- **CAF pattern**: `PageHero`
- **H1**: Gallery
- **Subtitle**:
  > Dedicated to providing **exceptional surgical care** in **hepatobiliary** and **liver transplantation.**

## Section 2 — Filter Tabs
- **CAF pattern**: Horizontal pill filter (active state in `--primary`)
- **Tabs** (verbatim from source):
  - All
  - Operation Theater
  - Conference & Training
  - Chamber
  - Successful OT

## Section 3 — Gallery Grid
- **CAF pattern**: Masonry or uniform grid (3-col desktop / 2 tablet / 1 mobile) with click-to-lightbox
- **Items**: pulled dynamically from the source media library (date-based directories under `/wp-content/uploads/2025/`). The React build should expect a `gallery.json` or CMS-driven array of `{ src, alt, category }`.
- **Hover**: per CAF rules — no position shift; sharp zero-blur shadow + subtle filter brightness only.

## Section 4 — Final CTA
- **CAF pattern**: `CTABand`
- **H2**: Ready for Expert Consultation?
- **CTA**: { label: "Book an Appointment", href: "/contact/" }

## Internal links
- Hepatobiliary services → `/treatment/`
- Liver transplant → `/treatment/`
- Book an Appointment → `/contact/`

## Notes
- Source page is media-only (no body copy). Implementation must wait for actual photo set; don't fabricate captions.
- Lightbox must respect WCAG keyboard navigation (Esc to close, arrow keys for prev/next).