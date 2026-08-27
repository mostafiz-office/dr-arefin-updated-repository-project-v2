# Initiatives Section — Variations (Project 04)

---

## Variation A: Editorial Cards (Minimal Chrome)

**Aesthetic**: Swiss editorial — clean typography, generous whitespace, subtle icon accents.

**Structure**:
- Centered H2 with uppercase eyebrow "OUR PROGRAMS"
- Intro paragraph max-w-2xl
- 3-column grid: equal-width cards
- Each card: large icon (48px) top-left, H3 title, paragraph
- No visible card borders — whitespace defines separation
- Thin divider line between cards on desktop

**Interaction**:
- Card hover: icon shifts to primary-deep color
- Thin accent line appears below icon
- Text remains static

**Elevation**: Restrained, medical-journal aesthetic

---

## Variation B: Elevated Cards (Glass-Morphic)

**Aesthetic**: Premium clinical — floating cards with soft shadows, rounded corners, elevated icon containers.

**Structure**:
- Centered H2 with pill badge eyebrow
- Intro paragraph with larger font size (editorial lead)
- 3-column grid with gap-8
- Cards: rounded-2xl, subtle border, generous padding (p-8)
- Icon containers: 64px circles, soft gradient background
- Title + description below icon

**Interaction**:
- Card hover: shadow deepens, slight scale on icon container (1.05)
- Background shifts to slightly warmer tint
- Border color transitions to primary-light

**Elevation**: Boutique private practice feel

---

## Variation C: Feature Grid (Bold Asymmetric)

**Aesthetic**: Impact-focused — larger cards, prominent numbers, stat-like presentation.

**Structure**:
- Left-aligned H2 (not centered) with accent underline
- Full-width intro paragraph
- 3-column with asymmetric sizing (center card slightly larger)
- Each card: large number "01 / 02 / 03" in muted sage, icon inline with title
- Description below with generous line-height
- CTA link at bottom of each card: "Learn more →"

**Interaction**:
- Card hover: background shifts to accent color (soft sage)
- Number becomes more prominent (color shift to primary)
- CTA arrow shifts right

**Elevation**: Nonprofit/NGO impact report aesthetic — shows scale of community work

---

## Shared Specifications

**Typography**:
- Eyebrow: 12px, uppercase, tracking-widest, primary color
- H2: 36px (mobile) / 42px (desktop), font-arefin-heading, tight tracking
- Intro: 16px, line-height 1.75, muted-foreground
- Card title: 20px, font-semibold, foreground
- Card body: 14px, line-height 1.7, muted-foreground

**Spacing**:
- Section padding: py-20 md:py-28
- Container: max-w-[1248px]
- Grid gap: gap-8 (32px)

**Motion**:
- Scroll reveal: fade-up, stagger 100ms
- Hover: color/opacity/shadow only — no translate transforms
- Duration: 300ms ease-out