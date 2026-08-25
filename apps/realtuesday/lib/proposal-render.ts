/**
 * Client-safe helpers for turning a proposal template into a filled document:
 * substituting the {{client}} / {{company}} / {{date}} / {{price}} placeholders
 * with the values entered when drafting for a specific client.
 *
 * No 'server-only' guard on purpose — the draft form (a client component) reuses
 * the same placeholder list and default-date logic the print view uses.
 */

export type ProposalValues = {
  client: string;
  company: string;
  date: string;
  price: string;
};

/** Escape the characters that would otherwise be read as HTML once the filled
 *  Markdown is parsed. The entered values are the admin's own, but a stray "<"
 *  in a company name should print as text, not open a tag. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Replace every placeholder in `text` with its value. Blank values collapse to
 *  a neutral em-space so the layout does not leave a literal "{{price}}" in the
 *  document. */
export function fillPlaceholders(text: string, values: ProposalValues): string {
  const map: Record<string, string> = {
    client: values.client.trim() || 'the client',
    company: values.company.trim() || 'your company',
    date: values.date.trim(),
    price: values.price.trim() || 'To be scoped',
  };
  return text.replace(/\{\{\s*(client|company|date|price)\s*\}\}/g, (_, key: string) =>
    escapeHtml(map[key] ?? ''),
  );
}

/** Same substitution as fillPlaceholders but WITHOUT HTML-escaping, for values
 *  rendered as React text nodes (the title, the meta block) where React already
 *  escapes on output. */
export function fillPlaceholdersText(text: string, values: ProposalValues): string {
  const map: Record<string, string> = {
    client: values.client.trim() || 'the client',
    company: values.company.trim() || 'your company',
    date: values.date.trim(),
    price: values.price.trim() || 'To be scoped',
  };
  return text.replace(/\{\{\s*(client|company|date|price)\s*\}\}/g, (_, key: string) =>
    map[key] ?? '',
  );
}

/** Today's date in the studio's timezone, formatted "July 30, 2026". Used as
 *  the default on the draft form. */
export function todayInStudioTz(): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());
}
