import Image from 'next/image';
import Link from 'next/link';
import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';

/**
 * Home — Real Tuesday, AI operations studio.
 *
 * Structure is deliberately NOT the templated eyebrow→headline→sub→card-grid
 * repeat. One dark moment (the brand hero), then a warm off-white body that
 * varies its rhythm section to section: an editorial statement split with a
 * photo panel, oversized numeral steps, two offerings as full-width editorial
 * rows, a single oversized proof stat, and a copper closing block.
 *
 * Palette: navy + off-white foundation, copper the only accent. Foil is used
 * once, in the dark hero, where the light-gold stops actually read.
 *
 * PHOTO SLOTS: <PhotoPanel /> renders an intentional placeholder. Swap each
 * for a real next/image when photography is supplied. Keep the wrapper's
 * aspect + rounding so the layout doesn't shift.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-navy">
      <SiteNav />
      <Hero />

      {/* Light body — cream is the brand's warm "white" (F6F1E8). Pure #FFF
          reads cold against the navy + copper foil, so we stay on cream. */}
      <div className="bg-cream text-navy">
        <Statement />
        <Steps />
        <PhotoBreak />
        <Offerings />
        <Proof />
        <ClosingCta />
      </div>

      <SiteFooter />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero — the one dark moment. Brand-forward.                                  */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="px-6 pb-12 pt-4 sm:px-8 lg:pb-16">
      <div className="mx-auto max-w-content">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
          ai operations studio
        </p>

        {/* The brand, bigger again — but not the old screen-filling size */}
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

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[34ch] font-serif text-xl italic leading-[1.4] text-mist sm:text-2xl">
            AI systems for the work your team hates. Found, built, and run until it sticks.
          </p>
          <Link
            href="/contact"
            className="inline-block shrink-0 self-start rounded bg-copper px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-mono-button text-navy no-underline lg:self-auto"
          >
            Book an audit →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Statement — editorial split, the value prop as a big line + a photo panel  */
/* -------------------------------------------------------------------------- */

function Statement() {
  return (
    <section className="px-6 py-12 sm:px-8 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-content items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <p className="mb-6 font-mono text-[10px] uppercase tracking-mono-eyebrow text-copper">
            the premise
          </p>
          <p className="font-display text-[38px] font-extrabold leading-[1.02] tracking-[-0.04em] lowercase text-navy sm:text-[60px]">
            your team shouldn&apos;t be doing this{' '}
            <span className="font-serif font-normal italic text-copper">by hand.</span>
          </p>
          <p className="mt-8 max-w-[46ch] font-body text-lg leading-[1.6] text-navy/70">
            Most consultancies stop at the slide deck. I don&apos;t. I find where your business
            loses the most time, build the AI systems that take that work over, and stay until your
            team actually runs on them.
          </p>
        </div>

        <PhotoPanel
          className="aspect-[4/5] lg:aspect-square"
          label="portrait / workspace"
          src="/photos/workspace-coffee-notebook.jpg"
          alt="A quiet workspace with coffee, an open notebook, and warm morning light"
        />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Steps — oversized numerals, hairline rows. No cards.                       */
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
    text: 'Custom AI agents, automations, and internal platforms, built around your operation, not bolted on from a template.',
  },
  {
    num: '03',
    title: 'make it stick',
    text: 'I stay until adoption is real and the savings show up in the numbers. After that, the work runs itself.',
  },
] as const;

function Steps() {
  return (
    <section id="how" className="border-t border-navy/10 px-6 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-content">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-[32px] font-extrabold leading-[0.95] tracking-[-0.04em] lowercase text-navy sm:text-[48px]">
            how it works
          </h2>
          <p className="max-w-[38ch] font-serif text-base italic leading-[1.5] text-navy/60 sm:text-lg">
            No six-month transformations. Find the friction, build the system, stay until it sticks.
          </p>
        </div>

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
/*  Offerings — two full-width editorial rows, not twin cards.                  */
/* -------------------------------------------------------------------------- */

const OFFERINGS = [
  {
    kicker: 'start here',
    title: 'The Audit',
    tagline: 'Find the work worth automating.',
    text: 'A fixed-scope dive into your operation. I map where time and money leak out, then hand you a prioritized build plan: what to automate first, the payback, and how to get there.',
    points: [
      'End-to-end workflow & tool-stack review',
      'Friction & cost-leak mapping',
      'Prioritized automation roadmap with ROI',
    ],
    cta: 'Book an audit →',
  },
  {
    kicker: 'go further',
    title: 'The Build',
    tagline: 'Ship the systems that run it.',
    text: 'Where the audit becomes infrastructure. I build the AI agents, automations, and internal platforms that run your highest-friction work, and stay until your team has fully adopted them.',
    points: [
      'Custom AI agents, automations & internal platforms',
      'API integrations across your existing tools',
      'Fractional AI operations leadership',
    ],
    cta: 'Start a build →',
  },
] as const;

function Offerings() {
  return (
    <section id="services" className="bg-navy px-6 py-16 text-cream sm:px-8 lg:py-20">
      <div className="mx-auto max-w-content">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
          what i do
        </p>
        <h2 className="mb-10 max-w-[16ch] font-display text-[34px] font-extrabold leading-[0.98] tracking-[-0.04em] lowercase text-cream sm:text-[54px]">
          start small, or hand me{' '}
          <FoilText
            variant="copper"
            className="font-serif font-normal italic text-[34px] leading-[0.98] tracking-[-0.03em] sm:text-[54px]"
          >
            the whole operation.
          </FoilText>
        </h2>

        <div>
          {OFFERINGS.map((o) => (
            <div
              key={o.title}
              className="grid gap-6 border-t border-cream/15 py-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
            >
              <div>
                <p className="mb-4 font-mono text-[9px] uppercase tracking-mono-label text-bright-copper">
                  {o.kicker}
                </p>
                <h3 className="font-display text-[40px] font-extrabold leading-[0.95] tracking-[-0.03em] lowercase text-cream sm:text-[52px]">
                  {o.title}
                </h3>
                <p className="mt-3 font-serif text-lg italic text-soft-gold">{o.tagline}</p>
              </div>

              <div className="max-w-[520px]">
                <p className="font-body text-base leading-[1.65] text-mist">{o.text}</p>
                <ul className="mt-6 space-y-3">
                  {o.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 font-body text-[15px] leading-[1.5] text-mist"
                    >
                      <span
                        className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-copper"
                        aria-hidden
                      />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 inline-block font-mono text-[11px] font-bold uppercase tracking-mono-button text-bright-copper no-underline hover:text-copper"
                >
                  {o.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Proof — a single oversized stat.                                           */
/* -------------------------------------------------------------------------- */

function Proof() {
  return (
    <section className="px-6 py-20 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-content items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-20">
        <p className="font-display text-[88px] font-extrabold leading-[0.8] tracking-[-0.05em] lowercase text-copper sm:text-[132px] lg:text-[168px]">
          six figures
        </p>
        <div className="max-w-[42ch]">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-mono-label text-copper">
            most recently
          </p>
          <p className="font-serif text-2xl italic leading-[1.35] text-navy sm:text-[28px]">
            of operating cost removed for one business in a single year, by handing its busywork to
            systems that run on their own.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Closing CTA — copper block, single accent, full bleed feel.                */
/* -------------------------------------------------------------------------- */

function ClosingCta() {
  return (
    <section className="px-6 pb-20 sm:px-8">
      <div className="mx-auto max-w-content">
        <div className="rounded-2xl bg-copper-foil px-8 py-14 text-navy sm:px-14 sm:py-20">
          <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-mono-eyebrow text-navy/70">
            let&apos;s talk
          </p>
          <p className="max-w-[18ch] font-display text-[44px] font-extrabold leading-[0.9] tracking-[-0.05em] lowercase text-navy sm:text-[72px]">
            book an audit.
          </p>
          <p className="mt-6 max-w-[46ch] font-body text-lg leading-[1.55] text-navy/80">
            Tell me where the manual work is piling up. I respond personally, and only take on
            builds where I can genuinely move the needle.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-block rounded bg-navy px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-mono-button text-cream no-underline"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  PhotoBreak — wide full-width photo, the breather before the dark band.      */
/* -------------------------------------------------------------------------- */

function PhotoBreak() {
  return (
    <section className="px-6 pb-16 sm:px-8 lg:pb-20">
      <PhotoPanel
        className="mx-auto aspect-[16/10] max-w-content sm:aspect-[5/2]"
        label="workspace"
        src="/photos/copper-laptop-desk.jpg"
        alt="A minimal workspace with a copper laptop on a light-wood desk against white paneling"
        sizes="(min-width: 1344px) 1344px, 100vw"
      />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  PhotoPanel — real photo (next/image) with a placeholder fallback.          */
/* -------------------------------------------------------------------------- */

function PhotoPanel({
  className = '',
  label,
  src,
  alt,
  sizes = '(min-width: 1024px) 40vw, 100vw',
}: {
  className?: string;
  label: string;
  src?: string;
  alt?: string;
  sizes?: string;
}) {
  // Real photo: fill the rounded frame, warm ring, subtle navy floor so the
  // image sits on the cream body as a designed element rather than a raw cut-out.
  if (src) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-navy ring-1 ring-navy/10 ${className}`}
      >
        <Image
          src={src}
          alt={alt ?? label}
          fill
          sizes={sizes}
          className="object-cover"
          priority={false}
        />
      </div>
    );
  }

  // Placeholder: copper wash so an empty slot still reads as a designed element.
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-navy ${className}`}
      role="img"
      aria-label={`Photo placeholder: ${label}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-copper/25 via-transparent to-navy" />
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <span className="h-[6px] w-[6px] rounded-full bg-bright-copper" aria-hidden />
        <span className="font-mono text-[9px] uppercase tracking-mono-label text-mist">
          {label}
        </span>
      </div>
    </div>
  );
}
