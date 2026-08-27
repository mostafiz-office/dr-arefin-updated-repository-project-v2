# Folder Structure — Dr. Arefin Elementor Export

```
public/elementor-export/
├── README.md                          ← deployment guide
├── global.css                         ← all design tokens + shared components (dark default)
├── index.html                         ← homepage assembly reference (block-by-block comments)
│
└── blocks/
    ├── README.md                      ← per-block paste guide
    ├── arefin-interactivity.js        ← sticky header, mobile nav, FAQ, marquee, mentor carousel, sticky stack, scroll-reveal
    │
    ├── global/
    │   ├── header.html                ← dark sticky transparent → solid header
    │   ├── footer.html                ← cool blue-black footer (Variant D)
    │   └── cta-band.html              ← reusable dark CTA band
    │
    ├── home/                          ← DrArefinHomeDark.tsx, section-by-section
    │   ├── 01-hero.html
    │   ├── 02-value-proposition.html
    │   ├── 03-about.html
    │   ├── 04-initiatives.html
    │   ├── 05-videos.html
    │   ├── 06-metrics.html
    │   ├── 07-cta-band-transform.html
    │   ├── 08-services-sticky-stack.html
    │   ├── 09-patient-stories.html
    │   ├── 10-testimonials.html
    │   ├── 11-final-cta.html
    │   └── 12-faq.html
    │
    ├── about/                         ← AboutDark.tsx (next page export)
    ├── treatment/
    ├── liver-surgery/
    ├── gallbladder-surgery/
    ├── pancreatic-surgery/
    ├── biliary-surgery/
    ├── mentorship/
    ├── articles/
    ├── article-single/
    ├── gallery/
    ├── gallery-image/
    ├── contact/
    ├── donate/
    ├── imprint/
    ├── privacy/
    ├── cookie/
    └── disclaimer/
```

## Numbering
Files inside each page folder are **strictly numbered** in DOM order. New sections inserted later get a letter suffix (`02b-…`) to avoid renumbering existing files.

## Naming
- Block files: kebab-case, `.html`, no `<html>/<body>` wrapper — only the section markup.
- Each block file starts with an HTML comment header:
  ```html
  <!-- BLOCK: home/01-hero — Section 1 — Dr. Arefin Hero
       Source: src/components/arefin/hero-variations/HeroV04InteractiveOrgans.tsx
       Paste into: Elementor Flexbox Container (full width, no padding) → HTML widget
  -->
  ```
