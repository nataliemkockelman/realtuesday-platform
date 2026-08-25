import Link from 'next/link';
import type { Metadata } from 'next';
import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { getPublishedOfferings } from '@/lib/offerings-public';
import { formatCents } from '@/lib/format';

/**
 * /offerings — the public price list. Reads the PUBLISHED offerings from
 * Supabase (RLS hides drafts) and renders them in the studio's editorial
 * rhythm: dark hero, then a cream body of hairline-separated rows. The list is
 * edited from /admin/offerings; publishing a row there makes it appear here.
 *
 * Revalidates on a short interval and on write (the admin actions call
 * revalidatePath('/offerings')), so edits show up without a redeploy.
 */
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'offerings',
  description:
    'what real tuesday offers and what it costs. ai operations work, priced plainly.',
};

export default async function OfferingsPage() {
  const offerings = await getPublishedOfferings();

  return (
    <main className="min-h-screen bg-navy">
      <SiteNav />
      <OfferingsHero />

      <div className="bg-cream text-navy">
        {offerings.length > 0 ? <PriceList offerings={offerings} /> : <ComingSoon />}
        <ClosingCta />
      </div>

      <SiteFooter />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero — the one dark moment.                                                 */
/* -------------------------------------------------------------------------- */

function OfferingsHero() {
  return (
    <section className="px-6 pb-8 pt-4 sm:px-8 lg:pb-10">
      <div className="mx-auto max-w-content">
        <p className="mb-5 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
          offerings
        </p>
        <h1 className="mb-5">
          <span className="block font-display text-[40px] font-extrabold leading-[0.85] tracking-[-0.06em] lowercase text-cream sm:text-[64px] lg:text-[80px]">
            what it costs to
          </span>
          <FoilText
            variant="copper"
            className="block font-serif italic font-normal text-[40px] leading-[0.95] tracking-[-0.03em] pb-2 sm:text-[64px] lg:text-[80px]"
          >
            work together.
          </FoilText>
        </h1>
        <p className="max-w-[52ch] font-serif text-lg italic leading-[1.4] text-mist sm:text-xl">
          Priced plainly, no packages to decode. Where the work is custom, the number is a starting
          point and we scope the rest together.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Price list — hairline-separated editorial rows.                             */
/* -------------------------------------------------------------------------- */

function PriceList({
  offerings,
}: {
  offerings: Awaited<ReturnType<typeof getPublishedOfferings>>;
}) {
  return (
    <section className="px-6 py-12 sm:px-8 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-content">
        {offerings.map((o) => {
          const hasPrice = o.price_cents != null;
          return (
            <div
              key={o.id}
              className="grid items-baseline gap-3 border-t border-navy/10 py-8 sm:grid-cols-[1fr_auto] sm:gap-10"
            >
              <div className="max-w-[620px]">
                <h2 className="mb-2 font-display text-[26px] font-bold leading-[1.05] tracking-[-0.02em] lowercase text-navy sm:text-[32px]">
                  {o.name}
                </h2>
                {o.summary ? (
                  <p className="font-body text-base leading-[1.6] text-navy/70">{o.summary}</p>
                ) : null}
              </div>
              <div className="sm:text-right">
                {o.price_note ? (
                  <p className="font-mono text-[10px] uppercase tracking-mono-label text-copper">
                    {o.price_note}
                  </p>
                ) : null}
                {hasPrice ? (
                  <p className="font-display text-[28px] font-extrabold leading-none tracking-[-0.02em] text-navy sm:text-[36px]">
                    {formatCents(o.price_cents)}
                  </p>
                ) : !o.price_note ? (
                  <p className="font-serif text-lg italic text-navy/60">let&apos;s talk</p>
                ) : null}
              </div>
            </div>
          );
        })}
        <div className="border-t border-navy/10" />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Coming soon — graceful empty state before anything is published.            */
/* -------------------------------------------------------------------------- */

function ComingSoon() {
  return (
    <section className="px-6 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-content">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-mono-eyebrow text-copper">
          in the works
        </p>
        <p className="max-w-[24ch] font-display text-[30px] font-extrabold leading-[1.02] tracking-[-0.04em] lowercase text-navy sm:text-[44px]">
          the price list is being{' '}
          <span className="font-serif font-normal italic text-copper">finalized.</span>
        </p>
        <p className="mt-6 max-w-[46ch] font-body text-lg leading-[1.6] text-navy/70">
          In the meantime, the fastest way to a number is a conversation. Tell me what you&apos;re
          trying to fix and I&apos;ll scope it.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Closing CTA — copper-foil block, matching the rest of the site.             */
/* -------------------------------------------------------------------------- */

function ClosingCta() {
  return (
    <section className="border-t border-navy/10 px-6 pb-20 pt-14 sm:px-8">
      <div className="mx-auto max-w-content">
        <div className="rounded-2xl bg-copper-foil px-8 py-14 text-navy sm:px-14 sm:py-20">
          <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-mono-eyebrow text-navy/70">
            let&apos;s talk
          </p>
          <p className="max-w-[20ch] font-display text-[40px] font-extrabold leading-[0.9] tracking-[-0.05em] lowercase text-navy sm:text-[64px]">
            not sure what you need?
          </p>
          <p className="mt-6 max-w-[48ch] font-body text-lg leading-[1.55] text-navy/80">
            Most engagements start with a short audit. We find the work worth automating, then price
            it against what it&apos;s costing you now.
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
