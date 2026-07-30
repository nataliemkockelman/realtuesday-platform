/**
 * Supabase clients for the CLIENT PORTAL (/portal).
 *
 * Unlike lib/supabase.ts (which uses the service_role key and bypasses RLS for
 * the admin dashboard), the portal talks to Supabase as the logged-in client
 * using the ANON key plus their auth session. Every read is therefore forced
 * through Row Level Security, so a client can only ever see their own rows.
 *
 * Server-only. Two entry points:
 *   - createPortalServerClient() for Server Components, Route Handlers, and
 *     Server Actions (reads/writes the session cookie via next/headers).
 *   - updatePortalSession() for middleware, to keep the session cookie fresh.
 */
import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { Database } from './database.types';

function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

/** Session-aware client for Server Components / Actions / Route Handlers. */
export function createPortalServerClient() {
  const cookieStore = cookies();
  return createServerClient<Database>(
    env('NEXT_PUBLIC_SUPABASE_URL'),
    env('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // In a Server Component the cookie store is read-only and throws;
          // that is fine because middleware refreshes the session instead.
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            /* no-op in RSC render */
          }
        },
      },
    },
  );
}

/**
 * Middleware helper: refresh the auth session on every /portal request and
 * return the response carrying any updated cookies. Also returns the resolved
 * user so the caller can gate unauthenticated access.
 */
export async function updatePortalSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    env('NEXT_PUBLIC_SUPABASE_URL'),
    env('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}
