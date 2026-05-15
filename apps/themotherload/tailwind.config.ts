import type { Config } from 'tailwindcss';

/**
 * Tailwind tokens for the Real Tuesday platform.
 * Parent-brand tokens (navy, copper, cream, Fraunces, Bricolage Grotesque, etc.)
 * are shared with all apps. Motherload sub-brand adds coral + DM Serif + Caveat.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Real Tuesday (parent) — anchors
        navy: '#1A2238',
        copper: '#C97B3E',
        'deep-copper': '#A8531F',
        'soft-gold': '#F5D18F',
        cream: '#F6F1E8',
        bone: '#EBE4D8',
        // Motherload (sub-brand) — accents
        coral: '#C75D4A',
        'coral-light': '#E8826E',
        peach: '#FFB89E',
        blush: '#E8C5BD',
      },
      fontFamily: {
        // Real Tuesday parent display
        display: ['var(--font-bricolage)', 'system-ui', 'sans-serif'],
        // Motherload display (italic wordmark)
        'ml-display': ['var(--font-dm-serif)', 'Georgia', 'serif'],
        // Handwritten warm accent
        script: ['var(--font-caveat)', 'cursive'],
        // Editorial italic counterweight
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        // Utility — labels + UI
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Responsive hero sizes (mobile → desktop)
        'hero-xl': ['clamp(56px, 16vw, 128px)', { lineHeight: '0.92', letterSpacing: '-0.01em' }],
        'hero-lg': ['clamp(48px, 12vw, 96px)', { lineHeight: '0.95', letterSpacing: '-0.01em' }],
        'eyebrow-script': ['clamp(20px, 5vw, 28px)', { lineHeight: '1' }],
        'the-script': ['clamp(34px, 9vw, 56px)', { lineHeight: '1' }],
      },
      letterSpacing: {
        'mono-label': '0.25em',
        'mono-eyebrow': '0.3em',
      },
      maxWidth: {
        prose: '36rem',
        content: '72rem',
      },
      backgroundImage: {
        // Coral foil for buttons, hairlines, the M badge fill.
        // Hero TEXT must use <FoilText /> (SVG) — this CSS gradient is for non-text fills only.
        'coral-foil':
          'linear-gradient(110deg, #C75D4A 0%, #E8826E 25%, #FFB89E 50%, #E8826E 75%, #C75D4A 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
