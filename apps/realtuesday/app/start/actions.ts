'use server';

import { Resend } from 'resend';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { BUDGET_OPTIONS } from '@/lib/intake';

/**
 * Website-intake server action for the public /start form.
 *
 * On a valid submission it does three things, each best-effort so one failure
 * never loses the lead:
 *   1. Opens a lead in `clients` (status 'lead').
 *   2. Stores the full answers in `intake_submissions`, linked to that lead.
 *   3. Emails the studio via Resend so a new intake is noticed immediately.
 *
 * If Supabase is not configured yet, it still emails. If neither the write nor
 * the email succeeds, it returns an error asking the visitor to email directly.
 *
 * Field names must stay in sync with intake-form.tsx.
 *
 * Env vars (Vercel -> Project -> Settings -> Environment Variables):
 *   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY  for the writes.
 *   RESEND_API_KEY   required for the notification email.
 *   INTAKE_TO / CONTACT_TO   where the notice lands (defaults hi@arealtuesday.com).
 *   CONTACT_FROM     verified Resend sender (default real Tuesday <hi@arealtuesday.com>).
 */

export type IntakeState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitIntake(
  _prev: IntakeState,
  formData: FormData,
): Promise<IntakeState> {
  // Honeypot: real people never fill "fax". Silently succeed so bots get no signal.
  if (formData.get('fax')?.toString().trim()) {
    return { status: 'success', message: "Thanks. We'll be in touch personally." };
  }

  const get = (k: string) => formData.get(k)?.toString().trim() ?? '';

  const contactName = get('contact_name');
  const email = get('email');
  const company = get('company');
  const phone = get('phone');
  const businessType = get('business_type');
  const primaryGoal = get('primary_goal');
  const currentSite = get('current_site');
  const domainStatus = get('domain_status');
  const budgetRange = get('budget_range');
  const timeline = get('timeline');
  const beyondWebsite = get('beyond_website');
  const message = get('message');

  // Required: enough to actually follow up and scope.
  if (!contactName || !email || !businessType || !primaryGoal || !budgetRange) {
    return {
      status: 'error',
      message: 'Please fill in the required fields (marked with *) before sending.',
    };
  }
  if (!isEmail(email)) {
    return { status: 'error', message: 'That email address looks off. Mind checking it?' };
  }
  if (!(BUDGET_OPTIONS as readonly string[]).includes(budgetRange)) {
    return { status: 'error', message: 'Please pick a budget range from the list.' };
  }

  let stored = false;
  let emailed = false;

  // 1 + 2: open a lead, then store the submission linked to it.
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();

      const { data: lead, error: leadError } = await supabase
        .from('clients')
        .insert({
          name: contactName,
          company: company || null,
          email: email || null,
          status: 'lead',
          notes: `Website intake via /start. Goal: ${primaryGoal || 'n/a'}. Budget: ${budgetRange}.`,
        })
        .select('id')
        .single();

      if (leadError) {
        console.error('[realtuesday/start] clients insert error:', leadError);
      }

      const { error: intakeError } = await supabase.from('intake_submissions').insert({
        contact_name: contactName,
        email,
        company: company || null,
        phone: phone || null,
        business_type: businessType || null,
        primary_goal: primaryGoal || null,
        current_site: currentSite || null,
        domain_status: domainStatus || null,
        budget_range: budgetRange || null,
        timeline: timeline || null,
        beyond_website: beyondWebsite || null,
        message: message || null,
        client_id: lead?.id ?? null,
      });

      if (intakeError) {
        console.error('[realtuesday/start] intake insert error:', intakeError);
      } else {
        stored = true;
      }
    } catch (err) {
      console.error('[realtuesday/start] Supabase write failed:', err);
    }
  }

  // 3: notify the studio.
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const to = process.env.INTAKE_TO ?? process.env.CONTACT_TO ?? 'hi@arealtuesday.com';
    const from = process.env.CONTACT_FROM ?? 'real Tuesday <hi@arealtuesday.com>';
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `New website intake from ${contactName}${company ? ` (${company})` : ''}`,
        text: [
          `Name:     ${contactName}`,
          `Email:    ${email}`,
          `Company:  ${company || '-'}`,
          `Phone:    ${phone || '-'}`,
          '',
          `Business:      ${businessType || '-'}`,
          `Primary goal:  ${primaryGoal || '-'}`,
          `Current site:  ${currentSite || '-'}`,
          `Domain:        ${domainStatus || '-'}`,
          `Budget:        ${budgetRange}`,
          `Timeline:      ${timeline || '-'}`,
          '',
          `Beyond the website: ${beyondWebsite || '-'}`,
          '',
          `Anything else: ${message || '-'}`,
          '',
          stored ? 'Saved to /admin/intake and opened a lead.' : 'NOTE: not saved to the database.',
        ].join('\n'),
      });
      if (error) {
        console.error('[realtuesday/start] Resend error:', error);
      } else {
        emailed = true;
      }
    } catch (err) {
      console.error('[realtuesday/start] Resend send failed:', err);
    }
  }

  if (!stored && !emailed) {
    return {
      status: 'error',
      message:
        "Something went wrong on our end. Email us directly at hi@arealtuesday.com and we'll pick it up.",
    };
  }

  return {
    status: 'success',
    message: "Got it. We've got your details and one of us will reply personally, usually within a day or two.",
  };
}
