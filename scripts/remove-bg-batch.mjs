/**
 * Batch background removal for all coach images.
 * Input:  public/coaches/
 * Output: public/coaches-nobg/  (transparent PNG files)
 *
 * Usage: node scripts/remove-bg-batch.mjs
 */

import { removeBackground } from "@imgly/background-removal-node";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INPUT_DIR = path.join(ROOT, "public", "coaches");
const OUTPUT_DIR = path.join(ROOT, "public", "coaches-nobg");

// Ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Grab all images from input folder
const files = fs.readdirSync(INPUT_DIR).filter((f) =>
  /\.(webp|jpg|jpeg|png)$/i.test(f)
);

console.log(`\nFound ${files.length} images to process:\n`);
files.forEach((f) => console.log(`  • ${f}`));
console.log("\n⏳ Starting background removal (first run downloads ~30MB model)...\n");

for (const file of files) {
  const inputPath = path.join(INPUT_DIR, file);
  const baseName = path.basename(file, path.extname(file));
  const outputPath = path.join(OUTPUT_DIR, `${baseName}.png`);

  // Skip if already processed
  if (fs.existsSync(outputPath)) {
    console.log(`  ✅ Already done: ${baseName}.png — skipping`);
    continue;
  }

  console.log(`  🔄 Processing: ${file} ...`);
  try {
    const blob = await removeBackground(pathToFileURL(inputPath).href);
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync(outputPath, buffer);
    console.log(`  ✅ Saved: ${baseName}.png`);
  } catch (err) {
    console.error(`  ❌ Failed: ${file}`, err.message);
  }
}

console.log("\n🎉 Done! All images saved to public/coaches-nobg/\n");
