'use client';

import { SubscribeForm } from '@/components/subscribe-form';

const PDF_PATH = '/free-downloads/claude-meet-your-family.pdf';
// Static HTML served from /public via a next.config rewrite so the URL is
// clean (no .html). Plain <a> rather than next/link — it's a cross-system
// link, not a Next.js route, and typedRoutes wouldn't know about it.
const CONTEXT_BUILDER_PATH = '/context-builder';

interface SetupGuideFormProps {
  /** Distinguishes hero vs final-capture form for analytics + a11y ids. */
  position: 'hero' | 'final';
}

/**
 * Email-capture wrapper for /free/setup-guide.
 *
 * Wraps the shared SubscribeForm with a setup-guide-specific success state:
 * triggers a PDF download via a programmatic <a download> click on success
 * (so the visitor doesn't have to wait for the email to arrive), then
 * renders a custom success card with a manual download fallback link and
 * a CTA to the context-builder form.
 *
 * The programmatic click is the standard pattern for "auto-download on
 * success" — works in every modern browser without popup-blocker issues
 * because it's triggered inside a same-tick user-initiated submit handler.
 */
export function SetupGuideForm({ position }: SetupGuideFormProps) {
  return (
    <SubscribeForm
      source={{ lead_magnet: 'setup-guide' }}
      placeholder="your email"
      submitLabel="Send me the setup guide"
      onSuccess={() => {
        // Trigger a download via a synthesized anchor so the browser treats
        // it as the natural same-origin download flow rather than a navigation.
        const a = document.createElement('a');
        a.href = PDF_PATH;
        a.download = 'claude-meet-your-family.pdf';
        a.rel = 'noopener';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }}
      successContent={() => (
        <div
          role="status"
          aria-live="polite"
          // The cream block already gives navy-on-cream contrast — this
          // success state inherits that and adds a coral hairline above the
          // CTA pair to feel like a follow-up step, not a quiet replacement.
          className="font-body text-navy"
          data-position={position}
        >
          <p className="font-ml-display text-[24px] italic leading-[1.1] text-navy sm:text-[28px]">
            Check your email. The setup guide is on its way.
          </p>
          <p className="mt-3 font-serif text-[15px] italic leading-snug text-navy/70">
            We also kicked off the download. Didn&rsquo;t happen?{' '}
            <a
              href={PDF_PATH}
              download
              className="text-coral underline decoration-coral/40 underline-offset-2 hover:decoration-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              grab it here
            </a>
            .
          </p>
          <div className="mt-5 flex flex-col gap-3 border-t border-navy/10 pt-5 sm:flex-row sm:items-center">
            <a
              href={CONTEXT_BUILDER_PATH}
              className="inline-flex items-center justify-center gap-2 rounded bg-coral px-5 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              Skip the typing — use the form <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      )}
    />
  );
}
