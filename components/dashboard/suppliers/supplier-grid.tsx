"use client";

import { SupplierCard } from "./supplier-card";

export function SupplierGrid({
  loading,
  products,
  onBuyNow,    // <-- Добавить
  isPending,   // <-- Добавить
}: any) {

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-96 rounded-2xl animate-pulse bg-muted"
          />
        ))}
      </div>
    );
  }

  // Добавить проверку на пустой массив
  if (!products || products.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border bg-card">
        <p className="text-muted-foreground">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product: any) => (
        <SupplierCard
          key={product.id}
          product={product}
          onBuyNow={onBuyNow}    // <-- Передать
          isPending={isPending}   // <-- Передать
        />
      ))}
    </div>
  );
}