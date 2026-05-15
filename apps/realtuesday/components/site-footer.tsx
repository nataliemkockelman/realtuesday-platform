import Link from 'next/link';

/**
 * Site footer — italic byline + lockup on the left, nav links + meta on
 * the right. Adds discoverability for the same pages the top nav surfaces
 * so visitors who scroll past the nav still have a way around the site.
 *
 * Stacks vertically on mobile (no need for the side-by-side layout when
 * the column is 375px wide) and goes inline on desktop.
 */

const FOOTER_LINKS = [
  { href: '/about', label: 'about' },
  { href: '/notes', label: 'notes' },
  { href: '/contact', label: 'contact' },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-12 px-6 pt-7 pb-7 sm:px-8 sm:mt-16">
      <div className="mx-auto max-w-content border-t border-soft-gold/15 pt-8">
        {/* Nav row */}
        <ul className="mb-6 flex flex-wrap gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-[10px] font-semibold uppercase tracking-mono-button text-bright-copper transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Brand mark + copyright row */}
        <div className="flex items-end justify-between">
          <div className="font-serif text-[11px] italic leading-[1.5] text-bright-copper">
            <em>real Tuesday</em>
            <br />
            est · sioux falls
            <br />
            <a
              href="mailto:hi@arealtuesday.com"
              className="font-mono not-italic text-[10px] uppercase tracking-mono-button text-copper hover:text-bright-copper"
            >
              hi@arealtuesday.com
            </a>
          </div>
          <div className="text-right font-mono text-[8px] uppercase tracking-mono-label text-soft-gold">
            © 2026
            <br />
            Sioux Falls, SD
          </div>
        </div>
      </div>
    </footer>
  );
}
