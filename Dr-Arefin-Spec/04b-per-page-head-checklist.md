# Per-Page `<head>` Checklist

> Companion to `04-seo-standards.md` and `08-seo-html-writing-spec.md`.
> Every public page (WordPress or static export) MUST pass this checklist
> before being published. Tick each row in code review.

---

## 1. Universal head elements (every page)

| # | Element | Rule | Example |
|---|---------|------|---------|
| 1 | `<meta charset>` | `UTF-8` | `<meta charset="UTF-8" />` |
| 2 | `<meta viewport>` | `width=device-width, initial-scale=1` | — |
| 3 | `<title>` | 50–60 chars, brand suffix `— Dr. Murshidul Arefin` | *"Laparoscopic Cholecystectomy in Dhaka — Dr. Murshidul Arefin"* |
| 4 | `<meta name="description">` | 140–160 chars, contains primary keyword + CTA verb | *"Safe key-hole gallbladder removal in Dhaka by Dr. Arefin. Book a hepatobiliary consultation today."* |
| 5 | `<link rel="canonical">` | Absolute URL, trailing slash, no query/fragment | `https://drarefin.com/treatment/laparoscopic-cholecystectomy/` |
| 6 | `<meta name="robots">` | `index, follow` (default). Use `noindex` only for thank-you / 404 | — |
| 7 | `<html lang>` | `en` for English, `bn` for Bangla variants | — |
| 8 | Favicon set | `/favicon.ico`, `/apple-touch-icon.png`, manifest | — |

## 2. Open Graph (social previews)

| # | Element | Rule |
|---|---------|------|
| 9  | `og:title`       | Same as `<title>` or a tightened share variant |
| 10 | `og:description` | Same as meta description |
| 11 | `og:url`         | Same as canonical |
| 12 | `og:type`        | `website` for landing, `article` for blog/FAQ posts |
| 13 | `og:image`       | Absolute URL, 1200×630, < 1 MB, real photo (no logo-only) |
| 14 | `og:image:alt`   | Descriptive sentence, includes specialty + city |
| 15 | `og:site_name`   | `Dr. Murshidul Arefin` |
| 16 | `og:locale`      | `en_US` (or `bn_BD`) |

## 3. Twitter / X Card

| # | Element | Rule |
|---|---------|------|
| 17 | `twitter:card`        | `summary_large_image` |
| 18 | `twitter:title`       | mirror `og:title` |
| 19 | `twitter:description` | mirror `og:description` |
| 20 | `twitter:image`       | mirror `og:image` |
| 21 | `twitter:image:alt`   | mirror `og:image:alt` |

## 4. Structured data (JSON-LD)

Inject via WPCode "Header" snippet. Source-of-truth blocks live in
`public/elementor-export/blocks/global/json-ld.html` (home) plus one
file per page template under `blocks/<page>/json-ld.html`.

| Page template | Required `@type`s |
|---|---|
| Home (`/`) | `Physician` + `MedicalClinic` + `WebSite` + `BreadcrumbList` + `FAQPage` |
| About (`/about/`) | `Physician` + `BreadcrumbList` |
| Treatment hub (`/treatment/`) | `MedicalClinic` + `BreadcrumbList` + `ItemList` of procedures |
| Treatment leaf (`/treatment/<slug>/`) | `MedicalProcedure` + `BreadcrumbList` |
| FAQ leaf (`/faq/<slug>/`) | `FAQPage` (single question) + `BreadcrumbList` |
| Blog index (`/blog/`) | `Blog` + `BreadcrumbList` |
| Blog post | `MedicalWebPage` or `Article` + `BreadcrumbList` + `Person` author |
| Contact (`/contact/`) | `MedicalClinic` + `BreadcrumbList` |

Cross-link entities with stable `@id` URLs (e.g. `#physician`, `#clinic`).
Validate with [Schema.org validator](https://validator.schema.org/) and
[Google Rich Results Test](https://search.google.com/test/rich-results)
before publishing.

## 5. Performance hints (recommended)

| # | Element | When |
|---|---------|------|
| 22 | `<link rel="preconnect">` | For Google Fonts / analytics domains |
| 23 | `<link rel="preload" as="image">` | Hero LCP image on every template |
| 24 | `<link rel="preload" as="font">` | Ubuntu + Poppins WOFF2 |
| 25 | `<meta name="theme-color">` | Match dark/light brand palette |

## 6. Per-page values matrix

Fill out before publishing. Slot into the WPCode "Header" snippet keyed
to that URL pattern.

| Page | Title (≤60) | Description (≤160) | Canonical | OG image |
|------|-------------|--------------------|-----------|----------|
| `/` | Dr. Murshidul Arefin — Hepatobiliary & Liver Transplant Surgeon, Dhaka | Leading hepatobiliary, liver transplant and pancreatic surgeon at Popular Medical College Hospital, Dhaka. Book a specialist consultation today. | https://drarefin.com/ | `/wp-content/uploads/2026/05/og-home.webp` |
| `/about/` | About Dr. Murshidul Arefin — HPB & Liver Surgeon, Dhaka | 15+ years of focused hepatobiliary surgery experience. Read Dr. Arefin's training, credentials and clinical philosophy. | https://drarefin.com/about/ | `/wp-content/uploads/2026/05/og-about.webp` |
| `/treatment/` | Hepatobiliary, Liver & Pancreatic Surgery in Dhaka | Full range of HPB procedures — laparoscopic cholecystectomy, liver resection, Whipple, transplant. Expert care in Dhaka. | https://drarefin.com/treatment/ | `/wp-content/uploads/2026/05/og-treatment.webp` |
| `/treatment/laparoscopic-cholecystectomy/` | Laparoscopic Cholecystectomy in Dhaka — Key-Hole Gallbladder Surgery | Safe, day-case key-hole gallbladder removal in Dhaka by Dr. Arefin. 800+ laparoscopic cases. Book your consultation. | https://drarefin.com/treatment/laparoscopic-cholecystectomy/ | `/wp-content/uploads/2026/05/og-lap-chole.webp` |
| `/treatment/whipple-procedure-dhaka/` | Whipple Procedure in Dhaka — Pancreatic Cancer Surgery | Specialist Whipple (pancreaticoduodenectomy) for pancreatic and periampullary cancer in Dhaka by Dr. Arefin. | https://drarefin.com/treatment/whipple-procedure-dhaka/ | `/wp-content/uploads/2026/05/og-whipple.webp` |
| `/treatment/liver-transplant-surgery-dhaka/` | Liver Transplant Surgery in Dhaka — Dr. Murshidul Arefin | Advanced liver transplant and complex hepatic resection in Dhaka. Multidisciplinary HPB care led by Dr. Arefin. | https://drarefin.com/treatment/liver-transplant-surgery-dhaka/ | `/wp-content/uploads/2026/05/og-transplant.webp` |
| `/contact/` | Contact Dr. Murshidul Arefin — Dhanmondi, Dhaka | Book a hepatobiliary consultation at Popular Medical College Hospital. Phone & WhatsApp: +880 1311 487 592. | https://drarefin.com/contact/ | `/wp-content/uploads/2026/05/og-contact.webp` |
| `/blog/` | Hepatobiliary & Liver Health Blog — Dr. Murshidul Arefin | Evidence-based articles on gallbladder, liver, pancreas and bile duct conditions, by Dr. Arefin's clinical team. | https://drarefin.com/blog/ | `/wp-content/uploads/2026/05/og-blog.webp` |

> Extend the matrix as new pages ship. Slugs MUST match
> `13-satellite-pages-database.md`.

## 7. Pre-publish QA gate

Run all four before clicking Publish:

1. **Code review** — every row in §1–§4 checked for the page being shipped.
2. **`seo-html-lint.mjs`** (task #14) — exits 0.
3. **Google Rich Results Test** — JSON-LD passes for the page's required types.
4. **Lighthouse SEO** — score ≥ 95 on mobile + desktop.

Any failure blocks merge.
