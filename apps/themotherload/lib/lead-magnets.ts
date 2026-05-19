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
  // The Sunday Reset is NOT a freebie. It's a forthcoming paid bundle that
  // hasn't been built yet, so it doesn't get a /free/* route. When the
  // bundle ships, give it a /products/sunday-reset landing page alongside
  // the other paid products — do not bring it back here.
  // Registered so /api/subscribe accepts `{ lead_magnet: 'setup-guide' }`.
  // The /free/setup-guide route is a hand-built static page (not rendered by
  // /free/[slug]), so most fields here are only used by the welcome-email
  // logic. `accent` becomes the welcome-email subject line.
  'setup-guide': {
    slug: 'setup-guide',
    eyebrow: 'free \u00b7 start here',
    title: 'Claude,',
    accent: 'Meet Your Family.',
    intro:
      'Set up Claude to know your family in about 20 minutes. Then it stops making you re-explain your life.',
    inside: [
      'The 10-minute Claude account setup — what to install, what to skip',
      'The Family Context Doc template — fill-in-the-blank, no blank page',
      'The 5 test prompts that prove it worked (or tell you what to fix)',
      'Where to save it so it actually gets used every week',
    ],
    submitLabel: 'Send me the setup guide',
    microcopy: 'No spam. Unsubscribe anytime.',
  },
};
