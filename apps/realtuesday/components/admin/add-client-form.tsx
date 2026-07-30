'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createClient, type CreateClientResult } from '@/app/admin/clients/actions';

const initialState: CreateClientResult = { ok: false };

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: 'lead', label: 'lead' },
  { value: 'qualified', label: 'qualified' },
  { value: 'active', label: 'active' },
  { value: 'dormant', label: 'dormant' },
  { value: 'lost', label: 'lost' },
];

const inputClass =
  'w-full rounded-lg border border-navy/15 bg-white px-3 py-2 font-body text-sm text-navy placeholder:text-navy/35 focus:border-copper focus:outline-none focus:ring-1 focus:ring-copper';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-navy px-4 py-2 font-mono text-[11px] uppercase tracking-mono-label text-cream transition-colors hover:bg-navy-card disabled:opacity-50"
    >
      {pending ? 'saving' : 'add client'}
    </button>
  );
}

/**
 * The add-client form. Posts to the createClient Server Action, shows an
 * inline error on failure, and clears itself on success so the next entry is
 * quick. The list above re-renders via revalidatePath.
 */
export function AddClientForm() {
  const [state, formAction] = useFormState(createClient, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
            name
          </label>
          <input name="name" required placeholder="Person or main contact" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
            company
          </label>
          <input name="company" placeholder="Optional" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
            email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Optional"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
            stage
          </label>
          <select name="status" defaultValue="lead" className={inputClass}>
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <SubmitButton />
        {state.error ? (
          <span className="font-body text-xs text-red-700">{state.error}</span>
        ) : null}
        {state.ok ? (
          <span className="font-body text-xs text-emerald-700">Client added.</span>
        ) : null}
      </div>
    </form>
  );
}
