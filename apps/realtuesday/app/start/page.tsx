import type { Metadata } from 'next';
import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { IntakeForm } from './intake-form';

/**
 * /start — the website intake. A prospect fills this out; the submitIntake
 * server action (app/start/actions.ts) opens a lead in the CRM, stores the
 * answers in intake_submissions, and emails the studio. You review everything
 * at /admin/intake.
 *
 * Same shape as /contact: one dark hero moment, then a warm cream body with
 * the form on the left and a short "what happens next" sidebar on the right.
 * This page is intentionally not in the top nav — it's a link you send to a
 * prospect directly.
 */

export const metadata: Metadata = {
  title: 'start a project',
  description:
    'tell real tuesday about your website project. a few quick questions so we can scope it right and reply personally.',
};

export default function StartPage() {
  return (
    <main className="min-h-screen bg-navy">
      <SiteNav />
      <StartHero />

      <div className="bg-cream text-navy">
        <StartBody />
      </div>

      <SiteFooter />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero — the one dark moment.                                                 */
/* -------------------------------------------------------------------------- */

function StartHero() {
  return (
    <section className="px-6 pb-8 pt-4 sm:px-8 lg:pb-10">
      <div className="mx-auto max-w-content">
        <p className="mb-5 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
          project intake
        </p>
        <h1 className="mb-5">
          <span className="block font-display text-[40px] font-extrabold leading-[0.85] tracking-[-0.06em] lowercase text-cream sm:text-[64px] lg:text-[80px]">
            let&apos;s build
          </span>
          <FoilText
            variant="copper"
            className="block font-serif italic font-normal text-[40px] leading-[0.95] tracking-[-0.03em] pb-2 sm:text-[64px] lg:text-[80px]"
          >
            your site.
          </FoilText>
        </h1>
        <p className="max-w-[52ch] font-serif text-lg italic leading-[1.4] text-mist sm:text-xl">
          A few quick questions so we can scope it right the first time. Answer what you can. The
          starred ones are all we truly need to get back to you.
        </p>
        <p className="mt-6 max-w-prose font-body text-sm leading-[1.55] text-mist sm:text-base">
          Prefer to just talk? Email us at{' '}
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
/*  Body — form left, "what happens next" sidebar right, on cream.              */
/* -------------------------------------------------------------------------- */

function StartBody() {
  return (
    <section className="px-6 py-12 sm:px-8 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-content gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
        <IntakeForm />

        <aside className="space-y-8">
          <Block
            title="what happens next"
            body="One of us reads it personally, usually within a day or two, and comes back with a first read on scope and price. No auto-reply, no sales sequence."
          />
          <Block
            title="then a short call"
            body="If it looks like a fit, we hop on a call to fill in the gaps. Most projects get a real quote within a week of first contact."
          />
          <Block
            title="your domain stays yours"
            body="You own your domain and hosting, in your name. We set it up and manage it; we never hold your site hostage."
          />
          <Block
            title="more than a website?"
            body="If the manual work behind the business is the real problem, tell us in the last question. It's often the bigger win."
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
