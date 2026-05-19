import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FoilText } from '@/components/foil-text';

/**
 * /products/handled — "The Whole Damn Thing, Handled" (paid calendar setup guide).
 *
 * The whole-cal asset. They do NOT download the PDF from this page. Buy
 * happens on Gumroad/Etsy; this page sells the asset and bounces them out.
 * Replace BUY_URL when the Gumroad/Etsy link is live.
 */

// Replace with the live Gumroad or Etsy URL when checkout is set up.
const BUY_URL = 'https://gumroad.com/themotherload/handled';
const BUY_CHANNEL = 'Gumroad'; // or 'Etsy'
const PRICE = '$12';

const TITLE_LEAD = 'The whole damn thing,';
const TITLE_FOIL = 'handled.';

const INSIDE = [
  {
    eyebrow: 'SECTION 02',
    title: 'The connector.',
    note: 'Three clicks to plug Claude into Google Calendar or Outlook. Including the iCloud workaround.',
  },
  {
    eyebrow: 'SECTIONS 03 — 05',
    title: 'Build the shared cal, name it, set up the category colors.',
    note: 'School, birthdays, custody, travel. The four buckets every blended family runs on.',
  },
  {
    eyebrow: 'SECTIONS 06 — 07',
    title: 'The standing stuff and the four house rules.',
    note: 'Recurring practices, custody weeks, work blocks. Plus the rules that keep Claude from making a mess.',
  },
  {
    eyebrow: 'SECTION 08',
    title: 'The four ways to feed it.',
    note: 'Excel. PDF. Screenshot. Just talking. Whatever showed up in your inbox, Claude can use it.',
  },
  {
    eyebrow: 'SECTION 09',
    title: 'The setup prompt.',
    note: 'One copy-paste block. Fill in the brackets, drop it in Claude, done teaching.',
  },
  {
    eyebrow: 'SECTIONS 10 — 11',
    title: 'Two ways to build it once. Project or Skill.',
    note: 'Both methods walked through, both work entirely inside the Claude app. No terminal required.',
  },
  {
    eyebrow: 'SECTIONS 12 — 13',
    title: 'The blended-house deep cut.',
    note: 'The Tangerine rule for custody. The screenshot-the-stipulation shortcut for holiday rotations through 2030.',
  },
  {
    eyebrow: 'SECTION 14',
    title: 'Five prompts to run the day you set it up.',
    note: 'The ones that teach Claude your patterns fastest.',
  },
];

export const metadata: Metadata = {
  title: 'The Whole Damn Thing, Handled — the calendar guide',
  description:
    'Teach Claude the family calendar in 15 minutes. Then never type a school event into your calendar again.',
  openGraph: {
    title: 'The Whole Damn Thing, Handled — the calendar guide',
    description:
      'Teach Claude the family calendar in 15 minutes. Then never type a school event into your calendar again.',
  },
};

export default function HandledProductPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ─── HERO ────────────────────────────────────────── */}
        <section className="px-6 pb-10 pt-7 sm:px-8 sm:pt-10">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">paid &middot; setup guide no. 02</p>

            <h1 className="font-ml-display text-[clamp(36px,9vw,72px)] italic leading-[0.95] text-cream">
              <span className="block">{TITLE_LEAD}</span>
              <FoilText italic className="block font-ml-display font-normal leading-[0.95]">
                {TITLE_FOIL}
              </FoilText>
            </h1>

            <span className="rule-coral mb-5 mt-6" aria-hidden="true" />

            <p className="max-w-prose font-serif text-lg italic leading-relaxed text-blush sm:text-xl">
              The family calendar, off your plate. Fifteen minutes to teach Claude your house.
              Forever after, you hand off the spreadsheet, the school PDF, the screenshot from the
              coach &mdash; and Claude puts it on the cal.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-coral px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
              >
                Get it on {BUY_CHANNEL} {' '}&mdash;{' '} {PRICE}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-mono-label text-peach/70">
              Delivered as a PDF after checkout. Not downloaded from this site.
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
              Sixteen pages. Eight working sections.
            </h2>
            <p className="mb-8 max-w-prose font-serif text-[16px] italic leading-relaxed text-navy/80">
              No filler. No 30-page intro. Just the moves, in order, with the exact prompts you
              paste and the exact rules that keep Claude from making a mess of your cal.
            </p>

            <ul className="space-y-5">
              {INSIDE.map((item, i) => (
                <li
                  key={i}
                  className="border-l-2 border-coral pl-5"
                >
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

        {/* ─── PRE-REQ NOTE ────────────────────────────────── */}
        <section className="px-6 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-14">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">&mdash; one thing first &mdash;</p>
            <h2 className="mb-3 max-w-prose font-ml-display text-[clamp(24px,5.5vw,36px)] italic leading-[1.05] text-cream">
              Do <FoilText solid italic className="inline-block font-ml-display font-normal">Claude, Meet Your Family</FoilText> first if you haven&rsquo;t.
            </h2>
            <p className="mb-5 max-w-prose font-serif text-[17px] italic leading-relaxed text-blush">
              This guide layers on top of the family setup. If Claude already knows your kids,
              their sports, and their colors, this guide adds the calendar layer in fifteen minutes.
              If not, start with the free family guide first &mdash; it&rsquo;s under <em>Free</em>.
            </p>
            <a
              href="/free/setup-guide"
              className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-coral-light underline decoration-coral/40 underline-offset-4 transition-opacity hover:opacity-70"
            >
              Get the free family setup guide
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>

        {/* ─── FINAL CTA ─────────────────────────────────── */}
        <section className="bg-cream px-6 pb-16 pt-14 text-navy sm:px-8 sm:pb-20 sm:pt-16">
          <div className="mx-auto max-w-content text-center sm:text-left">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-mono-eyebrow text-coral">
              &mdash; the whole damn thing &mdash;
            </p>
            <h2 className="mx-auto mt-3 max-w-prose font-ml-display text-[clamp(32px,7vw,52px)] italic leading-[1.02] text-navy sm:mx-0">
              You&rsquo;re not the system anymore. {' '}
              <FoilText solid italic className="inline-block font-ml-display font-normal">
                Claude is.
              </FoilText>
            </h2>
            <p className="mx-auto mt-4 max-w-prose font-serif text-[17px] italic leading-relaxed text-navy/80 sm:mx-0">
              Get it once. Run your house off it forever after.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <a
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-coral px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
              >
                Get it on {BUY_CHANNEL} {' '}&mdash;{' '} {PRICE}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-mono-label text-navy/60 sm:text-left">
              Now go run the damn show.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
