"use client";

import { useState } from "react";

import { SupplierToolbar } from "@/components/dashboard/suppliers/supplier-toolbar";
import { SupplierGrid } from "@/components/dashboard/suppliers/supplier-grid";

import { useMarketProducts } from "@/hooks/use-market-products";

export default function SuppliersPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading } =
    useMarketProducts(1, search);

  return (
    <div className="space-y-8">

      <SupplierToolbar
        search={search}
        onSearch={setSearch}
      />

      <SupplierGrid
        loading={isLoading}
        products={data?.items ?? []}
      />

    </div>
  );
}