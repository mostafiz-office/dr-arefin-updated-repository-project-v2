# Mobile Menu

---

## 1. Trigger

- Hamburger button visible below `lg` breakpoint (< 1024px)
- Icon toggles between `Menu` (☰) and `X` (✕), both 22px
- Button: `p-2 rounded-lg hover:bg-secondary transition-colors`

---

## 2. Panel

```css
/* Appears below the header bar */
border-top: 1px solid hsl(var(--border));
background: hsl(var(--card));
padding: 16px;       /* p-4 */
```

Entry animation: `fade-in-up 0.7s ease-out both`

---

## 3. Menu Items

- Full-width buttons, same text style as desktop nav items
- `px-3 py-2.5 text-sm font-medium rounded-lg`
- Hover: `bg-secondary`
- Items with dropdowns show a chevron that rotates 180° on expand

---

## 4. Mobile Sub-items

- Indented with `ml-3 mt-1`
- Each sub-item has label + description (same as desktop dropdown items)
- Entry animation: `fade-in-up` (staggered feel)

---

## 5. Auth Buttons (Mobile)

- Appear at the bottom of the mobile panel
- Separated by `pt-3 border-t border-border`
- Two buttons side by side: `flex gap-2`
  - Sign In: `variant="ghost" flex-1`
  - Join Us: `flex-1 rounded-full`

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
