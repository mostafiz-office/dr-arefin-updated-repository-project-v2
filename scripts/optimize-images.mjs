import sharp from "sharp";
import { readdir, stat, unlink, rename } from "fs/promises";
import { join, extname, basename, dirname } from "path";

const ROOT = "src/assets";
const MAX_W = 1600;
const QUALITY = 80;
const MIN_BYTES = 200 * 1024; // only optimize files > 200KB
const exts = new Set([".jpg", ".jpeg", ".png"]);

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let totalBefore = 0, totalAfter = 0, converted = 0, deleted = 0;

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (ext === ".dng") {
    const sz = (await stat(file)).size;
    await unlink(file);
    deleted++;
    totalBefore += sz;
    console.log(`🗑️  deleted ${file} (${(sz / 1024).toFixed(0)}KB)`);
    continue;
  }
  if (!exts.has(ext)) continue;
  const sz = (await stat(file)).size;
  if (sz < MIN_BYTES) continue;

  const isPng = ext === ".png";
  const outPath = file.replace(/\.(jpe?g|png)$/i, ".webp");
  try {
    const meta = await sharp(file).metadata();
    let pipeline = sharp(file).rotate();
    if (meta.width && meta.width > MAX_W) {
      pipeline = pipeline.resize({ width: MAX_W, withoutEnlargement: true });
    }
    await pipeline.webp({ quality: QUALITY, effort: 5 }).toFile(outPath + ".tmp");
    const newSz = (await stat(outPath + ".tmp")).size;
    // Replace original: write .webp, delete original
    await rename(outPath + ".tmp", outPath);
    if (outPath !== file) await unlink(file);
    totalBefore += sz;
    totalAfter += newSz;
    converted++;
    console.log(
      `✓ ${basename(file)} → ${basename(outPath)}  ${(sz / 1024).toFixed(0)}KB → ${(newSz / 1024).toFixed(0)}KB  (-${(((sz - newSz) / sz) * 100).toFixed(0)}%)`
    );
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
}

console.log(`\n=== Summary ===`);
console.log(`Converted: ${converted} files`);
console.log(`Deleted (.dng): ${deleted} files`);
console.log(`Before: ${(totalBefore / 1024 / 1024).toFixed(1)}MB`);
console.log(`After:  ${(totalAfter / 1024 / 1024).toFixed(1)}MB`);
console.log(`Saved:  ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)}MB`);
