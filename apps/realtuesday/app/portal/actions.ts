'use server';

import { redirect } from 'next/navigation';
import { createPortalServerClient } from '@/lib/supabase-portal';
import { getSupabaseAdmin } from '@/lib/supabase';

export interface FormResult {
  ok: boolean;
  error?: string;
}

/** Log in with email + password. Sets the session cookie, then redirects. */
export async function signIn(_prev: FormResult, formData: FormData): Promise<FormResult> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    return { ok: false, error: 'Enter your email and password.' };
  }

  const supabase = createPortalServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { ok: false, error: 'That email and password did not match.' };
  }

  redirect('/portal');
}

/** Sign out and return to the login screen. */
export async function signOut(): Promise<void> {
  const supabase = createPortalServerClient();
  await supabase.auth.signOut();
  redirect('/portal/login');
}

/**
 * Accept an invite: validate the one-time token, create the client's auth
 * account, link it to their client record, mark the invite used, then sign
 * them in. Uses the service_role client for the privileged writes; the token
 * is the capability that authorizes them.
 */
export async function acceptInvite(_prev: FormResult, formData: FormData): Promise<FormResult> {
  const token = String(formData.get('token') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const confirm = String(formData.get('confirm') ?? '');

  if (!token) return { ok: false, error: 'This invite link is missing its code.' };
  if (password.length < 8) {
    return { ok: false, error: 'Pick a password of at least 8 characters.' };
  }
  if (password !== confirm) {
    return { ok: false, error: 'The two passwords do not match.' };
  }

  const admin = getSupabaseAdmin();

  // Validate the invite: must exist, be pending, and not expired.
  const { data: invite } = await admin
    .from('portal_invites')
    .select('id, client_id, email, status, expires_at')
    .eq('token', token)
    .maybeSingle();

  if (!invite || invite.status !== 'pending') {
    return { ok: false, error: 'This invite is no longer valid. Ask for a new one.' };
  }
  if (new Date(invite.expires_at).getTime() < Date.now()) {
    return { ok: false, error: 'This invite has expired. Ask for a new one.' };
  }

  const email = invite.email.trim().toLowerCase();

  // Create the auth account, pre-confirmed so no email round-trip is needed.
  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (createErr || !created?.user) {
    // Most likely the address is already registered.
    return {
      ok: false,
      error: 'An account for this email already exists. Try logging in instead.',
    };
  }

  // Link the new user to their client, then burn the invite.
  const { error: linkErr } = await admin
    .from('portal_users')
    .insert({ user_id: created.user.id, client_id: invite.client_id });

  if (linkErr) {
    return { ok: false, error: 'Something went wrong setting up access. Please try again.' };
  }

  await admin
    .from('portal_invites')
    .update({ status: 'accepted', accepted_at: new Date().toISOString() })
    .eq('id', invite.id);

  // Sign them in and drop them on their dashboard.
  const supabase = createPortalServerClient();
  const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
  if (signInErr) {
    // Account exists now; send them to log in manually.
    redirect('/portal/login');
  }

  redirect('/portal');
}
