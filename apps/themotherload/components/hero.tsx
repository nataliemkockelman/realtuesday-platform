import Link from 'next/link';
import { Wordmark } from './wordmark';

/**
 * Home hero. Mirrors the mockup left-aligned column on mobile, expands to a
 * comfortable max-width on desktop. The Caveat eyebrow ("finally —") sits
 * above the wordmark, then the coral hairline rule, the Fraunces italic
 * subhead, and finally the coral CTA + ghost CTA.
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
          <span className="sr-only">the Motherload</span>
          <Wordmark size="hero" />
        </h1>

        <span className="rule-coral mb-5 mt-6" aria-hidden="true" />

        <p className="mb-8 max-w-prose font-serif text-lg italic leading-relaxed text-blush sm:text-xl">
          For moms running the whole damn show. Real tools, no fluff — built for people who
          don&rsquo;t have time for another productivity hack.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/free/sunday-reset"
            className="inline-flex items-center gap-2 bg-coral px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
          >
            Get the free cheat
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-3 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-peach transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
          >
            see all
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
