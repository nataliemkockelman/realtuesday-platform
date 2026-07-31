'use client';

import { useRef } from 'react';
import { updateRoadmapStatus, deleteRoadmapItem } from '@/app/admin/brainstorm/actions';
import { ROADMAP_STATUSES, type RoadmapItem } from '@/lib/roadmap';

/**
 * A single roadmap card. The status <select> moves the item to another column
 * on change (no separate save), and the × removes it. Both call server actions
 * directly; the list re-renders from the revalidated server data.
 */
export function RoadmapCard({ item }: { item: RoadmapItem }) {
  const moveRef = useRef<HTMLFormElement>(null);

  return (
    <div className="rounded-lg border border-navy/10 bg-white/70 p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="font-body text-sm font-medium leading-snug text-navy">{item.title}</p>
        <form action={deleteRoadmapItem}>
          <input type="hidden" name="id" value={item.id} />
          <button
            type="submit"
            aria-label="Remove item"
            className="shrink-0 font-body text-sm leading-none text-navy/30 transition-colors hover:text-red-600"
          >
            ×
          </button>
        </form>
      </div>

      {item.detail ? (
        <p className="mt-1 font-body text-xs leading-snug text-navy/55">{item.detail}</p>
      ) : null}

      <div className="mt-3 flex items-center justify-between gap-2">
        {item.author_name ? (
          <span className="font-mono text-[9px] uppercase tracking-mono-label text-navy/35">
            {item.author_name}
          </span>
        ) : (
          <span />
        )}
        <form ref={moveRef} action={updateRoadmapStatus}>
          <input type="hidden" name="id" value={item.id} />
          <select
            name="status"
            defaultValue={item.status}
            onChange={() => moveRef.current?.requestSubmit()}
            aria-label="Move to column"
            className="rounded border border-navy/15 bg-white px-1.5 py-1 font-mono text-[9px] uppercase tracking-mono-label text-navy/60 focus:border-copper focus:outline-none"
          >
            {ROADMAP_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </form>
      </div>
    </div>
  );
}
