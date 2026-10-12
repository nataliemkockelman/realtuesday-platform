/**
 * Team data — the single source of truth for the one operator.
 *
 * The /about page maps over TEAM to render the bio through <PersonBio />,
 * so the bio is data, not a hardcoded block. Copy comes verbatim from
 * docs/site-copy-v2.md.
 *
 * Placeholder flags:
 *  - Last name is unconfirmed; the copy doc left it as "[Last Name]".
 *    Confirm before launch.
 *  - LinkedIn URL is unknown; marked with `linkedinPlaceholder`.
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
  /** Bio is doc-placeholder text; render it visibly flagged. */
  bioIsPlaceholder?: boolean;
  /** LinkedIn URL not yet known; render the link visibly flagged. */
  linkedinPlaceholder?: boolean;
}

export const TEAM: TeamMember[] = [
  {
    id: 'operations',
    name: 'operations & build',
    role: 'operations & build',
    imageSlot: 'IMG-06',
    // Turn on by setting imageSrc: '/photos/img-06-operations.jpg' (see lib/image-slots.ts).
    imageAlt: 'Portrait',
    bio: [
      'I spent thirteen years running the back office of a real estate brokerage — transactions, commissions, payroll, onboarding, compliance, the systems underneath all of it, and the reports nobody wanted to build twice.',
      "Somewhere in there I stopped doing the manual work and started building the things that did it instead. Now that's the whole job. I build in Next.js, Supabase, Stripe, and Python, and I've spent enough years inside a real operation to know that the elegant system nobody adopts is a failure.",
    ],
    closingLine: "If you're on a call with me, I'm the one who's going to build it.",
    email: 'hi@arealtuesday.com',
    linkedinPlaceholder: true,
  },
];
