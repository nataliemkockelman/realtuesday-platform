import Link from 'next/link';
import type { Metadata } from 'next';
import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';

/**
 * /about — short editorial page introducing Real Tuesday.
 *
 * Structure:
 *   eyebrow → foil title → deck → copper rule
 *   · "the idea" — what real tuesday is + the tuesday thesis
 *   · "what's underneath" — the three sub-brands at a glance
 *   · "who" — Natalie + Bryan, light bio (placeholders for personal detail)
 *   · "where" — Sioux Falls
 *
 * Copy is intentionally short. The voice rules say editorial, confident,
 * lowercase — about pages that overwrite themselves with bio detail kill
 * the brand. Visitors learn most of who Real Tuesday is by reading the
 * notes, not by being told.
 */

export const metadata: Metadata = {
  title: 'about',
  description:
    'real tuesday is a studio making things worth your tuesday — honest brands for people doing real work. here\u2019s the idea, the brands, and who\u2019s behind it.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <SiteNav />

      <section className="px-6 pt-8 pb-9 sm:px-8 sm:pt-12">
        <div className="mx-auto max-w-content">
          {/* Title block matches the editorial pattern from the home hero
              and /notes index — eyebrow → foil → rule → italic deck. */}
          <p className="mb-7 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
            — about —
          </p>

          <h1>
            <span className="mb-1 block font-display text-[64px] font-extrabold leading-[0.85] tracking-[-0.06em] lowercase text-cream sm:text-[112px]">
              what this
            </span>
            <FoilText
              variant="copper"
              className="block font-serif italic font-normal text-[64px] leading-[1] tracking-[-0.03em] pb-3 sm:text-[112px]"
            >
              is.
            </FoilText>
          </h1>

          <span className="rule-copper mt-3 mb-[22px]" />

          <p className="mb-12 max-w-prose font-serif italic text-lg leading-[1.45] text-soft-gold sm:text-xl">
            real tuesday is a studio making things worth your tuesday. Honest brands for people
            doing real work — that&apos;s the whole point.
          </p>

          {/* Body sections — mirror the .prose-notes utility used on
              /notes/[slug] for visual continuity, but inlined here so we
              can mix component bits (links, foil) in between paragraphs. */}
          <div className="mx-auto max-w-[640px] space-y-12">
            <section>
              <h2 className="mb-3 font-display text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] lowercase text-cream sm:text-[32px]">
                the idea.
              </h2>
              <div className="space-y-4 font-body text-base leading-[1.65] text-blush sm:text-[17px]">
                <p>
                  Tuesday is the day nobody pays attention to.{' '}
                  <em className="font-serif italic text-soft-gold">
                    Monday gets the gym memberships. Friday gets the cocktails.
                  </em>{' '}
                  Tuesday just shows up and does the work.
                </p>
                <p>
                  That&apos;s the energy. real tuesday isn&apos;t hustle culture. It isn&apos;t
                  wellness. It isn&apos;t corporate. It&apos;s a place to put the brands and the
                  notes and the things we make for people who already know what they&apos;re doing
                  and just want better tools.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-3 font-display text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] lowercase text-cream sm:text-[32px]">
                what&apos;s underneath.
              </h2>
              <div className="space-y-4 font-body text-base leading-[1.65] text-blush sm:text-[17px]">
                <p>
                  Three sub-brands so far, each one with a clear audience and its own voice — but
                  the same DNA: navy anchor, copper accent, type system, and the connective stamp{' '}
                  <em className="font-serif italic text-soft-gold">a real tuesday thing</em>.
                </p>
                <ul className="space-y-2 pl-5 [&>li]:list-disc [&>li]:marker:text-copper">
                  <li>
                    <strong className="font-display font-bold text-cream">the Motherload</strong>{' '}
                    — for moms running the whole damn show.{' '}
                    <Link
                      href="https://themotherload.co"
                      className="text-copper underline decoration-copper/40 underline-offset-[3px] hover:text-bright-copper"
                    >
                      themotherload.co
                    </Link>
                  </li>
                  <li>
                    <strong className="font-display font-bold text-cream">Mint Condition</strong>{' '}
                    — life, mostly intact, sometimes pristine. For dads juggling kids, work, side
                    hustles, and learning Claude in real time. Coming soon.
                  </li>
                  <li>
                    <strong className="font-display font-bold text-cream">real talk</strong> — a
                    third brand in the works. More when the kit lands.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="mb-3 font-display text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] lowercase text-cream sm:text-[32px]">
                who&apos;s here.
              </h2>
              <div className="space-y-4 font-body text-base leading-[1.65] text-blush sm:text-[17px]">
                <p>
                  Natalie runs it. Bry&apos;s here too. Two people, three brands, no plan to be
                  more than what it is. We make the things we&apos;d want to use, and we publish
                  them under whichever brand fits.
                </p>
                <p>
                  Long-term, real tuesday is whatever we feel like making it. For now,{' '}
                  that&apos;s what you see — the brands, the notes, the things.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-3 font-display text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] lowercase text-cream sm:text-[32px]">
                where.
              </h2>
              <p className="font-body text-base leading-[1.65] text-blush sm:text-[17px]">
                Sioux Falls, South Dakota. Central Time. The kind of place where Tuesday just
                shows up.
              </p>
            </section>

            <div className="border-t border-soft-gold/15 pt-8">
              <p className="mb-4 font-serif italic text-base leading-[1.55] text-soft-gold sm:text-lg">
                The newsletter is the best way to follow along. Short, honest, useful. Free.
              </p>
              <div className="flex flex-wrap items-center gap-1">
                <Link
                  href="/notes"
                  className="inline-block rounded bg-copper px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-mono-button text-navy no-underline"
                >
                  Read the notes →
                </Link>
                <Link
                  href="/contact"
                  className="ml-2 inline-block px-2 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-button text-bright-copper no-underline"
                >
                  Get in touch →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
