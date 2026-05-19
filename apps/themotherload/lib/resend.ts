import { Resend } from 'resend';

/**
 * Resend client for transactional email (lead-magnet delivery + Sunday Reset
 * weekly note). Returns null when RESEND_API_KEY is missing so callers can
 * gracefully fall back.
 *
 * The "from" address must be on a domain you've verified in Resend. Until
 * Natalie verifies themomload.com, we use Resend's onboarding sender so the
 * email at least lands; once the domain is verified, swap FROM_EMAIL.
 */

let cachedClient: Resend | null = null;

export function getResend(): Resend | null {
  if (cachedClient) return cachedClient;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  cachedClient = new Resend(key);
  return cachedClient;
}

/**
 * Sender. Override via RESEND_FROM_EMAIL env var once themomload.com is
 * verified in Resend (e.g. "the Motherload <hello@themomload.com>").
 * Default uses Resend's shared onboarding sender, which works without DNS
 * verification but lands in spam more often.
 */
export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? 'the Motherload <onboarding@resend.dev>';

/**
 * Where transactional reply-to lands. Optional — leave unset and Resend
 * uses the FROM address. Set to a real inbox once Natalie has one.
 */
export const REPLY_TO = process.env.RESEND_REPLY_TO ?? undefined;

interface WelcomeEmailOpts {
  to: string;
  /** What they signed up for — drives the subject line + intro copy. */
  source:
    | { kind: 'lead-magnet'; slug: string; title: string }
    | { kind: 'newsletter' };
}

/**
 * Sends the post-signup welcome email. Plain HTML — no React Email or MJML
 * yet, since copy this short doesn't need a templating system. When we have
 * 3+ different emails, extract a shared layout component then.
 */
export async function sendWelcomeEmail(opts: WelcomeEmailOpts) {
  const resend = getResend();
  if (!resend) return { ok: false as const, reason: 'no-key' as const };

  const { subject, intro, body } = composeWelcomeEmail(opts);

  const result = await resend.emails.send({
    from: FROM_EMAIL,
    to: opts.to,
    replyTo: REPLY_TO,
    subject,
    html: renderHtml({ intro, body }),
    text: `${intro}\n\n${body}\n\n— Natalie\nthe Motherload\nthemomload.com`,
  });

  if (result.error) return { ok: false as const, reason: result.error.message };
  return { ok: true as const, id: result.data?.id };
}

function composeWelcomeEmail(opts: WelcomeEmailOpts) {
  if (opts.source.kind === 'lead-magnet') {
    return {
      subject: `${opts.source.title} — incoming`,
      intro: `Thanks for grabbing the ${opts.source.title}.`,
      body:
        'The PDF will land in this inbox shortly. ' +
        "If it doesn't show up, check your spam folder and mark it Not Spam — " +
        "everything I send goes there until your inbox learns who I am.\n\n" +
        "I'll send one note a week. No spam, no lectures. Unsubscribe anytime.",
    };
  }
  return {
    subject: 'You\u2019re on the list',
    intro: "Hi — you're in.",
    body:
      "One note from me a week. No spam, no lectures, no 'mama' anything. " +
      'If a week ever feels like too much, the unsubscribe link is at the bottom of every email.\n\n' +
      'Talk soon — Natalie',
  };
}

/**
 * Tiny HTML wrapper. Brand-light because email clients butcher CSS — keep
 * it system-font, navy-on-cream, max-width 560px, no images.
 */
function renderHtml({ intro, body }: { intro: string; body: string }) {
  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const paragraphs = body
    .split('\n\n')
    .map((p) => `<p style="margin:0 0 16px 0;">${escape(p).replace(/\n/g, '<br>')}</p>`)
    .join('');

  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:24px;background:#F6F1E8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1A2238;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;padding:32px 28px;border-radius:8px;line-height:1.55;">
    <div style="font-size:14px;letter-spacing:0.18em;text-transform:uppercase;color:#C75D4A;font-weight:600;margin-bottom:18px;">— the Motherload —</div>
    <p style="margin:0 0 16px 0;font-size:18px;font-style:italic;color:#1A2238;">${escape(intro)}</p>
    ${paragraphs}
    <p style="margin:32px 0 0 0;font-size:14px;color:#1A2238;">— Natalie</p>
    <p style="margin:4px 0 0 0;font-size:12px;color:#1A2238;opacity:0.6;">themomload.com · a Real Tuesday brand</p>
  </div>
</body>
</html>`;
}
