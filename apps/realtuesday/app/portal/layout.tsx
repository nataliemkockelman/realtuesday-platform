import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/**
 * Client portal shell. Kept out of search entirely (noindex), and visually
 * distinct from the marketing site: a calm cream workspace, not the dark hero.
 */
export const metadata: Metadata = {
  title: 'client portal · real Tuesday',
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-cream text-navy">{children}</div>;
}
