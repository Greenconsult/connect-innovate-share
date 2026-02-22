import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEvents,
  getEvent,
  getCurrentEvent,
  saveEvent,
  deleteEvent,
  setCurrentEvent,
  type EventData,
} from "@/lib/eventStore";

// ── Query keys ──────────────────────────────────────────────────────

export const eventKeys = {
  all: ["events"] as const,
  detail: (id: string) => ["events", id] as const,
  current: ["events", "current"] as const,
};

// ── Queries ─────────────────────────────────────────────────────────

export function useEvents() {
  return useQuery({
    queryKey: eventKeys.all,
    queryFn: getEvents,
  });
}

export function useEvent(id: string | undefined) {
  return useQuery({
    queryKey: eventKeys.detail(id!),
    queryFn: () => getEvent(id!),
    enabled: !!id,
  });
}

export function useCurrentEvent() {
  return useQuery({
    queryKey: eventKeys.current,
    queryFn: getCurrentEvent,
  });
}

// ── Mutations ───────────────────────────────────────────────────────

export function useSaveEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (event: EventData) => saveEvent(event),
    onSuccess: (_data, event) => {
      qc.invalidateQueries({ queryKey: eventKeys.all });
      qc.invalidateQueries({ queryKey: eventKeys.detail(event.id) });
      qc.invalidateQueries({ queryKey: eventKeys.current });
    },
  });
}

export function useDeleteEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: eventKeys.all });
      qc.invalidateQueries({ queryKey: eventKeys.current });
    },
  });
}

export function useSetCurrentEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => setCurrentEvent(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: eventKeys.all });
      qc.invalidateQueries({ queryKey: eventKeys.current });
    },
  });
}
