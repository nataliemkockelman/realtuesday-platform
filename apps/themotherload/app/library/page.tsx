import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FoilText } from '@/components/foil-text';
import { PRODUCTS } from '@/lib/products';

/**
 * /library — course-catalog view of all assets. Different from /products in
 * that the cover is the hero: bigger 3:4 cards, title and one-liner below,
 * minimal metadata. Visual-first browsing.
 */

export const metadata: Metadata = {
  title: 'The Library',
  description:
    'Every Motherload guide, workbook, and cheat sheet. Browse them like a shelf.',
};

export default function LibraryPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ─── HEADER ─────────────────────────────────────── */}
        <section className="px-6 pb-6 pt-7 sm:px-8 sm:pt-10">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-1.5">&mdash; the library &mdash;</p>
            <h1 className="pb-2 font-ml-display text-[clamp(48px,12vw,96px)] italic leading-none text-cream">
              <span className="block">every</span>
              <FoilText italic className="block font-ml-display font-normal leading-none">
                damn one.
              </FoilText>
            </h1>
            <p className="mt-3 max-w-prose font-serif text-[15px] italic leading-normal text-blush">
              Every Motherload guide, workbook, and cheat sheet. Free and paid. Browse like a shelf.
            </p>
          </div>
        </section>

        {/* ─── COVER GRID ─────────────────────────────────── */}
        <section className="px-6 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12">
          <div className="mx-auto max-w-content">
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCTS.map((product) => {
                const isInternal = product.buyUrl.startsWith('/');
                const externalProps = isInternal
                  ? {}
                  : { target: '_blank' as const, rel: 'noopener noreferrer' };
                return (
                  <li key={product.slug}>
                    <a
                      href={product.buyUrl}
                      {...externalProps}
                      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
                    >
                      {/* Big cover, 3:4 aspect */}
                      <div
                        aria-hidden="true"
                        className="flex flex-col justify-between rounded-[12px] border border-coral/20 bg-navy p-6 transition-colors group-hover:border-coral/50"
                        style={{ aspectRatio: '3 / 4' }}
                      >
                        <p className="font-mono text-[9px] font-semibold uppercase tracking-mono-label text-coral">
                          the motherload
                        </p>
                        <div>
                          <h2 className="font-ml-display text-[34px] italic leading-[1.05] text-cream">
                            {product.coverTitleLines.map((line, i) => (
                              <span key={i} className="block">
                                {line}
                              </span>
                            ))}{' '}
                            <FoilText
                              solid
                              italic
                              className="inline-block font-ml-display text-[34px] font-normal leading-[1.05]"
                            >
                              {product.coverAccent}
                            </FoilText>
                          </h2>
                        </div>
                        <p className="font-mono text-[9px] font-semibold uppercase tracking-mono-label text-coral-light">
                          {product.price === 'Free' ? 'free' : product.price}
                        </p>
                      </div>

                      {/* Title + meta below cover */}
                      <div className="mt-4">
                        <p className="font-ml-display text-[20px] italic leading-tight text-cream">
                          {product.name}
                        </p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-mono-label text-coral-light transition-opacity group-hover:opacity-80">
                          Open &rarr;
                        </p>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
