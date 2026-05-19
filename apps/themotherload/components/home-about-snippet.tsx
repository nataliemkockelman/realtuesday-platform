import Link from 'next/link';
import { FoilText } from './foil-text';

/**
 * Home — short About teaser. Caveat eyebrow + DM Serif headline + one
 * paragraph of in-voice intro, with a "read the whole thing →" link out
 * to /about. The COO / Chaos Coordinator line is the highest-density
 * piece of brand voice on the site, so it sits here as the opening hook.
 *
 * Background: CREAM full-width. Pairs with FreeStart as the page's second
 * cream interruption — keeps the home from reading as one long navy
 * column. Foil swaps to `solid` because the coral gradient's midstop
 * (#FFB89E) is nearly the same value as cream (#F6F1E8) and washes out
 * to invisibility against it.
 *
 * No image of Natalie yet. When that exists, it goes to the right of
 * this column on desktop; for now the column reads as a confident
 * editorial intro block.
 */
export function HomeAboutSnippet() {
  return (
    <section className="bg-cream px-6 pb-14 pt-12 text-navy sm:px-8 sm:pb-20 sm:pt-16">
      <div className="mx-auto max-w-content">
        <p
          className="mb-1 inline-block font-script text-eyebrow-script font-semibold text-coral"
          style={{ transform: 'rotate(-2deg)' }}
        >
          who&rsquo;s behind this &mdash;
        </p>

        <h2 className="font-ml-display text-[clamp(36px,9vw,72px)] italic leading-[0.95] text-navy">
          <span className="block">a COO who is also the</span>
          <FoilText italic className="block font-ml-display font-normal leading-[0.95]">
            Chief Chaos Coordinator.
          </FoilText>
        </h2>

        <span className="mb-5 mt-6 block h-[2px] w-10 bg-coral" aria-hidden="true" />

        <p className="max-w-prose font-serif text-[17px] italic leading-relaxed text-navy/75 sm:text-[18px]">
          By day I&rsquo;m a COO. By every other waking minute I&rsquo;m the COO of this house
          &mdash; the actual job description is Chief Chaos Coordinator. Different titles.
          Same job: running operations for people who didn&rsquo;t read the manual and still
          expect dinner. The Motherload is the small set of tools I built for myself to make
          both jobs survivable.
        </p>

        <Link
          href="/about"
          className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-coral underline decoration-coral/40 underline-offset-[6px] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
        >
          Read the whole thing
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
