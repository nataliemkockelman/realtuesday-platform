import Link from 'next/link';
import { FoilText } from './foil-text';

/**
 * Home — free setup-guide promo. Sits ABOVE the FeaturedDrop section so the
 * free entry point is the first call to action a visitor sees after the
 * hero.
 *
 * Background: CREAM full-width. The hero uses the same editorial column
 * pattern (eyebrow → DM Serif italic → body → CTA), so when both sat on
 * navy they read as one continuous section. Flipping FreeStart onto cream
 * differentiates it visually AND puts the highest-conversion moment of the
 * page (free starter) in a punch panel. Foil swaps to solid coral because
 * the coral gradient's midstop washes out against cream.
 */
export function FreeStart() {
  return (
    <section className="bg-cream px-6 pb-14 pt-12 text-navy sm:px-8 sm:pb-20 sm:pt-16">
      <div className="mx-auto max-w-content">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-mono-eyebrow text-coral">
          &mdash; free &middot; start here &mdash;
        </p>

        <h2 className="mt-3 font-ml-display text-[clamp(36px,9vw,72px)] italic leading-[0.95] text-navy">
          <span className="block">Claude,</span>
          <FoilText italic className="block font-ml-display font-normal leading-[0.95]">
            Meet Your Family.
          </FoilText>
        </h2>

        <span className="mb-4 mt-6 block h-[2px] w-10 bg-coral" aria-hidden="true" />

        <p className="max-w-prose font-serif text-[17px] italic leading-relaxed text-navy/75 sm:text-[18px]">
          The setup guide. 20 minutes. Then Claude knows your kids, your schedule, your standards —
          and stops making you re-explain your life every time you open a chat.
        </p>

        <Link
          href="/free/setup-guide"
          className="mt-6 inline-flex items-center gap-2 bg-coral px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
        >
          Get the setup guide
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
