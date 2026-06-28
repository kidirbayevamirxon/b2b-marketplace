// hooks/use-create-order.ts
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/api/api";

interface OrderData {
  product_id: string;
  quantity: number;
  delivery_address: string;
  contact_phone: string;
  delivery_latitude: number;
  delivery_longitude: number;
  delivery_date: string;
  payment_method: string;
  notes?: string;
}

interface UseCreateOrderReturn {
  createOrder: (data: OrderData) => Promise<void>;
  isPending: boolean;
  error: Error | null;
}

export function useCreateOrder(): UseCreateOrderReturn {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createOrder = async (orderData: OrderData) => {
    setIsPending(true);
    setError(null);

    try {
      const response = await api.post("/orders", orderData);
      
      toast.success("Order created successfully!");
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Something went wrong";
      setError(new Error(errorMessage));
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsPending(false);
    }
  };

  return { createOrder, isPending, error };
}