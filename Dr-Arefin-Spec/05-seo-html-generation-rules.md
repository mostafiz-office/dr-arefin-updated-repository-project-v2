# SEO HTML Generation Rules — Dr. Arefin

> **Inherited verbatim from CAF.** See `spec/01-app/seo-html-generation-rules.md` and `mem://seo/html-coding-standards` in the parent project. This file restates the rules for self-containment.
>
> **See also:** `Dr-Arefin-Spec/08-seo-html-writing-spec.md` for the full authoring spec, examples, and lint rules built from Dr. Arefin's feedback.

## Critical rules (Dr. Arefin feedback — release blockers)

These 6 rules came directly from Dr. Arefin's SEO review of the generated WP/Elementor HTML. Any violation is a release blocker.

1. **`id` ≠ `class`** — never use the same string for both on one element. `<h1 id="arefin-hero-h1" class="arefin-hero-h1">` is wrong. `id` is a unique JS/anchor hook; `class` is for styling. Drop the `id` unless something actually needs it (anchor target, JS query, ARIA reference).
2. **`title=""` on every link / heading / section / img** — descriptive, keyword-rich, **30–200 chars**, and **must differ from the visible text**. Anchor text and `title` attribute cannot be identical (that's just noise to Google).
3. **Hero H1 must be 8–14 words, long-tail** — two-word H1s can't rank. The H1 must contain the **primary keyword + location + name** and itself wrap 2–3 keyword links via `<strong><a title="…">…</a></strong>`. Example pattern: `Expert <strong><a title="…">Gallbladder Surgery & Laparoscopic Cholecystectomy</a></strong> in Dhaka by Dr. Murshidul Arefin`.
4. **Inline body links must be ≥ 3 words** — no single-word links like `gallbladder`, `services`, `here` inside paragraphs. Use varied 3+ word anchors (`gallbladder stone removal surgery`, `laparoscopic gallbladder operation in Dhaka`). Nav, footer, and standalone button CTAs are exempt.
5. **Gallbladder is the lead keyword** — *gallbladder surgery*, *laparoscopic cholecystectomy*, *gallbladder stones* must lead the H1, meta description, first 100 words of body copy, and account for **≥ 30% of inline anchors** on the home page and any gallbladder page. Liver, pancreas, and biliary are secondary keywords.
6. **No placeholder HTML in production** — `REPLACE_ID_1`, `"Replace with video 1 title"`, `Lorem`, `TODO`, `Dummy`, `xxx` are release blockers. The video grid must render real YouTube IDs + real titles fetched from the channel, or render the empty state — **never placeholders**. Same rule for image `src`, `alt`, headings, and copy.

## Hard rules (must follow on every page)

1. **Single H1 per page** — the page's main topic.
2. **Semantic HTML5** — `<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<aside>`.
3. **No empty headings**, no skipped heading levels.
4. **All images** have `alt` (descriptive, not "image of...").
5. **Below-fold images** use `loading="lazy"`.
6. **External links** use `rel="noopener noreferrer"` when `target="_blank"`.
7. **Forms** have associated `<label>` for every input.
8. **Buttons vs links**: buttons trigger actions, links navigate.
9. **Strong-anchor pattern** for keyword density: `<strong><a href="...">keyword phrase</a></strong>` inside body paragraphs (use sparingly, max ~3 per paragraph).
10. **Inline SVG** for critical UI icons (header, footer, hero) — never icon-font dependencies above the fold.
11. **Title attribute on links** only when adding info beyond visible text.
12. **No bold on link text by default** — only when the strong-anchor SEO pattern requires it.
13. **Trailing slashes** on all internal hrefs: `/about/`, not `/about`.

## Per-page checklist
- [ ] `<title>` set, ≤60 chars, includes primary keyword
- [ ] `<meta name="description">` set, ≤160 chars
- [ ] `<link rel="canonical">` set to absolute URL
- [ ] OG tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- [ ] Twitter card tags
- [ ] One JSON-LD `<script type="application/ld+json">` block
- [ ] Single `<h1>`
- [ ] Internal link to ≥3 other site pages
- [ ] Phone/email use `tel:` / `mailto:` schemes
- [ ] Address uses `<address>` element with schema microdata or JSON-LD

## Images
- Photos: `.jpg` or `.webp`
- Logos / icons: `.svg` or `.png` (with transparency if needed)
- Hero images: max 1920px wide, compressed (TinyPNG / Squoosh)
- Provide `srcset` for responsive sizes when ≥800px wide

---

## Patterns learned from Atto reference HTML (attobondcleaning.store / attoproperty.com.au)

These are the patterns observed in the Atto pages Dr. Arefin pointed us at. They are now **mandatory** for every Dr. Arefin block (React component + WP/Elementor export).

### A. Two-layer class taxonomy (semantic SEO classes)

Every content block carries **two** kinds of classes:
1. **Style classes** — `arefin-hero`, `arefin-card`, etc. (used by CSS).
2. **Semantic SEO classes** — stable, descriptive, never restyled. The crawler-and-linter contract.

Mandatory semantic class vocabulary (mirrors Atto's `seo-*` / `atto-*`):

| Class | Where it goes |
|-------|---------------|
| `seo-page-parent-block` | Top-level page wrapper / hero `<section>` |
| `seo-parent-block` | Outer wrapper of any content section |
| `seo-parent-block-1` / `-2A` / `-2B` / `-2C` | Layout variants (1-col, 2-col image-left, etc.) |
| `seo-page-block` | Page-level content block |
| `seo-container-para` | Paragraph container for keyword-rich body text |
| `paragraph-parent-block` | Parent of paragraph content |
| `seo-area-card` | Per-area / per-location card (LocalBusiness candidate) |
| `inner-seo-header` | H2/H3 inside content blocks (not page hero) |
| `arefin-kt-list` / `arefin-kt-item` / `arefin-kt-icon` / `arefin-kt-text` | Key Takeaways block (see D) |

These classes are **additive** — they sit alongside existing `arefin-*` style classes and are never restyled. They exist purely so a linter / crawler can find every SEO block.

### B. `alt` vs `title` — different content, never duplicated

- **`alt`** = short, factual, accessibility-first. Describes what's literally in the image. 30–125 chars.
- **`title`** = marketing/SEO. Long-tail keyword + benefit + location. 30–200 chars.
- They **must not be identical**. Same rule applies to anchor text vs `title`.

Example:
```html
<img
  src="…/arefin-portrait-light.webp"
  alt="Dr. Murshidul Arefin in green surgical scrubs"
  title="Dr. Murshidul Arefin — FCPS hepatobiliary surgeon performing gallbladder & liver surgery in Dhaka"
/>
```

### C. Internal linking strategy (satellite-page model)

- Every keyword in body copy links to a **dedicated landing slug**, not the generic service page. Build a satellite-page database (`pages/13-satellite-pages-database.md`).
- Every `<a>` carries `title="…"` (50–120 chars) with **keyword + benefit + location**.
- Anchor text is **always ≥ 3 words** in body copy.
- Wrap only **top-tier money links** in `<strong>` (e.g. *gallbladder surgery in Dhaka*) — not every link. Overusing `<strong>` dilutes signal.
- Inline `<strong>` inside body text inherits color/weight from paragraph (per `mem://style/strong-tag-body-text-rule`).

### D. External authority links (Wikipedia pattern)

External outbound links are **Wikipedia only** (and a small whitelist of named institutions), used to ground anatomy / procedure / location mentions:

```html
<a
  href="https://en.wikipedia.org/wiki/Cholecystectomy"
  target="_blank"
  rel="nofollow noopener"
  title="Moreover, cholecystectomy is the standard surgical removal of the gallbladder — see Wikipedia."
>cholecystectomy</a>
```

Rules:
- `rel="nofollow noopener"` always.
- `title` **must start with a transition word** ("Moreover", "Furthermore", "Notably", "In addition") — boosts Yoast transition-word score.
- Map every Dr. Arefin anatomy/procedure/institution mention to a canonical Wikipedia URL. Maintain that map in `Dr-Arefin-Spec/seo-link-wrapping.md`.

### E. JSON-LD multi-block strategy

Atto ships **multiple JSON-LD blocks** per page, not one mega-block:

1. **`<head>` Yoast-style `@graph`** — `WebSite`, `WebPage`, `Organization`/`Person`, `BreadcrumbList`, primary `LocalBusiness`. All linked by `@id` references.
2. **`<body>` per-area `LocalBusiness`** — one per service-area card, with `areaServed.sameAs` pointing to Wikipedia for that location.
3. **`FAQPage`** — answers can (and should) contain `<a href title>` HTML inside the answer string. Google indexes those links.
4. **`VideoObject`** — one per YouTube embed, with real `contentUrl`, `thumbnailUrl`, `uploadDate`, `name`, `description`.

Every block links via `@id` so the graph stays connected.

### F. H1 canonical pattern

```html
<h1 title="Expert gallbladder surgery and laparoscopic cholecystectomy in Dhaka by Dr. Murshidul Arefin">
  Expert
  <strong><a href="/treatment/gallbladder-surgery/" title="Gallbladder surgery in Dhaka — laparoscopic cholecystectomy by Dr. Arefin">Gallbladder Surgery &amp; Laparoscopic Cholecystectomy</a></strong>
  in Dhaka by
  <a href="/about/" title="About Dr. Murshidul Arefin, FCPS hepatobiliary surgeon">Dr. Murshidul Arefin</a>
</h1>
```

- 8–14 words, includes primary keyword + location + name.
- Wraps the canonical money-keyword link.
- `title` differs from visible text.
- `id` (if any) ≠ class.

### G. Key Takeaways block (featured-snippet target)

Every service / treatment page ends with a Key Takeaways `<ol>` — this is the block Google lifts for featured snippets:

```html
<section class="seo-container-para arefin-kt-section" title="Key takeaways about gallbladder surgery in Dhaka">
  <h2 class="inner-seo-header" title="Quick summary — gallbladder surgery, recovery, and cost in Dhaka">Key Takeaways</h2>
  <ol class="arefin-kt-list">
    <li class="arefin-kt-item">
      <span class="arefin-kt-icon" aria-hidden="true"><!-- inline SVG --></span>
      <h3 class="inner-seo-header arefin-kt-text" title="How long does recovery from laparoscopic gallbladder surgery take?">
        <strong><a href="/treatment/gallbladder-surgery/recovery/" title="Gallbladder surgery recovery timeline in Dhaka">Recovery is typically 7–10 days</a></strong>
        after laparoscopic cholecystectomy, with most patients returning to office work within two weeks.
      </h3>
    </li>
    <!-- 4–6 items total -->
  </ol>
</section>
```

- `<ol>` (not `<ul>`) — ordered = priority signal.
- Each item is a **question-as-H3** with a one-sentence answer.
- First clause wraps the canonical money link.

### H. Contact / CTA buttons

- Visible label stays UX-clean (`Book an Appointment`, `Call Now`).
- SEO weight lives in `title` (`Book an appointment with Dr. Murshidul Arefin — FCPS hepatobiliary surgeon in Dhaka`).
- External (WhatsApp, Maps): `target="_blank" rel="noopener noreferrer"`.
- `tel:` and `mailto:` schemes, never plain text phone numbers.

### I. Linter enforcement (`scripts/seo-html-lint.mjs`)

A node script must run in CI against every `public/elementor-export/blocks/**/*.html` and fail the build on:

- `id` and `class` sharing the same value on one element.
- Any `<a>`, `<h1>`–`<h3>`, `<section>`, `<img>` missing `title`.
- `title` identical to visible text or to `alt`.
- Inline `<a>` (inside `<p>` / `<h*>`) with anchor text < 3 words, unless on the nav/footer/CTA whitelist.
- H1 outside 8–14 words.
- Any of: `REPLACE_`, `Lorem`, `TODO`, `Dummy`, `xxx`, `Replace with`.
- External `<a target="_blank">` missing `rel="noopener"` (or `rel="nofollow noopener"` for Wikipedia).
- `seo-page-parent-block` missing on top-level page wrapper.
- Page missing Key Takeaways `<ol class="arefin-kt-list">` (warn, not fail, on non-treatment pages).
