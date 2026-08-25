/**
 * Read layer for website intake submissions. Server-only: these run inside the
 * /admin Server Components that already sit behind the auth gate, talking to
 * Supabase through the service-role client.
 */
import 'server-only';
import { getSupabaseAdmin } from './supabase';
import type { IntakeStatus } from './database.types';

export interface IntakeRow {
  id: string;
  status: IntakeStatus;
  contactName: string;
  email: string;
  company: string | null;
  phone: string | null;
  businessType: string | null;
  primaryGoal: string | null;
  currentSite: string | null;
  domainStatus: string | null;
  budgetRange: string | null;
  timeline: string | null;
  beyondWebsite: string | null;
  message: string | null;
  clientId: string | null;
  createdAt: string;
}

/** Every intake submission, newest first. */
export async function getIntakeSubmissions(): Promise<IntakeRow[]> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('intake_submissions')
    .select(
      'id, status, contact_name, email, company, phone, business_type, primary_goal, current_site, domain_status, budget_range, timeline, beyond_website, message, client_id, created_at',
    )
    .order('created_at', { ascending: false });

  return (data ?? []).map((r) => ({
    id: r.id,
    status: r.status,
    contactName: r.contact_name,
    email: r.email,
    company: r.company,
    phone: r.phone,
    businessType: r.business_type,
    primaryGoal: r.primary_goal,
    currentSite: r.current_site,
    domainStatus: r.domain_status,
    budgetRange: r.budget_range,
    timeline: r.timeline,
    beyondWebsite: r.beyond_website,
    message: r.message,
    clientId: r.client_id,
    createdAt: r.created_at,
  }));
}

/** Count of submissions still in 'new'. Used for the overview badge if wanted. */
export async function getNewIntakeCount(): Promise<number> {
  const supabase = getSupabaseAdmin();
  const { count } = await supabase
    .from('intake_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new');
  return count ?? 0;
}
