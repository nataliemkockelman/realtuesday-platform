import type { Metadata } from 'next';
import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';

/**
 * /privacy — plain-language privacy policy.
 *
 * Same rhythm as about/contact: one dark hero moment, then a warm cream body
 * carrying the sections. Written to be read, not to be endured. Reflects the
 * actual data reality of the site: a contact form, transactional email via
 * Resend, and no analytics or advertising trackers.
 *
 * If analytics (Plausible/Umami per the tech spec) or a newsletter signup get
 * added later, update the "what real Tuesday collects" and "who else touches it"
 * sections to match. Keep the last-updated date current when the substance changes.
 *
 * Written in the third person using the business name ("real Tuesday collects…"),
 * not first person — the site is a two-operator studio, not one person.
 */

export const metadata: Metadata = {
  title: 'privacy',
  description:
    'how real tuesday handles the small amount of information you share through this site. plain language, no dark patterns.',
};

const LAST_UPDATED = 'August 24, 2026';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-navy">
      <SiteNav />
      <PrivacyHero />

      <div className="bg-cream text-navy">
        <PrivacyBody />
      </div>

      <SiteFooter />
    </main>
  );
}

function PrivacyHero() {
  return (
    <section className="px-6 pb-8 pt-4 sm:px-8 lg:pb-10">
      <div className="mx-auto max-w-content">
        <p className="mb-5 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
          privacy
        </p>
        <h1 className="mb-5">
          <span className="block font-display text-[40px] font-extrabold leading-[0.85] tracking-[-0.06em] lowercase text-cream sm:text-[64px] lg:text-[80px]">
            the short
          </span>
          <FoilText
            variant="copper"
            className="block font-serif italic font-normal text-[40px] leading-[0.95] tracking-[-0.03em] pb-2 sm:text-[64px] lg:text-[80px]"
          >
            version.
          </FoilText>
        </h1>
        <p className="max-w-[52ch] font-serif text-lg italic leading-[1.4] text-mist sm:text-xl">
          real Tuesday collects as little as possible, sells nothing to anyone, and sets no tracking
          cookies that follow you around. Here is the full picture.
        </p>
      </div>
    </section>
  );
}

function PrivacyBody() {
  return (
    <section className="px-6 py-12 sm:px-8 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[680px] space-y-10">
        <Section title="what real Tuesday collects">
          <p>
            The only information real Tuesday gathers is what you type into the contact form: your
            name, your email address, the topic you pick, and your message. That is it. It is used
            to understand your situation and reply to you.
          </p>
        </Section>

        <Section title="what real Tuesday does with it">
          <p>
            real Tuesday reads it and responds, personally. Your correspondence may be kept so the
            context of the conversation is there if you end up working together. real Tuesday does
            not add you to a mailing list, and does not send you marketing you did not ask for.
          </p>
        </Section>

        <Section title="who else touches it">
          <p>
            Your message is delivered through{' '}
            <a
              href="https://resend.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper underline decoration-copper/40 underline-offset-[3px] hover:text-deep-copper"
            >
              Resend
            </a>
            , the service that sends the email, and it lives in real Tuesday&apos;s email provider
            like any other message. The site itself is hosted on{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper underline decoration-copper/40 underline-offset-[3px] hover:text-deep-copper"
            >
              Vercel
            </a>
            . Both are established providers with their own privacy practices, linked here so you can
            read them.
          </p>
        </Section>

        <Section title="cookies and tracking">
          <p>
            This site sets no advertising or analytics cookies. There is no Google Analytics, no
            Facebook pixel, no third-party tracker profiling your visit. If real Tuesday ever adds
            privacy-friendly, cookieless analytics to understand traffic in aggregate, this page
            will be updated first.
          </p>
        </Section>

        <Section title="how long things are kept">
          <p>
            real Tuesday holds onto contact messages only as long as they are useful. If you would
            like your correspondence deleted, just ask and it will be.
          </p>
        </Section>

        <Section title="your choices">
          <p>
            You can ask what real Tuesday holds about you, ask to have it corrected, or ask to have
            it deleted. No forms, no hoops. Email and it will be taken care of.
          </p>
        </Section>

        <Section title="reaching real Tuesday">
          <p>
            Questions about any of this go to{' '}
            <a
              href="mailto:hi@arealtuesday.com"
              className="font-mono text-deep-copper underline decoration-copper/40 underline-offset-[3px] hover:text-copper"
            >
              hi@arealtuesday.com
            </a>
            .
          </p>
        </Section>

        <p className="border-t border-navy/10 pt-6 font-mono text-[10px] uppercase tracking-mono-label text-navy/50">
          last updated {LAST_UPDATED}
        </p>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-mono-button text-copper">
        {title}
      </h2>
      <div className="space-y-4 font-body text-base leading-[1.65] text-navy/70">{children}</div>
    </div>
  );
}
