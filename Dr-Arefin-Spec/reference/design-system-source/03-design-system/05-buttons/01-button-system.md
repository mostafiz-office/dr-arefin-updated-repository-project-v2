# Button System

---

## 1. Base Button (Primary)

```css
display: inline-flex;
align-items: center;
justify-content: center;
gap: 8px;
padding: 8px 24px;          /* size="sm", px-6 */
font-size: 14px;
font-weight: 600;            /* font-semibold */
border-radius: 9999px;       /* rounded-full for primary CTA */
background: hsl(var(--primary));
color: hsl(var(--primary-foreground));
transition: all 300ms ease;
```

### States

| State | Visual Change |
|-------|---------------|
| **Default** | `bg-primary text-primary-foreground` |
| **Hover** | `scale(1.05)`, `box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1)` |
| **Active** | `scale(0.95)` |
| **Focus** | `ring-2 ring-primary/30 ring-offset-2` |
| **Disabled** | `opacity: 0.5, pointer-events: none` |

---

## 2. Ghost Button

```css
background: transparent;
color: hsl(var(--foreground));
font-weight: 500;
```

### Hover
```css
background: hsl(var(--secondary));
transform: scale(1.05);
```

---

## 3. Size Variants

| Size | Padding | Height | Font Size |
|------|---------|--------|-----------|
| `sm` | `px-3 py-1.5` | 32px | 14px |
| `default` | `px-4 py-2` | 40px | 14px |
| `lg` | `px-6 py-3` | 48px | 16px |

---

## 4. Shape Rules

- **CTA buttons** (Join Us, Subscribe): `rounded-full` (pill shape)
- **Utility buttons** (Search, Send): `rounded-xl` (12px)
- **Menu/nav buttons**: `rounded-lg` (8px)

---

## 5. Button with Icon

```html
<button class="... gap-2">
  <SearchIcon size={16} />
  Search
</button>
```

- Icon size: 16px for `sm` buttons, 18px for `default`
- Gap: 8px between icon and text
- Icon uses `currentColor`

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
