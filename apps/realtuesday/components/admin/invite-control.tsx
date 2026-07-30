'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createInvite, type InviteResult } from '@/app/admin/clients/actions';

const initial: InviteResult = { ok: false };

function InviteButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="rounded-full border border-navy/25 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-mono-label text-navy/60 transition-colors hover:border-copper hover:text-deep-copper disabled:opacity-40"
    >
      {pending ? 'making link' : 'invite'}
    </button>
  );
}

/**
 * Per-client control that mints a portal invite link. On success it reveals a
 * copyable accept URL for the admin to send to the client. Kept compact so it
 * sits inline in the clients list.
 */
export function InviteControl({ clientId, hasEmail }: { clientId: string; hasEmail: boolean }) {
  const [state, formAction] = useFormState(createInvite, initial);
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!state.url) return;
    try {
      await navigator.clipboard.writeText(state.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard may be unavailable; the link is still selectable */
    }
  }

  if (state.ok && state.url) {
    return (
      <div className="flex items-center gap-2">
        <input
          readOnly
          value={state.url}
          onFocus={(e) => e.currentTarget.select()}
          className="w-40 rounded border border-navy/15 bg-white px-2 py-1 font-mono text-[10px] text-navy/70 sm:w-56"
        />
        <button
          type="button"
          onClick={copy}
          className="rounded-full border border-copper/50 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-mono-label text-deep-copper hover:bg-copper/10"
        >
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="clientId" value={clientId} />
      <InviteButton disabled={!hasEmail} />
      {state.error ? (
        <span className="font-body text-[10px] text-red-700">{state.error}</span>
      ) : !hasEmail ? (
        <span className="font-body text-[10px] text-navy/35">needs email</span>
      ) : null}
    </form>
  );
}
