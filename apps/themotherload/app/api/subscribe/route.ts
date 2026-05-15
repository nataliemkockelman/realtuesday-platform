/**
 * POST /api/subscribe
 *
 * Stub for Phase 1: validates input and console.logs the payload. When
 * Supabase is wired up (separate build step), this handler swaps in an
 * insert into the `subscribers` table — keep the request shape stable so
 * frontend code doesn't change.
 *
 * Request:
 *   { email: string, source: SubscribeSource, brand: 'motherload' }
 *
 * Response:
 *   200 — { ok: true }
 *   400 — { ok: false, message: string }
 */

import { NextResponse, type NextRequest } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SOURCES = new Set(['home-hero', 'home-email-capture']);
const MAX_EMAIL_LEN = 254; // RFC 3696 ceiling
const MAX_SLUG_LEN = 80;

interface SubscribePayload {
  email: string;
  brand: string;
  source: string | { lead_magnet: string };
}

function bad(message: string) {
  return NextResponse.json({ ok: false, message }, { status: 400 });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return bad('Invalid JSON body.');
  }

  if (!body || typeof body !== 'object') return bad('Body must be a JSON object.');
  const { email, brand, source } = body as Partial<SubscribePayload>;

  if (typeof email !== 'string' || email.length > MAX_EMAIL_LEN || !EMAIL_RE.test(email.trim())) {
    return bad('That doesn\u2019t look like a valid email.');
  }
  if (brand !== 'motherload') {
    // Real Tuesday parent will add 'realtuesday' later.
    return bad('Unknown brand.');
  }

  let normalizedSource: string;
  if (typeof source === 'string') {
    if (!ALLOWED_SOURCES.has(source)) return bad('Unknown source.');
    normalizedSource = source;
  } else if (
    source &&
    typeof source === 'object' &&
    typeof (source as { lead_magnet?: unknown }).lead_magnet === 'string'
  ) {
    const slug = (source as { lead_magnet: string }).lead_magnet;
    if (slug.length > MAX_SLUG_LEN || !/^[a-z0-9-]+$/.test(slug)) {
      return bad('Invalid lead magnet slug.');
    }
    normalizedSource = `lead-magnet:${slug}`;
  } else {
    return bad('Missing source.');
  }

  // TODO(supabase): replace this with `supabase.from('subscribers').insert(...)`
  // and an idempotent upsert on email + brand.
  console.log('[subscribe]', {
    email: email.trim().toLowerCase(),
    brand,
    source: normalizedSource,
    received_at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}

// Reject non-POST verbs explicitly so they don't fall through to the framework
// 405 handler with a noisier response.
export async function GET() {
  return new NextResponse('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'POST' },
  });
}
