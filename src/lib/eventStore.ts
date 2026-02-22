// Event data types and Supabase database helpers

import { supabase } from "./supabase";

// ── Types (unchanged interface shapes for components) ──────────────

export interface Speaker {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  topic: string;
  bio: string;
  imageUrl?: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  affiliation: string;
}

export interface ImportantDate {
  id: string;
  label: string;
  date: string;
  highlight?: boolean;
}

export interface FlyerHighlight {
  id: string;
  icon: string;
  text: string;
}

export interface EventData {
  id: string;
  name: string;
  date: string;
  duration: string;
  venue: string;
  postcode: string;
  phone: string;
  tagline: string;
  audience: string;
  isCurrent: boolean;
  status: "upcoming" | "past";

  speakers: Speaker[];
  schedule: ScheduleItem[];
  committee: CommitteeMember[];

  topics: string[];
  submissionGuidelines: string[];
  importantDates: ImportantDate[];

  flyerHighlights: FlyerHighlight[];
  fundedBy: string;
}

// ── Helpers ─────────────────────────────────────────────────────────

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

/** Map a DB event row + related rows into the app-level EventData shape */
function toEventData(row: any): EventData {
  return {
    id: row.id,
    name: row.name,
    date: row.date,
    duration: row.duration,
    venue: row.venue,
    postcode: row.postcode,
    phone: row.phone,
    tagline: row.tagline,
    audience: row.audience,
    isCurrent: row.is_current,
    status: row.status,
    fundedBy: row.funded_by,
    speakers: (row.speakers ?? []).map((s: any) => ({
      id: s.id,
      name: s.name,
      role: s.role,
      affiliation: s.affiliation,
      topic: s.topic,
      bio: s.bio,
      imageUrl: s.image_url,
    })),
    schedule: (row.schedule_items ?? []).map((s: any) => ({
      id: s.id,
      time: s.time,
      title: s.title,
      description: s.description,
    })),
    committee: (row.committee_members ?? []).map((c: any) => ({
      id: c.id,
      name: c.name,
      role: c.role,
      affiliation: c.affiliation,
    })),
    topics: (row.topics ?? []).map((t: any) => t.text),
    submissionGuidelines: (row.submission_guidelines ?? []).map((g: any) => g.text),
    importantDates: (row.important_dates ?? []).map((d: any) => ({
      id: d.id,
      label: d.label,
      date: d.date,
      highlight: d.highlight,
    })),
    flyerHighlights: (row.flyer_highlights ?? []).map((f: any) => ({
      id: f.id,
      icon: f.icon,
      text: f.text,
    })),
  };
}

const FULL_SELECT = `
  *,
  speakers(*),
  schedule_items(*),
  committee_members(*),
  topics(*),
  submission_guidelines(*),
  important_dates(*),
  flyer_highlights(*)
`;

// ── CRUD functions (all async, backed by Supabase) ──────────────────

export async function getEvents(): Promise<EventData[]> {
  const { data, error } = await supabase
    .from("events")
    .select(FULL_SELECT)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(toEventData);
}

export async function getEvent(id: string): Promise<EventData | undefined> {
  const { data, error } = await supabase
    .from("events")
    .select(FULL_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? toEventData(data) : undefined;
}

export async function getCurrentEvent(): Promise<EventData | undefined> {
  const { data, error } = await supabase
    .from("events")
    .select(FULL_SELECT)
    .eq("is_current", true)
    .maybeSingle();

  if (error) throw error;
  return data ? toEventData(data) : undefined;
}

export async function saveEvent(event: EventData): Promise<void> {
  // Upsert the main event row
  const { error: eventError } = await supabase.from("events").upsert({
    id: event.id,
    name: event.name,
    date: event.date,
    duration: event.duration,
    venue: event.venue,
    postcode: event.postcode,
    phone: event.phone,
    tagline: event.tagline,
    audience: event.audience,
    is_current: event.isCurrent,
    status: event.status,
    funded_by: event.fundedBy,
  });
  if (eventError) throw eventError;

  // Helper: delete all child rows for event, then re-insert
  const replaceChildren = async (
    table: string,
    rows: Record<string, unknown>[]
  ) => {
    await supabase.from(table).delete().eq("event_id", event.id);
    if (rows.length > 0) {
      const { error } = await supabase.from(table).insert(rows);
      if (error) throw error;
    }
  };

  await replaceChildren(
    "speakers",
    event.speakers.map((s) => ({ ...s, event_id: event.id }))
  );
  await replaceChildren(
    "schedule_items",
    event.schedule.map((s) => ({ ...s, event_id: event.id }))
  );
  await replaceChildren(
    "committee_members",
    event.committee.map((c) => ({ ...c, event_id: event.id }))
  );
  await replaceChildren(
    "topics",
    event.topics.map((text, i) => ({
      id: `${event.id}_top${i}`,
      event_id: event.id,
      text,
    }))
  );
  await replaceChildren(
    "submission_guidelines",
    event.submissionGuidelines.map((text, i) => ({
      id: `${event.id}_sg${i}`,
      event_id: event.id,
      text,
    }))
  );
  await replaceChildren(
    "important_dates",
    event.importantDates.map((d) => ({
      ...d,
      highlight: d.highlight ?? false,
      event_id: event.id,
    }))
  );
  await replaceChildren(
    "flyer_highlights",
    event.flyerHighlights.map((f) => ({ ...f, event_id: event.id }))
  );
}

export async function deleteEvent(id: string): Promise<void> {
  // CASCADE on FK will remove child rows automatically
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
}

export async function setCurrentEvent(id: string): Promise<void> {
  // Unset all events first
  const { error: unsetError } = await supabase
    .from("events")
    .update({ is_current: false })
    .neq("id", id);
  if (unsetError) throw unsetError;

  // Set the target event
  const { error: setError } = await supabase
    .from("events")
    .update({ is_current: true })
    .eq("id", id);
  if (setError) throw setError;
}

export function createBlankEvent(): EventData {
  return {
    id: uid(),
    name: "",
    date: "",
    duration: "3 hours",
    venue: "City Campus, University of Wolverhampton",
    postcode: "WV1 1LY",
    phone: "+44 (0)7438 023912",
    tagline: "",
    audience: "UG, PG & Graduates",
    isCurrent: false,
    status: "upcoming",
    speakers: [],
    schedule: [],
    committee: [],
    topics: [],
    submissionGuidelines: [],
    importantDates: [],
    flyerHighlights: [],
    fundedBy: "Funded by the Department of Computing, University of Wolverhampton",
  };
}
