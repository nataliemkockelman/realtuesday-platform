'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitIntake, type IntakeState } from './actions';
import { BUDGET_OPTIONS } from '@/lib/intake';

/**
 * Website intake form (client). Wraps the submitIntake server action with
 * useFormState for inline success / error feedback and useFormStatus for the
 * in-flight button. On success the form is replaced with a confirmation panel.
 *
 * Field names must match app/start/actions.ts. The hidden "fax" input is the
 * honeypot: off-screen, out of tab order, never shown to real users.
 */

const initialState: IntakeState = { status: 'idle', message: '' };

const inputClass =
  'w-full rounded border border-navy/15 bg-white px-4 py-3.5 font-body text-sm text-navy placeholder:text-navy/40 focus:border-copper focus:outline-none';

export function IntakeForm() {
  const [state, formAction] = useFormState(submitIntake, initialState);

  if (state.status === 'success') {
    return (
      <div className="rounded border border-navy/15 bg-white px-6 py-8">
        <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-mono-button text-copper">
          received
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
          Fax
          <input type="text" name="fax" tabIndex={-1} autoComplete="off" />
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

      {/* Who you are */}
      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field label="your name *">
          <input name="contact_name" type="text" required autoComplete="name" className={inputClass} />
        </Field>
        <Field label="your email *">
          <input name="email" type="email" required autoComplete="email" className={inputClass} />
        </Field>
        <Field label="company">
          <input name="company" type="text" autoComplete="organization" className={inputClass} />
        </Field>
        <Field label="phone">
          <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </Field>
      </div>

      {/* The site */}
      <Field label="what does your business do? *">
        <textarea
          name="business_type"
          required
          rows={2}
          placeholder="Say it the way you'd say it to a friend."
          className={inputClass}
        />
      </Field>

      <Field label="if the new site does one thing well, what is it? *">
        <textarea
          name="primary_goal"
          required
          rows={2}
          placeholder="Get calls, take bookings, sell a product, look credible…"
          className={inputClass}
        />
      </Field>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field label="do you have a site today?">
          <input
            name="current_site"
            type="text"
            placeholder="Paste the link, or say “none”."
            className={inputClass}
          />
        </Field>
        <Field label="do you own a domain?">
          <input
            name="domain_status"
            type="text"
            placeholder="Which one, or “need one”."
            className={inputClass}
          />
        </Field>
        <Field label="budget range *">
          <select name="budget_range" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              pick one
            </option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
        <Field label="any hard deadline?">
          <input
            name="timeline"
            type="text"
            placeholder="Event, launch, or “no rush”."
            className={inputClass}
          />
        </Field>
      </div>

      {/* The poke-around */}
      <Field label="outside the website, where does your team lose the most time?">
        <textarea
          name="beyond_website"
          rows={3}
          placeholder="Repetitive manual work, two tools that don't talk, a report someone rebuilds by hand… (optional, but it helps us help you)"
          className={inputClass}
        />
      </Field>

      <Field label="anything else we should know?">
        <textarea name="message" rows={3} className={inputClass} />
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
