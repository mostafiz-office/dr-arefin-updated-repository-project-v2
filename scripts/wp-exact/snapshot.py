"""Snapshot each route of /tmp/wpbuild/dist/client as a full HTML document.
Usage: python3 snapshot.py <router_base> <route> [<route> ...]
Serves the build on :4317 with SPA fallback, renders each route in Chromium,
and writes dist/client/<route>/index.html (title, meta, JSON-LD and body content included).
"""
import asyncio, http.server, os, socketserver, sys, threading
from pathlib import Path
from playwright.async_api import async_playwright

DIST = Path("/tmp/wpbuild/dist/client")
BASE = sys.argv[1].rstrip("/")
ROUTES = sys.argv[2:]
SHELL = (DIST / "index.html").read_text()
PORT = 4317


class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=str(DIST), **k)

    def log_message(self, *a):
        pass

    def do_GET(self):
        p = self.path.split("?")[0]
        if (DIST / p.lstrip("/")).is_file():
            return super().do_GET()
        body = SHELL.encode()
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


socketserver.TCPServer.allow_reuse_address = True
srv = socketserver.ThreadingTCPServer(("127.0.0.1", PORT), H)
threading.Thread(target=srv.serve_forever, daemon=True).start()


async def main():
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        ctx = await b.new_context(viewport={"width": 1280, "height": 1800})
        for r in ROUTES:
            page = await ctx.new_page()
            errs = []
            page.on("pageerror", lambda e: errs.append(str(e)))
            await page.goto(f"http://127.0.0.1:{PORT}{BASE}{r}", wait_until="networkidle")
            await page.wait_for_timeout(800)
            html = "<!DOCTYPE html>\n" + await page.evaluate("document.documentElement.outerHTML")
            out[r] = html
            h1 = await page.locator("h1").count()
            title = await page.title()
            print(f"{r}: title={title!r} h1={h1} bytes={len(html)} errors={len(errs)}")
            await page.close()
        await b.close()
    # Write after rendering: writing /index.html earlier would replace the SPA shell mid-run.
    for r, html in out.items():
        f = DIST / ("index.html" if r == "/" else r.strip("/") + "/index.html")
        f.parent.mkdir(parents=True, exist_ok=True)
        f.write_text(html)


asyncio.run(main())
srv.shutdown()
