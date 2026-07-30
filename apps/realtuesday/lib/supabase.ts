/**
 * Server-only Supabase client for the /admin dashboard.
 *
 * Uses the SERVICE ROLE key, so it can read and write every table and
 * bypasses Row Level Security. That is safe here because this module is
 * imported only from Server Components and Route Handlers that already sit
 * behind the /admin auth gate (see middleware.ts). It must NEVER be imported
 * into a `'use client'` file — the service role key would ship to the browser.
 *
 * The client is created lazily and memoized, so importing this module does not
 * throw at build time when the env vars are absent (e.g. during the interim
 * before Supabase is wired up). It throws only when actually called without
 * configuration, with a message that says which variable is missing.
 */
import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

let cached: SupabaseClient<Database> | null = null;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing ${name}. Set it in .env.local for local dev and in Vercel → ` +
        `Project → Settings → Environment Variables for production.`,
    );
  }
  return value;
}

/**
 * Returns the memoized admin Supabase client, creating it on first use.
 * Server-only. Do not call from client components.
 */
export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (cached) return cached;

  const url = requireEnv('NEXT_PUBLIC_SUPABASE_URL');
  const serviceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');

  cached = createClient<Database>(url, serviceRoleKey, {
    auth: {
      // Server client: no session persistence, no token refresh, no URL parsing.
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return cached;
}

/**
 * True when both env vars needed by the admin client are present. Section
 * pages use this to decide between rendering real data and the "phase 2"
 * empty state, so the dashboard degrades gracefully before Supabase is live.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
