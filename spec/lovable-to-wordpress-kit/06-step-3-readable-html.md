# 06 — Step 3: Readable, SEO-complete HTML

Goal: right-click → View Source shows the full page — head meta and all visible text — not an empty `<div id="root">`.

## Already provided by prerender
Each route's `head()` gives `<title>`, `description`, `og:*`, `twitter:*`, canonical. Body contains the full rendered markup. Verify each route has a unique title/description and exactly one `<h1>`.

## Make it readable (readable-html.py)
Minified output is one huge line. Insert line breaks **only inside tag syntax** — before the closing `>` of block tags (`html head body header main footer section div ul li h1-h6 p nav form script style meta link title svg ...`). Example: `<div class="x"\n>`. This never creates new text nodes, so React hydration sees an identical DOM.
- Temporarily stash the contents of `<script>`/`<style>` so they are not modified.

## Make it storable
TanStack's inline router data can contain raw NUL characters; MySQL/WordPress truncate on them. Replace byte `\x00` with the text `\u0000` (identical inside a JS string).

## Do not
- Do not pretty-print with a formatter that adds whitespace between inline elements (changes layout and causes hydration mismatches).
- Do not let the SEO plugin inject its own title — the snippet bypasses it.

## Script placement
`readable-html.py` removes every `<link rel="modulepreload">` and fails if the page does not contain exactly one `<script type="module">`. TanStack already emits that script as the last element of `<body>`; small inline scripts (router data, JSON-LD) stay in place because hydration needs them.
