/**
 * Client-safe roadmap constants and types. Kept separate from collab-data.ts
 * (which is server-only) so client components — the roadmap composer and card —
 * can import the column list without pulling the service-role client into the
 * browser bundle.
 */
import type { Database, RoadmapStatus } from './database.types';

export type { RoadmapStatus } from './database.types';
export type RoadmapItem = Database['public']['Tables']['roadmap_items']['Row'];

export const ROADMAP_STATUSES: RoadmapStatus[] = ['now', 'next', 'later', 'done'];
