# Page 04 — Mentorship

- **URL**: `/mentorship/`
- **Source**: https://drarefin.com/mentorship/
- **Page type**: service (training/education)

## SEO
- **Meta title**: Hepatobiliary Surgical Mentorship & Training — Dr. Murshidul Arefin
- **Meta description**: World-class hepatobiliary surgical mentorship and hands-on training in Dhaka by Dr. Murshidul Arefin for MBBS students, intern doctors, postgraduates and professionals.
- **Canonical**: https://drarefin.com/mentorship/
- **JSON-LD**: `EducationalOccupationalProgram`

## Section inventory

| # | Section | CAF component to reuse |
|---|---------|------------------------|
| 1 | Page hero | `PageHero` (with primary CTA) |
| 2 | Who Can Join (4 audience cards) | 4-col card grid |
| 3 | What You Will Learn (3 pillar cards) | 3-col card grid with image |
| 4 | Mentorship Curriculum (6 cards) | Service-style card grid |
| 5 | Measurable Impact (stats) | `CountUp` 3-col row |
| 6 | Trainee Experiences (testimonials) | 3-col testimonial grid |
| 7 | Final CTA | `CTABand` |

---

## Section 1 — Page Hero
- **CAF pattern**: `PageHero`
- **H1**: Mentorship & Surgical Training by Dr. Murshidul Arefin
- **Subtitle**:
  > **Empowering the next generation of hepatobiliary surgeons** through **world-class surgical education** and **hands-on training in Dhaka.**
- **CTA**: { label: "Apply for Mentorship", href: "/contact/" }

## Section 2 — Who Can Join
- **H2**: Who Can Join
- **Lead**:
  > Our **mentorship and training programs** are open to **MBBS students, intern doctors, postgraduate trainees, faculty members, and healthcare professionals** eager to **enhance their surgical skills**. Whether you're beginning your journey or **advancing your expertise in hepatobiliary surgery**, **Dr. Arefin's hands-on guidance** helps you grow with confidence and precision.
- **Cards (4)**:
  - **MBBS Students** — Through **awareness programs and liver health seminars**, **Dr. Arefin and his team** provide **foundational knowledge in hepatobiliary sciences** to MBBS students.
  - **Intern Doctors** — Gain **essential hands-on experience** in **surgical procedures, operation theater protocols, and patient management** under **expert mentorship.**
  - **Postgraduate** — Enhance your **hepatobiliary surgical knowledge** with **advanced training** in **liver resections**, **biliary reconstruction**, and **transplant coordination.**
  - **Professionals** — Develop **specialized skills in hepatobiliary care**, **patient recovery**, and **perioperative management** through **structured clinical training programs.**

## Section 3 — What You Will Learn
- **H2**: What you will learn
- **Lead**:
  > Gain **in-depth surgical knowledge**, **hands-on hepatobiliary training**, and **real-world clinical experience** to **advance your medical career confidently.**
- **Cards (3)** with image:
  - **Surgical Support** — Offering **expert guidance and resources** for patients needing **complex hepatobiliary** and **liver transplant surgeries.**
  - **Liver Education** — **Empowering communities** through **workshops and awareness programs** on **liver care and disease prevention.**
  - **Support Network** — **Building strong connections** for **patients and families** through **shared experiences** and **ongoing emotional support.**

## Section 4 — Mentorship Curriculum
- **H2**: The mentorship combines **academic learning with extensive hands-on experience**
- **Cards (6)**:
  1. **Advanced Surgical Mentorship** — Comprehensive mentorship that blends **academic learning** with **hands-on experience**, preparing future surgeons for **real-world hepatobiliary challenges.**
  2. **Liver Transplant Training** — In-depth exposure to **transplant protocols, surgical steps, and postoperative care** under **expert supervision** for **future transplant specialists.**
  3. **Pancreatic & Biliary Surgery Skills** — Focused training on **managing complex pancreatic and biliary disorders** using **modern laparoscopic and open surgical approaches.**
  4. **Minimally Invasive Techniques** — Practical workshops on **advanced laparoscopic and keyhole surgeries**, enhancing **surgical precision** and **patient recovery outcomes.**
  5. **Surgical Research & Case Analysis** — Develop critical thinking through **live case discussions**, **academic presentations**, and **research collaborations on hepatobiliary diseases.**
  6. **Professional Development & Ethics** — Training that fosters **leadership, communication, and ethical excellence** essential for **successful surgical and academic careers.**

## Section 5 — Measurable Impact (stats)
- **CAF pattern**: `CountUp` 3-col on dark bg
- **H2**: Measurable Impact
- **Lead**: **Dr. Arefin's mentorship** has **created skilled surgeons improving surgical outcomes globally.**
- **Stats**:
  - **645+** — Surgeons Trained Worldwide
  - **29%** — Successful Career Placement
  - **25%** — Serving in Hospitals Across Bangladesh & Abroad

## Section 6 — Trainee Experiences
- **CAF pattern**: 3-col testimonial grid (avatar + rating + quote + name + role)
- **H2**: Trainee Experiences – Dr. Arefin's Mentorship Program
- **Lead** (placeholder lorem on source — replace with real quotes when supplied):
  > Elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Nam varius consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- **Cards (3)** — source has placeholder names (Martin Smith / Shelly Barns / Jacob Luke), all rated 4.5–5/5, role "CEO, Acme Industries". Implementation should leave structure ready and surface a `TODO: real trainee quotes` note.

## Section 7 — Final CTA
- **CAF pattern**: `CTABand`
- **H2**: Ready for Expert Consultation?
- **CTA**: { label: "Book an Appointment", href: "/contact/" }

## Internal links
- Apply for Mentorship → `/contact/`
- About Dr. Arefin → `/about/`
- Hepatobiliary services → `/treatment/`

## Notes
- Source uses lorem-ipsum placeholder testimonials and stock-style names — flag clearly in the build so they get replaced before launch.
- Stats numbers are real (645+, 29%, 25%) — animate with `CountUp`.