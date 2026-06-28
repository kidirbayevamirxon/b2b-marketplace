import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FirmaService } from "@/services/firma.service";
import { toast } from "sonner";

export function useUpdateFirmaProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: FirmaService.updateProfile,

    onSuccess() {
      toast.success("Profile updated");

      queryClient.invalidateQueries({
        queryKey: ["firma-profile"],
      });
    },
  });
}