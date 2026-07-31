/**
 * Read layer for the ADMIN-side client portal preview
 * (/admin/clients/[id]/portal). Unlike lib/portal-data.ts, which relies on the
 * signed-in client's own session + RLS, this uses the service-role admin client
 * and takes an explicit clientId, so a teammate can look at exactly what any
 * given client sees in their portal. It mirrors the portal's own queries,
 * including hiding draft invoices, so the preview is faithful.
 *
 * Server-only; runs from behind the /admin auth gate.
 */
import 'server-only';
import { getSupabaseAdmin } from './supabase';
import type { EngagementStatus, InvoiceStatus, TaskStatus } from './database.types';
import type {
  PortalClient,
  PortalEngagement,
  PortalTask,
  PortalInvoice,
} from './portal-data';

export async function getClientForPreview(clientId: string): Promise<PortalClient | null> {
  const admin = getSupabaseAdmin();
  const { data } = await admin
    .from('clients')
    .select('id, name, company')
    .eq('id', clientId)
    .maybeSingle();
  if (!data) return null;
  return { id: data.id, name: data.name, company: data.company };
}

export async function getEngagementsForPreview(clientId: string): Promise<PortalEngagement[]> {
  const admin = getSupabaseAdmin();
  const { data } = await admin
    .from('engagements')
    .select('id, name, status, started_at, tasks(status)')
    .eq('client_id', clientId)
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

export async function getOpenTasksForPreview(clientId: string): Promise<PortalTask[]> {
  const admin = getSupabaseAdmin();
  const { data } = await admin
    .from('tasks')
    .select('id, title, status, due_date, engagements!inner(client_id)')
    .eq('engagements.client_id', clientId)
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

export async function getInvoicesForPreview(clientId: string): Promise<PortalInvoice[]> {
  const admin = getSupabaseAdmin();
  // Match the portal: clients never see drafts.
  const { data } = await admin
    .from('invoices')
    .select('id, number, status, amount_cents, issued_on, due_on')
    .eq('client_id', clientId)
    .neq('status', 'draft')
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
