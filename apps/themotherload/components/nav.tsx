'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Wordmark } from './wordmark';

/**
 * Top navigation — wordmark on the left.
 *
 * Mobile (<sm): hamburger toggles a full-width drawer that slides down
 * with the nav links stacked vertically.
 *
 * Desktop (≥sm): right-aligned text links (Products, About, Free Guide).
 *
 * "Free Guide" points at /free/setup-guide — the Claude, Meet Your Family
 * setup guide is the primary free offer. The Sunday Reset is a secondary
 * bonus available on its own page, surfaced from the newsletter capture.
 *
 * "Real Tuesday" is the studio behind this brand (cross-promo, external —
 * see apps/realtuesday for the matching link back). Marked `external` so
 * it renders as a plain <a target="_blank"> instead of next/link.
 *
 * Closes the drawer on route change so navigating from the open menu
 * doesn't leave it stuck open.
 *
 * Holiday App announcement bar sits above the nav row on every page (it's
 * rendered here, not per-page, so it's sitewide with one edit). Links out
 * to holiday.arealtuesday.com — the seasonal planner app, a separate
 * standalone product from Real Tuesday, not part of this repo. External,
 * same target="_blank" treatment as the Real Tuesday nav link.
 */

const NAV_LINKS = [
  { href: '/products', label: 'Products', external: false },
  { href: '/blog', label: 'Blog', external: false },
  { href: '/about', label: 'About', external: false },
  { href: '/free/setup-guide', label: 'Free Guide', external: false },
  { href: '/contact', label: 'Contact', external: false },
  { href: 'https://arealtuesday.com', label: 'Real Tuesday', external: true },
] as const;

const HOLIDAY_APP_URL = 'https://holiday.arealtuesday.com';

function HolidayAppBanner() {
  return (
    <a
      href={HOLIDAY_APP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 bg-coral px-6 py-2.5 text-center font-mono text-[11px] font-semibold uppercase tracking-mono-button text-navy transition-opacity hover:opacity-90 sm:px-8"
    >
      <span>The Holiday App is live — plan the whole season in one place</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer when route changes (after a nav click).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape — standard a11y for any popup.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <HolidayAppBanner />
      <nav
        aria-label="Primary"
        className="relative z-50 flex items-center justify-between px-6 pb-4 pt-8 sm:px-8 sm:pt-10"
      >
      <Link
        href="/"
        className="flex items-center gap-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
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

      {/* Desktop nav — right-aligned text links */}
      <div className="hidden items-center gap-7 sm:flex">
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          const className = `font-mono text-[11px] font-semibold uppercase tracking-mono-label transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy ${
            active ? 'text-coral-light' : 'text-cream'
          }`;
          return link.external ? (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
              {link.label}
            </a>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={className}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile hamburger — toggles the drawer below */}
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="primary-mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col items-end gap-[5px] p-1 outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-navy sm:hidden"
      >
        <span
          className={`block h-[1.5px] w-[22px] bg-cream transition-transform ${
            open ? 'translate-y-[6.5px] rotate-45' : ''
          }`}
        />
        <span
          className={`block h-[1.5px] w-[22px] bg-cream transition-transform ${
            open ? '-translate-y-[6.5px] -rotate-45' : ''
          }`}
        />
      </button>

      {/* Mobile drawer — full-width slide-down from below the nav. Hidden on
          desktop because the inline links are always visible there. */}
      <div
        id="primary-mobile-menu"
        hidden={!open}
        className="absolute left-0 right-0 top-full z-40 border-t border-coral/20 bg-navy px-6 pb-10 pt-6 sm:hidden"
      >
        <ul className="flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-ml-display text-2xl italic text-cream"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="block font-ml-display text-2xl italic text-cream"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      </nav>
    </>
  );
}
