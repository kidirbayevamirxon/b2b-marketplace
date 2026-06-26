"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";

import { useUpdateProduct } from "@/hooks/use-update-product";
import { useProductTypes } from "@/hooks/use-product-types";
import { ProductApi } from "@/api/product";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  product: any;
}

export function EditProductDialog({
  open,
  onOpenChange,
  product,
}: Props) {
  const { data: productTypes = [] } = useProductTypes();

  const updateMutation = useUpdateProduct();

  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (!product) return;

    setForm({
      product_type_id: product.product_type_id ?? "",
      name: product.name ?? "",
      brand: product.brand ?? "",
      package_size: product.package_size ?? "",
      description: product.description ?? "",
      image_url: product.image_url ?? "",
      keywords: product.keywords?.join(", ") ?? "",
      stock_quantity: product.stock_quantity ?? 0,
      unit_price: product.unit_price ?? 0,
      discount_price: product.discount_price ?? 0,
      minimum_order_quantity:
        product.minimum_order_quantity ?? 1,
      is_active: product.is_active ?? true,
    });
  }, [product]);

  async function uploadImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files?.length) return;

    const result = await ProductApi.upload(
      e.target.files[0]
    );

    setForm((prev: any) => ({
      ...prev,
      image_url:
        result.image_url ??
        result.url ??
        result.filename,
    }));
  }

  function submit() {
    updateMutation.mutate({
      id: product.id,

      data: {
        ...form,

        keywords: form.keywords
          .split(",")
          .map((k: string) => k.trim())
          .filter(Boolean),
      },
    });

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">

        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-5">

          <div className="space-y-4">

            <div>
              <Label>Name</Label>

              <Input
                value={form.name || ""}
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
                    product_type_id: v,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {productTypes.map((type: any) => (
                    <SelectItem
                      key={type.id}
                      value={type.id}
                    >
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Brand</Label>

              <Input
                value={form.brand || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    brand: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Description</Label>

              <Textarea
                rows={5}
                value={form.description || ""}
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

            <Input
              type="number"
              placeholder="Price"
              value={form.unit_price || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  unit_price: Number(e.target.value),
                })
              }
            />

            <Input
              type="number"
              placeholder="Discount"
              value={form.discount_price || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  discount_price: Number(e.target.value),
                })
              }
            />

            <Input
              type="number"
              placeholder="Stock"
              value={form.stock_quantity || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  stock_quantity: Number(e.target.value),
                })
              }
            />

            <Input
              placeholder="Keywords"
              value={form.keywords || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  keywords: e.target.value,
                })
              }
            />

            <input
              type="file"
              onChange={uploadImage}
            />

            <div className="flex items-center justify-between rounded-lg border p-4">
              <span>Active</span>

              <Switch
                checked={form.is_active}
                onCheckedChange={(v) =>
                  setForm({
                    ...form,
                    is_active: v,
                  })
                }
              />
            </div>

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={submit}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}