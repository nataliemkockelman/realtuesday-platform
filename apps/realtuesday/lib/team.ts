/**
 * Team data — the single source of truth for the two operators.
 *
 * The /about page maps over TEAM to render each bio through <PersonBio />,
 * so bios are data, not hardcoded blocks. Copy comes verbatim from
 * docs/site-copy-v2.md.
 *
 * Placeholder flags (see report to Natalie):
 *  - Last names were filled from project memory (Kockelman / Mulder); the copy
 *    doc left them as "[Last Name]". Confirm before launch.
 *  - Josh's bio is a placeholder in the doc — he writes his own. Marked with
 *    `bioIsPlaceholder` so it renders visibly flagged and can't ship by accident.
 *  - LinkedIn URLs are unknown; marked with `linkedinPlaceholder`.
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  /** Graphics-spec slot id for this person's portrait (see copy doc). */
  imageSlot: string;
  /** Real portrait path, once photography is supplied (Phase 4). */
  imageSrc?: string;
  imageAlt: string;
  /** Bio paragraphs, verbatim from the copy doc. */
  bio: string[];
  /** The single italic closing line under the bio. */
  closingLine: string;
  email?: string;
  linkedinUrl?: string;
  /** Josh's bio is doc-placeholder text; render it visibly flagged. */
  bioIsPlaceholder?: boolean;
  /** LinkedIn URL not yet known; render the link visibly flagged. */
  linkedinPlaceholder?: boolean;
}

export const TEAM: TeamMember[] = [
  {
    id: 'natalie',
    name: 'Natalie Kockelman',
    role: 'operations & build',
    imageSlot: 'IMG-06',
    // Turn on by setting imageSrc: '/photos/img-06-natalie.jpg' (see lib/image-slots.ts).
    imageAlt: 'Natalie, portrait',
    bio: [
      'I spent thirteen years running the back office of a real estate brokerage — transactions, commissions, payroll, onboarding, compliance, the systems underneath all of it, and the reports nobody wanted to build twice.',
      "Somewhere in there I stopped doing the manual work and started building the things that did it instead. Now that's the whole job. I build in Next.js, Supabase, Stripe, and Python, and I've spent enough years inside a real operation to know that the elegant system nobody adopts is a failure.",
    ],
    closingLine: "If you're on a call with me, I'm the one who's going to build it.",
    email: 'hi@arealtuesday.com',
    linkedinPlaceholder: true,
  },
  {
    id: 'josh',
    name: 'Josh Mulder',
    role: 'sales & growth',
    imageSlot: 'IMG-07',
    // Turn on by setting imageSrc: '/photos/img-07-josh.jpg' (see lib/image-slots.ts).
    imageAlt: 'Josh, portrait',
    bioIsPlaceholder: true,
    bio: [
      '[Josh writes this — 2 short paragraphs. Cover: years in sales/BD, what kind of teams he\u2019s built or led, and one specific thing he\u2019s good at that most people are bad at. Same voice: first person, plain, no "results-driven professional."]',
    ],
    closingLine: "If you're building a pipeline, I'm the one who's going to be in it with you.",
    email: 'hi@arealtuesday.com',
    linkedinPlaceholder: true,
  },
];
