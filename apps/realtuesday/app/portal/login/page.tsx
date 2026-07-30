import Link from 'next/link';
import { LoginForm } from '@/components/portal/login-form';

/**
 * /portal/login — client sign-in. Public (middleware lets it through). A
 * signed-in visitor is bounced to /portal by the middleware.
 */
export const dynamic = 'force-dynamic';

export default function PortalLoginPage() {
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
        client portal.
      </h1>
      <p className="mb-8 font-body text-sm leading-relaxed text-navy/60">
        Sign in to see where your work stands: active engagements, what is in
        progress, and your invoices.
      </p>

      <div className="rounded-xl border border-navy/10 bg-white/70 p-6">
        <LoginForm />
      </div>

      <p className="mt-6 font-body text-xs text-navy/45">
        Access is by invitation. If you were sent an invite link, open that link
        to set your password. Trouble getting in? Reply to the email you were
        invited from.
      </p>
    </main>
  );
}
