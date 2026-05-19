import Link from 'next/link';
import { Wordmark } from './wordmark';

/**
 * Home hero. Mirrors the mockup left-aligned column on mobile, expands to a
 * comfortable max-width on desktop. The Caveat eyebrow ("finally —") sits
 * above the wordmark, then the coral hairline rule, the Fraunces italic
 * subhead, and a single ghost link out to the shop.
 *
 * The free-guide CTA used to live here too. It was redundant — the
 * FreeStart section directly below has its own "Get the setup guide" pill
 * for the same destination, with proper product context (title,
 * description, deliverables). Two coral pills to the same URL inside one
 * scroll diluted both. The hero is now the brand entry; FreeStart is the
 * pitch.
 *
 * The Wordmark component handles the handwritten "the" rotation and the
 * foil treatment on "Motherload" — see brand kit for why.
 */
export function Hero() {
  return (
    <section className="px-6 pb-14 pt-2 sm:px-8 sm:pb-20 sm:pt-6 lg:pt-10">
      <div className="mx-auto max-w-content">
        <p
          className="mb-1 inline-block font-script text-eyebrow-script font-semibold text-coral-light"
          style={{ transform: 'rotate(-2deg)' }}
        >
          finally —
        </p>

        <h1 className="mt-1">
          <Wordmark size="hero" />
        </h1>

        <span className="rule-coral mb-5 mt-6" aria-hidden="true" />

        <p className="mb-8 max-w-prose font-serif text-lg italic leading-relaxed text-blush sm:text-xl">
          For moms running the whole damn show. Real tools, no fluff — built for people who
          don&rsquo;t have time for another productivity hack.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-0 py-3 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-coral-light underline decoration-coral/40 underline-offset-[6px] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
          >
            See the shop
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
