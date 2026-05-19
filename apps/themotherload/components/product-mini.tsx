import { FoilText } from './foil-text';
import type { Product } from '@/lib/products';

/**
 * Compact product card for the /products grid. Two-part stack: navy faux PDF
 * cover (4:3) on top, body with name + price + channel tag below.
 *
 * The cover is decorative — the entire card is wrapped in a single anchor
 * that links to the external Etsy/Gumroad URL, so the card is the click
 * target. The cover's text is aria-hidden because the product `name` below
 * already announces the product to screen readers.
 */
export function ProductMini({ product }: { product: Product }) {
  // Internal landing-page URLs (e.g. "/products/handled") open in the same
  // tab. External Gumroad/Etsy URLs open in a new tab.
  const isInternal = product.buyUrl.startsWith('/');
  const externalProps = isInternal
    ? {}
    : { target: '_blank' as const, rel: 'noopener noreferrer' };

  return (
    <a
      href={product.buyUrl}
      {...externalProps}
      className="group block overflow-hidden rounded-[10px] border border-coral/15 bg-[#2A3450] transition-colors hover:border-coral/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
      aria-label={`${product.name} — ${product.price}`}
    >
      {/* Cover — faux PDF cover, same treatment as the home featured-drop:
          radial coral glow upper-right, two hairline rules across the lower
          third, brand chip + sub-brand pill at top, big foil title, script
          tagline, and an issue number bottom-right. Font scales with the
          card width via clamp so the title fills the cover on desktop
          instead of floating tiny in the upper-left. */}
      <div
        aria-hidden="true"
        className="relative flex flex-col justify-between overflow-hidden border-b border-coral/20 bg-navy px-5 py-5 sm:px-7 sm:py-7"
        style={{ aspectRatio: '4 / 3' }}
      >
        {/* Decorative coral glow + hairlines */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 78% 22%, rgba(232,130,110,0.26) 0%, rgba(232,130,110,0.07) 30%, transparent 58%)',
          }}
        />
        <div className="pointer-events-none absolute inset-x-5 bottom-[34%] h-px bg-coral/25 sm:inset-x-7" />
        <div className="pointer-events-none absolute inset-x-5 bottom-[31%] h-px bg-coral/12 sm:inset-x-7" />

        {/* Top tag row — Real Tuesday wordmark + Motherload pill */}
        <div className="relative flex items-center justify-between">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-blush sm:text-[10px]">
            real tuesday
          </span>
          <span className="rounded-full bg-cream px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.22em] text-navy sm:text-[9px]">
            the Motherload
          </span>
        </div>

        {/* Title block + optional tagline */}
        <div className="relative">
          <h3 className="font-ml-display italic leading-[0.98] text-cream text-[clamp(30px,5.5vw,56px)]">
            {product.coverTitleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
            <FoilText
              solid
              italic
              className="block font-ml-display font-normal leading-[0.98]"
            >
              {product.coverAccent}
            </FoilText>
          </h3>
          {product.coverTagline && (
            <p
              className="mt-2 inline-block font-script text-[clamp(14px,1.5vw,20px)] font-semibold text-coral-light"
              style={{ transform: 'rotate(-1deg)' }}
            >
              {product.coverTagline}
            </p>
          )}
        </div>

        {/* Issue number — bottom-right SKU. */}
        <p className="relative text-right font-mono text-[9px] font-semibold uppercase tracking-[0.3em] text-coral/70 sm:text-[10px]">
          no. {product.coverNumber} · 2026
        </p>
      </div>

      {/* Body — Variant A: price in coral-light to add a warm hit without
          stealing the cover. The channel badge ("→ GUMROAD") was dropped
          per Natalie — every card now routes through its own landing page
          rather than dumping the visitor onto Etsy/Gumroad cold. The CTA
          label "Check it out →" keeps the bottom-right slot weighted. */}
      <div className="px-[18px] py-4">
        <p className="font-serif text-[16px] font-medium italic leading-tight text-cream">
          {product.name}
        </p>
        {product.subtitle && (
          <p className="mt-1 font-body text-[12px] leading-snug text-blush/85">
            {product.subtitle}
          </p>
        )}
        <div className="mt-2.5 flex items-center justify-between">
          <span className="font-serif text-[16px] italic text-coral-light">{product.price}</span>
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-coral-light transition-transform group-hover:translate-x-0.5">
            Check it out &rarr;
          </span>
        </div>
      </div>
    </a>
  );
}
