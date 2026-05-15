/**
 * Lead-magnet definitions. Each one becomes a /free/[slug] landing page.
 * MVP is hard-coded; will move to Supabase later when there are >3 of them
 * and the dashboard is generating the actual PDFs.
 *
 * Copy is in-voice-but-placeholder until Natalie locks the real value-prop
 * for each magnet — flagged with TODO so we don't ship faux promises.
 */

export interface LeadMagnet {
  slug: string;
  /** Caveat eyebrow above the title. */
  eyebrow: string;
  /** DM Serif italic page title — last word goes into `accent` for foil. */
  title: string;
  accent: string;
  /** Fraunces italic intro paragraph below the title. */
  intro: string;
  /** Bullet points — what's actually in the PDF. */
  inside: string[];
  /** Submit button label. */
  submitLabel: string;
  /** Tiny line under the form (mono, blush). */
  microcopy: string;
}

export const LEAD_MAGNETS: Record<string, LeadMagnet> = {
  'sunday-reset': {
    slug: 'sunday-reset',
    eyebrow: 'free for you',
    title: 'Get the',
    accent: 'Sunday Reset.',
    intro:
      'A one-pager I made for myself. Plan the whole week in 15 minutes — no app, no system, no learning curve. Just print it, fill it, run your week.',
    inside: [
      'The 4-square layout that catches everything (kids, work, you, the house)',
      'My exact Sunday-night ritual (15 minutes, max)',
      'A printable version you can stick on the fridge',
    ],
    submitLabel: 'Send it over',
    microcopy: 'No spam. One email a week, max. Unsubscribe in one click.',
  },
};
