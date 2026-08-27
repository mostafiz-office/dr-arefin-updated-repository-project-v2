---
name: No AI images of real people or places
description: Dr. Arefin project — never use imagegen for the doctor, patients, staff, real clinic, logos, or credentials. Always request real uploads from the user.
type: constraint
---
**Scope**: Dr. Arefin project (`/dr-arefin` and all related routes/assets).

**Forbidden uses of `imagegen`:**
- Dr. Murshidul Arefin's portrait (hero, about, team, video thumbnails, testimonials)
- Real patients, real staff, real colleagues
- The real clinic/hospital interior or exterior (Popular Medical College Hospital, BSMMU)
- Real medical equipment owned by the practice
- Logos, certificates, awards, credentials

**Required workflow when a real-person/real-place image is needed:**
1. STOP — do not call `imagegen`.
2. Ask the user to upload the real image (from drarefin.com or their files).
3. Wait. Then `code--copy` into `src/assets/` with a `-real` suffix.
4. Import and use it.

**AI-generated imagery only acceptable for:** abstract backgrounds, textures, gradients, generic anatomy illustrations clearly labelled as such, decorative geometric patterns.

**File naming:** real uploads = `*-real.{ext}`; AI/decorative = no suffix or `-illustration`.

**Why:** Misleading AI portraits of a real medical professional damage patient trust and credibility. This is non-negotiable.

**How to apply:** Before any image generation on the Dr. Arefin project, check the subject. If it could be a real person/place/credential, ask first.
