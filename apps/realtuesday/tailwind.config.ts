import type { Config } from 'tailwindcss';

// Relative content paths resolve against PostCSS's CWD. `next build` and
// `next dev` both run from the app project root (where this file lives),
// so `./app/...` is correct in production (Vercel) and local dev.

/**
 * Tailwind tokens for realtuesday.co (parent brand).
 *
 * Parent-brand anchor: navy + copper foil + cream. Coral is included because
 * the home page surfaces the Motherload sub-brand card, which carries the
 * coral identity. New sub-brands add their accent here when they go live.
 *
 * Foil rules: hero text uses the SVG <FoilText /> component, not CSS
 * background-clip. The `copper-foil` gradient utility below is for non-text
 * fills only (rules, hairlines, button accents).
 */
const config: Config = {
  // Absolute paths so Tailwind finds source files regardless of which
  // directory `next dev` was launched from (preview tools, monorepo CI,
  // etc may set CWD elsewhere).
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Parent — anchors
        navy: '#1A2238',
        'navy-card': '#2A3450', // card surface on navy backgrounds
        copper: '#C97B3E',
        'deep-copper': '#A8531F',
        'bright-copper': '#E9A566', // hero eyebrow + brand-cta lighter copper
        'soft-gold': '#F5D18F',
        cream: '#F6F1E8',
        bone: '#EBE4D8',
        // Sub-brands — surfaced on home portfolio cards
        // Motherload (live)
        coral: '#C75D4A',
        'coral-light': '#E8826E',
        peach: '#FFB89E',
        blush: '#E8C5BD',
        // Mint Condition (coming soon — "a real tuesday thing" for dads)
        mint: '#A8C8A0',
        'mint-sage': '#6B8A6E',
        'mint-navy': '#1C3A52',
        'mint-paper': '#F7F5EC',
      },
      fontFamily: {
        // Parent display — bold lowercase wordmark
        display: ['var(--font-bricolage)', 'system-ui', 'sans-serif'],
        // Editorial italic counterweight
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        // Sub-brand display (Motherload card uses DM Serif Italic)
        'ml-display': ['var(--font-dm-serif)', 'Georgia', 'serif'],
        // Mint Condition sub-brand display (wordmark, headlines)
        'mc-display': ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        // Handwritten accent ("the" on Motherload card)
        script: ['var(--font-caveat)', 'cursive'],
        // Utility — labels, eyebrows, CTAs
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Responsive hero sizes (mobile → desktop)
        'hero-xl': ['clamp(72px, 24vw, 168px)', { lineHeight: '0.85', letterSpacing: '-0.06em' }],
        'hero-lg': ['clamp(56px, 18vw, 128px)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'section-xl': ['clamp(40px, 11vw, 72px)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },
      letterSpacing: {
        // 0.2em — buttons, brand-cta. Mockup CSS uses this on .cta-primary,
        // .cta-secondary, .brand-cta, .brand-audience.
        'mono-button': '0.2em',
        // 0.25em — generic small-cap labels (.brand-status, footer-right).
        'mono-label': '0.25em',
        // 0.3em — hero/section eyebrows (.hero-eyebrow, .section-eyebrow,
        // .nl-eyebrow, .news-title-eyebrow).
        'mono-eyebrow': '0.3em',
      },
      maxWidth: {
        prose: '36rem',
        content: '72rem',
      },
      backgroundImage: {
        // Copper foil gradient. For non-text fills (rules, accents) only —
        // text uses the SVG <FoilText /> component for crisp rendering.
        'copper-foil':
          'linear-gradient(110deg, #A8531F 0%, #C97B3E 20%, #E9A566 40%, #F5D18F 50%, #E9A566 60%, #C97B3E 80%, #A8531F 100%)',
        // Mirror for the Motherload sub-brand card (coral foil on the wordmark)
        'coral-foil':
          'linear-gradient(110deg, #C75D4A 0%, #E8826E 25%, #FFB89E 50%, #E8826E 75%, #C75D4A 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
