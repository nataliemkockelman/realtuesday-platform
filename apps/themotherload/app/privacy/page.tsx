import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

/**
 * /privacy — plain-language privacy notice. Short on purpose: the site only
 * collects what the email forms collect (an address, the source slug), and
 * checkout actually happens on Gumroad/Etsy where their privacy terms apply.
 *
 * If/when the shop moves on-platform, this page becomes a real privacy
 * policy with cookie + payment-processor disclosures.
 */

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'How the Motherload handles email signups and what fulfillment partners (Gumroad, Etsy) see.',
  openGraph: {
    title: 'Privacy · the Motherload',
    description:
      'How the Motherload handles email signups and what fulfillment partners (Gumroad, Etsy) see.',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="px-6 pb-10 pt-7 sm:px-8 sm:pt-10">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">&mdash; the privacy bit &mdash;</p>

            <h1 className="font-ml-display text-[clamp(36px,9vw,72px)] italic leading-[0.95] text-cream">
              Privacy, in plain English.
            </h1>

            <span className="rule-coral mb-5 mt-6" aria-hidden="true" />

            <div className="max-w-prose space-y-5 font-serif text-[17px] italic leading-relaxed text-blush sm:text-[18px]">
              <p>
                Short version: I collect your email when you sign up for it, and I don&rsquo;t
                share it. Long version below.
              </p>

              <h2 className="not-italic font-mono text-[11px] font-semibold uppercase tracking-mono-label text-coral-light">
                Email signups
              </h2>
              <p>
                If you give me your email through one of the forms on this site, it goes into a
                list I use to send the thing you asked for (a guide, a printable, or a weekly
                note) and nothing else. One email a week, max. Unsubscribe anytime — every
                email has a link.
              </p>

              <h2 className="not-italic font-mono text-[11px] font-semibold uppercase tracking-mono-label text-coral-light">
                Buying things
              </h2>
              <p>
                Checkout happens on Gumroad or Etsy, not here. When you click a buy button you
                leave this site and land on theirs. They handle the payment, the receipt, and
                the download — and they have their own privacy policies that cover what they
                see.
              </p>

              <h2 className="not-italic font-mono text-[11px] font-semibold uppercase tracking-mono-label text-coral-light">
                What this site itself collects
              </h2>
              <p>
                Basic server logs (IP, browser, page visited) for keeping the site running and
                fending off bots. No third-party trackers, no ad cookies, no fingerprinting.
              </p>

              <h2 className="not-italic font-mono text-[11px] font-semibold uppercase tracking-mono-label text-coral-light">
                Questions
              </h2>
              <p>
                Email me at{' '}
                <a
                  href="mailto:hello@themomload.com"
                  className="text-coral-light underline-offset-4 hover:underline"
                >
                  hello@themomload.com
                </a>{' '}
                and I&rsquo;ll answer like a person.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
