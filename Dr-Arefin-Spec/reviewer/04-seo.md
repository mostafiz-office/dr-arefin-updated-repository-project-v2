# 04 — SEO Guidelines

> Reviewer angle: would Googlebot, a screen reader, and a Yoast plugin all be happy on this page? If any fails, flag it.

---

## 1. Meta & head

- `<title>`: < 60 chars, primary keyword in first 50 chars, brand at end.
- `<meta name="description">`: < 160 chars, includes primary + secondary keyword + CTA verb.
- `<link rel="canonical">`: absolute URL of THIS page.
- `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Open Graph: `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:type`.
- Twitter: `twitter:card="summary_large_image"`.
- Language: `<html lang="en">` (Bangladesh English) unless page is localized.

---

## 2. Headings

- Exactly **one `<h1>`** per page, containing the primary keyword.
- Logical h2 → h3 nesting, no skipped levels.
- Headings describe content, not just decorate. No empty heading-styled `<div>`.

---

## 3. URLs & routing

- Lowercase, hyphenated, descriptive: `/treatment/liver-surgery-dhaka/`.
- Trailing slash always.
- No query params in canonical URLs for content pages.
- Satellite SEO pages live under their topic root (e.g., `/treatment/`, `/conditions/`).

---

## 4. Alt text

- Every `<img>` has `alt`.
- Decorative imagery: `alt=""` (empty, but present).
- Informative imagery: describe content + include keyword naturally if relevant.
- Avoid stuffing ("liver surgery liver surgeon liver Dhaka").
- Do not start with "Image of…".
- Length: 6–125 chars typical.

---

## 5. Internal linking — Atto-style (CRITICAL)

This is the project's defining SEO pattern. **Inline within prose only.**

### 5.1 The 7 rules
| # | Rule |
|---|------|
| 1 | **Density** ~1 link per sentence on long pages; 40–60 internal links on pillar pages |
| 2 | **Anchor variety** — same destination, different anchor text every time |
| 3 | **Mandatory `title=""`** on every internal link, 50–200 chars, unique per page |
| 4 | **`<strong>` wrap** on 3–6 emphasized links per page |
| 5 | **Slug-as-topic-web** — descriptive slug variants per intent |
| 6 | **Subtle styling** — body color at rest, color/shadow change on hover (no underline at rest) |
| 7 | **Paragraph `title=""`** on key `<p>` tags for context |

### 5.2 Forbidden
- ❌ Standalone "Related Topics" cards grids on pages (use the `RelatedTopicsSection` component).
- ❌ Repeating the same anchor text on the same page.
- ❌ Generic "click here" / "read more" anchor text.
- ❌ Linking the same destination twice in the same paragraph.
- ❌ Bolding random non-link words to fake emphasis (use `<strong>` for semantic emphasis).

### 5.3 Component
Use `<SeoLink to="..." title="..." bold>anchor</SeoLink>` from `src/components/arefin/SeoLink.tsx`.

### 5.4 Anchor variety dictionary
Reference `Dr-Arefin-Spec/seo-link-wrapping.md` for the full anchor-text dictionary per destination.

---

## 6. Structured data (JSON-LD)

Per page type:
- **Home**: `MedicalBusiness` + `Person` (Dr. Arefin)
- **Treatment / service**: `MedicalProcedure` or `MedicalTherapy`
- **About**: `Person` + `Physician`
- **Articles**: `Article` or `MedicalScholarlyArticle`
- **Contact**: `LocalBusiness` with `address`, `telephone`, `geo`, `openingHours`

Validate via Google Rich Results Test.

---

## 7. Keyword strategy

### 7.1 Primary cluster (English, Dhaka-focused)
- hepatobiliary surgery / surgeon Dhaka
- liver surgery / liver surgeon Dhaka
- gallbladder surgery / laparoscopic cholecystectomy
- pancreatic surgery / Whipple procedure
- biliary tract / bile duct surgery
- spleen surgery
- liver transplant coordination
- fatty liver management
- gallstones treatment

### 7.2 Local modifiers
- Dhaka, Dhanmondi, Bangladesh
- Popular Medical College Hospital

### 7.3 Rules
- One primary keyword per page (in title, h1, first 100 words, URL, og:title).
- 2–3 secondary keywords supporting the primary.
- LSI/related terms naturally in body — never stuffed.
- Yoast-friendly: focus keyword density 0.5–2.5%.

---

## 8. Content readability (Yoast)

- Sentence length: most < 20 words.
- Paragraphs: < 150 words each.
- Transition words in ≥ 30% of sentences.
- Passive voice ≤ 10% of sentences.
- Subheadings every 300 words on long pages.

---

## 9. Technical SEO

- `robots.txt` allows major bots.
- `sitemap.xml` lists all canonical URLs.
- 404 returns proper status, not 200.
- No mixed content (all HTTPS).
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms.

---

## 10. Constraints carried from project memory

- No AI-generated images of real people (Dr. Arefin, patients, staff, clinic).
- Internal linking is INLINE only — never via "related topics" sections.
