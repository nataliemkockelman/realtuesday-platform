/**
 * Presentation helpers for the /admin dashboard. The database stores money in
 * whole cents and durations in whole minutes; these turn those into the
 * strings a human reads. Dates render in US Central, where the studio operates.
 */

const STUDIO_TZ = 'America/Chicago';

/** 125000 → "$1,250". Whole dollars unless there are stray cents. */
export function formatCents(cents: number | null | undefined): string {
  if (cents == null) return '$0';
  const dollars = cents / 100;
  const hasCents = cents % 100 !== 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(dollars);
}

/** 90 → "1.5h". Trims a trailing ".0". */
export function formatMinutesAsHours(minutes: number | null | undefined): string {
  if (!minutes) return '0h';
  const hours = minutes / 60;
  const rounded = Math.round(hours * 10) / 10;
  return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1)}h`;
}

/** ISO date/timestamp → "Jul 6, 2026" in Central time. Empty string if null. */
export function formatDate(value: string | null | undefined): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    timeZone: STUDIO_TZ,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/** Whole percent from a 0..1 ratio. 0.62 → "62%". */
export function formatPercent(ratio: number | null | undefined): string {
  if (ratio == null) return '0%';
  return `${Math.round(ratio * 100)}%`;
}
