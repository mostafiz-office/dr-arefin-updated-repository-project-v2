# Metrics Section — Variations (Project 04)

---

## Variation A: Editorial Banner (Horizontal Strip)

**Aesthetic**: Swiss medical journal — horizontal 4-column banner with large numerals and thin vertical dividers.

**Structure**:
- Centered eyebrow "PROFESSIONAL IMPACT" + H2 "Professional Impact Metrics"
- Optional one-line subtitle
- 4-column horizontal stat row, equal width
- Each cell: massive numeral (text-5xl/6xl), short label below, tiny uppercase category above
- Thin vertical dividers between cells (1px, border/40)
- Centered alignment within each cell

**Interaction**:
- CountUp animates each numeral on scroll-in
- Numerals reveal with staggered fade-up (0/100/200/300ms)
- No hover state on cells — purely informational

**Elevation**: Restrained, authoritative, hospital-annual-report

---

## Variation B: Elevated Cards (Premium Glass)

**Aesthetic**: Boutique private practice — 4 floating cards with soft shadows, gradient accent stripes, category chips.

**Structure**:
- Centered H2 + intro paragraph
- 4-column grid (gap-6) — collapses to 2-col tablet, 1-col mobile
- Each card: rounded-2xl, subtle border, p-8
- Top accent stripe (4px, primary color) on card top edge
- Category chip (small pill, accent bg, primary text) at top
- Massive numeral mid-card
- Label below numeral, muted-foreground

**Interaction**:
- CountUp on scroll-in
- Card hover: shadow deepens, accent stripe brightens
- No translate — color/shadow only

**Elevation**: Premium clinical, investor-deck quality

---

## Variation C: Asymmetric Feature (Heading + Stats Split)

**Aesthetic**: NGO impact-report style — heading/intro on left, stats grid on right, with offset accent block.

**Structure**:
- 2-column grid (5/7 split desktop, stacked mobile)
- Left column: eyebrow, H2, intro paragraph, optional CTA "View credentials →"
- Right column: 2x2 stats grid
- Each stat: numeral + label, with subtle dot separator and category microcopy
- Decorative offset accent block behind right column (sage/accent color, -z-10)

**Interaction**:
- CountUp staggered on scroll-in
- Hovering a stat highlights its label color
- CTA arrow translates on hover

**Elevation**: Editorial impact report, evokes annual surgical volume disclosures

---

## Shared Specifications

**Typography**:
- Eyebrow: 12px, uppercase, tracking-widest, primary color
- H2: 36px (mobile) / 42px (desktop), font-arefin-heading, tight tracking (-0.02em)
- Numeral: text-5xl md:text-6xl lg:text-7xl, font-arefin-heading, foreground
- Label: 14-16px, muted-foreground, line-height 1.5
- Category: 11px, uppercase, tracking-widest, primary

**Spacing**:
- Section padding: py-20 md:py-28
- Container: max-w-[1248px]
- Grid gap: gap-6 to gap-8

**Motion**:
- CountUp duration: 2000ms with easeOutQuart
- Reveal stagger: 0/100/200/300ms across the 4 cells
- No translate on hover — color/shadow/border only
- Duration: 300ms ease-out
