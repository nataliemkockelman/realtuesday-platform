'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';
import { signOut } from '@/app/admin/auth-actions';
import type { AdminIdentity } from '@/lib/admin-auth';

/**
 * Admin sidebar navigation.
 *
 * Sections mirror the studio operating outline: the way work flows from a
 * client, to a proposal, into live delivery, to the money — plus the shared
 * studio space (overview + brainstorm) up top and the assistant at the foot.
 * Grouped so the left rail reads like the shape of the business, not an
 * alphabetical dump.
 *
 * On md+ it is a fixed left rail. On small screens it collapses to a
 * horizontal, scrollable strip at the top so the whole app stays usable on
 * a phone.
 */
type NavLink = { href: Route; label: string };
type NavSection = { heading: string; links: NavLink[] };

const SECTIONS: NavSection[] = [
  {
    heading: 'studio',
    links: [
      { href: '/admin', label: 'Overview' },
      { href: '/admin/brainstorm', label: 'Brainstorm' },
    ],
  },
  {
    heading: 'pipeline',
    links: [
      { href: '/admin/hitlist', label: 'Hitlist' },
      { href: '/admin/intake', label: 'Intake' },
      { href: '/admin/clients', label: 'Clients' },
      { href: '/admin/proposals', label: 'Proposals' },
      { href: '/admin/sales', label: 'Sales' },
      { href: '/admin/subscribers', label: 'Subscribers' },
    ],
  },
  {
    heading: 'delivery',
    links: [
      { href: '/admin/engagements', label: 'Engagements' },
      { href: '/admin/tasks', label: 'Tasks' },
      { href: '/admin/workflows', label: 'Workflows' },
      { href: '/admin/calendar', label: 'Calendar' },
      { href: '/admin/assets', label: 'Assets' },
      { href: '/admin/time', label: 'Time' },
    ],
  },
  {
    heading: 'money',
    links: [
      { href: '/admin/offerings', label: 'Offerings' },
      { href: '/admin/finance', label: 'Finance' },
    ],
  },
  {
    heading: 'assist',
    links: [{ href: '/admin/assistant', label: 'Assistant' }],
  },
];

// Accent-color dot for the signed-in teammate, matched to their brainstorm hue.
const AUTHOR_DOT: Record<string, string> = {
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  copper: 'bg-copper',
  green: 'bg-emerald-500',
  purple: 'bg-purple-500',
};

function isActive(pathname: string, href: string) {
  // Overview is an exact match so it does not light up for every child route.
  if (href === '/admin') return pathname === '/admin';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminNav({ identity }: { identity: AdminIdentity }) {
  const pathname = usePathname();
  const dot = AUTHOR_DOT[identity.color] ?? 'bg-blue-500';

  return (
    <nav
      aria-label="Admin"
      className="flex shrink-0 flex-col border-b border-navy/10 bg-navy px-5 py-5 text-cream md:w-60 md:border-b-0 md:border-r md:py-8"
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

      {/* Signed-in teammate + sign out. Pinned to the foot of the rail on md+. */}
      <div className="mt-8 hidden border-t border-cream/10 pt-5 md:block">
        <div className="mb-3 flex items-center gap-2">
          <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
          <span className="truncate font-body text-sm text-cream/80">{identity.name}</span>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="font-mono text-[10px] uppercase tracking-mono-button text-cream/40 transition-colors hover:text-cream"
          >
            sign out
          </button>
        </form>
        <Link
          href={'/' as Route}
          className="mt-3 block font-mono text-[10px] uppercase tracking-mono-button text-cream/40 transition-colors hover:text-cream"
        >
          ← back to site
        </Link>
      </div>
    </nav>
  );
}
