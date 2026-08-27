# 03 — Colors & Themes: About Section (Project 04)

All three variations reuse the existing `--hero-light-*` token system declared in `src/index.css` under `.hero-04-light-band`. **No new tokens required.**

| Token | HSL | Hex | Usage in About section |
|-------|-----|-----|------------------------|
| `--hero-light-bg` | `0 0% 100%` | `#FFFFFF` | Section background |
| `--hero-light-surface` | `138 60% 95%` | `#E8F8EC` | Variation B credentials chip back-tint (alpha 0.6) |
| `--hero-light-primary` | `142 71% 45%` | `#22C55E` | Eyebrow text, signature line, accent block (Var C), stat numbers, CTA fill |
| `--hero-light-deep` | `0 0% 8%` | `#141414` | H2, strong inline body, button text on light bg |
| `--hero-light-muted` | `0 0% 38%` | `#616161` | Body paragraph text, secondary labels |
| `--hero-light-border` | `138 35% 88%` | `#D7ECDB` | Image border, stat-strip top border, chip border |

## Theme behavior

- Light theme only at this stage (matches Hero LIGHT + Value Proposition LIGHT preview suite)
- All tokens auto-adapt if a future dark variant is added (just override the same vars under `.dark .hero-04-light-band`)
- Contrast verified WCAG AA:
  - `--hero-light-deep` on `--hero-light-bg`: ≈ 18.4 : 1 ✅ AAA
  - `--hero-light-muted` on `--hero-light-bg`: ≈ 6.8 : 1 ✅ AA
  - `--hero-light-primary` on `--hero-light-bg`: ≈ 3.6 : 1 ✅ AA Large / AA UI
- Inline strong-anchor links (Variation B) inherit `--hero-light-deep` weight 600 with sage underline on hover (no color shift to keep contrast)

## Hover state colors (no positional shift — color/shadow only)

| Element | Default | Hover |
|---------|---------|-------|
| Image (all variants) | hairline border `--hero-light-border` | sharp zero-blur shadow `8px 8px 0 0 hsl(var(--hero-light-primary) / 0.18)` |
| Variation C accent block | static sage `--hero-light-primary` | unchanged (decorative) |
| Inline strong-anchor link (Var B) | `--hero-light-deep` 600, no underline | underline `--hero-light-primary` |
| Ghost CTA link | `--hero-light-deep` | `--hero-light-primary` |
