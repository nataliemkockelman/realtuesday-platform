/**
 * Image slots — single source of truth for the 8 photography/graphics slots
 * specced in docs/site-copy-v2.md (GRAPHICS SPEC).
 *
 * Each slot renders as a fixed-ratio next/image placeholder (via PhotoPanel)
 * until a real asset is dropped at `file`. To turn a slot on: drop the asset at
 * the `file` path in /public and flip `ready` to true. Nothing else changes —
 * ratio, sizes, and alt text are already wired.
 *
 * Portraits IMG-06 / IMG-07 are rendered by <PersonBio /> from lib/team.ts
 * (bios are data-driven); their metadata is mirrored here for the full slot map.
 */

export type SlotPriority = 'must' | 'high' | 'medium';

export interface ImageSlot {
  id: string;
  /** Where the real asset goes in /public. Named to the slot id. */
  file: string;
  /** Alt text, from the graphics spec. */
  alt: string;
  /** Responsive aspect-ratio (and any sizing) wrapper classes. */
  ratioClass: string;
  /** next/image `sizes` for correct responsive loading. */
  sizes: string;
  /** Recommended source asset dimensions. */
  dimensions: string;
  page: 'home' | 'about' | 'pricing';
  placement: string;
  priority: SlotPriority;
  /** Flip to true once the real asset exists at `file`. */
  ready: boolean;
  /** Short human label shown on the placeholder chip. */
  shortLabel: string;
}

export const IMAGE_SLOTS = {
  'IMG-01': {
    id: 'IMG-01',
    file: '/photos/img-01-hero.jpg',
    alt: 'Abstract brand texture in real Tuesday navy and copper',
    ratioClass: 'aspect-[16/10] lg:aspect-[4/5]',
    sizes: '(min-width: 1024px) 45vw, 100vw',
    dimensions: '1600×2000 (4:5)',
    page: 'home',
    placement: 'hero, right half',
    priority: 'must',
    ready: false,
    shortLabel: 'hero',
  },
  'IMG-02': {
    id: 'IMG-02',
    file: '/photos/img-02-before-after.svg',
    alt: 'Before-and-after diagram: tangled tool connections on the left, one clean linear flow on the right',
    ratioClass: 'aspect-[4/5] lg:aspect-square',
    sizes: '(min-width: 1024px) 40vw, 100vw',
    dimensions: '1200×1200 (SVG preferred, scalable)',
    page: 'home',
    placement: 'beside “you already know where it hurts”',
    priority: 'high',
    ready: false,
    shortLabel: 'before / after diagram',
  },
  'IMG-03': {
    id: 'IMG-03',
    file: '/photos/img-03-the-two-of-you.jpg',
    alt: 'The two operators behind real Tuesday',
    ratioClass: 'aspect-[4/5] lg:aspect-square',
    sizes: '(min-width: 1024px) 45vw, 100vw',
    dimensions: '1600×1600 (1:1)',
    page: 'home',
    placement: 'beside “you get us”',
    priority: 'must',
    ready: false,
    shortLabel: 'the two of you',
  },
  'IMG-04': {
    id: 'IMG-04',
    file: '/photos/img-04-dashboard.png',
    alt: 'Screenshot of a custom dashboard built by real Tuesday, with sample data',
    ratioClass: 'aspect-[4/3]',
    sizes: '(min-width: 1024px) 50vw, 100vw',
    dimensions: '1600×1200 (4:3)',
    page: 'home',
    placement: 'proof section',
    priority: 'high',
    ready: false,
    shortLabel: 'case study visual',
  },
  'IMG-05': {
    id: 'IMG-05',
    file: '/photos/img-05-together.jpg',
    alt: 'The two operators working together at a table',
    ratioClass: 'aspect-[16/10] sm:aspect-[5/2]',
    sizes: '(min-width: 1344px) 1344px, 100vw',
    dimensions: '2000×800 (5:2)',
    page: 'about',
    placement: 'hero',
    priority: 'must',
    ready: false,
    shortLabel: 'the two of you together',
  },
  'IMG-06': {
    id: 'IMG-06',
    file: '/photos/img-06-natalie.jpg',
    alt: 'Portrait',
    ratioClass: 'aspect-[4/5]',
    sizes: '(min-width: 1024px) 40vw, 100vw',
    dimensions: '1200×1500 (4:5)',
    page: 'about',
    placement: 'operations bio',
    priority: 'must',
    ready: false,
    shortLabel: 'operations portrait',
  },
  'IMG-07': {
    id: 'IMG-07',
    file: '/photos/img-07-josh.jpg',
    alt: 'Portrait',
    ratioClass: 'aspect-[4/5]',
    sizes: '(min-width: 1024px) 40vw, 100vw',
    dimensions: '1200×1500 (4:5)',
    page: 'about',
    placement: 'sales bio',
    priority: 'must',
    ready: false,
    shortLabel: 'sales portrait',
  },
  'IMG-08': {
    id: 'IMG-08',
    file: '/photos/img-08-audit-deliverable.jpg',
    alt: 'A page from a real audit deliverable, client identifiers blurred',
    ratioClass: 'aspect-[16/9] max-w-[640px]',
    sizes: '(min-width: 700px) 640px, 100vw',
    dimensions: '1280×720 (16:9)',
    page: 'pricing',
    placement: 'audit section',
    priority: 'medium',
    ready: false,
    shortLabel: 'audit deliverable',
  },
} satisfies Record<string, ImageSlot>;

export type SlotId = keyof typeof IMAGE_SLOTS;
