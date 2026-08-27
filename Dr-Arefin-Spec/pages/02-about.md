# Page 02 — About

- **URL**: `/about/`
- **Source**: https://drarefin.com/about/
- **Page type**: about

## SEO
- **Meta title**: About Dr. Murshidul Arefin — Hepatobiliary & Liver Transplant Surgeon, Dhaka
- **Meta description**: Profile of Dr. Murshidul Arefin, a leading hepatobiliary and liver transplant surgeon in Dhaka, delivering advanced, compassionate, and precise surgical care.
- **Canonical**: https://drarefin.com/about/
- **JSON-LD**: `Physician` (name, alumniOf BSMMU, worksFor Popular Medical College Hospital, medicalSpecialty)

## Canonical section rhythm (locked 2026-05-18)

User-approved tone sequence — do not change without explicit instruction.

| # | Section | Background | Cards / surface |
|---|---------|------------|------------------|
| 1 | Page Hero (OT image) | Dark image w/ overlay | — |
| 2 | About Dr. Arefin (intro) | Light mint (`arefin-mint-band`) | Portrait figure |
| 3 | What Sets Us Apart — Pillars | Dark (`bg-background`) | Light cards (`hsl(0 0% 97%)`) |
| 4 | Credentials & Training — Timeline | **Light mint** (`arefin-mint-band`) | Mint surface w/ white markers + green chips |
| 5 | Vision & Mission | **Dark** (`bg-background`) | Light cards (`hsl(0 0% 97%)`) |
| 6 | Gallbladder Q&A | **Light mint** (FAQAccordion default) | Dark FAQ cards on mint |
| 7 | Footer | Cool blue-black (`DrArefinFooter`) | — |

Rhythm: dark → mint → dark → mint → dark → mint → footer. CTA + "What Happens Next" reassure band removed 2026-05-18 per user instruction; Q&A flipped to mint to break the dark stack before the footer.

## Section copy

### Section 1 — Page Hero
- **CAF pattern**: `PageHero` (compact dark hero)
- **H1**: About Dr. Murshidul Arefin
- **Subtitle**:
  > **Dr. Murshidul Arefin** is a leading **hepatobiliary and liver transplant surgeon in Dhaka**, committed to delivering **advanced, compassionate, and precise surgical care.**
- **Breadcrumb**: Home › About

### Section 2 — About Dr. Murshidul Arefin (intro)
- **CAF pattern**: Two-column intro + portrait on mint
- **H2**: About Dr. Murshidul Arefin

### Section 3 — Pillars
- **Cards**:
  - **Patient-Centered Care**
  - **Proven Surgical Excellence**

### Section 4 — Credentials & Training (Timeline)
- **Eyebrow**: Credentials & Training
- **H2**: Education & **Professional Journey**
- Timeline list of MBBS / MS / Liver transplant training / Consultant / 1,000+ procedures

### Section 5 — Vision & Mission
- **Eyebrow**: Our Purpose
- **H2**: Vision & Mission
- Two dark→light cards (Vision, Mission)

### Section 6 — Final CTA
- `GlobalCTABand`, primary "Book an Appointment" → `/contact/`

### Section 7 — What Happens Next (mint reassure band)
- **Eyebrow**: What happens next
- **H2**: A **clear, unhurried** path from **first call** to **recovery**
- One-paragraph body with inline links to phone, `/contact/`, `/treatment/`, `/second-opinion/`.

### Section 8 — Gallbladder Q&A
- `FAQAccordion` with `kicker="Gallbladder Questions"`, 6 items, `basePath="/faq/gallbladder"`.

## Internal links
- Hepatobiliary Surgeon in Dhaka → `/about/`
- Liver transplant / Complex abdominal surgeries → `/treatment/`
- Gallbladder surgery → `/treatment/gallbladder-surgery/`
- Laparoscopic cholecystectomy → `/treatment/laparoscopic-cholecystectomy-dhaka/`
- Bile duct surgery → `/treatment/bile-duct-surgery/`
- Gallstones → `/conditions/gallstones/`
- Second opinion → `/second-opinion/`
- Contact → `/contact/`

## Notes
- No two adjacent **same-tone** sections except the user-approved Vision/Mission → CTA dark stack; never insert a third dark section between them.
- Timeline year chips and markers must read on mint: use `--primary-darker` for green ink + white chip background.
- Q&A cards stay LIGHT on the dark Q&A band (Surface Elevation Rule).
