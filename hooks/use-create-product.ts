"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ProductApi,
  type CreateProductDto,
} from "@/api/product";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductDto) =>
      ProductApi.create(data),

    onSuccess: () => {
      toast.success("Product created successfully");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: () => {
      toast.error("Failed to create product");
    },
  });
}