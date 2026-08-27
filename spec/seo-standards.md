# SEO Standards & Patterns

Reference: [attoproperty.com.au](https://attoproperty.com.au/) and [steam cleaning subpage](https://attoproperty.com.au/number-one-for-steam-cleaning-in-melton-tarneit-melbourne-cbd/)

> **CRITICAL**: All SEO HTML generation MUST follow the comprehensive rules in `spec/seo-html-generation-rules.md`. This file is the summary; the rules file is the source of truth.

## 1. Title Attributes on ALL Elements
Every `<a>`, `<strong>`, `<h1>`, `<h2>`, `<h3>`, `<section>`, container `<div>`, and `<img>` MUST have keyword-rich `title` attributes with location keywords.

```html
<a href="/path" title="Keyword-rich description of destination with location">
<strong title="Expanded keyword context with trust signals and location">
<h1 title="Long-tail keyword variation of the heading with location">
<section title="SEO description of section content with location keywords">
<img alt="Service description" title="Expanded keyword context with location">
```

## 2. Internal Linking Inside H1/H2 Tags
Primary headings contain linked keywords wrapped in `<strong>` + `<Link>`:
```html
<h1 title="Long-tail keyword variation">
  <strong title="Keyword context for service A with location">
    <a href="/service-a-slug" title="Service A – Location description">Service A</a>
  </strong>,
  <strong title="Keyword context for service B with location">
    <a href="/service-b-slug" title="Service B – Location description">Service B</a>
  </strong>
</h1>
```

## 3. SEO Class Naming Convention
Use semantic SEO class names on ALL content containers:
- `seo-page-parent-block` — top-level page SEO container / hero
- `seo-parent-block` — outer block wrapper
- `seo-page-block` — page-level content block
- `seo-container-para` — paragraph container for keyword-rich body text
- `paragraph-parent-block` — parent of paragraph content
- `inner-seo-header` — H2/H3 inside content blocks

Nesting: `paragraph-parent-block seo-parent-block seo-page-block seo-page-parent-block` → `seo-container-para`

## 4. Keyword-Rich Paragraph Wrapping
Every keyword mention in body text MUST be wrapped:
```html
<strong title="Expanded keyword context with location and trust signal">
  <a title="Descriptive anchor title with location" href="/relevant-internal-slug">
    Keyword Phrase
  </a>
</strong>
```

## 5. Key Takeaways Section (Subpages)
Every service subpage includes an ordered list with `<h3>` headings, each containing `<strong><a>` linked keywords with detailed `title` attributes.

## 6. Service Card Grid
Images, headings, AND description paragraphs are all wrapped in links with title attributes pointing to the service page.

## 7. Schema / JSON-LD
- Homepage: `LocalBusiness` schema
- Service pages: `Service` schema with provider reference
- Contact page: `LocalBusiness` with `openingHours`

## 8. Internal Linking Strategy
- "Servizi Correlati" section on every service page linking to 3 other service pages
- Every link uses `<strong>` + `<Link>` + `title` pattern
- Footer and header links all carry `title` attributes

## 9. Header Navigation SEO
Navigation labels match high-intent keywords. Every nav link has descriptive `title` attributes.

## 10. Image SEO
All images have `alt` + `title` attributes with service + location keywords. Hero images use `fetchPriority="high"` and `loading="eager"`.
