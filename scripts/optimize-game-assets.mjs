/**
 * optimize-game-assets.mjs
 * 
 * Converts all game PNG images to WebP using sharp.
 * Run: node scripts/optimize-game-assets.mjs
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const GAME_DIR = 'public/game';
const QUALITY = 82;

async function findPNGs(dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await findPNGs(fullPath));
    } else if (extname(entry.name).toLowerCase() === '.png') {
      results.push(fullPath);
    }
  }
  return results;
}

async function convert() {
  const pngs = await findPNGs(GAME_DIR);
  console.log(`Found ${pngs.length} PNG files to convert:\n`);

  let totalSaved = 0;

  for (const png of pngs) {
    const webpPath = png.replace(/\.png$/i, '.webp');
    const originalStats = await stat(png);
    const originalKB = (originalStats.size / 1024).toFixed(1);

    await sharp(png)
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(webpPath);

    const webpStats = await stat(webpPath);
    const webpKB = (webpStats.size / 1024).toFixed(1);
    const savedKB = ((originalStats.size - webpStats.size) / 1024).toFixed(1);
    totalSaved += originalStats.size - webpStats.size;

    console.log(`  ${basename(png)}: ${originalKB} KB → ${webpKB} KB (saved ${savedKB} KB)`);
  }

  console.log(`\nTotal saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
  console.log('Done! WebP files created alongside originals.');
  console.log('You can now safely delete the .png originals if desired.');
}

convert().catch(console.error);
