import { PageHeader, Panel, EmptyState } from '@/components/admin/ui';

/**
 * /admin/engagements — the live work. Active projects, their scope, and an
 * honest read on health.
 */
export default function EngagementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="delivery"
        title="engagements."
        intro="The work that is actually happening. Each active project, what it was scoped to be, and whether it is on track or quietly drifting. This is the heart of delivery."
      />

      <div className="space-y-8">
        <Panel title="active work">
          <p className="font-body text-sm text-navy/50">
            No engagements yet. Accepting a proposal creates one here, with its scope carried over
            so the promise and the work stay tied together.
          </p>
        </Panel>

        <EmptyState phase="phase 2 · engagements">
          <p>
            Each engagement pulls together the scope from its proposal, the tasks under it, the
            time logged against it, and the invoices tied to it. One place to answer &ldquo;how is
            this project really going.&rdquo;
          </p>
          <p>
            Health is the part that matters most: scope creep, a slipping date, or hours running
            past what was quoted all surface here before they become a surprise.
          </p>
        </EmptyState>
      </div>
    </>
  );
}
