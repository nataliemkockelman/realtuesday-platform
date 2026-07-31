import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updatePortalSession } from '@/lib/supabase-portal';
import { updateAdminSession } from '@/lib/admin-auth';

/**
 * Edge middleware for the two gated areas of the site.
 *
 * /admin  — the studio backend, gated by a Supabase Auth session AND membership
 *           in the `admin_users` allowlist. Unauthenticated (or non-admin)
 *           visitors are sent to /admin/login. The login and invite-accept
 *           pages are public so a teammate can actually get in.
 *
 * /portal — the client portal, gated by a Supabase Auth session. Unauthenticated
 *           visitors are sent to /portal/login. The login and invite-accept
 *           pages are public so a client can actually get in.
 */

// Admin paths that must stay reachable without a session.
const PUBLIC_ADMIN_PATHS = ['/admin/login', '/admin/accept'];

async function guardAdmin(req: NextRequest) {
  const { response, user, isAdmin } = await updateAdminSession(req);
  const path = req.nextUrl.pathname;
  const isPublic = PUBLIC_ADMIN_PATHS.some(
    (p) => path === p || path.startsWith(`${p}/`),
  );

  // A signed-in admin on the login page goes straight to the dashboard.
  if (user && isAdmin && path === '/admin/login') {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // Everything else under /admin needs a session on the allowlist.
  if ((!user || !isAdmin) && !isPublic) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return response;
}

// Portal paths that must stay reachable without a session.
const PUBLIC_PORTAL_PATHS = ['/portal/login', '/portal/accept'];

async function guardPortal(req: NextRequest) {
  const { response, user } = await updatePortalSession(req);
  const path = req.nextUrl.pathname;
  const isPublic = PUBLIC_PORTAL_PATHS.some(
    (p) => path === p || path.startsWith(`${p}/`),
  );

  // Signed-in visitors on the login page go straight to their dashboard.
  if (user && path === '/portal/login') {
    return NextResponse.redirect(new URL('/portal', req.url));
  }

  // Everything else under /portal needs a session.
  if (!user && !isPublic) {
    return NextResponse.redirect(new URL('/portal/login', req.url));
  }

  return response;
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (path.startsWith('/admin')) return guardAdmin(req);
  if (path.startsWith('/portal')) return guardPortal(req);
  return NextResponse.next();
}


export const config = {
  matcher: ['/admin/:path*', '/portal/:path*'],
};
