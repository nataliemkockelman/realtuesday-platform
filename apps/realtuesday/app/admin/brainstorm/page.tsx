import { PageHeader, Panel, EmptyState } from '@/components/admin/ui';
import { NoteComposer } from '@/components/admin/note-composer';
import { RoadmapComposer } from '@/components/admin/roadmap-composer';
import { RoadmapBoard } from '@/components/admin/roadmap-board';
import { authorColor } from '@/components/admin/author-color';
import { getAdminIdentity } from '@/lib/admin-auth';
import { getBrainstormNotes, getRoadmapItems } from '@/lib/collab-data';
import { deleteNote } from './actions';
import { isSupabaseConfigured } from '@/lib/supabase';

/**
 * /admin/brainstorm — the shared studio space. Up top, a brainstorm wall where
 * each teammate drops notes, tinted by author so you can see who wrote what
 * at a glance. Below it, the roadmap: what is happening now, next, later,
 * and what is already done.
 */
export const dynamic = 'force-dynamic';

function formatWhen(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));
}

export default async function BrainstormPage() {
  if (!isSupabaseConfigured()) {
    return (
      <>
        <PageHeader
          eyebrow="studio"
          title="brainstorm."
          intro="The shared wall where the team thinks out loud, with the roadmap underneath."
        />
        <EmptyState phase="needs supabase">
          <p>
            The backend is not connected yet, so notes cannot be saved. Once Supabase is wired up,
            this becomes the shared brainstorm wall and roadmap.
          </p>
        </EmptyState>
      </>
    );
  }

  const [identity, notes, roadmap] = await Promise.all([
    getAdminIdentity(),
    getBrainstormNotes(),
    getRoadmapItems(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="studio"
        title="brainstorm."
        intro="Think out loud together. Drop notes on the wall as they come to you, colored by who wrote them, then pull the good ones down into the roadmap when they are ready to become work."
      />

      <div className="space-y-8">
        <Panel title="new note">
          {identity ? (
            <NoteComposer color={identity.color} name={identity.name} />
          ) : (
            <p className="font-body text-xs text-navy/40">
              Sign in to add to the wall.
            </p>
          )}
        </Panel>

        <section>
          <h2 className="mb-4 font-mono text-[10px] uppercase tracking-mono-label text-navy/50">
            the wall
          </h2>
          {notes.length === 0 ? (
            <p className="font-body text-sm text-navy/40">
              Nothing on the wall yet. Add the first note above.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => {
                const style = authorColor(note.color);
                return (
                  <div key={note.id} className={`rounded-xl border p-4 ${style.card}`}>
                    <p className="whitespace-pre-wrap font-body text-sm leading-relaxed text-navy">
                      {note.body}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                        <span
                          className={`font-mono text-[9px] uppercase tracking-mono-label ${style.chip}`}
                        >
                          {note.author_name}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-mono-label text-navy/30">
                          · {formatWhen(note.created_at)}
                        </span>
                      </span>
                      <form action={deleteNote}>
                        <input type="hidden" name="id" value={note.id} />
                        <button
                          type="submit"
                          aria-label="Remove note"
                          className="font-body text-sm leading-none text-navy/30 transition-colors hover:text-red-600"
                        >
                          ×
                        </button>
                      </form>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="border-t border-navy/10 pt-8">
          <h2 className="mb-1 font-display text-2xl font-extrabold lowercase tracking-[-0.03em] text-navy">
            roadmap.
          </h2>
          <p className="mb-5 max-w-2xl font-body text-sm leading-relaxed text-navy/60">
            Where the ideas go once they have earned a slot. Drag a card between columns as it
            picks up or loses momentum, or use its dropdown.
          </p>

          <div className="mb-6">
            <Panel title="add to roadmap">
              <RoadmapComposer />
            </Panel>
          </div>

          <RoadmapBoard items={roadmap} />
        </section>
      </div>
    </>
  );
}
