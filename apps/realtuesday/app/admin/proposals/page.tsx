import { PageHeader, Panel, EmptyState } from '@/components/admin/ui';
import { ProposalTemplateComposer } from '@/components/admin/proposal-template-composer';
import { ProposalTemplateList } from '@/components/admin/proposal-template-list';
import { getProposalTemplates } from '@/lib/proposal-templates-data';
import { isSupabaseConfigured } from '@/lib/supabase';

/**
 * /admin/proposals — for now, the reusable proposal templates the studio drafts
 * from. Each template carries a default title, an optional default price, and a
 * Markdown body with placeholders ({{client}}, {{company}}, {{date}}, {{price}})
 * that get filled in per client. Tracking individual proposals through their
 * status comes next; the templates are the editable starting point.
 */
export const dynamic = 'force-dynamic';

export default async function ProposalsPage() {
  if (!isSupabaseConfigured()) {
    return (
      <>
        <PageHeader
          eyebrow="pipeline"
          title="proposals."
          intro="The reusable templates you draft client proposals from."
        />
        <EmptyState phase="needs supabase">
          <p>
            The backend is not connected yet, so templates cannot be saved. Once Supabase is wired
            up, this becomes the editable proposal template library.
          </p>
        </EmptyState>
      </>
    );
  }

  const templates = await getProposalTemplates();

  return (
    <>
      <PageHeader
        eyebrow="pipeline"
        title="proposals."
        intro="A proposal is a promise with a price on it. Start from a template, hit “draft PDF” to fill in the client and price, and you get a branded, print-ready document to send. Edit any template in place so the next one starts better than the last."
      />

      <div className="space-y-8">
        <Panel title="templates">
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="font-body text-xs leading-relaxed text-navy/50">
              Placeholders <code className="font-mono text-navy/70">{'{{client}}'}</code>,{' '}
              <code className="font-mono text-navy/70">{'{{company}}'}</code>,{' '}
              <code className="font-mono text-navy/70">{'{{date}}'}</code>, and{' '}
              <code className="font-mono text-navy/70">{'{{price}}'}</code> get swapped for the real
              values when you draft.
            </p>
            <ProposalTemplateComposer />
          </div>
          <ProposalTemplateList templates={templates} />
        </Panel>
      </div>
    </>
  );
}
