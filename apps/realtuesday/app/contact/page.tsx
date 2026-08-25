import type { Metadata } from 'next';
import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { ContactForm } from './contact-form';

/**
 * /contact — book an audit, start a build, or just say hi.
 *
 * Mirrors the home + about rhythm: one dark hero moment (eyebrow, foil
 * title, deck + direct-email fallback), then a warm cream body carrying
 * the form on the left and a "what to expect" sidebar on the right.
 *
 * The form posts to the sendContactMessage server action (app/contact/
 * actions.ts), which sends via Resend and returns success/error state that
 * ContactForm renders inline. Spam is handled by a hidden honeypot field.
 */

export const metadata: Metadata = {
  title: 'contact',
  description:
    'book an operations audit or start a build with real tuesday. tell us where the manual work is piling up.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-navy">
      <SiteNav />
      <ContactHero />

      <div className="bg-cream text-navy">
        <ContactBody />
      </div>

      <SiteFooter />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero — the one dark moment.                                                 */
/* -------------------------------------------------------------------------- */

function ContactHero() {
  return (
    <section className="px-6 pb-8 pt-4 sm:px-8 lg:pb-10">
      <div className="mx-auto max-w-content">
        <p className="mb-5 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
          contact
        </p>
        <h1 className="mb-5">
          <span className="block font-display text-[40px] font-extrabold leading-[0.85] tracking-[-0.06em] lowercase text-cream sm:text-[64px] lg:text-[80px]">
            let&apos;s
          </span>
          <FoilText
            variant="copper"
            className="block font-serif italic font-normal text-[40px] leading-[0.95] tracking-[-0.03em] pb-2 sm:text-[64px] lg:text-[80px]"
          >
            talk.
          </FoilText>
        </h1>
        <p className="max-w-[52ch] font-serif text-lg italic leading-[1.4] text-mist sm:text-xl">
          Tell us about your operation and where the manual work is piling up. We respond
          personally, and only take on engagements where we can genuinely move the needle.
        </p>
        <p className="mt-6 max-w-prose font-body text-sm leading-[1.55] text-mist sm:text-base">
          Or just email us directly at{' '}
          <a
            href="mailto:hi@arealtuesday.com"
            className="font-mono text-bright-copper underline decoration-copper/40 underline-offset-[3px] hover:text-soft-gold"
          >
            hi@arealtuesday.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Body — form left, "what to expect" sidebar right, on cream.                 */
/* -------------------------------------------------------------------------- */

function ContactBody() {
  return (
    <section className="px-6 py-12 sm:px-8 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-content gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
        <ContactForm />

        <aside className="space-y-8">
          <Block
            title="the audit"
            body="A fixed-scope dive into your operation. You leave with a prioritized build plan and an ROI estimate per opportunity."
          />
          <Block
            title="the build"
            body="Where the audit becomes infrastructure. Automations, integrations, and internal platforms your team actually adopts."
          />
          <Block
            title="capacity"
            body="We take on a limited number of builds at a time so every client gets real attention. If we're full or not the right fit, we'll tell you honestly."
          />
          <Block
            title="response"
            body="We respond personally. No auto-replies, no account manager, no junior handoff."
          />
        </aside>
      </div>
    </section>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-l-2 border-copper/40 pl-4">
      <h2 className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-mono-button text-copper">
        {title}
      </h2>
      <p className="font-serif italic text-sm leading-[1.55] text-navy/60 sm:text-base">{body}</p>
    </div>
  );
}
