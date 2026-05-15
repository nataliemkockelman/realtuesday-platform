/**
 * POST /api/subscribe
 *
 * Validates → upserts into Supabase `subscribers` → sends welcome email
 * via Resend. Each backend is independent and degrades gracefully: if the
 * Supabase env vars are missing the row write is skipped and logged; same
 * for Resend. The form always reports success to the user as long as the
 * email validated — backend failures are observable in Vercel logs but
 * don't surface to the visitor.
 *
 * Request:
 *   { email: string, source: SubscribeSource, brand: 'motherload' }
 *
 * Response:
 *   200 — { ok: true }
 *   400 — { ok: false, message: string }
 */

import { NextResponse, type NextRequest } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendWelcomeEmail } from '@/lib/resend';
import { LEAD_MAGNETS } from '@/lib/lead-magnets';

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
    return bad('Unknown brand.');
  }

  let normalizedSource: string;
  // Parallel representation kept so we can pick the right welcome email
  // shape without re-parsing the wire format below.
  let welcomeContext:
    | { kind: 'lead-magnet'; slug: string; title: string }
    | { kind: 'newsletter' };

  if (typeof source === 'string') {
    if (!ALLOWED_SOURCES.has(source)) return bad('Unknown source.');
    normalizedSource = source;
    welcomeContext = { kind: 'newsletter' };
  } else if (
    source &&
    typeof source === 'object' &&
    typeof (source as { lead_magnet?: unknown }).lead_magnet === 'string'
  ) {
    const slug = (source as { lead_magnet: string }).lead_magnet;
    if (slug.length > MAX_SLUG_LEN || !/^[a-z0-9-]+$/.test(slug)) {
      return bad('Invalid lead magnet slug.');
    }
    const magnet = LEAD_MAGNETS[slug];
    if (!magnet) return bad('Unknown lead magnet.');
    normalizedSource = `lead-magnet:${slug}`;
    welcomeContext = {
      kind: 'lead-magnet',
      slug,
      // Strip trailing period from the accent — gives a clean subject line.
      title: magnet.accent.replace(/\.$/, ''),
    };
  } else {
    return bad('Missing source.');
  }

  const normalizedEmail = email.trim().toLowerCase();
  const receivedAt = new Date().toISOString();

  // 1) Upsert into Supabase. Idempotent on (email, brand) — repeat
  //    submissions just update source/subscribed_at.
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase
      .from('subscribers')
      .upsert(
        {
          email: normalizedEmail,
          brand,
          source: normalizedSource,
          subscribed_at: receivedAt,
        },
        { onConflict: 'email,brand' },
      );
    if (error) {
      // Don't break the visitor flow — log loudly, return 200 anyway.
      console.error('[subscribe] supabase upsert failed', {
        email: normalizedEmail,
        brand,
        source: normalizedSource,
        error: error.message,
      });
    } else {
      console.log('[subscribe] supabase upsert ok', { email: normalizedEmail, brand, source: normalizedSource });
    }
  } else {
    console.log('[subscribe] no supabase configured, skipped upsert', {
      email: normalizedEmail,
      brand,
      source: normalizedSource,
      received_at: receivedAt,
    });
  }

  // 2) Fire the welcome email. Independent of Supabase outcome — even if
  //    the row write failed, the visitor should still get the email.
  const emailResult = await sendWelcomeEmail({
    to: normalizedEmail,
    source: welcomeContext,
  });
  if (!emailResult.ok) {
    if (emailResult.reason === 'no-key') {
      console.log('[subscribe] no resend configured, skipped welcome email');
    } else {
      console.error('[subscribe] resend send failed', { reason: emailResult.reason });
    }
  } else {
    console.log('[subscribe] welcome email sent', { id: emailResult.id });
  }

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
