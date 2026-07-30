import { PageHeader, Panel, EmptyState } from '@/components/admin/ui';

/**
 * /admin/assistant — an AI assistant that sits on top of the studio's own
 * data. Not a generic chatbot: it can answer from your clients, engagements,
 * time, and finances once those are connected.
 */
const EXAMPLES = [
  'Which proposals have been sitting sent for more than a week?',
  'How many hours have I logged against the biggest engagement, and is it over scope?',
  'Draft a gentle nudge on the oldest overdue invoice.',
  'What did I get done last week, by client?',
];

export default function AssistantPage() {
  return (
    <>
      <PageHeader
        eyebrow="assist"
        title="assistant."
        intro="An assistant that actually knows your business, because it reads from this dashboard. Less a chatbot, more a chief of staff who has the files open in front of them."
      />

      <div className="space-y-8">
        <Panel title="things you will be able to ask">
          <ul className="space-y-2.5">
            {EXAMPLES.map((q) => (
              <li
                key={q}
                className="rounded-lg border border-navy/10 bg-white/60 px-4 py-3 font-body text-sm text-navy/75"
              >
                {q}
              </li>
            ))}
          </ul>
        </Panel>

        <EmptyState phase="phase 3 · assistant">
          <p>
            This comes last on purpose. An assistant is only as useful as the data under it, so it
            arrives once clients, engagements, time, and finance are live. Then it can answer real
            questions and draft real follow-ups grounded in your own numbers.
          </p>
          <p>
            It reads and drafts. It does not send messages, move money, or change records on its
            own. Anything with consequences stays a step you take, with the draft already written.
          </p>
        </EmptyState>
      </div>
    </>
  );
}
