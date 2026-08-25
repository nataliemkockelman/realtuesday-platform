import Link from 'next/link';
import { FOOTER_NAV } from '@/lib/site-links';

/**
 * Site footer — italic byline + lockup on the left, nav links + meta on
 * the right. Adds discoverability for the same pages the top nav surfaces
 * so visitors who scroll past the nav still have a way around the site.
 *
 * Link destinations come from lib/site-links.ts (FOOTER_NAV) so the footer
 * and top nav can never drift out of sync.
 *
 * Stacks vertically on mobile (no need for the side-by-side layout when
 * the column is 375px wide) and goes inline on desktop.
 */

export function SiteFooter() {
  return (
    <footer className="mt-12 px-6 pt-7 pb-7 sm:px-8 sm:mt-16">
      <div className="mx-auto max-w-content border-t border-cream/10 pt-8">
        {/* Nav row */}
        <ul className="mb-6 flex flex-wrap gap-x-6 gap-y-2">
          {FOOTER_NAV.map((link) => (
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
            operations studio
            <br />
            <a
              href="mailto:hi@arealtuesday.com"
              className="font-mono not-italic text-[10px] uppercase tracking-mono-button text-copper hover:text-bright-copper"
            >
              hi@arealtuesday.com
            </a>
          </div>
          <div className="text-right font-mono text-[8px] uppercase tracking-mono-label text-mist">
            © 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
