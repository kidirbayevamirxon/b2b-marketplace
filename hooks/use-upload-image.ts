"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProductApi } from "@/api/product";

export function useUploadImage() {
  return useMutation({
    mutationFn: (file: File) =>
      ProductApi.upload(file),

    onError() {
      toast.error("Image upload failed");
    },
  });
}