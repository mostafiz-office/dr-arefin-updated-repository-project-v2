"""Make prerendered HTML readable in View Source without changing how React hydrates it.

Line breaks are inserted only *inside tag syntax* (before the closing ">" of block tags),
which never creates new text nodes, so the DOM is byte-for-byte equivalent.
Raw NUL characters in TanStack's inline router data are rewritten as \\u0000 escapes
(identical inside a JS string) so WordPress/MySQL can store the page safely.

Usage: python3 readable-html.py in.html out.html
"""
import re
import sys

src, dst = sys.argv[1], sys.argv[2]
html = open(src, "rb").read().replace(b"\x00", b"\\u0000").decode("utf8")
# One script per page, loaded by the <script type="module"> just before </body>:
# drop the head preload hint so View Source shows a single JS reference.
html = re.sub(r'<link rel="modulepreload"[^>]*/?>', "", html)
if html.count('<script type="module"') != 1:
    sys.exit("expected exactly one module script (single-bundle build)")

BLOCK = (
    r"(?:html|head|body|header|main|footer|section|article|aside|nav|div|ul|ol|li|h[1-6]|p|form|"
    r"figure|table|tr|template|script|style|meta|link|title|dl|dt|dd|blockquote|svg)"
)
ATTRS = r"""(?:"[^"]*"|'[^']*'|[^'"<>])*?"""

kept = []


def stash(m):
    kept.append(m.group(2))
    return m.group(1) + f"\x01{len(kept) - 1}\x01" + m.group(3)


html = re.sub(r"(<(?:script|style)\b" + ATTRS + r">)(.*?)(</(?:script|style)>)", stash, html, flags=re.S)
html = re.sub(r"(<" + BLOCK + r"\b" + ATTRS + r")(/?>)", lambda m: m.group(1) + "\n" + m.group(2), html)
html = re.sub(r"(</" + BLOCK + r")>", r"\1" + "\n>", html)
html = re.sub("\x01(\\d+)\x01", lambda m: kept[int(m.group(1))], html)

open(dst, "w").write(html)
print(f"{dst}: {len(html)} bytes, {html.count(chr(10))} lines")
