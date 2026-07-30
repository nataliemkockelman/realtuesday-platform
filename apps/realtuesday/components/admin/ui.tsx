import type { ReactNode } from 'react';

/**
 * Small shared kit for the admin scaffold. Deliberately plain: this is an
 * internal tool, so legibility and density beat editorial flourish. Palette
 * stays on-brand (navy text, copper accents, white panels on cream).
 *
 * Everything here renders empty states rather than invented numbers. No
 * placeholder statistics, no fake charts. When Supabase data lands, these
 * same components fill in for real.
 */

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="mb-8 border-b border-navy/10 pb-6">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-mono-label text-copper">
        {eyebrow}
      </p>
      <h1 className="mb-3 font-display text-3xl font-extrabold lowercase tracking-[-0.03em] text-navy sm:text-4xl">
        {title}
      </h1>
      <p className="max-w-2xl font-body text-sm leading-relaxed text-navy/70">{intro}</p>
    </header>
  );
}

export function Panel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-navy/10 bg-white/70 p-5 sm:p-6">
      <h2 className="mb-4 font-mono text-[10px] uppercase tracking-mono-label text-navy/50">
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * A metric slot. When `value` is provided it shows the real figure; otherwise
 * it falls back to a muted "no data yet" placeholder rather than a fabricated
 * number. This lets the same tile serve both the pre-Supabase scaffold and the
 * live dashboard.
 */
export function StatCard({
  label,
  hint,
  value,
}: {
  label: string;
  hint: string;
  value?: string | null;
}) {
  const hasValue = value != null && value !== '';
  return (
    <div className="rounded-lg border border-navy/10 bg-white/60 p-4">
      <p className="font-mono text-[9px] uppercase tracking-mono-label text-navy/40">
        {label}
      </p>
      <p
        className={
          hasValue
            ? 'mt-2 font-display text-2xl font-extrabold tracking-[-0.02em] text-navy'
            : 'mt-2 font-display text-2xl font-extrabold tracking-[-0.02em] text-navy/25'
        }
      >
        {hasValue ? value : 'no data yet'}
      </p>
      <p className="mt-1.5 font-body text-xs leading-snug text-navy/50">{hint}</p>
    </div>
  );
}

/**
 * Small colored status pill used across the list pages. Maps a status string
 * to an on-brand tone. Unknown statuses fall back to a neutral navy.
 */
const STATUS_TONES: Record<string, string> = {
  // greens (good / done / paid)
  active: 'border-emerald-600/30 bg-emerald-600/10 text-emerald-800',
  accepted: 'border-emerald-600/30 bg-emerald-600/10 text-emerald-800',
  paid: 'border-emerald-600/30 bg-emerald-600/10 text-emerald-800',
  done: 'border-emerald-600/30 bg-emerald-600/10 text-emerald-800',
  // copper (in motion / awaiting)
  sent: 'border-copper/40 bg-copper/10 text-deep-copper',
  in_progress: 'border-copper/40 bg-copper/10 text-deep-copper',
  qualified: 'border-copper/40 bg-copper/10 text-deep-copper',
  // reds (attention)
  overdue: 'border-red-600/30 bg-red-600/10 text-red-800',
  declined: 'border-red-600/30 bg-red-600/10 text-red-800',
  lost: 'border-red-600/30 bg-red-600/10 text-red-800',
  // muted (idle)
  draft: 'border-navy/20 bg-navy/5 text-navy/60',
  paused: 'border-navy/20 bg-navy/5 text-navy/60',
  dormant: 'border-navy/20 bg-navy/5 text-navy/60',
  expired: 'border-navy/20 bg-navy/5 text-navy/60',
  void: 'border-navy/20 bg-navy/5 text-navy/60',
  archived: 'border-navy/20 bg-navy/5 text-navy/60',
};

export function StatusPill({ status }: { status: string }) {
  const tone = STATUS_TONES[status] ?? 'border-navy/20 bg-navy/5 text-navy/70';
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-mono-label ${tone}`}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
}

/**
 * Describes what a section will hold once it is built, plus which phase it
 * belongs to. Keeps the scaffold honest about what is real versus planned.
 */
export function EmptyState({
  phase,
  children,
}: {
  phase: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-navy/20 bg-white/40 p-6">
      <span className="mb-3 inline-block rounded-full border border-copper/50 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-mono-label text-deep-copper">
        {phase}
      </span>
      <div className="max-w-2xl space-y-3 font-body text-sm leading-relaxed text-navy/70">
        {children}
      </div>
    </div>
  );
}
