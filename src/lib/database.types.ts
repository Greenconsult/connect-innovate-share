export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          name: string;
          date: string;
          duration: string;
          venue: string;
          postcode: string;
          phone: string;
          tagline: string;
          audience: string;
          is_current: boolean;
          status: "upcoming" | "past";
          funded_by: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["events"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>;
      };
      speakers: {
        Row: {
          id: string;
          event_id: string;
          name: string;
          role: string;
          affiliation: string;
          topic: string;
          bio: string;
          image_url?: string | null;
        };
        Insert: Database["public"]["Tables"]["speakers"]["Row"];
        Update: Partial<Database["public"]["Tables"]["speakers"]["Insert"]>;
      };
      schedule_items: {
        Row: {
          id: string;
          event_id: string;
          time: string;
          title: string;
          description: string;
        };
        Insert: Database["public"]["Tables"]["schedule_items"]["Row"];
        Update: Partial<Database["public"]["Tables"]["schedule_items"]["Insert"]>;
      };
      committee_members: {
        Row: {
          id: string;
          event_id: string;
          name: string;
          role: string;
          affiliation: string;
        };
        Insert: Database["public"]["Tables"]["committee_members"]["Row"];
        Update: Partial<Database["public"]["Tables"]["committee_members"]["Insert"]>;
      };
      important_dates: {
        Row: {
          id: string;
          event_id: string;
          label: string;
          date: string;
          highlight: boolean;
        };
        Insert: Database["public"]["Tables"]["important_dates"]["Row"];
        Update: Partial<Database["public"]["Tables"]["important_dates"]["Insert"]>;
      };
      flyer_highlights: {
        Row: {
          id: string;
          event_id: string;
          icon: string;
          text: string;
        };
        Insert: Database["public"]["Tables"]["flyer_highlights"]["Row"];
        Update: Partial<Database["public"]["Tables"]["flyer_highlights"]["Insert"]>;
      };
      topics: {
        Row: {
          id: string;
          event_id: string;
          text: string;
        };
        Insert: Database["public"]["Tables"]["topics"]["Row"];
        Update: Partial<Database["public"]["Tables"]["topics"]["Insert"]>;
      };
      submission_guidelines: {
        Row: {
          id: string;
          event_id: string;
          text: string;
        };
        Insert: Database["public"]["Tables"]["submission_guidelines"]["Row"];
        Update: Partial<Database["public"]["Tables"]["submission_guidelines"]["Insert"]>;
      };
      site_settings: {
        Row: {
          id: string;
          settings: Record<string, unknown>;
          updated_at: string;
        };
        Insert: Database["public"]["Tables"]["site_settings"]["Row"];
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
