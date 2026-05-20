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

// Coral foil — saturated tonal sweep with an ultra-narrow glint stripe.
//
// Iteration history:
//   v1: smooth #E8826E midstop — "more gradient than shimmer"
//   v2: #FFE8DC band — letters washed out on cream
//   v3: #F4A48C band — still washed out under bright highlight
//   v4: soft #D8705C peak, #A04434 edges — too gentle, edges muddy on cream
//   v5: #F4A48C peak in 4% band — reads as smooth gradient again
//   v6 (here): the glint stripe. Bright #F8C8B0 highlight, but ONLY 2% wide
//       (49–51%). Even on cream, a 2% slice across a letter reads as a
//       light-catching glint rather than washing the whole letter. Adjacent
//       ramps go through #EB8870 (clearly coral) so the transition stays
//       saturated. Combined with `drop-shadow` below, the result reads as
//       dimensional metallic foil instead of a flat gradient.
const FOIL_GRADIENT =
  'linear-gradient(105deg, #B14E3D 0%, #C75D4A 30%, #DC715C 45%, #EB8870 49%, #F8C8B0 50%, #EB8870 51%, #DC715C 55%, #C75D4A 70%, #B14E3D 100%)';

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
  // The `filter: drop-shadow(...)` gives the foil-text actual depth — a
  // ~1px warm-coral shadow under the letterforms reads as the letters being
  // "raised" off the surface, which is what real metallic foil does as it
  // catches light. Without this, even a strong gradient reads as a flat
  // color sweep. Drop-shadow is applied via `filter` rather than
  // `text-shadow` because text-shadow renders behind the transparent
  // text fill and ends up showing the shadow on top of the gradient
  // instead of behind the letterforms.
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
        filter: 'drop-shadow(0 1.5px 1px rgba(110, 40, 30, 0.18))',
      }}
    >
      {children}
    </span>
  );
}
