# Category Archive — Design Audit & Fix

## What is actually wrong

Your screenshot shows the snippet IS running (our hero, pills and cards are on the page), but three structural problems break the design.

### 1. Our sections are trapped inside Astra's content wrapper (the main bug)
`get_header()` in Astra opens `<div id="content" class="site-content"><div class="ast-container">` before our markup. Astra styles `.ast-container` as a **flex row with a max-width**, because it normally holds `#primary` + `#secondary`. Our three sections become flex children of that row, so:
- the pills band is squeezed into a narrow column (pills wrap one per line, as in your screenshot),
- the article grid is pushed to a second column on the right, with clipped titles ("Neuroend…", "Preoperati…"),
- the dark hero band cannot go edge-to-edge; it stops at the container's max-width and leaves grey gaps on both sides.

Verified: the live page markup contains `#content > .ast-container` and Astra's grid/flex archive classes.

### 2. Astra's archive banner still prints — duplicate H1
Live markup contains:
```text
<section class="ast-archive-entry-banner" data-banner-layout="layout-2"> <h1>Research</h1> </section>
```
That is the giant "Research" title over the surgery photo at the top of your screenshot. So the page has **two H1s** ("Research" twice) and two page titles — bad visually and bad for SEO.

### 3. Cached HTML for logged-out visitors
The public (uncached-user) HTML we fetched is still 100% default Astra archive markup — meaning SpeedyCache is serving the old page to visitors. The design must be verified after a cache purge, in a private window.

### Smaller issues found in the snippet
- Pagination `str_replace` on `paginate_links` output only matches exact class strings; WP also emits `class="prev page-numbers"` variants with extra attributes — safer to build the pager markup directly, like the Articles snippet does.
- `exit` right after `get_footer()` skips `shutdown` actions (some cache/analytics plugins hook there).
- The hero prints no meta/canonical control and the "All Articles" pill never gets an active state (dead variable `$all_active`).
- Empty-state and pagination CSS live only in the fallback `<style>`; anything relying on `body.wp-theme-astra .arefin …` rules in global.css is fine, but Astra archive pages may not load the global CSS snippet at all — the fallback must cover container neutralisation too.

## The fix

**File: `public/elementor-export/blocks/category/arefin-category-archive.php`** (v1.1.0)
1. Buffer `get_header()` and strip the `ast-archive-entry-banner` section from it (plus register Astra's banner-disable filter when available), so only our hero renders and there is exactly one H1.
2. Print container-neutralising CSS scoped to `body.arefin-category-archive`:
   - `#content > .ast-container { display:block; max-width:none; width:100%; padding:0; }`
   - `#content, .site-content { padding:0; }`, hide `#secondary`, force `#primary { width:100%; margin:0; }`
   - guard so this never leaks off category archives.
3. Rebuild pagination as explicit markup (prev / numbered links / next) using `get_pagenum_link()` instead of string-replacing `paginate_links()` output.
4. Replace `exit` with `exit` after `do_action('shutdown')`-safe teardown (use `get_footer(); exit;` only after flushing, or return a `template_include` template instead) — I'll switch to the safer flow.
5. Give "All Articles" a real inactive/active treatment and drop the dead variable.

**File: `public/elementor-export/blocks/category/category.css`**
- Mirror the same container-neutralising rules and the pagination/empty-state rules so the pasted global CSS and the PHP fallback stay identical.

**File: `public/elementor-export/global.css`**
- Update the appended category block to match category.css.

**File: `public/elementor-export/DEPLOYMENT.md`**
- Bump to v1.1.0, add the mandatory step: purge SpeedyCache, then verify `/category/research/` in a private window.

## Notes
This is a WordPress-export-only change. No React app files are touched.
