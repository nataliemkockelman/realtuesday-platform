import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { getProposalTemplate } from '@/lib/proposal-templates-data';
import { fillPlaceholders, fillPlaceholdersText, type ProposalValues } from '@/lib/proposal-render';
import { ProposalPrintToolbar } from '@/components/admin/proposal-print-toolbar';

/**
 * /admin/proposals/print/[id] — the branded, print-ready proposal document.
 *
 * Reads a template, fills the {{client}} / {{company}} / {{date}} / {{price}}
 * placeholders from the query string (set by the "draft PDF" form), renders the
 * Markdown body, and lays it out in the Real Tuesday brand (navy letterhead,
 * copper accents, Bricolage + Fraunces + Inter). "Download PDF" opens the
 * browser print dialog; the print CSS drops the admin chrome and the toolbar so
 * only the document lands in the saved file.
 *
 * Gated with the rest of /admin by middleware. Never public.
 */
export const dynamic = 'force-dynamic';

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'client'
  );
}

export default async function ProposalPrintPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { client?: string; company?: string; date?: string; price?: string };
}) {
  const template = await getProposalTemplate(params.id);
  if (!template) notFound();

  const values: ProposalValues = {
    client: searchParams.client ?? '',
    company: searchParams.company ?? '',
    date: searchParams.date ?? '',
    price: searchParams.price ?? '',
  };

  const title = fillPlaceholdersText(template.title, values);
  const bodyHtml = await marked.parse(fillPlaceholders(template.body, values), { async: true });
  const filename = `real-tuesday-proposal-${slugify(values.company || values.client)}.pdf`;

  return (
    <>
      {/* Scoped print + typography rules. Hides the admin rail and the toolbar
          in the printed output, and styles the Markdown body. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            nav[aria-label="Admin"] { display: none !important; }
            * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .proposal-body { color: #1A2238; font-size: 15px; line-height: 1.7; }
            .proposal-body h2 { font-family: var(--font-bricolage), system-ui, sans-serif; font-weight: 800; font-size: 20px; letter-spacing: -0.02em; text-transform: lowercase; color: #1A2238; margin: 30px 0 10px; }
            .proposal-body h3 { font-family: var(--font-bricolage), system-ui, sans-serif; font-weight: 700; font-size: 15px; color: #1A2238; margin: 20px 0 6px; }
            .proposal-body p { margin: 0 0 12px; }
            .proposal-body ul { margin: 0 0 14px; padding-left: 18px; list-style: disc; }
            .proposal-body ol { margin: 0 0 14px; padding-left: 20px; list-style: decimal; }
            .proposal-body li { margin: 0 0 6px; }
            .proposal-body strong { font-weight: 700; color: #1A2238; }
            .proposal-body em { font-style: italic; }
            .proposal-body a { color: #A8531F; text-decoration: underline; }
            .proposal-body hr { border: 0; border-top: 1px solid rgba(26,34,56,0.12); margin: 22px 0; }
            @media print {
              .no-print { display: none !important; }
              html, body { background: #ffffff !important; }
              .proposal-paper { box-shadow: none !important; margin: 0 !important; max-width: none !important; border-radius: 0 !important; }
              @page { margin: 15mm 14mm; }
            }
          `,
        }}
      />

      <ProposalPrintToolbar filename={filename} />

      <article className="proposal-paper mx-auto max-w-[820px] overflow-hidden rounded-xl bg-white text-navy shadow-[0_1px_40px_rgba(26,34,56,0.10)] ring-1 ring-navy/5">
        {/* Letterhead */}
        <header className="flex items-center justify-between gap-4 bg-navy px-10 py-7 text-cream">
          <span className="flex items-center gap-2.5">
            <span className="relative flex h-8 w-8 items-center justify-center rounded bg-cream text-navy">
              <span className="font-display text-base font-extrabold leading-none tracking-[-0.05em]">
                rT
              </span>
              <span className="absolute bottom-[5px] left-[5px] h-[1.5px] w-[6px] bg-copper" />
            </span>
            <span className="flex items-baseline gap-[3px] leading-none">
              <span className="font-display text-xl font-extrabold lowercase tracking-[-0.04em] text-cream">
                real
              </span>
              <span className="font-serif text-xl italic text-bright-copper">Tuesday</span>
            </span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
            proposal
          </span>
        </header>

        <div className="px-10 py-9">
          {/* Meta */}
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-navy/10 pb-6">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-mono-label text-copper">
                prepared for
              </p>
              <p className="mt-1 font-body text-base font-semibold text-navy">
                {values.client.trim() || 'The client'}
              </p>
              {values.company.trim() ? (
                <p className="font-body text-sm text-navy/60">{values.company.trim()}</p>
              ) : null}
            </div>
            {values.date.trim() ? (
              <div className="text-right">
                <p className="font-mono text-[9px] uppercase tracking-mono-label text-copper">
                  date
                </p>
                <p className="mt-1 font-body text-sm text-navy/70">{values.date.trim()}</p>
              </div>
            ) : null}
          </div>

          {/* Title */}
          <h1 className="mb-6 font-display text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] lowercase text-navy">
            {title}
          </h1>

          {/* Body */}
          <div
            className="proposal-body font-body"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          {/* Footer */}
          <footer className="mt-10 flex items-center justify-between gap-3 border-t border-navy/10 pt-5">
            <span className="font-mono text-[9px] uppercase tracking-mono-label text-navy/45">
              real Tuesday · operations studio
            </span>
            <span className="font-mono text-[9px] uppercase tracking-mono-label text-navy/45">
              arealtuesday.com
            </span>
          </footer>
        </div>
      </article>
    </>
  );
}
