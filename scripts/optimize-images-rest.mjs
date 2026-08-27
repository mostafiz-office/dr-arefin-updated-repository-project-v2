import sharp from "sharp";
import { readdir, stat, unlink, rename } from "fs/promises";
import { join, extname, basename } from "path";

const ROOT = "src/assets";
const exts = new Set([".jpg", ".jpeg", ".png"]);

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let n = 0;
for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (!exts.has(ext)) continue;
  const outPath = file.replace(/\.(jpe?g|png)$/i, ".webp");
  try {
    await sharp(file).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(outPath + ".tmp");
    await rename(outPath + ".tmp", outPath);
    if (outPath !== file) await unlink(file);
    n++;
    console.log(`✓ ${basename(file)}`);
  } catch (e) { console.error(`✗ ${file}: ${e.message}`); }
}
console.log(`\n${n} small files converted.`);
