"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, Plus } from "lucide-react";

import { ProductApi } from "@/api/product";
import { useCreateProduct } from "@/hooks/use-create-product";
import { useProductTypes } from "@/hooks/use-product-types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateProductDialog({
  open,
  onOpenChange,
  onSuccess,
}: Props) {
  const createMutation = useCreateProduct();

  const [uploading, setUploading] = useState(false);
  const {
    data: productTypes = [],
    isLoading,
    //@ts-ignore
  } = useProductTypes(open);
  const [form, setForm] = useState<{
    product_type_id: string;
    name: string;
    brand: string;
    package_size: string;
    description: string;
    image_url: string;
    keywords: string;
    stock_quantity: number;
    unit_price: number;
    discount_price: number;
    minimum_order_quantity: number;
    is_active: boolean;
  }>({
    product_type_id: "",
    name: "",
    brand: "",
    package_size: "",
    description: "",
    image_url: "",
    keywords: "",
    stock_quantity: 0,
    unit_price: 0,
    discount_price: 0,
    minimum_order_quantity: 1,
    is_active: true,
  });

  useEffect(() => {
    if (!open) {
      setForm({
        product_type_id: "",
        name: "",
        brand: "",
        package_size: "",
        description: "",
        image_url: "",
        keywords: "",
        stock_quantity: 0,
        unit_price: 0,
        discount_price: 0,
        minimum_order_quantity: 1,
        is_active: true,
      });
    }
  }, [open]);

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    try {
      setUploading(true);

      const result = await ProductApi.upload(e.target.files[0]);

      setForm((prev) => ({
        ...prev,
        image_url: result.data.image_url ?? result.data.url ?? result.data.filename,
      }));
    } finally {
      setUploading(false);
    }
  };

  const submit = () => {
    console.log("submit checked");
    if (!form.name) return toast.error("Product name required");
    if (!form.product_type_id) return toast.error("Select product type");
    if (form.unit_price <= 0)
      return toast.error("Price must be greater than 0");
    createMutation.mutate(
      {
        ...form,
        stock_quantity: Number(form.stock_quantity),
        unit_price: Number(form.unit_price),
        discount_price: Number(form.discount_price),
        minimum_order_quantity: Number(form.minimum_order_quantity),
        keywords: form.keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
      },
      {
        onSuccess: (res) => {
          console.log("SUCCESS:", res);
          onOpenChange(false);
          onSuccess?.();
        },
        onError: (err) => {
          console.log("CREATE ERROR:", err);
          toast.error("Create failed");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl p-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
        </DialogHeader>

        <div className="max-h-[75vh] overflow-y-auto p-6">
          <div className="space-y-4">
            <div>
              <Label>Product Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Product Type</Label>
              <Select
                value={form.product_type_id || undefined}
                onValueChange={(v) =>
                  setForm({
                    ...form,
                    product_type_id: v ?? "",
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={isLoading ? "Loading types..." : "Select type"} />
                </SelectTrigger>

                <SelectContent>
                  {isLoading ? (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      Loading types...
                    </div>
                  ) : productTypes.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      No product types available
                    </div>
                  ) : (
                    productTypes.map((type: any) => (
                      <SelectItem key={type.id} value={String(type.id)}>
                        {type.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Brand</Label>
              <Input
                value={form.brand}
                onChange={(e) =>
                  setForm({
                    ...form,
                    brand: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.unit_price || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      unit_price: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <Label>Stock</Label>
                <Input
                  type="number"
                  min="0"
                  value={form.stock_quantity || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      stock_quantity: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <Label>MOQ</Label>
                <Input
                  type="number"
                  min="1"
                  value={form.minimum_order_quantity || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      minimum_order_quantity: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>

                <Label>Discount Price</Label>
                <Input
                  type="number"
                  min={1}
                  value={form.discount_price || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      discount_price: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                rows={6}
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter className="border-t px-6 py-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            disabled={createMutation.isPending}
            onClick={submit}
          >
            {createMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Product
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}