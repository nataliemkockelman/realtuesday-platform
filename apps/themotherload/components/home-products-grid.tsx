import Link from 'next/link';
import { ProductMini } from './product-mini';
import { PRODUCTS } from '@/lib/products';

/**
 * Home — top-3 product preview, leading to /products.
 *
 * Pulls the first three entries from PRODUCTS (Handled, AI Calendar Cheat,
 * Dinner Handled — or whatever Natalie has ordered first), renders them
 * with the same ProductMini cards used on the shop, and ends with a
 * "see all →" link. Browsers who don't want the flagship still see a
 * couple of alternates without scrolling through the full shop.
 */
export function HomeProductsGrid() {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <section className="px-6 pb-10 pt-7 sm:px-8 sm:pt-10">
      <div className="mx-auto max-w-content">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="eyebrow-mono mb-1.5">&mdash; the shop &mdash;</p>
            <h2 className="font-ml-display text-[clamp(28px,5vw,40px)] italic leading-tight text-cream">
              other things in here.
            </h2>
          </div>
          <Link
            href="/products"
            className="font-mono text-[11px] font-semibold uppercase tracking-mono-label text-coral-light underline decoration-coral/40 underline-offset-[6px] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
          >
            See all &rarr;
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <li key={product.slug}>
              <ProductMini product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
