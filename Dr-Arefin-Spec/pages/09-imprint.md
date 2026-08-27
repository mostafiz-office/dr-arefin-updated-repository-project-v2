# Page 09 — Imprint

- **URL**: `/imprint/`
- **Source**: https://drarefin.com/imprint/
- **Page type**: legal

## SEO
- **Meta title**: Imprint — Dr. Murshidul Arefin
- **Meta description**: Legal imprint and ownership information for the Dr. Murshidul Arefin website.
- **Canonical**: https://drarefin.com/imprint/
- **JSON-LD**: `WebPage`
- **Robots**: `noindex, follow` (legal page)

## Section inventory

| # | Section | CAF component to reuse |
|---|---------|------------------------|
| 1 | Page hero | `PageHero` (compact) |
| 2 | Imprint body | Long-form prose container (max-w `prose`) |

---

## Section 1 — Page Hero
- **H1**: Imprint
- **Subtitle**:
  > Legal information and ownership details for this website.

## Section 2 — Imprint Body (verbatim from source)

_This imprint was last updated on October 22, 2025._

The owner of this website is:

**Dr. Arefin Murshidul** (Dr. Arefin)

N Gould St, Wyoming 82801
Bangladesh

- Email: me@ex.comdrarefin.com
- Phone number: +880 1723-134282

### 1. General

**1.1** We are registered at Dr. Arefin under the license or registration number:

We are willing or obliged to participate in dispute resolution procedures before a consumer arbitration board.

**1.2** Die Eigentumsanteile der Gesellschaft (Aktienkapital), die von ihr ausgegeben wurden:

1000

**1.3** Unsere Berufshaftpflichtversicherung lautet:

None

## Notes
- ⚠️ **Source data is clearly malformed**: address ("N Gould St, Wyoming 82801") is a Wyoming, USA address paired with country "Bangladesh"; email "me@ex.comdrarefin.com" is broken; clauses 1.2 and 1.3 are in German on an English-language site.
- **Action for any AI**: render the spec **verbatim** but flag a `TODO: imprint requires legal review` banner inside the page during dev. Do **not** silently "correct" the address — the client must supply the real values.
- License/registration number on 1.1 is missing entirely.