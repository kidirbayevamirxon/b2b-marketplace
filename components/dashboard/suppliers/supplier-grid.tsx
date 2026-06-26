"use client";

import { SupplierCard } from "./supplier-card";

export function SupplierGrid({
  loading,
  products,
}: any) {

  if (loading)
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

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {products.map((product: any) => (
        <SupplierCard
          key={product.id}
          product={product}
        />
      ))}

    </div>
  );
}