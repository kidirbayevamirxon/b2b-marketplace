"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";

export function useMarketProducts(page = 1, search = "") {
  return useQuery({
    queryKey: ["market-products", page, search],

    queryFn: async () => {
      const { data } = await api.get("/catalog/products", {
        params: {
          page,
          limit: 12,
          search,
        },
      });

      return data;
    },
  });
}