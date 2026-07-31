import type { Metadata } from 'next';
import { AdminNav } from '@/components/admin/admin-nav';
import { getAdminIdentity } from '@/lib/admin-auth';

/**
 * Admin shell. Sits outside the public marketing chrome (no SiteNav or
 * SiteFooter): its own left rail, its own light workspace. Access is gated by
 * middleware.ts (Supabase Auth session + admin_users allowlist), and the whole
 * area is marked noindex so it never shows up in search.
 *
 * When there is no signed-in admin identity, the nav rail is dropped and the
 * child renders bare. That is how the public /admin/login and /admin/accept
 * pages avoid the authenticated chrome without needing a separate layout.
 */
export const metadata: Metadata = {
  title: 'admin',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const identity = await getAdminIdentity();

  if (!identity) {
    return <div className="min-h-screen bg-cream text-navy">{children}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream text-navy md:flex-row">
      <AdminNav identity={identity} />
      <main className="flex-1 px-5 py-8 sm:px-10 sm:py-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
