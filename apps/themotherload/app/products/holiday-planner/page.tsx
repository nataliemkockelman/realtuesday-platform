import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FoilText } from '@/components/foil-text';

/**
 * /products/holiday-planner — "Holiday, Handled" (gift list, budget, cards,
 * and hosting for the whole season).
 *
 * Not packaged yet — same "Coming Soon" mode as /products/handled. The page
 * exists so the brand voice, structure, and the nav/footer cross-promo
 * funnel are all live. Replace BUY_URL and PRICE once the PDF is built and
 * a Gumroad checkout exists.
 */

// Replace with the live Gumroad URL when checkout is set up.
const BUY_URL = 'https://gumroad.com/themotherload/holiday-planner';
const PRICE = 'Coming Soon';

const TITLE_LEAD = 'the holiday,';
const TITLE_FOIL = 'handled.';

const INSIDE = [
  {
    eyebrow: 'SECTION 01',
    title: 'The gift list + budget tracker.',
    note: 'Who, what, what you budgeted, what you actually spent. The sheet that keeps December off January\u2019s credit card bill.',
  },
  {
    eyebrow: 'SECTION 02',
    title: 'The card & shipping list.',
    note: 'Every address, every cutoff date, who already got one. No double-sending your husband\u2019s aunt again.',
  },
  {
    eyebrow: 'SECTION 03',
    title: 'The hosting plan.',
    note: 'Who\u2019s coming, what they\u2019re bringing, when they\u2019re showing up. The potluck math, solved before the group text starts.',
  },
  {
    eyebrow: 'SECTION 04',
    title: 'The key-dates calendar.',
    note: 'Shipping cutoffs, event dates, and a day built in after it\u2019s over to do absolutely nothing.',
  },
];

export const metadata: Metadata = {
  title: 'Holiday, Handled',
  description:
    'A gift list, budget tracker, card list, and hosting plan for the whole holiday season \u2014 one place, not six sticky notes and a group text.',
  openGraph: {
    title: 'Holiday, Handled \u00b7 the Motherload',
    description:
      'Every gift, every card, every hosting detail, tracked in one place before November ends.',
  },
};

export default function HolidayPlannerPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ─── HERO ────────────────────────────────────────── */}
        <section className="px-6 pb-10 pt-7 sm:px-8 sm:pt-10">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">paid &middot; the whole season, mapped</p>

            <h1 className="font-ml-display text-[clamp(30px,9vw,72px)] italic leading-[0.95] text-cream">
              <span className="block">{TITLE_LEAD}</span>
              <FoilText italic className="block font-ml-display font-normal leading-[0.95]">
                {TITLE_FOIL}
              </FoilText>
            </h1>

            <span className="rule-coral mb-5 mt-6" aria-hidden="true" />

            <p className="max-w-prose font-serif text-lg italic leading-relaxed text-blush sm:text-xl">
              Every gift, every card, every hosting detail &mdash; tracked in one place before
              November ends.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-coral px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
              >
                Get notified when it ships
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-mono-label text-peach/70">
              PDF after checkout.
            </p>
          </div>
        </section>

        {/* ─── WHAT'S INSIDE ────────────────────────────────── */}
        <section className="bg-cream px-6 pb-14 pt-12 text-navy sm:px-8 sm:pb-20 sm:pt-16">
          <div className="mx-auto max-w-content">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-mono-eyebrow text-coral">
              &mdash; what&rsquo;s inside &mdash;
            </p>
            <h2 className="mb-7 mt-3 max-w-prose font-ml-display text-[clamp(28px,6vw,40px)] italic leading-[1.05] text-navy">
              One PDF. Four sections. The whole season.
            </h2>
            <p className="mb-8 max-w-prose font-serif text-[16px] italic leading-relaxed text-navy/80">
              No app to download, no account to make. Just the lists, the tracker, and the
              calendar &mdash; printable, fillable, repeatable every year.
            </p>

            <ul className="space-y-5">
              {INSIDE.map((item, i) => (
                <li key={i} className="border-l-2 border-coral pl-5">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-mono-label text-coral">
                    {item.eyebrow}
                  </p>
                  <p className="mt-1 font-ml-display text-[22px] italic leading-tight text-navy">
                    {item.title}
                  </p>
                  <p className="mt-1.5 max-w-prose font-serif text-[15px] italic leading-snug text-navy/75">
                    {item.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─── FINAL CTA ─────────────────────────────────── */}
        <section className="px-6 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-16">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">&mdash; the whole season &mdash;</p>
            <h2 className="mt-3 max-w-prose font-ml-display text-[clamp(32px,7vw,52px)] italic leading-[1.02] text-cream">
              One list for everything.{' '}
              <FoilText solid italic className="inline-block font-ml-display font-normal">
                Not six sticky notes.
              </FoilText>
            </h2>
            <p className="mt-4 max-w-prose font-serif text-[17px] italic leading-relaxed text-blush">
              Build it once. Reuse it every year the season comes back around.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-coral px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
              >
                Get notified when it ships
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
