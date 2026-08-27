# SEO Standards — Dr. Arefin

Inherits all rules from CAF (`spec/01-app/seo-standards.md` + `seo-html-generation-rules.md`). Brand-specific overrides below.

## Title format
- Home: `Best Gallbladder Surgeon in Dhaka | Dr. Murshidul Arefin`
- Service: `[Service] in Dhaka — Dr. Murshidul Arefin`
- About: `About Dr. Murshidul Arefin — Hepatobiliary Surgeon Dhaka`
- Page meta-title max **60 chars**, meta-description max **160 chars**

## Meta description — Bengali keyword injection

For pages targeting gallbladder surgery, include ONE Bengali keyword phrase in the meta description after the English summary. Example:

```html
<meta name="description" content="Dr. Murshidul Arefin — best gallbladder surgeon in Dhaka. Expert laparoscopic cholecystectomy at Popular Medical College Hospital. পিত্তথলির পাথর অপারেশন বিশেষজ্ঞ।">
```

## Schema (JSON-LD)
- **Home + About + Contact**: `Physician` schema with Bengali `alternateName`
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. Murshidul Arefin",
    "alternateName": "ডাঃ মুর্শিদুল আরেফিন",
    "medicalSpecialty": ["Hepatobiliary surgery", "Liver transplant", "Pancreatic surgery", "Gallbladder surgery"],
    "description": "Best gallbladder surgeon in Dhaka. গল ব্লাডার সার্জারী বিশেষজ্ঞ ঢাকা।",
    "telephone": "+8801311487592",
    "email": "arefin-info@drarefin.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Room 304 (Building 06) & Room 302 (Building 03), Popular Medical College Hospital",
      "addressLocality": "Dhanmondi-02, Dhaka",
      "addressCountry": "BD"
    },
    "sameAs": [
      "https://www.facebook.com/61579153446053",
      "https://www.instagram.com/rahmanarefin/",
      "https://www.linkedin.com/in/murshidul-arefin-60085291/",
      "https://www.youtube.com/@HealthPanacea"
    ]
  }
  ```
- **Articles index + posts**: `Article` schema with author=Dr. Murshidul Arefin
- **Treatment service pages**: `MedicalProcedure` schema — include `"name"` in both English and Bengali
- **Mentorship**: `Course` schema
- **FAQ sections**: `FAQPage` schema wrapping Bengali question/answer pairs

## hreflang (Bengali content signal)

On every page that contains Bengali keywords in meta/content, add:

```html
<link rel="alternate" hreflang="en" href="https://drarefin.com/[page]/">
<link rel="alternate" hreflang="bn" href="https://drarefin.com/[page]/">
<link rel="alternate" hreflang="x-default" href="https://drarefin.com/[page]/">
```

This signals to Google that the page serves both English and Bengali speakers.

## Canonical
- Always set canonical = absolute URL of the page (no trailing variants)

## Open Graph
- `og:image` = 1200×630 px branded image per page
- `og:type` = `website` (home/about) | `article` (blog posts) | `profile` (about)
- `og:locale` = `en_US` (primary) + `og:locale:alternate` = `bn_BD`

## Image SEO
- All `<img>` must have **descriptive alt text** — see `06-keyword-strategy.md` for the full alt text mapping per asset
- Alt text format: English description first. When the image is used on a treatment/gallery page, append the Bengali supplement in parentheses
- Example: `alt="Dr. Murshidul Arefin performing gallbladder operation in Dhaka (পিত্তথলির অপারেশন বিশেষজ্ঞ ডাঃ আরেফিন)"`
- Use `loading="lazy"` on below-fold images
- Keep file names slug-friendly (no spaces, lowercase) — already done via asset rename
- Provide `title` attribute on hero/feature images with the primary keyword

## Internal linking
- Every page must link to at least 3 other pages (matches CAF density rule)
- Anchor text should include keywords from both English Tier 1 and Bengali Tier 1 (see `06-keyword-strategy.md`)
- Use `<strong><a>` pattern for high-density keyword links inside body paragraphs
- Bengali anchor text example: `<strong><a href="/treatment/">পিত্তথলির পাথর অপারেশন</a></strong>`

## Heading hierarchy
- Single H1 per page (the page topic)
- H2 = section titles
- H3 = card / sub-section
- Never skip levels
- On treatment pages, include ONE H2 in Bengali: e.g., `<h2>পিত্তথলির পাথর অপারেশন — গল ব্লাডার সার্জারি</h2>`
