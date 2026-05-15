#!/usr/bin/env node
/**
 * Fetch static TTF copies of the parent-brand display fonts for use in
 * Satori-rendered share images (next/og's ImageResponse). Satori can't
 * parse variable-font woff2, so we need static TTFs.
 *
 * Output: app/fonts/og/{Family}-{Weight}.ttf in each app that needs them.
 *
 * Run: node scripts/install-og-fonts.mjs
 */
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdir, writeFile, stat } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEST = resolve(__dirname, '../apps/realtuesday/app/fonts/og');

const UA = 'Mozilla/5.0 (X11; Linux x86_64) realtuesday-build-script';

// Static TTFs pulled from upstream Google Fonts GitHub repos. These URLs
// are stable (versioned via git refs); CDN URLs at fonts.gstatic.com are
// not — they rotate hashes as fonts are republished.
const FONTS = [
  {
    family: 'Fraunces',
    style: 'Italic',
    // 9pt optical-size cut — matches what's used inline at hero sizes.
    url:
      'https://raw.githubusercontent.com/googlefonts/fraunces/master/' +
      'fonts/static/ttf/Fraunces9pt-Italic.ttf',
    out: 'Fraunces-Italic.ttf',
  },
  {
    family: 'BricolageGrotesque',
    style: 'ExtraBold',
    url:
      'https://raw.githubusercontent.com/ateliertriay/bricolage/main/' +
      'fonts/ttf/BricolageGrotesque-ExtraBold.ttf',
    out: 'BricolageGrotesque-ExtraBold.ttf',
  },
];

async function fetchBinary(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function exists(p) {
  try {
    const s = await stat(p);
    return s.size > 5_000;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(DEST, { recursive: true });
  for (const f of FONTS) {
    const out = resolve(DEST, f.out);
    if (await exists(out)) {
      console.log(`  ✓ ${f.out} (cached)`);
      continue;
    }
    const buf = await fetchBinary(f.url);
    await writeFile(out, buf);
    console.log(`  ⤓ ${f.out} (${buf.length.toLocaleString()} bytes)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
