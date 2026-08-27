# Design System

## Color Tokens (HSL)
All colors defined in `src/index.css` as CSS custom properties and mapped in `tailwind.config.ts`.

### Usage Rules
- **NEVER** use raw color classes (`text-white`, `bg-black`, `text-green-500`) in components
- **ALWAYS** use semantic tokens: `text-foreground`, `bg-background`, `text-primary`, `bg-card`, etc.
- Exception: dark hero sections may use inline `style` for specific backgrounds (e.g., `#111111`)

### Token Reference
- `--background` / `--foreground` — page base
- `--primary` / `--primary-foreground` — brand accent (green)
- `--secondary` / `--secondary-foreground` — neutral surfaces
- `--muted` / `--muted-foreground` — subdued text
- `--accent` / `--accent-foreground` — highlighted areas
- `--card` / `--card-foreground` — card backgrounds
- `--border` — dividers and borders
- `--body-text` — body paragraph text color

## Typography
- Section labels: `text-xs uppercase tracking-widest text-primary font-semibold`
- H2 headings: `text-2xl md:text-3xl lg:text-4xl font-bold text-foreground`
- Body text: `text-body-text leading-relaxed`

## Section Spacing
- Standard: `py-20 md:py-28`
- Compact: `py-16 md:py-20`

## Component Patterns
- Cards: `bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/20 transition-all`
- CTAs: `Button` component from shadcn/ui with `asChild` + `Link`
- Scroll animations: `<Reveal>` wrapper from `useScrollReveal` hook
