/**
 * Server-only reads for the studio collaboration space (/admin/brainstorm):
 * the shared brainstorm wall and the roadmap below it. Uses the service-role
 * admin client, so it runs from behind the /admin auth gate only.
 */
import 'server-only';
import { getSupabaseAdmin } from './supabase';
import type { Database } from './database.types';
import type { RoadmapItem } from './roadmap';

export type BrainstormNote = Database['public']['Tables']['brainstorm_notes']['Row'];

// Re-export the client-safe roadmap constants/types so server callers can keep
// importing everything from one place.
export { ROADMAP_STATUSES } from './roadmap';
export type { RoadmapItem } from './roadmap';

/** Every brainstorm note, newest first. */
export async function getBrainstormNotes(): Promise<BrainstormNote[]> {
  const admin = getSupabaseAdmin();
  const { data } = await admin
    .from('brainstorm_notes')
    .select('*')
    .order('created_at', { ascending: false });
  return data ?? [];
}

/** Every roadmap item, ordered within its column by position then age. */
export async function getRoadmapItems(): Promise<RoadmapItem[]> {
  const admin = getSupabaseAdmin();
  const { data } = await admin
    .from('roadmap_items')
    .select('*')
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });
  return data ?? [];
}
