#!/usr/bin/env bash
# Build the real site (same code as the preview) as static pages for WordPress.
# Usage: bash scripts/wp-exact/build.sh "/" "/solutions" ...   (or --all to use routes.json)
# Output: /tmp/wpbuild/dist/client (pages + flat, dot-free asset files)
set -euo pipefail
UPLOAD_BASE="${WP_UPLOAD_BASE:-/wp-content/uploads/$(date -u +%Y/%m)/}"
if [ "${1:-}" = "--all" ]; then set -- $(python3 -c 'import json;print(" ".join(r["route"] for r in json.load(open("/dev-server/scripts/wp-exact/routes.json")) if "redirect" not in r))'); fi
PAGES_JSON=$(printf '%s\n' "$@" | python3 -c 'import sys,json;print(json.dumps([{"path":l.strip()} for l in sys.stdin if l.strip()]))')

rm -rf /tmp/wpbuild && mkdir -p /tmp/wpbuild
tar --exclude=node_modules --exclude=.git --exclude=spec --exclude=dist -cf - -C /dev-server . | tar -xf - -C /tmp/wpbuild
ln -s /dev-server/node_modules /tmp/wpbuild/node_modules

cat > /tmp/wpbuild/vite.config.ts <<EOF
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
// WordPress media renames files with inner dots (x.png.asset-1.js -> x.png_.asset-1.js),
// The hash goes after "_" because WordPress also collapses "--" (hashes can start with "-").
// so every emitted file gets a flat, dot-free name inside one uploads folder.
const flat = (n: string) => n.replace(/\.[^.]+\$/, "").replace(/[^a-zA-Z0-9-]+/g, "-");
export default defineConfig({
  vite: {
    // Keep base "/" — TanStack turns a non-root base into the site address prefix and the browser
    // jumps to /wp-content/uploads/... after loading. deploy.mjs points the "/aw-*" file URLs at
    // the uploads folder instead (ES-module chunk imports are relative, so they follow along).
    base: "/",
    build: {
      assetsDir: "",
      sourcemap: false,
      // WordPress convention: ONE script file and ONE stylesheet per page.
      cssCodeSplit: false,
      modulePreload: false,
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
          entryFileNames: () => \`aw-app_[hash].js\`,
          chunkFileNames: (c: { name: string }) => \`aw-\${flat(c.name + ".x")}_[hash].js\`,
          assetFileNames: (a: { names?: string[]; name?: string }) =>
            \`aw-\${flat((a.names && a.names[0]) || a.name || "asset")}_[hash][extname]\`,
        },
      },
    },
  },
  tanstackStart: {
    server: { entry: "server" },
    prerender: { enabled: true, crawlLinks: false, autoStaticPathsDiscovery: false },
    pages: ${PAGES_JSON},
  },
});
EOF

cd /tmp/wpbuild
npx vite build > /tmp/wpbuild-build.log 2>&1 || { tail -40 /tmp/wpbuild-build.log; exit 1; }
grep -A40 "Prerendered" /tmp/wpbuild-build.log | head -60
echo "UPLOAD_BASE=${UPLOAD_BASE}" > /tmp/wpbuild/dist/upload-base.txt
