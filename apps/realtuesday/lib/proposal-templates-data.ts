/**
 * Server-only reads for the proposal templates manager (/admin/proposals).
 * Uses the service-role admin client, so it runs from behind the /admin auth
 * gate only. Templates are internal — there is no public policy on the table.
 */
import 'server-only';
import { getSupabaseAdmin } from './supabase';
import type { Database } from './database.types';

export type ProposalTemplate = Database['public']['Tables']['proposal_templates']['Row'];

/** Every template, in display order. */
export async function getProposalTemplates(): Promise<ProposalTemplate[]> {
  const admin = getSupabaseAdmin();
  const { data } = await admin
    .from('proposal_templates')
    .select('*')
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });
  return data ?? [];
}

/** A single template by id, or null if it does not exist. Used by the branded
 *  PDF print view. */
export async function getProposalTemplate(id: string): Promise<ProposalTemplate | null> {
  const admin = getSupabaseAdmin();
  const { data } = await admin
    .from('proposal_templates')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  return data ?? null;
}
