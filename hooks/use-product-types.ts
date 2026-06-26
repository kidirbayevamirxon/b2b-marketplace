"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "@/api/product";

export function useProductTypes() {
  return useQuery({
    queryKey: ["product-types"],

    queryFn: async () => {
      const data = await ProductApi.getTypes();

      if (Array.isArray(data)) {
        return data;
      }

      if (Array.isArray(data?.items)) {
        return data.items;
      }

      return [];
    },

    staleTime: 1000 * 60 * 10,
  });
}