# 05 — Initiatives Section (Project 04)

**Spec**: `spec/04-section-variations/05-initiatives-04/`

---

## Purpose

Display Dr. Arefin's three core initiatives (Surgery Assistance, Health Education, Support Groups) in a premium, trust-building layout that emphasizes community impact beyond clinical practice.

---

## Design Goal

Premium medical aesthetic — clean, spacious, editorial card layouts with sophisticated hover states. Each card should feel like a curated program offering, not a generic service list.

---

## Structural Requirements

| Element | Constraint |
|---------|------------|
| Section heading | H2, centered, eyebrow label above |
| Intro paragraph | Centered, max-w-3xl, muted color |
| Cards grid | 3-column desktop, 1-column mobile |
| Card height | Equal height across row |
| Hover behavior | Subtle shadow + icon lift (no position shift) |

---

## Copy (verbatim)

**Heading**: Our Initiatives

**Intro**: At Dr. Murshidul Arefin's Hepatobiliary & Liver Care Center, our mission extends beyond the operation theater. We're committed to empowering patients and their families through **education**, **compassion**, and **continuous support.**

**Card 1 — Surgery Assistance**
- Icon: HeartHandshake or Stethoscope
- Description: We offer guidance and support for patients in need of **complex liver, gallbladder, and pancreatic surgeries**, helping them access the right care and **financial assistance for timely treatment.**

**Card 2 — Health Education**
- Icon: GraduationCap or BookOpen
- Description: Through awareness programs and liver health seminars, Dr. Arefin and his team **educate the community about early detection, lifestyle management, and prevention** of liver diseases in Bangladesh.

**Card 3 — Support Groups**
- Icon: Users or Heart
- Description: Our patient network connects individuals and families who are undergoing **hepatobiliary or liver transplant treatments**, creating a **safe space for emotional support and recovery.**

---

## A11y & SEO

- Section labeled with `aria-label="Our Initiatives"`
- Cards use `<article>` with proper heading hierarchy (H3)
- Strong-anchor links on bolded keywords for SEO density

---

## Motion Spec

- Scroll-triggered fade-up reveal for heading + cards
- Stagger delay: 0ms, 100ms, 200ms for cards
- Hover: shadow intensifies, icon color shifts to primary-deep
- No positional transform (translateY/X prohibited per design system)

---

## Tokens

- Background: `--background` (sage-tinted light)
- Card background: `--card`
- Card border: `--border`
- Heading: `--foreground`
- Body: `--muted-foreground`
- Icon background: `--accent` (soft sage)
- Icon color: `--primary`
- Hover shadow: `0 8px 30px -8px hsl(var(--primary) / 0.15)`

---

## Reference Files

- `02-initiatives-04.md` — Component structure
- `03-initiatives-04-colors-themes.md` — Color token mapping
- `04-initiatives-04-copy-variations.md` — A/B/C written variations