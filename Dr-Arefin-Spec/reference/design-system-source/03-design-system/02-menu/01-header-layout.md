# Header Layout

---

## 1. Structure

```
┌──────────────────────────────────────────────────────────────────┐
│  [Logo]          [Nav Items ...]            [Sign In] [Join Us]  │
│                                                                  │
│  height: 70px    sticky top-0    z-index: 50                     │
└──────────────────────────────────────────────────────────────────┘
```

### HTML Skeleton

```html
<nav class="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50">
  <div class="container flex items-center justify-between h-[70px]">
    <!-- Left: Logo -->
    <!-- Center: Nav items (hidden on mobile) -->
    <!-- Right: Auth buttons (hidden on mobile) -->
    <!-- Right: Hamburger (visible on mobile only) -->
  </div>
</nav>
```

---

## 2. Visual Properties

| Property | Value | Variable |
|----------|-------|----------|
| Background | Semi-transparent card | `bg-card/80` (80% opacity) |
| Backdrop | Blur | `backdrop-blur-md` (12px) |
| Border | Bottom only, subtle | `border-b border-border/50` |
| Height | 70px | Fixed |
| Position | Sticky, top: 0 | `sticky top-0` |
| Z-index | 50 | Highest page-level layer |
| Container | Centered, max-width 1400px, 2rem padding | Tailwind `container` |

---

## 3. Entry Animation

The header fades in on page load:

```css
animation: fade-in 0.5s ease-out both;
```

- Duration: 500ms
- Easing: ease-out
- Fill: both (maintains final state)

---

## 4. Logo Placement

- Left-aligned within the container
- Consists of an SVG icon (36×36, rounded rect with leaf path) + brand text
- Logo SVG uses `fill="hsl(var(--primary))"` — never hardcoded
- Brand text: `text-xl font-extrabold text-primary`
- **Hover behavior**: SVG scales to 110% over 300ms

```css
.logo-icon {
  transition: transform 300ms ease;
}
.logo-icon:hover {
  transform: scale(1.1);
}
```

---

## 5. Spacing Between Sections

| Gap | Value |
|-----|-------|
| Logo ↔ Nav items | Flex `justify-between` (auto) |
| Between nav items | `gap-1` (4px) |
| Nav items ↔ Auth buttons | Flex `justify-between` (auto) |
| Between auth buttons | `gap-3` (12px) |

---

## 6. Responsive Breakpoint

- **≥ 1024px (lg)**: Full horizontal nav + auth buttons visible
- **< 1024px**: Nav items and auth buttons hidden; hamburger icon shown

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
