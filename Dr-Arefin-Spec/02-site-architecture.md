# Site Architecture — Dr. Arefin

## URL Tree (from official sitemap, scraped 2026-04-20)

### Top-level navigation (8 menu pages)
| # | Label | Path | Spec file |
|---|-------|------|-----------|
| 1 | Home | `/` | `pages/01-home.md` |
| 2 | About | `/about/` | `pages/02-about.md` |
| 3 | Treatment | `/treatment/` | `pages/03-treatment.md` |
| 4 | Mentorship | `/mentorship/` | `pages/04-mentorship.md` |
| 5 | Articles | `/technical-article/` | `pages/05-articles.md` |
| 6 | Gallery | `/gallery/` | `pages/06-gallery.md` |
| 7 | Contact | `/contact/` | `pages/07-contact.md` |
| 8 | Donate | `/donate/` | `pages/08-donate.md` |

### Header CTA pill (always visible, top-right)
- **Call** (left half, white bg) → `tel:+8801311487592`
- **Book** (right half, green bg) → `/contact/` (anchors appointment form)

### Footer / legal (4 pages)
| Label | Path | Spec file |
|-------|------|-----------|
| Imprint | `/imprint/` | `pages/09-imprint.md` |
| Privacy Statement (EU) | `/privacy-statement-eu/` | `pages/10-privacy.md` |
| Cookie Policy (EU) | `/cookie-policy-eu/` | `pages/11-cookie.md` |
| Disclaimer | `/disclaimer/` | `pages/12-disclaimer.md` |

### Blog posts (62 — listed only)
See `06-keyword-strategy.md` § "Article URL inventory" for the full list. These render dynamically; spec only the index page (`/technical-article/`) layout.

## Routing Rules (inherited from CAF)
- All internal links use **relative paths with trailing slashes** (e.g., `/about/`, `/treatment/`)
- Exception: `tel:` and `mailto:` use absolute schemes
- Exception: external social links use absolute `https://`

## Header Behavior
- Sticky on scroll (shrinks logo)
- Transparent over hero, solid `--background-dark` after scroll past hero
- Mobile hamburger at `lg` breakpoint (1024px) — same as CAF

## Footer Structure
1. Logo + tagline ("Hepatobiliary Panacea")
2. Quick links column (8 menu items)
3. Contact column (phone, email, address)
4. Social icons row (Facebook, Instagram, LinkedIn, YouTube, Twitter/X)
5. Bottom bar: copyright + 4 legal links