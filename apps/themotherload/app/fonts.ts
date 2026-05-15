import localFont from 'next/font/local';

/**
 * Self-hosted brand fonts.
 *
 * Drop the .woff2 files into `app/fonts/files/` — run `pnpm fonts:install`
 * from the repo root to fetch them, or replace with your own licensed copies.
 *
 * Each font exposes a CSS variable that's consumed by tailwind.config.ts.
 */

export const dmSerif = localFont({
  variable: '--font-dm-serif',
  display: 'swap',
  src: [
    { path: './fonts/files/DMSerifDisplay-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/files/DMSerifDisplay-Italic.woff2', weight: '400', style: 'italic' },
  ],
});

export const caveat = localFont({
  variable: '--font-caveat',
  display: 'swap',
  src: [
    { path: './fonts/files/Caveat-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/files/Caveat-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/files/Caveat-Bold.woff2', weight: '700', style: 'normal' },
  ],
});

export const fraunces = localFont({
  variable: '--font-fraunces',
  display: 'swap',
  src: [
    { path: './fonts/files/Fraunces-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/files/Fraunces-Italic.woff2', weight: '400', style: 'italic' },
    { path: './fonts/files/Fraunces-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/files/Fraunces-SemiBoldItalic.woff2', weight: '600', style: 'italic' },
  ],
});

export const bricolage = localFont({
  variable: '--font-bricolage',
  display: 'swap',
  src: [
    { path: './fonts/files/BricolageGrotesque-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/files/BricolageGrotesque-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/files/BricolageGrotesque-SemiBold.woff2', weight: '600', style: 'normal' },
  ],
});

export const jetbrains = localFont({
  variable: '--font-jetbrains',
  display: 'swap',
  src: [
    { path: './fonts/files/JetBrainsMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/files/JetBrainsMono-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/files/JetBrainsMono-SemiBold.woff2', weight: '600', style: 'normal' },
  ],
});

export const inter = localFont({
  variable: '--font-inter',
  display: 'swap',
  src: [
    { path: './fonts/files/Inter-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/files/Inter-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/files/Inter-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/files/Inter-Bold.woff2', weight: '700', style: 'normal' },
  ],
});

export const fontVariables = [
  dmSerif.variable,
  caveat.variable,
  fraunces.variable,
  bricolage.variable,
  jetbrains.variable,
  inter.variable,
].join(' ');
