import { useQuery } from "@tanstack/react-query";
import { OrderService } from "@/services/order.service";

export function useOrders(page = 1) {
  return useQuery({
    queryKey: ["orders", page],
    queryFn: () => OrderService.getMyOrders(page),
  });
}