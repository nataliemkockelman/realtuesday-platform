import Link from 'next/link';
import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { SlotPanel } from '@/components/slot-panel';

/**
 * Home — real Tuesday, two-operator operations studio.
 *
 * Copy is verbatim from docs/site-copy-v2.md (HOME section). Structure keeps
 * the established rhythm: one dark hero moment, then a warm cream body that
 * varies section to section — an editorial problem split, a dark "what we do"
 * band, a difference split, hairline numbered steps, and a copper closing block.
 *
 * The Proof section is built but gated OFF (SHOW_PROOF) per the copy doc's own
 * build note: never ship the proof section without a real, filled-in case study.
 *
 * PHOTO SLOTS: <PhotoPanel /> renders an intentional placeholder until real
 * photography is supplied in Phase 4. Slot ids from the copy doc are noted
 * inline so each can be wired to the right image.
 */

const SHOW_PROOF = false;

export default function HomePage() {
  return (
    <main className="min-h-screen bg-navy">
      <SiteNav />
      <Hero />

      {/* Light body — cream is the brand's warm "white" (F6F1E8). */}
      <div className="bg-cream text-navy">
        <Problem />
        <WhatWeDo />
        <Difference />
        <HowItGoes />
        {SHOW_PROOF && <Proof />}
        <ClosingCta />
      </div>

      <SiteFooter />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero — the one dark moment. Brand lockup + the two-operator headline.       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="px-6 pb-12 pt-4 sm:px-8 lg:pb-16">
      <div className="mx-auto grid max-w-content items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="mb-6 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
            operations studio
          </p>

          <h1 className="mb-6">
            <span className="block font-display text-[64px] font-extrabold leading-[0.82] tracking-[-0.06em] lowercase text-cream sm:text-[104px] lg:text-[128px]">
              real
            </span>
            <FoilText
              variant="copper"
              className="block font-serif italic font-normal text-[64px] leading-[0.9] tracking-[-0.03em] pb-2 sm:text-[104px] lg:text-[128px]"
            >
              Tuesday
            </FoilText>
          </h1>

          <h2 className="mb-6 max-w-[24ch] font-display text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] lowercase text-cream sm:text-[40px]">
            two operators who build the thing and stay until it works.
          </h2>

          <p className="max-w-[52ch] font-serif text-xl italic leading-[1.4] text-mist sm:text-2xl">
            Most companies don&apos;t need software. They need someone to find the four hours a day
            their team spends moving information by hand, and then go fix it.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-block shrink-0 self-start rounded bg-copper px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-mono-button text-navy no-underline sm:self-auto"
            >
              book an audit →
            </Link>
            <Link
              href="/pricing"
              className="inline-block shrink-0 self-start font-mono text-[11px] font-bold uppercase tracking-mono-button text-bright-copper no-underline hover:text-copper sm:self-auto"
            >
              see pricing
            </Link>
          </div>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-mono-label text-mist">
            Fixed scope. Fixed price. You know the number before we start.
          </p>
        </div>

        {/* IMG-01 — hero, right half */}
        <SlotPanel slot="IMG-01" priority className="ring-1 ring-cream/10" />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  The problem — editorial split, big line + supporting body + photo.          */
/* -------------------------------------------------------------------------- */

const PROBLEM_BODY = [
  'Someone on your team rebuilds the same report every Monday. Two systems hold the same data and disagree about it. Onboarding lives in one person\u2019s head. Your CRM is technically implemented and functionally abandoned.',
  'None of that shows up on a P&L as a line item. It shows up as your best people doing work that shouldn\u2019t exist.',
];

function Problem() {
  return (
    <section className="px-6 py-12 sm:px-8 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-content items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <p className="mb-6 font-mono text-[10px] uppercase tracking-mono-eyebrow text-copper">
            the problem
          </p>
          <h2 className="font-display text-[38px] font-extrabold leading-[1.02] tracking-[-0.04em] lowercase text-navy sm:text-[60px]">
            you already know where it hurts.
          </h2>
          <div className="mt-8 max-w-[46ch] space-y-5 font-body text-lg leading-[1.6] text-navy/70">
            {PROBLEM_BODY.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>

        {/* IMG-02 — before/after diagram (custom SVG) */}
        <SlotPanel slot="IMG-02" />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  What we do — dark navy band, four service cards.                            */
/* -------------------------------------------------------------------------- */

const WHAT_WE_DO = [
  {
    name: 'audit',
    text: 'Two weeks. We map where the manual work lives, what it costs in hours and dollars, and what\u2019s worth fixing first.',
    price: 'from $2,500',
  },
  {
    name: 'build',
    text: 'Automations, dashboards, integrations, internal tools, client portals. Built on your existing stack wherever we can.',
    price: 'from $3,500',
  },
  {
    name: 'sales systems',
    text: 'Framework, pipeline, tracking, and the automations underneath it. The process and the plumbing, together.',
    price: 'from $3,000',
  },
  {
    name: 'fractional',
    text: 'We stay on. Ongoing ops or ongoing sales leadership, at a defined scope, month to month.',
    price: 'from $2,000/mo',
  },
] as const;

function WhatWeDo() {
  return (
    <section id="services" className="bg-navy px-6 py-16 text-cream sm:px-8 lg:py-20">
      <div className="mx-auto max-w-content">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
          what we do
        </p>
        <h2 className="mb-10 max-w-[16ch] font-display text-[34px] font-extrabold leading-[0.98] tracking-[-0.04em] lowercase text-cream sm:text-[54px]">
          start small, or hand us{' '}
          <FoilText
            variant="copper"
            className="font-serif font-normal italic text-[34px] leading-[0.98] tracking-[-0.03em] sm:text-[54px]"
          >
            the whole operation.
          </FoilText>
        </h2>

        <div className="grid gap-px overflow-hidden rounded-2xl bg-cream/10 sm:grid-cols-2">
          {WHAT_WE_DO.map((card) => (
            <div key={card.name} className="flex flex-col bg-navy-card p-7 sm:p-8">
              <h3 className="font-display text-[24px] font-extrabold leading-[1] tracking-[-0.03em] lowercase text-cream sm:text-[28px]">
                {card.name}
              </h3>
              <p className="mt-3 max-w-[42ch] flex-1 font-body text-[15px] leading-[1.6] text-mist">
                {card.text}
              </p>
              <p className="mt-5 font-serif text-lg italic text-soft-gold">{card.price}</p>
            </div>
          ))}
        </div>

        <Link
          href="/pricing"
          className="mt-8 inline-block font-mono text-[11px] font-bold uppercase tracking-mono-button text-bright-copper no-underline hover:text-copper"
        >
          see full pricing →
        </Link>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  The difference — split, mirrored (photo left, text right).                  */
/* -------------------------------------------------------------------------- */

const DIFFERENCE_BODY = [
  'No account manager. No junior handoff. No offshore team you find out about in month three. Two senior operators, and the person who scopes your project is the person who builds it.',
  'We\u2019re small on purpose. It means we take fewer clients and finish what we start.',
];

function Difference() {
  return (
    <section className="border-t border-navy/10 px-6 py-12 sm:px-8 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-content items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* IMG-03 — the two of you */}
        <SlotPanel slot="IMG-03" className="order-last lg:order-first" />

        <div>
          <p className="mb-6 font-mono text-[10px] uppercase tracking-mono-eyebrow text-copper">
            the difference
          </p>
          <h2 className="font-display text-[38px] font-extrabold leading-[1.02] tracking-[-0.04em] lowercase text-navy sm:text-[56px]">
            you get us. that&apos;s the whole model.
          </h2>
          <div className="mt-8 max-w-[48ch] space-y-5 font-body text-lg leading-[1.6] text-navy/70">
            {DIFFERENCE_BODY.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  How it goes — oversized numerals, hairline rows. Five steps.                */
/* -------------------------------------------------------------------------- */

const STEPS = [
  {
    num: '01',
    title: 'a call',
    text: 'Thirty minutes. You tell us where it hurts. We tell you honestly whether we\u2019re the right fit. Sometimes we\u2019re not, and we\u2019ll say so.',
  },
  {
    num: '02',
    title: 'the audit',
    text: 'Two weeks. We find the real problem, which is frequently not the one you called about.',
  },
  {
    num: '03',
    title: 'a proposal',
    text: 'Three options, fixed prices, clear scope. You pick one or you don\u2019t.',
  },
  {
    num: '04',
    title: 'the build',
    text: 'Half up front, half on delivery. You see progress weekly, not at the end.',
  },
  {
    num: '05',
    title: 'adoption',
    text: 'We stay until your team is actually using it. A system nobody uses isn\u2019t finished.',
  },
] as const;

function HowItGoes() {
  return (
    <section id="how" className="border-t border-navy/10 px-6 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-content">
        <h2 className="mb-10 font-display text-[32px] font-extrabold leading-[0.95] tracking-[-0.04em] lowercase text-navy sm:text-[48px]">
          how it goes
        </h2>

        <div>
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="grid items-baseline gap-4 border-t border-navy/10 py-8 sm:grid-cols-[140px_1fr] sm:gap-10 lg:grid-cols-[200px_1fr]"
            >
              <span className="font-serif text-[64px] font-normal italic leading-none text-copper sm:text-[92px]">
                {step.num}
              </span>
              <div className="max-w-[560px]">
                <h3 className="mb-3 font-display text-[26px] font-bold leading-[1.05] tracking-[-0.02em] lowercase text-navy sm:text-[32px]">
                  {step.title}
                </h3>
                <p className="font-body text-base leading-[1.65] text-navy/70">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Proof — built but gated OFF until a real case study exists (copy doc note). */
/* -------------------------------------------------------------------------- */

function Proof() {
  return (
    <section className="border-t border-navy/10 px-6 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto grid max-w-content items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* IMG-04 — real dashboard screenshot */}
        <SlotPanel slot="IMG-04" />

        <div>
          <p className="mb-6 font-mono text-[10px] uppercase tracking-mono-eyebrow text-copper">
            proof
          </p>
          <h2 className="font-display text-[34px] font-extrabold leading-[1.02] tracking-[-0.04em] lowercase text-navy sm:text-[48px]">
            what this looks like in practice.
          </h2>

          <div className="mt-8 space-y-2 font-body text-base leading-[1.65] text-navy/70">
            <p className="font-display text-lg font-bold text-navy">[Industry, company size]</p>
            <p>
              <span className="font-serif italic text-copper">The problem:</span> [what was manual,
              how many hours, who was doing it]
            </p>
            <p>
              <span className="font-serif italic text-copper">What we built:</span> [the system, in
              one sentence]
            </p>
            <p>
              <span className="font-serif italic text-copper">The result:</span> [hours recovered,
              dollars, error rate, time-to-close]
            </p>
          </div>

          <blockquote className="mt-6 border-l-2 border-copper pl-5 font-serif text-xl italic leading-[1.4] text-navy">
            &ldquo;[Client quote — one or two sentences, specific, not &lsquo;they were great to work
            with.&rsquo;]&rdquo;
            <footer className="mt-2 font-mono text-[10px] not-italic uppercase tracking-mono-label text-navy/50">
              — [Name, Title, Company]
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Closing CTA — copper-foil block.                                            */
/* -------------------------------------------------------------------------- */

function ClosingCta() {
  return (
    <section className="px-6 pb-20 sm:px-8">
      <div className="mx-auto max-w-content">
        <div className="rounded-2xl bg-copper-foil px-8 py-14 text-navy sm:px-14 sm:py-20">
          <p className="max-w-[18ch] font-display text-[44px] font-extrabold leading-[0.9] tracking-[-0.05em] lowercase text-navy sm:text-[72px]">
            know your number before you start.
          </p>
          <p className="mt-6 max-w-[46ch] font-body text-lg leading-[1.55] text-navy/80">
            Two weeks and a fixed fee, and you&apos;ll know exactly what the manual work is costing
            you and what it takes to stop it.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-block self-start rounded bg-navy px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-mono-button text-cream no-underline sm:self-auto"
            >
              book an audit →
            </Link>
            <a
              href="mailto:hi@arealtuesday.com"
              className="inline-block self-start font-mono text-[11px] font-bold uppercase tracking-mono-button text-navy/70 no-underline hover:text-navy sm:self-auto"
            >
              hi@arealtuesday.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
