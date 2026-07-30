import { PageHeader, Panel, EmptyState, StatusPill } from '@/components/admin/ui';
import { AddClientForm } from '@/components/admin/add-client-form';
import { InviteControl } from '@/components/admin/invite-control';
import { isSupabaseConfigured } from '@/lib/supabase';
import { getClients } from '@/lib/admin-data';

/**
 * /admin/clients — the CRM. Who you work with, where each relationship
 * stands, and the running history behind it. When Supabase is connected this
 * lists real records and lets you add one; otherwise it explains what is coming.
 */

export const dynamic = 'force-dynamic';

export default async function ClientsPage() {
  const connected = isSupabaseConfigured();
  const clients = connected ? await getClients() : [];

  return (
    <>
      <PageHeader
        eyebrow="pipeline"
        title="clients."
        intro="Every relationship in one list, sorted by where it stands. A lead is not an active client, and a past client is not gone forever. This is where that whole arc lives."
      />

      <div className="space-y-8">
        {connected ? (
          <>
            <Panel title="add a client">
              <AddClientForm />
            </Panel>

            <Panel title={`clients · ${clients.length}`}>
              {clients.length === 0 ? (
                <p className="font-body text-sm text-navy/50">
                  No clients yet. Add your first one above and it shows up here right away.
                </p>
              ) : (
                <ul className="divide-y divide-navy/10">
                  {clients.map((c) => (
                    <li
                      key={c.id}
                      className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-body text-sm font-medium text-navy">
                          {c.name}
                          {c.company ? (
                            <span className="font-normal text-navy/50"> · {c.company}</span>
                          ) : null}
                        </p>
                        {c.email ? (
                          <p className="truncate font-body text-xs text-navy/50">{c.email}</p>
                        ) : null}
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <InviteControl clientId={c.id} hasEmail={Boolean(c.email)} />
                        <StatusPill status={c.status} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </>
        ) : (
          <>
            <Panel title="stages">
              <div className="flex flex-wrap gap-2">
                {['lead', 'qualified', 'active', 'dormant', 'lost'].map((stage) => (
                  <span
                    key={stage}
                    className="rounded-full border border-navy/15 bg-white/60 px-3 py-1 font-mono text-[10px] uppercase tracking-mono-label text-navy/60"
                  >
                    {stage}
                  </span>
                ))}
              </div>
              <p className="mt-4 font-body text-sm text-navy/50">
                No clients loaded yet. Once the data layer is connected, each stage fills with real
                records you can open, move, and add notes to.
              </p>
            </Panel>

            <EmptyState phase="phase 2 · CRM">
              <p>
                The full version holds a card per client: contact, the story so far, linked
                proposals and engagements, and a timeline of every touch. Moving a client from one
                stage to the next updates the Overview pipeline count automatically.
              </p>
              <p>
                This is also where an inbound from the site contact form can land, so a new inquiry
                becomes a lead here without you copying anything by hand.
              </p>
            </EmptyState>
          </>
        )}
      </div>
    </>
  );
}
