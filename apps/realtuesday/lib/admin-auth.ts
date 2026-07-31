/**
 * Supabase auth helpers for the ADMIN team area (/admin).
 *
 * Like the client portal, /admin now uses per-user Supabase Auth logins
 * (email + password, no magic link) instead of the interim HTTP Basic Auth.
 * Who may enter is the allowlist in the `admin_users` table; a valid session
 * alone is not enough. This mirrors lib/supabase-portal.ts: it talks to
 * Supabase with the ANON key plus the caller's session, so the `admin_users`
 * self-select RLS policy governs what identity we can resolve.
 *
 * Server-only. Two entry points:
 *   - getAdminIdentity() for Server Components / the admin layout, returning
 *     the signed-in teammate (name + accent color) or null.
 *   - updateAdminSession() for middleware, to refresh the session cookie and
 *     report whether the caller is on the admin allowlist.
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

export interface AdminIdentity {
  userId: string;
  name: string;
  email: string;
  color: string;
}

/** Session-aware client for Server Components / Actions / Route Handlers. */
export function createAdminSessionClient() {
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
 * Resolve the signed-in admin, or null. Returns null both when there is no
 * session and when the session belongs to someone who is NOT on the
 * `admin_users` allowlist (e.g. a portal client). The allowlist read passes
 * through the admin_users_self_select RLS policy, so it only ever sees the
 * caller's own row.
 */
export async function getAdminIdentity(): Promise<AdminIdentity | null> {
  const supabase = createAdminSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('admin_users')
    .select('user_id, name, email, color')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!data) return null;
  return { userId: data.user_id, name: data.name, email: data.email, color: data.color };
}

/**
 * Middleware helper: refresh the auth session on every /admin request and
 * return the response carrying any updated cookies, plus whether the caller is
 * signed in at all (`user`) and whether they are on the admin allowlist
 * (`isAdmin`). Edge-safe: uses only @supabase/ssr and the request cookies.
 */
export async function updateAdminSession(request: NextRequest) {
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

  let isAdmin = false;
  if (user) {
    const { data } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle();
    isAdmin = Boolean(data);
  }

  return { response, user, isAdmin };
}
