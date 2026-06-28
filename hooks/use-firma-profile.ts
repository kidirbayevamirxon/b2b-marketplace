import { useQuery } from "@tanstack/react-query";
import { FirmaService } from "@/services/firma.service";

export function useFirmaProfile() {
  return useQuery({
    queryKey: ["firma-profile"],
    queryFn: FirmaService.getProfile,
  });
}