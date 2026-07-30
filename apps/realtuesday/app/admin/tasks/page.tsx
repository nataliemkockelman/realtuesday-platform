import { PageHeader, Panel, EmptyState } from '@/components/admin/ui';

/**
 * /admin/tasks — what is due and what is slipping, across every engagement.
 */
const COLUMNS = ['today', 'this week', 'later', 'done'];

export default function TasksPage() {
  return (
    <>
      <PageHeader
        eyebrow="delivery"
        title="tasks."
        intro="Everything on the hook, across every project, in one view. Grouped by when it is due rather than which client it belongs to, because your day runs on time, not on org charts."
      />

      <div className="space-y-8">
        <Panel title="board">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COLUMNS.map((col) => (
              <div
                key={col}
                className="rounded-lg border border-navy/10 bg-white/50 p-3"
              >
                <p className="mb-3 font-mono text-[10px] uppercase tracking-mono-label text-navy/50">
                  {col}
                </p>
                <p className="font-body text-xs text-navy/40">nothing here yet</p>
              </div>
            ))}
          </div>
        </Panel>

        <EmptyState phase="phase 2 · tasks">
          <p>
            Each task links to an engagement, carries a due date, and rolls up into the overdue
            count on the Overview. The point is a single list you trust, so no work lives only in
            your head or in a stray note.
          </p>
        </EmptyState>
      </div>
    </>
  );
}
