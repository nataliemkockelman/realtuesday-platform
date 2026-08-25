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
 *
 * Accessibility / SEO note (why the DOM looks the way it does):
 * The word is rendered exactly ONCE in the server HTML — as a real text node
 * inside the base <span>. That single copy is what crawlers read and what
 * screen readers announce. The SVG <text> that paints the copper foil is a
 * visual duplicate of the same glyphs; it is marked aria-hidden AND its text
 * is injected on the client only (after mount), so it never appears in the
 * server-rendered markup. This avoids the "realTuesdayTuesday" double-text bug
 * without hiding a duplicate purely with CSS. The base <span> carries a solid
 * fallback color so the word is visible (and correctly sized) before/without
 * JS; once mounted, the foil overlays it pixel-for-pixel.
 */
'use client';

import { useEffect, useId, useState } from 'react';

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

/**
 * Solid fallback color per variant, used for the single real text node. It's a
 * representative mid-tone from each gradient, so before the foil overlays (no
 * JS, or the brief pre-mount moment) the word reads as intentional brand copper
 * rather than blank, and any sub-pixel edge peeking out from under the foil
 * blends into the gradient.
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
  const gradId = useId();
  // The foil <text> is injected only after mount so it never lands in the
  // server-rendered HTML — the base <span> below is the single SSR text copy.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <span
      className={`relative inline-block leading-[0.85] ${className}`}
      title={ariaLabel && ariaLabel !== children ? ariaLabel : undefined}
    >
      {/* The one real text node: accessible, crawlable, and it reserves the
          layout box the overlaid SVG sizes itself against. Not aria-hidden. */}
      <span className="whitespace-pre" style={{ color: BASE_COLOR[variant] }}>
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
          {mounted ? children : ''}
        </text>
      </svg>
    </span>
  );
}
