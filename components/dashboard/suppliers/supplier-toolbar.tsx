"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SupplierToolbar({
  search,
  onSearch,
}: any) {
  return (
    <div className="rounded-2xl border bg-card p-8">

      <h1 className="text-3xl font-bold">
        Marketplace
      </h1>

      <p className="text-muted-foreground mt-2">
        Buy directly from verified suppliers
      </p>

      <div className="relative mt-6">

        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground"/>

        <Input
          className="pl-10 h-12"
          placeholder="Search products..."
          value={search}
          onChange={(e)=>onSearch(e.target.value)}
        />

      </div>

    </div>
  );
}