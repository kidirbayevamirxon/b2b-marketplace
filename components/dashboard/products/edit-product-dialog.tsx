import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/api/api";

export function EditProductDialog({
  open,
  onOpenChange,
  product,
  onSuccess,
}: any) {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    stock_quantity: 0,
    unit_price: 0,
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        brand: product.brand || "",
        stock_quantity: product.stock_quantity || 0,
        unit_price: product.unit_price || 0,
      });
    }
  }, [product]);

  const handleUpdate = async () => {
    await api.patch(`/catalog/products/${product.id}`, form);
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <Input
            placeholder="Brand"
            value={form.brand}
            onChange={(e) =>
              setForm({ ...form, brand: e.target.value })
            }
          />

          <Input
            type="number"
            placeholder="Stock"
            value={form.stock_quantity}
            onChange={(e) =>
              setForm({
                ...form,
                stock_quantity: Number(e.target.value),
              })
            }
          />

          <Input
            type="number"
            placeholder="Price"
            value={form.unit_price}
            onChange={(e) =>
              setForm({
                ...form,
                unit_price: Number(e.target.value),
              })
            }
          />

          <Button className="w-full" onClick={handleUpdate}>
            Save changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}