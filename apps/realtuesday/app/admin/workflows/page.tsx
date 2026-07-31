import { PageHeader, Panel, EmptyState } from '@/components/admin/ui';

/**
 * /admin/workflows — the repeatable playbooks: the steps a piece of work moves
 * through, saved once so onboarding and delivery run the same way every time.
 */
export default function WorkflowsPage() {
  return (
    <>
      <PageHeader
        eyebrow="delivery"
        title="workflows."
        intro="The playbooks you run over and over: client onboarding, a launch, a monthly close. Write the steps down once and every project can start from the same known-good sequence."
      />

      <div className="space-y-8">
        <Panel title="saved playbooks">
          <p className="font-body text-xs text-navy/40">no workflows yet</p>
        </Panel>

        <EmptyState phase="phase 2 · workflows">
          <p>
            A workflow is an ordered set of steps with owners and rough timing. Apply one to an
            engagement and it spins up the tasks for you, so the tenth onboarding is as thorough as
            the first and nothing quietly falls off.
          </p>
        </EmptyState>
      </div>
    </>
  );
}
