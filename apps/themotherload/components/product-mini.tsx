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
  return (
    <a
      href={product.buyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-[10px] border border-coral/15 bg-[#2A3450] transition-colors hover:border-coral/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
      aria-label={`${product.name} — ${product.price} on ${product.channel}`}
    >
      {/* Cover */}
      <div
        aria-hidden="true"
        className="flex flex-col justify-center border-b border-coral/20 bg-navy px-4 py-5"
        style={{ aspectRatio: '4 / 3' }}
      >
        <h3 className="font-ml-display text-[22px] italic leading-[1.05] text-cream">
          {product.coverTitleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
              {i < product.coverTitleLines.length - 1 && <br className="sr-only" />}
            </span>
          ))}{' '}
          <FoilText
            solid
            italic
            className="inline-block font-ml-display text-[22px] font-normal leading-[1.05]"
          >
            {product.coverAccent}
          </FoilText>
        </h3>
      </div>

      {/* Body */}
      <div className="px-[18px] py-4">
        <p className="font-serif text-[16px] font-medium italic leading-tight text-cream">
          {product.name}
        </p>
        <div className="mt-2.5 flex items-center justify-between">
          <span className="font-serif text-[16px] italic text-peach">{product.price}</span>
          <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-coral-light">
            &rarr; {product.channel}
          </span>
        </div>
      </div>
    </a>
  );
}
