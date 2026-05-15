import { useId } from 'react';

/**
 * Coral foil treatment for the Motherload wordmark and accent hero words.
 *
 * Renders SVG <text> with a 5-stop linear gradient fill (110°) per the brand
 * kit. Survives PDF export and cross-browser background-clip quirks.
 *
 * Approach: a hidden span establishes the layout box at the right typographic
 * width, then an absolutely-positioned SVG overlays a <text> element with
 * the same font-family/size/style and the gradient fill. Screen readers see
 * the actual text in the span, not the decorative SVG.
 *
 * Brand rules:
 *   • Foil is for ≥60px effective sizes only — pass `solid` below that.
 *   • One foil moment per page, max.
 *   • Don't recolor. Don't add shadows or outlines.
 */

const FOIL_STOPS = [
  { offset: '0%', color: '#C75D4A' },
  { offset: '25%', color: '#E8826E' },
  { offset: '50%', color: '#FFB89E' },
  { offset: '75%', color: '#E8826E' },
  { offset: '100%', color: '#C75D4A' },
];

// 110° CSS gradient ≈ x: 0→100%, y: 0→34% (slight downward tilt left to right).
const GRADIENT_VECTOR = { x1: '0%', y1: '0%', x2: '100%', y2: '34%' };

export interface FoilTextProps {
  children: string;
  /** Solid coral instead of foil — required for sizes below ~60px. */
  solid?: boolean;
  /** Defaults to italic — DM Serif Display Motherload wordmark is always italic. */
  italic?: boolean;
  /**
   * Wrapper className. The wrapper inherits font-family/size from the
   * surrounding heading; both the layout span and the SVG <text> use it.
   */
  className?: string;
}

export function FoilText({
  children,
  solid = false,
  italic = true,
  className = '',
}: FoilTextProps) {
  const gradientId = useId();
  const fill = solid ? '#C75D4A' : `url(#${gradientId})`;

  return (
    <span
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        fontStyle: italic ? 'italic' : 'normal',
      }}
    >
      {/* Layout span — invisible to sight, present for screen readers and
          for sizing the SVG overlay to match the natural text dimensions. */}
      <span style={{ visibility: 'hidden', whiteSpace: 'nowrap' }}>{children}</span>
      {/* Decorative gradient overlay */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
          pointerEvents: 'none',
        }}
      >
        {!solid && (
          <defs>
            <linearGradient id={gradientId} {...GRADIENT_VECTOR}>
              {FOIL_STOPS.map((s) => (
                <stop key={s.offset} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
          </defs>
        )}
        <text
          x="0"
          y="0"
          dy="0.84em"
          fill={fill}
          fontFamily="inherit"
          fontSize="1em"
          fontStyle={italic ? 'italic' : 'normal'}
          fontWeight="inherit"
        >
          {children}
        </text>
      </svg>
    </span>
  );
}
