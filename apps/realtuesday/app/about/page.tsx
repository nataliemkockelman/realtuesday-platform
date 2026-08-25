import Link from 'next/link';
import type { Metadata } from 'next';
import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { PersonBio } from '@/components/person-bio';
import { SlotPanel } from '@/components/slot-panel';
import { TEAM } from '@/lib/team';

/**
 * /about — the two operators behind real Tuesday.
 *
 * Copy is verbatim from docs/site-copy-v2.md (ABOUT section). One dark hero
 * moment, then a cream body: the two bios rendered side by side from the TEAM
 * data (via <PersonBio />, not hardcoded), the "what you can expect" blocks,
 * and the copper-foil closing block.
 */

export const metadata: Metadata = {
  title: 'about',
  description:
    'real Tuesday is an operations studio run by two senior operators. We find the manual work that eats your week, build the systems that run it, and stay until your team adopts them.',
};

const HOW_WE_WORK = [
  {
    title: 'We tell you when we\u2019re not the fit.',
    text: 'There\u2019s a version of this where we take every project and stretch. We\u2019d rather send you somewhere better and keep the relationship.',
  },
  {
    title: 'We price before we start.',
    text: 'Fixed scope, fixed number. If the scope changes, we tell you what it costs before we do it, not after.',
  },
  {
    title: 'We stay until adoption is real.',
    text: 'Handing over a login isn\u2019t a handoff. We\u2019re done when your team uses it without thinking about it.',
  },
  {
    title: 'We\u2019re small on purpose.',
    text: 'Two people means fewer clients at once. It also means nobody is guessing what you asked for.',
  },
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-navy">
      <SiteNav />
      <AboutHero />

      <div className="bg-cream text-navy">
        <Bios />
        <HowWeWork />
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
            two operators.
          </span>
          <FoilText
            variant="copper"
            className="block font-serif italic font-normal text-[40px] leading-[0.95] tracking-[-0.03em] pb-2 sm:text-[64px] lg:text-[80px]"
          >
            no agency behind us.
          </FoilText>
        </h1>
        <p className="max-w-[52ch] font-serif text-lg italic leading-[1.4] text-mist sm:text-xl">
          We built this the way we wished consultants worked when we were the ones hiring them.
        </p>

        {/* IMG-05 — the two of you together */}
        <div className="mt-8">
          <SlotPanel slot="IMG-05" priority />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bios — two operators, side by side, from the TEAM data.                     */
/* -------------------------------------------------------------------------- */

function Bios() {
  return (
    <section className="px-6 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto grid max-w-content gap-12 lg:grid-cols-2 lg:gap-16">
        {TEAM.map((person) => (
          <PersonBio key={person.id} person={person} />
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  How we work — "what you can expect", four blocks.                           */
/* -------------------------------------------------------------------------- */

function HowWeWork() {
  return (
    <section className="border-t border-navy/10 px-6 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-content">
        <h2 className="mb-10 font-display text-[32px] font-extrabold leading-[0.95] tracking-[-0.04em] lowercase text-navy sm:text-[48px]">
          what you can expect.
        </h2>
        <div className="grid gap-x-16 gap-y-10 sm:grid-cols-2">
          {HOW_WE_WORK.map((block) => (
            <div key={block.title} className="max-w-[46ch]">
              <h3 className="mb-3 font-display text-[22px] font-bold leading-[1.15] tracking-[-0.02em] text-navy sm:text-[26px]">
                {block.title}
              </h3>
              <p className="font-body text-base leading-[1.65] text-navy/70">{block.text}</p>
            </div>
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
          <p className="max-w-[20ch] font-display text-[40px] font-extrabold leading-[0.9] tracking-[-0.05em] lowercase text-navy sm:text-[64px]">
            the first call is thirty minutes.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-block rounded bg-navy px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-mono-button text-cream no-underline"
          >
            book an audit →
          </Link>
        </div>
      </div>
    </section>
  );
}
