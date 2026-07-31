import { PageHeader, Panel, StatCard, EmptyState } from '@/components/admin/ui';

/**
 * /admin/subscribers — the audience list behind the brands: who has signed up,
 * where they came in, and who is engaged.
 */
export default function SubscribersPage() {
  return (
    <>
      <PageHeader
        eyebrow="pipeline"
        title="subscribers."
        intro="The people who raised a hand: newsletter sign-ups, waitlists, and anyone who asked to hear more. Your owned audience, kept in one place instead of scattered across tools."
      />

      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard label="total subscribers" hint="across every list" />
          <StatCard label="new this month" hint="since the first of the month" />
          <StatCard label="unsubscribed" hint="opted out, last 30 days" />
        </div>

        <Panel title="recent sign-ups">
          <p className="font-body text-xs text-navy/40">no subscribers yet</p>
        </Panel>

        <EmptyState phase="phase 2 · subscribers">
          <p>
            Sign-ups flow in from the site and any embedded forms, tagged by which brand and which
            page brought them in. From here you can segment a list, export it, or hand it to a
            campaign without touching a spreadsheet.
          </p>
        </EmptyState>
      </div>
    </>
  );
}
