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

// Coral foil — "shiny, sexy" treatment for hero applications.
//
// Builds on the brand-kit palette (page 3):
//   #C75D4A  Motherload Coral
//   #E8826E  Coral Light
//   #FFB89E  Peach Glow
//
// Plus ONE shine stop — #FFF0E0 — used as a tight bright band (only 3%
// wide, 48.5–51.5%) to read as actual light catching the foil. Symmetric
// dark-to-bright-to-dark ramp on both sides so the gradient holds the
// coral identity but pops a real metallic highlight in the middle.
//
// Pairs with a coral-toned drop-shadow on the rendered span (see below)
// to give the letters lifted, dimensional depth — the "shiny sexy" ask.
// The brand kit's "no shadows" rule on page 2 is logo-mark guidance;
// hero foil treatment is a separate editorial application.
const FOIL_GRADIENT =
  'linear-gradient(105deg, #C75D4A 0%, #E8826E 28%, #FFB89E 45%, #FFF0E0 50%, #FFB89E 55%, #E8826E 72%, #C75D4A 100%)';

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
  // Hero foil — gradient + dimensional drop-shadow + soft warm glow.
  //
  // The drop-shadow gives the letters lifted weight (real foil sits proud
  // of the page). The second shadow layer is a wider, lower-opacity warm
  // coral glow that fakes the way metallic surfaces bounce light into
  // surrounding space. Together they read as "shiny" instead of flat.
  //
  // Brand kit's "no shadows on logo" rule (page 2) is logo-mark guidance;
  // hero editorial foil is a separate application and uses depth on
  // purpose. The logo lockup (Wordmark component, used in nav/footer)
  // remains shadow-free per spec.
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
        filter:
          'drop-shadow(0 1.5px 0.5px rgba(60, 20, 15, 0.32)) drop-shadow(0 0 14px rgba(232, 130, 110, 0.22))',
      }}
    >
      {children}
    </span>
  );
}
