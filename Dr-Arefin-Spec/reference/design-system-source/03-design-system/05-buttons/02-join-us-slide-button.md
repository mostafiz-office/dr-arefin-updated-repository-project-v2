# "Join Us" Button — CSS3 Slide Text Effect

> The previous scale + shadow hover effect is **not preferred**. This specification replaces it with a **CSS3 slide text animation** where alternate text slides into view on hover.

---

## 1. Concept

The button contains two text layers stacked vertically. Only one is visible at a time. On hover, the default text slides up and out while the alternate text slides up and in.

```
Default state:              Hover state:
┌──────────────┐            ┌──────────────┐
│   Join Us    │  ──────►   │   Let's Go!  │
└──────────────┘            └──────────────┘
```

---

## 2. HTML Structure

```html
<button class="slide-btn">
  <span class="slide-btn__inner">
    <span class="slide-btn__text slide-btn__text--default">Join Us</span>
    <span class="slide-btn__text slide-btn__text--hover">Let's Go!</span>
  </span>
</button>
```

---

## 3. CSS3 Implementation

```css
.slide-btn {
  position: relative;
  overflow: hidden;
  padding: 8px 24px;
  border-radius: 9999px;
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  /* Fixed height to prevent layout shift */
  height: 36px;
}

.slide-btn__inner {
  display: flex;
  flex-direction: column;
  transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-btn__text {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;  /* matches button height */
  white-space: nowrap;
}

/* Hover: slide both texts up by one row */
.slide-btn:hover .slide-btn__inner {
  transform: translateY(-100%);
}
```

---

## 4. Tailwind Equivalent

```html
<button class="relative overflow-hidden h-9 px-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
  <span class="flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-full">
    <span class="flex items-center justify-center h-9">Join Us</span>
    <span class="flex items-center justify-center h-9">Let's Go!</span>
  </span>
</button>
```

> Wrap the button in a `group` or use the button itself as the hover trigger with nested selectors.

---

## 5. Timing & Easing

| Property | Value | Reason |
|----------|-------|--------|
| Duration | 350ms | Slightly longer than standard 300ms for a smooth slide feel |
| Easing | `cubic-bezier(0.4, 0, 0.2, 1)` | Material-style ease — fast start, gentle end |
| Property animated | `transform` only | GPU-accelerated, no layout thrashing |

---

## 6. Accessibility

- Both text labels should be present in the DOM (not using `content:` pseudo-elements)
- The hover text can be hidden from screen readers with `aria-hidden="true"` on the hover span
- The button must have a clear `aria-label` if the slide text is decorative

---

## 7. Variations

This pattern can be adapted for other buttons:

| Button | Default Text | Slide Text |
|--------|-------------|------------|
| Join Us | "Join Us" | "Let's Go!" |
| Subscribe | "Subscribe" | "Stay Updated" |
| Learn More | "Learn More" | "Explore →" |
| Donate | "Donate" | "Make Impact" |

---

## 8. Rule

**All primary CTA buttons in the design system should use this slide pattern.** Ghost buttons and utility buttons (Search, Send) do NOT use slide — they keep the scale hover.

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
