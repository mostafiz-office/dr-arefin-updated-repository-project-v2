# 07 — Videos Section: Layout Variations

All variants share:
- Container: `max-w-[1248px]` centered, `px-6`
- Vertical rhythm: `py-20 md:py-28`
- Background: `hsl(var(--background))` (light surface)
- Heading font: `font-arefin-heading` (Ubuntu 700)
- Body font: Poppins (inherited)
- Animation: `hero-anim-fade-up` with staggered `hero-d-{0..700}` delays

## Shared header
- Eyebrow chip: `RECENT VIDEOS` (uppercase, tracked, primary color)
- H2: `Recent YouTube Videos`
- Lead: 1-line intro about Dr. Arefin's video education channel
- All variants display max 8 videos

---

## Variation A — Editorial Grid
**Aesthetic**: Swiss medical journal. Dense information, restrained styling.

- Layout: 4-col desktop / 2-col tablet / 1-col mobile
- Thumbnail: 16:9 ratio, `rounded-lg`, soft hover (`scale-[1.02]`, `shadow-md`)
- Caption: title clamped to 2 lines under thumbnail, small play-icon chip top-right on hover
- No card chrome — pure photo grid

## Variation B — Featured + Grid
**Aesthetic**: Editorial magazine. Clear hierarchy, hero-style first video.

- Featured first video: 16:9, full-width col-span-2 on desktop, large title overlay on hover
- Remaining 7 videos: 3-col grid (or 2-col tablet, 1-col mobile) below
- Featured has play button overlay and short description
- Subtle gradient overlay on featured for text legibility

## Variation C — Carousel Showcase
**Aesthetic**: Premium boutique. Horizontal momentum, tactile interaction.

- Horizontal scroll-snap carousel, `snap-x snap-mandatory`
- Each card: 320px wide on desktop, 260px on mobile, peek-style 1.2 cards visible at edges
- Left/right navigation arrows (hidden on mobile, swipe-only)
- Card: thumbnail + title below + soft shadow, lift on hover
- Snap-aligned start

---

## Modal Player (shared)
- Backdrop: `bg-black/80`, `backdrop-blur-sm`
- Container: `aspect-video`, `max-w-5xl`, `rounded-2xl overflow-hidden`
- Iframe: `youtube.com/embed/{id}?autoplay=1&rel=0`
- Close button: top-right, `lucide-react` X icon, white on transparent
- Body scroll locked on open via `document.body.style.overflow = "hidden"`
- ESC key + backdrop click both close

## Loading state
- 8 skeleton cards (`bg-muted` with subtle `animate-pulse`)

## Error state
- Centered message + "Try again" button
- Logged to console with full error
