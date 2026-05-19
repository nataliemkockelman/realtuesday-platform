import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FoilText } from '@/components/foil-text';

/**
 * /products/monthly-money-map — paid one-page household budget workbook.
 *
 * Mirrors /products/handled and /products/dinner-handled. Sold on Etsy
 * because the asset is xlsx-driven and Natalie's spreadsheet shoppers
 * already live there.
 */

const BUY_URL = 'https://etsy.com/shop/themotherload/monthly-money-map';
const PRICE = '$15';

const TITLE_LEAD = 'The Monthly';
const TITLE_FOIL = 'Money Map.';

const INSIDE = [
  {
    eyebrow: 'SECTION 01',
    title: 'The one-page map.',
    note: 'Every household line on a single page. No tabs to remember, no dashboard to maintain.',
  },
  {
    eyebrow: 'SECTION 02',
    title: 'The Sunday-night fill.',
    note: 'Ten minutes once a month. Plug in the actuals, see where the leak is, move on with your life.',
  },
  {
    eyebrow: 'SECTION 03',
    title: 'The four buckets.',
    note: 'Fixed, flex, savings, surprise. The categories every household actually runs on \u2014 minus the personal-finance jargon.',
  },
  {
    eyebrow: 'SECTION 04',
    title: 'The kid-money sub-map.',
    note: 'Activities, school fees, birthdays, the random Venmo from the team mom. Tracked so it stops being a guessing game.',
  },
];

export const metadata: Metadata = {
  title: 'The Monthly Money Map',
  description:
    'One-page household budget. Fill it Sunday, ignore it the rest of the month. Four buckets, one ritual, zero personal-finance jargon.',
  openGraph: {
    title: 'The Monthly Money Map · the Motherload',
    description:
      'One page. Four buckets. Ten minutes a month. The budget for people who do not have time to be a "spreadsheet person."',
  },
};

export default function MonthlyMoneyMapPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="px-6 pb-10 pt-7 sm:px-8 sm:pt-10">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">paid &middot; the budget map</p>

            <h1 className="font-ml-display text-[clamp(36px,9vw,72px)] italic leading-[0.95] text-cream">
              <span className="block">{TITLE_LEAD}</span>
              <FoilText italic className="block font-ml-display font-normal leading-[0.95]">
                {TITLE_FOIL}
              </FoilText>
            </h1>

            <span className="rule-coral mb-5 mt-6" aria-hidden="true" />

            <p className="font-mono text-[11px] font-semibold uppercase tracking-mono-eyebrow text-coral-light">
              one page &middot; ten minutes a month &middot; four buckets
            </p>

            <p className="mt-5 max-w-prose font-serif text-lg italic leading-relaxed text-blush sm:text-xl">
              The household budget for people who don&rsquo;t want to become a
              &ldquo;spreadsheet person.&rdquo; One page, four buckets, ten minutes on the
              first Sunday of the month. You&rsquo;ll know where the money goes, where the
              leak is, and what&rsquo;s actually left for the things you said you&rsquo;d save
              for.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-coral px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
              >
                Get the Map &mdash; {PRICE}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-mono-label text-peach/70">
              Delivered as a fillable Excel + printable PDF after checkout.
            </p>
          </div>
        </section>

        <section className="bg-cream px-6 pb-14 pt-12 text-navy sm:px-8 sm:pb-20 sm:pt-16">
          <div className="mx-auto max-w-content">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-mono-eyebrow text-coral">
              &mdash; what&rsquo;s inside &mdash;
            </p>
            <h2 className="mb-7 mt-3 max-w-prose font-ml-display text-[clamp(28px,6vw,40px)] italic leading-[1.05] text-navy">
              One page. Four sections. Honest math.
            </h2>
            <p className="mb-8 max-w-prose font-serif text-[16px] italic leading-relaxed text-navy/80">
              No envelope system. No 30-step tutorial. The map shows what comes in, where it
              goes, and the gap between &mdash; in the language you actually use to talk about
              money in your kitchen.
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

        <section className="px-6 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-16">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">&mdash; the map &mdash;</p>
            <h2 className="mt-3 max-w-prose font-ml-display text-[clamp(32px,7vw,52px)] italic leading-[1.02] text-cream">
              Ten minutes a month.{' '}
              <FoilText solid italic className="inline-block font-ml-display font-normal">
                Know where it went.
              </FoilText>
            </h2>
            <p className="mt-4 max-w-prose font-serif text-[17px] italic leading-relaxed text-blush">
              Not budgeting. Mapping. There&rsquo;s a difference.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-coral px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
              >
                Get the Map &mdash; {PRICE}
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
