/**
 * Shared definitions for the website intake form.
 *
 * Used by the public /start form, its server action, and the /admin/intake
 * review page, so this module stays framework-neutral (no 'server-only', no
 * React). It is the single source of truth for the budget choices, the triage
 * statuses, and the field labels the admin renders.
 */

import type { IntakeStatus } from './database.types';

/** Budget bands offered on the public form. Value is stored verbatim. */
export const BUDGET_OPTIONS = [
  'under $3k',
  '$3k–5k',
  '$5k–10k',
  '$10k+',
  'not sure, need guidance',
] as const;

export type BudgetOption = (typeof BUDGET_OPTIONS)[number];

/** Triage statuses, in the order they move through. */
export const INTAKE_STATUSES: IntakeStatus[] = ['new', 'reviewing', 'quoted', 'archived'];

/**
 * The condensed answer fields, in display order, with the human label the
 * admin review page shows above each answer. Contact identity (name, email,
 * company, phone) is rendered separately, so it is not in this list.
 */
export const INTAKE_FIELDS = [
  { key: 'business_type', label: 'what the business does' },
  { key: 'primary_goal', label: 'the one thing the site should do' },
  { key: 'current_site', label: 'current site' },
  { key: 'domain_status', label: 'domain' },
  { key: 'budget_range', label: 'budget' },
  { key: 'timeline', label: 'timeline / deadline' },
  { key: 'beyond_website', label: 'where else time gets lost' },
  { key: 'message', label: 'anything else' },
] as const satisfies ReadonlyArray<{ key: string; label: string }>;

export type IntakeFieldKey = (typeof INTAKE_FIELDS)[number]['key'];
