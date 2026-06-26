"use client";

import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DeleteProductDialog } from "./delete-product-dialog";

export function ProductTable({
  products,
  loading,
}: any) {
  if (loading) {
    return (
      <div className="rounded-2xl border p-12 text-center">
        Loading products...
      </div>
    );
  }
const [selectedProduct, setSelectedProduct] = useState<any>(null);
const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <div className="rounded-2xl border bg-card overflow-hidden">

      <table className="w-full">

        <thead className="border-b bg-muted/50">

          <tr>

            <th className="p-4 text-left">Product</th>

            <th>Brand</th>

            <th>Stock</th>

            <th>Price</th>

            <th>Status</th>

            <th></th>

          </tr>

        </thead>

        <tbody>

          {products.map((product: any) => (
            <tr
              key={product.id}
              className="border-b hover:bg-muted/40 transition"
            >
              <td className="p-4">

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden">

                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        className="w-full h-full object-cover"
                      />
                    ) : null}

                  </div>

                  <div>

                    <div className="font-semibold">
                      {product.name}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {product.product_type?.name}
                    </div>

                  </div>

                </div>

              </td>

              <td>{product.brand || "-"}</td>

              <td>{product.stock_quantity}</td>

              <td>${product.unit_price}</td>

              <td>
                {product.stock_quantity > 0 ? (
                  <Badge>Available</Badge>
                ) : (
                  <Badge variant="destructive">
                    Out of stock
                  </Badge>
                )}
              </td>

              <td>

                <DropdownMenu>

                  <DropdownMenuTrigger>

                    <Button
                      variant="ghost"
                      size="icon"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>

                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">

                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem className="text-red-500">
                     <Button
  size="icon"
  variant="destructive"
  onClick={() => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  }}
>
  <Trash2 className="h-4 w-4" />
</Button>
<DeleteProductDialog
  open={deleteOpen}
  onOpenChange={setDeleteOpen}
  product={selectedProduct}
/>
                    </DropdownMenuItem>

                  </DropdownMenuContent>

                </DropdownMenu>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}