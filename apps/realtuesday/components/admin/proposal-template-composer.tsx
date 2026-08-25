'use client';

import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { addProposalTemplate } from '@/app/admin/proposals/actions';

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
      {pending ? 'adding' : 'add template'}
    </button>
  );
}

/** Add a proposal template. Collapsed to a single "new template" button until
 *  you need it, so the three seeded templates stay the focus. */
export function ProposalTemplateComposer() {
  const ref = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-navy/15 px-4 py-2 font-mono text-[11px] uppercase tracking-mono-button text-navy/60 transition-colors hover:bg-navy/5"
      >
        + new template
      </button>
    );
  }

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await addProposalTemplate(formData);
        ref.current?.reset();
        setOpen(false);
      }}
      className="space-y-3"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
            template name (internal)
          </span>
          <input name="name" required placeholder="e.g. Fractional Ops" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
            default proposal title
          </span>
          <input
            name="title"
            required
            placeholder="Proposal for {{company}}"
            className={inputClass}
          />
        </label>
      </div>
      <input name="summary" placeholder="One line on when to use this (optional)" className={inputClass} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-mono-label text-navy/50">$</span>
          <input
            name="price"
            inputMode="decimal"
            placeholder="Default price (optional)"
            className={inputClass}
          />
        </label>
        <input
          name="price_note"
          placeholder='Qualifier — "starting at", "per month"…'
          className={inputClass}
        />
      </div>
      <label className="block">
        <span className="mb-1 block font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
          body · Markdown · placeholders {'{{client}} {{company}} {{date}} {{price}}'}
        </span>
        <textarea
          name="body"
          rows={12}
          placeholder="## Overview&#10;&#10;Write the proposal body here…"
          className={`${inputClass} resize-y font-mono text-[13px] leading-relaxed`}
        />
      </label>
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg border border-navy/15 px-4 py-2 font-mono text-[11px] uppercase tracking-mono-button text-navy/60 transition-colors hover:bg-navy/5"
        >
          cancel
        </button>
        <Submit />
      </div>
    </form>
  );
}
