import { PageHeader, Panel, EmptyState } from '@/components/admin/ui';
import { OfferingComposer } from '@/components/admin/offering-composer';
import { OfferingList } from '@/components/admin/offering-list';
import { getOfferings } from '@/lib/offerings-data';
import { isSupabaseConfigured } from '@/lib/supabase';

/**
 * /admin/offerings — the editable price list. This is the single source of
 * truth for what the studio sells and what it costs. Rows marked "live" are
 * published to the public arealtuesday.com/offerings page; drafts stay private
 * here until you publish them.
 */
export const dynamic = 'force-dynamic';

export default async function OfferingsPage() {
  if (!isSupabaseConfigured()) {
    return (
      <>
        <PageHeader
          eyebrow="money"
          title="offerings."
          intro="The editable price list that feeds the public offerings page."
        />
        <EmptyState phase="needs supabase">
          <p>
            The backend is not connected yet, so offerings cannot be saved. Once Supabase is wired
            up, this becomes the editable price list.
          </p>
        </EmptyState>
      </>
    );
  }

  const offerings = await getOfferings();
  const liveCount = offerings.filter((o) => o.published).length;

  return (
    <>
      <PageHeader
        eyebrow="money"
        title="offerings."
        intro="Your price list, editable in one place. Add what you sell, set a price or a qualifier like “starting at,” then publish the ones you want the world to see. Published offerings appear on arealtuesday.com/offerings; drafts stay private here."
      />

      <div className="space-y-8">
        <Panel title="add an offering">
          <OfferingComposer />
        </Panel>

        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-mono text-[10px] uppercase tracking-mono-label text-navy/50">
              the list
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-mono-label text-navy/40">
              {liveCount} live · {offerings.length - liveCount} draft
            </span>
          </div>
          <OfferingList offerings={offerings} />
        </section>
      </div>
    </>
  );
}
