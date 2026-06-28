"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ProductApi,
} from "@/api/product";
export interface CreateProductDto {
  product_type_id: string;
  name: string;
  brand?: string;
  package_size?: string;
  description?: string;
  image_url?: string;
  keywords?: string[];
  stock_quantity: number;
  unit_price: number;
  discount_price?: number;
  minimum_order_quantity: number;
  is_active: boolean;
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductDto) =>
      ProductApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}