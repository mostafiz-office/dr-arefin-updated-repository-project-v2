# Issue 01 — Never use AI-generated images for real people/places

- **Status**: Resolved (rule established)
- **Severity**: Critical
- **Date opened**: 2026-04-20
- **Date resolved**: 2026-04-20

## Symptom
The Dr. Arefin homepage hero and About section initially shipped with AI-generated portraits that did not match the real Dr. Murshidul Arefin. This is unacceptable for a real medical professional's website — it is misleading to patients and damages credibility.

## Root cause
During initial build, when no real photo was available, the assistant fell back to `imagegen` to produce placeholder portraits. These generic "doctor-like" AI faces were then left in production code instead of being flagged for replacement.

## Fix
1. Hero portrait replaced with the real photo uploaded by the user (`src/assets/arefin-hero-portrait-real.png`).
2. About-section portrait replaced with the real photo (`src/assets/arefin-about-portrait-real.jpeg`).
3. All `imagegen`-produced portrait files of Dr. Arefin are deprecated and must not be re-imported.

## Prevention rule (MANDATORY — applies to ALL Dr. Arefin work)

**NEVER generate AI images of:**
- Dr. Murshidul Arefin himself (hero, about, team, testimonials, video thumbnails)
- Real patients, real staff, real colleagues
- The actual clinic / hospital interior or exterior (Popular Medical College Hospital, BSMMU, etc.)
- Real medical equipment owned by the practice
- Logos, certificates, awards, credentials

**Required workflow when a real-person/real-place image is needed:**
1. STOP. Do not call `imagegen`.
2. Ask the user to upload the real image from drarefin.com or their own files.
3. Wait for the upload. Then `code--copy` it into `src/assets/` with a `-real` suffix in the filename to mark provenance.
4. Import and use it.

**AI-generated imagery is only acceptable for:**
- Abstract backgrounds / textures / gradients
- Generic anatomy diagrams clearly labelled as illustrations
- Decorative geometric patterns

**File naming convention:**
- Real uploaded photos: `*-real.{ext}` (e.g., `arefin-hero-portrait-real.png`)
- AI/decorative assets: no suffix or `-illustration` suffix

This rule is also stored in project memory under `mem://constraints/no-ai-images-of-real-people` and is part of the Core memory index.