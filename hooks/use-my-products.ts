"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "@/api/product";

export function useMyProducts() {
  return useQuery({
    queryKey: ["my-products"],
    queryFn: async () => {
      const res = await ProductApi.my();
      return res.data.products;
    },
  });
}