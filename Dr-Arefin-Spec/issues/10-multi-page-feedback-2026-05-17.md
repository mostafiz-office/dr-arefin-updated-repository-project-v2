# Multi-Page Feedback — 2026-05-17

> Source: voice feedback covering Home, About, Treatment subpages, Mentorship, Articles, Gallery, and global polish.
>
> **Workflow:** One task per "next" — implement, mark `[x]`, stop.

---

## Approved decisions

1. **Footer Specialties order** → Gallbladder = **#1** (top priority), Liver = #2.
2. **Mentorship carousels** → 3 cards visible; middle card scaled **1.15×**, side cards dimmed; arrows + dots; **no autoplay**.
3. **Article card hover** → Neutral: dark-green border + sharp 0-blur shadow (Atto pattern); **no green fill**.
4. **Gallery image hover** → Dark **bottom-up gradient overlay** + white title for AA contrast.

---

## Rewritten brief

### Home
- "Comprehensive Hepatobiliary & Liver Care" — fix top/bottom padding mismatch (equal vertical rhythm).
- FAQ accordion: clicking **anywhere on the card** (not just title/chevron) toggles open/close.
- Footer Specialties: **Gallbladder #1**, Liver #2; reorder rest accordingly.
- Footer intro paragraph: rewrite **gallbladder-first** copy.
- Footer Quick Links: add **Gallbladder** entry.
- Footer Specialties links: add **question-style hover label** on Gallbladder (e.g. tooltip / aria title surfacing a gallbladder Q).

### About
- Add new Q&A band between/after Vision & Mission, mirroring home's "Transform lives" section pattern. Gallbladder-keyword focused content.
- Audit section bg/coloring contrast on About — fix any same-tone surfaces per Surface Elevation Rule.

### Treatment subpages (Liver, Gallbladder, Pancreatic, Biliary)
- Dropdown items: **remove text-shadow / drop-shadow** for clean legibility.
- All titles and body text in "What is X treatment" cards → add internal links (satellite-page registry) on keywords.
- "What is X treatment" cards: enforce **consistent title length (lines)** and **consistent body word/character count** across all cards for visual rhythm.
- "Your Treatment Journey" Step 1 card: switch from dark-green+black to **lighter-green premium tone** (still per two-greens contract — use light alias of `--primary-bright` at low alpha for the surface, keep dark text). Apply to Liver, Gallbladder, Bile Duct/Biliary, Pancreatic.

### Mentorship
- All body copy → link gallbladder Q&A keywords to satellite pages.
- "Who Can Join the Mentorship Program?" → convert to **3-card carousel** (decision #2 above).
- "Why Train with Dr. Arefin" → same 3-card carousel treatment.
- "Your Mentorship Journey" → same 3-card carousel treatment.
- "Measurable Impact" numbers → wrap with links to relevant satellite/result pages.
- FAQ: click-anywhere-on-card to toggle (same as home).

### Articles
- Article card hover → Atto pattern: dark-green left border + sharp 0-blur shadow, NO green fill (decision #3).

### Gallery
- All descriptive text → link gallbladder-relevant keywords to satellite pages.
- Image card hover title contrast → **dark bottom-up gradient overlay** + white title (decision #4).
- New satellite pages spawned from gallery copy must follow gallbladder Q&A format.

### Global
- FAQ accordion: **click anywhere on the card** toggles open/close — apply EVERYWHERE FAQ appears (Home, About, Treatment×4, Mentorship, satellite pages).
- All new satellite pages spawned from this batch must follow **gallbladder-keyword Q&A** content format.

---

## 32 Tasks

> Mark each as `[x]` when complete. Execute strictly in order.

### Global FAQ behavior (Task 1)
- [x] **T01** — FAQ accordion: make the entire card clickable to toggle (not just title/chevron). Apply to FAQAccordion component → propagates to Home, About, Treatment×4, Mentorship, satellite pages.

### Home — Services section padding (Task 2)
- [x] **T02** — "Comprehensive Hepatobiliary & Liver Care": equalize top/bottom section padding for vertical rhythm.

### Home — Footer rework (Tasks 3–6)
- [x] **T03** — Footer Specialties: move **Gallbladder to position #1**; Liver #2; reorder remaining items.
- [x] **T04** — Footer intro paragraph: rewrite **gallbladder-first** copy.
- [x] **T05** — Footer Quick Links: add **Gallbladder Surgery** entry linking to `/gallbladder-surgery`.
- [x] **T06** — Footer Specialties Gallbladder link: add question-style hover tooltip / `title` attribute surfacing a gallbladder Q (e.g. "What is gallbladder surgery in Dhanmondi?"). _Done via T03 + T05 `title` attributes._

### About page (Tasks 7–8)
- [x] **T07** — Add new Q&A band (homepage "Transform lives" pattern) between/after Vision & Mission; gallbladder-keyword content; ~6–8 Q&As with satellite-page links.
- [x] **T08** — About page section coloring audit: fix any same-tone surfaces per Surface Elevation Rule (dark section → light cards, light section → dark cards). _Flipped Gallbladder Q&A band to dark surface with light cards to break V/M → Q&A → FAQ triple mint stack._

### Treatment subpages — dropdown shadow (Task 9)
- [x] **T09** — Remove text-shadow / drop-shadow from dropdown items on Liver, Gallbladder, Pancreatic, Biliary pages (clean legibility). _Extended existing mobile-panel neutralizer to all `.arefin-dropdown-item` + `.arefin-mega-card` (desktop + mobile) so the global `.arefin.dark a:hover` text-shadow no longer bleeds into nav dropdowns._

### Treatment subpages — content link wrapping (Tasks 10–13)
- [x] **T10** — Liver Surgery: wrap "What is X treatment" titles + body keywords with satellite-page links. _Added `titleHref`/`titleAlt` to each condition; `<h3>` now wraps an inline `<Link>` to the matching satellite path; bodies already had rich satellite anchors._
- [x] **T11** — Gallbladder Surgery: same link wrapping. _Same pattern applied._
- [x] **T12** — Pancreatic Surgery: same link wrapping. _Same pattern applied._
- [x] **T13** — Biliary Tract Surgery: same link wrapping. _Same pattern applied._ Global `.{liver|gb|pc|bt}-card-title-link` rule in src/index.css makes the inner `<a>` inherit color/text-shadow from the existing card-title styles (no anchor-blue / underline)._

### Treatment subpages — card content consistency (Tasks 14–17)
- [x] **T14** — Liver Surgery: normalize "What is X" card **titles** (same line count: target single-line or all two-line) and **body copy word/char count**. _Renamed "Liver Transplant Coordination & Follow-Up Care" → "Liver Transplant Follow-Up Care" (now ≤ 32ch like its siblings), padded the two shortest descriptions (Fatty Liver, Follow-Up) up to ~60 words to match the others, and added `min-height: calc(--fs-h4 * 1.35 * 2)` to `.liver-card-title` as a visual safety net so every title reserves exactly two h4 lines._
- [x] **T15** — Gallbladder Surgery: same normalization. _(2026-05-17: shortened titles "Gallbladder Stone Surgery" / "Gallbladder & Bile Duct Cancer" to ≤32ch; extended shorter card bodies to ~55-60 words; added `.gb-card-title` two-h4-line `min-height` safety net in src/index.css.)_
- [x] **T16** — Pancreatic Surgery: same normalization. _(2026-05-17: shortened titles to ≤32ch ("Whipple Pancreaticoduodenectomy", "Acute & Chronic Pancreatitis", "Pancreatic Cyst & Pseudocyst"); extended shorter body to ~55-60 words; added `.pc-card-title` to shared two-h4-line `min-height` safety net.)_
- [x] **T17** — Biliary Tract Surgery: same normalization. _(2026-05-17: shortened titles to ≤32ch ("Bile Duct Obstruction Repair", "Cholangiocarcinoma Surgery", "Biliary Stricture Reconstruction"); extended two shorter card bodies to ~55-60 words; added `.bt-card-title` to shared two-h4-line `min-height` safety net.)_

### Treatment subpages — Journey Step 1 lighter green (Tasks 18–21)
- [x] **T18** — Liver Surgery: "Your Treatment Journey" Step 1 → lighter premium green surface (low-alpha `--primary-bright`), keep dark text. _(2026-05-17: shared `TreatmentProcessSticky` component — Step 1 surface in src/index.css now layers `hsl(var(--primary-bright) / 0.14)` over white with `hsl(var(--primary-darker) / 0.35)` border; dark text overrides retained for AA contrast.)_
- [x] **T19** — Gallbladder Surgery: same Step 1 lighter green. _Covered by shared component update in T18._
- [x] **T20** — Pancreatic Surgery: same Step 1 lighter green. _Covered by shared component update in T18._
- [x] **T21** — Biliary Tract Surgery: same Step 1 lighter green. _Covered by shared component update in T18._

### Mentorship page (Tasks 22–27)
- [x] **T22** — Mentorship body copy: wrap gallbladder Q&A keywords with satellite-page links throughout. _(2026-05-17: added satellite-page anchors across `audiences`, `learnings`, `curriculum`, and `reasons` body copy in src/pages/MentorshipDark.tsx — keywords like "hepatobiliary knowledge/care", "liver resections", "biliary reconstruction", "complex hepatobiliary", "liver transplant surgeries", "transplant protocols", "pancreatic and biliary disorders", "laparoscopic and open surgical approaches", "hepatobiliary specialists" now route to /treatment/liver-surgery/, /treatment/pancreatic-surgery/, /treatment/liver-transplant-surgery-dhaka/, /treatment/laparoscopic-cholecystectomy-dhaka/, and /treatment/biliary-stricture-reconstruction-dhaka/. Existing operative-skills-workshop link preserved.)_
- [x] **T23** — "Who Can Join the Mentorship Program?" → **3-card carousel** (middle 1.15× scaled, sides dimmed, arrows + dots, no autoplay). _(2026-05-17: built reusable `MentorshipCarousel` component in src/components/arefin/, added `.mentor-carousel*` styles to src/index.css with 1.15× active scale, 0.55 opacity on adjacent slides, prev/next arrows, dot pagination, ←/→ keyboard support, no autoplay; mobile (<768px) stacks vertically with arrows hidden. Wired into the WHO CAN JOIN section replacing the static 4-col grid.)_
- [x] **T24** — "Why Train with Dr. Arefin" → same 3-card carousel treatment. _(2026-05-17: replaced the 4-col reasons grid with `MentorshipCarousel`, reusing the T23 component — same 1.15× active scale, dimmed adjacent slides, arrows + dots + keyboard a11y, mobile stack.)_
- [x] **T25** — "Your Mentorship Journey" → same 3-card carousel treatment. _(2026-05-17: converted the Curriculum section (the journey/steps of mentorship) from a static 2/3-col grid to `MentorshipCarousel`, reusing the T23/T24 component — same 1.15× active scale, dimmed adjacent slides, arrows + dots + keyboard a11y, mobile stack. Dark cards on light-green band preserved.)_
- [x] **T26** — "Measurable Impact" numbers → wrap each metric with satellite-page link. _(2026-05-17: each of the three stats in src/pages/MentorshipDark.tsx now wraps in a `<Link>` with `title` attr — 645+ Surgeons → /mentorship/operative-skills-workshop/, 29% Career Placement → /treatment/liver-surgery/, 25% Hospitals Bangladesh & Abroad → /about/. Added `.mentor-stat-link` styles in the page's scoped block: no positional hover (No Hover Uplift contract), only color shift to `--primary-bright` + sharp 2px 2px 0 hover-shadow-ink on the number, plus focus-visible outline for keyboard a11y.)_
- [x] **T27** — Mentorship FAQ → inherits T01 click-anywhere behavior (verify works). _(2026-05-17: verified — MentorshipDark imports the shared `FAQAccordion` (line 27, used at line 460). The component's `.arefin-faq-trigger` row has `role="button"`, full-row `onClick={() => setOpen((o) => !o)}`, and `onKeyDown` for Space/Enter (FAQAccordion.tsx lines 64-74), with the inner question button stopping propagation. Click anywhere on the card header toggles open/close; no Mentorship-specific changes required.)_

### Articles page (Task 28)
- [x] **T28** — Article card hover: replace saturated green fill with **Atto pattern** (3px dark-green left border + sharp 0-blur shadow, no fill change). _(2026-05-17: ArticlesDark already used the Atto structure but the hover shadow was a green-tinted alpha (`hsl(primary-bright / 0.22)`); swapped both the dark-band default and `.articles-light-band` hover shadows to the canonical ink token `rgb(var(--hover-shadow-ink))` (olive in light / black in dark per Hover Shadow Ink Token memory), and switched the left-border accent to `--primary-darker` for the hover state. Same fix applied to `.arefin-surface-alt .article-card:hover` in ArticleSingleDark (related-articles sidebar). No green fill is introduced anywhere; cards keep their resting surface and only the 3px left border + sharp 0-blur ink shadow appear on hover.)_

### Gallery page (Tasks 29–31)
- [x] **T29** — Gallery descriptive copy: wrap gallbladder keywords with satellite-page links. _(2026-05-17: enriched the GalleryDark `HeroSection` introHtml with seven satellite anchors — gallbladder-surgery, laparoscopic-cholecystectomy-dhaka, liver-surgery, liver-transplant-surgery-dhaka, biliary-stricture-reconstruction-dhaka, pancreatic-surgery, mentorship/operative-skills-workshop. Also rewrote all four `CATEGORY_COPY.intro()` templates in GalleryImageDetailDark to return HTML strings with the same satellite-page anchors, switched `.gid-description` to render via `dangerouslySetInnerHTML`, and added a `descriptionText = description.replace(/<[^>]+>/g, "")` helper so `<meta name="description">`, OG meta and JSON-LD `description` remain plain text. Title attributes preserved on every link per the HTML Coding Standards memory.)_
- [x] **T30** — Gallery image hover: add **dark bottom-up gradient overlay** + white title for AA contrast. _(2026-05-17: rewrote `.gallery-grid-overlay` in src/pages/GalleryDark.tsx — always-on linear-gradient (0→78% black bottom-up) at 0.82 opacity, strengthens to ~0.92 opacity on hover/focus-visible. Added a new `.gallery-grid-title` element rendering `img.alt` in #fff 600 weight with a subtle 0 1px 2px black text-shadow for AA contrast against any image; clamped to two lines. Removed the old `filter: brightness(0.75)` image dim. Category pill repainted with `--primary-darker` at 0.92 alpha to stay on-brand (two-greens contract). Layout uses flex-col + justify-end so the gradient anchors title + category at the bottom, leaving the focal subject of the photo visible. `pointer-events: none` on the overlay so clicks still hit the underlying button.)_
- [x] **T31** — Any new gallery satellite pages must follow gallbladder Q&A content format. _(2026-05-17: relaxed `CATEGORY_COPY.faqs` typing in src/pages/GalleryImageDetailDark.tsx to `{ q: string; a: ReactNode; aText?: string }` so answers can be JSX with inline `<Link>`s; FAQAccordion `aText` is auto-derived for the JSON-LD when `a` is a string. Prepended two gallbladder-format Q&A entries to every category — Operation Theater ("What is gallbladder surgery in Dhanmondi?" + cross-link to liver/transplant/biliary/pancreatic), Conference & Training (gallbladder-training & gallbladder-conference topics), Chamber (gallbladder-consultation booking & hepatobiliary scope), Successful OT (successful gallbladder case profile & liver/pancreatic follow-up tracking). Every new Q&A wraps gallbladder/liver/biliary/pancreatic/transplant keywords with anchors to /treatment/gallbladder-surgery, /treatment/laparoscopic-cholecystectomy-dhaka, /treatment/liver-surgery, /treatment/liver-transplant-surgery-dhaka, /treatment/biliary-stricture-reconstruction-dhaka, /treatment/pancreatic-surgery, plus mentorship pages. Existing legacy Q&As preserved underneath so each per-image satellite now has 5 Q&As — two gallbladder-format + three context-specific.)_

### Final regression (Task 32)
- [x] **T32** — Cross-page regression sweep verified 2026-05-17. FAQAccordion click-anywhere (`role="button"` on `.arefin-faq-q-row` with Link stopPropagation) confirmed in `src/components/arefin/FAQAccordion.tsx:70-95`, shared by all surfaces (About, Treatment, Gallbladder, Pancreatic, Liver, Contact, Mentorship, GalleryImageDetail). Gallery `/gallery/` browser-checked: hero introHtml renders satellite links; grid renders with T30 dark bottom-up gradient overlay, white title + green `CONFERENCE & TRAINING` category pill, no `translateY` uplift. No JS errors in console (only pre-existing faqRegistry slug-mismatch warnings + dev-only React `fetchPriority` casing notice from HeroSection `<img>`, both non-blocking and unrelated to T01–T31). Footer order, treatment Step 1 contrast, mentorship carousels keyboard a11y, article hovers all unchanged from their prior task verifications (T01–T31).

---

## Execution protocol
1. User types "next" → agent picks the next unchecked `[ ]` task in order.
2. Agent implements **only that task**, then marks it `[x]`.
3. Agent stops and waits for the next "next".

## Discovered issues
_(none yet)_
