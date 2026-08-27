# SEO HTML Generation Rules (attoproperty.com.au Standard)

Reference: [attoproperty.com.au](https://attoproperty.com.au/) and [steam cleaning subpage](https://attoproperty.com.au/number-one-for-steam-cleaning-in-melton-tarneit-melbourne-cbd/)

> **MANDATORY**: Every page and component MUST follow these rules. This is the single source of truth for all SEO HTML output in this project.

---

## 1. Title Attributes — EVERY Element

Every interactive or semantic HTML element MUST carry a keyword-rich `title` attribute. No exceptions.

| Element | Title Content Pattern |
|---------|----------------------|
| `<a>` | Descriptive destination + location keywords + service context |
| `<strong>` | Expanded keyword context with location and trust signals |
| `<h1>` | Long-tail keyword variation of the heading with location |
| `<h2>` | Secondary keyword phrase + location + service descriptor |
| `<h3>` | Tertiary keyword or question-based long-tail |
| `<section>` / container `<div>` | SEO description of section content with location keywords |
| `<img>` | Descriptive alt text AND title with service + location |

### Examples (adapted for CAF project):
```tsx
// Section container
<section title="CAF Patronato Fondi – Assistenza 730 Online, ISEE e Dichiarazione Redditi a Fondi, Latina">

// Link
<Link to="/caf-730-online" title="CAF 730 Online a Fondi – Prenotazione e Compilazione Dichiarazione dei Redditi">

// Strong
<strong title="Servizio CAF 730 Online riconosciuto come il migliore a Fondi e Latina per compilazione e invio">

// Heading
<h1 title="CAF Patronato Fondi – Assistenza Fiscale 730, ISEE, Patronato INPS a Fondi e Latina">
```

---

## 2. H1/H2 Internal Linking Pattern

Primary headings MUST contain linked keywords wrapped in `<strong>` + `<Link>`. This is the signature attoproperty pattern.

### Homepage H1:
```tsx
<h1 title="CAF Patronato Fondi – Servizi 730, ISEE e Assistenza Fiscale a Fondi e Latina">
  <strong title="CAF 730 Online – Compilazione e Invio Dichiarazione a Fondi">
    <Link to="/caf-730-online" title="CAF 730 Online – Prenotazione Immediata a Fondi e Latina">
      730 Online
    </Link>
  </strong>,{" "}
  <strong title="Calcolo ISEE CAF a Fondi – Prenotazione e Assistenza Completa">
    <Link to="/caf-isee" title="CAF ISEE Fondi – Calcolo e Certificazione ISEE">
      ISEE
    </Link>
  </strong>{" "}e{" "}
  <strong title="Patronato CAF Fondi – Pensioni, NASpI, Pratiche INPS">
    <Link to="/patronato-inps" title="Patronato INPS a Fondi – Assistenza Previdenziale Completa">
      Assistenza Fiscale
    </Link>
  </strong>
</h1>
```

### Subpage H2 (within content):
```tsx
<h2 className="inner-seo-header" title="Servizio CAF 730 a Fondi e Latina – Compilazione Professionale">
  <strong title="CAF 730 Online riconosciuto come punto di riferimento a Fondi">
    <Link to="/caf-730-online" title="Prenota CAF 730 Online a Fondi – Invio Telematico Dichiarazione">
      CAF 730 Online a Fondi
    </Link>
  </strong>
</h2>
```

---

## 3. SEO Class Naming Convention

All content containers MUST use these semantic SEO class names:

| Class Name | Usage |
|------------|-------|
| `seo-page-parent-block` | Top-level page wrapper / hero section |
| `seo-parent-block` | Outer block wrapper for any content section |
| `seo-page-block` | Page-level content block |
| `seo-container-para` | Paragraph container for keyword-rich body text |
| `paragraph-parent-block` | Parent of paragraph content |
| `inner-seo-header` | H2/H3 inside content blocks (not page hero) |

### Nesting Pattern:
```tsx
<div className="paragraph-parent-block seo-parent-block seo-page-block seo-page-parent-block">
  <div className="seo-container-para">
    {/* Keyword-rich paragraph content here */}
  </div>
</div>
```

---

## 4. Keyword-Rich Body Text Wrapping

Every keyword mention in body paragraphs MUST be wrapped with `<strong>` + `<Link>` + `title` attributes. No naked keyword text.

### Pattern:
```tsx
<div className="seo-container-para">
  Cerchi assistenza fiscale professionale? Il nostro{" "}
  <strong title="CAF 730 Online a Fondi – Invio telematico e compilazione professionale della dichiarazione dei redditi">
    <Link to="/caf-730-online" title="Servizio CAF 730 Online a Fondi e Latina – Prenota Subito">
      CAF 730 Online
    </Link>
  </strong>{" "}
  offre compilazione rapida e accurata. Inoltre, il nostro servizio{" "}
  <strong title="Calcolo ISEE a Fondi – Certificazione immediata per bonus e agevolazioni">
    <Link to="/caf-isee" title="CAF ISEE a Fondi – Prenotazione Calcolo ISEE Online">
      Calcolo ISEE
    </Link>
  </strong>{" "}
  ti permette di accedere a bonus e agevolazioni sociali.
</div>
```

---

## 5. Key Takeaways Section (Subpage Pattern)

Every service subpage MUST include a "Punti Chiave" / key takeaways section using ordered lists with H3 headings inside each item.

### Structure:
```tsx
<section className="seo-container-para">
  <ol className="atto-key-takeaways-list">
    <li className="atto-kt-item">
      <h3 className="inner-seo-header atto-kt-text" 
          title="Question-based long-tail keyword about this service">
        <strong title="Expanded context with trust signal and location">
          <Link to="/relevant-slug" title="Descriptive destination with location">
            Key point statement
          </Link>
        </strong>
        {" "}additional context with more{" "}
        <Link to="/another-slug" title="Secondary internal link description">
          linked keywords
        </Link>
      </h3>
    </li>
    {/* More items... */}
  </ol>
</section>
```

---

## 6. Service Card Grid (Homepage)

Each service card MUST wrap both the image and heading in links with title attributes:

```tsx
<Link to="/caf-730-online">
  <img alt="CAF 730 Online a Fondi" title="Servizio CAF 730 Online – Fondi e Latina" />
</Link>
<h2>
  <Link to="/caf-730-online" title="CAF 730 Online – Compilazione Dichiarazione dei Redditi a Fondi">
    CAF 730 Online
  </Link>
</h2>
<p>
  <Link to="/caf-730-online" title="Prenota CAF 730 Online a Fondi – Assistenza Fiscale Completa">
    Description paragraph also fully linked
  </Link>
</p>
```

---

## 7. JSON-LD Schema

### Homepage — `LocalBusiness`:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "CAF Patronato Fondi",
  "description": "Centro di Assistenza Fiscale a Fondi – 730, ISEE, Patronato INPS",
  "url": "https://fondi-assist-core.lovable.app",
  "telephone": "+39-XXX-XXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Via ...",
    "addressLocality": "Fondi",
    "addressRegion": "Lazio",
    "postalCode": "04022",
    "addressCountry": "IT"
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "sameAs": []
}
```

### Per-Location `LocalBusiness` Schema (Area Section):
Each location card MUST output its own JSON-LD `LocalBusiness` schema with `alternateName`, `geo`, `areaServed` (with `sameAs` Wikipedia link), and `aggregateRating`.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "CAF Patronato Fondi",
  "alternateName": "CAF Patronato – Assistenza Fiscale Fondi",
  "image": "hero-image-url",
  "url": "https://fondi-assist-core.lovable.app",
  "telephone": "+393488469367",
  "priceRange": "€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Fondi",
    "addressLocality": "Fondi",
    "addressRegion": "Lazio",
    "postalCode": "04022",
    "addressCountry": "IT"
  },
  "areaServed": [
    { "@type": "City", "name": "Fondi", "sameAs": "https://it.wikipedia.org/wiki/Fondi" },
    { "@type": "AdministrativeArea", "name": "Provincia di Latina" }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.3572,
    "longitude": 13.4283
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "42",
    "bestRating": "5",
    "worstRating": "1"
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "serviceType": ["CAF 730 Online", "Calcolo ISEE", "Patronato INPS"]
}
```

### Service Pages — `Service`:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "CAF 730 Online",
  "description": "Compilazione e invio telematico del modello 730 a Fondi e Latina",
  "provider": {
    "@type": "LocalBusiness",
    "name": "CAF Patronato Fondi"
  },
  "areaServed": {
    "@type": "City",
    "name": "Fondi"
  }
}
```

---

## 8. Internal Linking Strategy

### "Servizi Correlati" Section (Bottom of Every Service Page):
- Link to 3 other service pages
- Each link uses `<strong>` + `<Link>` + `title` pattern
- Section title uses H2 with linked keyword

### Footer Links:
- All service links MUST have `title` attributes
- Location keywords in footer link titles

### Header Navigation:
- Nav labels match high-intent keywords exactly
- Every nav `<Link>` has descriptive `title` attribute
- Dropdown items have expanded `title` attributes
- **Blog dropdown**: Must include "Ultimi Articoli" (→ /blog) + 3 featured blog post links with keyword-rich titles
- Multiple dropdowns supported (Servizi, Blog) — each with independent open/close state

---

## 9. Content Section Title Attributes

Every major `<section>` or container `<div>` wrapping content MUST have a `title` attribute describing the section's content with location keywords:

```tsx
<section 
  className="seo-page-parent-block"
  title="Servizi CAF Patronato a Fondi – 730 Online, ISEE, Patronato INPS e Dichiarazione Redditi"
>
```

---

## 10. Image SEO

All images MUST have:
- `alt` text with service + location keywords
- `title` attribute with expanded keyword context
- First image `fetchPriority="high"` and `loading="eager"`
- Subsequent images `loading="lazy"`

```tsx
<img 
  src={heroImage}
  alt="CAF 730 Online a Fondi – Assistenza Fiscale"
  title="Servizio CAF 730 Online – Centro Assistenza Fiscale a Fondi e Latina"
  loading="eager"
  fetchPriority="high"
/>
```

---

## Summary Checklist (Per Page)

- [ ] Every `<a>` / `<Link>` has `title` attribute
- [ ] Every `<strong>` has `title` attribute  
- [ ] Every `<h1>`, `<h2>`, `<h3>` has `title` attribute
- [ ] H1 contains `<strong><Link>` keyword pairs
- [ ] Body paragraphs wrap keywords in `<strong><Link title="...">` 
- [ ] SEO class names applied: `seo-parent-block`, `seo-container-para`, `seo-page-block`, `seo-page-parent-block`, `paragraph-parent-block`
- [ ] JSON-LD schema in `<Helmet>` or `<script>` tag
- [ ] "Servizi Correlati" section with 3 linked services
- [ ] Section containers have `title` attributes
- [ ] Images have `alt` + `title`
