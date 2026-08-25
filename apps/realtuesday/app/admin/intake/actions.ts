'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseAdmin } from '@/lib/supabase';
import { INTAKE_STATUSES } from '@/lib/intake';
import type { IntakeStatus } from '@/lib/database.types';

/**
 * Server Action: move an intake submission through triage. Runs only behind the
 * /admin gate. Posted from a plain form (select + button) on the review page,
 * so it takes FormData directly and returns void; the list re-renders via
 * revalidatePath.
 */
export async function setIntakeStatus(formData: FormData): Promise<void> {
  const id = String(formData.get('id') ?? '').trim();
  const statusRaw = String(formData.get('status') ?? '').trim();
  if (!id) return;

  if (!(INTAKE_STATUSES as string[]).includes(statusRaw)) return;
  const status = statusRaw as IntakeStatus;

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('intake_submissions')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('[realtuesday/admin/intake] status update error:', error);
    return;
  }

  revalidatePath('/admin/intake');
}
