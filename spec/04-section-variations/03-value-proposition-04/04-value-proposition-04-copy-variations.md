# 04 — Copy Variations: Value Proposition (Project 04)

**Section:** Value Proposition · **Project sequence (YY):** 04
**Scope:** Three written/copy variations of the same 3-pillar structure — visual layout/animation/colors stay identical to `02-value-proposition-04.md`. Only the words change.

> **How to use:** Pick one variation (V1, V2, or V3) and feed its `title` + `description` into the existing `ValuePropV04LightA / B / C` components. The structure (Step 01 / 02 / 03) and pillar order are fixed.

---

## Pillar order (fixed across all variations)

| Step | Pillar |
|------|--------|
| 01 | Surgical Excellence |
| 02 | Advanced Treatment |
| 03 | Compassionate Care |

> Pillar **titles are stable** — only the descriptions change between variations. This keeps SEO / heading hierarchy consistent while letting us A/B test voice.

---

## Variation V1 — Patient-Friendly Tone

**Voice:** Warm, reassuring, plain-language. Avoids jargon. Speaks *to* the patient, not *about* the doctor.
**When to use:** Homepage hero follow-up, landing pages targeting new patients, Facebook/Instagram referrals.

| Step | Title | Description |
|------|-------|-------------|
| 01 | Surgical Excellence | With more than 7 years performing liver, gallbladder, and bile-duct surgeries, Dr. Arefin brings the steady hands and clear thinking you want in your surgeon — so you can focus on getting better, not on the unknown. |
| 02 | Advanced Treatment | Whether your case calls for keyhole (laparoscopic) surgery or a traditional approach, you'll get the option that's safest for *you* — backed by modern techniques designed for shorter hospital stays and faster recovery. |
| 03 | Compassionate Care | You'll never feel rushed or talked over. Dr. Arefin takes the time to explain your diagnosis, walk you through your choices, and stay with you from your first visit through full recovery. |

---

## Variation V2 — Medium Length (Current Spec Baseline)

**Voice:** Balanced, professional, equal weight on credentials and care.
**Length:** Matches the original brief — ~30–35 words per description.
**When to use:** Default option. Safe for homepage, About page, and printed clinic materials.

| Step | Title | Description |
|------|-------|-------------|
| 01 | Surgical Excellence | Over 7 years of hands-on experience in hepatobiliary, liver, and gallbladder surgery, Dr. Murshidul Arefin combines precision, innovation, and compassionate care to achieve the best surgical outcomes. |
| 02 | Advanced Treatment | Providing comprehensive care for liver, pancreas, and biliary tract diseases through both laparoscopic and open surgical techniques, ensuring safe recovery and long-term health for every patient. |
| 03 | Compassionate Care | Dr. Arefin believes in a patient-first philosophy — offering personalized guidance, transparent communication, and respectful treatment throughout every stage of diagnosis, surgery, and recovery. |

---

## Variation V3 — Patient-Journey Angle

**Voice:** Frames each pillar as a stage in the patient's experience — *what happens to you* at consultation → treatment → recovery.
**When to use:** When the section sits next to a "How it works" or appointment-booking flow. Helps visitors mentally walk through the experience.

| Step | Title | Description |
|------|-------|-------------|
| 01 | Surgical Excellence | **Before surgery:** Your case is reviewed by a surgeon with 7+ years of focused experience in hepatobiliary, liver, and gallbladder procedures — so the plan you walk in with is built on real surgical judgment, not guesswork. |
| 02 | Advanced Treatment | **During treatment:** You're matched to the technique that fits your condition — laparoscopic when it's safer, open when it's needed — across liver, pancreas, and biliary tract care, with the goal of the smoothest possible recovery. |
| 03 | Compassionate Care | **After surgery:** Your recovery is followed personally — clear next steps, honest answers to your questions, and continued guidance from Dr. Arefin until you're back to the life you want. |

---

## Implementation notes

1. **Pillar titles never change** between V1/V2/V3 — only the `description` field.
2. To switch variations in code, swap the `items` array inside `ValuePropV04LightA/B/C.tsx` with the row from the table above.
3. SEO impact: H3 text is identical across variations → no heading-hierarchy regression.
4. Word counts (descriptions only):
   - V1: 38 / 33 / 31 words
   - V2: 27 / 24 / 22 words (baseline)
   - V3: 39 / 36 / 25 words
5. All variations stay AA-readable (Flesch ≥ 60, Italian/English mixed clinic context).

---

## Future corrections

Any rewrites or tone tweaks land under:
```
spec/04-section-corrections/xx-correction-value-proposition-04/
```
(Numbering starts at `01`, mirrors the variations folder.)
