# Issue 16 — Export CSS Wrapper Broken

## Summary

`public/elementor-export/global.css` had a valid opening `<style>` tag at the top, but also contained an accidental middle `</style>` before the appended Section 08 sticky-stack CSS. Everything after that middle closing tag rendered as visible text in WordPress/HFCM instead of being parsed as CSS.

## Root Cause

Section 08 CSS was appended after a previously complete CSS export without removing the old EOF `</style>` first. This created two closing tags:

1. First `</style>` before Section 08 — closed the snippet too early.
2. Final `</style>` at EOF — correct final wrapper close.

## Fix

- Removed the stray middle `</style>` before the Section 08 `.sss-*` block.
- Verified `global.css` now has exactly one `<style>` opener and one `</style>` closer.
- Added this issue write-up and memory rule so future exports validate wrapper integrity before zipping or deployment.

## Prevention Rule

Every CSS export intended for HFCM/WPCode/Elementor HTML snippets must contain exactly one `<style>` opener at BOF and one `</style>` closer at EOF. Before every zip/deploy, run a wrapper check and do not ship if counts are not `1/1`.

```bash
python3 - <<'PY'
from pathlib import Path
s = Path('public/elementor-export/global.css').read_text()
assert s.count('<style>') == 1
assert s.count('</style>') == 1
assert s.splitlines()[0].strip() == '<style>'
assert s.splitlines()[-1].strip() == '</style>'
PY
```

## Files Updated

- `public/elementor-export/global.css`
- `public/elementor-export/DEPLOYMENT.md`
- `.lovable/knowledge.md`
- `spec/export-strategy.md`