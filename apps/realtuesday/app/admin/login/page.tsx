import Link from 'next/link';
import { AdminLoginForm } from '@/components/admin/login-form';

/**
 * /admin/login — team sign-in. Public (middleware lets it through). A signed-in
 * teammate is bounced to /admin by the middleware. This page renders without
 * the admin shell because the layout drops the nav rail when there is no
 * signed-in identity.
 */
export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <Link href="/" className="mb-8 inline-flex items-center gap-2.5 no-underline">
        <span className="relative flex h-8 w-8 items-center justify-center rounded bg-navy text-cream">
          <span className="font-display text-base font-extrabold leading-none tracking-[-0.05em]">
            rT
          </span>
          <span className="absolute bottom-[5px] left-[5px] h-[1.5px] w-[6px] bg-copper" />
        </span>
        <span className="flex items-baseline gap-[3px] leading-none">
          <span className="font-display text-xl font-extrabold lowercase tracking-[-0.04em] text-navy">
            real
          </span>
          <span className="font-serif text-xl italic text-deep-copper">Tuesday</span>
        </span>
      </Link>

      <h1 className="mb-2 font-display text-3xl font-extrabold lowercase tracking-[-0.03em] text-navy">
        studio admin.
      </h1>
      <p className="mb-8 font-body text-sm leading-relaxed text-navy/60">
        Sign in to the Real Tuesday backend: pipeline, delivery, money, and the
        studio brainstorm.
      </p>

      <div className="rounded-xl border border-navy/10 bg-white/70 p-6">
        <AdminLoginForm />
      </div>

      <p className="mt-6 font-body text-xs text-navy/45">
        Access is by invitation. If you were sent an invite link, open that link
        to set your password.
      </p>
    </main>
  );
}
