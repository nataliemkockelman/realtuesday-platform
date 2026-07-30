import type { Metadata } from 'next';
import { AdminNav } from '@/components/admin/admin-nav';

/**
 * Admin shell. Sits outside the public marketing chrome (no SiteNav or
 * SiteFooter): its own left rail, its own light workspace. Access is gated
 * by middleware.ts (Basic Auth for now, Supabase Auth later), and the whole
 * area is marked noindex so it never shows up in search.
 */
export const metadata: Metadata = {
  title: 'admin',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-cream text-navy md:flex-row">
      <AdminNav />
      <main className="flex-1 px-5 py-8 sm:px-10 sm:py-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
