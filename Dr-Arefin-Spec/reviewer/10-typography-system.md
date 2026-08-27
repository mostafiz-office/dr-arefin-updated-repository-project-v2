# Responsive Typography System

Single source of truth for heading + body sizing across every page,
component, and breakpoint. Pairs with `09-responsive-qa.md`.

## Why

Before this spec, font-size was set ad-hoc in components (~80+ unique
declarations across `src/index.css`). Result: same role rendered
differently on different pages, and breakpoint behavior was unpredictable.

This system replaces all of that with **9 fluid roles** that scale
smoothly between mobile (375px) and large desktop (1440px+) using
`clamp()` — no media queries needed for type sizing.

## The ramp

| Role         | Min (375px) | Max (1440px) | Line-height | Use for                          |
| ------------ | ----------- | ------------ | ----------- | -------------------------------- |
| `display`    | 40px        | 80px         | 1.05        | Marketing hero only              |
| `h1`         | 32px        | 72px         | 1.10        | Page hero title                  |
| `h2`         | 26px        | 48px         | 1.20        | Section title                    |
| `h3`         | 22px        | 36px         | 1.25        | Sub-section, card title (large)  |
| `h4`         | 19px        | 26px         | 1.30        | Card title (small), list heading |
| `lede`       | 17px        | 22px         | 1.55        | Hero subtitle, intro paragraph   |
| `body`       | 15px        | 17px         | 1.65        | All paragraph text               |
| `small`      | 13px        | 15px         | 1.55        | Meta, captions, labels           |
| `micro`      | 11px        | 12px         | 1.40        | Badges, fine print               |
| `eyebrow`    | 13px        | 15px         | 1.20        | Uppercase section label          |

Tokens live in `src/index.css` `:root` as `--fs-*` / `--lh-*` / `--ls-*`.
Edit there and every consumer updates.

## How to use

### Option A — utility class (preferred for raw HTML)

```html
<h1 class="type-h1">Page title</h1>
<p class="type-lede">Hero subtitle paragraph.</p>
<p class="type-body">Body copy.</p>
<span class="type-eyebrow">Section label</span>
```

### Option B — Tailwind token (preferred inside components)

```tsx
<h2 className="text-fluid-h2 text-foreground">Section title</h2>
<p  className="text-fluid-body text-muted-foreground">Body copy.</p>
```

Both resolve to the same CSS vars.

## When to use which role

Quick decision rules:

- **`type-h1`** — exactly **one per page**, the hero title. Names the page.
- **`type-h2`** — every major section title under the hero. Multiple per page.
- **`type-lede`** — the **single** intro paragraph that follows an `h1` or
  `h2`. Sets context, never carries the bulk of the copy.
- **`type-body`** — every other paragraph. Lists, cards, descriptions, FAQ
  answers, form helper text.

If you find yourself reaching for `type-lede` twice in a row, the second one
is `type-body`. If you reach for `type-h1` twice, the second one is `type-h2`.

### Page-by-page examples

#### Home

```html
<section class="hero">
  <span class="type-eyebrow">Studio fiscale</span>
  <h1 class="type-h1">CAF Patronato Fondi</h1>
  <p class="type-lede">
    Dichiarazioni 730, ISEE, RED e pratiche INPS a Fondi e in tutto il
    sud pontino. Appuntamento in 24 ore.
  </p>
</section>

<section class="services-preview">
  <h2 class="type-h2">I nostri servizi</h2>
  <p class="type-body">
    Dal 730 precompilato alle successioni: ti seguiamo dall'apertura
    della pratica al rilascio del documento finale.
  </p>
</section>
```

Why: only the page name gets `h1`; "I nostri servizi" is a section, so `h2`.
The hero paragraph is the lede; the section paragraph is body copy.

#### Chi Siamo

```html
<section class="hero">
  <h1 class="type-h1">Chi siamo</h1>
  <p class="type-lede">
    Un team di consulenti fiscali con oltre 20 anni di esperienza al
    servizio delle famiglie e delle imprese del territorio.
  </p>
</section>

<section class="storia">
  <h2 class="type-h2">La nostra storia</h2>
  <p class="type-body">Fondato nel 2003, il nostro centro…</p>
  <p class="type-body">Negli anni abbiamo ampliato i servizi…</p>
</section>

<section class="valori">
  <h2 class="type-h2">I nostri valori</h2>
  <p class="type-body">Trasparenza, competenza e ascolto…</p>
</section>
```

Why: `h1` names the page once. "La nostra storia" and "I nostri valori"
are siblings — both `h2`. Multiple paragraphs in the same section are all
`type-body`; never repeat `type-lede`.

#### Servizi

```html
<section class="hero">
  <span class="type-eyebrow">Servizi</span>
  <h1 class="type-h1">Servizi fiscali e patronato</h1>
  <p class="type-lede">
    Tutto quello che ti serve per fisco, lavoro e previdenza, in
    un'unica sede.
  </p>
</section>

<section class="service-grid">
  <h2 class="type-h2">Dichiarazione 730</h2>
  <p class="type-body">
    Compiliamo, controlliamo e trasmettiamo il tuo modello 730…
  </p>

  <h2 class="type-h2">ISEE</h2>
  <p class="type-body">
    Calcolo dell'indicatore della situazione economica…
  </p>
</section>
```

Why: each service card title is a peer section heading → `h2`. Service
descriptions are functional copy → `type-body`, not `type-lede`. Reserve
`type-lede` for the single hero subtitle.

#### Contatto

```tsx
<section className="hero">
  <h1 className="text-fluid-h1">Contattaci</h1>
  <p className="text-fluid-lede">
    Scrivici, chiamaci o passa in sede: rispondiamo entro un giorno
    lavorativo.
  </p>
</section>

<section className="contact-grid">
  <h2 className="text-fluid-h2">Sede di Fondi</h2>
  <p className="text-fluid-body">Via Roma 12, 04022 Fondi (LT)</p>
  <p className="text-fluid-body">Lun–Ven 9:00–13:00 / 15:00–18:00</p>

  <h2 className="text-fluid-h2">Scrivici</h2>
  <p className="text-fluid-body">
    Compila il form e ti ricontattiamo entro 24 ore.
  </p>
</section>
```

Why: the contact form intro is the lede. Each branch / channel block is
its own section with an `h2`. Address lines, hours, and helper text are
all `type-body` — they are not introductory.

### Anti-patterns

```html
<!-- Wrong: two h1 on one page -->
<h1 class="type-h1">Chi siamo</h1>
<h1 class="type-h1">La nostra storia</h1>

<!-- Right -->
<h1 class="type-h1">Chi siamo</h1>
<h2 class="type-h2">La nostra storia</h2>
```

```html
<!-- Wrong: lede used as body filler -->
<h2 class="type-h2">Servizi</h2>
<p class="type-lede">Offriamo 730…</p>
<p class="type-lede">Offriamo ISEE…</p>

<!-- Right -->
<h2 class="type-h2">Servizi</h2>
<p class="type-body">Offriamo 730…</p>
<p class="type-body">Offriamo ISEE…</p>
```

```html
<!-- Wrong: static Tailwind size on a heading -->
<h2 class="text-4xl font-bold">Sede di Fondi</h2>

<!-- Right -->
<h2 class="text-fluid-h2 font-bold">Sede di Fondi</h2>
```

## Hard rules

1. **Never** set `font-size` on a heading or paragraph in a component
   or section CSS. Use a `type-*` class or `text-fluid-*` token.
2. **Never** add a new size outside the ramp. If a design needs
   something between `h2` and `h3`, extend `--fs-*` in `:root` — do
   not inline a `clamp()` in a component.
3. **Never** use static `text-2xl` / `text-4xl` / `text-6xl` etc. for
   headings. Those are fixed and break the responsive ramp.
4. Existing component-local `font-size` declarations that predate this
   spec are grandfathered; replace them when you touch the file.

## Pairing with the breakpoint matrix

The ramp's min/max align with the QA matrix in `09-responsive-qa.md`:
the min hits at 375px and the max plateaus at 1440px. Visual regression
tests in `tests/visual/` will catch any drift.

## Adding a new role

1. Add `--fs-newrole` + `--lh-newrole` to `:root` in `src/index.css`.
2. Add a `.type-newrole` utility in the typography `@layer utilities`
   block at the bottom of `src/index.css`.
3. Add `"fluid-newrole"` to `fontSize` in `tailwind.config.ts`.
4. Document the row in this spec.
