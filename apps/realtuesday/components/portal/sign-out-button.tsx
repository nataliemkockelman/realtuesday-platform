'use client';

import { signOut } from '@/app/portal/actions';

/** A tiny form so signing out is a POST to the signOut Server Action. */
export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="font-mono text-[10px] uppercase tracking-mono-button text-cream/70 transition-opacity hover:opacity-100 hover:text-cream"
      >
        sign out
      </button>
    </form>
  );
}
