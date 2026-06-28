"use client";

import {
  Package,
  ShoppingCart,
  Clock,
  CheckCircle2,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  data: any;
}

export function SupplierDashboard({ data }: Props) {
  const summary = data?.summary ?? {};
  const profile = data?.profile ?? {};

  const cards = [
    {
      title: "Products",
      value: summary.products_total ?? 0,
      icon: Package,
      color: "text-blue-500",
    },
    {
      title: "Orders",
      value: summary.orders_total ?? 0,
      icon: ShoppingCart,
      color: "text-green-500",
    },
    {
      title: "Pending",
      value: summary.pending_orders_total ?? 0,
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      title: "Completed",
      value: summary.completed_orders_total ?? 0,
      icon: CheckCircle2,
      color: "text-emerald-500",
    },
    {
      title: "Sales",
      value: Number(summary.sales_total ?? 0).toLocaleString(),
      icon: TrendingUp,
      color: "text-purple-500",
    },
    {
      title: "Income",
      value: Number(summary.income_total ?? 0).toLocaleString(),
      icon: DollarSign,
      color: "text-pink-500",
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          {profile.company_name}
        </h1>

        <p className="text-muted-foreground">
          Supplier Dashboard
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">
                {card.title}
              </CardTitle>

              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold">
                {card.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <Card>
          <CardHeader>
            <CardTitle>
              Recent Products
            </CardTitle>
          </CardHeader>

          <CardContent>

            {data.products?.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground">
                No products yet
              </div>
            ) : (
              <div className="space-y-3">
                {data.products?.map((product: any) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-xl border p-4"
                  >
                    <div>
                      <p className="font-semibold">
                        {product.name}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {product.brand}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">
                        {product.stock_quantity}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        in stock
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </CardContent>
        </Card>

        <Card>

          <CardHeader>
            <CardTitle>
              Recent Orders
            </CardTitle>
          </CardHeader>

          <CardContent>

            {data.recent_orders?.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground">
                No orders yet
              </div>
            ) : (
              <div className="space-y-3">
                {data.recent_orders?.map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-xl border p-4"
                  >
                    <div>
                      <p className="font-semibold">
                        #{order.id.slice(0, 8)}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {order.status}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">
                        {order.quantity}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        pcs
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </CardContent>

        </Card>

      </div>
    </div>
  );
}