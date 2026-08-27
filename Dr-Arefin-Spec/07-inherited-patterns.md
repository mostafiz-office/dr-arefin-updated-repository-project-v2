# Inherited Patterns — THE CONTRACT

> **Read this first.** This file lists every pattern from the CAF Patronato Fondi project that **must** be carried over verbatim to Dr-Arefin. Only the **brand tokens** (colors/fonts in `01-design-system.md`) and the **content** (in `pages/`) change.

## 1. Animations (from `tailwind.config.ts` + `useScrollReveal` hook)

| Animation | Use case | Source |
|-----------|----------|--------|
| `fade-in` (300ms ease-out + translateY 10→0) | Section reveals on scroll | `useScrollReveal` hook + `<Reveal>` wrapper |
| `scale-in` (200ms, 0.95→1, opacity 0→1) | Card mount | `tailwind.config.ts` keyframes |
| `accordion-down/up` (200ms) | FAQ, mobile menu | Radix Accordion |
| `slide-in-right` (300ms) | Sheet/drawer | shadcn Sheet |
| Hero image dual-state hover (light↔dark fade) | Homepage hero | `mem://features/hero-design-system` |
| CountUp on number reveal | Stats section | `src/components/CountUp.tsx` |

## 2. Hover Effects

### Hard rules (NEVER violate)
- ❌ **No position shifts** on hover (`translateY/X` forbidden)
- ✅ Use **color, shadow, filter, border** changes only
- ✅ Sharp **zero-blur directional shadows** for image/heading hover (per `mem://style/visual-legibility/hover-shadow-standard`)

### Standard hover patterns
| Element | Hover behavior |
|---------|----------------|
| Service card | `border-left: 3px solid var(--primary)` + `box-shadow: 0 2px 0 0 hsl(var(--primary) / 0.4)` |
| Blog card (Atto pattern) | Same as service card + title color → `var(--primary)` + image `transform: scale(1.03)` |
| Primary button | `filter: brightness(1.15)` |
| Nav link | Underline animation (`.story-link` from animations preset) |
| Image (non-hero) | Sharp shadow appears, no lift |
| Hero interactive text | High-contrast light-green text-shadow (per `mem://style/hero-interaction-design`) |

## 3. Layout Patterns

| Pattern | Spec |
|---------|------|
| Container | `max-w: 1248px` · `padding-x: 1.5rem` · `box-sizing: border-box` |
| Section spacing | `py-20 md:py-28` standard · `py-16 md:py-20` compact |
| Service grid | 4-column desktop / 2-column tablet / 1-column mobile · `gap-30px` |
| Sticky stack cards (DesignMonks) | Each card sticks at top while next slides over · 2-column inner (text + image) |
| Numbered story cards (01/02/03) | Big numeral in `--primary` + heading + body, on dark bg |
| Blog grid | 3-column · square corners · vertical (image top, content bottom) |
| Footer columns | 4 columns desktop / 2 tablet / 1 mobile centered |

## 4. CTA Pill (Call/Book toggle) — SIGNATURE COMPONENT

Replicate the dual-state pill from CAF header exactly:
- Pill container: `border-radius: 9999px` · white outer
- Left half "Call": white bg, dark text → `tel:` link
- Center separator: small "Or" label
- Right half "Book": green bg (`--primary`), white text → `/contact/`
- Same component reused in CTA Band section

## 5. SEO HTML Rules (inherited from `mem://seo/html-coding-standards`)
- Single H1 per page
- Semantic HTML5 (`<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`)
- Strong-anchor links (`<strong><a>...</a></strong>`) for keyword density inside body paragraphs
- Inline SVGs for critical UI icons (no external icon font dependencies for above-fold)
- LocalBusiness JSON-LD on Home + Contact
- Alt text on every image

## 6. Component Library (shadcn/ui — same as CAF)
- Reuse `src/components/ui/*` (Button, Card, Accordion, Sheet, Tabs, etc.)
- Reuse `src/components/Header.tsx`, `Footer.tsx`, `CTABand.tsx`, `PageHero.tsx`, `ServiceCard.tsx`, `ContactForm.tsx`, `ContactInfoCards.tsx`, `ScrollToTop.tsx`, `CountUp.tsx`, `NavLink.tsx`
- Replace content + tokens; keep structure

## 7. Mobile Stability (inherited from `mem://constraints/mobile-ui-stability`)
- `html, body { overflow-x: hidden }` globally
- `lg` (1024px) is the desktop/mobile threshold

## 8. Accessibility (inherited from `mem://constraints/accessibility-compliance`)
- WCAG 2.1 AA contrast: 4.5:1 normal text, 3:1 large
- `--primary` (#22C55E) on `--background-dark` (#1C2A3C): contrast ≈ 5.8:1 ✅
- White text on `--background-dark`: contrast ≈ 12.6:1 ✅

## 9. CSS Architecture
- HSL only in `index.css` and `tailwind.config.ts`
- No `!important` (project-wide rule)
- No inline styles
- Semantic tokens only in components (never `text-green-500`, etc.)
- Tailwind utility classes preferred

## 10. What does NOT carry over from CAF
- ❌ Italian language → Dr. Arefin is **English-only**
- ❌ Multi-location structure (Fondi/Terracina/Cisterna) → single Dhaka location
- ❌ "FONDI 730" brand-identifier rule → not applicable
- ❌ WordPress Elementor static export (`public/elementor-export/`) → **NOT in scope** for Dr. Arefin (React-only build)
- ❌ Italian SEO keywords / Yoast Italian transition words