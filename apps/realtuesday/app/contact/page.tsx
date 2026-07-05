import type { Metadata } from 'next';
import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';

/**
 * /contact — for press, collabs, working with us, or just saying hi.
 *
 * Form posts to a Server Action that currently console.logs. When the
 * platform's Resend integration comes online (per realtuesday-tech-spec.md
 * §"Email · Resend"), swap the body of the action for a Resend send call
 * — keep the field names stable so the action signature doesn't change.
 *
 * No CAPTCHA on this version. If spam shows up, add a honeypot field
 * before reaching for hCaptcha / Cloudflare Turnstile.
 */

export const metadata: Metadata = {
  title: 'contact',
  description:
    'book an operations audit or start a build with real tuesday. tell me where the manual work is piling up.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <SiteNav />

      <section className="px-6 pt-8 pb-9 sm:px-8 sm:pt-12">
        <div className="mx-auto max-w-content">
          <p className="mb-7 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
            — contact —
          </p>

          <h1>
            <span className="mb-1 block font-display text-[64px] font-extrabold leading-[0.85] tracking-[-0.06em] lowercase text-cream sm:text-[112px]">
              say
            </span>
            <FoilText
              variant="copper"
              className="block font-serif italic font-normal text-[64px] leading-[1] tracking-[-0.03em] pb-3 sm:text-[112px]"
            >
              hi.
            </FoilText>
          </h1>

          <span className="rule-copper mt-3 mb-[22px]" />

          <p className="mb-6 max-w-prose font-serif italic text-lg leading-[1.45] text-mist sm:text-xl">
            Tell me about your operation and where the manual work is piling up. I respond
            personally, and only take on engagements where I can genuinely move the needle.
          </p>

          {/* Direct-email fallback for visitors who hate forms (most of them).
              Mailto opens whatever default client they use. */}
          <p className="mb-12 max-w-prose font-body text-sm leading-[1.55] text-mist sm:text-base">
            Or just email us directly at{' '}
            <a
              href="mailto:hi@arealtuesday.com"
              className="font-mono text-copper underline decoration-copper/40 underline-offset-[3px] hover:text-bright-copper"
            >
              hi@arealtuesday.com
            </a>
            .
          </p>

          {/* Two-column on desktop: form left, "what to expect" sidebar right.
              Stacks on mobile. */}
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
            <ContactForm />

            <aside className="space-y-8">
              <Block
                title="the audit"
                body="A fixed-scope dive into your operation. You leave with a prioritized build plan and an ROI estimate per opportunity."
              />
              <Block
                title="the build"
                body="Where the audit becomes infrastructure. Agents, automations, and internal platforms your team actually adopts."
              />
              <Block
                title="capacity"
                body="I take on a limited number of builds at a time so every client gets real attention. If I'm full or not the right fit, I'll tell you honestly."
              />
              <Block
                title="response"
                body="I respond personally. No auto-replies, no account manager, no junior handoff."
              />
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Form                                                                      */
/* -------------------------------------------------------------------------- */

function ContactForm() {
  return (
    <form
      className="grid gap-3.5"
      // Inline server action — handles the submit on the server, no client
      // bundle needed. Swap the console.log for Resend / Supabase when those
      // env vars land in Vercel.
      action={async (formData: FormData) => {
        'use server';
        const payload = {
          name: formData.get('name')?.toString().trim(),
          email: formData.get('email')?.toString().trim(),
          topic: formData.get('topic')?.toString().trim(),
          message: formData.get('message')?.toString().trim(),
        };
        console.log('[realtuesday/contact]', payload);
        // TODO: send via Resend (transactional) once RESEND_API_KEY is set
        // in Vercel env vars. See realtuesday-tech-spec.md §"Email · Resend".
      }}
    >
      <Field label="your name">
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded border border-cream/15 bg-navy-card px-4 py-3.5 font-body text-sm text-cream placeholder:text-mist/40 focus:border-copper focus:outline-none"
        />
      </Field>

      <Field label="your email">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded border border-cream/15 bg-navy-card px-4 py-3.5 font-body text-sm text-cream placeholder:text-mist/40 focus:border-copper focus:outline-none"
        />
      </Field>

      <Field label="what's this about">
        <select
          name="topic"
          required
          defaultValue=""
          className="w-full rounded border border-cream/15 bg-navy-card px-4 py-3.5 font-body text-sm text-cream focus:border-copper focus:outline-none"
        >
          <option value="" disabled>
            pick one
          </option>
          <option value="audit">operations audit</option>
          <option value="build">build &amp; embed</option>
          <option value="fractional">fractional ops (ongoing)</option>
          <option value="unsure">not sure yet</option>
        </select>
      </Field>

      <Field label="message">
        <textarea
          name="message"
          required
          rows={6}
          className="w-full rounded border border-cream/15 bg-navy-card px-4 py-3.5 font-body text-sm text-cream placeholder:text-mist/40 focus:border-copper focus:outline-none"
        />
      </Field>

      <button
        type="submit"
        className="mt-2 self-start rounded bg-copper px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-mono-button text-navy"
      >
        Send it over →
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="font-mono text-[10px] font-semibold uppercase tracking-mono-button text-bright-copper">
        {label}
      </span>
      {children}
    </label>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-l-2 border-copper/40 pl-4">
      <h2 className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-mono-button text-copper">
        {title}
      </h2>
      <p className="font-serif italic text-sm leading-[1.55] text-mist sm:text-base">{body}</p>
    </div>
  );
}
