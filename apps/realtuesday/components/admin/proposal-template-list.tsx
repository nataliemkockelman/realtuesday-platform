'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import {
  updateProposalTemplate,
  duplicateProposalTemplate,
  deleteProposalTemplate,
} from '@/app/admin/proposals/actions';
import { formatCents } from '@/lib/format';
import { todayInStudioTz } from '@/lib/proposal-render';
import type { Database } from '@/lib/database.types';

type ProposalTemplate = Database['public']['Tables']['proposal_templates']['Row'];

const inputClass =
  'w-full rounded-lg border border-navy/15 bg-white px-3 py-2 font-body text-sm text-navy placeholder:text-navy/35 focus:border-copper focus:outline-none focus:ring-1 focus:ring-copper';

export function ProposalTemplateList({ templates }: { templates: ProposalTemplate[] }) {
  if (templates.length === 0) {
    return (
      <p className="font-body text-sm text-navy/40">
        No templates yet. Add your first one to draft proposals from.
      </p>
    );
  }
  return (
    <ul className="space-y-3">
      {templates.map((t) => (
        <li key={t.id}>
          <TemplateCard template={t} />
        </li>
      ))}
    </ul>
  );
}

function PriceLabel({ template }: { template: ProposalTemplate }) {
  const hasPrice = template.amount_cents != null;
  const hasNote = Boolean(template.price_note);
  if (!hasPrice && !hasNote) return null;
  return (
    <span className="font-body text-sm text-navy/70">
      {hasNote ? <span className="text-navy/50">{template.price_note} </span> : null}
      {hasPrice ? (
        <span className="font-medium text-navy">{formatCents(template.amount_cents)}</span>
      ) : null}
    </span>
  );
}

/** The default price string to prefill the draft form with, built from the
 *  template's default amount and qualifier (e.g. "starting at $5,000"). */
function defaultPrice(template: ProposalTemplate): string {
  const parts: string[] = [];
  if (template.price_note) parts.push(template.price_note);
  if (template.amount_cents != null) parts.push(formatCents(template.amount_cents));
  return parts.join(' ');
}

function DraftForm({ template }: { template: ProposalTemplate }) {
  const inputRefName = 'client';
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const params = new URLSearchParams({
          client: String(data.get('client') ?? ''),
          company: String(data.get('company') ?? ''),
          date: String(data.get('date') ?? ''),
          price: String(data.get('price') ?? ''),
        });
        window.open(`/admin/proposals/print/${template.id}?${params.toString()}`, '_blank');
      }}
      className="mt-3 space-y-3 rounded-lg border border-navy/10 bg-cream/40 p-3"
    >
      <p className="font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
        draft a branded pdf
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          name={inputRefName}
          required
          placeholder="Client name"
          className={inputClass}
        />
        <input name="company" placeholder="Company / brand" className={inputClass} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input name="date" defaultValue={todayInStudioTz()} placeholder="Date" className={inputClass} />
        <input
          name="price"
          defaultValue={defaultPrice(template)}
          placeholder='Price (e.g. "starting at $5,000")'
          className={inputClass}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-copper px-4 py-2 font-mono text-[11px] uppercase tracking-mono-button text-cream transition-colors hover:bg-deep-copper"
        >
          open branded pdf →
        </button>
      </div>
    </form>
  );
}

function TemplateCard({ template }: { template: ProposalTemplate }) {
  const [editing, setEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [drafting, setDrafting] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyBody() {
    try {
      await navigator.clipboard.writeText(template.body);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked; ignore silently.
    }
  }

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await updateProposalTemplate(formData);
          setEditing(false);
        }}
        className="space-y-3 rounded-xl border border-copper/40 bg-white p-4"
      >
        <input type="hidden" name="id" value={template.id} />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
              template name (internal)
            </span>
            <input name="name" required defaultValue={template.name} className={inputClass} />
          </label>
          <label className="block">
            <span className="mb-1 block font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
              default proposal title
            </span>
            <input name="title" required defaultValue={template.title} className={inputClass} />
          </label>
        </div>
        <input
          name="summary"
          defaultValue={template.summary ?? ''}
          placeholder="One line on when to use this (optional)"
          className={inputClass}
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-mono-label text-navy/50">$</span>
            <input
              name="price"
              inputMode="decimal"
              defaultValue={template.amount_cents != null ? template.amount_cents / 100 : ''}
              placeholder="Default price (optional)"
              className={inputClass}
            />
          </label>
          <input
            name="price_note"
            defaultValue={template.price_note ?? ''}
            placeholder='Qualifier — "starting at", "per month"…'
            className={inputClass}
          />
        </div>
        <label className="block">
          <span className="mb-1 block font-mono text-[9px] uppercase tracking-mono-label text-navy/50">
            body · Markdown · placeholders {'{{client}} {{company}} {{date}} {{price}}'}
          </span>
          <textarea
            name="body"
            rows={16}
            defaultValue={template.body}
            className={`${inputClass} resize-y font-mono text-[13px] leading-relaxed`}
          />
        </label>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-lg border border-navy/15 px-4 py-2 font-mono text-[11px] uppercase tracking-mono-button text-navy/60 transition-colors hover:bg-navy/5"
          >
            cancel
          </button>
          <SaveButton />
        </div>
      </form>
    );
  }

  return (
    <div className="rounded-xl border border-navy/10 bg-white/70 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-body text-sm font-semibold text-navy">{template.name}</p>
          {template.summary ? (
            <p className="mt-1 font-body text-xs leading-snug text-navy/55">{template.summary}</p>
          ) : null}
          <p className="mt-2 font-body text-xs text-navy/45">
            title: <span className="text-navy/70">{template.title}</span>
          </p>
          <div className="mt-1">
            <PriceLabel template={template} />
          </div>
        </div>
      </div>

      {expanded ? (
        <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap rounded-lg border border-navy/10 bg-cream/50 p-3 font-mono text-[12px] leading-relaxed text-navy/80">
          {template.body}
        </pre>
      ) : null}

      {drafting ? <DraftForm template={template} /> : null}

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-navy/10 pt-3">
        <button
          type="button"
          onClick={() => {
            setDrafting((v) => !v);
            setExpanded(false);
          }}
          className="rounded-lg bg-copper px-3 py-1.5 font-mono text-[10px] uppercase tracking-mono-button text-cream transition-colors hover:bg-deep-copper"
        >
          {drafting ? 'close' : 'draft pdf'}
        </button>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="rounded-lg border border-navy/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-mono-button text-navy/60 transition-colors hover:bg-navy/5"
        >
          {expanded ? 'hide' : 'view'}
        </button>
        <button
          type="button"
          onClick={copyBody}
          className="rounded-lg border border-navy/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-mono-button text-navy/60 transition-colors hover:bg-navy/5"
        >
          {copied ? 'copied ✓' : 'copy body'}
        </button>
        <button
          type="button"
          onClick={() => {
            setEditing(true);
            setExpanded(false);
          }}
          className="rounded-lg border border-navy/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-mono-button text-navy/60 transition-colors hover:bg-navy/5"
        >
          edit
        </button>
        <form action={duplicateProposalTemplate}>
          <input type="hidden" name="id" value={template.id} />
          <button
            type="submit"
            className="rounded-lg border border-navy/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-mono-button text-navy/60 transition-colors hover:bg-navy/5"
          >
            duplicate
          </button>
        </form>
        <form action={deleteProposalTemplate} className="ml-auto">
          <input type="hidden" name="id" value={template.id} />
          <button
            type="submit"
            className="rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-mono-button text-navy/40 transition-colors hover:text-red-600"
          >
            delete
          </button>
        </form>
      </div>
    </div>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-navy px-4 py-2 font-mono text-[11px] uppercase tracking-mono-button text-cream transition-colors hover:bg-navy-card disabled:opacity-50"
    >
      {pending ? 'saving' : 'save'}
    </button>
  );
}
