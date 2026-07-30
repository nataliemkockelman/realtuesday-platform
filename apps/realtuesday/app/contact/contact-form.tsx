'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { sendContactMessage, type ContactState } from './actions';

/**
 * Contact form (client) — wraps the sendContactMessage server action with
 * useFormState so the page can show inline success / error feedback, and
 * useFormStatus so the button reflects the in-flight state.
 *
 * On success the form is replaced with a confirmation panel so the visitor
 * gets a clear "it went through" moment instead of a silently reset form.
 *
 * Field names must match app/contact/actions.ts. The hidden "company" input
 * is the honeypot — kept out of the tab order and off-screen, never shown to
 * real users.
 */

const initialState: ContactState = { status: 'idle', message: '' };

export function ContactForm() {
  const [state, formAction] = useFormState(sendContactMessage, initialState);

  if (state.status === 'success') {
    return (
      <div className="rounded border border-navy/15 bg-white px-6 py-8">
        <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-mono-button text-copper">
          sent
        </p>
        <p className="font-serif text-lg italic leading-[1.4] text-navy">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-3.5">
      {/* Honeypot: hidden from humans, catches naive bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === 'error' && (
        <p
          role="alert"
          className="rounded border border-deep-copper/40 bg-deep-copper/5 px-4 py-3 font-body text-sm text-deep-copper"
        >
          {state.message}
        </p>
      )}

      <Field label="your name">
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded border border-navy/15 bg-white px-4 py-3.5 font-body text-sm text-navy placeholder:text-navy/40 focus:border-copper focus:outline-none"
        />
      </Field>

      <Field label="your email">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded border border-navy/15 bg-white px-4 py-3.5 font-body text-sm text-navy placeholder:text-navy/40 focus:border-copper focus:outline-none"
        />
      </Field>

      <Field label="what's this about">
        <select
          name="topic"
          required
          defaultValue=""
          className="w-full rounded border border-navy/15 bg-white px-4 py-3.5 font-body text-sm text-navy focus:border-copper focus:outline-none"
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
          className="w-full rounded border border-navy/15 bg-white px-4 py-3.5 font-body text-sm text-navy placeholder:text-navy/40 focus:border-copper focus:outline-none"
        />
      </Field>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 self-start rounded bg-navy px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-mono-button text-cream disabled:opacity-60"
    >
      {pending ? 'Sending…' : 'Send it over →'}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="font-mono text-[10px] font-semibold uppercase tracking-mono-button text-copper">
        {label}
      </span>
      {children}
    </label>
  );
}
