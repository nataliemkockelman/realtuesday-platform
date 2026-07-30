/**
 * TypeScript shape of the /admin data layer, hand-written to match
 * `supabase/schema.sql`. When Supabase CLI is linked to the project you can
 * regenerate this file with:
 *
 *   supabase gen types typescript --project-id <ref> > lib/database.types.ts
 *
 * Until then, keep this in sync with schema.sql by hand. Money is in whole
 * cents (bigint → number). Time is in whole minutes.
 */

export type ClientStatus = 'lead' | 'qualified' | 'active' | 'dormant' | 'lost';
export type ProposalStatus = 'draft' | 'sent' | 'accepted' | 'declined' | 'expired';
export type BillingType = 'fixed' | 'hourly' | 'retainer';
export type EngagementStatus = 'active' | 'paused' | 'complete' | 'archived';
export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'void';
export type InviteStatus = 'pending' | 'accepted' | 'revoked';

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string;
          name: string;
          company: string | null;
          email: string | null;
          status: ClientStatus;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          company?: string | null;
          email?: string | null;
          status?: ClientStatus;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['clients']['Insert']>;
        Relationships: [];
      };
      proposals: {
        Row: {
          id: string;
          client_id: string;
          title: string;
          status: ProposalStatus;
          amount_cents: number | null;
          sent_at: string | null;
          decided_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          title: string;
          status?: ProposalStatus;
          amount_cents?: number | null;
          sent_at?: string | null;
          decided_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['proposals']['Insert']>;
        Relationships: [];
      };
      engagements: {
        Row: {
          id: string;
          client_id: string;
          proposal_id: string | null;
          name: string;
          status: EngagementStatus;
          billing_type: BillingType;
          rate_cents: number | null;
          quoted_amount_cents: number | null;
          quoted_hours: number | null;
          started_at: string | null;
          ended_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          proposal_id?: string | null;
          name: string;
          status?: EngagementStatus;
          billing_type?: BillingType;
          rate_cents?: number | null;
          quoted_amount_cents?: number | null;
          quoted_hours?: number | null;
          started_at?: string | null;
          ended_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['engagements']['Insert']>;
        Relationships: [];
      };
      tasks: {
        Row: {
          id: string;
          engagement_id: string | null;
          title: string;
          status: TaskStatus;
          due_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          engagement_id?: string | null;
          title: string;
          status?: TaskStatus;
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['tasks']['Insert']>;
        Relationships: [];
      };
      time_entries: {
        Row: {
          id: string;
          engagement_id: string;
          description: string | null;
          minutes: number;
          billable: boolean;
          logged_on: string;
          invoice_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          engagement_id: string;
          description?: string | null;
          minutes: number;
          billable?: boolean;
          logged_on?: string;
          invoice_id?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['time_entries']['Insert']>;
        Relationships: [];
      };
      invoices: {
        Row: {
          id: string;
          client_id: string;
          engagement_id: string | null;
          number: string | null;
          status: InvoiceStatus;
          amount_cents: number;
          issued_on: string | null;
          due_on: string | null;
          paid_on: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          engagement_id?: string | null;
          number?: string | null;
          status?: InvoiceStatus;
          amount_cents?: number;
          issued_on?: string | null;
          due_on?: string | null;
          paid_on?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['invoices']['Insert']>;
        Relationships: [];
      };
      invoice_line_items: {
        Row: {
          id: string;
          invoice_id: string;
          description: string;
          quantity: number;
          unit_cents: number;
          amount_cents: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          invoice_id: string;
          description: string;
          quantity?: number;
          unit_cents?: number;
          amount_cents?: number;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['invoice_line_items']['Insert']>;
        Relationships: [];
      };
      portal_users: {
        Row: {
          user_id: string;
          client_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          client_id: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['portal_users']['Insert']>;
        Relationships: [];
      };
      portal_invites: {
        Row: {
          id: string;
          client_id: string;
          email: string;
          token: string;
          status: InviteStatus;
          created_at: string;
          accepted_at: string | null;
          expires_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          email: string;
          token: string;
          status?: InviteStatus;
          created_at?: string;
          accepted_at?: string | null;
          expires_at?: string;
        };
        Update: Partial<Database['public']['Tables']['portal_invites']['Insert']>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      client_status: ClientStatus;
      proposal_status: ProposalStatus;
      billing_type: BillingType;
      engagement_status: EngagementStatus;
      task_status: TaskStatus;
      invoice_status: InvoiceStatus;
      invite_status: InviteStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
