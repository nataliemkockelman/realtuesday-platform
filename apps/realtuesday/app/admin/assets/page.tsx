import { PageHeader, Panel, EmptyState } from '@/components/admin/ui';

/**
 * /admin/assets — the brand and deliverable library: logos, brand kits,
 * templates, and finished files, findable instead of buried in a drive.
 */
export default function AssetsPage() {
  return (
    <>
      <PageHeader
        eyebrow="delivery"
        title="assets."
        intro="The library behind the work: brand kits, logos, templates, and the finished pieces you ship. One shelf everyone pulls from, so the right file is never three folders deep in someone's drive."
      />

      <div className="space-y-8">
        <Panel title="library">
          <p className="font-body text-xs text-navy/40">no assets yet</p>
        </Panel>

        <EmptyState phase="phase 2 · assets">
          <p>
            Upload a file, tag it to a brand or a client, and it becomes searchable here with a
            preview and a version history. This is also where the generated brand assets and PDFs
            from the studio skills will land, ready to hand off.
          </p>
        </EmptyState>
      </div>
    </>
  );
}
