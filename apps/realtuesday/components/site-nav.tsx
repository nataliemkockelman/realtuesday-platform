'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Top navigation — rT submark on the left, nav links on the right.
 *
 * Mobile (<sm): hamburger toggles a full-width drawer that slides down
 * with the same nav links stacked vertically. Mockup-faithful.
 *
 * Desktop (≥sm): right-aligned text links inline. Editorial pattern,
 * mirrors the themotherload.co nav so the two sites read as siblings.
 *
 * Behaviors:
 *  - Drawer closes on route change.
 *  - Body scroll locked while drawer is open.
 *  - Escape closes the drawer.
 *  - aria-current="page" on the active link.
 */

const NAV_LINKS = [
  { href: '/about', label: 'about' },
  { href: '/notes', label: 'notes' },
  { href: '/contact', label: 'contact' },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change (after a nav click).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc closes the drawer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <nav
      aria-label="Primary"
      className="relative z-50 px-6 pt-12 pb-4 sm:px-8"
    >
      <div className="mx-auto flex max-w-content items-center justify-between">
        <Link
          href="/"
          aria-label="real Tuesday — home"
          className="relative flex h-8 w-8 items-center justify-center rounded bg-cream text-navy outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
        >
          <span className="font-display text-base font-extrabold leading-none tracking-[-0.05em]">
            rT
          </span>
          <span className="absolute bottom-[5px] left-[5px] h-[1.5px] w-[6px] bg-copper" />
        </Link>

        {/* Desktop inline nav (≥sm) */}
        <ul className="hidden items-center gap-7 sm:flex">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`font-mono text-[11px] font-semibold uppercase tracking-mono-button transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-4 focus-visible:ring-offset-navy ${
                    active ? 'text-copper' : 'text-cream'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger (<sm). Two bars matching the mockup glyph;
            morph into an X when open for clear close affordance. */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col items-end gap-[5px] p-1 outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-navy sm:hidden"
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
      </div>

      {/* Mobile drawer — full-width slide-down below the nav row.
          Hidden on desktop because inline links are always visible there. */}
      <div
        id="primary-mobile-menu"
        hidden={!open}
        className="absolute left-0 right-0 top-full z-40 border-t border-copper/20 bg-navy px-6 pb-10 pt-6 sm:hidden"
      >
        <ul className="flex flex-col gap-4">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`block font-serif text-2xl italic ${
                    active ? 'text-copper' : 'text-cream'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
