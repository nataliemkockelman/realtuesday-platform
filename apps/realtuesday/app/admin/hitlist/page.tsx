import { PageHeader, Panel, EmptyState } from '@/components/admin/ui';
import { ProspectComposer } from '@/components/admin/prospect-composer';
import { HitlistBoard } from '@/components/admin/hitlist-board';
import { getProspects } from '@/lib/hitlist-data';
import { isSupabaseConfigured } from '@/lib/supabase';

/**
 * /admin/hitlist — the studio's private prospect tracker. A running list of the
 * people and brands we want to work with, moved across stages as we chase them:
 * to reach → reached out → in talks → won / passed. Internal only; never public.
 */
export const dynamic = 'force-dynamic';

export default async function HitlistPage() {
  if (!isSupabaseConfigured()) {
    return (
      <>
        <PageHeader
          eyebrow="pipeline"
          title="hitlist."
          intro="The people and brands we want to work with, and where each one sits in the chase."
        />
        <EmptyState phase="needs supabase">
          <p>
            The backend is not connected yet, so prospects cannot be saved. Once Supabase is wired
            up, this becomes the shared hitlist board.
          </p>
        </EmptyState>
      </>
    );
  }

  const prospects = await getProspects();

  return (
    <>
      <PageHeader
        eyebrow="pipeline"
        title="hitlist."
        intro="Who we want next. Drop a prospect in, then drag them across the board as the conversation moves — from someone on the radar to a signed client, or a polite pass."
      />

      <div className="space-y-8">
        <Panel title="add a prospect">
          <ProspectComposer />
        </Panel>

        <HitlistBoard prospects={prospects} />
      </div>
    </>
  );
}
