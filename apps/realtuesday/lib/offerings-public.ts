/**
 * Public read of the offerings list for the marketing site's /offerings page.
 *
 * Uses the ANON key, not the service role, so Row Level Security applies: the
 * `offerings_public_select` policy only exposes rows where published = true.
 * Drafts the admin is still working on stay invisible to the public site. This
 * module is safe to import from a Server Component that renders a public page.
 */
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export type PublicOffering = {
  id: string;
  name: string;
  summary: string | null;
  price_cents: number | null;
  price_note: string | null;
};

/** True when the public anon client can be created. */
export function isPublicSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/** Published offerings in display order. Empty array if unconfigured or none. */
export async function getPublishedOfferings(): Promise<PublicOffering[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return [];

  const supabase = createClient<Database>(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data } = await supabase
    .from('offerings')
    .select('id, name, summary, price_cents, price_note')
    .eq('published', true)
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });

  return data ?? [];
}
