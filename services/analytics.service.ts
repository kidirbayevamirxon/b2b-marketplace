import { api } from "@/api/api";

export const AnalyticsService = {
  dashboard: async () => {
    const { data } = await api.get("/analytics/dashboard");
    return data;
  },
};