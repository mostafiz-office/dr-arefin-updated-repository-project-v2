# Atto Property Blog Page — Design Analysis & CSS Reference

> Source: https://attoproperty.com.au/blog  
> Captured: 2026-04-02  
> Purpose: 1:1 design reference for CAF Patronato Fondi blog page

---

## 1. Page Structure Overview

The blog page has 3 main sections:
1. **Hero Section** — Full-width background image overlay with H1, SEO body text, and contact buttons
2. **Blog Cards Grid** — 3-column grid of post cards (Elementor Loop Grid widget, template ID 17657)
3. **Author/Influencer Section** — 2-column author cards grid at the bottom

---

## 2. Hero Section

### Background
- Full-width container with background image (cleaning workers photo)
- Dark overlay on image for text contrast
- Elementor container class: `e-con-boxed`

### H1 Title
- **Tag**: `<h1 class="elementor-heading-title elementor-size-default">`
- **Content wrapped in**: `<a href="/blog/">` (self-linked)
- **Font**: System stack (Poppins/Ubuntu equivalent on Atto)
- **Color**: White (`#ffffff`)
- **Font-size**: ~2.5rem (40px) — large, bold heading
- **Font-weight**: 700 (bold)
- **Text-align**: Left
- **Hover on link**: Green color change (#379237 equivalent — Atto uses `#4CAF50` or similar green)

### SEO Body Text (`seo-container-para`)
- **Color**: White/light gray on dark overlay
- **Font-size**: ~1rem (16px)
- **Line-height**: 1.6-1.8
- **Contains**: `<strong><a>` keyword links (SEO pattern)
- **Inner SEO headers**: `<h2 class="inner-seo-header">` inline within paragraphs
- **Link color**: White with green hover

### Contact Buttons Bar
- **Container class**: `contact-buttons-on-page`
- **Inner class**: `dynamic-contact-cell-buttons`
- **Layout**: Inline-flex, centered, pill-shaped container
- **Background**: Green (#4CAF50 / #379237)
- **Border-radius**: ~50px (fully rounded pill)
- **Buttons**: 3 items — Call, WhatsApp, Email
- **Each button class**: `dynamic-contact-button`
  - Sub-classes: `dynamic-contact-call`, `dynamic-contact-whatsapp`, `dynamic-contact-email`
  - **Icon**: Font Awesome (`fa fa-phone`, `fa fa-whatsapp`, `fa fa-envelope`)
  - **Label**: `<span class="label call/whatsapp/email">`
  - **Color**: White text on green background
  - **Padding**: ~10px 20px
  - **Font-size**: ~0.9rem
  - **Hover**: Brightness filter increase

### Contact Buttons HTML Structure
```html
<div class="contact-buttons-on-page">
  <div class="dynamic-contact-cell-buttons">
    <a href="..." class="dynamic-contact-button dynamic-contact-call" title="Call">
      <i class="fa fa-phone" aria-hidden="true"></i>
      <span class="label call">Call</span>
    </a>
    <a href="..." class="dynamic-contact-button dynamic-contact-whatsapp" title="WhatsApp">
      <i class="fa fa-whatsapp" aria-hidden="true"></i>
      <span class="label whatsapp">WhatsApp</span>
    </a>
    <a href="..." class="dynamic-contact-button dynamic-contact-email" title="Email">
      <i class="fa fa-envelope" aria-hidden="true"></i>
      <span class="label email">Email</span>
    </a>
  </div>
</div>
```

---

## 3. Blog Cards Grid

### Grid Layout
- **Columns**: 3 (desktop), 2 (tablet), 1 (mobile)
- **Gap**: 30px row gap
- **Container**: `elementor-grid` with `elementor-grid-3`
- **Max-width**: ~1200px (boxed container)

### Individual Blog Card

#### Card Container
- **Tag**: `<article class="blog-card e-flex e-con-boxed e-con e-parent">`
- **Background**: White (`#ffffff`)
- **Border**: None default
- **Border-radius**: 0px (square corners)
- **Box-shadow**: None default (clean flat design)
- **Cursor**: `pointer` (entire card clickable via `make-column-clickable-elementor`)
- **Transition**: `all 0.3s ease`
- **Overflow**: Hidden (for image)

#### Card Hover State (CRITICAL)
- **Border-left**: `3px solid #379237` (green accent — appears from left)
- **Box-shadow**: `0 2px 0 0 rgba(55, 146, 55, 0.4)` (zero-blur bottom shadow, green tinted)
- **No translateY** — no vertical lift (matches our no-position-shift constraint)
- **Title color change**: H2 a turns green (#379237)

#### Featured Image
- **Container**: Flexbox child, takes full width of card
- **Aspect ratio**: ~16:10 or landscape (roughly 400x160px visible area)
- **Object-fit**: Cover
- **Overflow**: Hidden on container
- **Hover**: Slight scale on image (`transform: scale(1.05)`) with `transition: 0.5s ease`
- **No border-radius** on image (square)

#### Card Title (H2)
- **Tag**: `<h2 class="elementor-heading-title elementor-size-default">`
- **Font-size**: ~1.15rem (18-19px)
- **Font-weight**: 700 (bold)
- **Color**: Dark (#1a1a2e or near-black)
- **Line-height**: 1.3
- **Font-family**: System/Poppins equivalent
- **Link**: Wrapped in `<a>` tag
- **Hover color**: Green (#379237) — smooth transition
- **Max lines**: Typically 2 lines truncated with ellipsis (CSS line-clamp or natural overflow)
- **Class on widget**: `blog-card-header`

#### Author/Date Info
- **Class**: `blog-author-info`
- **Layout**: Inline list (`<ul class="elementor-inline-items">`)
- **Date format**: "February 3, 2026"
- **Date color**: Green (#379237)
- **Separator**: `|` pipe character (green)
- **Author name**: "Atto Writing Team"
- **Author color**: Green (#379237)
- **Font-size**: ~0.85rem (13-14px)
- **Font-weight**: 500

#### Excerpt/Paragraph
- **Class**: `blog-card-paragraph`
- **Color**: Gray (#6b7280)
- **Font-size**: ~0.95rem (15px)
- **Line-height**: 1.6
- **Max lines**: ~3-4 lines shown
- **Tag**: `<p>` inside widget container

#### Read More Button
- **Tag**: `<a class="elementor-button elementor-button-link elementor-size-sm">`
- **Text**: "Read More"
- **Color**: Green (#379237)
- **Font-size**: ~0.85rem
- **Font-weight**: 600
- **Icon**: Arrow right (`icon-arrow-right`) placed before text
- **Background**: Transparent
- **Border**: None
- **Hover**: Underline or brightness change
- **Arrow**: SVG/icon, same green color

---

## 4. Blog Card HTML Template (Elementor Loop Item #17657)

```html
<article class="blog-card e-flex e-con-boxed e-con e-parent" 
         style="cursor: pointer;" 
         data-column-clickable="[POST_URL]">
  <div class="e-con-inner">
    <!-- Featured Image (link wrapper) -->
    <a class="e-con-full e-flex e-con e-child" 
       style="background-image: url([IMAGE_URL]); background-size: cover;">
    </a>
    
    <!-- Content Column -->
    <div class="e-con-full e-flex e-con e-child">
      <!-- Title -->
      <div class="blog-card-header">
        <h2 class="elementor-heading-title">
          <a href="[POST_URL]">[TITLE]</a>
        </h2>
      </div>
      
      <!-- Date | Author -->
      <div class="blog-author-info">
        <ul class="elementor-inline-items">
          <li><time>[DATE]</time></li>
          <li>[AUTHOR]</li>
        </ul>
      </div>
      
      <!-- Excerpt -->
      <div class="blog-card-paragraph">
        <p>[EXCERPT]</p>
      </div>
      
      <!-- Read More -->
      <a class="elementor-button elementor-size-sm" href="[POST_URL]">
        <span class="elementor-button-icon">
          <i class="icon icon-arrow-right"></i>
        </span>
        <span class="elementor-button-text">Read More</span>
      </a>
    </div>
  </div>
</article>
```

---

## 5. CSS Rules (Reconstructed from Computed Styles)

```css
/* ===== BLOG CARD ===== */
.blog-card {
  background: #ffffff;
  border-left: 3px solid transparent;
  border-radius: 0;
  box-shadow: none;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

.blog-card:hover {
  border-left: 3px solid #379237;
  box-shadow: 0 2px 0 0 rgba(55, 146, 55, 0.4);
}

/* ===== CARD TITLE ===== */
.blog-card-header .elementor-heading-title {
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.3;
  color: #1a1a2e;
}

.blog-card-header .elementor-heading-title a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
}

.blog-card:hover .blog-card-header .elementor-heading-title a,
.blog-card-header .elementor-heading-title a:hover {
  color: #379237;
}

/* ===== AUTHOR/DATE INFO ===== */
.blog-author-info .elementor-inline-items {
  display: flex;
  align-items: center;
  gap: 0;
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
}

.blog-author-info .elementor-inline-items li {
  font-size: 0.85rem;
  font-weight: 500;
  color: #379237;
}

.blog-author-info .elementor-inline-items li + li::before {
  content: "|";
  margin: 0 0.5rem;
  color: #379237;
}

/* ===== EXCERPT ===== */
.blog-card-paragraph p {
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

/* ===== READ MORE ===== */
.blog-card .elementor-button {
  background: transparent;
  border: none;
  color: #379237;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.75rem 0 0;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.blog-card .elementor-button:hover {
  filter: brightness(1.15);
}

/* ===== FEATURED IMAGE ===== */
.blog-card .e-con-full.e-con.e-child:first-child {
  min-height: 200px;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.blog-card:hover .e-con-full.e-con.e-child:first-child {
  transform: scale(1.03);
}

/* ===== CONTACT BUTTONS ===== */
.contact-buttons-on-page {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.dynamic-contact-cell-buttons {
  display: inline-flex;
  align-items: center;
  background: #379237;
  border-radius: 50px;
  overflow: hidden;
  gap: 0;
}

.dynamic-contact-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 24px;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.dynamic-contact-button:hover {
  filter: brightness(1.2);
  background: rgba(255, 255, 255, 0.1);
}

/* ===== HERO H1 ===== */
.caff-page-hero h1.elementor-heading-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
}

.caff-page-hero h1 a {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.caff-page-hero h1 a:hover {
  color: #7ecf7e; /* lighter green on hover */
}

/* ===== SEO BODY TEXT ===== */
.seo-container-para {
  font-size: 1rem;
  color: #e0e0e0;
  line-height: 1.7;
}

.seo-container-para a {
  color: #ffffff;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.seo-container-para a:hover {
  color: #7ecf7e;
}

/* ===== INNER SEO HEADER ===== */
.inner-seo-header {
  display: inline;
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
  padding: 0;
}

/* ===== GRID LAYOUT ===== */
.elementor-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

@media (max-width: 1024px) {
  .elementor-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .elementor-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
```

---

## 6. Key Design Differences: Atto vs Current CAF Blog

| Feature | Atto Property | CAF Current |
|---------|--------------|-------------|
| Card layout | Vertical (image top, content bottom) | Horizontal (image left, content right) |
| Image aspect | ~16:10, square corners | Varies |
| Title font-size | 1.15rem | 1.15rem ✓ |
| Hover border | 3px left green | 3px left green ✓ |
| Hover shadow | Zero-blur bottom green | Soft blur shadow |
| Card border-radius | 0 (square) | May have radius |
| Date/Author color | Green #379237 | Green ✓ |
| Date/Author separator | Pipe `|` | Pipe `|` ✓ |
| Read More style | Green text + arrow icon | "Leggi di più →" ✓ |
| Contact bar | Green pill: Call/WhatsApp/Email | Call/Prenota pill |
| Grid columns | 3 | 3 ✓ |
| Grid gap | 30px | 28px |
| Card background | White | White ✓ |
| H1 hover | Green color | Green color ✓ |

---

## 7. Pagination
- Atto uses `numbers_and_prev_next` pagination type
- Data attributes: `data-page="1"`, `data-max-page="143"`
- Next page URL structure: `/blog/2/`

---

## 8. Screenshots

- `screenshot-hero.png` — Blog hero section with H1, body text, and contact buttons
- `screenshot-cards.png` — Blog cards grid (3 columns, normal state)
- `screenshot-card-hover.png` — Card hover state showing green left border and green title

---

## 9. Key Takeaways for CAF Implementation

1. **Card layout is VERTICAL** (image on top, content below) — not horizontal
2. **Zero border-radius** on cards (square corners)
3. **Green left border on hover** with zero-blur shadow
4. **No translateY/lift** on hover (matches our constraint)
5. **Contact buttons** use a single green pill bar with Call/WhatsApp/Email
6. **Title on hover** turns green (#379237)
7. **Image slightly scales** on hover (1.03x)
8. **Featured image has NO border-radius** (square)
9. **Grid gap is 30px**
10. **Card has cursor:pointer** — entire card is clickable
