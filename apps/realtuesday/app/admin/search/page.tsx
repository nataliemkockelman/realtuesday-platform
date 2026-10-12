import Link from 'next/link';
import type { Route } from 'next';
import type { Metadata } from 'next';
import { PageHeader, StatusPill } from '@/components/admin/ui';
import { SearchBar } from '@/components/admin/search-bar';
import { searchAdmin, type SearchType } from '@/lib/search-data';

/**
 * /admin/search — global results for the dashboard search box. Reads ?q= from
 * the URL, runs searchAdmin across every entity, and renders the hits grouped
 * by type with a link into the right admin section. Always dynamic: results
 * depend entirely on the query and live data.
 */

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'search',
  robots: { index: false, follow: false },
};

/** Short type tag shown on each result, matching the pipeline vocabulary. */
const TYPE_TAG: Record<SearchType, string> = {
  client: 'client',
  proposal: 'proposal',
  engagement: 'engagement',
  task: 'task',
  time: 'time',
  invoice: 'invoice',
  intake: 'intake',
  offering: 'offering',
  prospect: 'prospect',
  brainstorm: 'note',
  roadmap: 'roadmap',
};

export default async function AdminSearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = (searchParams.q ?? '').trim();
  const groups = q ? await searchAdmin(q) : [];
  const total = groups.reduce((n, g) => n + g.hits.length, 0);

  return (
    <>
      <PageHeader
        eyebrow="studio"
        title="search."
        intro="One box across everything the studio keeps: clients, proposals, engagements, tasks, time, invoices, website intakes, offerings, the hitlist, and the brainstorm."
      />

      <div className="mb-8 max-w-xl [&_input]:border-navy/15 [&_input]:bg-white/70 [&_input]:text-navy [&_input]:placeholder:text-navy/40 [&_svg]:text-navy/35">
        <SearchBar defaultValue={q} placeholder="Search the studio…" />
      </div>

      {!q ? (
        <p className="font-body text-sm text-navy/50">
          Type a name, company, title, or a few words and press enter.
        </p>
      ) : total === 0 ? (
        <p className="font-body text-sm text-navy/50">
          Nothing matches <span className="font-medium text-navy/70">“{q}”</span>. Try a shorter or
          different term.
        </p>
      ) : (
        <div className="space-y-8">
          <p className="font-mono text-[10px] uppercase tracking-mono-label text-navy/40">
            {total} {total === 1 ? 'result' : 'results'} for “{q}”
          </p>

          {groups.map((group) => (
            <section key={group.type}>
              <h2 className="mb-3 font-mono text-[10px] uppercase tracking-mono-label text-copper">
                {group.label} · {group.hits.length}
              </h2>
              <ul className="space-y-2">
                {group.hits.map((hit) => (
                  <li key={hit.id}>
                    <Link
                      href={hit.href as Route}
                      className="flex items-start justify-between gap-4 rounded-lg border border-navy/10 bg-white/70 px-4 py-3 no-underline transition-colors hover:border-copper/40 hover:bg-white"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-body text-sm font-medium text-navy">
                          {hit.title}
                        </p>
                        {hit.subtitle ? (
                          <p className="mt-0.5 truncate font-body text-xs text-navy/50">
                            {hit.subtitle}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        {hit.status ? <StatusPill status={hit.status} /> : null}
                        <span className="font-mono text-[9px] uppercase tracking-mono-label text-navy/35">
                          {TYPE_TAG[hit.type]}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
