# 08 — SEO-Friendly HTML Writing Spec (Dr. Arefin)

> Source of truth for how every HTML block (React component AND WordPress/Elementor export) must be authored from an SEO perspective. Distilled from client feedback (2026-05-24) + reference page: https://attobondcleaning.store/carpet-cleaning-in-melton/
>
> **Primary keyword focus for this project:** **gallbladder** (gallbladder surgery, gallbladder treatment, gallbladder stones, laparoscopic cholecystectomy, gallbladder specialist Dhaka). Gallbladder is the lead topic in every page, link, and anchor — liver / pancreas / biliary are secondary.

---

## What I learned from the feedback

Five concrete defects were called out on the live build and must never recur:

1. **Duplicate `id` and `class` on the same element** (e.g. `<h1 id="arefin-hero-h1" class="arefin-hero-h1">`). An `id` is a unique hook; a `class` is a style group. Reusing the same string as both is meaningless to crawlers and screen readers and signals low-quality markup.
2. **Missing or generic `title=""` attributes on links.** Every `<a>` (and every `<strong>` wrapping an `<a>`) must carry a descriptive, keyword-rich `title` of **30–200 characters**, **different from the visible anchor text**.
3. **Hero title too short.** A two-word `<h1>` ("Dr. Arefin", "Gallbladder Care") cannot rank. The H1 must be a long-tail, keyword-loaded sentence — typically 8–14 words including primary keyword + location + value prop.
4. **Anchor text = title attribute.** Forbidden. The `title` must add information beyond what the link text already says, otherwise it's a duplicate and Google ignores both.
5. **Single-word and two-word inline links in body copy.** Inside paragraphs, every inline link must be **≥ 3 words** (e.g. "gallbladder surgery in Dhaka", not "gallbladder" or "learn more"). Nav items, breadcrumbs, and button CTAs are exempt.
6. **Dummy placeholder content shipped to production** ("Replace with video 1 title", `REPLACE_ID_1`). Any HTML that contains the string `REPLACE`, `Lorem`, `TODO`, `Placeholder`, or `Dummy` is a release blocker. Video blocks must render real YouTube IDs + real titles server-side (or via the YouTube feed function) before deploy.

---

## Hard rules — every page, every component

### 1. ID vs class hygiene
- `id` must be **unique per page** and used only when JS or an anchor link needs it.
- `id` and `class` on the **same element** must never share the same string.
- Naming: `id="hero-headline"` is fine, but then the class must be different (e.g. `class="arefin-hero__headline type-h1"`). Prefer BEM-style classes (`block__element--modifier`) and reserve `id` for anchors/JS hooks only.
- If you don't need a JS hook or `#anchor` link, **don't add an id at all**.

### 2. Title attributes (the Atto pattern)
Every link-bearing element gets a `title`:

| Element | `title` length | Content rule |
|---|---|---|
| `<a>` | 30–120 chars | Destination + keyword + location, **different wording from anchor text** |
| `<strong>` wrapping `<a>` | 60–200 chars | Expanded context + trust signal (years, stats, location) |
| `<h1>` / `<h2>` / `<h3>` | 60–180 chars | Long-tail variation of the visible heading + location |
| `<section>` / wrapper `<div>` | 60–180 chars | What the whole block is about, with keyword + location |
| `<img>` | 40–120 chars in `title`, plus `alt` | Service + location; `alt` ≠ `title` |

**Bad** → `<a href="/gallbladder/" title="Gallbladder Surgery">Gallbladder Surgery</a>`
**Good** → `<a href="/gallbladder/" title="Laparoscopic gallbladder surgery in Dhaka by Dr. Murshidul Arefin — minimally invasive, same-day discharge">Gallbladder Surgery</a>`

### 3. H1 rules
- **Exactly one H1 per page.**
- 8–14 words, contains the primary keyword + location + name where natural.
- Wraps 2–3 keyword phrases in `<strong><a title="…">…</a></strong>`.
- Carries its own `title` attribute (long-tail variant of the heading).
- ID and class must not be twins. Example shell:

```html
<h1 id="hero-headline"
    class="arefin-hero__headline type-h1"
    title="Gallbladder, liver and hepatobiliary surgery in Dhaka — Dr. Murshidul Arefin, fellowship-trained HPB specialist">
  Expert
  <strong title="Laparoscopic gallbladder surgery in Dhaka with same-day discharge and 4mm scars">
    <a href="/treatment/gallbladder-surgery/" title="Book gallbladder surgery consultation in Dhaka with Dr. Arefin">
      gallbladder surgery in Dhaka
    </a>
  </strong>
  by a fellowship-trained
  <strong title="Hepatobiliary and pancreatic surgeon serving Dhaka, Dhanmondi and Bangladesh">
    <a href="/about/" title="About Dr. Murshidul Arefin, HPB surgeon at Popular Medical College Hospital">
      hepatobiliary surgeon
    </a>
  </strong>.
</h1>
```

### 4. Inline link minimums (body copy)
- **≥ 3 words per inline link** inside paragraphs, list items, takeaways, FAQ answers.
- **No naked single-word keywords as links** ("gallbladder", "treatment", "more").
- **No generic anchors** ("click here", "read more", "learn more").
- Vary anchor wording — the same destination must never be linked twice on a page with the same anchor text.
- Anchor variety dictionary lives in `Dr-Arefin-Spec/seo-link-wrapping.md`; gallbladder gets the largest variant pool.

Exemptions (allowed ≤ 2 words):
- Primary header nav labels (`About`, `Treatments`, `Contact`)
- Footer column titles
- Button CTAs (`Book Now`, `Call Today`) — still carry a `title`
- Breadcrumb segments

### 5. Anchor ≠ title
Lint rule: if `link.textContent.trim().toLowerCase() === link.title.trim().toLowerCase()` → fail the build. The `title` must add destination context, keyword variants, or trust signals not visible in the anchor.

### 6. Gallbladder-first keyword strategy
- Gallbladder appears in the H1, in the meta title, in the first 100 words, and in ≥ 30% of inline anchor texts on the homepage and gallbladder service page.
- Secondary topics (liver, pancreas, biliary, spleen) get their own pages but link **back to gallbladder** with descriptive 3+ word anchors ("gallbladder stone treatment", "laparoscopic cholecystectomy in Dhaka", "gallbladder specialist consultation").
- Every service-card grid leads with the gallbladder card.

### 7. No placeholders in shipped HTML
Blockers — fail review on any of these strings in `public/elementor-export/**` or built React output:
- `REPLACE_`, `REPLACE WITH`, `Replace with video`
- `Lorem`, `ipsum`
- `TODO`, `FIXME`, `Placeholder`, `Dummy`, `Sample text`
- Empty `href=""`, `href="#"` (except real in-page anchors)

The video grid (`05-videos.html` and React `VideosSection`) must be hydrated from the `youtube-feed` edge function **before** the static export is generated, OR server-rendered titles must be present in the HTML. If the feed is unavailable, render the section **empty** rather than with `REPLACE_ID_*` markup.

### 8. SEO container class taxonomy (carry-over from CAF/Atto)
Use these on every content block so the scanner + Atto-pattern reviewer recognise them:

- `seo-page-parent-block` — hero / top-level page wrapper
- `seo-parent-block` — outer wrapper of any content section
- `seo-page-block` — page-level content block
- `paragraph-parent-block` — parent of paragraph clusters
- `seo-container-para` — keyword-rich body paragraph container
- `inner-seo-header` — H2/H3 inside content blocks (not hero)
- `atto-key-takeaways-list` + `atto-kt-item` + `atto-kt-text` — key-takeaways ordered list pattern

### 9. Image rules
- `alt` describes the image content (with keyword if natural). **Never** `alt="image"`, `alt="photo"`, or starting with "Image of…".
- `title` is the SEO-expanded variant (service + location).
- Above-fold first image: `loading="eager" fetchpriority="high"`. All others: `loading="lazy" decoding="async"`.
- Width/height attributes set to prevent CLS.

### 10. JSON-LD per page type
- Home → `MedicalBusiness` + `Person` (Dr. Arefin)
- Gallbladder / Liver / Pancreas / Biliary → `MedicalProcedure`
- About → `Physician`
- Contact → `LocalBusiness` with `address`, `telephone`, `geo`, `openingHours`
- Articles → `MedicalScholarlyArticle`
- FAQ block → `FAQPage`

### 11. Trailing slashes
All internal hrefs end with `/` (`/treatment/gallbladder-surgery/`, never `/treatment/gallbladder-surgery`). Mismatch causes a 301 hop and dilutes link equity.

---

## Per-section authoring checklist

Run this against every new or edited section (React component AND its WP export twin):

- [ ] No element has identical `id` and `class` strings
- [ ] No `id` unless a JS hook or in-page anchor genuinely needs it
- [ ] Single `<h1>`, 8–14 words, gallbladder/HPB keyword present
- [ ] Every `<a>` has a unique, descriptive `title` (30+ chars), different from visible text
- [ ] Every `<strong>` wrapping a link has its own `title` (60+ chars)
- [ ] Every inline body-copy link is **≥ 3 words**, varied anchor wording
- [ ] Gallbladder is the lead keyword in ≥ 30% of anchors on home + gallbladder page
- [ ] Section wrapper has a class from the SEO taxonomy + a `title` attribute
- [ ] No placeholder strings (`REPLACE`, `Lorem`, `TODO`, `Dummy`, `Sample`)
- [ ] All images have meaningful `alt` AND a different `title`
- [ ] All internal hrefs end with `/`
- [ ] JSON-LD block present and validates in Rich Results Test
- [ ] Build lints pass (see linter rules below)

---

## Authoring patterns (copy these)

### Pattern A — Body paragraph with 3+ word inline links
```html
<div class="paragraph-parent-block seo-parent-block seo-page-block">
  <p class="seo-container-para"
     title="Why gallbladder patients in Dhaka choose Dr. Arefin for laparoscopic cholecystectomy">
    Patients across Dhaka choose Dr. Arefin for
    <strong title="Minimally invasive laparoscopic gallbladder surgery in Dhaka with 4mm scars and same-day discharge">
      <a href="/treatment/gallbladder-surgery/"
         title="Laparoscopic gallbladder surgery in Dhaka by an HPB-fellowship surgeon">
        laparoscopic gallbladder surgery in Dhaka
      </a>
    </strong>
    because of his fellowship training in
    <strong title="Hepatobiliary and pancreatic surgery training completed at internationally accredited HPB centres">
      <a href="/about/"
         title="Dr. Arefin's HPB fellowship training and surgical credentials">
        hepatobiliary and pancreatic surgery
      </a>
    </strong>
    and his record with
    <a href="/treatment/gallstones/"
       title="Symptomatic gallstone treatment and complex gallbladder stone removal in Dhaka">
      complex gallbladder stone removal cases
    </a>.
  </p>
</div>
```

### Pattern B — Video card (real data, no placeholders)
```html
<article class="arefin-vid-c__card" data-vid-card data-video-id="{{ youtube_id }}">
  <div class="arefin-vid-c__frame" data-vid-frame>
    <img class="arefin-vid-c__thumb"
         src="https://i.ytimg.com/vi/{{ youtube_id }}/hqdefault.jpg"
         alt="{{ video_title }} — Dr. Arefin explains gallbladder care"
         title="{{ video_title }} | Dr. Murshidul Arefin, HPB surgeon Dhaka"
         loading="lazy" decoding="async" width="480" height="360" />
    <button type="button" class="arefin-vid-c__overlay"
            aria-label="Play video: {{ video_title }}">…</button>
  </div>
  <a class="arefin-vid-c__title-link"
     href="https://www.youtube.com/watch?v={{ youtube_id }}"
     rel="noopener" target="_blank"
     title="Watch {{ video_title }} on YouTube — Dr. Arefin, gallbladder & HPB surgeon Dhaka">
    <h3 class="arefin-vid-c__title">{{ video_title }}</h3>
  </a>
</article>
```
If `youtube_id` or `video_title` is empty at build time → **do not render the card**.

### Pattern C — Key takeaways ordered list
```html
<section class="seo-container-para"
         title="Key reasons Dhaka patients choose Dr. Arefin for gallbladder and HPB surgery">
  <ol class="atto-key-takeaways-list">
    <li class="atto-kt-item">
      <h3 class="inner-seo-header atto-kt-text"
          title="How fellowship HPB training improves gallbladder surgery outcomes in Dhaka">
        <strong title="Fellowship-trained gallbladder and HPB surgeon serving Dhaka and Dhanmondi">
          <a href="/about/"
             title="Dr. Murshidul Arefin's HPB fellowship and gallbladder surgery experience">
            Fellowship-trained gallbladder specialist
          </a>
        </strong>
        with documented experience in
        <a href="/treatment/laparoscopic-cholecystectomy/"
           title="Laparoscopic cholecystectomy outcomes and recovery timeline in Dhaka">
          laparoscopic cholecystectomy outcomes
        </a>.
      </h3>
    </li>
    <!-- 4–6 items -->
  </ol>
</section>
```

---

## Build-time linter (to be added)

A node script under `scripts/seo-html-lint.mjs` will fail CI on:

1. Any element where `id === class` (case-insensitive, trimmed).
2. Any `<a href>` (not `mailto:`, not `tel:`, not external nav button) without a `title` attribute OR with `title.length < 20`.
3. Any `<a>` where `textContent.trim().toLowerCase() === title.trim().toLowerCase()`.
4. Any inline body-copy `<a>` (inside `<p>`, `<li>` excluding nav/footer/breadcrumb containers) with fewer than 3 visible words.
5. Any occurrence of `REPLACE_`, `Replace with video`, `Lorem`, `TODO`, `FIXME`, `Placeholder`, `Dummy`, `Sample text`.
6. Any internal href missing a trailing slash.
7. More than one `<h1>` per page, or zero `<h1>`.
8. Any `<img>` without `alt`, or with `alt === title`.

Runs against both `dist/` (built React) and `public/elementor-export/**`.

---

## Memory hooks (project memory rules to add)

These will be stored in `mem://` so every future edit obeys them automatically:

- **seo/id-vs-class** — `id` and `class` on the same element must never be identical strings. `id` only when a JS/anchor hook needs it.
- **seo/title-attribute-contract** — every `<a>`, link-wrapping `<strong>`, heading, section wrapper and `<img>` carries a unique descriptive `title` (30–200 chars). `title` ≠ visible text.
- **seo/inline-link-min-3-words** — inline body links are minimum 3 words; nav/footer/breadcrumb/button CTAs exempt.
- **seo/gallbladder-first** — gallbladder is the lead keyword cluster across home, services, and anchors (≥ 30% of inline anchors on home + gallbladder page).
- **seo/no-placeholder-html** — `REPLACE`, `Lorem`, `TODO`, `Dummy`, `Sample text` are release blockers. Video grid renders empty rather than placeholder.
- **seo/h1-long-tail** — single H1, 8–14 words, primary keyword + location + name where natural; carries its own `title`.

---

## What changes next (implementation pass — to be approved before doing)

1. Add the 6 memory rules above to `mem://index.md` Core.
2. Refactor `Hero` (React + `01-hero.html`) — rename duplicate `id`/`class`, lengthen H1, add real `title=""` attributes, ensure gallbladder is the lead keyword.
3. Refactor video section — wire real YouTube titles into both React `VideosSection` and `05-videos.html`; remove every `REPLACE_ID_*` and "Replace with video N title".
4. Sweep all sections for inline links < 3 words, swap to varied 3+ word anchors with `title` attributes.
5. Add `scripts/seo-html-lint.mjs` and wire into the build.
6. Re-run the SEO scanner and clear remaining findings.
