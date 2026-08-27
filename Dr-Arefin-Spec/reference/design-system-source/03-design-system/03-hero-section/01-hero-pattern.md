# Hero Section Pattern

---

## 1. Layout

```
┌──────────────────────────────────────────────────────────────┐
│                    (gradient background)                      │
│                                                              │
│         ○ floating orb (left)      ○ floating orb (right)    │
│                                                              │
│                  Title Prefix                                │
│              Title Highlight (primary color)                 │
│                                                              │
│                  Subtitle (muted)                            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

- Section: `relative overflow-hidden`
- Padding: `pt-16 pb-8` (mobile), `pt-24 pb-12` (md+)
- Text: centered (`text-center`)
- Container: standard centered container

---

## 2. Gradient Background

```css
.hero-gradient {
  position: absolute;
  inset: 0;
  z-index: -10;
  background: linear-gradient(
    180deg,
    hsl(var(--gradient-start)) 0%,
    hsl(var(--gradient-end)) 60%,
    hsl(var(--background)) 100%
  );
}
```

- Always fades to `--background` at the bottom for seamless blending with content below.

---

## 3. Floating Decorative Orbs

Two blurred circles create ambient depth:

### Left Orb
```css
position: absolute;
top: 40px;
left: 10%;
width: 256px; height: 256px;
border-radius: 50%;
background: hsl(var(--primary) / 0.05);
filter: blur(48px);  /* blur-3xl */
animation: float 3s ease-in-out infinite;
```

### Right Orb
```css
position: absolute;
top: 80px;
right: 15%;
width: 192px; height: 192px;
border-radius: 50%;
background: hsl(var(--primary) / 0.05);
filter: blur(48px);
animation: float 3s ease-in-out infinite;
animation-delay: 0.3s;
```

### Float Animation
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}
```

---

## 4. Typography

### Title
```css
font-size: 36px / 48px / 60px / 72px;  /* text-4xl → lg:text-7xl responsive */
font-weight: 800;                       /* font-extrabold */
letter-spacing: -0.025em;              /* tracking-tight */
animation: fade-in-up 0.7s ease-out both;
```

The title has two parts:
- **Prefix**: default `text-foreground`
- **Highlight**: `text-primary` (the brand-colored keyword)

### Subtitle
```css
margin-top: 16px (mobile) / 24px (md+);
color: hsl(var(--muted-foreground));
font-size: 16px / 18px;  /* text-base → md:text-lg */
max-width: 576px;        /* max-w-xl */
margin-inline: auto;
animation: fade-in-up 0.7s ease-out both;
animation-delay: 0.2s;
```

---

## 5. Staggered Entry

| Element | Animation | Delay |
|---------|-----------|-------|
| Title | fade-in-up | 0s |
| Subtitle | fade-in-up | 0.2s |
| (Search module below) | scale-in | 0.3s |

---

## 6. Data Source

All hero text (prefix, highlight, subtitle) is fetched from the database, making it fully CMS-configurable.

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
