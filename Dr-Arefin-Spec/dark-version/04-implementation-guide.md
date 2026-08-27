# Implementation Guide — Dark Homepage

Step-by-step build instructions for any AI/developer.

## Prerequisites
- `.arefin.dark` token block exists in `src/index.css` (lines ~136–172) ✅ already present
- All `*V04Light*` variation components consume `hsl(var(--…))` tokens ✅ already true
- Light homepage `src/pages/DrArefinHome.tsx` exists ✅

## Step 1 — Create the dark page
**File**: `src/pages/DrArefinHomeDark.tsx`

Copy `src/pages/DrArefinHome.tsx` verbatim, then change exactly two things:

1. Component name: `DrArefinHome` → `DrArefinHomeDark`
2. Root div className: `"arefin min-h-screen …"` → `"arefin dark min-h-screen …"`

Everything else (imports, sections, JSON-LD, inline `<style>`) stays identical at first.

## Step 2 — Add the route
**File**: `src/App.tsx`

Find the existing `/dr-arefin` route registration. Add directly below it:
```tsx
import DrArefinHomeDark from "./pages/DrArefinHomeDark";
// …
<Route path="/home-dark" element={<DrArefinHomeDark />} />
```

## Step 3 — Apply Section 9 dark-mode text-shadow override
**File**: `src/pages/DrArefinHomeDark.tsx` — inside the existing inline `<style>` block at the bottom of the Transformations section, append these rules:

```css
/* Dark-mode contrast fixes — invert shadow + use light green for hover word color */
.arefin.dark .stories-heading strong:hover,
.arefin.dark .stories-intro strong:hover,
.arefin.dark .stories-title,
.arefin.dark .stories-desc strong:hover {
  /* hovered green word: use lighter green for contrast on dark */
}
.arefin.dark .stories-heading strong:hover {
  color: hsl(var(--primary-light));
  text-shadow: 1px 1px 0 hsl(var(--background-darker));
}
.arefin.dark .stories-intro strong:hover {
  color: hsl(var(--primary-light));
  text-shadow: 1px 1px 0 hsl(var(--background-darker));
}
.arefin.dark .stories-card:hover .stories-title,
.arefin.dark .stories-card:focus-within .stories-title {
  color: hsl(var(--primary-light));
  text-shadow: 1px 1px 0 hsl(var(--background-darker));
}
.arefin.dark .stories-desc strong:hover {
  color: hsl(var(--primary-light));
  text-shadow: 1px 1px 0 hsl(var(--background-darker));
}
.arefin.dark .stories-intro {
  color: hsl(var(--muted-foreground));
}
.arefin.dark .stories-intro strong {
  color: hsl(var(--foreground) / 0.95);
}
```

## Step 4 — Verify in browser
Visit `/home-dark` and confirm:
- [ ] Header is transparent over dark hero, nav links are white
- [ ] Hero background is deep navy, portrait visible, "Book an Appointment" green pill renders white text
- [ ] Value Prop band is darker than hero; "01./02./03." numerals render bright green
- [ ] About, Initiatives, Metrics, Videos, Services all alternate `--background` ↔ `--background-darker`
- [ ] All cards have visible borders on dark
- [ ] Card hover shows subtle green glow (`--shadow-card-hover`)
- [ ] Transformations section: hovering bold words turns them light-green with a dark text-shadow
- [ ] Footer renders unchanged (already dark)
- [ ] No horizontal scroll on mobile (`overflow-x: hidden` global rule applies)
- [ ] Light homepage `/dr-arefin` still works identically

## Step 5 — Iteration deltas (if QA finds issues)
Per `03-section-adaptations.md`:
- If chart library colors break in Metrics → add `.arefin.dark .recharts-cartesian-axis text { fill: hsl(var(--muted-foreground)); }` etc. to `src/index.css`
- If Services glass cards look wrong → swap any `bg-white/10` for `bg-foreground/5` (token-driven translucent overlay)
- If Final CTA outlined button border invisible → swap `border-border` for `border-primary/30` in that single button

## Files touched (final list)
| File | Change |
|---|---|
| `src/pages/DrArefinHomeDark.tsx` | **NEW** — copy of `DrArefinHome.tsx` with `arefin dark` root + Step 3 CSS appended |
| `src/App.tsx` | Add 1 import + 1 `<Route>` |
| `src/index.css` | **No change required for v1**. Only touched if QA in Step 5 reveals an issue |

## Files NOT touched
- ❌ `src/pages/DrArefinHome.tsx` — light homepage stays untouched
- ❌ Any `*V04Light*` variation component — they're shared, token-driven
- ❌ `DrArefinHeader.tsx` — already dark-mode aware
- ❌ `DrArefinFooter.tsx` — already dark in both modes
- ❌ `tailwind.config.ts` — no new colors

## Future enhancements (out of scope for v1)
- Dedicated `*V04Dark*` variation components if section visuals need to diverge meaningfully from the light homepage
- Theme toggle on the dark page header (currently the page is "always dark")
- Dark-version exclusive copy or imagery
