import Link from 'next/link';
import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';

/**
 * Home page — Real Tuesday as an AI operations studio.
 *
 *   nav · hero · why · how it works · services · industries · cta · footer
 *
 * The consumer portfolio (the Motherload, Mint Condition) and the
 * newsletter block are parked for now — they return as a "what we make"
 * section once those sub-brands are further along. Voice + copy port the
 * consulting messaging into Real Tuesday's navy + copper-foil system.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <SiteNav />
      <Hero />
      <Why />
      <HowItWorks />
      <Services />
      <Industries />
      <ClosingCta />
      <SiteFooter />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero — headline lead                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="px-6 pt-8 pb-9 sm:px-8">
      <div className="mx-auto max-w-content">
        <p className="mb-7 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
          — ai operations studio —
        </p>

        <h1 className="max-w-[760px]">
          <span className="block font-display text-[38px] font-extrabold leading-[0.92] tracking-[-0.05em] lowercase text-cream sm:text-[56px] lg:text-[68px]">
            your team shouldn&apos;t be doing this
          </span>
          <FoilText
            variant="copper"
            className="block font-serif italic font-normal text-[38px] leading-[1] tracking-[-0.03em] pb-3.5 sm:text-[56px] lg:text-[68px]"
          >
            by hand.
          </FoilText>
        </h1>

        <span className="rule-copper mt-3 mb-[22px]" />

        <p className="mb-7 max-w-prose font-serif italic text-lg leading-[1.45] text-soft-gold sm:text-xl">
          I find where your business loses the most time, build the AI systems that take that work
          over, and stay until your team actually runs on them.
        </p>

        <div className="flex flex-wrap items-center gap-1">
          <Link
            href="/contact"
            className="inline-block rounded bg-copper px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-mono-button text-navy no-underline"
          >
            Book an audit →
          </Link>
          <a
            href="#how"
            className="ml-2 inline-block shrink-0 whitespace-nowrap px-2 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-button text-bright-copper no-underline"
          >
            see how it works →
          </a>
        </div>

        <div className="mt-9 max-w-[540px] border-t border-soft-gold/15 pt-5">
          <p className="mb-2 font-mono text-[9px] uppercase tracking-mono-label text-bright-copper">
            — most recently —
          </p>
          <p className="font-body text-[15px] leading-[1.6] text-blush sm:text-base">
            <strong className="font-semibold text-cream">
              Six figures of operating cost removed
            </strong>{' '}
            for one business in a single year, by handing its busywork to systems that run on their
            own.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Why                                                                        */
/* -------------------------------------------------------------------------- */

function Why() {
  return (
    <section className="px-6 pt-7 pb-7 sm:px-8 sm:pt-12 sm:pb-12">
      <div className="mx-auto max-w-content">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
          — why this exists —
        </p>
        <h2 className="max-w-[18ch] font-display text-[36px] font-extrabold leading-[0.98] tracking-[-0.04em] lowercase text-cream pb-1.5 sm:text-[56px]">
          most consultants hand you a deck. i hand you a{' '}
          <FoilText
            variant="copper-tight"
            className="font-serif italic font-normal text-[36px] leading-[0.98] tracking-[-0.04em] sm:text-[56px]"
          >
            working system.
          </FoilText>
        </h2>

        <div className="mt-6 max-w-[640px] space-y-4 font-body text-base leading-[1.7] text-blush sm:text-[17px]">
          <p>Most consultancies stop at the slide deck. This was built differently.</p>
          <p>
            I&apos;m an operations builder who ships. My career has been spent in the messy middle
            of growing companies: the manual handoffs, the duplicate data entry, the five tools that
            refuse to talk to each other. I build the AI systems that make that mess quietly go away.
          </p>
          <p>
            The difference is simple.{' '}
            <em className="font-serif italic text-soft-gold">
              I don&apos;t just tell you what to automate. I build it, ship it, and stay until your
              team actually uses it.
            </em>
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  How it works — three steps                                                 */
/* -------------------------------------------------------------------------- */

const STEPS = [
  {
    num: '01',
    title: 'find the friction',
    text: 'A focused operations audit pinpoints exactly where your team bleeds hours and where money quietly leaks out.',
  },
  {
    num: '02',
    title: 'build the system',
    text: 'Custom AI agents, automations, and internal platforms, built around your operation instead of bolted on from a template.',
  },
  {
    num: '03',
    title: 'make it stick',
    text: 'I stay until adoption is real and the savings show up in the numbers. After that, the work runs itself.',
  },
] as const;

function HowItWorks() {
  return (
    <section id="how" className="px-6 pt-7 pb-7 sm:px-8 sm:pt-12 sm:pb-12">
      <div className="mx-auto max-w-content">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
          — how it works —
        </p>
        <h2 className="font-display text-[36px] font-extrabold leading-[0.98] tracking-[-0.04em] lowercase text-cream pb-1.5 sm:text-[56px]">
          three steps. one{' '}
          <FoilText
            variant="copper-tight"
            className="font-serif italic font-normal text-[36px] leading-[0.98] tracking-[-0.04em] sm:text-[56px]"
          >
            working operation.
          </FoilText>
        </h2>
        <p className="mt-3.5 mb-8 max-w-prose font-serif italic text-sm leading-[1.5] text-soft-gold sm:text-base">
          No six-month transformations. I find the friction, build the system, and stay until it
          sticks.
        </p>

        <div className="border-t border-soft-gold/15">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="grid grid-cols-[auto_1fr] gap-5 border-b border-soft-gold/15 py-7 sm:gap-8"
            >
              <span className="font-serif text-[40px] font-normal italic leading-none text-copper sm:text-[56px]">
                {step.num}
              </span>
              <div className="max-w-[540px] pt-1">
                <h3 className="mb-1.5 font-display text-[22px] font-bold leading-[1.1] tracking-[-0.02em] lowercase text-cream sm:text-[26px]">
                  {step.title}
                </h3>
                <p className="font-body text-[15px] leading-[1.65] text-blush sm:text-base">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Services — two cards                                                       */
/* -------------------------------------------------------------------------- */

function Services() {
  return (
    <section id="services" className="px-6 pt-7 pb-7 sm:px-8 sm:pt-12 sm:pb-12">
      <div className="mx-auto max-w-content">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
          — what i do —
        </p>
        <h2 className="font-display text-[36px] font-extrabold leading-[0.98] tracking-[-0.04em] lowercase text-cream pb-1.5 sm:text-[56px]">
          start small. or hand me{' '}
          <FoilText
            variant="copper-tight"
            className="font-serif italic font-normal text-[36px] leading-[0.98] tracking-[-0.04em] sm:text-[56px]"
          >
            the whole operation.
          </FoilText>
        </h2>
        <p className="mt-3.5 mb-8 max-w-prose font-serif italic text-sm leading-[1.5] text-soft-gold sm:text-base">
          Two ways to work together: a fixed-scope audit to find the wins, or an ongoing build
          partnership to ship them.
        </p>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:gap-5">
          <ServiceCard
            kicker="start here"
            title="Operations Audit"
            tagline="Find the work worth automating."
            desc="A focused dive into your operation. I map where time and money leak out, then hand you a prioritized build plan: what to automate first, what the payback looks like, and how to get there."
            features={[
              'End-to-end workflow & tool-stack review',
              'Friction & cost-leak mapping',
              'Prioritized automation roadmap',
              'ROI estimate per opportunity',
              'Quick wins you can act on immediately',
            ]}
            ctaLabel="Book an audit →"
            variant="outline"
          />
          <ServiceCard
            kicker="go further"
            title="Build & Embed"
            tagline="Ship the systems that run it."
            desc="Where the audit becomes infrastructure. I build the AI agents, automations, and internal platforms that run your highest-friction work, and I stay until your team has fully adopted them."
            features={[
              'Custom AI agents & assistants',
              'Workflow & process automation',
              'Internal platforms, CRMs & client portals',
              'API integrations across your existing tools',
              'Fractional AI operations leadership',
            ]}
            ctaLabel="Start a build →"
            variant="solid"
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  kicker,
  title,
  tagline,
  desc,
  features,
  ctaLabel,
  variant,
}: {
  kicker: string;
  title: string;
  tagline: string;
  desc: string;
  features: readonly string[];
  ctaLabel: string;
  variant: 'solid' | 'outline';
}) {
  const featured = variant === 'solid';
  return (
    <div
      className={`flex flex-col rounded-xl border p-[22px_20px] ${
        featured ? 'border-copper/55 bg-navy-card' : 'border-soft-gold/25 bg-navy-card'
      }`}
    >
      <p className="mb-3 font-mono text-[9px] uppercase tracking-mono-label text-bright-copper">
        {kicker}
      </p>
      <h3 className="font-display text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] lowercase text-cream sm:text-[32px]">
        {title}
      </h3>
      <p className="mt-1.5 font-serif italic text-sm text-copper">{tagline}</p>

      <p className="mt-4 font-body text-[14px] leading-[1.6] text-blush">{desc}</p>

      <ul className="mt-5 mb-6 flex-1 space-y-2.5">
        {features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 font-body text-[13.5px] leading-[1.45] text-blush"
          >
            <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-copper" aria-hidden />
            {f}
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={`block rounded px-6 py-3.5 text-center font-mono text-[11px] font-bold uppercase tracking-mono-button no-underline ${
          featured
            ? 'bg-copper text-navy'
            : 'border border-copper/50 text-copper hover:bg-copper hover:text-navy'
        }`}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Industries                                                                 */
/* -------------------------------------------------------------------------- */

const PILLS = [
  { label: 'Real Estate Operations', tone: 'primary' },
  { label: 'Professional Services', tone: 'default' },
  { label: 'Coaching & Education', tone: 'default' },
  { label: 'SaaS & Startups', tone: 'default' },
  { label: 'Scaling Organizations', tone: 'default' },
  { label: '+ open to fit', tone: 'muted' },
] as const;

function Industries() {
  return (
    <section className="px-6 pt-7 pb-7 sm:px-8 sm:pt-12 sm:pb-12">
      <div className="mx-auto max-w-content">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
          — where i work —
        </p>
        <h2 className="max-w-[20ch] font-display text-[36px] font-extrabold leading-[0.98] tracking-[-0.04em] lowercase text-cream pb-1.5 sm:text-[56px]">
          built to work anywhere there&apos;s{' '}
          <FoilText
            variant="copper-tight"
            className="font-serif italic font-normal text-[36px] leading-[0.98] tracking-[-0.04em] sm:text-[56px]"
          >
            manual work worth killing.
          </FoilText>
        </h2>
        <p className="mt-3.5 mb-6 max-w-prose font-serif italic text-sm leading-[1.5] text-soft-gold sm:text-base">
          Diagnose first, build second, run it until it sticks. That holds whether you&apos;re
          closing real estate transactions, onboarding clients, or scaling a service business.
          Below is where I have the deepest experience.
        </p>

        <div className="flex flex-wrap gap-2">
          {PILLS.map((pill) => (
            <span
              key={pill.label}
              className={`inline-flex items-center rounded-full border px-4 py-2 font-body text-[13px] ${
                pill.tone === 'primary'
                  ? 'border-copper bg-copper/12 font-medium text-copper'
                  : pill.tone === 'muted'
                    ? 'border-dashed border-soft-gold/40 text-soft-gold'
                    : 'border-soft-gold/25 bg-navy-card text-cream'
              }`}
            >
              {pill.label}
            </span>
          ))}
        </div>
        <p className="mt-6 font-serif italic text-sm leading-[1.6] text-soft-gold">
          If your business doesn&apos;t fit a category above, that&apos;s not a problem. It&apos;s
          usually a sign we should talk.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Closing CTA — cream island                                                 */
/* -------------------------------------------------------------------------- */

function ClosingCta() {
  return (
    <section className="px-6 pt-2 pb-2 sm:px-8">
      <div className="mx-auto max-w-content">
        <div className="rounded-xl bg-cream px-6 pt-8 pb-9 text-navy sm:px-10 sm:pt-12 sm:pb-14">
          <p className="mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-mono-eyebrow text-copper">
            — let&apos;s talk —
          </p>
          <h2 className="mb-1.5 pb-1 font-display text-[38px] font-extrabold leading-[0.95] tracking-[-0.05em] lowercase sm:text-[56px]">
            book an{' '}
            <FoilText
              variant="copper-tight"
              className="font-serif italic font-normal text-[38px] leading-[0.95] tracking-[-0.05em] sm:text-[56px]"
            >
              audit.
            </FoilText>
          </h2>
          <p className="mb-5 max-w-prose font-serif italic text-sm leading-[1.5] text-[#5a6478] sm:text-base">
            Tell me about your operation and where the manual work is piling up. I respond
            personally and only take on engagements where I can genuinely move the needle.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded bg-navy px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-mono-button text-cream no-underline"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </section>
  );
}
