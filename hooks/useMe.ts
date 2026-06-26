// hooks/useMe.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data.account;
    },
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
}