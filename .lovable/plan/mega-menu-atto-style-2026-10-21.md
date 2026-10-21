# PLAN — Atto-Style Mega Menu for Dr. Arefin (drarefin.com)

Status: **PLAN ONLY — awaiting owner approval. Do not build until approved.**
Created: 2026-10-21. Repo: `alimtvnetwork/dr-arefin-updated-repository-project-v2` (HEAD 1e2db3c).
Workflow after approval: build in GitHub repo → owner checks Lovable preview → publish to WordPress live (direct, per owner's Oct 21 decision; homepage first, then groups).

---

## 1. What Atto Property does (the reference, verified from screenshot + live site)

Top header: logo left; nav centre (Home, **Services ▾**, Blog, Pricing, About, Privacy ▾); right side: visible phone number + solid "Get a Quote" button.

Hovering **Services** opens a large white mega panel with three zones:

- **Left rail — "OUR SERVICES":** vertical list of 7 services. Each row = small icon tile + service name + sub-label showing how many location pages exist ("20 locations"). The hovered/selected row is highlighted (filled blue icon tile). Bottom of rail: "View all services →".
- **Right detail pane (changes as you hover rail rows):**
  - Service title (e.g. "Carpet Cleaning")
  - One-sentence patient-style description ("Deep steam extraction that lifts dirt, allergens and stains while protecting carpet fibres.")
  - Two actions: **[Services page →]** (filled) and **[📞 Call]** (outline)
  - Divider, then **"LOCATIONS"** heading
  - 3-column bullet list of ~20 location links, each named "<Service> <Suburb>" ("Carpet Cleaning Altona", "Carpet Cleaning Footscray", …) — every one is a real service×location page on their site
  - Footer row: left = green-tick trust line ("Fibre-safe, residue-free & inspection-ready"); right = "All Carpet Cleaning areas →"
- The whole site behind it is a service × location matrix (7 services × ~20 suburbs). The menu is simply a window into that matrix. **The menu works because every link in it resolves to a real page.**

## 2. Where Dr. Arefin stands today (audited 2026-10-21 from the local mirror)

- Header component: `src/components/arefin/DrArefinHeader.tsx` (446 lines) — used by every Arefin page, dark and light. (`src/components/Header.tsx` is CAF legacy — do NOT touch it for this work.)
- Current nav: Home, About, **Treatment** (4 children: Liver Surgery, Gall Bladder, Pancreatic Surgery, Biliary Tract), Mentorship, Articles, Research, Gallery. Right side already has the Call/Book dual pill (+880 1311 487592) — our equivalent of Atto's phone + CTA. Keep it.
- A mega-panel implementation **already exists in the code** (card grid + "Popular topics" + footer) but is **dead code**: the Treatment item never sets `mega: true`, so visitors only ever see the small 320px dropdown. CSS for it exists in `src/index.css` (~98 arefin nav/mega/dropdown rules, light + dark variants).
- The data for an Atto-style menu **already exists** in `src/data/satelliteMatrix.ts`:
  - **12 services** (`SERVICES`): Liver Surgery, Gallbladder Surgery, Bile Duct Surgery, Pancreatic Surgery, Hepatobiliary Surgery, Laparoscopic Surgery, Liver Transplant Coordination, Fatty Liver Management, Gallstone Removal, HPB Cancer Surgery, Hernia Surgery, Appendix Surgery — each with display name, plain noun, symptoms, conditions, clinical paragraph, hero image.
  - **15 areas** (`AREAS`): Dhaka ×10 (Dhanmondi, Gulshan, Uttara, Mirpur, Mohakhali, Banani, Bashundhara, Old Dhaka, Wari, Tejgaon) + 5 cities (Rangpur Sadar, Chattogram, Sylhet, Khulna, Rajshahi) — each with landmark + travel time + unique local context paragraph.
  - Page pattern for a location link: `/treatment/<service>-in-<area>/` (e.g. `/treatment/gallbladder-surgery-in-uttara/`).
- **The gap:** only the PILOT pair is generated today (liver-surgery × dhanmondi). `MATRIX_FULL` (12 × 15 = 180 service-in-area pages) exists in code but is **not wired into `App.tsx`** (only `MATRIX_PAGES_PILOT` is). So today, an Atto-style locations grid would link to ~175 pages that do not exist yet.
- Hand-authored satellites: 66 pages in `satellitePages.ts` (27 under `/treatment/`), 46 FAQ root pages in `faqRegistry.ts`, plus journey/task pages. All 4 current "Popular topics" mega links DO resolve in React.
- WordPress side: `scripts/wp-exact/routes.json` has only **11 routes**. The go-live checklist (2026-10-13) counts **219 internal link targets that don't exist in WordPress** (Lovable-only satellite/FAQ pages), 68 of them already broken on live today. A menu that links only to generated+deployed pages is the single biggest fix for that number.
- My own link sweep of `src/` found ~180 distinct internal targets referenced in code, with whole families unresolved (e.g. content links to `/faq/<slug>` while FAQ routes live at root `/<slug>`; a `/conditions/` hub + several condition pages linked but only `/conditions/gallstones/` exists; a few CAF leftovers like `/contatto`, `/caf-isee`, `/chi-siamo` still referenced in archived/legacy files).

## 3. The Arefin mega menu — design mapping (Atto → Arefin, brand-adapted)

Keep our brand system (tokens from `index.css` / Dr-Arefin-Spec design system, Hind font, our green). Copy the **structure and behaviour**, never Atto's blue or their content.

**Trigger:** the existing **Treatment** top-level item (hover on desktop, tap on mobile). No new top-level items.

**Panel layout (desktop, wide panel under header — DARK warm-black surface, NOT Atto's white: this project's own history already decided this, see §9.2):**

- **Left rail — "OUR TREATMENTS"**
  - One row per rail service: existing inline SVG icon (Liver/Gallbladder/Pancreas/Biliary style, stroke icons only) + service name + sub-label **"15 areas"** (the count of areas that service is offered for — true once §4 pages are generated).
  - Hovering/keyboard-focusing a row switches the detail pane (Atto behaviour). Selected row = filled icon tile in brand primary, like Atto's active row.
  - Rail bottom: **"View all treatments →"** → `/treatment/`.
  - Rail services (recommendation D1): the **8 HPB-core services** — Liver Surgery, Gallbladder Surgery, Bile Duct Surgery, Pancreatic Surgery, Hepatobiliary Surgery, Laparoscopic Surgery, Liver Transplant Coordination, Fatty Liver Management. Gallstone Removal folds into Gallbladder (it is the same patient intent; its pages stay reachable from the Gallbladder hub), HPB Cancer folds into Hepatobiliary/Liver/Pancreatic hubs, Hernia + Appendix stay out of the rail (general-surgery dilution of a specialist brand) but remain in the sitemap/hubs. All 12 stay in the data; the rail is a view, not a deletion.
- **Right detail pane (per selected service)**
  - Title: service display name.
  - Description: ONE patient-friendly sentence, adapted from that service's `clinical` text + top symptoms in the data file (no new medical claims; owner approves final wording with the preview).
  - Actions: **[Treatment page →]** filled button → the service's hub (`/treatment/liver-surgery/` etc. — for services without a hand-built hub, → their `/treatment/<service>/` satellite hub page, which exists for laparoscopic/fatty-liver/transplant as Tier-1 satellites) and **[📞 Call]** outline button → `tel:+8801311487592`.
  - Divider, then **"AREAS WE SERVE"** heading.
  - **Locations grid:** 3 columns × 5 rows of bullet links named **"<Service> in <Area>"** ("Gallbladder Surgery in Uttara") → `/treatment/<service>-in-<area>/`. Dhaka areas first (10), then the 5 cities — same order as `AREAS`.
  - Footer row: left = trust line with ✓ — proposed text (D5): **"BSMMU-trained HPB surgeon · Popular Medical College Hospital, Dhanmondi"** (factual, already on the site). Right = **"All <Service> areas →"** → the service hub.
- **Default selected service on open:** Gallbladder Surgery (D4) — gallstones are the highest-volume patient intent and the homepage's lead treatment.
- Panel behaviour: opens on hover with the existing 150 ms close grace; closes on Esc, on route change, and when the pointer leaves header+panel; `aria-expanded`/`aria-haspopup` already in the component and must be kept; keyboard focus within the panel must switch/select rows (Atto is mouse-only; we do better, per this project's WCAG rules).

**Mobile:** no hover — the existing mobile accordion expands Treatment into the rail services; tapping a service expands its 15 area links inline (accordion within accordion) with the hub link first ("Gallbladder Surgery — overview"). Call/Book pill stays pinned as today.

**What NOT to copy from Atto:** their "Pricing" and "Privacy" top-level items (we have no pricing page; privacy lives in the footer), their blue (#1D4ED8-style) palette, their suburb content, their "Get a Quote" wording (we keep Call/Book).

## 4. Pages needed — the build behind the menu

| # | Page set | Count | Status | Action |
|---|----------|-------|--------|--------|
| 1 | Treatment hub `/treatment/` + 4 surgery hubs | 5 | Exist | None (menu links to them) |
| 2 | Service-in-area pages for rail services | 8 × 15 = **120** | Data + generator exist; only 1 pilot pair live | Wire `MATRIX_FULL`-style generation **for rail services only** in `App.tsx`; verify each renders via `SatellitePageTemplate` with unique area context (thin-content rule: area context + clinical copy per matrix authoring rule) |
| 3 | Remaining matrix services' in-area pages (Gallstone, HPB Cancer, Hernia, Appendix) | 4 × 15 = 60 | Not generated | Phase 2 (with hubs' internal links), not needed for the menu |
| 4 | Satellite hubs for laparoscopic / fatty-liver / transplant / hepatobiliary | in the 66 | Exist | Confirm each is a sensible "Treatment page" target; link rail CTAs there where no hand-built hub exists |
| 5 | Sitemap | — | `scripts/generate-sitemap.ts` runs on build | Confirm new routes are included; `public/sitemap.xml` regenerates |
| 6 | WordPress routes | 11 today | `routes.json` manual list | Extend the wp-exact pipeline to include the new routes (snapshot per route) **before** WP publish; menu goes to WP only together with its target pages — never before them |

**Sequencing rule (the one that prevents 219-style breakage):** menu code and its target pages ship in the SAME GitHub push and the SAME WordPress deploy batch. The menu never links to a page that is not in the same release.

## 5. Gap analysis

| Atto element | Arefin today | Gap | Fix in this plan |
|---|---|---|---|
| Services mega panel | Mega code exists but never renders (`mega` flag unset) | Dead code; visitors see a small dropdown | Enable + rebuild panel per §3 in `DrArefinHeader.tsx` |
| Rail with icons + counts | 4 children with icons, no counts, no rail | No service rail | Rail from `SERVICES` data (single source of truth) |
| Detail pane switching on hover | None | — | Hover/focus-driven detail state per §3 |
| Locations grid per service | None in menu; matrix data exists unused | 180 potential pages, 1 pair generated | Generate rail services × 15 areas (§4 #2) |
| Every menu link resolves | Popular-topics links resolve; but 219 WP-missing targets sitewide | Menu must not add to that count | §4 sequencing rule + post-build link crawl QA |
| Phone + CTA in header | Call/Book pill exists | None | Keep as-is |
| Mobile menu | Accordion with 4 children | Areas not reachable on mobile | Nested accordion per §3 |
| Top-level items | Home/About/Treatment/Mentorship/Articles/Research/Gallery | Matches our content (Atto's Pricing/Privacy don't apply) | No change |
| Conditions browsing | Content links to `/conditions/…`; only gallstones exists | Missing hub + ~5 condition pages | Phase 2 (not menu-blocking): create `/conditions/` hub + linked condition pages, or remove those links — owner decision D6 |
| FAQ link format | Content links `/faq/<slug>`; routes are `/<slug>` | Format mismatch family inside the 219 | Phase 2: normalise links to root-slug routes (or add `/faq/` redirects) |

## 6. Build steps (after approval — GitHub first)

1. **Data:** add a `menu.ts` view-model derived from `satelliteMatrix.ts` (`SERVICES` + `AREAS` imports only — no duplicated lists). The rail subset (D1) is a slug list in that file; the hub-URL mapping for the 3 satellite-hub services (G6) is an explicit table there.
2. **Pages:** wire full matrix generation for the rail services in `App.tsx` (alongside the pilot), confirm all new routes render through `SatellitePageTemplate`, regenerate the sitemap.
3. **Header:** rework the Treatment panel in `DrArefinHeader.tsx` per §3 + §9 + §10 (rail + detail pane + areas grid + footer), reusing/extending the `arefin-mega-*` CSS in `src/index.css`. Keep the component's exports and props unchanged (M9).
4. **Mobile:** nested accordion per §10.5 in the existing mobile menu.
5. **QA (blocking):** (a) crawl every menu href against the built route set — zero unresolved; (b) screenshots in Lovable preview: dark home, light home, one article page, mobile menu; (c) verify hover/click/keyboard behaviour against §10 line by line; (d) computed-colour check of greens on one dark + one light page (G2); (e) bundle size before/after reported (M29).
6. **Push** to GitHub `main` (owner approval tap, single batched commit) → owner reviews the Lovable preview.
7. **WordPress:** extend `scripts/wp-exact/routes.json` generation to include the new routes; adapt `target.mjs` for the live target (deliberate, reviewed change); deploy homepage first, verify, then the remaining routes in groups; purge SpeedyCache; re-verify the menu live on desktop + mobile.
8. **Rollback (any stage):** Git revert of the push; on WP, clear `arefin_raw_html` / deactivate the snippet / `?arefin_legacy=1` (existing wp-exact safety valves).

## 7. Build verification checklist (the implementing AI self-checks every line)

- [ ] Treatment panel opens with `arefin-mega-reveal` (250ms) — no new keyframes written
- [ ] Rail shows the D1 services in §3 order, icons in the existing SVG style, counts computed from `AREAS`
- [ ] Hover/focus a rail row → detail pane swaps (80ms dwell mouse, instant keyboard), panel height does not change by 1px
- [ ] Every areas link matches `/treatment/<service>-in-<area>/` and resolves in the built app
- [ ] [Treatment page →] targets verified per service (4 hand-built hubs + satellite hubs per the menu.ts table)
- [ ] Call button `tel:+8801311487592`; Call/Book pill in header untouched
- [ ] No raw hex, no third green, no Hind, no emoji, no `!important`, no inline styles in the diff
- [ ] No hover translate/scale anywhere in the diff (entrance keyframe excepted)
- [ ] Panel fully visible at 1024 / 1280 / 1440 / 1920 px widths, top (unscrolled) and scrolled (shrunken header) states
- [ ] Mobile: Treatment accordion → service → areas, all targets ≥44px, body scroll locked
- [ ] Esc closes; focus ring visible on every interactive element; contrast AA on panel text
- [ ] `prefers-reduced-motion` disables the translate in the reveal
- [ ] Pages that import the header still build (exports unchanged): home dark/light, about, 4 hubs, articles, article single, contact, gallery, FAQ single, satellite template
- [ ] Sitemap includes the 120 new routes; routes.json extended before any WP deploy
- [ ] Popular-topics pages still linked from the Treatment hub (M11)

## 8. One-shot build prompt (paste-ready for any AI, after owner approval)

> In repo `alimtvnetwork/dr-arefin-updated-repository-project-v2`, implement the mega menu specified in `.lovable/plan/mega-menu-atto-style-2026-10-21.md` (§3 design, §9 branding tokens, §10 interaction spec). Obey §11 (mistake-prevention) and self-check §7 before finishing. Scope: `src/components/arefin/DrArefinHeader.tsx`, `src/index.css`, a new `src/data/menu.ts` derived from `satelliteMatrix.ts`, `App.tsx` route generation for the rail services × AREAS, sitemap regeneration. Do not touch `src/components/Header.tsx`, `_archive/`, WordPress files, or any page's content. Do not change the header component's exports/props. No new colours, fonts, or copy beyond the data files. Finish with: the §7 checklist results, a crawl report proving every menu link resolves, and the bundle size delta. Stop and ask if any §3/§9/§10 value is ambiguous instead of guessing.

## Decisions for the owner (recommendation in bold)
- **D1** Rail services: **8 HPB-core** vs all 12.
- **D2** Areas at launch: **all 15** vs Dhaka-only 10 (label auto-follows, G7).
- **D3** Top-level label: keep **"Treatment"** vs "Services".
- **D4** Default service when the panel opens: **Gallbladder Surgery** vs Liver Surgery.
- **D5** Trust line: **"BSMMU-trained HPB surgeon · Popular Medical College Hospital, Dhanmondi"** — or owner wording.
- **D6** Phase 2 (conditions hub + `/faq/` link family + remaining matrix services): **yes, after the menu ships** vs menu only.

---
*Sections 9–12 below were added 2026-10-21 in review round 2 (owner request: deeper gap analysis, explicit AI-mistake prevention, full animation + branding detail). Section 3's panel description and §6 were corrected/completed in the same round.*

## 9. BRANDING SPEC — exact tokens (extracted from the code 2026-10-21; do not invent values)

### 9.1 Colour — the two-greens rule
Source: `Dr-Arefin-Spec/01-design-system.md` + `.arefin` tokens in `src/index.css`.
- `--primary-bright` = `133 80% 41%` (#14bb3e) — resting/default green: buttons, CTAs, links, numerals at rest.
- `--primary-darker` = `128 91% 32%` (#079a14) — hover / active / emphasis ONLY.
- These are the ONLY two greens. Aliases (`--primary`, `--primary-glow`, `--primary-light` → bright; `--primary-deep`, `--primary-hover` → darker) resolve to them.
- ❌ Forbidden greens (all banned): `#22C55E`, `#0cd067`, `#379237`, `#54B435` (CAF's green). Atto's blue (any blue) is also banned anywhere in the menu.
- Dark surfaces: `--background-dark` `213 39% 17%` (#1C2A3C), `--background-darker` `216 41% 12%` (#111A28), `--background-deepest` `192 60% 6%` (#061314, footer).
- All colours as HSL CSS variables. **No raw hex anywhere in new menu CSS/JSX.**

### 9.2 Panel surface — already decided by project history; do not re-litigate
Current `.arefin-mega-panel` (index.css, recording user feedback of 2026-05-13: *"pure-white panel was harsh on dark home"*):
- Background `hsl(40 6% 8%)` (soft warm light-black), border `1px solid hsl(40 15% 70% / 0.14)`, radius **16px**
- Text: title `hsl(40 10% 94%)`; description `hsl(40 8% 68%)` → `hsl(40 10% 88%)` on hover; labels `hsl(40 8% 65%)`
- The wide panel REUSES this surface verbatim and stays pinned dark on light pages too (existing deliberate behaviour).

### 9.3 Typography
- Nav + menu body: **Poppins** (400/500/600). Headings (detail-pane title etc.): **Ubuntu 700** via `var(--font-heading)`.
- **Hind is video-pages-only** (`.video-page` scope) — never in the menu.
- Sizes follow the existing mega classes: title 0.875rem/600, description 0.75rem, section labels 10–12px uppercase, letter-spacing 0.08em, weight 600.
- Layout grid: 1248px max container, border-box, 24px side padding (1200px visible) — the wide panel aligns to this grid.

### 9.4 Iconography + untouched elements
- Icons: existing hand-drawn inline SVGs (24 viewBox, stroke 1.5, round caps, `currentColor`); tile 40×40, radius 10px, bg `--primary-bright` 18% → 28% on hover.
- Logo, header layout, and the Call/Book dual pill are signature elements — untouched.

## 10. INTERACTION & ANIMATION SPEC (every value grounded in the existing code)

Global easing: `cubic-bezier(0.22, 1, 0.36, 1)`. Global rule (project-wide): **hovers never shift position — no translate, no scale, no layout movement. Colour, border, background, shadow only.** The panel *entrance* (§10.1) is the one sanctioned exception.

### 10.1 Panel open / close
- Open: mouseenter on Treatment, no added delay (must feel instant).
- Entrance: existing keyframes `arefin-mega-reveal`, **250ms**, from `opacity 0 / translateY(-8px)` → rest. Reuse the class; never write a new animation for this.
- Close: existing **150ms grace timer** on mouseleave (diagonal pointer travel must not collapse it); Esc closes instantly; route change closes; link click closes.
- No exit animation (a fade that delays navigation feels broken). Small dropdown keeps `arefin-scale-in` 200ms — untouched.

### 10.2 Rail hover / service switching
- Row transition: **300ms** global easing, `background-color` + `border-color` only.
- Hover/selected: bg `--primary-bright` 12%, **3px left border** `--primary-bright` (the project's Atto-card pattern), title → `--primary-bright`, description → near-white, icon tile 18% → 28%.
- Switching: **80ms hover dwell** before the pane swaps (a fast diagonal sweep across rows must not strobe through services); keyboard focus swaps immediately.
- Swap animation: **120ms opacity crossfade** on the pane body only. **Panel height is locked** (fixed min-height = tallest state: title + 2-line clamped description + buttons + 5 grid rows + footer) → zero height change, zero page shift between services.
- `:focus-visible` styles identical to `:hover` (existing mega-card pattern).

### 10.3 Click behaviour
- Desktop click on "Treatment": navigates to `/treatment/` — never hijack it into a pure toggle (the link is real; existing behaviour; SEO).
- Rail row click: navigates to that service's hub (hover selects, click navigates).
- Touch (coarse pointer): first tap on Treatment opens the panel without navigating; second tap on the label navigates. Rail rows tap-navigate. Detect with `matchMedia('(pointer: coarse)')`, never screen width alone.
- `:active` press feedback: `filter: brightness(0.92)` only — no scale, no translate.

### 10.4 Pane internals
- Area links: colour 300ms ease → `--primary-bright`, bullet dot turns `--primary-bright`; add underline (`text-underline-offset: 3px`) on hover AND focus (colour alone is not an accessible affordance).
- [Treatment page →]: SlideButton pattern (the header CTA component), fill `--primary-bright` → hover `--primary-darker`, 300ms. [Call]: 1px border `hsl(40 15% 70% / 0.25)` → hover border+text `--primary-bright`; href `tel:+8801311487592` (no spaces in the URI; display "+880 1311 487592").
- Trust line: static; ✓ in `--primary-bright`.
- Treatment chevron: rotate 180° over **300ms** when open (existing).
- Focus-visible: 2px ring `--primary-bright`, 2px offset, on nav items, rows, links, buttons.

### 10.5 Mobile (< lg, extending the existing accordion)
- Treatment accordion: chevron rotate 300ms, expand/collapse 300ms global easing.
- Inside: service rows; tapping a service expands its areas inline (second-level accordion, same timing); first item in each expansion is the hub link ("Overview — Gallbladder Surgery").
- Tap targets ≥ 44px (existing `min-h-12`); body scroll stays locked with position preserved.

### 10.6 Motion safety + layering
- `prefers-reduced-motion: reduce`: reveal + accordions become opacity-only/instant; no translate anywhere.
- Panel `z-50`, positioned from the **header container** (not the nav `<li>`), width `min(1120px, calc(100vw - 32px))`, centred on the 1248px grid → cannot clip at 1024/1280/1440px. Header keeps `overflow: visible`. Panel is absolutely positioned: opening it causes zero document reflow.

## 11. AI MISTAKE-PREVENTION LIST — the "stupid mistakes" an AI WILL make unless told not to

Read this section twice: before writing code, and again during self-review. Format: mistake → rule.

### Copy & content
- **M1. Invented medical claims and slop words.** AI reaches for "world-class, state-of-the-art, cutting-edge, revolutionary, game-changing, unparalleled, holistic, empower, elevate your health, trusted by thousands, 5,000+ successful surgeries, painless / scarless / 100% safe, best surgeon in Bangladesh". → ALL banned in UI copy. Menu text comes only from `satelliteMatrix.ts` and facts already on the site (BSMMU, Popular Medical College Hospital, the phone number). No statistics, no outcome promises, no superlatives.
- **M2. Renaming things.** AI "improves" labels. → Display names copied character-for-character from `SERVICES`/`AREAS` and hub titles. Note the trap: the old dropdown says "Gall Bladder" but the matrix/hubs say "Gallbladder Surgery" — the matrix wins; never propagate the old label, never invent a third variant.
- **M3. Alphabetising.** AI sorts lists. → Rail order = §3 clinical order; areas = `AREAS` order (Dhaka first). Never sort anything.
- **M4. Wrong English register.** US spellings, exclamation marks, shouty caps, emoji. → British spellings as in the existing copy ("minimising"); no exclamation marks; ALL-CAPS only on the small section labels; no emoji (✓ and → are existing typographic symbols, not emoji).
- **M5. "Fixing" local names.** → Dhanmondi, Uttara, Bashundhara, Chattogram exactly as in `AREAS` (display "Chattogram", slug `chattogram`; never "Chittagong" in menu text).

### Data & links
- **M6. Hardcoding the menu.** Typed JSX lists drift from data within one edit. → Menu derives from `SERVICES` + `AREAS` imports; "15 areas" is `AREAS.length`, computed, never typed.
- **M7. Linking pages that don't exist.** The project's original sin (219 targets). → Every menu href resolves to a route in the same release; the §7 crawl is a blocking gate.
- **M8. Wrong URL shapes.** Missing trailing slash, guessed slugs, inventing `/services/…`, linking why/best intent pages from the menu. → Menu links are ONLY hubs + `/treatment/<service>-in-<area>/`, copied from the generator's patterns.
- **M9. Breaking the component API.** 20+ pages import the header's default export (props `logoSrc`, `transparent`) and `CallBookPill`. → API unchanged; a build break on any importing page means the change is wrong.
- **M10. Editing the wrong header.** `src/components/Header.tsx` is the archived CAF header; `_archive/` is reference-only. → Work only in `DrArefinHeader.tsx` + `index.css`.
- **M11. Mishandling "Popular topics".** Deleting it orphans 4 working links; keeping it AND the areas grid bloats the panel. → Areas grid replaces it inside the Treatment panel; the 4 pages must be linked from the Treatment hub (verify; add if missing, same release).

### Design & branding
- **M12. Copying Atto's skin.** Blue buttons, white panel, their shadows. → Structure yes, skin no: §9 tokens, dark warm panel (§9.2), radius 16px.
- **M13. Inventing colours.** → If a value isn't in §9 it doesn't exist; opacity steps of the two greens (12/18/28%) are the only variation.
- **M14. Icon shortcuts.** Emoji, icon-font glyphs, or mismatched SVG styles. → Hand-drawn inline SVGs in the existing style only.
- **M15. AI imagery.** Never AI-generate the doctor, patients, clinic, logos, credentials. The menu needs no photography; if a draft adds a panel image, delete it.
- **M16. Font drift.** Hind (video pages only), Inter, system fonts. → Poppins + Ubuntu only.
- **M17. `!important` / inline styles.** Both banned by project CSS rules. → Kebab-case classes + variables, specificity via `.arefin` scope.

### Interaction
- **M18. Hover lift.** `translateY(-2px)` + shadow "for polish" is AI's favourite move. → Forbidden (§10 global rule).
- **M19. Jumping panel.** Variable copy lengths resize the panel per service. → Locked height + 2-line clamp (§10.2).
- **M20. Strobe switching / instant close.** Swapping on every mouseenter, or closing the moment the pointer crosses a 1px gap. → 80ms dwell, 150ms close grace, diagonal-path test (§10.1–10.2).
- **M21. Click hijack.** Treatment as pure toggle kills `/treatment/` (SEO + user expectation). → §10.3 exactly.
- **M22. Off-screen panel.** Centring a wide panel on the nav item clips it on smaller laptops. → Anchor to header container (§10.6); verify 1024px.
- **M23. Clipped panel.** Sticky/overflow ancestor eats it. → Header overflow visible, z-50, test in the shrunken scrolled header state.
- **M24. Mouse-only build.** No keyboard path, no focus ring, no Esc, essential text in low-contrast grey. → §10.2/§10.4 focus behaviour is part of "done"; WCAG 2.1 AA: panel title 94% on 8% passes; the 68% description tone is for secondary text only.

### Build & deploy
- **M25. Menu before pages** (= M7 at release level). **M26. Forgetting sitemap + routes.json** — new pages invisible to Google and WordPress.
- **M27. One-page WP deploy.** The header is baked into every snapshot: homepage-only deploy leaves 10 pages on the old menu. → All-routes redeploy in groups (§6 step 7).
- **M28. Link-prefix errors.** WP build `href` rules live in `scripts/wp-exact/deploy.mjs` comments (the `/staging/staging` bug class). → Menu uses React `<Link>` only; read deploy.mjs before touching anything link-shaped.
- **M29. Silent bundle bloat.** Main JS is already ~1.5MB. → Report bundle size before/after; flag material growth to the owner instead of shipping silently.
- **M30. History rewrite.** Lovable two-way sync: never force-push or rewrite pushed history; one logical change per push batch for owner review.

## 12. ADDITIONAL GAPS FOUND IN REVIEW ROUND 2 (2026-10-21, beyond the v1 plan)

- **G1. Panel colour (v1 plan error, corrected):** v1 said "light panel like Atto" — the project already tried white and rejected it (feedback recorded in the CSS, 2026-05-13). §9.2 pins the dark warm panel.
- **G2. Two green systems coexist:** `:root` shadcn tokens (CAF scope) vs `.arefin` tokens. The menu lives in `.arefin` pages — §9 names the arefin tokens; generic utility classes can resolve differently per scope, so §7 requires a computed-colour check on one dark + one light page.
- **G3. Header variants:** one component serves dark pages (transparent over hero), light home, articles, satellites. The panel is pinned dark in all — QA must include the light home page (highest contrast-risk combination).
- **G4. Scope control:** no other top-level item gets mega treatment; Research stays a plain category link.
- **G5. Bigger broken-link families:** content links use `/faq/<slug>` while FAQ routes are root `/<slug>`, and journey/task pages generate children whose parents must exist. Phase 2 (D6) — but the menu must not copy those shapes.
- **G6. Satellite hubs as CTA targets:** Hepatobiliary, Liver Transplant Coordination and Fatty Liver have no hand-built hub — their [Treatment page →] target is their Tier-1 satellite page. The slug mapping goes explicitly into `menu.ts`; never guessed at render time.
- **G7. The count label is a promise:** "15 areas" asserts 15 real pages per service. If D2 ships Dhaka-only, it must read "10 areas" — automatic if M6 (computed counts) is obeyed.
- **G8. File-integrity note:** the v1 write of this plan was truncated mid-§6 by a generation cut-off (the file literally ended in a "[truncated]" marker). Round 2 repaired §6 and completed §§7–8. Lesson recorded: verify plan files by reading the tail after writing, not by the write result alone.
