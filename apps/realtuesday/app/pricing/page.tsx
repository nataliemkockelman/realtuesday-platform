import Link from 'next/link';
import type { Metadata } from 'next';
import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { SlotPanel } from '@/components/slot-panel';
import { PricingTier } from '@/components/pricing-tier';
import { PRICING_SECTIONS, PRICING_FAQ, type PricingSection } from '@/lib/pricing';

/**
 * /pricing — what it costs.
 *
 * Copy is verbatim from docs/site-copy-v2.md (PRICING section). One dark hero,
 * then a cream body of pricing sections rendered from PRICING_SECTIONS (each
 * tier via <PricingTier />), the FAQ, and the copper-foil closing block.
 */

export const metadata: Metadata = {
  title: 'pricing',
  description:
    'Fixed scope. Fixed price. You know the number before we start. Audits, builds, websites, training, and ongoing retainers.',
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-navy">
      <SiteNav />
      <PricingHero />

      <div className="bg-cream text-navy">
        {PRICING_SECTIONS.map((section) => (
          <Section key={section.id} section={section} />
        ))}
        <Faq />
        <ClosingCta />
      </div>

      <SiteFooter />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero — the one dark moment.                                                 */
/* -------------------------------------------------------------------------- */

function PricingHero() {
  return (
    <section className="px-6 pb-8 pt-4 sm:px-8 lg:pb-10">
      <div className="mx-auto max-w-content">
        <p className="mb-5 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
          pricing
        </p>
        <h1 className="mb-5">
          <span className="font-display text-[44px] font-extrabold leading-[0.9] tracking-[-0.05em] lowercase text-cream sm:text-[72px] lg:text-[88px]">
            what it{' '}
          </span>
          <FoilText
            variant="copper"
            className="font-serif italic font-normal text-[44px] leading-[0.9] tracking-[-0.03em] sm:text-[72px] lg:text-[88px]"
          >
            costs.
          </FoilText>
        </h1>
        <p className="max-w-[54ch] font-serif text-lg italic leading-[1.4] text-mist sm:text-xl">
          Fixed scope. Fixed price. You know the number before we start, and it doesn&apos;t move
          unless you ask it to.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section — one pricing section: heading, body, tiers, note, image, CTA.      */
/* -------------------------------------------------------------------------- */

function Section({ section }: { section: PricingSection }) {
  return (
    <section className="border-t border-navy/10 px-6 py-14 sm:px-8 lg:py-16">
      <div className="mx-auto max-w-content">
        <h2 className="font-display text-[30px] font-extrabold leading-[1] tracking-[-0.04em] lowercase text-navy sm:text-[44px]">
          {section.heading}
        </h2>

        {section.body ? (
          <div className="mt-6 max-w-[64ch] space-y-4 font-body text-lg leading-[1.6] text-navy/70">
            {section.body.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        ) : null}

        <div className="mt-10">
          {section.tiers.map((tier) => (
            <PricingTier key={tier.name} tier={tier} />
          ))}
        </div>

        {section.note ? (
          <p className="mt-6 max-w-[64ch] font-serif text-base italic leading-[1.55] text-navy/60 sm:text-lg">
            {section.note}
          </p>
        ) : null}

        {section.imageSlot ? (
          <div className="mt-10">
            {/* IMG-08 — audit deliverable visual */}
            <SlotPanel slot={section.imageSlot as 'IMG-08'} />
          </div>
        ) : null}

        {section.cta ? (
          <Link
            href={section.cta.href as '/contact'}
            className="mt-8 inline-block rounded bg-copper px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-mono-button text-navy no-underline"
          >
            {section.cta.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ — hairline Q&A rows.                                                     */
/* -------------------------------------------------------------------------- */

function Faq() {
  return (
    <section className="border-t border-navy/10 px-6 py-14 sm:px-8 lg:py-16">
      <div className="mx-auto max-w-content">
        <h2 className="mb-10 font-display text-[30px] font-extrabold leading-[1] tracking-[-0.04em] lowercase text-navy sm:text-[44px]">
          questions.
        </h2>
        <div>
          {PRICING_FAQ.map((item) => (
            <div
              key={item.question}
              className="grid gap-3 border-t border-navy/10 py-7 sm:grid-cols-[0.9fr_1.1fr] sm:gap-10 lg:gap-16"
            >
              <h3 className="font-display text-[19px] font-bold leading-[1.2] tracking-[-0.02em] lowercase text-navy sm:text-[22px]">
                {item.question}
              </h3>
              <p className="max-w-[54ch] font-body text-base leading-[1.65] text-navy/70">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Closing CTA — copper-foil block, matching the rest of the site.            */
/* -------------------------------------------------------------------------- */

function ClosingCta() {
  return (
    <section className="px-6 pb-20 pt-4 sm:px-8">
      <div className="mx-auto max-w-content">
        <div className="rounded-2xl bg-copper-foil px-8 py-14 text-navy sm:px-14 sm:py-20">
          <p className="max-w-[18ch] font-display text-[40px] font-extrabold leading-[0.9] tracking-[-0.05em] lowercase text-navy sm:text-[64px]">
            know your number before you start.
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
