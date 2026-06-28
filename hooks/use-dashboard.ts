import { useQuery } from "@tanstack/react-query";
import { AnalyticsService } from "@/services/analytics.service";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: AnalyticsService.dashboard,
  });
}