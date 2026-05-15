#!/usr/bin/env node
/**
 * Extract the base64-embedded woff2 fonts from realtuesday-site-mockup.html
 * and write them into both apps' fonts/files/ directories. These are the
 * canonical font files Natalie designed against — the Google-Fonts-CDN
 * cuts from install-fonts.mjs were close but not identical (Fraunces has
 * OPSZ + SOFT axes, Bricolage has WDTH, etc).
 *
 * Run AFTER install-fonts.mjs. Files extracted here overwrite the matching
 * weight/style; any weight not present in the mockup is left alone so the
 * Google copy remains the fallback.
 *
 * Usage: node scripts/extract-mockup-fonts.mjs
 */
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MOCKUP = resolve(
  __dirname,
  '../../realtuesday-starter-kit/mockups/realtuesday-site-mockup.html',
);
const DESTS = [
  resolve(__dirname, '../apps/themotherload/app/fonts/files'),
  resolve(__dirname, '../apps/realtuesday/app/fonts/files'),
];

// Map (family + weight + style) → on-disk filename matching fonts.ts.
const FAMILY_MAP = {
  Caveat: 'Caveat',
  'DM Serif Display': 'DMSerifDisplay',
  Fraunces: 'Fraunces',
  'Bricolage Grotesque': 'BricolageGrotesque',
  'JetBrains Mono': 'JetBrainsMono',
  Inter: 'Inter',
};

const WEIGHT_NAME = {
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
};

function filenameFor(family, weight, style) {
  const base = FAMILY_MAP[family];
  if (!base) return null;
  const w = Number(weight);
  const name = WEIGHT_NAME[w] ?? String(w);
  if (style === 'italic') {
    return `${base}-${w === 400 ? 'Italic' : `${name}Italic`}.woff2`;
  }
  return `${base}-${name}.woff2`;
}

async function main() {
  const html = await readFile(MOCKUP, 'utf8');
  // Match @font-face { ... } blocks. The src is on a single very-long line.
  const blockRe = /@font-face\s*\{([^}]+)\}/g;
  const faceRe = {
    family: /font-family:\s*['"]([^'"]+)['"]/,
    style: /font-style:\s*(italic|normal)/,
    weight: /font-weight:\s*(\d+)/,
    // base64 src after `data:font/woff2;base64,` up to the closing paren
    src: /url\(data:font\/woff2;base64,([A-Za-z0-9+/=]+)\)/,
  };

  for (const d of DESTS) await mkdir(d, { recursive: true });

  let extracted = 0;
  let skipped = 0;
  for (const m of html.matchAll(blockRe)) {
    const block = m[1];
    const family = block.match(faceRe.family)?.[1];
    const style = block.match(faceRe.style)?.[1];
    const weight = block.match(faceRe.weight)?.[1];
    const b64 = block.match(faceRe.src)?.[1];
    if (!family || !style || !weight || !b64) continue;
    const filename = filenameFor(family, weight, style);
    if (!filename) {
      console.log(`  ? skip unknown family: ${family}`);
      skipped++;
      continue;
    }
    const buf = Buffer.from(b64, 'base64');
    for (const d of DESTS) await writeFile(resolve(d, filename), buf);
    console.log(`  ⤓ ${filename} (${buf.length.toLocaleString()} bytes) → ${DESTS.length} apps`);
    extracted++;
  }
  console.log(`\nExtracted ${extracted} font files, skipped ${skipped}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
