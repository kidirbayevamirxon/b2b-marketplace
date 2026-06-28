"use client";

import { useState } from "react";

import { SupplierToolbar } from "@/components/dashboard/suppliers/supplier-toolbar";
import { SupplierGrid } from "@/components/dashboard/suppliers/supplier-grid";

import { useMarketProducts } from "@/hooks/use-market-products";
import { useCreateOrder } from "@/hooks/use-create-order";

export default function SuppliersPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useMarketProducts(1, search);
  const { createOrder, isPending } = useCreateOrder();

  const handleBuyNow = async (orderData: { product_id: string; quantity: number }) => {
    try {
      // Собираем все необходимые данные для заказа
      // Здесь вам нужно получить остальные поля из формы или контекста
      const fullOrderData = {
        product_id: orderData.product_id,
        quantity: orderData.quantity,
        delivery_address: "Your delivery address", // TODO: Получить из формы
        contact_phone: "+998901234567", // TODO: Получить из формы
        delivery_latitude: 41.2995,
        delivery_longitude: 69.2401,
        delivery_date: new Date().toISOString().split('T')[0],
        payment_method: "cash",
        notes: "",
      };

      await createOrder(fullOrderData);
      
      // После успешного создания можно показать уведомление или редирект
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  const products = data?.products ?? data?.items ?? [];

  return (
    <div className="space-y-8">
      <SupplierToolbar
        search={search}
        onSearch={setSearch}
      />

      <SupplierGrid
        loading={isLoading}
        products={products}
        onBuyNow={handleBuyNow}
        isPending={isPending}
      />
    </div>
  );
}