import { api } from "@/api/api";

export const FirmaService = {
  getProfile: async () => {
    const { data } = await api.get("/catalog/firma-profile/me");
    return data;
  },

  updateProfile: async (body: any) => {
    const { data } = await api.put(
      "/catalog/firma-profile",
      body
    );

    return data;
  },
};