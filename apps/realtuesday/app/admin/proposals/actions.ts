'use server';

import { revalidatePath } from 'next/cache';
import { getAdminIdentity } from '@/lib/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase';

/** Parse a dollars string into whole cents, or null when blank. Returns
 *  undefined when the input is not a usable number so the caller can reject. */
function parsePriceToCents(raw: string): number | null | undefined {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const cleaned = trimmed.replace(/[$,\s]/g, '');
  const dollars = Number(cleaned);
  if (!Number.isFinite(dollars) || dollars < 0) return undefined;
  return Math.round(dollars * 100);
}

/** Add a proposal template. Lands at the bottom of the list. */
export async function addProposalTemplate(formData: FormData): Promise<void> {
  const name = String(formData.get('name') ?? '').trim();
  const title = String(formData.get('title') ?? '').trim();
  if (!name || !title) return;

  const summary = String(formData.get('summary') ?? '').trim();
  const priceNote = String(formData.get('price_note') ?? '').trim();
  const body = String(formData.get('body') ?? '');
  const price = parsePriceToCents(String(formData.get('price') ?? ''));
  if (price === undefined) return;

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  const { data: last } = await admin
    .from('proposal_templates')
    .select('position')
    .order('position', { ascending: false })
    .limit(1)
    .maybeSingle();
  const position = (last?.position ?? -1) + 1;

  await admin.from('proposal_templates').insert({
    name,
    title,
    summary: summary || null,
    body,
    amount_cents: price,
    price_note: priceNote || null,
    position,
  });
  revalidatePath('/admin/proposals');
}

/** Edit an existing template. */
export async function updateProposalTemplate(formData: FormData): Promise<void> {
  const id = String(formData.get('id') ?? '');
  const name = String(formData.get('name') ?? '').trim();
  const title = String(formData.get('title') ?? '').trim();
  if (!id || !name || !title) return;

  const summary = String(formData.get('summary') ?? '').trim();
  const priceNote = String(formData.get('price_note') ?? '').trim();
  const body = String(formData.get('body') ?? '');
  const price = parsePriceToCents(String(formData.get('price') ?? ''));
  if (price === undefined) return;

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  await admin
    .from('proposal_templates')
    .update({
      name,
      title,
      summary: summary || null,
      body,
      amount_cents: price,
      price_note: priceNote || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);
  revalidatePath('/admin/proposals');
}

/** Duplicate a template so you can spin a variant without retyping the body. */
export async function duplicateProposalTemplate(formData: FormData): Promise<void> {
  const id = String(formData.get('id') ?? '');
  if (!id) return;

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  const { data: source } = await admin
    .from('proposal_templates')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (!source) return;

  // Name is unique, so append a suffix and avoid collisions.
  let candidate = `${source.name} copy`;
  for (let n = 2; ; n += 1) {
    const { data: clash } = await admin
      .from('proposal_templates')
      .select('id')
      .eq('name', candidate)
      .maybeSingle();
    if (!clash) break;
    candidate = `${source.name} copy ${n}`;
  }

  const { data: last } = await admin
    .from('proposal_templates')
    .select('position')
    .order('position', { ascending: false })
    .limit(1)
    .maybeSingle();

  await admin.from('proposal_templates').insert({
    name: candidate,
    title: source.title,
    summary: source.summary,
    body: source.body,
    amount_cents: source.amount_cents,
    price_note: source.price_note,
    position: (last?.position ?? -1) + 1,
  });
  revalidatePath('/admin/proposals');
}

/** Remove a template. */
export async function deleteProposalTemplate(formData: FormData): Promise<void> {
  const id = String(formData.get('id') ?? '');
  if (!id) return;

  const me = await getAdminIdentity();
  if (!me) return;

  const admin = getSupabaseAdmin();
  await admin.from('proposal_templates').delete().eq('id', id);
  revalidatePath('/admin/proposals');
}
