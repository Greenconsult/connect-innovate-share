import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSettings,
  saveSettings,
  type SiteSettings,
} from "@/lib/settingsStore";

export const settingsKeys = {
  all: ["site-settings"] as const,
};

export function useSettings() {
  return useQuery({
    queryKey: settingsKeys.all,
    queryFn: getSettings,
    staleTime: 5 * 60 * 1000, // cache for 5 min on public pages
  });
}

export function useSaveSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (settings: SiteSettings) => saveSettings(settings),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: settingsKeys.all });
    },
  });
}
