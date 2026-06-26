"use client";

import Image from "next/image";

import {
  ShoppingCart,
  Heart,
  Star,
  Building2,
  Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SupplierCard({
  product,
}: any) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-card transition hover:-translate-y-1 hover:shadow-2xl">

      <div className="relative h-56 bg-muted">

        {product.image_url ? (
          <Image
            src={product.image_url}
            fill
            alt={product.name}
            className="object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">

            <Package className="h-16 w-16 text-muted-foreground"/>

          </div>
        )}

        <Badge className="absolute left-4 top-4">
          Verified
        </Badge>

      </div>

      <div className="space-y-4 p-5">

        <div>

          <h2 className="text-xl font-bold">
            {product.name}
          </h2>

          <p className="text-muted-foreground">
            {product.brand}
          </p>

        </div>

        <div className="flex items-center gap-2 text-sm">

          <Building2 className="h-4 w-4"/>

          {product.company_name ?? "Supplier"}

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-1">

            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>

            4.9

          </div>

          <Badge variant="secondary">
            {product.stock_quantity} in stock
          </Badge>

        </div>

        <div className="flex items-end justify-between">

          <div>

            <p className="text-sm text-muted-foreground">
              Price
            </p>

            <h3 className="text-3xl font-bold">

              ${product.unit_price}

            </h3>

          </div>

          <div className="flex gap-2">

            <Button
              size="icon"
              variant="outline"
            >
              <Heart className="h-4 w-4"/>
            </Button>

            <Button>

              <ShoppingCart className="mr-2 h-4 w-4"/>

              Buy

            </Button>

          </div>

        </div>

      </div>

    </div>
  );
}