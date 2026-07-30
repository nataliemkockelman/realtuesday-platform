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
 * added later, update the "what I collect" and "who else touches it" sections
 * to match. Keep the last-updated date current when the substance changes.
 */

export const metadata: Metadata = {
  title: 'privacy',
  description:
    'how real tuesday handles the small amount of information you share through this site. plain language, no dark patterns.',
};

const LAST_UPDATED = 'July 5, 2026';

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
          I collect as little as possible, I do not sell anything to anyone, and there are no
          tracking cookies following you around. Here is the full picture.
        </p>
      </div>
    </section>
  );
}

function PrivacyBody() {
  return (
    <section className="px-6 py-12 sm:px-8 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[680px] space-y-10">
        <Section title="what I collect">
          <p>
            The only information I gather is what you type into the contact form: your name, your
            email address, the topic you pick, and your message. That is it. I ask for these so I
            can understand your situation and reply to you.
          </p>
        </Section>

        <Section title="what I do with it">
          <p>
            I read it and I respond, personally. I may keep our correspondence so I remember the
            context of our conversation if we work together. I do not add you to a mailing list, and
            I do not send you marketing you did not ask for.
          </p>
        </Section>

        <Section title="who else touches it">
          <p>
            Your message is delivered to my inbox through{' '}
            <a
              href="https://resend.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper underline decoration-copper/40 underline-offset-[3px] hover:text-deep-copper"
            >
              Resend
            </a>
            , the service that sends the email, and it lives in my email provider like any other
            message. The site itself is hosted on{' '}
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
            Facebook pixel, no third-party tracker profiling your visit. If I ever add
            privacy-friendly, cookieless analytics to understand traffic in aggregate, I will update
            this page first.
          </p>
        </Section>

        <Section title="how long I keep things">
          <p>
            I hold onto contact messages only as long as they are useful. If you would like me to
            delete our correspondence, just ask and I will.
          </p>
        </Section>

        <Section title="your choices">
          <p>
            You can ask me what I hold about you, ask me to correct it, or ask me to delete it. No
            forms, no hoops. Email me and I will take care of it.
          </p>
        </Section>

        <Section title="reaching me">
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
