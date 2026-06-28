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

  updateOrder: async (id: string, payload: { status?: string }) => {
    const { data } = await api.patch(`/orders/${id}`, payload);
    return data;
  },

  deleteOrder: async (id: string) => {
    const { data } = await api.delete(`/orders/${id}`);
    return data;
  },
};