#!/usr/bin/env node
/**
 * Download brand fonts (woff2) into apps/themotherload/app/fonts/files/.
 *
 * Fonts are checked into the repo and served from the Next.js bundle — no
 * runtime Google Fonts CDN. All fonts here are open source (OFL or Apache).
 *
 * Usage:  pnpm fonts:install   (from the repo root)
 */

import { fileURLToPath } from 'node:url';
import { dirname, resolve, basename } from 'node:path';
import { mkdir, writeFile, stat } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Both apps self-host the same brand font files. realtuesday.co needs the
// heavier Bricolage 700/800 + JetBrains 700 for the parent-brand hero;
// themotherload uses the lighter weights. We install the full set into both
// so the next/font/local imports in each app stay self-contained.
const DESTS = [
  resolve(__dirname, '../apps/themotherload/app/fonts/files'),
  resolve(__dirname, '../apps/realtuesday/app/fonts/files'),
];

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const FAMILIES = [
  { spec: 'DM+Serif+Display:ital,wght@0,400;1,400', base: 'DMSerifDisplay' },
  { spec: 'Caveat:wght@400;600;700', base: 'Caveat' },
  { spec: 'Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600', base: 'Fraunces' },
  { spec: 'Bricolage+Grotesque:wght@400;500;600;700;800', base: 'BricolageGrotesque' },
  { spec: 'JetBrains+Mono:wght@400;500;600;700', base: 'JetBrainsMono' },
  { spec: 'Inter:wght@400;500;600;700', base: 'Inter' },
];

const WEIGHT_NAME = {
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
};

async function fileSize(path) {
  try {
    return (await stat(path)).size;
  } catch {
    return -1;
  }
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.text();
}

async function fetchBinary(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

function parseFontFaceBlocks(css) {
  const blocks = css.split(/@font-face\s*\{/).slice(1);
  return blocks
    .map((b) => b.slice(0, b.indexOf('}')))
    .map((b) => {
      const weight = b.match(/font-weight:\s*(\d+)/)?.[1];
      const styleM = b.match(/font-style:\s*(italic|normal)/);
      const urlM = b.match(/url\((https:\/\/[^)]+\.woff2)\)/);
      const rangeM = b.match(/unicode-range:\s*([^;]+);/);
      if (!weight || !styleM || !urlM) return null;
      const range = (rangeM?.[1] ?? '').trim();
      // The basic Latin subset is the only one most English sites need.
      // Google's CSS lumps everything into U+0000-00FF for that subset, and
      // tags the block immediately preceding it with /* latin */.
      const isLatin = /U\+0000-00FF/i.test(range);
      return {
        weight: Number(weight),
        style: styleM[1],
        url: urlM[1],
        isLatin,
      };
    })
    .filter(Boolean);
}

async function installFamily({ spec, base }) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${spec}&display=swap`;
  const css = await fetchText(cssUrl);
  const faces = parseFontFaceBlocks(css);

  // Google returns multiple @font-face blocks per weight/style (one per
  // unicode-range subset). For English-language sites we only need the
  // basic-Latin subset (U+0000-00FF). Fall back to the last block per
  // weight/style if no Latin one is tagged (older Google CSS variants).
  const byKey = new Map();
  for (const f of faces) {
    const key = `${f.weight}-${f.style}`;
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, f);
    } else if (f.isLatin && !existing.isLatin) {
      byKey.set(key, f);
    } else if (!existing.isLatin) {
      // overwrite — last block is basic latin in legacy responses
      byKey.set(key, f);
    }
  }
  const unique = Array.from(byKey.values()).sort(
    (a, b) => a.weight - b.weight || a.style.localeCompare(b.style),
  );

  console.log(`→ ${base} (${unique.length} files)`);
  for (const f of unique) {
    const weightName = WEIGHT_NAME[f.weight] ?? String(f.weight);
    // Conventional naming: 400 italic → just "Italic", not "RegularItalic".
    const filename =
      f.style === 'italic'
        ? `${base}-${f.weight === 400 ? 'Italic' : `${weightName}Italic`}.woff2`
        : `${base}-${weightName}.woff2`;

    // Fetch once, write to every destination. Skip the fetch entirely if
    // every destination already has the file.
    const targets = DESTS.map((d) => resolve(d, filename));
    const sizes = await Promise.all(targets.map(fileSize));
    const allCached = sizes.every((s) => s > 5_000);
    if (allCached) {
      console.log(`  ✓ ${filename} (cached in ${DESTS.length} apps)`);
      continue;
    }
    const buf = await fetchBinary(f.url);
    for (let i = 0; i < targets.length; i++) {
      if (sizes[i] > 5_000) continue;
      await writeFile(targets[i], buf);
    }
    console.log(`  ⤓ ${filename} (${buf.length.toLocaleString()} bytes)`);
  }
}

async function main() {
  for (const d of DESTS) await mkdir(d, { recursive: true });
  console.log(`Installing brand fonts →`);
  for (const d of DESTS) console.log(`  · ${d}`);
  console.log('');
  for (const fam of FAMILIES) {
    try {
      await installFamily(fam);
    } catch (err) {
      console.error(`  ✗ ${fam.base}: ${err.message}`);
      process.exitCode = 1;
    }
  }
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
