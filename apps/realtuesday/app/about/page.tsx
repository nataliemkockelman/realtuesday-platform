import Link from 'next/link';
import type { Metadata } from 'next';
import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { PersonBio } from '@/components/person-bio';
import { SlotPanel } from '@/components/slot-panel';
import { TEAM } from '@/lib/team';

/**
 * /about — the operator behind real Tuesday.
 *
 * Copy is verbatim from docs/site-copy-v2.md (ABOUT section). One dark hero
 * moment, then a cream body: the bio rendered from the TEAM data (via
 * <PersonBio />, not hardcoded), the "what you can expect" blocks, and the
 * copper-foil closing block.
 */

export const metadata: Metadata = {
  title: 'about',
  description:
    'real Tuesday is an operations studio run by one senior operator. I find the manual work that eats your week, build the systems that run it, and stay until your team adopts them.',
};

const HOW_WE_WORK = [
  {
    title: 'I tell you when I\u2019m not the fit.',
    text: 'There\u2019s a version of this where I take every project and stretch. I\u2019d rather send you somewhere better and keep the relationship.',
  },
  {
    title: 'I price before I start.',
    text: 'Fixed scope, fixed number. If the scope changes, I tell you what it costs before I do it, not after.',
  },
  {
    title: 'I stay until adoption is real.',
    text: 'Handing over a login isn\u2019t a handoff. I\u2019m done when your team uses it without thinking about it.',
  },
  {
    title: 'I\u2019m small on purpose.',
    text: 'One person means fewer clients at once. It also means nobody is guessing what you asked for.',
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
            one operator.
          </span>
          <FoilText
            variant="copper"
            className="block font-serif italic font-normal text-[40px] leading-[0.95] tracking-[-0.03em] pb-2 sm:text-[64px] lg:text-[80px]"
          >
            no agency behind me.
          </FoilText>
        </h1>
        <p className="max-w-[52ch] font-serif text-lg italic leading-[1.4] text-mist sm:text-xl">
          I built this the way I wished consultants worked when I was the one hiring them.
        </p>

        {/* IMG-05 — at the table, working */}
        <div className="mt-8">
          <SlotPanel slot="IMG-05" priority />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bio — the one operator, from the TEAM data.                                 */
/* -------------------------------------------------------------------------- */

function Bios() {
  return (
    <section className="px-6 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-[560px]">
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
