# Page 03 — Treatment

- **URL**: `/treatment/`
- **Source**: https://drarefin.com/treatment/
- **Page type**: service (services index)

## SEO
- **Meta title**: Hepatobiliary, Liver, Pancreatic & Biliary Treatment — Dr. Arefin, Dhaka
- **Meta description**: Comprehensive hepatobiliary, liver, gallbladder, pancreatic and upper-GI surgical treatment in Dhaka by Dr. Murshidul Arefin at Popular Medical College Hospital.
- **Canonical**: https://drarefin.com/treatment/
- **JSON-LD**: `MedicalProcedure` array (one per treatment) + `WebPage`

## Section inventory

| # | Section | CAF component to reuse |
|---|---------|------------------------|
| 1 | Page hero | `PageHero` |
| 2 | Comprehensive Treatment Services intro | Intro band (centered) |
| 3 | Treatment grid (12 cards) | Service grid (3-col desktop / 2 tab / 1 mob) |
| 4 | Trusted by Patients | Trust strip (placeholder) |
| 5 | Final CTA | `CTABand` |

---

## Section 1 — Page Hero
- **CAF pattern**: `PageHero`
- **H1**: Treatment
- **Subtitle**:
  > **Advanced hepatobiliary and liver transplant care** led by **Dr. Murshidul Arefin**, delivering **personalized surgical solutions** for your **liver and biliary health in Dhaka.**

## Section 2 — Services Intro
- **H2**: Comprehensive Hepatobiliary & Liver Treatment Services
- **Body**:
  > **Expert care for liver, gallbladder, biliary, pancreatic, and upper gastrointestinal conditions** — led by **Dr. Murshidul Arefin**, one of Dhaka's **top hepatobiliary and liver transplant surgeons.**

## Section 3 — Treatment Cards (12)
- **CAF pattern**: `ServiceCard` grid (image-top, 3-col)
- Each card: image · H3 · short description (verbatim).

1. **Liver Tumor & Cancer Surgery** — Dr. Arefin provides **precise diagnosis** and **advanced surgical treatment for both benign and malignant liver tumors**. Using **modern resection and minimally invasive techniques**, he ensures optimal tumor removal.
2. **Liver Cyst Management** — **Simple or complex liver cysts** are carefully assessed using advanced imaging. When surgery is required, Dr. Arefin performs **safe cyst excision** to prevent recurrence, relieve discomfort, and **restore normal liver function.**
3. **Fatty Liver Surgical Intervention** — For patients with **severe or complicated fatty liver disease**, Dr. Arefin combines **metabolic evaluation with surgical precision** to manage liver damage, prevent further deterioration, and promote healthy regeneration.
4. **Liver Transplant Surgery** — A cornerstone of Dr. Arefin's expertise — offering **complete evaluation, donor coordination**, and **advanced transplant procedures** for **end-stage liver failure**. His approach focuses on patient safety, post-transplant recovery, and long-term liver health.
5. **Gallstone & Gallbladder Surgery** — From **painful gallstones** to **inflamed gallbladder conditions**, Dr. Arefin offers **laparoscopic cholecystectomy** — removing stones and restoring comfort through **small-incision, minimally invasive procedures** with faster healing.
6. **Bile Duct & Biliary Tract Surgery** — Dr. Arefin treats **complex bile duct obstructions** and **biliary cancers** using **precise microsurgical methods**. His care ensures proper bile flow, alleviates jaundice, and minimizes postoperative complications.
7. **Gallbladder & Bile Duct Cancer Surgery** — Specializing in **oncologic hepatobiliary surgery**, Dr. Arefin performs **advanced resections for gallbladder and bile duct cancers**, combining surgical precision with evidence-based cancer management to extend survival and improve quality of life.
8. **Cholecystitis Treatment** — **Acute and chronic gallbladder inflammation** is managed through **timely diagnosis and minimally invasive surgery** to relieve pain, prevent infection, and avoid recurrence.
9. **Pancreatic Cancer Surgery** — For pancreatic tumors, Dr. Arefin performs **highly specialized surgeries** — including **Whipple procedures** — aimed at **removing cancer** while protecting vital structures. His multidisciplinary approach ensures optimal outcomes in challenging cases.
10. **Pancreatic Cyst Treatment** — **Pancreatic cysts can pose serious risks** if untreated. Dr. Arefin provides **expert evaluation and surgical management**, ensuring **safe cyst removal** and **long-term digestive health.**
11. **Pancreatitis (Surgical Management)** — **Severe or chronic pancreatitis** requiring surgery is treated with **precision to relieve obstruction**, prevent recurrence, and **preserve pancreatic function** — helping patients regain comfort and nutritional stability.
12. **Spleen-Related Surgeries** — Dr. Arefin offers **splenectomy and related procedures** for **trauma, cysts, or hematologic disorders**, ensuring **safe removal** with minimal blood loss and smooth recovery.
13. **Upper Gastrointestinal (GIT) Surgery** — Comprehensive management for **esophageal, gastric, and duodenal disorders** — combining **diagnostic endoscopy** with **advanced surgical intervention** to **restore digestive health** and quality of life.
14. **Liver Transplant Coordination & Follow-Up Care** — Dr. Arefin's transplant program provides **end-to-end support** — from **donor assessment** to **post-surgery rehabilitation** — ensuring a **seamless experience** and **long-term care** for transplant patients.

_(14 cards total — render as 3-col grid with image at top of each card.)_

## Section 4 — Trusted by Patients Across Bangladesh
- **CAF pattern**: Trust strip (placeholder for affiliation logos / patient quote carousel)
- **H2**: Trusted by Patients Across Bangladesh

## Section 5 — Final CTA
- **CAF pattern**: `CTABand`
- **H2**: Ready for Expert Consultation?
- **Body**: **Connect with Dr. Arefin** for a **detailed diagnosis**, **expert advice**, and a **path to recovery.**
- **CTA**: { label: "Book an Appointment", href: "/contact/" }

## Internal links
- Every card heading → its own dedicated treatment subpage on the source site (e.g. `/liver-transplant-surgery`). In the React build, all card headings should link to `/treatment/#<slug>` anchors OR to `/contact/` until dedicated subpages exist. Do NOT replicate 14 satellite routes.
- Book an Appointment → `/contact/`

## Notes
- Source has 14 treatment cards but the menu calls this "Treatment" (singular). Maintain 14-card grid.
- Each card includes a real surgical photo on the source — alt text should describe the procedure category, not the literal filename.