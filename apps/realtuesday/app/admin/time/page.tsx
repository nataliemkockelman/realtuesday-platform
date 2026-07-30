import { PageHeader, Panel, EmptyState } from '@/components/admin/ui';

/**
 * /admin/time — hours by engagement, and which of them are ready to bill.
 */
export default function TimePage() {
  return (
    <>
      <PageHeader
        eyebrow="delivery"
        title="time."
        intro="Where the hours went, tied to the engagement that earned them. Not for surveillance, for billing and for honesty about what work actually costs to deliver."
      />

      <div className="space-y-8">
        <Panel title="this week">
          <p className="font-body text-sm text-navy/50">
            No time logged yet. Entries will group by engagement and split into billable and not,
            so unbilled hours are never lost.
          </p>
        </Panel>

        <EmptyState phase="phase 2 · time">
          <p>
            Log time against an engagement in a few seconds, mark it billable or not, and watch it
            feed two places at once: the unbilled total on the Overview, and a ready-to-invoice
            list over in Finance.
          </p>
          <p>
            Comparing logged hours against the quoted scope is how an engagement tells you early
            that it is running hot.
          </p>
        </EmptyState>
      </div>
    </>
  );
}
