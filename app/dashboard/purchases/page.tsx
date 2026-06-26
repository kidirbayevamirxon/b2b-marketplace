"use client";

import {
  Search,
  Package,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const purchases = [
  {
    id: "#ORD-1024",
    supplier: "Fresh Milk LLC",
    product: "Premium Milk",
    quantity: "250 pcs",
    total: "$340",
    status: "confirmed",
    date: "Today",
  },
  {
    id: "#ORD-1023",
    supplier: "Sweet Factory",
    product: "Chocolate",
    quantity: "120 pcs",
    total: "$210",
    status: "pending",
    date: "Yesterday",
  },
  {
    id: "#ORD-1022",
    supplier: "Cola Factory",
    product: "Soft Drinks",
    quantity: "60 pcs",
    total: "$420",
    status: "completed",
    date: "2 days ago",
  },
  {
    id: "#ORD-1021",
    supplier: "Coffee House",
    product: "Coffee Beans",
    quantity: "35 kg",
    total: "$180",
    status: "cancelled",
    date: "5 days ago",
  },
];

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "confirmed":
      return (
        <Badge className="bg-blue-500">
          <Truck className="mr-1 h-3 w-3" />
          Confirmed
        </Badge>
      );

    case "completed":
      return (
        <Badge className="bg-green-600">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Completed
        </Badge>
      );

    case "cancelled":
      return (
        <Badge variant="destructive">
          <XCircle className="mr-1 h-3 w-3" />
          Cancelled
        </Badge>
      );

    default:
      return (
        <Badge variant="secondary">
          <Clock3 className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      );
  }
}

export default function PurchasesPage() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Purchases
          </h1>

          <p className="text-muted-foreground">
            Track all purchased products
          </p>
        </div>

        <Button>
          New Purchase
        </Button>

      </div>

      <div className="grid gap-4 md:grid-cols-4">

        <Card>
          <CardContent className="p-6">
            <Package className="mb-2 h-7 w-7 text-primary" />
            <p className="text-sm text-muted-foreground">
              Total Orders
            </p>
            <h2 className="text-3xl font-bold">
              128
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Truck className="mb-2 h-7 w-7 text-blue-500" />
            <p className="text-sm text-muted-foreground">
              In Delivery
            </p>
            <h2 className="text-3xl font-bold">
              17
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <CheckCircle2 className="mb-2 h-7 w-7 text-green-500" />
            <p className="text-sm text-muted-foreground">
              Completed
            </p>
            <h2 className="text-3xl font-bold">
              94
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Clock3 className="mb-2 h-7 w-7 text-yellow-500" />
            <p className="text-sm text-muted-foreground">
              Pending
            </p>
            <h2 className="text-3xl font-bold">
              17
            </h2>
          </CardContent>
        </Card>

      </div>

      <Card>

        <CardContent className="p-6">

          <div className="relative mb-6">

            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input
              placeholder="Search purchase..."
              className="pl-10"
            />

          </div>

          <div className="space-y-4">

            {purchases.map((purchase) => (

              <div
                key={purchase.id}
                className="rounded-xl border p-5 transition hover:bg-muted/40"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="font-semibold">
                      {purchase.product}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {purchase.supplier}
                    </p>

                  </div>

                  <StatusBadge status={purchase.status} />

                </div>

                <div className="mt-4 grid grid-cols-4 gap-4 text-sm">

                  <div>
                    <p className="text-muted-foreground">
                      Order
                    </p>
                    <p>{purchase.id}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">
                      Quantity
                    </p>
                    <p>{purchase.quantity}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">
                      Total
                    </p>
                    <p className="font-semibold">
                      {purchase.total}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">
                      Date
                    </p>
                    <p>{purchase.date}</p>
                  </div>

                </div>

              </div>

            ))}

          </div>

        </CardContent>

      </Card>

    </div>
  );
}