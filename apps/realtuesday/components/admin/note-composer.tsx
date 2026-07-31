'use client';

import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { addNote } from '@/app/admin/brainstorm/actions';
import { authorColor } from './author-color';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-navy px-4 py-2 font-mono text-[11px] uppercase tracking-mono-button text-cream transition-colors hover:bg-navy-card disabled:opacity-50"
    >
      {pending ? 'adding' : 'add note'}
    </button>
  );
}

/**
 * The brainstorm composer. Writes a note as the signed-in teammate; the note is
 * tinted with their color once it lands on the wall. Resets after each add so
 * you can keep dumping ideas without clearing the box by hand.
 */
export function NoteComposer({ color, name }: { color: string; name: string }) {
  const ref = useRef<HTMLFormElement>(null);
  const style = authorColor(color);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await addNote(formData);
        ref.current?.reset();
      }}
      className="space-y-3"
    >
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${style.dot}`} />
        <span className={`font-mono text-[9px] uppercase tracking-mono-label ${style.chip}`}>
          writing as {name}
        </span>
      </div>
      <textarea
        name="body"
        required
        rows={3}
        placeholder="Dump an idea, a question, a half-thought…"
        className="w-full resize-y rounded-lg border border-navy/15 bg-white px-3 py-2.5 font-body text-sm text-navy placeholder:text-navy/35 focus:border-copper focus:outline-none focus:ring-1 focus:ring-copper"
      />
      <div className="flex justify-end">
        <Submit />
      </div>
    </form>
  );
}
