# 08 — Services Section: Colors & Themes

All variations are **light-page** (`hsl(var(--background))` body). Dark card surface in Variation A is intentional for emphasis contrast.

## Variation A — Dark Bento
- Page bg: `hsl(var(--background))` (off-white)
- Card bg: `hsl(var(--background-deepest))` ≈ `#1a2922` (close to spec `#111827`)
- Card title: white (`hsl(var(--primary-foreground))`)
- Card body: `hsl(0 0% 82%)`
- Icon disc: `hsl(var(--primary) / 0.15)` w/ `hsl(var(--primary-glow))` icon
- Keyword chip: `hsl(var(--primary) / 0.18)` text `hsl(var(--primary-light))`
- Hover: `transform: translateY(-4px)` + ring `hsl(var(--primary) / 0.4)` (no position drift on title — see hero memory; slight card lift OK per CAF card pattern)

## Variation B — Light Editorial
- Page bg: `hsl(var(--background))`
- Card bg: `hsl(var(--card))`, border `hsl(var(--border))`
- Title: `hsl(var(--foreground))`
- Body: `hsl(var(--muted-foreground))`
- Icon: `hsl(var(--primary))` on `hsl(var(--accent))` rounded square
- Hover: border `hsl(var(--primary) / 0.4)`, sharp directional shadow per `mem://style/visual-legibility/hover-shadow-standard`

## Variation C — Gradient Glass Showcase
- Section bg: `linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))`
- Card bg: `hsl(var(--card) / 0.85)` with `backdrop-filter: blur(12px)` + 1px border `hsl(var(--card) / 0.6)`
- Title: `hsl(var(--foreground))`
- Body: `hsl(var(--muted-foreground))`
- Icon disc: solid `hsl(var(--primary))`, icon white
- CTA pill: outline `hsl(var(--primary))` → fill on hover
