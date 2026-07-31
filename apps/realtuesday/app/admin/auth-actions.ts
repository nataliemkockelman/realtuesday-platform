'use server';

import { redirect } from 'next/navigation';
import { createAdminSessionClient } from '@/lib/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase';

export interface FormResult {
  ok: boolean;
  error?: string;
}

/**
 * Log a teammate in with email + password, then confirm they are on the
 * `admin_users` allowlist before letting them into /admin. A valid Supabase
 * session that is NOT on the allowlist (e.g. a portal client) is signed back
 * out so it cannot linger.
 */
export async function signIn(_prev: FormResult, formData: FormData): Promise<FormResult> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    return { ok: false, error: 'Enter your email and password.' };
  }

  const supabase = createAdminSessionClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    return { ok: false, error: 'That email and password did not match.' };
  }

  // Gate on the allowlist. Use the service-role client so the check is not
  // itself dependent on the just-set session cookie being readable yet.
  const admin = getSupabaseAdmin();
  const { data: member } = await admin
    .from('admin_users')
    .select('user_id')
    .eq('user_id', data.user.id)
    .maybeSingle();

  if (!member) {
    await supabase.auth.signOut();
    return { ok: false, error: 'This account does not have admin access.' };
  }

  redirect('/admin');
}

/** Sign out and return to the admin login screen. */
export async function signOut(): Promise<void> {
  const supabase = createAdminSessionClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

/**
 * Accept an admin invite: validate the one-time token, create the teammate's
 * auth account, add them to the `admin_users` allowlist (carrying their name
 * and accent color from the invite), mark the invite used, then sign them in.
 * The token is the capability that authorizes these privileged writes.
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

  const { data: invite } = await admin
    .from('admin_invites')
    .select('id, email, name, color, status, expires_at')
    .eq('token', token)
    .maybeSingle();

  if (!invite || invite.status !== 'pending') {
    return { ok: false, error: 'This invite is no longer valid. Ask for a new one.' };
  }
  if (new Date(invite.expires_at).getTime() < Date.now()) {
    return { ok: false, error: 'This invite has expired. Ask for a new one.' };
  }

  const email = invite.email.trim().toLowerCase();

  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (createErr || !created?.user) {
    return {
      ok: false,
      error: 'An account for this email already exists. Try logging in instead.',
    };
  }

  const { error: linkErr } = await admin.from('admin_users').insert({
    user_id: created.user.id,
    name: invite.name,
    email,
    color: invite.color,
  });

  if (linkErr) {
    return { ok: false, error: 'Something went wrong setting up access. Please try again.' };
  }

  await admin
    .from('admin_invites')
    .update({ status: 'accepted', accepted_at: new Date().toISOString() })
    .eq('id', invite.id);

  const supabase = createAdminSessionClient();
  const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
  if (signInErr) {
    redirect('/admin/login');
  }

  redirect('/admin');
}
