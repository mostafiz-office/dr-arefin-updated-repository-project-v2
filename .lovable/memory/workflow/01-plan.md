# CAF Patronato Fondi — Workflow Plan

## ✅ Completed Tasks

### React App (All Pages)
- [x] Homepage with all sections (hero, trust strip, services, why choose us, process, advantages, sticky stack, testimonials, locations)
- [x] Chi Siamo (About) page
- [x] Servizi (Services) page with FAQ accordion
- [x] Contatto (Contact) pages: main + Cisterna, Fondi, Terracina
- [x] Service subpages: CAF ISEE, CAF 730 Online, CAF Dichiarazione Redditi, Patronato INPS
- [x] Blog archive page
- [x] Header with pill nav, mega-menu (Blog), dropdown (Servizi, Contatto)
- [x] Footer with 4-column layout
- [x] Sticky bottom CTA bar with animated green border glow
- [x] ScrollToTop component
- [x] SEO: JSON-LD, meta tags, semantic HTML, keyword wrapping

### Elementor Export (WordPress)
- [x] All homepage blocks exported as modular HTML widgets
- [x] Global CSS (`global.v1.2.3.css`) with Astra/Elementor overrides
- [x] Blog CSS (`blog.v1.2.1.css`) self-contained
- [x] Single post CSS (`single-post.css`) self-contained
- [x] `caff-interactivity.js` with hamburger, dropdowns, FAQ, sticky CTA, Lucide init
- [x] Inner page blocks: chi-siamo, servizi, contatto, all service subpages
- [x] Header block with pill nav + dropdowns
- [x] Footer block with 4-column layout
- [x] CTA band block
- [x] Sticky CTA bar block

### Design Features Implemented
- [x] Animated gradient border cards (DesignMonks-style advantages section)
- [x] Sticky stack cards with scroll-driven stacking
- [x] Hero floating card with entrance animation + hover effects (Issue #10)
- [x] Header dual CTA Atto Property style with "Or" circle (Issue #11)
- [x] Hero image hover: right-side border shadow, no lift (Issue #12)
- [x] Hero dual-state buttons with content swap on hover (Issue #13)
- [x] Trust strip color override via JS (Issue #14)
- [x] Sticky stack card background colors updated to DesignMonks palette (Issue #15)

### Bug Fixes / Issues Resolved
- [x] Issue #01: Container alignment mismatch (box-sizing fix)
- [x] Issue #02: Single post styling missing (self-contained CSS)
- [x] Issue #03: Header dual CTA contrast (WCAG AA compliance)
- [x] Issue #04: Footer padding missing in blog CSS
- [x] Issue #05: Mobile footer menu centering
- [x] Issue #06: Sticky stack overflow broken (ancestor neutralizer JS)
- [x] Issue #07: Mobile menu accordion styling
- [x] Issue #08: Blog card hover glow removal
- [x] Issue #09: Blog hero subtitle missing
- [x] Issue #10: Hero float card animation + link
- [x] Issue #11: Header dual CTA Atto style
- [x] Issue #12: Hero image hover no lift
- [x] Issue #13: Hero dual-state buttons
- [x] Issue #14: Trust strip inline color override
- [x] Issue #15: Sticky stack card colors updated

## 🔲 Pending Tasks

### WordPress Deployment (User Action Required)
- [ ] Deploy updated `global.v1.2.3.css` to WPCode
- [ ] Deploy updated `caff-interactivity.js` to WPCode (includes trust strip color override)
- [ ] Deploy updated `blocks/homepage/01-hero.html` (dual-state buttons + float card link)
- [ ] Deploy updated `blocks/homepage/05c-sticky-stack.html` (if card colors need HTML class updates)
- [ ] Clear Elementor inline background colors on trust strip containers and add CSS classes instead
- [ ] Verify all pages on live WordPress after deployment

### Future Enhancements (Not Started)
- [ ] Blog single post page in React
- [ ] Contact form backend integration (requires Lovable Cloud)
- [ ] Multi-language support (if needed)
- [ ] Performance audit (Core Web Vitals)
- [ ] Accessibility audit (full WCAG 2.1 AA pass)

## Version Tracking

| File | Current Version |
|------|----------------|
| `global.v1.2.3.css` | FD-CSS v1.2.3 |
| `blog.v1.2.1.css` | FD-CSS v1.2.1 |
| `single-post.css` | FD-CSS v1.0.0 |
| `caff-interactivity.js` | FD-JS v1.2.0 |
