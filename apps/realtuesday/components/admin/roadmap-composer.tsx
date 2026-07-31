'use client';

import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { addRoadmapItem } from '@/app/admin/brainstorm/actions';
import { ROADMAP_STATUSES } from '@/lib/roadmap';

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
      {pending ? 'adding' : 'add to roadmap'}
    </button>
  );
}

/** Add a roadmap item: a title, an optional line of detail, and which column
 *  it starts in. Resets after each add. */
export function RoadmapComposer() {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        await addRoadmapItem(formData);
        ref.current?.reset();
      }}
      className="space-y-3"
    >
      <input name="title" required placeholder="What are we building?" className={inputClass} />
      <input
        name="detail"
        placeholder="Optional: a line more detail"
        className={inputClass}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
            column
          </span>
          <select
            name="status"
            defaultValue="next"
            className="rounded-lg border border-navy/15 bg-white px-2.5 py-1.5 font-body text-sm text-navy focus:border-copper focus:outline-none"
          >
            {ROADMAP_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <Submit />
      </div>
    </form>
  );
}
