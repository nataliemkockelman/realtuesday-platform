import { FoilText } from './foil-text';

/**
 * Featured product card — lifted navy panel with a faux PDF-cover preview
 * on top, then product name + description + price + buy CTA.
 *
 * The cover preview is rendered as styled HTML/SVG (NOT an <Image>) for the
 * MVP, since it lets us reuse the brand type system without needing a real
 * asset preview from Supabase Storage. When the dashboard's PDF generator
 * starts producing real cover PNGs, swap the cover block for `next/image`
 * pointing at the asset's preview_path.
 *
 * Per brand kit: foil treatment is for hero moments only — the cover's
 * accent word ("Cheat") sits at ~28px effective size, well below the 60px
 * threshold, so it gets solid coral instead of the gradient.
 */

export interface FeaturedProductProps {
  /** Brand chip text — top-left of the cover ("real tuesday"). */
  brandLabel: string;
  /** Pill text — top-right of the cover ("the motherload"). */
  pillLabel: string;
  /** Cover title lines — last word gets the foil/coral accent. */
  coverTitleLines: string[];
  coverAccent: string;
  /** Caveat tagline at the bottom of the cover ("stop screenshotting"). */
  coverTagline: string;
  /** Product name shown below the cover. */
  name: string;
  /** Product description — Inter body copy. */
  description: string;
  /** Display price ("$12"). */
  price: string;
  /** External Etsy/Gumroad URL the buy button links to. */
  buyUrl: string;
  /** Button label ("Get on Gumroad"). */
  buyLabel: string;
  /** Optional ribbon text shown as a rotated foil sticker on the cover. */
  ribbon?: string;
}

export function ProductCard(props: FeaturedProductProps) {
  return (
    <article className="relative rounded-xl border border-coral/20 bg-[#2A3450] p-6">
      {/* Foiled coral ribbon — peeks off the top-right corner of the entire
          card (NOT the cover). Pulled out of the CoverPreview because it was
          colliding with the "the Motherload" pill at top-right of the cover
          on mobile. Sitting on the card edge instead gives both elements
          breathing room and reads more like a real sticker on the package. */}
      {props.ribbon && <FoilRibbon text={props.ribbon} />}

      <CoverPreview
        brandLabel={props.brandLabel}
        pillLabel={props.pillLabel}
        titleLines={props.coverTitleLines}
        accent={props.coverAccent}
        tagline={props.coverTagline}
      />

      <h3 className="mb-1.5 font-ml-display text-[22px] italic leading-tight text-cream">
        {props.name}
      </h3>
      <p className="mb-4 font-body text-[13px] leading-normal text-blush">{props.description}</p>

      <div className="flex items-center justify-between border-t border-blush/15 pt-3.5">
        <span className="font-serif text-[22px] italic text-coral-light">{props.price}</span>
        {/* Plain <a> instead of next/link — buyUrl can be either an internal
            landing path (e.g. /products/handled) or an external Etsy/Gumroad
            URL. The internal/external sniff sets target/rel accordingly so
            internal navigation stays in-tab. */}
        <a
          href={props.buyUrl}
          {...(props.buyUrl.startsWith('/')
            ? {}
            : { target: '_blank', rel: 'noopener noreferrer' })}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-mono-label text-coral-light transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A3450]"
        >
          {props.buyLabel}
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </article>
  );
}

interface CoverPreviewProps {
  brandLabel: string;
  pillLabel: string;
  titleLines: string[];
  accent: string;
  tagline: string;
}

function CoverPreview({ brandLabel, pillLabel, titleLines, accent, tagline }: CoverPreviewProps) {
  return (
    <div
      // 4:3 instead of 3:4 — at desktop container width (~640px) a 3:4
      // cover was ~850px tall and pushed the title below the fold. The
      // squat ratio puts the whole card on screen in one viewport.
      className="relative mb-4 flex flex-col justify-between overflow-hidden rounded-lg border border-coral/30 bg-navy p-6 sm:p-8"
      style={{ aspectRatio: '4 / 3' }}
      aria-hidden="true"
    >
      {/* Decorative cover treatments — subtle radial coral glow in the
          upper-right, a faint coral hairline grid across the bottom third,
          and the big mono SKU. None of this is informative; everything is
          aria-hidden via the parent. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 78% 22%, rgba(232,130,110,0.28) 0%, rgba(232,130,110,0.08) 28%, transparent 55%)',
        }}
      />
      {/* Hairlines pulled — content height varies between covers and they
          landed in different visual positions per card, which read as a bug.
          The radial glow + SKU do the editorial work alone. */}

      {/* Top tag row — brand chip + sub-brand pill */}
      <div className="relative flex items-center justify-between">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-blush sm:text-[11px]">
          {brandLabel}
        </span>
        <span className="rounded-full bg-cream px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-navy sm:text-[10px]">
          {pillLabel}
        </span>
      </div>

      {/* Title block + tagline. Font scales with viewport via clamp so the
          cover actually fills its container on desktop — at 600px wide,
          26px Motherload looked like a postage stamp in a paddock. */}
      <div className="relative">
        <h4 className="font-ml-display italic leading-[0.95] text-cream text-[clamp(40px,6.5vw,76px)]">
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
          <FoilText
            solid
            italic
            className="mt-1 block font-ml-display font-normal leading-[0.95]"
          >
            {accent}
          </FoilText>
        </h4>
        <p
          className="mt-4 inline-block font-script text-[clamp(18px,2vw,28px)] font-semibold text-coral-light"
          style={{ transform: 'rotate(-1deg)' }}
        >
          {tagline}
        </p>
      </div>

      {/* Bottom-right SKU — adds visual weight without saying anything,
          matches the editorial cover treatment from the brand kit. */}
      <p className="relative mt-4 text-right font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-coral/70 sm:text-[11px]">
        no. 01 · 2026
      </p>
    </div>
  );
}

/**
 * Standalone foil ribbon — rotated cream sticker with coral-foil text,
 * positioned to peek off the top-right corner of its parent card. Parent
 * MUST be `relative` for the absolute positioning to anchor correctly.
 *
 * The foil gradient here is duplicated from FoilText's FOIL_GRADIENT constant
 * (couldn't import it without exporting). If the foil palette changes in
 * foil-text.tsx, update this string to match.
 */
function FoilRibbon({ text }: { text: string }) {
  return (
    <div
      className="pointer-events-none absolute right-4 top-0 z-20 -translate-y-1/2 rounded-sm bg-cream px-3 py-1.5 shadow-[0_3px_10px_rgba(0,0,0,0.22)]"
      style={{ transform: 'translateY(-50%) rotate(8deg)' }}
      aria-hidden="true"
    >
      <span
        className="block font-mono text-[10px] font-bold uppercase tracking-[0.22em] sm:text-[11px]"
        style={{
          backgroundImage:
            'linear-gradient(105deg, #A04434 0%, #B14E3D 25%, #D8705C 50%, #B14E3D 75%, #A04434 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        }}
      >
        {text}
      </span>
    </div>
  );
}
