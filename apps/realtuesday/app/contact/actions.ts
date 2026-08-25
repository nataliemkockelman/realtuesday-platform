'use server';

import { Resend } from 'resend';

/**
 * Contact form server action.
 *
 * Sends the submission as a transactional email via Resend, then returns a
 * serializable state object the client form uses to render a success or error
 * message. Field names must stay in sync with contact-form.tsx.
 *
 * Env vars (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY   required. From resend.com/api-keys.
 *   CONTACT_TO       where submissions land. Defaults to hi@arealtuesday.com.
 *   CONTACT_FROM     verified sender on your Resend domain. Defaults to
 *                    "real Tuesday <hi@arealtuesday.com>". The domain must be
 *                    verified in Resend (resend.com/domains) or sends will fail.
 *
 * Spam handling: a hidden "company" honeypot field. Real people never fill it;
 * bots that fill every field do. If it has a value we silently succeed without
 * sending, so the bot gets no signal that it was caught.
 */

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const TOPICS = new Set(['audit', 'build', 'fractional', 'unsure']);

function isEmail(value: string): boolean {
  // Deliberately permissive: one @, a dot in the domain, no whitespace.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: if filled, treat as spam and no-op with a success response.
  if (formData.get('company')?.toString().trim()) {
    return { status: 'success', message: "Thanks. We'll be in touch personally." };
  }

  const name = formData.get('name')?.toString().trim() ?? '';
  const email = formData.get('email')?.toString().trim() ?? '';
  const topic = formData.get('topic')?.toString().trim() ?? '';
  const message = formData.get('message')?.toString().trim() ?? '';

  if (!name || !email || !topic || !message) {
    return { status: 'error', message: 'Please fill in every field before sending.' };
  }
  if (!isEmail(email)) {
    return { status: 'error', message: 'That email address looks off. Mind checking it?' };
  }
  if (!TOPICS.has(topic)) {
    return { status: 'error', message: 'Please pick a topic from the list.' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[realtuesday/contact] RESEND_API_KEY is not set; cannot send.');
    return {
      status: 'error',
      message: "Something went wrong on our end. Email us directly at hi@arealtuesday.com.",
    };
  }

  const to = process.env.CONTACT_TO ?? 'hi@arealtuesday.com';
  const from = process.env.CONTACT_FROM ?? 'real Tuesday <hi@arealtuesday.com>';

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New inquiry (${topic}) from ${name}`,
      text: [
        `Name:  ${name}`,
        `Email: ${email}`,
        `Topic: ${topic}`,
        '',
        message,
      ].join('\n'),
    });

    if (error) {
      console.error('[realtuesday/contact] Resend error:', error);
      return {
        status: 'error',
        message: "Something went wrong sending that. Email us directly at hi@arealtuesday.com.",
      };
    }
  } catch (err) {
    console.error('[realtuesday/contact] Unexpected send failure:', err);
    return {
      status: 'error',
      message: "Something went wrong sending that. Email us directly at hi@arealtuesday.com.",
    };
  }

  return {
    status: 'success',
    message: "Got it. We'll reply personally, usually within a day or two.",
  };
}
