"use client";

import {
  Boxes,
  AlertTriangle,
  Package,
  TrendingUp,
  Search,
  Plus,
} from "lucide-react";

import { useState } from "react";

const inventory = [
  {
    id: 1,
    name: "Coca Cola 1L",
    sku: "CC-001",
    stock: 240,
    min: 50,
    warehouse: "Main",
    status: "In Stock",
  },
  {
    id: 2,
    name: "Pepsi 1L",
    sku: "PP-002",
    stock: 32,
    min: 50,
    warehouse: "Main",
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Fanta Orange",
    sku: "FT-003",
    stock: 0,
    min: 20,
    warehouse: "Warehouse B",
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Sprite",
    sku: "SP-004",
    stock: 580,
    min: 100,
    warehouse: "Warehouse A",
    status: "In Stock",
  },
];

export default function InventoryPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Inventory
          </h1>

          <p className="text-muted-foreground">
            Monitor stock levels across warehouses.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-white">
          <Plus size={18} />
          Add Stock
        </button>

      </div>

      <div className="grid gap-5 md:grid-cols-4">

        <Card
          title="Products"
          value="1,245"
          icon={<Boxes size={22} />}
        />

        <Card
          title="In Stock"
          value="1,082"
          icon={<Package size={22} />}
        />

        <Card
          title="Low Stock"
          value="42"
          icon={<AlertTriangle size={22} />}
        />

        <Card
          title="Stock Value"
          value="$52,400"
          icon={<TrendingUp size={22} />}
        />

      </div>

      <div className="rounded-2xl border bg-card p-5">

        <div className="relative mb-6">

          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <input
            className="w-full rounded-xl border bg-background py-3 pl-10 pr-4 outline-none"
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">Product</th>

                <th>SKU</th>

                <th>Warehouse</th>

                <th>Stock</th>

                <th>Minimum</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {inventory
                .filter((item) =>
                  item.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-muted/40"
                  >
                    <td className="py-4 font-medium">
                      {item.name}
                    </td>

                    <td>{item.sku}</td>

                    <td>{item.warehouse}</td>

                    <td>{item.stock}</td>

                    <td>{item.min}</td>

                    <td>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "In Stock"
                            ? "bg-green-500/15 text-green-500"
                            : item.status === "Low Stock"
                            ? "bg-yellow-500/15 text-yellow-500"
                            : "bg-red-500/15 text-red-500"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>
                ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5">

      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>

    </div>
  );
}