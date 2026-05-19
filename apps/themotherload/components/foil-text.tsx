/**
 * Coral foil treatment for the Motherload wordmark and accent hero words.
 *
 * Approach: CSS `background-clip: text` with a 5-stop coral linear gradient at
 * 110°. This puts ONE text node in the DOM (the children) — no SVG <text>
 * overlay, no visibility:hidden ghost span. Earlier versions duplicated the
 * text into both an SVG and a layout span for PDF-export fidelity, which
 * leaked duplicated strings into the rendered HTML ("handled.handled.",
 * "Sunday Reset.Sunday Reset.", etc.). The web-only treatment is fine with
 * background-clip: it's supported everywhere, has a clean SR experience, and
 * — critically — keeps the headline text in the DOM exactly once.
 *
 * Brand rules:
 *   • Foil is for ≥60px effective sizes only — pass `solid` below that.
 *   • One foil moment per page, max.
 *   • Don't recolor. Don't add shadows or outlines.
 */

// Coral foil — gentle tonal shift, all stays in the coral family.
//
// Iteration history:
//   v1: 5-stop ramp w/ #E8826E midstop — "more gradient than shimmer"
//   v2: narrow #FFE8DC highlight band — "DI" letters washed out on cream
//   v3: narrow #F4A48C highlight band — "r" in Motherload, "Fa" in Family
//       still washed out. Any time the bright spot landed under a letter
//       on cream, that letter disappeared.
//   v4 (here): the brightest stop is #D8705C — clearly coral, only a few
//       points lighter than the base #C75D4A. The whole gradient stays in
//       the deep-coral → light-coral band. No letter ever drops below
//       full-saturation coral, so nothing washes out on cream. The shimmer
//       reads as a soft tonal sweep, not a metallic blowout.
const FOIL_GRADIENT =
  'linear-gradient(105deg, #A04434 0%, #B14E3D 25%, #D8705C 50%, #B14E3D 75%, #A04434 100%)';

export interface FoilTextProps {
  children: string;
  /** Solid coral instead of foil — required for sizes below ~60px. */
  solid?: boolean;
  /** Defaults to italic — DM Serif Display Motherload wordmark is always italic. */
  italic?: boolean;
  /** Wrapper className. Inherits font-family/size from the surrounding heading. */
  className?: string;
}

export function FoilText({
  children,
  solid = false,
  italic = true,
  className = '',
}: FoilTextProps) {
  if (solid) {
    return (
      <span
        className={className}
        style={{
          color: '#C75D4A',
          fontStyle: italic ? 'italic' : 'normal',
        }}
      >
        {children}
      </span>
    );
  }

  // Why the padding-bottom + negative margin-bottom dance:
  // `background-clip: text` masks the background image to the element's
  // padding-box. With `leading-none` (line-height: 1) — which most headlines
  // here use to stack tightly — the box equals the font size, and any
  // descender (g, p, y, comma, ff tails) extends BELOW that box. Those
  // portions render without the gradient fill, giving the visible
  // "clipped at the baseline" look. Adding 0.18em of padding-bottom
  // extends the masking box down through the descender region; the
  // matching negative margin keeps stacking layout unchanged.
  return (
    <span
      className={className}
      style={{
        fontStyle: italic ? 'italic' : 'normal',
        backgroundImage: FOIL_GRADIENT,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        paddingBottom: '0.18em',
        marginBottom: '-0.18em',
      }}
    >
      {children}
    </span>
  );
}
