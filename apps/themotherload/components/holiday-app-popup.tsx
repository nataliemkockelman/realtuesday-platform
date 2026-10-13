'use client';

import { useEffect, useState } from 'react';

const HOLIDAY_APP_URL = 'https://holiday.arealtuesday.com';
const SESSION_KEY = 'holiday-app-popup-seen';
const SHOW_DELAY_MS = 1200;

/**
 * One-shot popup promoting the Holiday App. Rendered in Nav alongside
 * HolidayAppBanner — the banner is a persistent reminder, this is a
 * harder-to-miss, one-time nudge for new visitors.
 *
 * Gated on sessionStorage: Nav is rendered per-page (no shared layout), so
 * without a gate this would remount and reopen on every single page
 * navigation. Shows once per browser session, then stays quiet; a fresh
 * tab/session shows it again.
 *
 * Dismiss via the X, the backdrop, Escape, "Maybe later," or by clicking
 * through to the app — all six mark it seen for the session.
 */
export function HolidayAppPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || sessionStorage.getItem(SESSION_KEY)) return;
    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, '1');
  };

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dismiss();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="holiday-app-popup-title"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/80 px-6 backdrop-blur-sm"
      onClick={dismiss}
    >
      <div
        className="relative w-full max-w-sm rounded-lg border border-coral/20 bg-navy px-7 py-9 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={dismiss}
          className="absolute right-4 top-4 font-mono text-xs text-cream/60 outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-coral"
        >
          ✕
        </button>

        <p className="eyebrow-mono mb-3 text-coral-light">live now</p>
        <h2
          id="holiday-app-popup-title"
          className="font-ml-display text-3xl italic leading-tight text-cream"
        >
          The Holiday App is here.
        </h2>
        <p className="mt-3 font-serif text-[15px] italic leading-relaxed text-blush">
          Wishlists, budgets, and secret gifts for the whole family &mdash; one private board,
          plan the whole season without anyone seeing it coming.
        </p>

        <a
          href={HOLIDAY_APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={dismiss}
          className="mt-6 inline-flex items-center gap-2 bg-coral px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-navy transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
        >
          Get started
          <span aria-hidden="true">&rarr;</span>
        </a>

        <button
          type="button"
          onClick={dismiss}
          className="mt-4 block w-full font-mono text-[10px] uppercase tracking-mono-label text-cream/40 transition-opacity hover:opacity-70"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
