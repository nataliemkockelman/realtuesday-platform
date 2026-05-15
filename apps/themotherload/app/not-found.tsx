import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FoilText } from '@/components/foil-text';

export const metadata: Metadata = {
  title: 'Lost the page',
};

/**
 * Custom 404. Replaces Next's default Helvetica fallback with a brand-voiced
 * page that uses the same visual language as the rest of the site (foil
 * accent, Caveat eyebrow, three navigation choices below).
 *
 * Voice: short, direct, slightly self-deprecating, no apologies — matches
 * "for moms running the whole damn show" attitude.
 */
export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <section className="px-6 pb-10 pt-7 sm:px-8 sm:pt-10">
          <div className="mx-auto max-w-content">
            <p
              className="mb-1 inline-block font-script text-eyebrow-script font-semibold text-coral-light"
              style={{ transform: 'rotate(-2deg)' }}
            >
              well, shit.
            </p>

            <h1 className="font-ml-display text-[clamp(48px,12vw,96px)] italic leading-[0.95] text-cream">
              <span className="block">that page is</span>
              <FoilText italic className="block font-ml-display font-normal leading-[0.95]">
                not here.
              </FoilText>
            </h1>

            <span className="rule-coral mb-6 mt-7" aria-hidden="true" />

            <p className="max-w-prose font-serif text-lg italic leading-relaxed text-blush sm:text-xl">
              Either I moved it, you typed it wrong, or the link that sent you here is
              old. Pick a place to go &mdash;
            </p>
          </div>
        </section>

        <section className="px-6 pb-16 sm:px-8 sm:pb-24">
          <div className="mx-auto max-w-content">
            <ul className="space-y-2.5">
              {DESTINATIONS.map((d) => (
                <li key={d.href}>
                  <Link
                    href={d.href}
                    className="group flex items-baseline gap-3 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-coral-light transition-colors hover:text-coral"
                  >
                    <span aria-hidden="true">&rarr;</span>
                    <span className="border-b border-transparent group-hover:border-coral">
                      {d.label}
                    </span>
                  </Link>
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

const DESTINATIONS = [
  { href: '/', label: 'back to the home page' },
  { href: '/products', label: 'see what\u2019s in the shop' },
  { href: '/free/sunday-reset', label: 'grab the free sunday reset' },
  { href: '/about', label: 'who\u2019s behind this' },
] as const;
