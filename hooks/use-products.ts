"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";

export function useProducts(page = 1, search = "") {
  const role =
    typeof window !== "undefined"
      ? localStorage.getItem("role")
      : null;

  return useQuery({
    queryKey: ["products", page, search, role],

    queryFn: async () => {
      const endpoint =
        role === "admin"
          ? "/catalog/products"
          : "/catalog/products/me";

      const { data } = await api.get(endpoint, {
        params: {
          page,
          limit: 10,
          search,
        },
      });

      return data;
    },
  });
}