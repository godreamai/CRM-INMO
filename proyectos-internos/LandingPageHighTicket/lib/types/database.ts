export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          alias: string
          name: string
          owner_email: string
          owner_name: string
          created_at: string
          updated_at: string
          status: string
          plan: string
          settings: Record<string, any>
        }
        Insert: Omit<
          Database['public']['Tables']['organizations']['Row'],
          'id' | 'created_at' | 'updated_at'
        >
        Update: Partial<
          Database['public']['Tables']['organizations']['Insert']
        >
      }
      users: {
        Row: {
          id: string
          organization_id: string
          email: string
          name: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['users']['Row'],
          'id' | 'created_at' | 'updated_at'
        >
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      leads: {
        Row: {
          id: string
          organization_id: string
          nombre: string
          email: string | null
          telefono: string | null
          tipo_negocio: string | null
          principal_obstaculo: string | null
          urgencia: string | null
          source: string | null
          status: string
          assigned_to: string | null
          notes: string | null
          score: number
          metadata: Record<string, any>
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['leads']['Row'],
          'id' | 'created_at' | 'updated_at' | 'score'
        >
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }
      conversations: {
        Row: {
          id: string
          organization_id: string
          lead_id: string | null
          session_id: string | null
          messages: any[]
          metadata: Record<string, any>
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['conversations']['Row'],
          'id' | 'created_at' | 'updated_at'
        >
        Update: Partial<
          Database['public']['Tables']['conversations']['Insert']
        >
      }
      tasks: {
        Row: {
          id: string
          organization_id: string
          lead_id: string | null
          assigned_to: string | null
          title: string
          description: string | null
          due_date: string | null
          completed: boolean
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['tasks']['Row'],
          'id' | 'created_at' | 'updated_at' | 'completed'
        >
        Update: Partial<Database['public']['Tables']['tasks']['Insert']>
      }
      workflows: {
        Row: {
          id: string
          organization_id: string
          name: string
          trigger_type: string
          trigger_conditions: Record<string, any>
          actions: any[]
          enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['workflows']['Row'],
          'id' | 'created_at' | 'updated_at' | 'enabled'
        >
        Update: Partial<
          Database['public']['Tables']['workflows']['Insert']
        >
      }
    }
  }
}







