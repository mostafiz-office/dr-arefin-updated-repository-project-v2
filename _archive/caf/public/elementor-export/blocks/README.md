# Elementor HTML Blocks — Copy-Paste Guide

## How to Use
For each page in WordPress/Elementor:
1. Add a **Flexbox Container** (Full Width, no padding)
2. Drag an **HTML widget** inside
3. Paste the corresponding block HTML
4. Repeat for each section

## Prerequisites
- `caff-global.css` uploaded and enqueued (see main plan)
- Lucide Icons CDN in `<head>`
- `caff-interactivity.js` loaded (see below)

## File Structure

### Homepage (`homepage/`)
- `01-hero.html` — Full-width hero section
- `02-trust-strip.html` — Stats bar
- `03-services.html` — 4-card service grid
- `04-why-choose-us.html` — Split layout with benefits
- `05-process.html` — 3-step process
- `06-testimonials.html` — 3-column testimonial cards
- `07-locations.html` — 3 location cards with ratings

### Chi Siamo (`chi-siamo/`)
- `01-page-hero.html`
- `02-mission-story.html`
- `03-values.html`

### Servizi (`servizi/`)
- `01-page-hero.html`
- `02-service-details.html` — All 4 service detail blocks
- `03-faq.html` — Accordion FAQ

### CAF 730 Online (`caf-730-online/`)
- `01-page-hero.html` — Page hero
- `02-service-content.html` — Main content with benefits + documents checklist
- `03-related-services.html` — Links to ISEE, Patronato, Dichiarazione

### CAF ISEE (`caf-isee/`)
- `01-page-hero.html` — Page hero
- `02-service-content.html` — Main content with 5 ISEE types
- `03-related-services.html` — Links to 730, Patronato, Dichiarazione

### Patronato INPS (`patronato-inps/`)
- `01-page-hero.html` — Page hero
- `02-service-content.html` — Main content with 8 service cards
- `03-related-services.html` — Links to 730, ISEE, Dichiarazione

### CAF Dichiarazione Redditi (`caf-dichiarazione-redditi/`)
- `01-page-hero.html` — Page hero
- `02-service-content.html` — Main content with 5 service types
- `03-related-services.html` — Links to 730, ISEE, Patronato

### Contatto General (`contatto/`)
- `01-page-hero.html`
- `02-contact-section.html` — Info cards + form + map
- `03-related-services.html`

### Contatto Fondi (`contatto-fondi/`)
- `01-page-hero.html` — Page hero for Fondi location
- `02-contact-section.html` — Contact cards + form + map (sede Fondi)
- `03-other-locations.html` — Links to Terracina and Latina

### Contatto Terracina (`contatto-terracina/`)
- `01-page-hero.html` — Page hero for Terracina location
- `02-contact-section.html` — Contact cards + form + map (sede Terracina)
- `03-other-locations.html` — Links to Fondi and Latina

### Contatto Latina (`contatto-latina/`)
- `01-page-hero.html` — Page hero for Latina location
- `02-contact-section.html` — Contact cards + form + map (sede Latina)
- `03-other-locations.html` — Links to Fondi and Terracina

### Blog (`blog/`)
- `01-page-hero.html` — Page hero
- `02-categories.html` — Category pill links
- `03-featured-posts.html` — 3 featured article cards
- `04-related-services.html` — Service cross-links

### Shared / Global (`global/`)
- `header.html` — Sticky header + mobile nav (set active class per page)
- `footer.html` — 4-column footer
- `cta-band.html` — Dark CTA strip (customize title/subtitle per page)

### JavaScript
- `caff-interactivity.js` — Combined JS for all pages

## Assembled Pages
Full page reference files are in the root `elementor-export/` folder:
- `index.html` — Homepage
- `chi-siamo.html` — About page
- `servizi.html` — All Services page
- `contatto.html` — General Contact page
- `caf-730-online.html` — CAF 730 Online service page
- `caf-isee.html` — CAF ISEE service page
- `patronato-inps.html` — Patronato INPS service page
- `caf-dichiarazione-redditi.html` — Dichiarazione Redditi service page
- `contatto-fondi.html` — Contact Fondi location page
- `contatto-terracina.html` — Contact Terracina location page
- `contatto-latina.html` — Contact Latina location page
- `blog.html` — Blog page
