# Dr arefin Updated Repository Project V2

# LOVABLE — COPY CODE SYSTEM (PASTE INTO LOVABLE)

Project: **CAF Patronato Fondi**  

Language: **Italian (IT)**  

Reference brand/UI: **Atto Property (attoproperty.com.au)**  

Goal: Generate a **modern, clean, corporate, trust-first** website UI that follows the same layout logic and component style as Atto Property, but for a CAF/Patronato business in Italy.

---

## 0) OUTPUT RULES (STRICT)

- Output **page by page**: Home → Chi Siamo → Servizi → Contatto

- Output **block by block** per page.

- Each block must be clearly labeled like:  

  `BLOCK: Home / Hero`, `BLOCK: Home / Services`, etc.

- Provide **only structured HTML sections** (no CSS, no JS).

- Use clean semantic tags (`header`, `section`, `main`, `footer`).

- Use consistent BEM-like classes for every component.

- Responsive structure must be obvious in HTML: wrappers, containers, grids.

---

## 1) BRAND PERSONALITY (MUST MATCH)

- Tone: professional, trustworthy, clean, modern service brand

- Feel: calm confidence, premium but not flashy, structured and spacious

- Visual: minimal, corporate, high clarity, strong hierarchy, lots of whitespace

---

## 2) COLOR TOKENS (FOLLOW EXACTLY)

Use these tokens as your system references:

- Primary accent (brand green): `#1F4D3A`

- Dark neutral (charcoal): `#111111`

- White: `#FFFFFF`

- Light gray surface: `#F5F5F5`

- Text heading: `#111111`

- Text body: `#555555`

- Muted text: `#8A8A8A`

- On-dark text: `#FFFFFF`

- Border/divider: `#E6E6E6`

Instruction: **Follow this coloring exactly.** If the example can be improved, improve UI/spacing/typography while preserving brand.

---

## 3) TYPOGRAPHY RULES

Choose ONE font for entire site: **Inter** (preferred).

Type scale rules:

- H1: 48–64px desktop / 34–40px mobile, weight 700, line-height 1.1–1.2

- H2: 32–40px, weight 600–700

- H3: 22–28px, weight 600

- Body: 16–18px, weight 400–500, line-height 1.6–1.8

Rules: strong hierarchy, short readable line-length, spacious paragraphs.

---

## 4) LAYOUT RULES (ATTO-LIKE)

- Container width: 1200–1280px centered

- Side padding: 16–24px

- Section padding: desktop 90–120px / mobile 55–75px

- Alternate backgrounds: white / light gray to separate sections

- Grids: 2-col for about/service, 3-col for features/cards

- Gap spacing: 24–40px

- Avoid clutter; breathe.

---

## 5) COMPONENT SYSTEM (MUST APPLY)

### Buttons

- Primary CTA: filled green (`#1F4D3A`) with white text, radius 6px, no gradient

- Hover: darker green `#173B2D`

- Secondary CTA: outline green, hover fills green

### Cards

- White background, border `#E6E6E6`, radius 8px

- Clean spacing, subtle shadow only if needed (very light)

- Titles bold, descriptions calm

### Header/Nav

- Clean header, white background

- Nav links dark with hover green

- Header CTA as primary button

- Sticky header behavior allowed (structure only)

### Footer

- Background `#111111`

- Footer headings white, body `#CCCCCC`

- Links white hover green

- 3–4 column layout

### Forms

- White inputs with border `#E6E6E6`, radius 6px

- Focus state should visually suggest green

- Submit = primary button

---

## 6) BUSINESS CONTEXT (USE FOR COPY)

Business name: **CAF Patronato Fondi**  

Type: CAF + Patronato services in Italy  

Audience: Italian citizens, families, workers, retirees

Key services (use as primary service blocks):

- Dichiarazioni fiscali (Modello 730, Redditi)

- Calcolo ISEE

- Servizi Patronato (pensioni, NASpI, invalidità, pratiche INPS)

- Consulenze tributarie

Copy style: Italian, professional, simple, non-technical.

---

## 7) PAGES + REQUIRED BLOCKS

### PAGE 1: HOME

Required blocks:

1. Header (top contact strip + main nav + header CTA)

2. Hero (left text + CTAs, right image)

   - H1: “Assistenza Fiscale e Previdenziale a Fondi”

   - Subtext: short value proposition

   - CTA1: “Prenota un appuntamento”

   - CTA2: “Scopri i servizi”

3. Trust strip (stats or trust bullets)

4. Services (3–4 service cards)

5. “Perché sceglierci” (6 benefits grid)

6. Process steps (3–5 steps)

7. Testimonials (grid)

8. CTA band (dark or white version)

9. Footer (4 columns)

### PAGE 2: CHI SIAMO

Blocks:

1. Page hero

2. Mission/Story section (2 columns)

3. Values (3–4 cards)

4. CTA band

5. Footer

### PAGE 3: SERVIZI

Blocks:

1. Page hero

2. Services detail sections (each: title, bullets, CTA)

3. FAQ (list style; no JS)

4. CTA band

5. Footer

### PAGE 4: CONTATTO

Blocks:

1. Contact hero

2. Contact info grid (phone/email/address/hours)

3. Contact form

4. Map placeholder section

5. Footer

---

## 8) HTML CLASS NAMING SYSTEM (STRICT)

Use these base classes:

- Wrapper: `site`, `container`

- Sections: `section`, `section--alt`

- Grids: `grid`, `grid--2`, `grid--3`

- Buttons: `btn`, `btn--primary`, `btn--secondary`

- Cards: `card`, `card__icon`, `card__title`, `card__desc`, `card__cta`

- Typography: `h1`, `h2`, `h3`, `text`, `text--muted`

- Header: `header`, `nav`, `nav__link`, `header__cta`

- Footer: `footer`, `footer__col`, `footer__title`, `footer__link`

- Form: `form`, `field`, `field__label`, `field__input`, `field__textarea`

---

## 9) FINAL QUALITY CHECK

Before output:

- Must look and feel like Atto Property

- Must be clean, premium, spacious

- Must be conversion-focused (clear CTA placement)

- Must be fully Italian copy

- Must be easy to copy block-by-block into Elementor

Analaysize the project and share your plan

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b0a95ecd-623b-4d4b-a160-6bcf447f3b4b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
