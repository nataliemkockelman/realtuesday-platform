'use client';

import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { addOffering } from '@/app/admin/offerings/actions';

const inputClass =
  'w-full rounded-lg border border-navy/15 bg-white px-3 py-2 font-body text-sm text-navy placeholder:text-navy/35 focus:border-copper focus:outline-none focus:ring-1 focus:ring-copper';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-navy px-4 py-2 font-mono text-[11px] uppercase tracking-mono-button text-cream transition-colors hover:bg-navy-card disabled:opacity-50"
    >
      {pending ? 'adding' : 'add offering'}
    </button>
  );
}

/** Add an offering. It lands as a draft at the bottom of the list; nothing goes
 *  public until you publish it. Price is optional — leave it blank and use the
 *  qualifier alone (e.g. "custom quote"). */
export function OfferingComposer() {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        await addOffering(formData);
        ref.current?.reset();
      }}
      className="space-y-3"
    >
      <input name="name" required placeholder="Offering name" className={inputClass} />
      <input
        name="summary"
        placeholder="One line on what it is (optional)"
        className={inputClass}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
            $
          </span>
          <input
            name="price"
            inputMode="decimal"
            placeholder="Price in dollars (optional)"
            className={inputClass}
          />
        </label>
        <input
          name="price_note"
          placeholder='Qualifier — "starting at", "per month"…'
          className={inputClass}
        />
      </div>
      <div className="flex justify-end">
        <Submit />
      </div>
    </form>
  );
}
