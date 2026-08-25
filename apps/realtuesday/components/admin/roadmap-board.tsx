'use client';

import { useOptimistic, useState, useTransition } from 'react';
import { moveRoadmapItem, deleteRoadmapItem } from '@/app/admin/brainstorm/actions';
import { ROADMAP_STATUSES, type RoadmapItem, type RoadmapStatus } from '@/lib/roadmap';

const COLUMN_COPY: Record<RoadmapStatus, string> = {
  now: 'in flight',
  next: 'up next',
  later: 'someday',
  done: 'shipped',
};

/**
 * The roadmap board. Cards are draggable between the now / next / later / done
 * columns; dropping one onto a column moves it there. The move is optimistic —
 * the card jumps columns instantly — then persisted via a server action, which
 * revalidates the page. A per-card status <select> stays as a keyboard- and
 * touch-friendly fallback for anyone who cannot drag.
 */
export function RoadmapBoard({ items }: { items: RoadmapItem[] }) {
  const [, startTransition] = useTransition();
  const [optimisticItems, setOptimistic] = useOptimistic(
    items,
    (state: RoadmapItem[], move: { id: string; status: RoadmapStatus }) =>
      state.map((it) => (it.id === move.id ? { ...it, status: move.status } : it)),
  );
  const [dragOver, setDragOver] = useState<RoadmapStatus | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  function move(id: string, status: RoadmapStatus) {
    const current = optimisticItems.find((it) => it.id === id);
    if (!current || current.status === status) return;
    startTransition(async () => {
      setOptimistic({ id, status });
      await moveRoadmapItem(id, status);
    });
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {ROADMAP_STATUSES.map((status) => {
        const columnItems = optimisticItems.filter((i) => i.status === status);
        const isTarget = dragOver === status;
        return (
          <div
            key={status}
            onDragOver={(e) => {
              e.preventDefault();
              if (dragOver !== status) setDragOver(status);
            }}
            onDragLeave={(e) => {
              // Only clear when the cursor actually leaves the column, not when
              // it crosses onto a child element.
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
            <p className="mb-1 font-mono text-[10px] uppercase tracking-mono-label text-navy/50">
              {status}
            </p>
            <p className="mb-3 font-body text-[11px] text-navy/40">{COLUMN_COPY[status]}</p>
            <div className="space-y-2.5">
              {columnItems.length === 0 ? (
                <p className="font-body text-xs text-navy/35">
                  {isTarget ? 'drop here' : 'empty'}
                </p>
              ) : (
                columnItems.map((item) => (
                  <BoardCard
                    key={item.id}
                    item={item}
                    dragging={draggingId === item.id}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', item.id);
                      e.dataTransfer.effectAllowed = 'move';
                      setDraggingId(item.id);
                    }}
                    onDragEnd={() => {
                      setDraggingId(null);
                      setDragOver(null);
                    }}
                    onMove={(next) => move(item.id, next)}
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

function BoardCard({
  item,
  dragging,
  onDragStart,
  onDragEnd,
  onMove,
}: {
  item: RoadmapItem;
  dragging: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onMove: (status: RoadmapStatus) => void;
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
        <select
          value={item.status}
          onChange={(e) => onMove(e.target.value as RoadmapStatus)}
          aria-label="Move to column"
          className="rounded border border-navy/15 bg-white px-1.5 py-1 font-mono text-[9px] uppercase tracking-mono-label text-navy/60 focus:border-copper focus:outline-none"
        >
          {ROADMAP_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
