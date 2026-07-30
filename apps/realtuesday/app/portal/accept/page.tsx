import Link from 'next/link';
import { AcceptForm } from '@/components/portal/accept-form';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

/**
 * /portal/accept?token=… — invite acceptance. Public. Validates the token
 * server-side and, if good, shows a form to set a password. The token is the
 * capability, so we reveal only the invited email tied to it.
 */
export const dynamic = 'force-dynamic';

function Shell({ children }: { children: React.ReactNode }) {
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
      {children}
    </main>
  );
}

function Invalid({ message }: { message: string }) {
  return (
    <Shell>
      <h1 className="mb-2 font-display text-2xl font-extrabold lowercase tracking-[-0.03em] text-navy">
        this link is not usable.
      </h1>
      <p className="mb-6 font-body text-sm leading-relaxed text-navy/60">{message}</p>
      <Link
        href="/portal/login"
        className="font-mono text-[11px] uppercase tracking-mono-button text-deep-copper no-underline hover:underline"
      >
        go to sign in
      </Link>
    </Shell>
  );
}

export default async function AcceptInvitePage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = (searchParams.token ?? '').trim();

  if (!token) {
    return <Invalid message="This invite link is missing its code. Ask for a fresh invite." />;
  }
  if (!isSupabaseConfigured()) {
    return <Invalid message="The portal is not available right now. Please try again later." />;
  }

  const admin = getSupabaseAdmin();
  const { data: invite } = await admin
    .from('portal_invites')
    .select('email, status, expires_at')
    .eq('token', token)
    .maybeSingle();

  if (!invite || invite.status !== 'pending') {
    return (
      <Invalid message="This invite has already been used or was cancelled. Ask for a new one." />
    );
  }
  if (new Date(invite.expires_at).getTime() < Date.now()) {
    return <Invalid message="This invite has expired. Ask for a new one." />;
  }

  return (
    <Shell>
      <h1 className="mb-2 font-display text-3xl font-extrabold lowercase tracking-[-0.03em] text-navy">
        set up your access.
      </h1>
      <p className="mb-8 font-body text-sm leading-relaxed text-navy/60">
        Choose a password and you are in. Next time, sign in with your email and
        this password.
      </p>
      <div className="rounded-xl border border-navy/10 bg-white/70 p-6">
        <AcceptForm token={token} email={invite.email} />
      </div>
    </Shell>
  );
}
