import { PageHeader, Panel, EmptyState } from '@/components/admin/ui';

/**
 * /admin/sales — the deal board that sits in front of proposals: leads,
 * conversations, and where each one stands before it becomes real work.
 */
const STAGES = ['new lead', 'in conversation', 'proposal out', 'won', 'lost'];

export default function SalesPage() {
  return (
    <>
      <PageHeader
        eyebrow="pipeline"
        title="sales."
        intro="Every lead and open conversation before it hardens into a proposal. This is where you see what is coming, chase what has gone quiet, and know which deals are actually close."
      />

      <div className="space-y-8">
        <Panel title="deal stages">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {STAGES.map((stage) => (
              <div key={stage} className="rounded-lg border border-navy/10 bg-white/50 p-3">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-mono-label text-navy/50">
                  {stage}
                </p>
                <p className="font-body text-xs text-navy/40">nothing here yet</p>
              </div>
            ))}
          </div>
        </Panel>

        <EmptyState phase="phase 2 · sales">
          <p>
            Leads land here from the contact form and from your own notes, each one carrying a
            source, a value, and a next step with a date on it. When a deal is won it becomes a
            client and a proposal in one move, so nothing gets re-typed.
          </p>
        </EmptyState>
      </div>
    </>
  );
}
