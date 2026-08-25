'use server';

import { revalidatePath } from 'next/cache';
import { getAdminIdentity } from '@/lib/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase';

/** Parse a dollars string ("1,250" or "$1250.00" or "") into whole cents, or
 *  null when blank. Returns undefined when the input is not a usable number so
 *  the caller can reject the edit. */
function parsePriceToCents(raw: string): number | null | undefined {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const cleaned = trimmed.replace(/[$,\s]/g, '');
  const dollars = Number(cleaned);
  if (!Number.isFinite(dollars) || dollars < 0) return undefined;
  return Math.round(dollars * 100);
}

/** Add an offering. Starts as a draft (unpublished) at the bottom of the list,
 *  so nothing goes public until the admin flips its publish toggle. */
export async function addOffering(formData: FormData): Promise<void> {
  const name = String(formData.get('name') ?? '').trim();
  if (!name) return;

  const summary = String(formData.get('summary') ?? '').trim();
  const priceNote = String(formData.get('price_note') ?? '').trim();
  const price = parsePriceToCents(String(formData.get('price') ?? ''));
  if (price === undefined) return;

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  // Place new offerings after the current last one.
  const { data: last } = await admin
    .from('offerings')
    .select('position')
    .order('position', { ascending: false })
    .limit(1)
    .maybeSingle();
  const position = (last?.position ?? -1) + 1;

  await admin.from('offerings').insert({
    name,
    summary: summary || null,
    price_cents: price,
    price_note: priceNote || null,
    published: false,
    position,
  });
  revalidatePath('/admin/offerings');
  revalidatePath('/offerings');
}

/** Edit an existing offering's name, summary, price, and qualifier. */
export async function updateOffering(formData: FormData): Promise<void> {
  const id = String(formData.get('id') ?? '');
  const name = String(formData.get('name') ?? '').trim();
  if (!id || !name) return;

  const summary = String(formData.get('summary') ?? '').trim();
  const priceNote = String(formData.get('price_note') ?? '').trim();
  const price = parsePriceToCents(String(formData.get('price') ?? ''));
  if (price === undefined) return;

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  await admin
    .from('offerings')
    .update({
      name,
      summary: summary || null,
      price_cents: price,
      price_note: priceNote || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);
  revalidatePath('/admin/offerings');
  revalidatePath('/offerings');
}

/** Flip an offering between published and draft. Publishing is what makes it
 *  appear on the public /offerings page. */
export async function setOfferingPublished(id: string, published: boolean): Promise<void> {
  if (!id) return;

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  await admin
    .from('offerings')
    .update({ published, updated_at: new Date().toISOString() })
    .eq('id', id);
  revalidatePath('/admin/offerings');
  revalidatePath('/offerings');
}

/** Nudge an offering up or down in the ordered list by swapping positions with
 *  its neighbour. The public page renders in this same order. */
export async function reorderOffering(id: string, direction: 'up' | 'down'): Promise<void> {
  if (!id) return;

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  const { data: all } = await admin
    .from('offerings')
    .select('id, position')
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });
  if (!all) return;

  const index = all.findIndex((o) => o.id === id);
  if (index === -1) return;
  const swapWith = direction === 'up' ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= all.length) return;

  const a = all[index];
  const b = all[swapWith];
  // Swap their stored positions. If two rows share a position (e.g. all zero
  // from before ordering mattered), fall back to index-based values.
  const posA = a.position === b.position ? index : a.position;
  const posB = a.position === b.position ? swapWith : b.position;

  await Promise.all([
    admin.from('offerings').update({ position: posB }).eq('id', a.id),
    admin.from('offerings').update({ position: posA }).eq('id', b.id),
  ]);
  revalidatePath('/admin/offerings');
  revalidatePath('/offerings');
}

/** Remove an offering entirely. */
export async function deleteOffering(formData: FormData): Promise<void> {
  const id = String(formData.get('id') ?? '');
  if (!id) return;

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  await admin.from('offerings').delete().eq('id', id);
  revalidatePath('/admin/offerings');
  revalidatePath('/offerings');
}
