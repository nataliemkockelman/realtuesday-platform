'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';

/**
 * Admin sidebar navigation.
 *
 * Sections mirror the Knova operating outline: the way an engagement flows
 * from a client, to a proposal, to live work, to the money. Grouped so the
 * left rail reads like the shape of the business, not an alphabetical dump.
 *
 * On md+ it is a fixed left rail. On small screens it collapses to a
 * horizontal, scrollable strip at the top so the whole app stays usable on
 * a phone.
 */
type NavLink = { href: Route; label: string };
type NavSection = { heading: string; links: NavLink[] };

const SECTIONS: NavSection[] = [
  {
    heading: 'pipeline',
    links: [
      { href: '/admin', label: 'Overview' },
      { href: '/admin/clients', label: 'Clients' },
      { href: '/admin/proposals', label: 'Proposals' },
      { href: '/admin/engagements', label: 'Engagements' },
    ],
  },
  {
    heading: 'delivery',
    links: [
      { href: '/admin/tasks', label: 'Tasks' },
      { href: '/admin/time', label: 'Time' },
    ],
  },
  {
    heading: 'money',
    links: [{ href: '/admin/finance', label: 'Finance' }],
  },
  {
    heading: 'assist',
    links: [{ href: '/admin/assistant', label: 'Assistant' }],
  },
];

function isActive(pathname: string, href: string) {
  // Overview is an exact match so it does not light up for every child route.
  if (href === '/admin') return pathname === '/admin';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin"
      className="shrink-0 border-b border-navy/10 bg-navy px-5 py-5 text-cream md:w-60 md:border-b-0 md:border-r md:py-8"
    >
      <div className="mb-6 flex items-center gap-2.5">
        <span className="relative flex h-7 w-7 items-center justify-center rounded bg-cream text-navy">
          <span className="font-display text-sm font-extrabold leading-none tracking-[-0.05em]">
            rT
          </span>
          <span className="absolute bottom-[4px] left-[4px] h-[1.5px] w-[5px] bg-copper" />
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-mono-label text-bright-copper">
          admin
        </span>
      </div>

      <div className="flex gap-6 overflow-x-auto md:flex-col md:gap-6 md:overflow-visible">
        {SECTIONS.map((section) => (
          <div key={section.heading} className="shrink-0">
            <p className="mb-2 hidden font-mono text-[9px] uppercase tracking-mono-label text-cream/40 md:block">
              {section.heading}
            </p>
            <ul className="flex gap-4 md:flex-col md:gap-0.5">
              {section.links.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={`block whitespace-nowrap rounded-md px-0 py-1 font-body text-sm transition-colors md:px-3 md:py-1.5 ${
                        active
                          ? 'text-copper md:bg-navy-card md:text-cream'
                          : 'text-cream/70 hover:text-cream'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <Link
        href={'/' as Route}
        className="mt-8 hidden font-mono text-[10px] uppercase tracking-mono-button text-cream/40 transition-colors hover:text-cream md:block"
      >
        ← back to site
      </Link>
    </nav>
  );
}
