"use client";

import { PackageSearch } from "lucide-react";
import { OrdersStats } from "./orders-stats";
import { OrdersToolbar } from "./orders-toolbar";
import { OrdersTable } from "./orders-table";

const orders = [
  {
    id: "#10241",
    market: "Fresh Market",
    product: "Premium Milk",
    quantity: 120,
    amount: 240,
    status: "Pending",
    date: "Today",
  },
  {
    id: "#10240",
    market: "Mega Store",
    product: "Butter",
    quantity: 55,
    amount: 410,
    status: "Confirmed",
    date: "Yesterday",
  },
  {
    id: "#10239",
    market: "Asia Market",
    product: "Cheese",
    quantity: 30,
    amount: 520,
    status: "Delivered",
    date: "2 days ago",
  },
];

export function OrdersPage() {
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Orders
          </h1>

          <p className="text-muted-foreground mt-1">
            Manage incoming wholesale orders.
          </p>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
          <PackageSearch className="h-7 w-7 text-primary" />
        </div>

      </div>

      <OrdersStats orders={orders} />

      <OrdersToolbar />

      <OrdersTable orders={orders} />

    </div>
  );
}