"use client";

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  Calendar,
} from "lucide-react";

const sales = [
  { month: "Jan", value: 12000 },
  { month: "Feb", value: 17000 },
  { month: "Mar", value: 14000 },
  { month: "Apr", value: 21000 },
  { month: "May", value: 25000 },
  { month: "Jun", value: 28000 },
];

const topProducts = [
  {
    name: "Coca Cola 1L",
    sold: 842,
    revenue: "$8,420",
  },
  {
    name: "Pepsi 1L",
    sold: 640,
    revenue: "$6,400",
  },
  {
    name: "Fanta Orange",
    sold: 552,
    revenue: "$5,520",
  },
  {
    name: "Sprite",
    sold: 489,
    revenue: "$4,890",
  },
];

export default function AnalyticsPage() {
  const max = Math.max(...sales.map((i) => i.value));

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="text-muted-foreground">
          Sales performance and business insights.
        </p>

      </div>

      <div className="grid gap-5 md:grid-cols-4">

        <StatCard
          title="Revenue"
          value="$82,450"
          change="+12.8%"
          up
          icon={<DollarSign size={20} />}
        />

        <StatCard
          title="Orders"
          value="1,248"
          change="+8.2%"
          up
          icon={<ShoppingCart size={20} />}
        />

        <StatCard
          title="Products"
          value="214"
          change="+15"
          up
          icon={<Package size={20} />}
        />

        <StatCard
          title="Customers"
          value="428"
          change="-3.1%"
          up={false}
          icon={<Users size={20} />}
        />

      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="rounded-2xl border bg-card p-6 lg:col-span-2">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              Revenue Overview
            </h2>

            <Calendar size={18} />

          </div>

          <div className="flex h-72 items-end gap-5">

            {sales.map((item) => (
              <div
                key={item.month}
                className="flex flex-1 flex-col items-center"
              >
                <div
                  className="w-full rounded-t-xl bg-primary transition-all"
                  style={{
                    height: `${(item.value / max) * 220}px`,
                  }}
                />

                <span className="mt-3 text-sm text-muted-foreground">
                  {item.month}
                </span>

              </div>
            ))}

          </div>

        </div>

        <div className="rounded-2xl border bg-card p-6">

          <h2 className="mb-6 text-xl font-semibold">
            Top Products
          </h2>

          <div className="space-y-5">

            {topProducts.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div>

                  <p className="font-medium">
                    {item.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {item.sold} sold
                  </p>

                </div>

                <span className="font-bold">
                  {item.revenue}
                </span>

              </div>
            ))}

          </div>

        </div>

      </div>

      <div className="rounded-2xl border bg-card p-6">

        <h2 className="mb-6 text-xl font-semibold">
          Business Summary
        </h2>

        <div className="grid gap-4 md:grid-cols-3">

          <Summary
            title="Conversion Rate"
            value="8.4%"
          />

          <Summary
            title="Average Order"
            value="$64.90"
          />

          <Summary
            title="Growth"
            value="+21%"
          />

        </div>

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  icon,
  up,
}: any) {
  return (
    <div className="rounded-2xl border bg-card p-5">

      <div className="mb-5 flex items-center justify-between">

        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          {icon}
        </div>

        <div
          className={`flex items-center gap-1 text-sm ${
            up ? "text-green-500" : "text-red-500"
          }`}
        >
          {up ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}

          {change}

        </div>

      </div>

      <p className="text-muted-foreground">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>

    </div>
  );
}

function Summary({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border p-5">

      <p className="text-muted-foreground">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold">
        {value}
      </h3>

    </div>
  );
}