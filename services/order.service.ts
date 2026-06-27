import { api } from "@/api/api";

export const OrderService = {
  getMyOrders: async (page = 1) => {
    const { data } = await api.get("/orders/me", {
      params: {
        page,
        limit: 10,
      },
    });

    return data;
  },
};