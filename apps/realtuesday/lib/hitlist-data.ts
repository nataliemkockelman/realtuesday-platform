/**
 * Server-only reads for the hitlist prospect tracker (/admin/hitlist). Uses the
 * service-role admin client, so it runs from behind the /admin auth gate only.
 * The hitlist is private — there is no public policy on the table.
 */
import 'server-only';
import { getSupabaseAdmin } from './supabase';
import type { HitlistProspect } from './hitlist';

export type { HitlistProspect } from './hitlist';

/** Every prospect, ordered within its stage by position then age. */
export async function getProspects(): Promise<HitlistProspect[]> {
  const admin = getSupabaseAdmin();
  const { data } = await admin
    .from('hitlist_prospects')
    .select('*')
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });
  return data ?? [];
}
