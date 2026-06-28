"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "@/api/product";

function normalizeProductTypes(payload: any) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.product_types)) return payload.product_types;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.product_types)) return payload.data.product_types;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

export function useProductTypes() {
  return useQuery({
    queryKey: ["product-types"],
    queryFn: async () => {
      console.log("GET PRODUCT TYPES");

      const res = await ProductApi.getProductTypes();

      console.log(res);

      return res.product_types ?? [];
    },
  });
}