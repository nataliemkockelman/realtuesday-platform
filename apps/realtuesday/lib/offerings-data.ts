/**
 * Server-only reads for the offerings editor (/admin/offerings). Uses the
 * service-role admin client, so it sees BOTH draft and published rows — the
 * admin edits the whole list here. The public /offerings page reads separately
 * (lib/offerings-public.ts) with the anon key and sees published rows only.
 */
import 'server-only';
import { getSupabaseAdmin } from './supabase';
import type { Database } from './database.types';

export type Offering = Database['public']['Tables']['offerings']['Row'];

/** Every offering, draft and published, in display order. */
export async function getOfferings(): Promise<Offering[]> {
  const admin = getSupabaseAdmin();
  const { data } = await admin
    .from('offerings')
    .select('*')
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });
  return data ?? [];
}
