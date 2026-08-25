'use server';

import { revalidatePath } from 'next/cache';
import { getAdminIdentity } from '@/lib/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase';
import { HITLIST_STATUSES } from '@/lib/hitlist';
import type { HitlistStatus } from '@/lib/database.types';

/** Add a prospect to the hitlist: who they are, optional company/link/angle,
 *  and which stage they start in (defaults to "to reach"). */
export async function addProspect(formData: FormData): Promise<void> {
  const name = String(formData.get('name') ?? '').trim();
  if (!name) return;

  const company = String(formData.get('company') ?? '').trim();
  const link = String(formData.get('link') ?? '').trim();
  const note = String(formData.get('note') ?? '').trim();
  const statusRaw = String(formData.get('status') ?? 'to_reach');
  const status: HitlistStatus = HITLIST_STATUSES.includes(statusRaw as HitlistStatus)
    ? (statusRaw as HitlistStatus)
    : 'to_reach';

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  await admin.from('hitlist_prospects').insert({
    name,
    company: company || null,
    link: link || null,
    note: note || null,
    status,
    author_name: me.name,
  });
  revalidatePath('/admin/hitlist');
}

/** Move a prospect into a different stage by id (used by drag-and-drop and the
 *  per-card dropdown). No-op if the stage is unknown. */
export async function moveProspect(id: string, statusRaw: string): Promise<void> {
  if (!id || !HITLIST_STATUSES.includes(statusRaw as HitlistStatus)) return;

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  await admin
    .from('hitlist_prospects')
    .update({ status: statusRaw as HitlistStatus, updated_at: new Date().toISOString() })
    .eq('id', id);
  revalidatePath('/admin/hitlist');
}

/** Remove a prospect from the hitlist. */
export async function deleteProspect(formData: FormData): Promise<void> {
  const id = String(formData.get('id') ?? '');
  if (!id) return;

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  await admin.from('hitlist_prospects').delete().eq('id', id);
  revalidatePath('/admin/hitlist');
}
