import { readdir, readFile, writeFile, stat } from "fs/promises";
import { join, extname } from "path";

const ROOTS = ["src"];
const codeExts = new Set([".ts", ".tsx", ".js", ".jsx", ".css"]);

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

// Match references inside imports/strings to assets folder ending in .jpg|.jpeg|.png
// Replace with .webp
const re = /(["'`])([^"'`]*assets\/[^"'`]+?)\.(jpe?g|png)(\?[^"'`]*)?\1/gi;

let edits = 0, files = 0;
for (const root of ROOTS) {
  for await (const file of walk(root)) {
    if (!codeExts.has(extname(file))) continue;
    const src = await readFile(file, "utf8");
    let n = 0;
    const out = src.replace(re, (m, q, path, ext, query) => {
      n++;
      return `${q}${path}.webp${query || ""}${q}`;
    });
    if (n > 0) {
      await writeFile(file, out);
      edits += n;
      files++;
      console.log(`✓ ${file}: ${n} refs`);
    }
  }
}
console.log(`\n${edits} references in ${files} files updated.`);
