# Page 07 — Contact

- **URL**: `/contact/`
- **Source**: https://drarefin.com/contact/
- **Page type**: contact

## SEO
- **Meta title**: Book Appointment — Dr. Murshidul Arefin, Hepatobiliary Surgeon, Dhaka
- **Meta description**: Book a hepatobiliary surgery consultation with Dr. Murshidul Arefin at Popular Medical College Hospital, Dhanmondi, Dhaka. Phone: +8801311487592.
- **Canonical**: https://drarefin.com/contact/
- **JSON-LD**: `LocalBusiness` (Popular Medical College Hospital — Dr. Arefin chamber) with `openingHours`, `address`, `telephone`, `geo`

## Section inventory

| # | Section | CAF component to reuse |
|---|---------|------------------------|
| 1 | Page hero | `PageHero` |
| 2 | Contact info cards | `ContactInfoCards` |
| 3 | Appointment form | `ContactForm` |
| 4 | FAQ | Accordion |
| 5 | Hospital location card + map link | Single info card with map button |
| 6 | Final CTA (optional) | `CTABand` |

---

## Section 1 — Page Hero
- **CAF pattern**: `PageHero`
- **H1**: Appointment
- **Subtitle**:
  > Reach out to **Dr. Arefin** for **expert hepatobiliary care** and **personalized consultations.**

## Section 2 — Contact Info Cards
- **CAF pattern**: `ContactInfoCards` (inline-SVG icons, per CAF icon spec)
- **Cards**:
  - **General Enquiries**
    - Phone: **+8801311487592** (tel link)
    - Email: **arefin-info@drarefin.com** (mailto link)
  - **Office Address**
    - Room-304 (Building -06) and Room-302 (Building -03) Popular Medical College Hospital, Dhanmondi-02
    - Map link: https://clink.rasia.pro/best-hepatobiliary-surgeon-in-dhaka
  - **Social Media**
    - Icon row: Facebook · Instagram · LinkedIn · YouTube · Twitter/X (URLs TBD — see Notes)

## Section 3 — Appointment Form
- **CAF pattern**: `ContactForm`
- **H2**: Book Appointments
- **Fields** (verbatim labels):
  - Your Full Name (text, required)
  - Your Email Address (email, required)
  - Country Code + Phone (text, required)
  - Select Your Medical Concern (select, required) — options:
    - Liver Disease Consultation
    - Gallbladder Stone Treatment
    - Bile Duct Stone Treatment
    - Pancreatic Disease Consultation
    - Hepatobiliary Surgery Consultation
    - Laparoscopic Surgery Consultation
    - Follow-up Appointment
    - General Surgical Consultation
    - Other
  - Your Message (textarea, optional)
- **Submit label**: Submit
- **Behavior**: post to backend (TBD) and show success toast.

## Section 4 — FAQ
- **CAF pattern**: Accordion (Radix-based, single-expand)
- **H2**: Frequently Asked Questions
- **Lead**:
  > Find answers to **common queries** about **hepatobiliary surgeries** and **treatments.**
- **Items** (verbatim):
  1. **Q: What types of liver surgeries does Dr. Arefin perform?**
     A: Dr. Arefin performs advanced liver surgeries, including transplants and oncological procedures for liver cancers.
  2. **Q: How can I schedule a consultation?**
     A: You can schedule a consultation by calling our office or filling out the contact form on our website.
  3. **Q: What should I expect during my first visit?**
     A: During your first visit, Dr. Arefin will assess your condition and discuss personalized treatment options.
  4. **Q: Will my health insurance cover the surgery?**
     A: Coverage depends on your specific insurance plan; we recommend checking with your provider for details.

## Section 5 — Hospital Location
- **CAF pattern**: Info card with "Get Directions →" CTA
- **Heading**: Popular Medical College Hospital
- **Address**: Dhanmondi-02 1205 Dhaka, Bangladesh
- **CTA**: { label: "Get Directions →", href: "https://clink.rasia.pro/best-hepatobiliary-surgeon-in-dhaka", target: "_blank" }

## Internal links
- About Dr. Arefin → `/about/`
- Hepatobiliary services → `/treatment/`

## Notes
- Social-media URLs are not exposed in the scraped markdown — collect them from the live site footer in next iteration.
- The "tel:" link in the CTA pill (header) and on this page must use the same number: `+8801311487592`.
- Form submission target needs backend wiring (Lovable Cloud edge function or external endpoint).