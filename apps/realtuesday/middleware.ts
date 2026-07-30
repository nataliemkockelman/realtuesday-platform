import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updatePortalSession } from '@/lib/supabase-portal';

/**
 * Edge middleware for the two gated areas of the site.
 *
 * /admin  — interim HTTP Basic Auth. A deliberate stopgap so the backend is
 *           never publicly reachable while it is built out. Fail-closed: if
 *           ADMIN_USER and ADMIN_PASSWORD are not both set, nobody gets in.
 *
 * /portal — the client portal, gated by a Supabase Auth session. Unauthenticated
 *           visitors are sent to /portal/login. The login and invite-accept
 *           pages are public so a client can actually get in.
 *
 * Runs on the edge, so it uses Web APIs (atob) rather than Node Buffer.
 */

function locked() {
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="real Tuesday admin", charset="UTF-8"',
    },
  });
}

function guardAdmin(req: NextRequest) {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPass = process.env.ADMIN_PASSWORD;

  // No credentials configured means the door stays shut for everyone.
  if (!expectedUser || !expectedPass) return locked();

  const header = req.headers.get('authorization');
  if (!header || !header.startsWith('Basic ')) return locked();

  let decoded = '';
  try {
    decoded = atob(header.slice('Basic '.length));
  } catch {
    return locked();
  }

  const separator = decoded.indexOf(':');
  if (separator === -1) return locked();

  const givenUser = decoded.slice(0, separator);
  const givenPass = decoded.slice(separator + 1);

  if (givenUser !== expectedUser || givenPass !== expectedPass) return locked();

  return NextResponse.next();
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
