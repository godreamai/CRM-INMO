export type OpportunityState =
  | 'nuevo'
  | 'conexion'
  | 'mensaje'
  | 'conversacion'
  | 'agenda'
  | 'r1'
  | 'r2'
  | 'cliente'
  | 'seguimiento'
  | 'descalificado'
  | 'rechazado';

export const OPPORTUNITY_STATE_LABELS: Record<OpportunityState, string> = {
  nuevo: 'Nuevo',
  conexion: 'Conexión',
  mensaje: 'Mensaje',
  conversacion: 'Conversación',
  agenda: 'Agenda',
  r1: 'R1',
  r2: 'R2',
  cliente: 'Cliente',
  seguimiento: 'Seguimiento',
  descalificado: 'No cualificado',
  rechazado: 'Rechazado',
};

export interface Business {
  id: string; // uuid
  name: string;
  description: string | null;
  primary_industry: string | null;
  size: string | null;
  type: string | null;
  location: string | null;
  country: string | null;
  domain: string | null;
  linkedin_url: string | null;
  oportunidad_priorizada: string | null;
  created_at: string; // timestamptz
}

export interface DecisionMaker {
  id: string; // uuid
  business_id: string; // uuid
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  job_title: string | null;
  location: string | null;
  company_domain: string | null;
  linkedin_profile: string | null;
  sdr_assigned: string | null;
  state: OpportunityState | string | null;
  created_at: string; // timestamptz
  businesses?: Business;
}

export interface Database {
  public: {
    Tables: {
      businesses: {
        Row: Business;
        Insert: Omit<Business, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Business, 'id' | 'created_at'>>;
      };
      decision_makers: {
        Row: DecisionMaker;
        Insert: Omit<DecisionMaker, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<DecisionMaker, 'id' | 'created_at'>>;
      };
    };
  };
}

export type ContentStatus = 'idea' | 'draft' | 'scheduled' | 'published' | 'cancelled';
export type ContentType = 'video' | 'carousel' | 'image' | 'thread' | 'article';

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  publish_date: string;
  author: string;
  drive_link?: string;
  tags: string[];
  hook: string | null;
  copy: string | null;
  cta: string | null;
  notes: string | null;
  week: string | null;
  objective: string | null;
  created_at?: string;
}

export interface OpportunityHistory {
  id: string;
  opportunity_id: string;
  old_state: string | null;
  new_state: string;
  changed_at: string;
  changed_by: string | null;
  full_name?: string; // For join displays
}

export interface AlertSetting {
  id: string;
  state: OpportunityState | string;
  days_limit: number;
  severity: 'low' | 'medium' | 'high';
  alert_message?: string;
}

export interface MetricsSummary {
  totalOpportunities: number;
  schedulingRate: number; // (agenda / total)
  closingRate: number;    // (cliente / total)
  unqualifiedRate: number; // (descalificado / total)
  totalInFlow: number;    // Excluyendo rechazados y descalificados
}

export interface OpportunityNote {
  id: string;
  opportunity_id: string;
  text: string;
  user_id: string | null;
  user_name: string;
  created_at: string;
}
