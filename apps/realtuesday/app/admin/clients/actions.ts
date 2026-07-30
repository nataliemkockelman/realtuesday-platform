'use server';

import { randomBytes } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { getSupabaseAdmin } from '@/lib/supabase';
import type { ClientStatus } from '@/lib/database.types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arealtuesday.com';

const VALID_STATUSES: ClientStatus[] = ['lead', 'qualified', 'active', 'dormant', 'lost'];

export interface CreateClientResult {
  ok: boolean;
  error?: string;
}

/**
 * Server Action: create a client from the add-client form. Runs only behind
 * the /admin gate. Validates input, writes through the service-role client,
 * and revalidates the pages whose counts depend on it.
 */
export async function createClient(
  _prev: CreateClientResult,
  formData: FormData,
): Promise<CreateClientResult> {
  const name = String(formData.get('name') ?? '').trim();
  const company = String(formData.get('company') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const statusRaw = String(formData.get('status') ?? 'lead').trim();

  if (!name) {
    return { ok: false, error: 'A name is required.' };
  }
  const status: ClientStatus = (VALID_STATUSES as string[]).includes(statusRaw)
    ? (statusRaw as ClientStatus)
    : 'lead';

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('clients').insert({
    name,
    company: company || null,
    email: email || null,
    status,
  });

  if (error) {
    return { ok: false, error: 'Could not save. Please try again.' };
  }

  revalidatePath('/admin/clients');
  revalidatePath('/admin');
  return { ok: true };
}

export interface InviteResult {
  ok: boolean;
  url?: string;
  error?: string;
}

/**
 * Server Action: mint a one-time portal invite for a client and return the
 * shareable accept link. The admin copies this link and sends it to the client
 * however they like (email, message). No SMTP required. Runs behind /admin.
 */
export async function createInvite(
  _prev: InviteResult,
  formData: FormData,
): Promise<InviteResult> {
  const clientId = String(formData.get('clientId') ?? '').trim();
  if (!clientId) return { ok: false, error: 'Missing client.' };

  const supabase = getSupabaseAdmin();

  // The invite is addressed to the client's email on file.
  const { data: client } = await supabase
    .from('clients')
    .select('email')
    .eq('id', clientId)
    .maybeSingle();

  const email = client?.email?.trim().toLowerCase();
  if (!email) {
    return { ok: false, error: 'Add an email to this client first, then invite.' };
  }

  // 32 bytes of randomness, url-safe. This token is the capability.
  const token = randomBytes(32).toString('base64url');

  const { error } = await supabase.from('portal_invites').insert({
    client_id: clientId,
    email,
    token,
  });

  if (error) {
    return { ok: false, error: 'Could not create the invite. Please try again.' };
  }

  return { ok: true, url: `${SITE_URL}/portal/accept?token=${token}` };
}
