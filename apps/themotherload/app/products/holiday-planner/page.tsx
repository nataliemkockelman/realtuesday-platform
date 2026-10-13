import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FoilText } from '@/components/foil-text';

/**
 * /products/holiday-planner — the Motherload's own landing page for the
 * Holiday App (the live product at holiday.arealtuesday.com).
 *
 * The Holiday App is a separate, standalone product (its own codebase,
 * its own Vercel project) — this page doesn't embed it, it's a
 * themotherload-branded on-ramp that explains the pitch in our voice and
 * sends people to the real app to sign up. Copy below mirrors the actual
 * live product (wishlists, budgets, secret gifts, private kid links,
 * $29/yr) — keep it in sync if the app's pricing or feature set changes.
 *
 * Previously this page was a "Coming Soon" stub for an unrelated,
 * never-built PDF product also called "Holiday, Handled." That product
 * doesn't exist — replaced with this page so the on-site link and the
 * sitewide nav banner both point at the same real thing.
 */

const APP_URL = 'https://holiday.arealtuesday.com';
const PRICE = '$29/yr';

const TITLE_LEAD = 'plan christmas';
const TITLE_FOIL = 'without anyone seeing it coming.';

const INSIDE = [
  {
    eyebrow: 'WISHLISTS',
    title: 'One board, not six group texts.',
    note: 'Everyone\u2019s list, links and all, in one private place instead of scattered across messages you\u2019ll never find again.',
  },
  {
    eyebrow: 'BUDGETS',
    title: 'What you spent vs. what you meant to.',
    note: 'Gift, who it\u2019s for, price \u2014 tracked as you buy, so December doesn\u2019t surprise you in January.',
  },
  {
    eyebrow: 'SECRET GIFTS',
    title: 'Hidden from the person it\u2019s for.',
    note: 'Add something to someone\u2019s list without them seeing it. The whole point of a secret.',
  },
  {
    eyebrow: 'PRIVATE KID LINKS',
    title: 'Kids get their own private link.',
    note: 'They can add to their own wishlist without seeing anyone else\u2019s \u2014 or what\u2019s already been bought.',
  },
];

export const metadata: Metadata = {
  title: 'Holiday App \u00b7 the Motherload',
  description:
    'Wishlists, budgets, and secret gifts for the whole family on one private board. The live Holiday App, from the people behind the Motherload.',
  openGraph: {
    title: 'Holiday App \u00b7 the Motherload',
    description:
      'Plan Christmas without anyone seeing it coming \u2014 wishlists, budgets, and secret gifts on one private board.',
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
            <p className="eyebrow-mono mb-3">live now &middot; {PRICE}</p>

            <h1 className="font-ml-display text-[clamp(28px,8vw,64px)] italic leading-[0.95] text-cream">
              <span className="block">{TITLE_LEAD}</span>
              <FoilText italic className="block font-ml-display font-normal leading-[0.95]">
                {TITLE_FOIL}
              </FoilText>
            </h1>

            <span className="rule-coral mb-5 mt-6" aria-hidden="true" />

            <p className="max-w-prose font-serif text-lg italic leading-relaxed text-blush sm:text-xl">
              Wishlists, budgets, and secret gifts for the whole family on one private board.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-coral px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
              >
                Get started
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-mono-label text-peach/70">
              Opens holiday.arealtuesday.com in a new tab.
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
              One board. The whole family. No one sees what&rsquo;s not theirs.
            </h2>
            <p className="mb-8 max-w-prose font-serif text-[16px] italic leading-relaxed text-navy/80">
              A private web app, not a spreadsheet &mdash; everyone gets their own view, and
              nobody sees the gifts meant for them.
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
              One board for everything.{' '}
              <FoilText solid italic className="inline-block font-ml-display font-normal">
                Not six group texts.
              </FoilText>
            </h2>
            <p className="mt-4 max-w-prose font-serif text-[17px] italic leading-relaxed text-blush">
              Set it up once. Reuse it every year the season comes back around.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-coral px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
              >
                Get started &mdash; {PRICE}
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
