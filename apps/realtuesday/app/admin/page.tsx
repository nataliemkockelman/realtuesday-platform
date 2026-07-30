import Link from 'next/link';
import type { Route } from 'next';
import { PageHeader, Panel, StatCard, EmptyState } from '@/components/admin/ui';
import { isSupabaseConfigured } from '@/lib/supabase';
import { getOverviewStats } from '@/lib/admin-data';
import { formatCents, formatMinutesAsHours, formatPercent } from '@/lib/format';

/**
 * /admin — Overview. The one screen you open first: the health of the
 * business at a glance, then quick jumps into each part of the operation.
 *
 * When Supabase is configured the KPI tiles show live figures (including a
 * real zero). Before that, or if a read fails, they fall back to "no data
 * yet" — never an invented number.
 */

// Always render fresh: these numbers change as records are added.
export const dynamic = 'force-dynamic';

const JUMPS: { href: Route; label: string; blurb: string }[] = [
  { href: '/admin/clients', label: 'Clients', blurb: 'Who you work with and where each stands.' },
  { href: '/admin/proposals', label: 'Proposals', blurb: 'Scopes out the door and their status.' },
  { href: '/admin/engagements', label: 'Engagements', blurb: 'Active work, scope, and health.' },
  { href: '/admin/tasks', label: 'Tasks', blurb: 'What is due and what is slipping.' },
  { href: '/admin/time', label: 'Time', blurb: 'Hours by engagement, ready to bill.' },
  { href: '/admin/finance', label: 'Finance', blurb: 'Invoices, income, and what is owed.' },
];

export default async function AdminOverviewPage() {
  const connected = isSupabaseConfigured();
  const stats = connected ? await getOverviewStats() : null;

  const kpis: { label: string; hint: string; value: string | null }[] = [
    {
      label: 'active engagements',
      hint: 'Live projects with work in flight.',
      value: stats ? String(stats.activeEngagements) : null,
    },
    {
      label: 'open proposals',
      hint: 'Sent, awaiting a yes or a no.',
      value: stats ? String(stats.openProposals) : null,
    },
    {
      label: 'cash in, this month',
      hint: 'Payments received month to date.',
      value: stats ? formatCents(stats.cashInThisMonthCents) : null,
    },
    {
      label: 'unbilled time',
      hint: 'Logged hours not yet invoiced.',
      value: stats ? formatMinutesAsHours(stats.unbilledMinutes) : null,
    },
    {
      label: 'overdue tasks',
      hint: 'Past their date and still open.',
      value: stats ? String(stats.overdueTasks) : null,
    },
    {
      label: 'utilization',
      hint: 'Billable share of time logged this week.',
      value: stats && stats.utilization != null ? formatPercent(stats.utilization) : null,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="overview"
        title="the whole studio, one screen."
        intro="This is the front door. A read on the numbers that matter, then a fast path into any corner of the operation. Modeled on the Knova operating outline: pipeline, delivery, and money in one place."
      />

      <div className="space-y-8">
        <Panel title="key numbers">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {kpis.map((kpi) => (
              <StatCard key={kpi.label} label={kpi.label} hint={kpi.hint} value={kpi.value} />
            ))}
          </div>
        </Panel>

        <Panel title="jump in">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {JUMPS.map((jump) => (
              <Link
                key={jump.href}
                href={jump.href}
                className="group rounded-lg border border-navy/10 bg-white/60 p-4 no-underline transition-colors hover:border-navy/40"
              >
                <p className="font-display text-lg font-extrabold lowercase tracking-[-0.02em] text-navy group-hover:text-deep-copper">
                  {jump.label}
                </p>
                <p className="mt-1 font-body text-xs leading-snug text-navy/60">
                  {jump.blurb}
                </p>
              </Link>
            ))}
          </div>
        </Panel>

        {connected ? (
          <EmptyState phase="live · data layer">
            <p>
              The data layer is connected. These tiles read straight from your Supabase tables, so
              a real zero means zero, not a placeholder. As you add clients, log time, and send
              invoices, the numbers here move on their own.
            </p>
            <p>
              Nothing here is public. The whole /admin area is gated and hidden from search. The
              interim password gate becomes proper per-user accounts when you are ready.
            </p>
          </EmptyState>
        ) : (
          <EmptyState phase="phase 2 · data layer">
            <p>
              Right now this is the shape of the dashboard, not the data. The next phase connects
              each tile to a real Supabase table behind this same login, so the numbers above go
              live and stop saying &ldquo;no data yet.&rdquo;
            </p>
            <p>
              Nothing here is public. The whole /admin area is gated and hidden from search. When
              you are ready, we swap the interim password gate for proper per-user accounts.
            </p>
          </EmptyState>
        )}
      </div>
    </>
  );
}
