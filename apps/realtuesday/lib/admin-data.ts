/**
 * Read layer for the /admin dashboard. Every function talks to Supabase
 * through the server-only admin client and returns plain, view-ready data.
 *
 * Server-only. These run inside Server Components that already sit behind the
 * /admin auth gate. Data volumes for a solo studio are small, so where
 * Postgres aggregate functions would need an RPC, we fetch the few needed
 * columns and reduce in JS instead.
 */
import 'server-only';
import { getSupabaseAdmin } from './supabase';
import type {
  ClientStatus,
  ProposalStatus,
  EngagementStatus,
  TaskStatus,
  InvoiceStatus,
} from './database.types';

// Dates ---------------------------------------------------------------------
const STUDIO_TZ = 'America/Chicago';

/** Today's date in the studio timezone, as YYYY-MM-DD. */
function studioToday(): string {
  // en-CA formats as YYYY-MM-DD, which is exactly what date columns compare against.
  return new Intl.DateTimeFormat('en-CA', { timeZone: STUDIO_TZ }).format(new Date());
}

/** First day of the current month in the studio timezone, as YYYY-MM-DD. */
function studioMonthStart(): string {
  return `${studioToday().slice(0, 7)}-01`;
}

/** Monday of the current week in the studio timezone, as YYYY-MM-DD. */
function studioWeekStart(): string {
  const today = studioToday();
  const dow = new Date(`${today}T00:00:00Z`).getUTCDay(); // 0 Sun..6 Sat
  const backToMonday = dow === 0 ? 6 : dow - 1;
  const monday = new Date(`${today}T00:00:00Z`);
  monday.setUTCDate(monday.getUTCDate() - backToMonday);
  return monday.toISOString().slice(0, 10);
}

// View-model types ----------------------------------------------------------
export interface OverviewStats {
  activeEngagements: number;
  openProposals: number;
  cashInThisMonthCents: number;
  unbilledMinutes: number;
  overdueTasks: number;
  /** Billable share of time logged this week, 0..1. Null when nothing logged. */
  utilization: number | null;
}

export interface ClientRow {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  status: ClientStatus;
  createdAt: string;
}

export interface ProposalRow {
  id: string;
  title: string;
  status: ProposalStatus;
  amountCents: number | null;
  clientName: string;
  sentAt: string | null;
}

export interface EngagementRow {
  id: string;
  name: string;
  status: EngagementStatus;
  clientName: string;
  quotedHours: number | null;
  loggedMinutes: number;
}

export interface TaskRow {
  id: string;
  title: string;
  status: TaskStatus;
  dueDate: string | null;
  engagementName: string | null;
}

export interface TimeEntryRow {
  id: string;
  description: string | null;
  minutes: number;
  billable: boolean;
  loggedOn: string;
  engagementName: string;
}

export interface InvoiceRow {
  id: string;
  number: string | null;
  status: InvoiceStatus;
  amountCents: number;
  clientName: string;
  issuedOn: string | null;
  dueOn: string | null;
}

// Overview ------------------------------------------------------------------
export async function getOverviewStats(): Promise<OverviewStats> {
  const supabase = getSupabaseAdmin();
  const today = studioToday();
  const monthStart = studioMonthStart();
  const weekStart = studioWeekStart();

  const [
    activeEngagements,
    openProposals,
    paidThisMonth,
    unbilled,
    overdueTasks,
    weekTime,
  ] = await Promise.all([
    supabase
      .from('engagements')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active'),
    supabase
      .from('proposals')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'sent'),
    supabase
      .from('invoices')
      .select('amount_cents')
      .eq('status', 'paid')
      .gte('paid_on', monthStart),
    supabase
      .from('time_entries')
      .select('minutes')
      .eq('billable', true)
      .is('invoice_id', null),
    supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .neq('status', 'done')
      .lt('due_date', today),
    supabase
      .from('time_entries')
      .select('minutes, billable')
      .gte('logged_on', weekStart),
  ]);

  const cashInThisMonthCents = (paidThisMonth.data ?? []).reduce(
    (sum, r) => sum + (r.amount_cents ?? 0),
    0,
  );
  const unbilledMinutes = (unbilled.data ?? []).reduce((sum, r) => sum + (r.minutes ?? 0), 0);

  const weekRows = weekTime.data ?? [];
  const weekTotal = weekRows.reduce((sum, r) => sum + (r.minutes ?? 0), 0);
  const weekBillable = weekRows
    .filter((r) => r.billable)
    .reduce((sum, r) => sum + (r.minutes ?? 0), 0);

  return {
    activeEngagements: activeEngagements.count ?? 0,
    openProposals: openProposals.count ?? 0,
    cashInThisMonthCents,
    unbilledMinutes,
    overdueTasks: overdueTasks.count ?? 0,
    utilization: weekTotal > 0 ? weekBillable / weekTotal : null,
  };
}

// Lists ---------------------------------------------------------------------
export async function getClients(): Promise<ClientRow[]> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('clients')
    .select('id, name, company, email, status, created_at')
    .order('created_at', { ascending: false });
  return (data ?? []).map((c) => ({
    id: c.id,
    name: c.name,
    company: c.company,
    email: c.email,
    status: c.status,
    createdAt: c.created_at,
  }));
}

// Raw row shapes for the embed queries. PostgREST returns a to-one relation
// as a nested object (or null); we type it loosely and normalize with
// extractName. Explicit `.returns<>()` sidesteps the select-string inference,
// which cannot resolve embeds against the hand-written Database types.
type Embedded = { name: string } | { name: string }[] | null;

interface RawProposal {
  id: string;
  title: string;
  status: ProposalStatus;
  amount_cents: number | null;
  sent_at: string | null;
  clients: Embedded;
}

interface RawEngagement {
  id: string;
  name: string;
  status: EngagementStatus;
  quoted_hours: number | null;
  clients: Embedded;
  time_entries: { minutes: number }[] | null;
}

interface RawTask {
  id: string;
  title: string;
  status: TaskStatus;
  due_date: string | null;
  engagements: Embedded;
}

interface RawTimeEntry {
  id: string;
  description: string | null;
  minutes: number;
  billable: boolean;
  logged_on: string;
  engagements: Embedded;
}

interface RawInvoice {
  id: string;
  number: string | null;
  status: InvoiceStatus;
  amount_cents: number;
  issued_on: string | null;
  due_on: string | null;
  clients: Embedded;
}

export async function getProposals(): Promise<ProposalRow[]> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('proposals')
    .select('id, title, status, amount_cents, sent_at, clients(name)')
    .order('created_at', { ascending: false })
    .returns<RawProposal[]>();
  return (data ?? []).map((p) => ({
    id: p.id,
    title: p.title,
    status: p.status,
    amountCents: p.amount_cents,
    sentAt: p.sent_at,
    clientName: extractName(p.clients),
  }));
}

export async function getEngagements(): Promise<EngagementRow[]> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('engagements')
    .select('id, name, status, quoted_hours, clients(name), time_entries(minutes)')
    .order('created_at', { ascending: false })
    .returns<RawEngagement[]>();
  return (data ?? []).map((e) => ({
    id: e.id,
    name: e.name,
    status: e.status,
    quotedHours: e.quoted_hours,
    clientName: extractName(e.clients),
    loggedMinutes: sumMinutes(e.time_entries),
  }));
}

export async function getTasks(): Promise<TaskRow[]> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('tasks')
    .select('id, title, status, due_date, engagements(name)')
    .order('due_date', { ascending: true, nullsFirst: false })
    .returns<RawTask[]>();
  return (data ?? []).map((t) => ({
    id: t.id,
    title: t.title,
    status: t.status,
    dueDate: t.due_date,
    engagementName: t.engagements ? extractName(t.engagements) : null,
  }));
}

export async function getTimeEntries(): Promise<TimeEntryRow[]> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('time_entries')
    .select('id, description, minutes, billable, logged_on, engagements(name)')
    .order('logged_on', { ascending: false })
    .returns<RawTimeEntry[]>();
  return (data ?? []).map((t) => ({
    id: t.id,
    description: t.description,
    minutes: t.minutes,
    billable: t.billable,
    loggedOn: t.logged_on,
    engagementName: extractName(t.engagements),
  }));
}

export async function getInvoices(): Promise<InvoiceRow[]> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('invoices')
    .select('id, number, status, amount_cents, issued_on, due_on, clients(name)')
    .order('created_at', { ascending: false })
    .returns<RawInvoice[]>();
  return (data ?? []).map((i) => ({
    id: i.id,
    number: i.number,
    status: i.status,
    amountCents: i.amount_cents,
    issuedOn: i.issued_on,
    dueOn: i.due_on,
    clientName: extractName(i.clients),
  }));
}

// Helpers -------------------------------------------------------------------
// PostgREST embeds a to-one relation as an object, but the generated types can
// widen it to an array. Normalize either shape down to a display name.
function extractName(rel: unknown): string {
  if (!rel) return 'unassigned';
  const record = Array.isArray(rel) ? rel[0] : rel;
  if (record && typeof record === 'object' && 'name' in record) {
    const name = (record as { name?: unknown }).name;
    if (typeof name === 'string' && name.trim()) return name;
  }
  return 'unassigned';
}

function sumMinutes(rel: unknown): number {
  if (!Array.isArray(rel)) return 0;
  return rel.reduce((sum, r) => {
    const m = r && typeof r === 'object' && 'minutes' in r ? (r as { minutes?: number }).minutes : 0;
    return sum + (typeof m === 'number' ? m : 0);
  }, 0);
}
