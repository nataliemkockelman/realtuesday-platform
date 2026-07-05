import Link from 'next/link';
import type { Metadata } from 'next';
import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';

/**
 * /about — the operator story behind Real Tuesday.
 *
 *   eyebrow → foil title → deck → rule
 *   · the operator — bio, no name (studio, not agency)
 *   · how i work — three principles
 *   · the mission
 *   · built with — tool strip
 *   · cta → /contact
 *
 * No personal name and no location per brand direction — the work is the
 * introduction, not the resume.
 */

export const metadata: Metadata = {
  title: 'about',
  description:
    'real tuesday is an ai operations studio. one operator who finds the work your business hates, builds the systems that run it, and stays until your team adopts them.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <SiteNav />

      <section className="px-6 pt-8 pb-9 sm:px-8 sm:pt-12">
        <div className="mx-auto max-w-content">
          <p className="mb-7 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
            — about —
          </p>

          <h1>
            <span className="mb-1 block font-display text-[52px] font-extrabold leading-[0.85] tracking-[-0.06em] lowercase text-cream sm:text-[112px]">
              one operator who
            </span>
            <FoilText
              variant="copper"
              className="block font-serif italic font-normal text-[52px] leading-[1] tracking-[-0.03em] pb-3 sm:text-[112px]"
            >
              actually builds.
            </FoilText>
          </h1>

          <span className="rule-copper mt-3 mb-[22px]" />

          <p className="mb-12 max-w-prose font-serif italic text-lg leading-[1.45] text-mist sm:text-xl">
            Real Tuesday is a studio, not an agency. You work directly with the person doing the
            work. No account managers, no junior handoffs, no decks that go nowhere.
          </p>

          <div className="mx-auto max-w-[640px] space-y-12">
            <section>
              <h2 className="mb-3 font-display text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] lowercase text-cream sm:text-[32px]">
                the operator.
              </h2>
              <div className="space-y-4 font-body text-base leading-[1.65] text-mist sm:text-[17px]">
                <p>
                  An operations leader and builder. I&apos;ve spent my career designing processes
                  and scaling teams inside fast-growing companies, and increasingly building the AI
                  systems that quietly run the work underneath.{' '}
                  <em className="font-serif italic text-mist">
                    Multiple internal platforms shipped end-to-end, a fleet of AI agents in
                    production, and six figures of operating cost removed in a single year.
                  </em>
                </p>
                <p>
                  I&apos;ve gone deep in high-volume, operations-heavy businesses, and the approach
                  works anywhere there&apos;s manual work worth eliminating. I started Real Tuesday
                  to do this for more than one company at a time.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-3 font-display text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] lowercase text-cream sm:text-[32px]">
                how i work.
              </h2>
              <ul className="space-y-5">
                {PRINCIPLES.map((p) => (
                  <li key={p.title} className="grid grid-cols-[auto_1fr] gap-4">
                    <span className="font-serif text-[22px] font-normal italic leading-none text-copper">
                      {p.num}
                    </span>
                    <div>
                      <h3 className="mb-1 font-display text-base font-bold text-cream">{p.title}</h3>
                      <p className="font-body text-[15px] leading-[1.6] text-mist sm:text-base">
                        {p.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-display text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] lowercase text-cream sm:text-[32px]">
                the mission.
              </h2>
              <p className="font-serif italic text-lg leading-[1.5] text-mist sm:text-xl">
                Give growing businesses the operational leverage of a much bigger team, by automating
                the work nobody should be doing by hand.
              </p>
            </section>

            <section>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-mono-label text-bright-copper">
                — built with —
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 font-body text-sm font-medium text-mist">
                {['Claude', 'Next.js', 'Supabase', 'Cloudflare', 'Stripe', 'Python'].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </section>

            <div className="border-t border-cream/10 pt-8">
              <p className="mb-4 font-serif italic text-base leading-[1.55] text-mist sm:text-lg">
                If manual work is piling up somewhere in your operation, that&apos;s the place to
                start.
              </p>
              <Link
                href="/contact"
                className="inline-block rounded bg-copper px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-mono-button text-navy no-underline"
              >
                Book an audit →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

const PRINCIPLES = [
  {
    num: '01',
    title: 'Show the work.',
    text: 'No decks that disappear. The value is in what gets built, shipped, and sustained.',
  },
  {
    num: '02',
    title: 'Build for adoption.',
    text: "A system nobody uses is worthless. I'm not done until your team has actually switched over.",
  },
  {
    num: '03',
    title: 'Honest partnership.',
    text: "I'll tell you what's worth automating, what isn't, and where you don't need me at all.",
  },
] as const;
