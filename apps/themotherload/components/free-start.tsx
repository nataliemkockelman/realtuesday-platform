import Link from 'next/link';
import { FoilText } from './foil-text';

/**
 * Home — free setup-guide promo. Sits ABOVE the FeaturedDrop section so the
 * free entry point is the first call to action a visitor sees after the
 * hero. Mirrors FeaturedDrop's section frame (px-6 pb-10 pt-7 sm:...,
 * max-w-content, mx-auto) so it slots into the existing rhythm without
 * introducing a new layout pattern.
 *
 * The Motherload wordmark in the hero already uses coral foil, so the
 * title here uses SOLID coral via FoilText's `solid` prop — brand kit
 * caps foil at one moment per page.
 */
export function FreeStart() {
  return (
    <section className="px-6 pb-10 pt-7 sm:px-8 sm:pt-10">
      <div className="mx-auto max-w-content">
        <p className="eyebrow-mono mb-3">&mdash; free &middot; start here &mdash;</p>

        <h2 className="font-ml-display text-[clamp(36px,9vw,72px)] italic leading-[0.95] text-cream">
          <span className="block">Claude,</span>
          <FoilText solid italic className="block font-ml-display font-normal leading-[0.95]">
            Meet Your Family.
          </FoilText>
        </h2>

        <span className="rule-coral mb-4 mt-6" aria-hidden="true" />

        <p className="max-w-prose font-serif text-[17px] italic leading-relaxed text-blush sm:text-[18px]">
          The setup guide. 20 minutes. Then Claude knows your kids, your schedule, your standards —
          and stops making you re-explain your life every time you open a chat.
        </p>

        <Link
          href="/free/setup-guide"
          className="mt-6 inline-flex items-center gap-2 bg-coral px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
        >
          Get the setup guide
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
