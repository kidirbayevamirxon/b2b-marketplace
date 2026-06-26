"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductApi } from "@/api/product";
import { toast } from "sonner";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: any;
    }) => ProductApi.update(id, data),

    onSuccess() {
      toast.success("Product updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError() {
      toast.error("Failed to update product");
    },
  });
}