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

// Coral foil — ANIMATED shimmer using brand-kit palette only.
//
// Real foil shimmers because, as the viewer's angle changes, the bright
// highlight moves across the surface. Static gradients can't fake this no
// matter where you place the stops; only motion reads as shimmer. The
// fix: make the gradient WIDER than the text (background-size 200%) and
// animate background-position so the bright zone sweeps across.
//
// Palette stops — all brand-kit (page 3), no off-brand shades:
//   #C75D4A  Motherload Coral
//   #E8826E  Coral Light
//   #FFB89E  Peach Glow
//
// No cream-white shine stop — that washed letters on cream backgrounds
// (the "DI" and "Fa" complaint). #FFB89E is the brightest tone and stays
// saturated enough to read against cream. On navy, FFB89E still pops
// against #1A2238 because of the luminance gap.
//
// The animation runs slowly (8s, ease-in-out) so it reads as ambient
// shimmer rather than a flashing GIF. prefers-reduced-motion users get
// the static gradient via the .motherload-foil-shimmer CSS rule in
// globals.css.
const FOIL_GRADIENT =
  'linear-gradient(105deg, #C75D4A 0%, #E8826E 30%, #FFB89E 50%, #E8826E 70%, #C75D4A 100%)';

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
  // Hero foil — animated shimmer + coral-toned dimensional shadow.
  //
  // background-size 200% × 100% makes the gradient twice the text width,
  // and the .motherload-foil-shimmer class (defined in globals.css)
  // animates background-position so the bright peach zone sweeps across
  // the letters — that's the actual shimmer motion.
  //
  // Drop-shadow uses a deep coral tone (rgba 140,60,50) so it reads as
  // warm dimension on BOTH navy and cream backgrounds. The previous
  // dark navy-toned shadow smudged ugly on cream. Glow layer drops to
  // a tighter spread so it doesn't bleed too far on cream.
  return (
    <span
      className={`motherload-foil-shimmer ${className}`}
      style={{
        fontStyle: italic ? 'italic' : 'normal',
        backgroundImage: FOIL_GRADIENT,
        backgroundSize: '200% 100%',
        backgroundPosition: '0% 50%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        paddingBottom: '0.18em',
        marginBottom: '-0.18em',
        animation: 'motherload-foil-shimmer 8s ease-in-out infinite',
        filter:
          'drop-shadow(0 1px 0.5px rgba(140, 60, 50, 0.28)) drop-shadow(0 0 8px rgba(232, 130, 110, 0.18))',
      }}
    >
      {children}
    </span>
  );
}
