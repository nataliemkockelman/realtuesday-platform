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
}

export function ProductCard(props: FeaturedProductProps) {
  return (
    <article className="rounded-xl border border-coral/20 bg-[#2A3450] p-6">
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
        <span className="font-serif text-[22px] italic text-cream">{props.price}</span>
        {/* External link — Etsy/Gumroad sit outside the typed-routes map,
            so we use a plain <a> rather than next/link. */}
        <a
          href={props.buyUrl}
          target="_blank"
          rel="noopener noreferrer"
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
      className="mb-4 flex flex-col justify-between rounded-lg border border-coral/30 bg-navy p-5"
      style={{ aspectRatio: '3 / 4' }}
      aria-hidden="true"
    >
      {/* Top tag row — brand chip + sub-brand pill */}
      <div className="flex items-center justify-between">
        <span className="font-serif text-[8px] italic uppercase tracking-[0.15em] text-blush">
          {brandLabel}
        </span>
        <span className="rounded-full bg-cream px-1.5 py-[3px] font-mono text-[7px] font-semibold uppercase tracking-[0.2em] text-navy">
          {pillLabel}
        </span>
      </div>

      {/* Title block + tagline at the bottom */}
      <div>
        <h4 className="font-ml-display text-[26px] italic leading-none text-cream">
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
          <FoilText
            solid
            italic
            className="mt-1 block font-ml-display text-[26px] font-normal leading-none"
          >
            {accent}
          </FoilText>
        </h4>
        <p
          className="mt-3 inline-block font-script text-[13px] font-semibold text-coral-light"
          style={{ transform: 'rotate(-1deg)' }}
        >
          {tagline}
        </p>
      </div>
    </div>
  );
}
