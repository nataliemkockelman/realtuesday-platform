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
 * Closes the drawer on route change so navigating from the open menu
 * doesn't leave it stuck open.
 */

const NAV_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/free/setup-guide', label: 'Free Guide' },
  { href: '/contact', label: 'Contact' },
] as const;

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
    <nav
      aria-label="Primary"
      className="relative z-50 flex items-center justify-between px-6 pb-4 pt-12 sm:px-8 sm:pt-16"
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
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={`font-mono text-[11px] font-semibold uppercase tracking-mono-label transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy ${
                active ? 'text-coral-light' : 'text-cream'
              }`}
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
              <Link
                href={link.href}
                className="block font-ml-display text-2xl italic text-cream"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
