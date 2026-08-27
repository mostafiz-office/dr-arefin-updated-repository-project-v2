# Section 11 — Real Stories, Real Recoveries (Google Reviews Testimonial Section)

## Purpose
Display verified Google Reviews for **Hepatobiliary Surgeon Dr. Murshidul Arefin** as social proof on the homepage. The section shows the live 5.0 rating, 42 review count, and a curated set of patient testimonials with full Google branding for trust.

## Source of Truth
- **Google Maps share link**: `https://share.google/VrVz3EP6Zhtl72upy`
- **Place name**: Hepatobiliary Surgeon Dr. Murshidul Arefin
- **Place CID**: `15108412135090448897`
- **Google kgmid**: `/g/11xv4xzykl`
- **Aggregate**: ⭐ 5.0 · 42 reviews · Popular Diagnostic Center, Dhaka 1205, Bangladesh

## Data Architecture (Phase 1 — current)
Reviews are hardcoded in `src/components/arefin/testimonials-variations/data.ts` matching the Google Places API review schema exactly. This makes Phase 2 (live API) a one-file swap.

### Schema (mirror of Google Places `place.reviews[]`)
```ts
type GoogleReview = {
  author_name: string;          // "Sadia R."
  author_initial: string;       // "S" — for avatar (we never AI-generate faces)
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  relative_time_description: string;  // "2 weeks ago"
  language: 'en' | 'bn';
  source_url: string;            // link back to Google review
};
```

### Aggregate
```ts
type AggregateRating = {
  rating: 5.0;
  total: 42;
  source_url: string;            // link to all Google reviews
};
```

## Phase 2 Migration Path (Future, optional)
Replace `data.ts` with a fetch hook that calls one of:
1. **Featurable API** (free, no API key, returns full review list via Place ID) — closest match to WordPress "no-API" plugins
2. **Google Places API** via Lovable Cloud edge function (official, max 5 reviews)
3. **EmbedSocial / Trustindex paid widgets**

Component contracts do not change. Only the data hook.

## Trust Signals (mandatory on every variation)
- Google "G" logo (inline SVG, brand colors `#4285F4 #34A853 #FBBC05 #EA4335`)
- "Verified on Google" or "Posted on Google" label
- Source link to actual Google review listing
- Star rating rendered with proper accessible labels
- Aggregate badge: "★ 5.0 · 42 verified reviews on Google"

## Three Variations

### Variation A — Editorial Spotlight (Magazine quote carousel)
- One review center stage at any time
- Massive serif opening quote glyph (")
- Patient initial avatar (circle, brand-tinted), name, relative date, ★★★★★
- Auto-advances every 7s, pause on hover/focus
- Arrow nav + dot pagination
- "G" badge bottom-left, source link bottom-right
- Soft cream/pale background, deep navy text — calm, authority-focused

### Variation B — Aurora Wall (Bento masonry grid)
- 6 reviews in a staggered grid (1 featured spans 2 cols)
- Each card: ★ rating, review text (truncate at ~3 lines, expandable), patient initial avatar, relative date, "G" badge
- Hover: lift via sharp directional shadow (per project hover-shadow standard) + subtle Google-blue accent ring glow on featured
- Section header includes large "★ 5.0 · 42 reviews on Google" badge
- Modern, scannable, social-proof-dense

### Variation C — Cinematic Marquee (Attention-grabbing hero strip)
- Hero block top: massive "5.0" with ★★★★★ row + "42 verified Google reviews" sub-label + Google "G" badge
- Below: infinite horizontal auto-scrolling row of compact review cards (CSS `@keyframes` only — no JS animation lib)
- Pause on hover; click to open lightbox-style expanded view (deferred — Phase 1 hover-pause only)
- Dark green gradient brand band background, glowing accents
- "View all 42 reviews on Google →" CTA pulsing gently
- Cinematic, conversion-focused

## Accessibility
- Each star group exposes `aria-label="Rated 5 out of 5 stars"`
- Carousels expose `aria-roledescription="carousel"`, prev/next buttons labelled
- Marquee respects `prefers-reduced-motion` (pauses animation)
- All source links have descriptive `aria-label`s

## Routing
- Preview page: `/testimonials` (and `/testimonials/`)
- Anchor IDs: `#variant-a`, `#variant-b`, `#variant-c`

## File Layout
```
src/components/arefin/testimonials-variations/
  data.ts                          # GoogleReview[] + aggregate
  GoogleBadge.tsx                  # Inline-SVG "G" logo + label
  StarRating.tsx                   # Accessible ★ row
  TestimonialsV04LightA.tsx        # Editorial Spotlight
  TestimonialsV04LightB.tsx        # Aurora Wall
  TestimonialsV04LightC.tsx        # Cinematic Marquee
src/pages/TestimonialsSectionVariations.tsx
spec/04-section-variations/11-real-stories/
  02-real-stories.md
  03-real-stories-colors-themes.md
  04-real-stories-data-source.md
```
