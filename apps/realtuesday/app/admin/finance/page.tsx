import { PageHeader, Panel, StatCard, EmptyState } from '@/components/admin/ui';

/**
 * /admin/finance — invoices, income, and what is owed. The money view.
 */
const NUMBERS = [
  { label: 'income, this month', hint: 'Payments received month to date.' },
  { label: 'outstanding', hint: 'Invoiced and still unpaid.' },
  { label: 'overdue', hint: 'Past the due date and unpaid.' },
];

export default function FinancePage() {
  return (
    <>
      <PageHeader
        eyebrow="money"
        title="finance."
        intro="The part that keeps the lights on. What you invoiced, what came in, and what is still owed. Plain enough to check on a Tuesday without dread."
      />

      <div className="space-y-8">
        <Panel title="at a glance">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {NUMBERS.map((n) => (
              <StatCard key={n.label} label={n.label} hint={n.hint} />
            ))}
          </div>
        </Panel>

        <Panel title="invoices">
          <p className="font-body text-sm text-navy/50">
            No invoices yet. They will draw from billable time and fixed-fee milestones, so
            creating one does not mean re-adding numbers you already tracked.
          </p>
        </Panel>

        <EmptyState phase="phase 2 · finance">
          <p>
            Invoices build from the billable time and milestones already sitting under each
            engagement, then feed the income and outstanding totals up top. The aim is that the
            money side is a byproduct of doing the work, not a second full-time job.
          </p>
          <p>
            This stays a record and reporting layer. It does not move money on its own; sending an
            invoice or taking a payment is a deliberate step you take, not something the dashboard
            does for you.
          </p>
        </EmptyState>
      </div>
    </>
  );
}
