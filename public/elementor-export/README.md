# Dr. Arefin — Elementor / WordPress Export

Static, semantic HTML5 + CSS3 + vanilla JS export of the **Dr. Arefin dark** React site.
Designed to paste into Astra + Elementor (Flexbox Containers + HTML widgets).

## Deployment (one-time)
1. **Upload `global.css`** to WordPress (Customizer → Additional CSS, or as a child-theme stylesheet, or via WPCode "Site-wide Header" CSS snippet).
2. **Upload `blocks/arefin-interactivity.js`** and enqueue it in the footer (WPCode "Site-wide Footer" JS snippet).
3. **In Elementor**, set every page template to **Elementor Full Width** so Astra doesn't inject sidebars/containers.

## Adding a page
For each page (homepage, about, treatment, …):
1. Create the WordPress page, choose template *Elementor Full Width*.
2. Drop a **Flexbox Container** (Full Width, no padding, no gap).
3. Inside it, add an **HTML widget** for each numbered block file in the matching `blocks/<page>/` folder, in order.
4. Header (`blocks/global/header.html`) and footer (`blocks/global/footer.html`) are added once via a global template part / page template.

See `blocks/README.md` for the per-block guide.

## Spec
- High-level: `Dr-Arefin-Spec/wordpress-export/00-overview.md`
- Folder: `Dr-Arefin-Spec/wordpress-export/01-folder-structure.md`
- Rules: `Dr-Arefin-Spec/wordpress-export/02-authoring-rules.md`

## Pages shipped
- [x] Homepage — `blocks/home/01-hero.html` → `09-patient-stories.html`, `11-final-cta.html`
- [ ] About
- [ ] Treatment
- [ ] Liver / Gallbladder / Pancreatic / Biliary surgery
- [ ] Mentorship
- [ ] Articles + Single Post
- [ ] Gallery + Image Detail
- [ ] Contact
- [ ] Donate
- [ ] Legal: Imprint / Privacy / Cookie / Disclaimer
