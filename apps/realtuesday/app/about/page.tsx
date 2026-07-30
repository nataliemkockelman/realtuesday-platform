import Link from 'next/link';
import type { Metadata } from 'next';
import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';

/**
 * /about — the operator story behind Real Tuesday.
 *
 * Mirrors the home rhythm: one dark hero moment (eyebrow → foil title → deck),
 * then a warm cream body that varies section to section — an editorial split
 * for the bio, hairline numbered principles, an oversized mission statement,
 * a mono tool strip, and the copper-foil closing block.
 *
 * No personal name and no location per brand direction — the work is the
 * introduction, not the resume.
 */

export const metadata: Metadata = {
  title: 'about',
  description:
    'real tuesday is an ai operations studio. one operator who finds the work your business hates, builds the systems that run it, and stays until your team adopts them.',
};

const PRINCIPLES = [
  {
    num: '01',
    title: 'show the work.',
    text: 'No decks that disappear. The value is in what gets built, shipped, and sustained.',
  },
  {
    num: '02',
    title: 'build for adoption.',
    text: "A system nobody uses is worthless. I'm not done until your team has actually switched over.",
  },
  {
    num: '03',
    title: 'honest partnership.',
    text: "I'll tell you what's worth automating, what isn't, and where you don't need me at all.",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-navy">
      <SiteNav />
      <AboutHero />

      <div className="bg-cream text-navy">
        <Operator />
        <Principles />
        <Mission />
        <BuiltWith />
        <ClosingCta />
      </div>

      <SiteFooter />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero — the one dark moment.                                                 */
/* -------------------------------------------------------------------------- */

function AboutHero() {
  return (
    <section className="px-6 pb-8 pt-4 sm:px-8 lg:pb-10">
      <div className="mx-auto max-w-content">
        <p className="mb-5 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
          about
        </p>
        <h1 className="mb-5">
          <span className="block font-display text-[40px] font-extrabold leading-[0.85] tracking-[-0.06em] lowercase text-cream sm:text-[64px] lg:text-[80px]">
            one operator who
          </span>
          <FoilText
            variant="copper"
            className="block font-serif italic font-normal text-[40px] leading-[0.95] tracking-[-0.03em] pb-2 sm:text-[64px] lg:text-[80px]"
          >
            actually builds.
          </FoilText>
        </h1>
        <p className="max-w-[52ch] font-serif text-lg italic leading-[1.4] text-mist sm:text-xl">
          Real Tuesday is a studio, not an agency. You work directly with the person doing the
          work. No account managers, no junior handoffs, no decks that go nowhere.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Operator — editorial split: label left, story right.                        */
/* -------------------------------------------------------------------------- */

function Operator() {
  return (
    <section className="px-6 py-12 sm:px-8 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-content gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-mono-eyebrow text-copper">
            the operator
          </p>
          <h2 className="font-display text-[34px] font-extrabold leading-[1] tracking-[-0.04em] lowercase text-navy sm:text-[48px]">
            the person doing{' '}
            <span className="font-serif font-normal italic text-copper">the work.</span>
          </h2>
        </div>
        <div className="max-w-[560px] space-y-5 font-body text-lg leading-[1.65] text-navy/70">
          <p>
            An operations leader and builder. I&apos;ve spent my career designing processes and
            scaling teams inside fast-growing companies, and increasingly building the AI systems
            that quietly run the work underneath.{' '}
            <span className="font-serif italic text-navy">
              Multiple internal platforms shipped end-to-end, a fleet of AI agents in production,
              and six figures of operating cost removed in a single year.
            </span>
          </p>
          <p>
            I&apos;ve gone deep in high-volume, operations-heavy businesses, and the approach works
            anywhere there&apos;s manual work worth eliminating. I started Real Tuesday to do this
            for more than one company at a time.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Principles — hairline numbered rows, matching home's Steps.                 */
/* -------------------------------------------------------------------------- */

function Principles() {
  return (
    <section className="border-t border-navy/10 px-6 py-12 sm:px-8 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-content">
        <h2 className="mb-10 font-display text-[32px] font-extrabold leading-[0.95] tracking-[-0.04em] lowercase text-navy sm:text-[48px]">
          how i work
        </h2>
        <div>
          {PRINCIPLES.map((p) => (
            <div
              key={p.num}
              className="grid items-baseline gap-4 border-t border-navy/10 py-8 sm:grid-cols-[140px_1fr] sm:gap-10 lg:grid-cols-[200px_1fr]"
            >
              <span className="font-serif text-[56px] font-normal italic leading-none text-copper sm:text-[80px]">
                {p.num}
              </span>
              <div className="max-w-[560px]">
                <h3 className="mb-3 font-display text-[24px] font-bold leading-[1.05] tracking-[-0.02em] lowercase text-navy sm:text-[30px]">
                  {p.title}
                </h3>
                <p className="font-body text-base leading-[1.65] text-navy/70">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mission — oversized statement.                                              */
/* -------------------------------------------------------------------------- */

function Mission() {
  return (
    <section className="border-t border-navy/10 px-6 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-content">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-mono-eyebrow text-copper">
          the mission
        </p>
        <p className="max-w-[20ch] font-display text-[34px] font-extrabold leading-[1.02] tracking-[-0.04em] lowercase text-navy sm:text-[56px]">
          the leverage of a much bigger team,{' '}
          <span className="font-serif font-normal italic text-copper">without the headcount.</span>
        </p>
        <p className="mt-8 max-w-[46ch] font-body text-lg leading-[1.6] text-navy/70">
          Give growing businesses real operational leverage by automating the work nobody should be
          doing by hand.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Built with — mono tool strip.                                              */
/* -------------------------------------------------------------------------- */

function BuiltWith() {
  return (
    <section className="border-t border-navy/10 px-6 py-12 sm:px-8 lg:py-14">
      <div className="mx-auto flex max-w-content flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] uppercase tracking-mono-label text-copper">
          built with
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] uppercase tracking-mono-label text-navy/60">
          {['Next.js', 'Supabase', 'Cloudflare', 'Stripe', 'Python'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Closing CTA — copper-foil block, matching home.                            */
/* -------------------------------------------------------------------------- */

function ClosingCta() {
  return (
    <section className="px-6 pb-20 pt-4 sm:px-8">
      <div className="mx-auto max-w-content">
        <div className="rounded-2xl bg-copper-foil px-8 py-14 text-navy sm:px-14 sm:py-20">
          <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-mono-eyebrow text-navy/70">
            let&apos;s talk
          </p>
          <p className="max-w-[20ch] font-display text-[40px] font-extrabold leading-[0.9] tracking-[-0.05em] lowercase text-navy sm:text-[64px]">
            start where it hurts.
          </p>
          <p className="mt-6 max-w-[48ch] font-body text-lg leading-[1.55] text-navy/80">
            If manual work is piling up somewhere in your operation, that&apos;s the place to start.
            Tell me where it is.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-block rounded bg-navy px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-mono-button text-cream no-underline"
          >
            Book an audit →
          </Link>
        </div>
      </div>
    </section>
  );
}
