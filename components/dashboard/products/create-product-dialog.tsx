"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, Plus, Upload } from "lucide-react";

import { ProductApi } from "@/api/product";
import { useCreateProduct } from "@/hooks/use-create-product";
import { useProductTypes } from "@/hooks/use-product-types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProductDialog({ open, onOpenChange }: Props) {
  const { data: productTypes = [] } = useProductTypes();

  const createMutation = useCreateProduct();

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
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
        image_url: result.image_url ?? result.url ?? result.filename,
      }));
    } finally {
      setUploading(false);
    }
  };

  const submit = () => {
    createMutation.mutate({
      ...form,

      stock_quantity: Number(form.stock_quantity),

      unit_price: Number(form.unit_price),

      discount_price: Number(form.discount_price),

      minimum_order_quantity: Number(form.minimum_order_quantity),

      keywords: form.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    });

    onOpenChange(false);
  };
if (!form.name) {
   toast.error("Product name required");
   return;
}

if (!form.product_type_id) {
   toast.error("Select product type");
   return;
}

if (form.unit_price <= 0) {
   toast.error("Price must be greater than 0");
   return;
}
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
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Product Type</Label>

              <Select
                value={form.product_type_id}
                onValueChange={(v) =>
                  setForm({
                    ...form,
                    product_type_id: v ?? "",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>

                <SelectContent>
                  {productTypes.map((type: any) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
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

            <div>
              <Label>Package Size</Label>

              <Input
                value={form.package_size}
                onChange={(e) =>
                  setForm({
                    ...form,
                    package_size: e.target.value,
                  })
                }
              />
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

          <div className="space-y-4">
            {" "}
            <div>
              <Label>Unit Price</Label>

              <Input
                type="number"
                value={form.unit_price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    unit_price: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label>Discount Price</Label>

              <Input
                type="number"
                value={form.discount_price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    discount_price: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label>Stock Quantity</Label>

              <Input
                type="number"
                value={form.stock_quantity}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stock_quantity: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label>Minimum Order Quantity</Label>

              <Input
                type="number"
                value={form.minimum_order_quantity}
                onChange={(e) =>
                  setForm({
                    ...form,
                    minimum_order_quantity: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label>Keywords</Label>

              <Input
                placeholder="milk, fresh, premium"
                value={form.keywords}
                onChange={(e) =>
                  setForm({
                    ...form,
                    keywords: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-3">
              <Label>Product Image</Label>

              <label
                htmlFor="product-image"
                className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-primary transition"
              >
                {uploading ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : form.image_url ? (
                  <Image
                    src={form.image_url}
                    alt="preview"
                    width={180}
                    height={180}
                    className="h-40 w-auto rounded-md object-contain"
                  />
                ) : (
                  <>
                    <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload image
                    </p>
                  </>
                )}
              </label>

              <input
                id="product-image"
                type="file"
                accept="image/*"
                hidden
                onChange={uploadImage}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="font-medium">Active Product</p>

                <p className="text-sm text-muted-foreground">
                  Product will be visible in marketplace
                </p>
              </div>

              <Switch
                checked={form.is_active}
                onCheckedChange={(v: boolean) =>
                  setForm({
                    ...form,
                    is_active: v,
                  })
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter className="border-t px-6 py-4 bg-background">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button disabled={createMutation.isPending} onClick={submit}>
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
