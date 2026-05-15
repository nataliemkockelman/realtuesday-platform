import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FoilText } from '@/components/foil-text';
import { SubscribeForm } from '@/components/subscribe-form';
import { LEAD_MAGNETS } from '@/lib/lead-magnets';

interface PageParams {
  params: { slug: string };
}

export async function generateStaticParams() {
  return Object.keys(LEAD_MAGNETS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const lm = LEAD_MAGNETS[params.slug];
  if (!lm) return { title: 'Not found' };
  return {
    title: `${lm.title.replace(/\.$/, '')} ${lm.accent.replace(/\.$/, '')}`.trim(),
    description: lm.intro,
  };
}

/**
 * /free/[slug] — lead magnet landing page.
 *
 * Layout: full editorial column with hero (eyebrow + foil title + intro),
 * a "what's inside" list, and the email-capture form. Form submits to the
 * existing /api/subscribe handler with `source: { lead_magnet: slug }`.
 *
 * Lead magnets unknown to LEAD_MAGNETS render the framework 404 — keeps
 * the site honest until each magnet is intentionally created.
 */
export default function LeadMagnetPage({ params }: PageParams) {
  const lm = LEAD_MAGNETS[params.slug];
  if (!lm) notFound();

  return (
    <>
      <Nav />
      <main>
        <section className="px-6 pb-10 pt-7 sm:px-8 sm:pt-10">
          <div className="mx-auto max-w-content">
            <p
              className="mb-1 inline-block font-script text-eyebrow-script font-semibold text-coral-light"
              style={{ transform: 'rotate(-2deg)' }}
            >
              {lm.eyebrow}
            </p>

            <h1 className="font-ml-display text-[clamp(48px,12vw,96px)] italic leading-[0.95] text-cream">
              <span className="block">{lm.title}</span>
              <FoilText italic className="block font-ml-display font-normal leading-[0.95]">
                {lm.accent}
              </FoilText>
            </h1>

            <span className="rule-coral mb-5 mt-6" aria-hidden="true" />

            <p className="max-w-prose font-serif text-lg italic leading-relaxed text-blush sm:text-xl">
              {lm.intro}
            </p>
          </div>
        </section>

        <section className="px-6 pb-10 sm:px-8">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">&mdash; what&rsquo;s inside &mdash;</p>
            <ul className="space-y-2.5">
              {lm.inside.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 font-serif text-[17px] italic leading-snug text-cream"
                >
                  <span aria-hidden="true" className="mt-2.5 block h-px w-4 flex-none bg-coral" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 pb-16 pt-2 sm:px-8 sm:pb-24">
          <div className="mx-auto max-w-content">
            <div className="-mx-6 rounded-xl bg-cream px-6 pb-10 pt-9 text-navy sm:-mx-8 sm:px-8">
              <p
                className="inline-block font-script text-[22px] font-semibold leading-none text-coral"
                style={{ transform: 'rotate(-2deg)' }}
              >
                drop your email
              </p>
              <h2 className="mb-2.5 mt-2 font-ml-display text-[28px] italic leading-[1.05] text-navy sm:text-[32px]">
                One email. PDF lands in your inbox in 60 seconds.
              </h2>
              <SubscribeForm
                source={{ lead_magnet: lm.slug }}
                submitLabel={lm.submitLabel}
              />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-mono-label text-navy/60">
                {lm.microcopy}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
