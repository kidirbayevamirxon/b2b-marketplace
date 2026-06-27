import { useQuery } from "@tanstack/react-query";
import { AnalyticsService } from "@/services/analytics.service";

export function useDashboardAnalytics() {
  return useQuery({
    queryKey: ["dashboard-analytics"],
    queryFn: AnalyticsService.dashboard,
  });
}