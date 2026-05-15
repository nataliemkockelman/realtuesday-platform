/**
 * SVG-based copper foil text. Renders the word as <text> inside an <svg>
 * with a linearGradient fill — sharper than CSS background-clip in
 * screenshots, print, and Safari edge cases.
 *
 * Mockup gradient stops (.hero-tuesday):
 *   #a8531f 0%, #c97b3e 20%, #e9a566 40%, #f5d18f 50%,
 *   #e9a566 60%, #c97b3e 80%, #a8531f 100%
 * Angle: 110deg → roughly translates to gradient vector (cos20°, sin20°)
 * over the bounding box. We use objectBoundingBox so the gradient scales
 * to whatever text size the consumer renders.
 *
 * Each instance gets a unique gradient id (via React useId) so multiple
 * FoilText components on a page don't collide.
 */
'use client';

import { useId } from 'react';

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
 * 110deg gradient → vector from (x1, y1) to (x2, y2) in normalized
 * objectBoundingBox coordinates. CSS 110deg measures clockwise from
 * "up", so the vector points down-and-right. Using cos/sin of 20° from
 * the horizontal works out to roughly (1, 0.36) — flatter than 45°,
 * which gives the foil that horizontal-sweep look.
 */
const GRADIENT_VECTOR = { x1: '0%', y1: '20%', x2: '100%', y2: '80%' };

export function FoilText({
  children,
  variant = 'copper',
  className = '',
  ariaLabel,
}: FoilTextProps) {
  const gradId = useId();
  return (
    <span
      className={`relative inline-block leading-[0.85] ${className}`}
      aria-label={ariaLabel ?? children}
    >
      {/* Invisible text reserves layout space so the SVG can size itself. */}
      <span aria-hidden className="invisible whitespace-pre">
        {children}
      </span>
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradId} {...GRADIENT_VECTOR}>
            {STOPS[variant].map((s) => (
              <stop key={s.offset} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>
        </defs>
        <text
          x="0"
          y="0"
          dominantBaseline="text-before-edge"
          fill={`url(#${gradId})`}
          // Inherit the rendered font from the parent <span> so the
          // consumer's Tailwind classes (font-serif italic, etc) flow
          // through. We must restate fontSize because <text> doesn't
          // inherit it cleanly across all browsers.
          style={{
            fontFamily: 'inherit',
            fontStyle: 'inherit',
            fontWeight: 'inherit',
            fontSize: 'inherit',
            letterSpacing: 'inherit',
          }}
        >
          {children}
        </text>
      </svg>
    </span>
  );
}
