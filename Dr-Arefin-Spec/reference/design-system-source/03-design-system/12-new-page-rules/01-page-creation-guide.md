# New Page Creation Guide

> This guide ensures any AI can build new pages that are visually consistent with the existing design language.

---

## 1. Page Scaffold

Every page follows this structure:

```html
<div class="min-h-screen">
  <Navbar />          <!-- Sticky header — same on all pages -->
  
  <!-- Page-specific content -->
  <HeroSection />     <!-- Optional — can vary per page -->
  <Section />         <!-- One or more content sections -->
  
  <Footer />          <!-- Same on all pages -->
  <AIAssistant />     <!-- Floating button — same on all pages -->
</div>
```

---

## 2. Shared Components (Never Rebuild)

These components are global and identical on every page:
- **Navbar** (header, menu, auth buttons)
- **Footer** (links, social, newsletter)
- **AIAssistant** (floating button)

---

## 3. Hero Section Rules

Each page may have a hero, but it can vary:

| Page Type | Hero Style |
|-----------|------------|
| Landing / Home | Full gradient hero with title, subtitle, orbs |
| Interior / Content | Smaller hero with just title + breadcrumb |
| Utility (404, login) | Minimal — centered content, no gradient |

All hero variants must use:
- `--gradient-start` and `--gradient-end` for backgrounds
- `fade-in-up` entry animation
- Two-tone heading pattern (neutral + `text-primary` keyword)

---

## 4. Content Section Checklist

When building a new section, apply:

- [ ] Container: `max-w-6xl mx-auto px-4 py-16`
- [ ] Section header: centered, two-tone heading, muted subheading
- [ ] Header animation: `animate-fade-in-up`
- [ ] Content animation: staggered `fade-in-up` with `delay-*`
- [ ] Grid: responsive (`sm:grid-cols-2 lg:grid-cols-3`)
- [ ] Cards: `rounded-2xl border-border bg-card p-6 shadow-sm`
- [ ] Card hover: lift + shadow + border shift (see card spec)
- [ ] All colors from semantic tokens
- [ ] Spacing follows rhythm in `10-spacing-layout`

---

## 5. CTA Section Pattern

For call-to-action blocks:

```html
<section class="bg-secondary py-20">
  <div class="container text-center max-w-2xl mx-auto">
    <h2 class="text-3xl font-bold text-foreground">Heading</h2>
    <p class="mt-4 text-muted-foreground">Description</p>
    <button class="mt-8 slide-btn ...">Action</button>  <!-- slide button -->
  </div>
</section>
```

---

## 6. Content Page Pattern (Article / Detail)

```html
<article class="container max-w-3xl py-16 prose">
  <h1>Page Title</h1>
  <p class="text-muted-foreground">Intro</p>
  <!-- Body content with semantic HTML -->
</article>
```

- Use `prose` class (from `@tailwindcss/typography`) for rich text
- Headings: `text-foreground`
- Body text: `text-foreground`
- Links: `text-primary hover:underline`

---

## 7. Form Page Pattern

- Center the form: `max-w-md mx-auto py-16`
- Card wrapper: `bg-card rounded-2xl p-8 shadow-xl border-border`
- Input styling: same as search input (see search spec)
- Submit button: primary with slide effect
- Validation: inline error messages in `text-destructive`

---

## 8. Responsive Rules

| Breakpoint | Behavior |
|-----------|----------|
| < 640px (mobile) | Single column, full-width cards, stacked layouts |
| 640–1023px (tablet) | 2-column grids, slightly reduced padding |
| ≥ 1024px (desktop) | Full layout, horizontal nav, 3–4 column grids |

Menu switches from horizontal to hamburger at `lg` (1024px).

---

## 9. Data Architecture

All page content should be stored in the SQLite database and fetched via `useDbQuery` hooks. This ensures:
- Content is CMS-ready for future WordPress migration
- No hardcoded text in components
- Easy internationalization later

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
