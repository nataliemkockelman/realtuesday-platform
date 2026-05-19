'use client';

import { useState } from 'react';

/**
 * Contact / "what should I build next" form.
 *
 * For MVP this assembles a mailto: link with the visitor's email + suggestion
 * pre-filled and opens it in their email client. Zero backend dependency — works
 * the moment the page is live. When the /api/contact route + Resend wiring is
 * ready, swap the onSubmit body for a fetch('/api/contact', ...) POST.
 *
 * Why mailto over a generic Formspree: the mailto preserves the relationship
 * (email lands from the visitor, in their drafts, on their account) so Natalie
 * can reply to them directly and they have a copy of what they sent.
 */
const RECIPIENT = 'hello@themomload.com';

export function ContactForm() {
  const [email, setEmail] = useState('');
  const [idea, setIdea] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !idea) return;

    const subject = encodeURIComponent('What I want to see next on the Motherload');
    const body = encodeURIComponent(
      `What I'd use:\n\n${idea}\n\n— sent from themomload.com/contact\n${email}\n`,
    );
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-prose space-y-4">
      <label className="block">
        <span className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-mono-label text-navy/70">
          Your email
        </span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-md border border-navy/20 bg-white px-4 py-3 font-serif text-[16px] italic text-navy placeholder:text-navy/35 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-mono-label text-navy/70">
          What do you want to see?
        </span>
        <textarea
          required
          rows={5}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="The thing I keep MacGyvering for myself is..."
          className="w-full rounded-md border border-navy/20 bg-white px-4 py-3 font-serif text-[16px] italic leading-relaxed text-navy placeholder:text-navy/35 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30"
        />
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-coral px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
        >
          Send it
          <span aria-hidden="true">&rarr;</span>
        </button>
        {sent && (
          <p
            className="font-script text-[20px] font-semibold text-coral"
            style={{ transform: 'rotate(-1deg)' }}
          >
            check your email client &mdash;
          </p>
        )}
      </div>
    </form>
  );
}
