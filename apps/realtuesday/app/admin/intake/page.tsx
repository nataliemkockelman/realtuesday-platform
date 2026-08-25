import Link from 'next/link';
import { PageHeader, Panel, EmptyState, StatusPill } from '@/components/admin/ui';
import { isSupabaseConfigured } from '@/lib/supabase';
import { getIntakeSubmissions, type IntakeRow } from '@/lib/intake-data';
import { INTAKE_STATUSES, INTAKE_FIELDS, type IntakeFieldKey } from '@/lib/intake';
import { setIntakeStatus } from './actions';

/**
 * /admin/intake — website intake submissions from the public /start form.
 * Each card shows who sent it, their answers, the linked CRM lead, and a
 * status control to move it through triage. When Supabase is not connected
 * this explains what will land here.
 */

export const dynamic = 'force-dynamic';

const DATE_FMT = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Chicago',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

/** Map a row's answers to the shared field keys, in display order. */
function answersFor(r: IntakeRow): Record<IntakeFieldKey, string | null> {
  return {
    business_type: r.businessType,
    primary_goal: r.primaryGoal,
    current_site: r.currentSite,
    domain_status: r.domainStatus,
    budget_range: r.budgetRange,
    timeline: r.timeline,
    beyond_website: r.beyondWebsite,
    message: r.message,
  };
}

export default async function IntakePage() {
  const connected = isSupabaseConfigured();
  const submissions = connected ? await getIntakeSubmissions() : [];
  const newCount = submissions.filter((s) => s.status === 'new').length;

  return (
    <>
      <PageHeader
        eyebrow="pipeline"
        title="intake."
        intro="Every website intake from the /start form, newest first. Each one already opened a lead in Clients and emailed you. Read it, then move it through triage as you go."
      />

      <div className="space-y-8">
        {connected ? (
          submissions.length === 0 ? (
            <Panel title="intake · 0">
              <p className="font-body text-sm text-navy/50">
                No submissions yet. Share your{' '}
                <Link
                  href="/start"
                  className="text-deep-copper no-underline hover:underline"
                >
                  /start
                </Link>{' '}
                link with a prospect and their answers show up here right away.
              </p>
            </Panel>
          ) : (
            <Panel title={`intake · ${submissions.length}${newCount ? ` · ${newCount} new` : ''}`}>
              <ul className="space-y-5">
                {submissions.map((s) => {
                  const answers = answersFor(s);
                  return (
                    <li
                      key={s.id}
                      className="rounded-lg border border-navy/10 bg-white/70 p-4 sm:p-5"
                    >
                      {/* Header: who + when + status */}
                      <div className="flex flex-col gap-2 border-b border-navy/10 pb-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <div className="min-w-0">
                          <p className="font-body text-sm font-medium text-navy">
                            {s.contactName}
                            {s.company ? (
                              <span className="font-normal text-navy/50"> · {s.company}</span>
                            ) : null}
                          </p>
                          <p className="mt-0.5 font-body text-xs text-navy/50">
                            <a
                              href={`mailto:${s.email}`}
                              className="text-deep-copper no-underline hover:underline"
                            >
                              {s.email}
                            </a>
                            {s.phone ? <span> · {s.phone}</span> : null}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <span className="font-mono text-[9px] uppercase tracking-mono-label text-navy/40">
                            {DATE_FMT.format(new Date(s.createdAt))}
                          </span>
                          <StatusPill status={s.status} />
                        </div>
                      </div>

                      {/* Answers */}
                      <dl className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                        {INTAKE_FIELDS.map((f) => {
                          const value = answers[f.key];
                          if (!value) return null;
                          const wide = f.key === 'beyond_website' || f.key === 'message';
                          return (
                            <div key={f.key} className={wide ? 'sm:col-span-2' : undefined}>
                              <dt className="font-mono text-[9px] uppercase tracking-mono-label text-navy/40">
                                {f.label}
                              </dt>
                              <dd className="mt-1 whitespace-pre-line font-body text-sm leading-relaxed text-navy/80">
                                {value}
                              </dd>
                            </div>
                          );
                        })}
                      </dl>

                      {/* Footer: linked lead + status control */}
                      <div className="mt-4 flex flex-col gap-3 border-t border-navy/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="font-mono text-[10px] uppercase tracking-mono-button">
                          {s.clientId ? (
                            <Link
                              href="/admin/clients"
                              className="text-deep-copper no-underline hover:underline"
                            >
                              view lead in clients →
                            </Link>
                          ) : (
                            <span className="text-navy/40">no linked lead</span>
                          )}
                        </div>

                        <form
                          action={setIntakeStatus}
                          className="flex items-center gap-2"
                        >
                          <input type="hidden" name="id" value={s.id} />
                          <label className="font-mono text-[9px] uppercase tracking-mono-label text-navy/40">
                            status
                          </label>
                          <select
                            name="status"
                            defaultValue={s.status}
                            className="rounded border border-navy/15 bg-white px-2 py-1 font-mono text-[10px] uppercase tracking-mono-label text-navy focus:border-copper focus:outline-none"
                          >
                            {INTAKE_STATUSES.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                          <button
                            type="submit"
                            className="rounded bg-navy px-3 py-1 font-mono text-[10px] uppercase tracking-mono-label text-cream transition-colors hover:bg-navy-card"
                          >
                            save
                          </button>
                        </form>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Panel>
          )
        ) : (
          <EmptyState phase="needs Supabase">
            <p>
              This is where website intakes from the public{' '}
              <Link href="/start" className="text-deep-copper no-underline hover:underline">
                /start
              </Link>{' '}
              form land. Each submission opens a lead in Clients, emails you, and shows up here with
              every answer and a status you can move through triage.
            </p>
            <p>
              Run <code className="font-mono text-xs">supabase/intake.sql</code> against the project
              and set the Supabase env vars to switch this on.
            </p>
          </EmptyState>
        )}
      </div>
    </>
  );
}
