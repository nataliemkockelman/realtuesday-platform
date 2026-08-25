'use client';

import { useOptimistic, useState, useTransition } from 'react';
import { moveProspect, deleteProspect } from '@/app/admin/hitlist/actions';
import {
  HITLIST_STATUSES,
  HITLIST_LABELS,
  HITLIST_COPY,
  type HitlistProspect,
  type HitlistStatus,
} from '@/lib/hitlist';

/**
 * The hitlist board. Prospect cards are draggable between the stages
 * (to reach → reached out → in talks → won / passed); dropping one onto a
 * stage moves it there. The move is optimistic, then persisted via a server
 * action. A per-card <select> stays as a keyboard/touch fallback.
 */
export function HitlistBoard({ prospects }: { prospects: HitlistProspect[] }) {
  const [, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(
    prospects,
    (state: HitlistProspect[], mv: { id: string; status: HitlistStatus }) =>
      state.map((p) => (p.id === mv.id ? { ...p, status: mv.status } : p)),
  );
  const [dragOver, setDragOver] = useState<HitlistStatus | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  function move(id: string, status: HitlistStatus) {
    const current = optimistic.find((p) => p.id === id);
    if (!current || current.status === status) return;
    startTransition(async () => {
      setOptimistic({ id, status });
      await moveProspect(id, status);
    });
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {HITLIST_STATUSES.map((status) => {
        const items = optimistic.filter((p) => p.status === status);
        const isTarget = dragOver === status;
        return (
          <div
            key={status}
            onDragOver={(e) => {
              e.preventDefault();
              if (dragOver !== status) setDragOver(status);
            }}
            onDragLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOver(null);
            }}
            onDrop={(e) => {
              e.preventDefault();
              const id = e.dataTransfer.getData('text/plain');
              setDragOver(null);
              setDraggingId(null);
              if (id) move(id, status);
            }}
            className={`rounded-xl border p-3 transition-colors ${
              isTarget ? 'border-copper bg-copper/5' : 'border-navy/10 bg-white/40'
            }`}
          >
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <p className="font-mono text-[10px] uppercase tracking-mono-label text-navy/50">
                {HITLIST_LABELS[status]}
              </p>
              {items.length > 0 ? (
                <span className="font-mono text-[9px] text-navy/35">{items.length}</span>
              ) : null}
            </div>
            <p className="mb-3 font-body text-[11px] text-navy/40">{HITLIST_COPY[status]}</p>
            <div className="space-y-2.5">
              {items.length === 0 ? (
                <p className="font-body text-xs text-navy/35">{isTarget ? 'drop here' : 'empty'}</p>
              ) : (
                items.map((p) => (
                  <ProspectCard
                    key={p.id}
                    prospect={p}
                    dragging={draggingId === p.id}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', p.id);
                      e.dataTransfer.effectAllowed = 'move';
                      setDraggingId(p.id);
                    }}
                    onDragEnd={() => {
                      setDraggingId(null);
                      setDragOver(null);
                    }}
                    onMove={(next) => move(p.id, next)}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProspectCard({
  prospect,
  dragging,
  onDragStart,
  onDragEnd,
  onMove,
}: {
  prospect: HitlistProspect;
  dragging: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onMove: (status: HitlistStatus) => void;
}) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`cursor-grab rounded-lg border border-navy/10 bg-white/70 p-3 active:cursor-grabbing ${
        dragging ? 'opacity-40' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-body text-sm font-medium leading-snug text-navy">
            {prospect.name}
          </p>
          {prospect.company ? (
            <p className="truncate font-body text-xs text-navy/50">{prospect.company}</p>
          ) : null}
        </div>
        <form action={deleteProspect}>
          <input type="hidden" name="id" value={prospect.id} />
          <button
            type="submit"
            aria-label="Remove prospect"
            className="shrink-0 font-body text-sm leading-none text-navy/30 transition-colors hover:text-red-600"
          >
            ×
          </button>
        </form>
      </div>

      {prospect.note ? (
        <p className="mt-1.5 font-body text-xs leading-snug text-navy/55">{prospect.note}</p>
      ) : null}

      {prospect.link ? (
        <a
          href={prospect.link}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-1.5 block truncate font-mono text-[10px] text-copper underline decoration-copper/30 underline-offset-2 hover:decoration-copper"
        >
          {prospect.link.replace(/^https?:\/\//, '')}
        </a>
      ) : null}

      <div className="mt-3 flex items-center justify-between gap-2">
        {prospect.author_name ? (
          <span className="font-mono text-[9px] uppercase tracking-mono-label text-navy/35">
            {prospect.author_name}
          </span>
        ) : (
          <span />
        )}
        <select
          value={prospect.status}
          onChange={(e) => onMove(e.target.value as HitlistStatus)}
          aria-label="Move to stage"
          className="rounded border border-navy/15 bg-white px-1.5 py-1 font-mono text-[9px] uppercase tracking-mono-label text-navy/60 focus:border-copper focus:outline-none"
        >
          {HITLIST_STATUSES.map((s) => (
            <option key={s} value={s}>
              {HITLIST_LABELS[s]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
