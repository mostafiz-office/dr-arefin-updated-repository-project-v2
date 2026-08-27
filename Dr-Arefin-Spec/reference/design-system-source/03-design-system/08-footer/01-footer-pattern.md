# Footer Pattern

---

## 1. Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Brand + Tagline     Quick Links     Resources     Newsletter   │
│  Social Icons                                                   │
├─────────────────────────────────────────────────────────────────┤
│  © Copyright                                        Motto       │
└─────────────────────────────────────────────────────────────────┘
```

- 4-column grid: `grid sm:grid-cols-2 lg:grid-cols-4 gap-10`
- Container padding: `py-14`

---

## 2. Container Style

```css
border-top: 1px solid hsl(var(--border));
background: hsl(var(--card) / 0.6);
backdrop-filter: blur(4px);  /* backdrop-blur-sm */
```

---

## 3. Brand Column

- Icon (Leaf, 22px, `text-primary`) + brand name (`text-lg font-bold text-foreground`)
- Tagline: `text-sm text-muted-foreground leading-relaxed`
- Social icons: see `02-menu/05-icon-hover-transitions.md` for behavior

---

## 4. Link Columns

### Column Header
```css
font-size: 14px; font-weight: 600;
color: hsl(var(--foreground));
margin-bottom: 16px;
```

### Link Items
```css
font-size: 14px;
color: hsl(var(--muted-foreground));
transition: color 200ms ease;
```

Hover: `color: hsl(var(--primary))`

External links include a small `ExternalLink` icon (12px, `opacity: 0.5`).

---

## 5. Newsletter Column

- Title + description (same styling as column header + muted text)
- Email input: `rounded-lg border-border bg-background` with mail icon
- Submit button: small primary button with `Send` icon

### Input Focus
```css
border-color: hsl(var(--primary));
outline: none;
ring: 2px solid hsl(var(--primary) / 0.2);
transition: all 300ms;
```

---

## 6. Bottom Bar

```css
border-top: 1px solid hsl(var(--border));
padding: 20px container;
display: flex;
flex-direction: column → sm:row;
justify-content: space-between;
align-items: center;
gap: 8px;
font-size: 12px;
color: hsl(var(--muted-foreground));
```

---

## 7. Data Source

All footer content (brand name, tagline, links, socials, copyright, motto, newsletter text) is fetched from the database — fully CMS-configurable.

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
