# Atto-Style SEO Link Wrapping — Implementation Spec

> **Reference**: `https://attoproperty.com.au/carpet-cleaning-in-melton/`
> **Memory rule**: `mem://seo/atto-link-wrapping-pattern`
> **Component**: `src/components/arefin/SeoLink.tsx`

---

## 1. The 7 Rules (decoded from Atto)

| # | Rule | How it shows up in markup |
|---|------|---------------------------|
| 1 | **Density** ~1 link / sentence; 40–60 per long page | Many `<a>` per `<p>` |
| 2 | **Anchor variety** — keywords, phrases, full questions | Same URL, different anchor text every time |
| 3 | **Mandatory `title=""` attr** on every internal link | `<a title="50–200 char description" …>` |
| 4 | **`<strong>` wrap** on emphasized links (3–6/page) | `<strong><a …>keyword</a></strong>` |
| 5 | **Slug-as-topic-web** — descriptive slug variants | `/treatment/liver-surgery-dhaka/` etc. |
| 6 | **Subtle styling** — body color, underline on hover | `.seo-link { color: inherit; text-decoration: none; } .seo-link:hover { text-decoration: underline; }` |
| 7 | **Paragraph `title`** on key `<p>` tags | `<p title="…">…</p>` |

---

## 2. Anchor-Text Dictionary (Dr. Arefin)

This is the seed dictionary. Each row = a different anchor text variant pointing to the same destination. Reuse never; vary always.

### `/treatment/` — Treatment hub
- "hepatobiliary surgery"
- "liver, gallbladder, pancreatic & biliary care"
- "minimally invasive hepatobiliary techniques"
- "complete treatment options"
- "the full range of HPB procedures"
- "Dr. Arefin's surgical expertise"

### `/treatment/liver-surgery/` — Liver subsection
- "liver surgery"
- "liver resection and transplant care"
- "advanced liver cancer surgery"
- "HCC and metastatic liver tumors"

### `/treatment/gallbladder/` — Gallbladder subsection
- "gallbladder treatment"
- "laparoscopic cholecystectomy"
- "gallstone surgery in Dhaka"
- "minimally invasive gallbladder removal"

### `/treatment/pancreatic-surgery/` — Pancreatic subsection
- "pancreatic surgery"
- "Whipple procedure expertise"
- "complex pancreatic mass surgery"

### `/treatment/biliary/` — Biliary subsection
- "biliary tract surgery"
- "bile duct reconstruction"
- "ERCP and biliary stenting"

### `/about/` — About hub
- "Dr. Arefin"
- "best hepatobiliary surgeons in Dhaka"
- "Dr. M. Arefin's clinical background"
- "his fellowship training in HPB and liver transplantation"

### `/contact/` — Contact hub
- "book a consultation"
- "reach Dr. Arefin's chamber"
- "speak with the team"
- "schedule an appointment in Dhaka"

### `/articles/` — Articles
- "patient education library"
- "in-depth articles on liver health"
- "read more on hepatobiliary topics"

---

## 3. Title-Attribute Templates

Pattern: `{action verb} {primary keyword} — {qualifier} {location/credibility}`

Examples:
- `title="Discover hepatobiliary surgery options at Dr. Arefin's Dhaka practice — liver, gallbladder, pancreatic and biliary procedures"`
- `title="Schedule a consultation with Dr. Arefin — fellowship-trained HPB and liver transplant surgeon serving patients across Bangladesh"`
- `title="Learn how minimally invasive gallbladder removal in Dhaka shortens recovery time and reduces post-op pain"`

**Length**: 50–200 chars. Always unique per page.

---

## 4. `<SeoLink>` Component API

```tsx
import { SeoLink } from "@/components/arefin/SeoLink";

<SeoLink
  to="/treatment/liver-surgery/"
  title="Detailed overview of liver resection and transplant care offered by Dr. Arefin in Dhaka"
  bold
>
  liver surgery
</SeoLink>
```

| Prop | Required | Notes |
|------|----------|-------|
| `to` | ✅ | Internal route (relative, with trailing slash per project memory) |
| `title` | ✅ | 50–200 char SEO/a11y description |
| `bold` | optional | Wraps in `<strong>` for emphasis |
| `children` | ✅ | The visible anchor text |

---

## 5. Rollout Plan

| Phase | Pages | Status |
|-------|-------|--------|
| Phase 1 | `/video/:slugId` (proof of pattern) | ✅ This loop |
| Phase 2 | `/` and `/home-dark` hero lede paragraphs | Awaits copy approval |
| Phase 3 | `/about`, `/treatment`, `/mentorship` | Awaits copy approval |
| Phase 4 | `/articles`, `/contact`, blog posts | Awaits copy approval |

---

## 6. Verification Checklist

- [ ] Every `<SeoLink>` has a unique `title` attr on the page
- [ ] No anchor text duplicated on the same page
- [ ] Default styling matches body color, no underline until hover
- [ ] At least one `bold` link per major content section
- [ ] Long pages contain ≥ 40 internal links
