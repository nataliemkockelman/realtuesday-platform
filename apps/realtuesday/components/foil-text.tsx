/**
 * Copper foil text — a single text node with a CSS gradient clipped to the
 * glyphs (background-clip: text). This matches the original mockup (a CSS
 * gradient on `.hero-tuesday`) and, crucially, renders the word exactly ONCE.
 *
 * Why this shape (history): an earlier version painted the word twice — a real
 * HTML text node plus an SVG <text> overlay carrying the gradient — and relied
 * on the two copies aligning pixel-for-pixel. HTML and SVG measure font metrics
 * independently, so the overlay drifted between pages and renders, producing a
 * visible "ghost" double of the word (seen on /start). A single clipped text
 * node cannot misalign with itself, so the ghosting is gone by construction.
 *
 * Accessibility / SEO: the word is a normal text node — crawlable and read by
 * screen readers as-is. A solid `color` fallback (BASE_COLOR) means that in the
 * rare browser without -webkit-text-fill-color support the word still shows as
 * brand copper instead of disappearing.
 *
 * Gradient stops (.hero-tuesday), 110deg sweep:
 *   #a8531f 0%, #c97b3e 20%, #e9a566 40%, #f5d18f 50%,
 *   #e9a566 60%, #c97b3e 80%, #a8531f 100%
 */
import type { CSSProperties } from 'react';

type FoilVariant = 'copper' | 'copper-tight' | 'coral';

interface FoilTextProps {
  /** Word to render. Keep it short — this is for hero/headline use. */
  children: string;
  /** Visual variant. `copper` is the hero gradient (lighter), `copper-tight` is the section-title gradient (slightly darker midpoints). */
  variant?: FoilVariant;
  /** Font CSS class (e.g. `font-serif italic`). Pass the same Tailwind classes you'd use on a normal <span>. */
  className?: string;
  /** Optional aria-label override. Defaults to the children text. */
  ariaLabel?: string;
}

const STOPS: Record<FoilVariant, Array<{ offset: string; color: string }>> = {
  // .hero-tuesday — 7-stop, brighter midpoint (#f5d18f at 50%)
  copper: [
    { offset: '0%', color: '#A8531F' },
    { offset: '20%', color: '#C97B3E' },
    { offset: '40%', color: '#E9A566' },
    { offset: '50%', color: '#F5D18F' },
    { offset: '60%', color: '#E9A566' },
    { offset: '80%', color: '#C97B3E' },
    { offset: '100%', color: '#A8531F' },
  ],
  // .section-title em / .nl-title em — 5-stop, denser copper midband
  'copper-tight': [
    { offset: '0%', color: '#A8531F' },
    { offset: '30%', color: '#C97B3E' },
    { offset: '50%', color: '#F5D18F' },
    { offset: '70%', color: '#C97B3E' },
    { offset: '100%', color: '#A8531F' },
  ],
  // .brand-coral — Motherload sub-brand wordmark
  coral: [
    { offset: '0%', color: '#C75D4A' },
    { offset: '25%', color: '#E8826E' },
    { offset: '50%', color: '#FFB89E' },
    { offset: '75%', color: '#E8826E' },
    { offset: '100%', color: '#C75D4A' },
  ],
};

/**
 * Solid fallback color per variant, applied via `color`. Shown only when
 * -webkit-text-fill-color: transparent isn't honored; otherwise the gradient
 * fill wins. Keeps the word visible-and-on-brand in that edge case.
 */
const BASE_COLOR: Record<FoilVariant, string> = {
  copper: '#C97B3E',
  'copper-tight': '#C97B3E',
  coral: '#E8826E',
};

export function FoilText({
  children,
  variant = 'copper',
  className = '',
  ariaLabel,
}: FoilTextProps) {
  const gradient = `linear-gradient(110deg, ${STOPS[variant]
    .map((s) => `${s.color} ${s.offset}`)
    .join(', ')})`;

  const style: CSSProperties = {
    color: BASE_COLOR[variant],
    backgroundImage: gradient,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <span
      className={`inline-block ${className}`}
      style={style}
      aria-label={ariaLabel && ariaLabel !== children ? ariaLabel : undefined}
    >
      {children}
    </span>
  );
}
