"use client";

import { useEffect, useState } from "react";
import { OrderService } from "@/services/order.service";
import OrdersStats from "./orders-stats";
import OrdersToolbar from "./orders-toolbar";
import OrdersTable from "./orders-table";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const data = await OrderService.getMyOrders();
    setOrders(data?.items ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await OrderService.updateOrder(id, { status });
    fetchOrders();
  };

  const deleteOrder = async (id: string) => {
    await OrderService.deleteOrder(id);
    fetchOrders();
  };

  return (
    <div className="p-6 space-y-6">
      <OrdersStats orders={orders} />
      {/* <OrdersToolbar /> */}

      <OrdersTable
        orders={orders}
        loading={loading}
        onUpdateStatus={updateStatus}
        onDelete={deleteOrder}
      />
    </div>
  );
}