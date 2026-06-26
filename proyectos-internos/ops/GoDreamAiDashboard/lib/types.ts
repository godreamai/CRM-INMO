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

export type ContentTipo    = 'reel' | 'carrusel' | 'historia' | 'post_ig' | 'post_linkedin';
export type ContentPilar   = 'DOLOR' | 'TRANSFORMACION' | 'AUTORIDAD' | 'OBJECION' | 'FUNDADOR';
export type ContentEstado  = 'borrador' | 'aprobado' | 'publicado';
export type ContentFormato = 'cara_camara' | 'pantalla' | 'carrusel_diseno' | 'solo_texto';

export interface ContentItem {
  id: string;
  tipo: ContentTipo;
  pilar: ContentPilar;
  fecha_publicacion: string;
  estado: ContentEstado;
  hook: string;
  agitacion: string | null;
  reencuadre: string | null;
  sistema: string | null;
  cta: string | null;
  caption: string | null;
  hashtags: string[] | null;
  descripcion_visual: string | null;
  formato_produccion: ContentFormato | null;
  guion: string | null;
  duracion_seg: number | null;
  slides: Record<string, unknown>[] | null;
  secuencia: Record<string, unknown>[] | null;
  imagen_url: string | null;
  prompt_imagen: string | null;
  created_at: string;
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
