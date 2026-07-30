import { PageHeader, Panel, EmptyState } from '@/components/admin/ui';

/**
 * /admin/proposals — scopes of work out the door and their status. Ties
 * into the existing knova-proposal skill, which already generates branded
 * SOW PDFs; this is where those live and get tracked.
 */
const STATUS = ['draft', 'sent', 'accepted', 'declined'];

export default function ProposalsPage() {
  return (
    <>
      <PageHeader
        eyebrow="pipeline"
        title="proposals."
        intro="A proposal is a promise with a price on it. This tracks each one from draft to a signed yes, so nothing sits in a sent folder wondering whether it landed."
      />

      <div className="space-y-8">
        <Panel title="status">
          <div className="flex flex-wrap gap-2">
            {STATUS.map((s) => (
              <span
                key={s}
                className="rounded-full border border-navy/15 bg-white/60 px-3 py-1 font-mono text-[10px] uppercase tracking-mono-label text-navy/60"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-4 font-body text-sm text-navy/50">
            No proposals yet. Accepted ones will roll straight into an engagement so you never
            re-key the scope.
          </p>
        </Panel>

        <EmptyState phase="phase 2 · proposals">
          <p>
            Each proposal links back to a client and carries its scope, price, and the generated
            SOW document. The branded PDF is already handled by the proposal skill, so this screen
            is about tracking and follow-up, not rebuilding that.
          </p>
          <p>
            When one is marked accepted, it seeds a new engagement with the scope already filled
            in, and updates the pipeline on the Overview.
          </p>
        </EmptyState>
      </div>
    </>
  );
}
