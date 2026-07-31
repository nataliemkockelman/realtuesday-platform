'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { acceptInvite, type FormResult } from '@/app/admin/auth-actions';

const initial: FormResult = { ok: false };

const inputClass =
  'w-full rounded-lg border border-navy/15 bg-white px-3 py-2.5 font-body text-sm text-navy placeholder:text-navy/35 focus:border-copper focus:outline-none focus:ring-1 focus:ring-copper';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-navy px-4 py-2.5 font-mono text-[11px] uppercase tracking-mono-button text-cream transition-colors hover:bg-navy-card disabled:opacity-50"
    >
      {pending ? 'setting up' : 'create my access'}
    </button>
  );
}

/** The admin invite-accept form. `token` and the invited `email` come from the
 *  server component that already validated the link. */
export function AdminAcceptForm({ token, email }: { token: string; email: string }) {
  const [state, formAction] = useFormState(acceptInvite, initial);
  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      <div>
        <label className="mb-1 block font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
          email
        </label>
        <input
          type="email"
          value={email}
          readOnly
          className={`${inputClass} bg-bone/60 text-navy/60`}
        />
      </div>
      <div>
        <label className="mb-1 block font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
          choose a password
        </label>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="At least 8 characters"
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1 block font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
          confirm password
        </label>
        <input
          name="confirm"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={inputClass}
        />
      </div>
      {state.error ? <p className="font-body text-xs text-red-700">{state.error}</p> : null}
      <Submit />
    </form>
  );
}
