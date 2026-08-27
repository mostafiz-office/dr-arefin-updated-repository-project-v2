# 09 — Call to Care · Layout Spec

## Variation A — Editorial Calm (light)
- **Surface**: `hsl(var(--background))`
- **Container**: `max-w-[1248px]` · centered · `py-24 md:py-32`
- **Inner**: centered text column · `max-w-3xl mx-auto text-center`
- **H2**: `font-arefin-heading` · `text-4xl md:text-5xl lg:text-6xl` · `leading-[1.1]` · color `--foreground`
- **Divider**: 1px hairline · `w-16 h-px bg-border` · centered · `my-8`
- **Body**: `text-lg md:text-xl` · `leading-relaxed` · color `--muted-foreground` · `<strong>` in `--foreground`
- **CTA**: `SlideButton` (primary) · `mt-10` · "Book an Appointment" → `/contact/`

## Variation B — Cinematic Dark (full-bleed)
- **Surface**: `hsl(var(--background-deepest))` · full-bleed (no container around outer)
- **Inner container**: `max-w-[1100px]` · `px-6` · `py-28 md:py-36` · centered text
- **Decorative glow**: absolutely positioned radial gradient using `--primary-glow / 0.18` behind heading; `pointer-events-none`
- **Eyebrow label**: `text-xs tracking-[0.3em] uppercase` · color `--primary-light`
- **H2**: `font-arefin-heading` · `text-4xl md:text-6xl lg:text-7xl` · color `--primary-foreground` (white)
- **Body**: `text-lg md:text-xl` · color `hsl(var(--primary-foreground) / 0.78)` · `<strong>` color `--primary-light`
- **CTA**: primary pill · larger size (`px-8 py-4 text-base`) · primary background · subtle outer ring `ring-1 ring-primary-light/30`

## Variation C — Split Card (mixed surface)
- **Outer surface**: `hsl(var(--surface-tint-2))` · `py-20 md:py-24`
- **Card**: `max-w-[1100px] mx-auto` · `bg-card` · `rounded-2xl` · `border border-border` · `p-10 md:p-14` · sharp directional shadow on hover (per `mem://style/visual-legibility/hover-shadow-standard`) — `hover:shadow-[8px_8px_0_0_hsl(var(--primary)/0.18)]` · `transition-shadow duration-300`
- **Grid**: `grid md:grid-cols-5 gap-10 items-center`
- **Left (col-span-3)**:
  - Eyebrow `Call to Care` · `text-xs tracking-[0.3em] uppercase` · color `--primary`
  - H2 · `font-arefin-heading text-3xl md:text-4xl lg:text-5xl` · color `--foreground`
- **Right (col-span-2)**:
  - Body · `text-base md:text-lg leading-relaxed` · color `--muted-foreground` · `<strong>` color `--foreground`
  - CTA · primary pill · `mt-6`

## Shared rules
- All H2s render via `font-arefin-heading`.
- Body bold emphasis: parse `**...**` → `<strong>` via `dangerouslySetInnerHTML`.
- Single CTA only (per user choice).
- Section components export default React function · live under `src/components/arefin/call-to-care-variations/`.
- Accessible focus rings on CTA per button system.
