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

// Coral foil with a real highlight band. Previous version was a smooth 5-stop
// coral ramp — Natalie's note: "seems more gradient than shimmer." Fixed by
// concentrating the bright tone into a NARROW strip (45–55%) with sharp
// falloff on both sides, plus darker edges to give the metallic depth.
//
// On navy: the cream-peach midstop reads as a bright shine catching light.
// On cream: the midstop blends into the background, which is exactly what
// real foil does when the lit angle matches the surface — the dark coral
// edges still hold the text shape, and the "missing" middle reads as shine.
const FOIL_GRADIENT =
  'linear-gradient(105deg, #8B3D2E 0%, #B14E3D 20%, #C75D4A 38%, #F4A48C 47%, #FFE8DC 50%, #F4A48C 53%, #C75D4A 62%, #B14E3D 80%, #8B3D2E 100%)';

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
