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
import { EditProductDialog } from "./edit-product-dialog";

export function ProductTable({
  products,
  loading,
  onRefresh,
}: any) {
  const [selectedProduct, setSelectedProduct] =
    useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] =
    useState(false);

  if (loading) {
    return (
      <div className="rounded-2xl border p-12 text-center">
        Loading products...
      </div>
    );
  }

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
            <th />
          </tr>
        </thead>

        <tbody>
          {products.map((product: any) => (
            <tr
              key={product.id}
              className="border-b hover:bg-muted/40 transition"
            >

              {/* PRODUCT */}
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden">
                    {product.image_url && (
                      <img
                        src={product.image_url}
                        className="w-full h-full object-cover"
                      />
                    )}
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

              {/* ACTIONS */}
              <td>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedProduct(product);
                        setEditOpen(true);
                      }}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedProduct(product);
                        setDeleteOpen(true);
                      }}
                      className="text-red-500"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

      {/* SINGLE MODAL (FIXED) */}
      <DeleteProductDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        product={selectedProduct}
        onSuccess={onRefresh}
      />
      <EditProductDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        product={selectedProduct}
        onSuccess={onRefresh}
      />
    </div>
  );
}