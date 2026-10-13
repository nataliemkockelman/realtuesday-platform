'use client';

import { useEffect, useState } from 'react';

/**
 * Holiday ad popup — same SOS stopgap as <HolidayAdBanner> in app/page.tsx,
 * but impossible to miss: a centered red/gold-foil card that appears a beat
 * after the homepage loads, aimed at Instagram ad traffic that got sent here
 * instead of the Holiday Gift Planner it's actually advertising.
 *
 * Dismissible and only shown once per browser session (sessionStorage) —
 * organic B2B visitors who close it won't see it again on the next page,
 * and it never blocks interaction with the rest of the site.
 *
 * Remove this component (and its import in app/page.tsx) once the
 * Instagram ad's destination link is fixed at the source.
 */

const DISMISSED_KEY = 'holiday-promo-dismissed';

export function HolidayPromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISSED_KEY)) return;
    const timer = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setOpen(false);
    sessionStorage.setItem(DISMISSED_KEY, '1');
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/80 p-4 backdrop-blur-sm"
      onClick={dismiss}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="holiday-promo-heading"
        className="holiday-foil-gold w-full max-w-md rounded-2xl p-[3px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="holiday-foil-red relative rounded-[14px] px-6 py-9 text-center sm:px-10 sm:py-11">
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none text-cream/80 transition-opacity hover:opacity-70"
          >
            ×
          </button>

          <p className="mb-3 font-mono text-[10px] uppercase tracking-mono-eyebrow text-soft-gold">
            🎁 you&apos;re one click away
          </p>
          <h2
            id="holiday-promo-heading"
            className="mb-3 font-display text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] lowercase text-cream sm:text-[34px]"
          >
            looking for the Holiday Gift Planner?
          </h2>
          <p className="mx-auto mb-6 max-w-[34ch] font-body text-[15px] leading-[1.5] text-cream/85">
            That ad was for our gift-tracking app, not this site. Hop over and we&apos;ll have
            your discount ready.
          </p>

          <a
            href="https://holiday.arealtuesday.com"
            className="inline-block w-full rounded bg-cream px-7 py-4 font-mono text-[12px] font-bold uppercase tracking-mono-button text-deep-copper no-underline sm:w-auto"
          >
            take me there — code 10FOR10 →
          </a>

          <button
            type="button"
            onClick={dismiss}
            className="mt-5 block w-full font-mono text-[10px] uppercase tracking-mono-label text-cream/60 underline-offset-2 hover:underline"
          >
            not what I&apos;m looking for
          </button>
        </div>
      </div>
    </div>
  );
}
