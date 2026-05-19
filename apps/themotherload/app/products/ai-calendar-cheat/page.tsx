import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FoilText } from '@/components/foil-text';

/**
 * /products/ai-calendar-cheat — standalone one-page printable.
 *
 * Structure mirrors /products/handled (hero → what's inside → companion note
 * → final CTA) so the two product pages feel like siblings. Critical
 * positioning: this is a COMPONENT of Handled, not a separate system. The
 * companion section explicitly links upward to the bundle.
 */

// Live channel link gets dropped in once Gumroad is set up.
const BUY_URL = 'https://gumroad.com/themotherload/ai-calendar-cheat';
const PRICE = '$12';

const TITLE_LEAD = 'The AI Calendar';
const TITLE_FOIL = 'Cheat.';

const INSIDE = [
  {
    eyebrow: 'THE LAYOUT',
    title: 'One page. Front and back.',
    note: 'Print it, slide it under the fridge magnet, done. No app, no system to maintain.',
  },
  {
    eyebrow: 'THE PROMPTS',
    title: 'Seven copy-paste prompts.',
    note: 'The exact ones that turn a screenshot, a school PDF, or a coach text into calendar events.',
  },
  {
    eyebrow: 'THE RULES',
    title: 'The four house rules.',
    note: 'Quick reference for the boundaries that keep Claude from making a mess of the family cal.',
  },
  {
    eyebrow: 'THE COLOR KEY',
    title: 'The four buckets.',
    note: 'School, birthdays, custody, travel — the only category system most families ever need.',
  },
];

export const metadata: Metadata = {
  title: 'The AI Calendar Cheat',
  description:
    'The one-page calendar cheat. The system on a fridge magnet — seven prompts, four rules, four colors. Or get it bundled in Handled.',
  openGraph: {
    title: 'The AI Calendar Cheat · the Motherload',
    description:
      'Just the one-page printable. Seven prompts, four rules, four colors. The system on a fridge magnet.',
  },
};

export default function AiCalendarCheatPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ─── HERO ────────────────────────────────────────── */}
        <section className="px-6 pb-10 pt-7 sm:px-8 sm:pt-10">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">paid &middot; one-page printable</p>

            <h1 className="font-ml-display text-[clamp(36px,9vw,72px)] italic leading-[0.95] text-cream">
              <span className="block">{TITLE_LEAD}</span>
              <FoilText italic className="block font-ml-display font-normal leading-[0.95]">
                {TITLE_FOIL}
              </FoilText>
            </h1>

            <span className="rule-coral mb-5 mt-6" aria-hidden="true" />

            <p className="max-w-prose font-serif text-lg italic leading-relaxed text-blush sm:text-xl">
              The system on a fridge magnet. Seven copy-paste prompts, four house rules, the
              color key &mdash; everything you need to actually run the family calendar off
              Claude, on a single printable page.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-coral px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
              >
                Get the Cheat &mdash; {PRICE}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-mono-label text-peach/70">
              Delivered as a PDF after checkout. Not downloaded from this site.
            </p>
            {/* Component-of-Handled note — the Cheat lives inside the full
                bundle. Anyone considering buying both should go to Handled. */}
            <p className="mt-4 max-w-prose font-serif text-[14px] italic leading-snug text-blush">
              This is a component of{' '}
              <a
                href="/products/handled"
                className="text-coral-light underline-offset-4 hover:underline"
              >
                The Whole Damn Thing, Handled
              </a>
              . If you want the full system &mdash; setup, prompts, color framework, and the
              cheat &mdash; get the bundle instead.
            </p>
          </div>
        </section>

        {/* ─── WHAT'S INSIDE ────────────────────────────────── */}
        <section className="bg-cream px-6 pb-14 pt-12 text-navy sm:px-8 sm:pb-20 sm:pt-16">
          <div className="mx-auto max-w-content">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-mono-eyebrow text-coral">
              &mdash; what&rsquo;s on it &mdash;
            </p>
            <h2 className="mb-7 mt-3 max-w-prose font-ml-display text-[clamp(28px,6vw,40px)] italic leading-[1.05] text-navy">
              One page. Everything you actually need.
            </h2>
            <p className="mb-8 max-w-prose font-serif text-[16px] italic leading-relaxed text-navy/80">
              No filler. No system to learn. Print it, stick it on the fridge, and pull a
              prompt off it when you need one.
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

        {/* ─── COMPANION — UPSELL TO HANDLED ────────────────── */}
        <section className="px-6 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-14">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">&mdash; the bigger thing &mdash;</p>
            <h2 className="mb-3 max-w-prose font-ml-display text-[clamp(24px,5.5vw,36px)] italic leading-[1.05] text-cream">
              Want the whole system?{' '}
              <FoilText solid italic className="inline-block font-ml-display font-normal">
                Get Handled.
              </FoilText>
            </h2>
            <p className="mb-5 max-w-prose font-serif text-[17px] italic leading-relaxed text-blush">
              The Cheat is the quick reference. The Whole Damn Thing, Handled is the full
              setup &mdash; the template, the prompt library, the color-code framework, and
              the cheat sheet bundled in.
            </p>
            <a
              href="/products/handled"
              className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-coral-light underline decoration-coral/40 underline-offset-4 transition-opacity hover:opacity-70"
            >
              See Handled
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>

        {/* ─── FINAL CTA ─────────────────────────────────── */}
        <section className="bg-cream px-6 pb-16 pt-14 text-navy sm:px-8 sm:pb-20 sm:pt-16">
          <div className="mx-auto max-w-content text-center sm:text-left">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-mono-eyebrow text-coral">
              &mdash; the cheat &mdash;
            </p>
            <h2 className="mx-auto mt-3 max-w-prose font-ml-display text-[clamp(32px,7vw,52px)] italic leading-[1.02] text-navy sm:mx-0">
              Print it once.{' '}
              <FoilText solid italic className="inline-block font-ml-display font-normal">
                Use it forever.
              </FoilText>
            </h2>
            <p className="mx-auto mt-4 max-w-prose font-serif text-[17px] italic leading-relaxed text-navy/80 sm:mx-0">
              No app, no login, no learning curve. One page on the fridge does the work.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <a
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-coral px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
              >
                Get the Cheat &mdash; {PRICE}
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
