/**
 * Client-safe hitlist constants and types. Kept separate from the server-only
 * data module so client components (the board and composer) can import the
 * stage list without pulling the service-role client into the browser bundle.
 */
import type { Database, HitlistStatus } from './database.types';

export type { HitlistStatus } from './database.types';
export type HitlistProspect = Database['public']['Tables']['hitlist_prospects']['Row'];

// The chase, left to right: someone we want to reach → we reached out → we are
// talking → it landed / it did not.
export const HITLIST_STATUSES: HitlistStatus[] = [
  'to_reach',
  'reached_out',
  'in_talks',
  'won',
  'passed',
];

// Human labels for the columns and the short line under each heading.
export const HITLIST_LABELS: Record<HitlistStatus, string> = {
  to_reach: 'to reach',
  reached_out: 'reached out',
  in_talks: 'in talks',
  won: 'won',
  passed: 'passed',
};

export const HITLIST_COPY: Record<HitlistStatus, string> = {
  to_reach: 'on the radar',
  reached_out: 'ball in their court',
  in_talks: 'live conversation',
  won: 'became a client',
  passed: 'not this time',
};
