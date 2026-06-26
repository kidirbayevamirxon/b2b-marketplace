"use client";

import { useState } from "react";
import { Package, Boxes, AlertTriangle, Layers3 } from "lucide-react";

import { ProductToolbar } from "@/components/dashboard/products/product-toolbar";
import { ProductTable } from "@/components/dashboard/products/product-table";
import { useProducts } from "@/hooks/use-products";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useProducts(page, search);

  const products = data?.items ?? [];

  const total = data?.total ?? 0;

  const inStock = products.filter((i: any) => i.stock_quantity > 0).length;

  const lowStock = products.filter(
    (i: any) => i.stock_quantity > 0 && i.stock_quantity < 10
  ).length;

  const categories = new Set(
    products.map((i: any) => i.product_type?.name)
  ).size;

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-muted-foreground mt-1">
          Manage all products in your marketplace
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Products"
          value={total}
          icon={<Package className="w-5 h-5" />}
        />

        <StatCard
          title="In Stock"
          value={inStock}
          icon={<Boxes className="w-5 h-5" />}
        />

        <StatCard
          title="Low Stock"
          value={lowStock}
          icon={<AlertTriangle className="w-5 h-5" />}
        />

        <StatCard
          title="Categories"
          value={categories}
          icon={<Layers3 className="w-5 h-5" />}
        />

      </div>

      <ProductToolbar
        search={search}
        onSearch={setSearch}
      />

      <ProductTable
        loading={isLoading}
        products={products}
        page={page}
        total={total}
        onPageChange={setPage}
      />

    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          {icon}
        </div>

      </div>

    </div>
  );
}