# Page 01 — Home

- **URL**: `/`
- **Source**: https://drarefin.com/
- **Page type**: home

## SEO
- **Meta title**: Top Hepatobiliary, Pancreatic & Liver Surgeon in Dhaka — Dr. Murshidul Arefin
- **Meta description**: Expert hepatobiliary, liver, gallbladder, pancreas and upper-GI surgical care by Dr. Murshidul Arefin at Popular Medical College Hospital, Dhanmondi, Dhaka.
- **Canonical**: https://drarefin.com/
- **JSON-LD**: `MedicalBusiness` (or `Physician`) + `LocalBusiness` (Popular Medical College Hospital location) + `AggregateRating` if available

## Section inventory

| # | Section | CAF component to reuse |
|---|---------|------------------------|
| 1 | Hero | `HomeHero` (dual-state hover image) |
| 2 | Three pillars (01/02/03) | Numbered story cards on dark bg |
| 3 | About Dr. Arefin | Split layout (text left, image right) |
| 4 | Our Initiatives | 3-column icon-card grid |
| 5 | Stats counter | `CountUp` 4-column row |
| 6 | Recent Videos | YouTube thumbnail grid (3-col, lazy) |
| 7 | Comprehensive Services | 6-card service grid (icon + heading + body) |
| 8 | Transform Lives (CTA band) | `CTABand` |
| 9 | Inspiring Transformations | 2-column patient story cards |
| 10 | Trusted by Patients | Logo/testimonial strip (placeholder) |
| 11 | Final CTA | `CTABand` (Ready for Expert Consultation) |

---

## Section 1 — Hero
- **CAF pattern**: `HomeHero` with dual-state hover image (light↔dark)
- **Background**: `--background-dark`
- **H1** (verbatim, with strong-anchor links inside):
  > **Top Hepatobiliary, Pancreatic & Liver Surgeon in Dhaka**
- **Subtitle** (verbatim):
  > The best, Patient friendly, highly skilled expert surgical care by **Dr. Murshidul Arefin**, specialized in **Liver, Gall Bladder, Biliary Tract, Pancreas, Spleen, Stomach and Upper GIT diseases and surgeries** at **Popular Medical College Hospital and Popular Consultation Centre, Dhanmondi, Dhaka**.
- **CTAs**:
  - { label: "Book an Appointment", href: "/contact/" }
  - { label: "Call Now", href: "tel:+8801311487592" } (CTA pill)
- **Image**: portrait of Dr. Arefin · alt: "Dr. Murshidul Arefin, a leading Hepatobiliary and Pancreatic Surgeon in Dhaka, providing expert liver and gastrointestinal care."

## Section 2 — Three Pillars
- **CAF pattern**: Numbered story cards (big "01/02/03" numerals in `--primary`) on dark bg
- **Cards**:
  - **01 — Surgical Excellence**
    > Over 7 years of hands-on experience in **hepatobiliary, liver, and gallbladder surgery**, **Dr. Murshidul Arefin** combines precision, innovation, and compassionate care to achieve the **best surgical outcomes**.
  - **02 — Advanced Treatment**
    > Providing comprehensive care for **liver, pancreas, and biliary tract diseases** through both **laparoscopic and open surgical techniques**, ensuring safe recovery and long-term health for every patient.
  - **03 — Compassionate Care**
    > Dr. Arefin believes in a **patient-first philosophy** — offering personalized guidance, transparent communication, and respectful treatment throughout every stage of **diagnosis, surgery, and recovery.**

## Section 3 — About Dr. Murshidul Arefin
- **CAF pattern**: Split 2-column (text left, image right)
- **H2**: About Dr. Murshidul Arefin
- **Body** (verbatim, preserve strong-anchor links):
  > **Dr. Murshidul Arefin** is a highly skilled **Hepatobiliary and Pancreatic Surgery Specialist** based in **Dhaka, Bangladesh**, with a strong reputation for excellence in **liver, gallbladder, bile duct, and pancreatic surgery.**
  >
  > He holds an MBBS from the University of Dhaka and an **MS in Hepatobiliary Surgery** from **Bangabandhu Sheikh Mujib Medical University (BSMMU)** — the country's leading medical institution. Currently serving as a Consultant in General, Laparoscopic, and **Liver Transplant Surgery** at **Popular Medical College Hospital, Dhanmondi**, Dr. Arefin provides advanced surgical care with precision and compassion.
  >
  > With years of hands-on experience and a deep commitment to patient-well-being, he is recognized among the **best hepatobiliary surgeons in Dhaka**. His patient-first approach, ethical standards, and expertise in **minimally invasive techniques** have earned him the trust of thousands seeking reliable **liver and biliary treatment in Bangladesh**.
- **CTA**: { label: "Learn More", href: "/about/" }
- **Image**: alt "dr arefin liver doctor" — portrait shot in clinic

## Section 4 — Our Initiatives
- **CAF pattern**: 3-column icon-card grid (similar to homepage services)
- **H2**: Our Initiatives
- **Lead**:
  > At Dr. Murshidul Arefin's Hepatobiliary & Liver Care Center, our mission extends beyond the operation theater. We're committed to empowering patients and their families through **education**, **compassion**, and **continuous support.**
- **Cards**:
  - **Surgery Assistance** — We offer guidance and support for patients in need of **complex liver, gallbladder, and pancreatic surgeries**, helping them access the right care and **financial assistance for timely treatment.**
  - **Health Education** — Through awareness programs and liver health seminars, Dr. Arefin and his team **educate the community about early detection, lifestyle management, and prevention** of liver diseases in Bangladesh.
  - **Support Groups** — Our patient network connects individuals and families who are undergoing **hepatobiliary or liver transplant treatments**, creating a **safe space for emotional support and recovery.**

## Section 5 — Stats Counter
- **CAF pattern**: 4-column `CountUp` row
- **Stats** (verbatim labels; numbers are placeholders rendered as `0+` until filled — see Notes):
  - `0+` — Years of surgical excellence
  - `0+` — Successful surgeries
  - `0+` — Patients treated
  - `0+` — Conferences

## Section 6 — Recent Videos
- **CAF pattern**: YouTube thumbnail grid (3-col desktop / 1-col mobile, lazy-load)
- **H2**: Recent Videos of Dr. M. Arefin
- **Items** (Bangla titles, link to YouTube):
  1. লিভারের সমস্যা: শুরুতেই সতর্ক হওয়া কেন জরুরি? — https://www.youtube.com/watch?v=7p20-W4gyUQ
  2. পিত্তথলি না থাকলে হজম হবে কীভাবে? | Gallbladder Operation Facts — https://www.youtube.com/watch?v=YcB2zKh9swo
  3. জন্ডিস কি শুধুই লিভারের সমস্যা? | Jaundice & Bile Duct Issues — https://www.youtube.com/watch?v=j2J3etk7BtY
  4. প্লীহা বা স্প্লিন বড় হওয়া কি বিপজ্জনক? | Spleen Enlargement Symptoms — https://www.youtube.com/watch?v=dqEUJ90BqnE
  5. প্যানক্রিয়ােসের রোগ, বিপদ ও চিকিৎসা — https://www.youtube.com/watch?v=zYBVsp1iYfY
  6. খাদ্যনালীর সমস্যা অবহেলা করবেন না — https://www.youtube.com/watch?v=cI8yOhsZMFc
  7. পিত্তথলীর পাথর, পলিপ ও ক্যান্সার — https://www.youtube.com/watch?v=88xmr47LvJ4

## Section 7 — Comprehensive Hepatobiliary & Liver Care Services
- **CAF pattern**: 6-card service grid (icon + heading + body), 3-col desktop / 2-col tablet / 1-col mobile
- **H2**: Comprehensive Hepatobiliary & Liver Care Services
- **Cards**:
  1. **Advanced Liver Surgery** — Expert surgical treatment for **liver tumors, cysts, and transplant procedures** using the latest **minimally invasive and open techniques** for faster recovery and reduced complications.
  2. **Gallbladder & Biliary Surgery** — Specialized care for **gallstones, bile duct obstructions, and biliary strictures**, ensuring precise diagnosis and safe surgical outcomes through **advanced laparoscopic procedures.**
  3. **Pancreatic & Upper GI Surgery** — Comprehensive management of **pancreatic disorders, cysts, and upper gastrointestinal diseases**, performed with **precision and patient comfort** in mind.
  4. **Laparoscopic & Minimally Invasive Surgery** — State-of-the-art **keyhole surgeries** designed to **minimize scarring, shorten hospital stays**, and improve recovery time for hepatobiliary and abdominal conditions.
  5. **Liver Transplant Consultation & Follow-Up** — Personalized **pre- and post-transplant care** to guide patients through every stage of their **liver health journey** with compassion and **expert supervision.**
  6. **Hepatology & Liver Disease Management** — Comprehensive medical management for **fatty liver, hepatitis, and cirrhosis**, supported by accurate diagnostics and **evidence-based treatment plans.**

## Section 8 — Transform Lives (CTA Band)
- **CAF pattern**: `CTABand` (dark bg, dual-state pill)
- **H2**: Transform Lives, One Surgery at a Time
- **Body**:
  > Your trust and support help **Dr. Murshidul Arefin** deliver **critical liver and hepatobiliary surgeries** to **patients who need hope the most.**
- **CTA**: { label: "Book an Appointment", href: "/contact/" }

## Section 9 — Inspiring Transformations (Patient Stories)
- **CAF pattern**: 2-column story cards (image + heading + body)
- **H2**: Inspiring Transformations
- **Lead**: Real stories of courage, recovery, and renewed life made possible through **Dr. Murshidul Arefin**'s expertise in **hepatobiliary and pancreatic surgery.**
- **Cards**:
  1. **Liver Transplant Triumph** — After being diagnosed with **end-stage liver disease**, the patient received **expert surgical care** under Dr. Arefin's team. Today, they lead a **healthy, active life** — a true testament to the power of **precision surgery** and **compassionate follow-up care.**
  2. **Biliary Surgery Breakthrough** — A patient suffering from **chronic bile duct obstruction** underwent a **complex, minimally invasive procedure** performed by Dr. Arefin. The successful surgery **restored liver function**, eliminated pain, and gave the patient a **new lease on life.**

## Section 10 — Trusted by Patients Across Bangladesh
- **CAF pattern**: Logo/testimonial strip (use trust-strip pattern)
- **H2**: Trusted by Patients Across Bangladesh
- **Notes**: Source page has heading only — no logos rendered. Implementation should leave room for hospital affiliation logos or testimonial cards once supplied.

## Section 11 — Final CTA
- **CAF pattern**: `CTABand`
- **H2**: Ready for Expert Consultation?
- **Body**: **Connect with Dr. Arefin** for a **detailed diagnosis**, **expert advice**, and a **path to recovery.**
- **CTA**: { label: "Book an Appointment", href: "/contact/" }

## Internal links (anchor text → target)
- Top Hepatobiliary, Pancreatic & Liver Surgeon in Dhaka → `/` (H1 self-link)
- Dr. Murshidul Arefin → `/about/`
- Advanced Liver Surgery / Gallbladder & Biliary Surgery / Pancreatic & Upper GI Surgery / Laparoscopic / Liver Transplant / Hepatology → `/treatment/`
- Book an Appointment → `/contact/`
- Learn More → `/about/`

## Notes
- Hero H1 contains 4 inline strong-anchor links — keep them inline for SEO keyword density (per `mem://seo/internal-linking-system`).
- Stats counter currently shows "0+" placeholders on the live site; treat numbers as TBD content.
- "Recent Videos" loads dynamically (live site shows "Loading videos..."); the 7 listed are the latest snapshot.
- All `https://drarefin.com/<keyword-slug>` links inside body text are SEO satellite pages on the original site. In the React build, route them to the closest internal page (`/about/`, `/treatment/`, `/contact/`) — do NOT replicate 30+ satellite routes. Strong-anchor wrappers must be preserved.