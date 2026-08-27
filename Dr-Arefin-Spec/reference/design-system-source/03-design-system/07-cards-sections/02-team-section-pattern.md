# "Team Greenhouse" / Branded Section Pattern

> The "Team Greenhouse" section styling is **preferred** and should be used as a reference for all thematic content sections.

---

## 1. Section Layout

```css
max-width: 1152px;       /* max-w-6xl */
margin-inline: auto;
padding: 64px 16px;      /* py-16 px-4 */
```

---

## 2. Section Header

Centered text block above content:

```css
.section-header {
  text-align: center;
  margin-bottom: 40px;   /* mb-10 */
  animation: fade-in-up 0.7s ease-out both;
}
```

### Heading
```html
<h2 class="text-3xl font-bold text-foreground md:text-4xl">
  Key Greenhouse <span class="text-primary">Gases</span>
</h2>
```

- Two-tone heading: neutral + primary keyword
- Size: `text-3xl` → `md:text-4xl`

### Subheading
```css
margin-top: 12px;       /* mt-3 */
max-width: 672px;       /* max-w-2xl */
margin-inline: auto;
color: hsl(var(--muted-foreground));
```

---

## 3. Content Area

Grid of cards (see `01-gas-card-pattern.md`) with staggered entry.

---

## 4. Footnote (Optional)

```css
margin-top: 24px;       /* mt-6 */
text-align: center;
font-size: 12px;        /* text-xs */
color: hsl(var(--muted-foreground));
```

---

## 5. Reuse Rules for Future Sections

When creating a new thematic section (e.g., "Our Solutions", "Team Members", "Impact Stats"):

1. **Container**: `max-w-6xl mx-auto px-4 py-16`
2. **Header**: Centered, two-tone heading + muted subheading
3. **Content**: Grid of cards or equivalent interactive elements
4. **Animation**: Section header fades in, content items stagger
5. **Spacing**: Consistent `mb-10` between header and content, `gap-6` in grid

---

## 6. Section Variations

| Variation | Difference from Base |
|-----------|---------------------|
| **Stats row** | Replace grid cards with a flex row of stat blocks |
| **Timeline** | Replace grid with vertical timeline layout |
| **Feature list** | Replace grid with alternating image + text rows |
| **CTA section** | Replace grid with centered text + large button |

All variations MUST keep:
- The section container sizing
- The centered header pattern
- The fade-in-up entry animation
- Semantic color tokens only

```
REMAINING TASKS:
- If you say "next", I will continue writing the remaining specification files.
Do you understand? Say "next" to continue.
```
