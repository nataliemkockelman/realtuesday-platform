'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { signIn, type FormResult } from '@/app/admin/auth-actions';

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
      {pending ? 'signing in' : 'sign in'}
    </button>
  );
}

export function AdminLoginForm() {
  const [state, formAction] = useFormState(signIn, initial);
  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="mb-1 block font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
          email
        </label>
        <input name="email" type="email" required autoComplete="email" className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
          password
        </label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>
      {state.error ? <p className="font-body text-xs text-red-700">{state.error}</p> : null}
      <Submit />
    </form>
  );
}
