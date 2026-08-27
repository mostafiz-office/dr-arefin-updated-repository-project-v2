# 03 — Coding Standards

> Reviewer angle: open the source. If you see `!important`, inline `style=`, raw hex, or `text-green-500`, flag it.

---

## 1. Hard rules

- **NO `!important`** anywhere in CSS. Use specificity + cascade layers instead.
- **NO inline `style=` attributes** in JSX/HTML (except dynamic values that genuinely cannot be expressed via class — and document why).
- **NO raw color classes** (`text-white`, `bg-black`, `text-green-500`). Always semantic tokens.
- **NO new green hues**. Only the two greens (see `01` §1.1).
- **Kebab-case** custom CSS class names.
- **Cascade layers**: dark-mode overrides MUST live in the same `@layer` as the rule they override. `@layer utilities` silently beats `@layer base` regardless of specificity.

---

## 2. Tailwind & tokens

- All colors via `hsl(var(--token))`. Defined in `src/index.css`, mapped in `tailwind.config.ts`.
- Spacing/typography via Tailwind utilities (no magic pixels).
- Custom utilities via `@layer utilities` only.

---

## 3. React / Routing

- Internal navigation: `react-router-dom` `<Link>` with relative paths and trailing slash.
- Component files: PascalCase. Hooks: `useXxx` camelCase.
- Co-locate small variant components under `src/components/arefin/<feature>/`.
- Reusable UI lives in `src/components/ui/` (shadcn-derived). Don't fork these — extend via variants.
- Page components in `src/pages/` only render layout + sections.

---

## 4. CSS architecture

- Single `src/index.css` for tokens + global rules + component primitives (Atto card hover, hover shadow, etc.).
- One canonical CSS block per pattern — never duplicate across components.
- Use `@layer base | components | utilities`. Respect cascade.
- Dark mode: `.dark` class on `<html>` (Tailwind `darkMode: ["class"]`).

---

## 5. WordPress / Elementor export (when applicable)

- 1:1 visual parity with React preview is mandatory.
- High-specificity selectors via WP body class (`body.wp-theme-astra .my-class`).
- Never modify the React app to fix a WP-only issue. WP overrides live in the export CSS only.
- Asset paths follow WP date-based directories.
- See `mem://tech/wordpress/*` for full WP rules.

---

## 6. Files & components

- Don't create files >300 lines without a real reason.
- Extract repeating JSX into components.
- Refactor when adding a feature — don't bolt on.

---

## 7. Lints & checks before "done"

- TypeScript: no `any` unless justified.
- No console errors / warnings on the page.
- No 404s in network tab.
- Build passes.
