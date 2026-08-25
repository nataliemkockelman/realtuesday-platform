'use client';

/**
 * The on-screen toolbar above the branded proposal document. Hidden when
 * printing (`no-print`), so it never lands in the saved PDF. "Download PDF"
 * opens the browser's print dialog — the user picks "Save as PDF" to get the
 * branded document as a file.
 */
export function ProposalPrintToolbar({ filename }: { filename: string }) {
  return (
    <div className="no-print mx-auto mb-6 flex max-w-[820px] items-center justify-between gap-3 px-4">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-mono-label text-navy/50">
          branded proposal
        </p>
        <p className="font-body text-xs text-navy/50">
          Suggested filename: <span className="text-navy/70">{filename}</span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg bg-navy px-4 py-2 font-mono text-[11px] uppercase tracking-mono-button text-cream transition-colors hover:bg-navy-card"
        >
          download pdf
        </button>
        <button
          type="button"
          onClick={() => window.close()}
          className="rounded-lg border border-navy/15 px-4 py-2 font-mono text-[11px] uppercase tracking-mono-button text-navy/60 transition-colors hover:bg-navy/5"
        >
          close
        </button>
      </div>
    </div>
  );
}
