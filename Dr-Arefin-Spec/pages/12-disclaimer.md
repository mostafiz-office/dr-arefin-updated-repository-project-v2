# Page 12 — Disclaimer

- **URL**: `/disclaimer/`
- **Source**: https://drarefin.com/disclaimer/
- **Page type**: legal

## SEO
- **Meta title**: Disclaimer — Dr. Murshidul Arefin
- **Meta description**: Website disclaimer covering accuracy, intellectual property, and liability for the Dr. Murshidul Arefin website.
- **Canonical**: https://drarefin.com/disclaimer/
- **JSON-LD**: `WebPage`
- **Robots**: `noindex, follow`

## Section inventory

| # | Section | CAF component to reuse |
|---|---------|------------------------|
| 1 | Page hero | `PageHero` (compact) |
| 2 | Disclaimer body | Long-form prose container |

---

## Section 1 — Page Hero
- **H1**: Disclaimer
- **Subtitle**:
  > Terms governing your use of this website and the information published on it.

## Section 2 — Disclaimer Body (verbatim from source)

Dr. Arefin Murshidul is committed to keeping this website up to date and accurate. Should you nevertheless encounter anything that is incorrect or out of date, we would appreciate it if you could let us know. Please indicate where on the website you read the information. We will then look at this as soon as possible. Please send your response by email to: **info@ex.comdrarefin.com**.

Dr. Arefin Murshidul shall make every reasonable effort to protect its systems against any form of unlawful use. Dr. Arefin Murshidul shall implement appropriate technical and organizational measures to this end, taking into account, among other things, the state of the art. However, it shall not be liable for any loss whatsoever, direct and/or indirect, suffered by a user of the website, which arises as a result of the unlawful use of its systems by a third party.

All intellectual property rights to content on this website are vested in Dr. Arefin Murshidul.

Copying, disseminating and any other use of these materials is not permitted without the written permission of Dr. Arefin Murshidul, except and only insofar as otherwise stipulated in regulations of mandatory law (such as the right to quote), unless specific content dictates otherwise.

If you have any questions or problems with the accessibility of the website, please do not hesitate to contact us.

## Notes
- ⚠️ The email "info@ex.comdrarefin.com" appears in source as a single broken token (likely meant to be `info@drarefin.com` with a stray `ex.com`). Render verbatim **but flag as TODO** for the client to confirm the correct email before launch.
- Same broken-email pattern appears in `09-imprint.md`.