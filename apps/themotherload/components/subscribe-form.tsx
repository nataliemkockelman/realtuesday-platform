'use client';

import { useState, type FormEvent, type ReactNode } from 'react';

export type SubscribeSource =
  | 'home-hero'
  | 'home-email-capture'
  | { lead_magnet: string };

interface SubscribeFormProps {
  /** Where on the site this form lives — sent to the API for analytics later. */
  source: SubscribeSource;
  /** Placeholder text for the input. */
  placeholder?: string;
  /** Submit button label (mono uppercase). */
  submitLabel?: string;
  /**
   * Custom success UI. Replaces the default "On its way" line.
   * Lead-magnet pages use this to render a download CTA + next-step links.
   * Receives the submitted email so it can be referenced in the success copy.
   */
  successContent?: ReactNode | ((args: { email: string }) => ReactNode);
  /** Called once the API returns ok. Lead-magnet pages use this to trigger a PDF download. */
  onSuccess?: (args: { email: string }) => void;
}

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

// Pragmatic email check — RFC 5322 perfection isn't worth the regex weight.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SubscribeForm({
  source,
  placeholder = 'your email',
  submitLabel = 'Send it over',
  successContent,
  onSuccess,
}: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  // Captured at submit time so successContent can reference the email
  // after the input has been cleared.
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus({ kind: 'error', message: 'That doesn\u2019t look like an email — try again?' });
      return;
    }
    setStatus({ kind: 'submitting' });
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source, brand: 'motherload' }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        setStatus({
          kind: 'error',
          message: data.message ?? 'Something went sideways. Try again in a sec?',
        });
        return;
      }
      setSubmittedEmail(trimmed);
      setStatus({ kind: 'success' });
      setEmail('');
      onSuccess?.({ email: trimmed });
    } catch {
      setStatus({
        kind: 'error',
        message: 'Network hiccup. Try once more?',
      });
    }
  }

  if (status.kind === 'success') {
    if (successContent) {
      return (
        <>
          {typeof successContent === 'function'
            ? successContent({ email: submittedEmail })
            : successContent}
        </>
      );
    }
    return (
      <p className="font-serif text-[14px] italic leading-snug text-navy">
        On its way. Check your inbox in a minute.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2.5" noValidate>
      <label className="sr-only" htmlFor="subscribe-email">
        Email address
      </label>
      <input
        id="subscribe-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status.kind === 'error') setStatus({ kind: 'idle' });
        }}
        placeholder={placeholder}
        disabled={status.kind === 'submitting'}
        className="rounded border border-[#ecdfd2] bg-white px-4 py-3.5 font-body text-[14px] text-navy placeholder:text-navy/40 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30 disabled:opacity-60"
        aria-invalid={status.kind === 'error'}
        aria-describedby={status.kind === 'error' ? 'subscribe-error' : undefined}
      />
      <button
        type="submit"
        disabled={status.kind === 'submitting'}
        className="rounded bg-navy px-4 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:opacity-60"
      >
        {status.kind === 'submitting' ? 'Sending\u2026' : (
          <>
            {submitLabel} <span aria-hidden="true">&rarr;</span>
          </>
        )}
      </button>
      {status.kind === 'error' && (
        <p
          id="subscribe-error"
          role="alert"
          className="font-body text-[12px] text-coral"
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
