/**
 * Read layer for the client PORTAL. Every query runs through the session-aware
 * Supabase client, so Row Level Security guarantees a client can only ever see
 * their own rows. There is no service_role key here on purpose.
 *
 * Server-only.
 */
import 'server-only';
import { createPortalServerClient } from './supabase-portal';
import type { EngagementStatus, InvoiceStatus, TaskStatus } from './database.types';

export interface PortalClient {
  id: string;
  name: string;
  company: string | null;
}

export interface PortalEngagement {
  id: string;
  name: string;
  status: EngagementStatus;
  startedAt: string | null;
  totalTasks: number;
  doneTasks: number;
}

export interface PortalTask {
  id: string;
  title: string;
  status: TaskStatus;
  dueDate: string | null;
}

export interface PortalInvoice {
  id: string;
  number: string | null;
  status: InvoiceStatus;
  amountCents: number;
  issuedOn: string | null;
  dueOn: string | null;
}

/** The client record linked to the current session, or null if none. */
export async function getPortalClient(): Promise<PortalClient | null> {
  const supabase = createPortalServerClient();
  // RLS lets the user read only their own client row, so a plain select is safe.
  const { data } = await supabase.from('clients').select('id, name, company').limit(1).maybeSingle();
  if (!data) return null;
  return { id: data.id, name: data.name, company: data.company };
}

export async function getPortalEngagements(): Promise<PortalEngagement[]> {
  const supabase = createPortalServerClient();
  const { data } = await supabase
    .from('engagements')
    .select('id, name, status, started_at, tasks(status)')
    .order('created_at', { ascending: false })
    .returns<
      {
        id: string;
        name: string;
        status: EngagementStatus;
        started_at: string | null;
        tasks: { status: TaskStatus }[] | null;
      }[]
    >();

  return (data ?? []).map((e) => {
    const tasks = e.tasks ?? [];
    return {
      id: e.id,
      name: e.name,
      status: e.status,
      startedAt: e.started_at,
      totalTasks: tasks.length,
      doneTasks: tasks.filter((t) => t.status === 'done').length,
    };
  });
}

export async function getPortalOpenTasks(): Promise<PortalTask[]> {
  const supabase = createPortalServerClient();
  const { data } = await supabase
    .from('tasks')
    .select('id, title, status, due_date')
    .neq('status', 'done')
    .order('due_date', { ascending: true, nullsFirst: false })
    .returns<{ id: string; title: string; status: TaskStatus; due_date: string | null }[]>();

  return (data ?? []).map((t) => ({
    id: t.id,
    title: t.title,
    status: t.status,
    dueDate: t.due_date,
  }));
}

export async function getPortalInvoices(): Promise<PortalInvoice[]> {
  const supabase = createPortalServerClient();
  // RLS already hides drafts; ordering newest first.
  const { data } = await supabase
    .from('invoices')
    .select('id, number, status, amount_cents, issued_on, due_on')
    .order('issued_on', { ascending: false, nullsFirst: false })
    .returns<
      {
        id: string;
        number: string | null;
        status: InvoiceStatus;
        amount_cents: number;
        issued_on: string | null;
        due_on: string | null;
      }[]
    >();

  return (data ?? []).map((i) => ({
    id: i.id,
    number: i.number,
    status: i.status,
    amountCents: i.amount_cents,
    issuedOn: i.issued_on,
    dueOn: i.due_on,
  }));
}
