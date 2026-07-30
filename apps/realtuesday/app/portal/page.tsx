import { SignOutButton } from '@/components/portal/sign-out-button';
import { StatusPill } from '@/components/admin/ui';
import {
  getPortalClient,
  getPortalEngagements,
  getPortalOpenTasks,
  getPortalInvoices,
} from '@/lib/portal-data';
import { formatCents, formatDate } from '@/lib/format';

/**
 * /portal — the client's dashboard. Read-only. Everything shown here is scoped
 * by Row Level Security to the signed-in client's own records; there is no way
 * to reach another client's data from this page.
 */
export const dynamic = 'force-dynamic';

export default async function PortalDashboard() {
  const [client, engagements, openTasks, invoices] = await Promise.all([
    getPortalClient(),
    getPortalEngagements(),
    getPortalOpenTasks(),
    getPortalInvoices(),
  ]);

  const greetingName = client?.company || client?.name || 'there';

  return (
    <div className="min-h-screen">
      {/* Brand bar */}
      <header className="bg-navy px-6 py-4 sm:px-10">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <span className="flex items-baseline gap-[3px] leading-none">
            <span className="font-display text-lg font-extrabold lowercase tracking-[-0.04em] text-cream">
              real
            </span>
            <span className="font-serif text-lg italic text-copper">Tuesday</span>
          </span>
          <SignOutButton />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 sm:px-10">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-mono-label text-copper">
          your workspace
        </p>
        <h1 className="mb-8 font-display text-3xl font-extrabold lowercase tracking-[-0.03em] text-navy sm:text-4xl">
          hello, {greetingName}.
        </h1>

        <div className="space-y-8">
          {/* Engagements + progress */}
          <section className="rounded-xl border border-navy/10 bg-white/70 p-5 sm:p-6">
            <h2 className="mb-4 font-mono text-[10px] uppercase tracking-mono-label text-navy/50">
              your work
            </h2>
            {engagements.length === 0 ? (
              <p className="font-body text-sm text-navy/50">
                Nothing is set up here yet. When a project kicks off, it shows up here with its
                status and progress.
              </p>
            ) : (
              <ul className="space-y-4">
                {engagements.map((e) => {
                  const pct =
                    e.totalTasks > 0 ? Math.round((e.doneTasks / e.totalTasks) * 100) : null;
                  return (
                    <li key={e.id} className="rounded-lg border border-navy/10 bg-white/60 p-4">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="font-body text-sm font-medium text-navy">{e.name}</p>
                        <StatusPill status={e.status} />
                      </div>
                      {pct != null ? (
                        <>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-navy/10">
                            <div
                              className="h-full rounded-full bg-copper"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <p className="mt-1.5 font-body text-xs text-navy/50">
                            {e.doneTasks} of {e.totalTasks} tasks done · {pct}%
                          </p>
                        </>
                      ) : (
                        <p className="font-body text-xs text-navy/45">
                          {e.startedAt ? `Started ${formatDate(e.startedAt)}` : 'Getting underway'}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {/* Open items */}
          <section className="rounded-xl border border-navy/10 bg-white/70 p-5 sm:p-6">
            <h2 className="mb-4 font-mono text-[10px] uppercase tracking-mono-label text-navy/50">
              in progress
            </h2>
            {openTasks.length === 0 ? (
              <p className="font-body text-sm text-navy/50">Nothing open right now.</p>
            ) : (
              <ul className="divide-y divide-navy/10">
                {openTasks.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
                  >
                    <span className="min-w-0 truncate font-body text-sm text-navy">{t.title}</span>
                    {t.dueDate ? (
                      <span className="shrink-0 font-mono text-[10px] text-navy/40">
                        due {formatDate(t.dueDate)}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Invoices */}
          <section className="rounded-xl border border-navy/10 bg-white/70 p-5 sm:p-6">
            <h2 className="mb-4 font-mono text-[10px] uppercase tracking-mono-label text-navy/50">
              invoices
            </h2>
            {invoices.length === 0 ? (
              <p className="font-body text-sm text-navy/50">No invoices yet.</p>
            ) : (
              <ul className="divide-y divide-navy/10">
                {invoices.map((i) => (
                  <li
                    key={i.id}
                    className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="font-body text-sm font-medium text-navy">
                        {i.number || 'Invoice'}
                      </p>
                      <p className="font-body text-xs text-navy/45">
                        {i.dueOn ? `Due ${formatDate(i.dueOn)}` : formatDate(i.issuedOn)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="font-body text-sm text-navy">
                        {formatCents(i.amountCents)}
                      </span>
                      <StatusPill status={i.status} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
