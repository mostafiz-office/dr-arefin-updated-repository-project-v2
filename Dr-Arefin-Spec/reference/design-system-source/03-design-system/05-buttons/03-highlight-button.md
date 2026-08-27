# Highlight Button — "Climate AI" Pattern

> This button style is **preferred** and should be documented as a reusable pattern for floating action buttons, feature highlights, or persistent CTAs.

---

## 1. Purpose

A floating, attention-grabbing button that persists on screen, used for high-priority actions (e.g., AI assistant, chat, urgent CTA).

---

## 2. Visual Properties

```css
position: fixed;
bottom: 24px;           /* bottom-6 */
right: 24px;            /* right-6 */
z-index: 50;
display: flex;
align-items: center;
gap: 8px;
padding: 12px 20px;     /* px-5 py-3 */
border-radius: 9999px;  /* rounded-full — pill shape */
background: hsl(var(--primary));
color: hsl(var(--primary-foreground));
font-size: 14px;
font-weight: 600;
box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1),
            0 4px 6px -4px rgba(0,0,0,0.1);  /* shadow-lg */
```

---

## 3. Icon

- Left-aligned icon (18px), e.g., `MessageCircle`
- Uses `currentColor` (inherits `--primary-foreground`)
- Gap: 8px between icon and text

---

## 4. Animations (Layered)

This button uses **two simultaneous animations**:

### Pulse Glow
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 hsl(var(--primary) / 0.4); }
  50%      { box-shadow: 0 0 20px 4px hsl(var(--primary) / 0.15); }
}

animation: pulse-glow 2s ease-in-out infinite;
```

### Fade In (Entry)
```css
animation: fade-in 0.5s ease-out both;
animation-delay: 0.5s;
```

Combined: `animate-pulse-glow animate-fade-in delay-500`

---

## 5. Hover & Active States

```css
/* Hover */
transform: scale(1.05);
transition: all 300ms ease;

/* Active (press) */
transform: scale(0.95);
```

---

## 6. When to Use This Pattern

- Floating AI/chat assistants
- Persistent CTAs that should always be visible
- Feature announcement buttons
- Emergency or priority action buttons

---

## 7. When NOT to Use

- Inline content actions (use standard primary button)
- Form submit buttons (use standard button)
- Navigation (use nav items)

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
