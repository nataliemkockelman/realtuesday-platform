/**
 * Global search for the /admin dashboard.
 *
 * One query box that reaches every record type the studio keeps: clients,
 * proposals, engagements, tasks, time entries, invoices, website intakes,
 * offerings, hitlist prospects, and the studio brainstorm (notes + roadmap).
 *
 * Each entity is queried in parallel with a case-insensitive ILIKE across its
 * meaningful text columns. With the trigram GIN indexes from
 * supabase/search_indexes.sql in place, those ILIKE scans are index-backed
 * rather than sequential — that is what makes this "fully indexed".
 *
 * Server-only. Runs behind the /admin auth gate and uses the service-role
 * client (bypasses RLS). Per-table errors are swallowed: if a table has not
 * been created yet in this project, that group is simply absent rather than
 * blowing up the whole search.
 */
import 'server-only';
import { getSupabaseAdmin } from './supabase';

export type SearchType =
  | 'client'
  | 'proposal'
  | 'engagement'
  | 'task'
  | 'time'
  | 'invoice'
  | 'intake'
  | 'offering'
  | 'prospect'
  | 'brainstorm'
  | 'roadmap';

export interface SearchHit {
  type: SearchType;
  id: string;
  title: string;
  subtitle: string | null;
  status: string | null;
  /** Where clicking the result lands in /admin. */
  href: string;
}

export interface SearchGroup {
  type: SearchType;
  /** Plural, human label for the section header, e.g. "Clients". */
  label: string;
  hits: SearchHit[];
}

/** Rows fewer than this per entity keeps the results page scannable. */
const PER_TABLE_LIMIT = 8;

/** Minimum query length before we bother the database. */
const MIN_QUERY = 2;

/**
 * Strip characters that carry meaning in PostgREST's `or=` grammar (commas,
 * dots, parentheses, quotes) or in ILIKE (`*`, `%`, `_`), so a raw query can
 * never break the filter or inject wildcards. Dots and "@" are dropped too,
 * which slightly loosens full-email matching but keeps name/company/handle
 * search exact and safe. Letters, digits, spaces, and hyphens survive.
 */
function sanitize(raw: string): string {
  return raw
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Build a comma-joined `col.ilike.*term*` list for a PostgREST `.or()`. */
function ilikeOr(columns: string[], term: string): string {
  const pattern = `*${term}*`;
  return columns.map((c) => `${c}.ilike.${pattern}`).join(',');
}

/** Run one table's query, returning [] on any error (e.g. missing table). */
async function safe<T>(
  run: () => PromiseLike<{ data: T[] | null; error: unknown }>,
): Promise<T[]> {
  try {
    const { data, error } = await run();
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

/** PostgREST embeds a to-one relation as an object or a one-element array. */
function relName(rel: unknown): string | null {
  if (!rel) return null;
  const record = Array.isArray(rel) ? rel[0] : rel;
  if (record && typeof record === 'object' && 'name' in record) {
    const name = (record as { name?: unknown }).name;
    if (typeof name === 'string' && name.trim()) return name;
  }
  return null;
}

/** Collapse a long free-text field to a one-line snippet for a subtitle. */
function snippet(text: string | null, max = 90): string | null {
  if (!text) return null;
  const flat = text.replace(/\s+/g, ' ').trim();
  if (!flat) return null;
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
}

/**
 * Search every admin entity for `rawQuery`. Returns groups in a fixed,
 * pipeline-shaped order (clients → proposals → … → studio), each with up to
 * PER_TABLE_LIMIT hits. Empty groups are omitted.
 */
export async function searchAdmin(rawQuery: string): Promise<SearchGroup[]> {
  const term = sanitize(rawQuery);
  if (term.length < MIN_QUERY) return [];

  const db = getSupabaseAdmin();

  const [
    clients,
    proposals,
    engagements,
    tasks,
    timeEntries,
    invoices,
    intake,
    offerings,
    prospects,
    notes,
    roadmap,
  ] = await Promise.all([
    safe<{ id: string; name: string; company: string | null; email: string | null; status: string }>(
      () =>
        db
          .from('clients')
          .select('id, name, company, email, status')
          .or(ilikeOr(['name', 'company', 'email', 'notes'], term))
          .limit(PER_TABLE_LIMIT),
    ),
    safe<{ id: string; title: string; status: string; clients: unknown }>(() =>
      db
        .from('proposals')
        .select('id, title, status, clients(name)')
        .or(ilikeOr(['title'], term))
        .limit(PER_TABLE_LIMIT),
    ),
    safe<{ id: string; name: string; status: string; clients: unknown }>(() =>
      db
        .from('engagements')
        .select('id, name, status, clients(name)')
        .or(ilikeOr(['name'], term))
        .limit(PER_TABLE_LIMIT),
    ),
    safe<{ id: string; title: string; status: string; engagements: unknown }>(() =>
      db
        .from('tasks')
        .select('id, title, status, engagements(name)')
        .or(ilikeOr(['title'], term))
        .limit(PER_TABLE_LIMIT),
    ),
    safe<{ id: string; description: string | null; engagements: unknown }>(() =>
      db
        .from('time_entries')
        .select('id, description, engagements(name)')
        .or(ilikeOr(['description'], term))
        .limit(PER_TABLE_LIMIT),
    ),
    safe<{ id: string; number: string | null; status: string; clients: unknown }>(() =>
      db
        .from('invoices')
        .select('id, number, status, clients(name)')
        .or(ilikeOr(['number'], term))
        .limit(PER_TABLE_LIMIT),
    ),
    safe<{
      id: string;
      contact_name: string;
      company: string | null;
      email: string;
      status: string;
      message: string | null;
    }>(() =>
      db
        .from('intake_submissions')
        .select('id, contact_name, company, email, status, message')
        .or(
          ilikeOr(
            ['contact_name', 'company', 'email', 'business_type', 'primary_goal', 'beyond_website', 'message'],
            term,
          ),
        )
        .limit(PER_TABLE_LIMIT),
    ),
    safe<{ id: string; name: string; summary: string | null; price_note: string | null }>(() =>
      db
        .from('offerings')
        .select('id, name, summary, price_note')
        .or(ilikeOr(['name', 'summary', 'price_note'], term))
        .limit(PER_TABLE_LIMIT),
    ),
    safe<{ id: string; name: string; company: string | null; note: string | null }>(() =>
      db
        .from('hitlist_prospects')
        .select('id, name, company, note')
        .or(ilikeOr(['name', 'company', 'note'], term))
        .limit(PER_TABLE_LIMIT),
    ),
    safe<{ id: string; body: string; author_name: string }>(() =>
      db
        .from('brainstorm_notes')
        .select('id, body, author_name')
        .or(ilikeOr(['body', 'author_name'], term))
        .limit(PER_TABLE_LIMIT),
    ),
    safe<{ id: string; title: string; detail: string | null }>(() =>
      db
        .from('roadmap_items')
        .select('id, title, detail')
        .or(ilikeOr(['title', 'detail'], term))
        .limit(PER_TABLE_LIMIT),
    ),
  ]);

  const groups: SearchGroup[] = [];

  if (clients.length) {
    groups.push({
      type: 'client',
      label: 'Clients',
      hits: clients.map((c) => ({
        type: 'client',
        id: c.id,
        title: c.name,
        subtitle: c.company ?? c.email,
        status: c.status,
        href: `/admin/clients/${c.id}`,
      })),
    });
  }

  if (proposals.length) {
    groups.push({
      type: 'proposal',
      label: 'Proposals',
      hits: proposals.map((p) => ({
        type: 'proposal',
        id: p.id,
        title: p.title,
        subtitle: relName(p.clients),
        status: p.status,
        href: '/admin/proposals',
      })),
    });
  }

  if (engagements.length) {
    groups.push({
      type: 'engagement',
      label: 'Engagements',
      hits: engagements.map((e) => ({
        type: 'engagement',
        id: e.id,
        title: e.name,
        subtitle: relName(e.clients),
        status: e.status,
        href: '/admin/engagements',
      })),
    });
  }

  if (tasks.length) {
    groups.push({
      type: 'task',
      label: 'Tasks',
      hits: tasks.map((t) => ({
        type: 'task',
        id: t.id,
        title: t.title,
        subtitle: relName(t.engagements),
        status: t.status,
        href: '/admin/tasks',
      })),
    });
  }

  if (timeEntries.length) {
    groups.push({
      type: 'time',
      label: 'Time entries',
      hits: timeEntries.map((t) => ({
        type: 'time',
        id: t.id,
        title: snippet(t.description) ?? 'time entry',
        subtitle: relName(t.engagements),
        status: null,
        href: '/admin/time',
      })),
    });
  }

  if (invoices.length) {
    groups.push({
      type: 'invoice',
      label: 'Invoices',
      hits: invoices.map((i) => ({
        type: 'invoice',
        id: i.id,
        title: i.number ?? 'draft invoice',
        subtitle: relName(i.clients),
        status: i.status,
        href: '/admin/finance',
      })),
    });
  }

  if (intake.length) {
    groups.push({
      type: 'intake',
      label: 'Intake',
      hits: intake.map((s) => ({
        type: 'intake',
        id: s.id,
        title: s.contact_name,
        subtitle: s.company ?? s.email,
        status: s.status,
        href: '/admin/intake',
      })),
    });
  }

  if (offerings.length) {
    groups.push({
      type: 'offering',
      label: 'Offerings',
      hits: offerings.map((o) => ({
        type: 'offering',
        id: o.id,
        title: o.name,
        subtitle: snippet(o.summary) ?? o.price_note,
        status: null,
        href: '/admin/offerings',
      })),
    });
  }

  if (prospects.length) {
    groups.push({
      type: 'prospect',
      label: 'Hitlist',
      hits: prospects.map((p) => ({
        type: 'prospect',
        id: p.id,
        title: p.name,
        subtitle: p.company ?? snippet(p.note),
        status: null,
        href: '/admin/hitlist',
      })),
    });
  }

  if (notes.length) {
    groups.push({
      type: 'brainstorm',
      label: 'Brainstorm',
      hits: notes.map((n) => ({
        type: 'brainstorm',
        id: n.id,
        title: snippet(n.body) ?? 'note',
        subtitle: n.author_name,
        status: null,
        href: '/admin/brainstorm',
      })),
    });
  }

  if (roadmap.length) {
    groups.push({
      type: 'roadmap',
      label: 'Roadmap',
      hits: roadmap.map((r) => ({
        type: 'roadmap',
        id: r.id,
        title: r.title,
        subtitle: snippet(r.detail),
        status: null,
        href: '/admin/brainstorm',
      })),
    });
  }

  return groups;
}
