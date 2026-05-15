import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { ProductMini } from '@/components/product-mini';
import { FoilText } from '@/components/foil-text';
import { PRODUCTS } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Workbooks, cheat sheets, and tools — every one tested by an actual mom (me) before it hits the shop.',
};

/**
 * /products — full shop. MVP renders a hard-coded list (see lib/products.ts);
 * once the dashboard's products table is live, swap PRODUCTS for a server
 * fetch from Supabase. Layout is mobile-first single column, jumping to a
 * 2-col grid at sm.
 */
export default function ProductsPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="px-6 pb-6 pt-7 sm:px-8 sm:pt-10">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-1.5">&mdash; the shop &mdash;</p>
            <h1 className="pb-2 font-ml-display text-[clamp(48px,12vw,96px)] italic leading-none text-cream">
              <span className="block">all the</span>
              {/* "good stuff" — foil treatment is the one hero accent on this
                  page, per the mockup. Big enough (≥56px) to clear the brand
                  kit's 60px-or-bigger foil rule. */}
              <FoilText italic className="block font-ml-display font-normal leading-none">
                good stuff.
              </FoilText>
            </h1>
            <p className="mt-3 max-w-prose font-serif text-[15px] italic leading-normal text-blush">
              Workbooks, cheat sheets, and tools &mdash; every one of them tested by an actual mom
              (me) before it hits the shop.
            </p>
          </div>
        </section>

        <section className="px-6 pb-12 pt-4 sm:px-8 sm:pb-16">
          <div className="mx-auto max-w-content">
            <ul className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
              {PRODUCTS.map((product) => (
                <li key={product.slug}>
                  <ProductMini product={product} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
