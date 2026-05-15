import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client.
 *
 * Uses the SERVICE_ROLE_KEY (not the anon key) so it can write to the
 * subscribers table even with RLS enabled. NEVER import this from a client
 * component — service role bypasses RLS entirely. Server routes only.
 *
 * Returns null when env vars are missing — callers should fall back to
 * console.log so the form keeps working in dev / before keys are wired.
 */

let cachedClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cachedClient) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  cachedClient = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cachedClient;
}

export interface SubscriberRow {
  email: string;
  brand: 'motherload' | 'realtuesday';
  source: string;
}
