import { PageHeader, Panel, EmptyState } from '@/components/admin/ui';

/**
 * /admin/calendar — the studio's shared timeline: deadlines, milestones, and
 * anything with a date that the whole team should see in one place.
 */
export default function CalendarPage() {
  return (
    <>
      <PageHeader
        eyebrow="delivery"
        title="calendar."
        intro="One timeline for the studio. Task due dates, engagement milestones, and publish dates in a single view, so a busy week is visible before it arrives rather than after."
      />

      <div className="space-y-8">
        <Panel title="this week">
          <p className="font-body text-xs text-navy/40">nothing scheduled yet</p>
        </Panel>

        <EmptyState phase="phase 2 · calendar">
          <p>
            Dates from across the backend gather here automatically: a task due Thursday, an
            invoice going out on the first, a launch you have been building toward. Later this can
            sync with the Google Workspace calendar the studio already runs on Central time.
          </p>
        </EmptyState>
      </div>
    </>
  );
}
