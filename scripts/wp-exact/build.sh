#!/usr/bin/env bash
# Dr. Arefin: build the real site (same code as the preview) as one HTML file per route.
# This project is React Router + Vite (client-rendered), so instead of TanStack prerender we:
#   1. vite build in /tmp/wpbuild (single JS + single CSS, flat aw-* names, base "/")
#   2. serve it and snapshot each route's rendered HTML with Playwright
# Usage: bash scripts/wp-exact/build.sh "/" "/about/"   (or --all for routes.json)
# Env: ROUTER_BASE=/staging (default, from WP_STAGING_URL) — use ROUTER_BASE= (empty) before the push.
set -euo pipefail
ROUTER_BASE="${ROUTER_BASE-$(node -e 'try{console.log(new URL(process.env.WP_STAGING_URL).pathname.replace(/\/+$/,""))}catch{console.log("/staging")}')}"
UPLOAD_BASE="${WP_UPLOAD_BASE:-${ROUTER_BASE}/wp-content/uploads/$(date -u +%Y/%m)/}"
if [ "${1:-}" = "--all" ]; then set -- $(python3 -c 'import json;print(" ".join(r["route"] for r in json.load(open("/dev-server/scripts/wp-exact/routes.json")) if "redirect" not in r))'); fi
[ $# -gt 0 ] || { echo "pass routes or --all"; exit 1; }

rm -rf /tmp/wpbuild && mkdir -p /tmp/wpbuild
tar --exclude=node_modules --exclude=.git --exclude=spec --exclude=dist --exclude=_archive --exclude=archive -cf - -C /dev-server . | tar -xf - -C /tmp/wpbuild
ln -s /dev-server/node_modules /tmp/wpbuild/node_modules

cat > /tmp/wpbuild/vite.wp.config.ts <<'EOF'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
const flat = (n: string) => n.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-]+/g, "-");
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  base: "/",
  build: {
    outDir: "dist/client",
    assetsDir: "",
    sourcemap: false,
    cssCodeSplit: false,
    modulePreload: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        entryFileNames: "aw-app_[hash].js",
        assetFileNames: (a: { names?: string[]; name?: string }) =>
          `aw-${flat((a.names && a.names[0]) || a.name || "asset")}_[hash][extname]`,
      },
    },
  },
});
EOF

cd /tmp/wpbuild
VITE_ROUTER_BASENAME="$ROUTER_BASE" npx vite build -c vite.wp.config.ts > /tmp/wpbuild-build.log 2>&1 || { tail -40 /tmp/wpbuild-build.log; exit 1; }
echo "UPLOAD_BASE=${UPLOAD_BASE}" > /tmp/wpbuild/dist/upload-base.txt
echo "ROUTER_BASE=${ROUTER_BASE}" > /tmp/wpbuild/dist/router-base.txt
python3 /dev-server/scripts/wp-exact/snapshot.py "$ROUTER_BASE" "$@"
