'use client';

import { useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import {
  updateOffering,
  deleteOffering,
  setOfferingPublished,
  reorderOffering,
} from '@/app/admin/offerings/actions';
import { formatCents } from '@/lib/format';
import type { Database } from '@/lib/database.types';

type Offering = Database['public']['Tables']['offerings']['Row'];

const inputClass =
  'w-full rounded-lg border border-navy/15 bg-white px-3 py-2 font-body text-sm text-navy placeholder:text-navy/35 focus:border-copper focus:outline-none focus:ring-1 focus:ring-copper';

/** Renders one offering. Reads as a card; click "edit" to swap into an inline
 *  form. The publish toggle, reorder arrows, and delete live on the card. */
export function OfferingList({ offerings }: { offerings: Offering[] }) {
  if (offerings.length === 0) {
    return (
      <p className="font-body text-sm text-navy/40">
        No offerings yet. Add your first one above — it starts as a draft, private until you
        publish it.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {offerings.map((o, i) => (
        <li key={o.id}>
          <OfferingRow offering={o} isFirst={i === 0} isLast={i === offerings.length - 1} />
        </li>
      ))}
    </ul>
  );
}

function PriceLabel({ offering }: { offering: Offering }) {
  const hasPrice = offering.price_cents != null;
  const hasNote = Boolean(offering.price_note);
  if (!hasPrice && !hasNote) {
    return <span className="font-body text-sm text-navy/35">no price set</span>;
  }
  return (
    <span className="font-body text-sm text-navy/70">
      {hasNote ? <span className="text-navy/50">{offering.price_note} </span> : null}
      {hasPrice ? (
        <span className="font-medium text-navy">{formatCents(offering.price_cents)}</span>
      ) : null}
    </span>
  );
}

function OfferingRow({
  offering,
  isFirst,
  isLast,
}: {
  offering: Offering;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [, startTransition] = useTransition();

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await updateOffering(formData);
          setEditing(false);
        }}
        className="space-y-3 rounded-xl border border-copper/40 bg-white p-4"
      >
        <input type="hidden" name="id" value={offering.id} />
        <input
          name="name"
          required
          defaultValue={offering.name}
          placeholder="Offering name"
          className={inputClass}
        />
        <input
          name="summary"
          defaultValue={offering.summary ?? ''}
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
              defaultValue={offering.price_cents != null ? offering.price_cents / 100 : ''}
              placeholder="Price in dollars (optional)"
              className={inputClass}
            />
          </label>
          <input
            name="price_note"
            defaultValue={offering.price_note ?? ''}
            placeholder='Qualifier — "starting at", "per month"…'
            className={inputClass}
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-lg border border-navy/15 px-4 py-2 font-mono text-[11px] uppercase tracking-mono-button text-navy/60 transition-colors hover:bg-navy/5"
          >
            cancel
          </button>
          <SaveButton />
        </div>
      </form>
    );
  }

  return (
    <div className="rounded-xl border border-navy/10 bg-white/70 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-body text-sm font-semibold text-navy">{offering.name}</p>
            <span
              className={`inline-block rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-mono-label ${
                offering.published
                  ? 'border-emerald-600/30 bg-emerald-600/10 text-emerald-800'
                  : 'border-navy/20 bg-navy/5 text-navy/50'
              }`}
            >
              {offering.published ? 'live' : 'draft'}
            </span>
          </div>
          {offering.summary ? (
            <p className="mt-1 font-body text-xs leading-snug text-navy/55">{offering.summary}</p>
          ) : null}
          <p className="mt-2">
            <PriceLabel offering={offering} />
          </p>
        </div>

        {/* Reorder arrows. */}
        <div className="flex shrink-0 flex-col gap-1">
          <button
            type="button"
            aria-label="Move up"
            disabled={isFirst}
            onClick={() => startTransition(() => reorderOffering(offering.id, 'up'))}
            className="rounded border border-navy/15 px-1.5 py-0.5 font-mono text-[10px] text-navy/50 transition-colors hover:bg-navy/5 disabled:opacity-30"
          >
            ↑
          </button>
          <button
            type="button"
            aria-label="Move down"
            disabled={isLast}
            onClick={() => startTransition(() => reorderOffering(offering.id, 'down'))}
            className="rounded border border-navy/15 px-1.5 py-0.5 font-mono text-[10px] text-navy/50 transition-colors hover:bg-navy/5 disabled:opacity-30"
          >
            ↓
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-navy/10 pt-3">
        <button
          type="button"
          onClick={() =>
            startTransition(() => setOfferingPublished(offering.id, !offering.published))
          }
          className={`rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-mono-button transition-colors ${
            offering.published
              ? 'border border-navy/15 text-navy/60 hover:bg-navy/5'
              : 'bg-copper text-cream hover:bg-deep-copper'
          }`}
        >
          {offering.published ? 'unpublish' : 'publish'}
        </button>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="rounded-lg border border-navy/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-mono-button text-navy/60 transition-colors hover:bg-navy/5"
        >
          edit
        </button>
        <form
          action={deleteOffering}
          className="ml-auto"
        >
          <input type="hidden" name="id" value={offering.id} />
          <button
            type="submit"
            className="rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-mono-button text-navy/40 transition-colors hover:text-red-600"
          >
            delete
          </button>
        </form>
      </div>
    </div>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-navy px-4 py-2 font-mono text-[11px] uppercase tracking-mono-button text-cream transition-colors hover:bg-navy-card disabled:opacity-50"
    >
      {pending ? 'saving' : 'save'}
    </button>
  );
}
