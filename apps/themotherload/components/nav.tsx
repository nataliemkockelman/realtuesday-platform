import Link from 'next/link';
import { Wordmark } from './wordmark';

/**
 * Top navigation — small M badge + handwritten "the" + Motherload wordmark
 * on the left, hamburger affordance on the right.
 *
 * Mobile-first: fixed at top of the page in document flow (not sticky), per
 * the mockup. Mobile menu drawer is deferred until we have more pages to link
 * to — for now the icon is non-interactive and announced as such.
 */
export function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="flex items-center justify-between px-6 pb-4 pt-12 sm:px-8 sm:pt-16"
    >
      <Link
        href="/"
        className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-sm"
      >
        {/* Solid coral M badge — at 28px we're well below the 60px foil
            threshold the brand kit calls out, so no gradient here. */}
        <span
          aria-hidden="true"
          className="grid h-7 w-7 place-items-center rounded-full bg-coral font-body text-sm font-black text-navy"
        >
          M
        </span>
        <Wordmark size="nav" className="text-cream" />
      </Link>

      {/* Hamburger — placeholder. Becomes a drawer trigger when a second
          public page lands; until then it's decorative only. */}
      <span aria-hidden="true" className="flex flex-col gap-[5px]">
        <span className="block h-[1.5px] w-[22px] bg-cream" />
        <span className="block h-[1.5px] w-[22px] bg-cream" />
      </span>
    </nav>
  );
}
