import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FoilText } from '@/components/foil-text';

/**
 * /products/dinner-handled — "Dinner, Handled" (paid weeknight meal system).
 *
 * Mirrors /products/handled structure (hero → what's inside → final CTA).
 * Source asset: 20-minute Sunday-night ritual, four-section PDF. Part of
 * the forthcoming Sunday Reset bundle (not yet built); for now it's sold
 * standalone.
 *
 * Pricing: $12 placeholder until Natalie confirms.
 */

const BUY_URL = 'https://gumroad.com/themotherload/dinner-handled';
const PRICE = '$12';

const TITLE_LEAD = 'dinner,';
const TITLE_FOIL = 'handled.';

const INSIDE = [
  {
    eyebrow: 'SECTION 01',
    title: 'The Sunday-night ritual.',
    note: 'Twenty minutes. One worksheet. The whole week\u2019s dinners decided before the week starts.',
  },
  {
    eyebrow: 'SECTION 02',
    title: 'The seven anchor meals.',
    note: 'The rotation that runs my house. Build yours off it, swap in what your kids will actually eat.',
  },
  {
    eyebrow: 'SECTION 03',
    title: 'The grocery list, on autopilot.',
    note: 'Plug the week into the template, get the list out the other side. Print or screenshot, go.',
  },
  {
    eyebrow: 'SECTION 04',
    title: 'The 5:47 pm rescue plan.',
    note: 'For the nights when nothing went to plan. Three categories, six options, zero panic.',
  },
];

export const metadata: Metadata = {
  title: 'Dinner, Handled',
  description:
    'A 20-minute Sunday-night ritual that handles weeknight dinner. Four sections, one PDF, zero apps. The system that takes the deciding part off your plate.',
  openGraph: {
    title: 'Dinner, Handled · the Motherload',
    description:
      'A 20-minute ritual on Sunday night. The whole damn week of dinners, decided before the week starts. Four sections, one PDF.',
  },
};

export default function DinnerHandledPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ─── HERO ────────────────────────────────────────── */}
        <section className="px-6 pb-10 pt-7 sm:px-8 sm:pt-10">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">paid &middot; the weeknight meal system</p>

            <h1 className="font-ml-display text-[clamp(36px,9vw,72px)] italic leading-[0.95] text-cream">
              <span className="block">{TITLE_LEAD}</span>
              <FoilText italic className="block font-ml-display font-normal leading-[0.95]">
                {TITLE_FOIL}
              </FoilText>
            </h1>

            <span className="rule-coral mb-5 mt-6" aria-hidden="true" />

            <p className="font-mono text-[11px] font-semibold uppercase tracking-mono-eyebrow text-coral-light">
              twenty minutes sunday &middot; one pdf &middot; four sections
            </p>

            <p className="mt-5 max-w-prose font-serif text-lg italic leading-relaxed text-blush sm:text-xl">
              Twenty minutes on Sunday night. The whole damn week of dinners, decided before
              the week starts. It&rsquo;s 5:47 pm on a Wednesday. The fridge is open. Three
              kids are asking what&rsquo;s for dinner. You&rsquo;ve already made 400
              decisions today &mdash; this is the system that takes the deciding part off
              your plate before Monday morning even hits.
            </p>
            <p className="mt-3 max-w-prose font-mono text-[10px] uppercase tracking-mono-label text-blush/70">
              part of the forthcoming <em className="not-italic font-semibold text-coral-light">Sunday Reset</em> bundle &mdash; sold standalone until it ships.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-coral px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
              >
                Get Dinner, Handled &mdash; {PRICE}
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
              One PDF. Four sections. Zero apps.
            </h2>
            <p className="mb-8 max-w-prose font-serif text-[16px] italic leading-relaxed text-navy/80">
              No meal-plan service to subscribe to. No recipe app to learn. Just the worksheet,
              the rotation, and the rescue plan &mdash; printable, fillable, repeatable.
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
            <p className="eyebrow-mono mb-3">&mdash; the whole week &mdash;</p>
            <h2 className="mt-3 max-w-prose font-ml-display text-[clamp(32px,7vw,52px)] italic leading-[1.02] text-cream">
              Twenty minutes Sunday.{' '}
              <FoilText solid italic className="inline-block font-ml-display font-normal">
                Done before Monday.
              </FoilText>
            </h2>
            <p className="mt-4 max-w-prose font-serif text-[17px] italic leading-relaxed text-blush">
              The deciding is the hardest part. Hand it off once.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-coral px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
              >
                Get Dinner, Handled &mdash; {PRICE}
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
