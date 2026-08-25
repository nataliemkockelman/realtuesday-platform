'use server';

import { revalidatePath } from 'next/cache';
import { getAdminIdentity } from '@/lib/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase';
import { ROADMAP_STATUSES } from '@/lib/collab-data';
import type { RoadmapStatus } from '@/lib/database.types';

/** Add a note to the shared brainstorm wall, stamped with the author + color. */
export async function addNote(formData: FormData): Promise<void> {
  const body = String(formData.get('body') ?? '').trim();
  if (!body) return;

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  await admin.from('brainstorm_notes').insert({
    body,
    author_user_id: me.userId,
    author_name: me.name,
    color: me.color,
  });
  revalidatePath('/admin/brainstorm');
}

/** Remove a note from the wall. Anyone on the team can tidy the board. */
export async function deleteNote(formData: FormData): Promise<void> {
  const id = String(formData.get('id') ?? '');
  if (!id) return;

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  await admin.from('brainstorm_notes').delete().eq('id', id);
  revalidatePath('/admin/brainstorm');
}

/** Add an item to the roadmap. */
export async function addRoadmapItem(formData: FormData): Promise<void> {
  const title = String(formData.get('title') ?? '').trim();
  if (!title) return;

  const detailRaw = String(formData.get('detail') ?? '').trim();
  const statusRaw = String(formData.get('status') ?? 'next');
  const status: RoadmapStatus = ROADMAP_STATUSES.includes(statusRaw as RoadmapStatus)
    ? (statusRaw as RoadmapStatus)
    : 'next';

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  await admin.from('roadmap_items').insert({
    title,
    detail: detailRaw || null,
    status,
    author_name: me.name,
  });
  revalidatePath('/admin/brainstorm');
}

/** Move a roadmap item into a different column. */
export async function updateRoadmapStatus(formData: FormData): Promise<void> {
  const id = String(formData.get('id') ?? '');
  const statusRaw = String(formData.get('status') ?? '');
  if (!id || !ROADMAP_STATUSES.includes(statusRaw as RoadmapStatus)) return;

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  await admin
    .from('roadmap_items')
    .update({ status: statusRaw as RoadmapStatus, updated_at: new Date().toISOString() })
    .eq('id', id);
  revalidatePath('/admin/brainstorm');
}

/** Move a roadmap item into a different column by id (used by drag-and-drop,
 *  which passes typed args instead of a form). No-op if the status is unknown. */
export async function moveRoadmapItem(id: string, statusRaw: string): Promise<void> {
  if (!id || !ROADMAP_STATUSES.includes(statusRaw as RoadmapStatus)) return;

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  await admin
    .from('roadmap_items')
    .update({ status: statusRaw as RoadmapStatus, updated_at: new Date().toISOString() })
    .eq('id', id);
  revalidatePath('/admin/brainstorm');
}

/** Delete a roadmap item. */
export async function deleteRoadmapItem(formData: FormData): Promise<void> {
  const id = String(formData.get('id') ?? '');
  if (!id) return;

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  await admin.from('roadmap_items').delete().eq('id', id);
  revalidatePath('/admin/brainstorm');
}
