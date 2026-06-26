"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/api";
import { toast } from "sonner";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/catalog/products/${id}`);
    },

    onSuccess: () => {
      toast.success("Product deleted");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: () => {
      toast.error("Delete failed");
    },
  });
}