# 01 — Audit & Gap: About Section (Project 04)

**Section:** About Dr. Murshidul Arefin · **Project sequence:** 04
**Status:** New section — no existing implementation on `/`. Spec follows the same `04-light` token system used by Hero LIGHT and Value Proposition LIGHT.

---

## Source content (verbatim from user brief)

**Heading:** About Dr. Murshidul Arefin

**Paragraph 1:**
> Dr. Murshidul Arefin is a highly skilled Hepatobiliary and Pancreatic Surgery Specialist based in Dhaka, Bangladesh, with a strong reputation for excellence in liver, gallbladder, bile duct, and pancreatic surgery.

**Paragraph 2:**
> He holds an MBBS from the University of Dhaka and an MS in Hepatobiliary Surgery from Bangabandhu Sheikh Mujib Medical University (BSMMU) — the country's leading medical institution. Currently serving as a Consultant in General, Laparoscopic, and Liver Transplant Surgery at Popular Medical College Hospital, Dhanmondi, Dr. Arefin provides advanced surgical care with precision and compassion.

**Paragraph 3:**
> With years of hands-on experience and a deep commitment to patient-well-being, he is recognized among the best hepatobiliary surgeons in Dhaka. His patient-first approach, ethical standards, and expertise in minimally invasive techniques have earned him the trust of thousands seeking reliable liver and biliary treatment in Bangladesh.

**Button:** Learn More → `/about/`
**Image:** `src/assets/dr-arefin-portrait.jpeg` (real photograph, supplied by client — never AI generated, per `mem://constraints/no-ai-images-of-real-people`)

---

## Layout requirement

- Two-column split: **text left, image right**
- Variation C may flip image-left for visual variety
- 1248px container, generous premium whitespace `py-24 md:py-32`
- Light theme — same `--hero-light-*` tokens as Hero/ValueProp light variants

## Design intent

Premium medical aesthetic — think top-tier private hospital / boutique surgeon site (Mayo, Cleveland Clinic). Editorial whitespace, refined typography, subtle accents, real portrait, no gimmicks. WCAG AA, no positional hover shifts, sharp zero-blur shadows.

## Gaps to close (vs spec sources)

| Gap | Resolution |
|-----|------------|
| No existing About section on the site | Build 3 light variations under `/about-section` |
| Long paragraphs risk wall-of-text | Editorial typography (1.7 line-height, 17px body), large heading, eyebrow + signature accent |
| Image must feel premium, not stock | Soft `rounded-2xl`, hairline border, sharp directional shadow on hover (no lift), optional offset accent block (Var C) |
| Establish trust at a glance | Variation B floats a credentials chip-strip overlay (BSMMU · MBBS Dhaka · Popular Medical College) |
| Conversion-forward option | Variation C adds a stat strip with `CountUp` (Years · Surgeries · Specialty) and dual CTA |
