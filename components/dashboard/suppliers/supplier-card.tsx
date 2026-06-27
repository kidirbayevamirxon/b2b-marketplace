"use client";

import Image from "next/image";
import { useState } from "react";

import {
  ShoppingCart,
  Heart,
  Star,
  Building2,
  Package,
  Loader2,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function SupplierCard({
  product,
  onBuyNow,
  isPending,
}: any) {
  const [showDialog, setShowDialog] = useState(false);
  const [quantity, setQuantity] = useState(
    product.minimum_order_quantity || 1
  );

  // Форма заказа
  const [orderForm, setOrderForm] = useState({
    delivery_address: "",
    contact_phone: "",
    delivery_date: "",
    payment_method: "cash",
    notes: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const maxQuantity = product.stock_quantity || 999;
  const minQuantity = product.minimum_order_quantity || 1;
  
  const price = product.discount_price && product.discount_price < product.unit_price
    ? product.discount_price
    : product.unit_price;

  const handleBuyClick = () => {
    // Устанавливаем дату по умолчанию на завтра
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const defaultDate = tomorrow.toISOString().split('T')[0];
    
    setOrderForm(prev => ({
      ...prev,
      delivery_date: defaultDate,
    }));
    setShowDialog(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!orderForm.delivery_address.trim()) {
      errors.delivery_address = "Delivery address is required";
    }

    const phoneRegex = /^\+998\d{9}$/;
    if (!phoneRegex.test(orderForm.contact_phone)) {
      errors.contact_phone = "Enter valid phone number (e.g., +998901234567)";
    }

    if (!orderForm.delivery_date) {
      errors.delivery_date = "Delivery date is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmBuy = () => {
    if (!validateForm()) {
      return;
    }

    if (onBuyNow) {
      onBuyNow({
        product_id: product.id,
        quantity: quantity,
        delivery_address: orderForm.delivery_address,
        contact_phone: orderForm.contact_phone,
        delivery_latitude: 0,
        delivery_longitude: 0,
        delivery_date: orderForm.delivery_date,
        payment_method: orderForm.payment_method,
        notes: orderForm.notes,
      });
      setShowDialog(false);
      // Сбрасываем форму
      setOrderForm({
        delivery_address: "",
        contact_phone: "",
        delivery_date: "",
        payment_method: "cash",
        notes: "",
      });
      setQuantity(product.minimum_order_quantity || 1);
    }
  };

  const companyName = product.firma?.company_name ?? "Supplier";

  return (
    <>
      <div className="group overflow-hidden rounded-2xl border bg-card transition hover:-translate-y-1 hover:shadow-2xl">
        <div className="relative h-56 bg-muted">
          {product.image_url && product.image_url !== "string" ? (
            <Image
              src={product.image_url}
              fill
              alt={product.name}
              className="object-cover transition group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-16 w-16 text-muted-foreground" />
            </div>
          )}

          <Badge className="absolute left-4 top-4">
            Verified
          </Badge>

          {product.discount_price && product.discount_price < product.unit_price && (
            <Badge variant="destructive" className="absolute right-4 top-4">
              Sale
            </Badge>
          )}
        </div>

        <div className="space-y-4 p-5">
          <div>
            <h2 className="text-xl font-bold line-clamp-1">
              {product.name}
            </h2>
            <p className="text-muted-foreground">
              {product.brand}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4" />
            {companyName}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
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
              <div className="flex items-center gap-2">
                <h3 className="text-3xl font-bold">
                  ${typeof price === 'number' ? price.toFixed(2) : price}
                </h3>
                {product.discount_price && product.discount_price < product.unit_price && (
                  <p className="text-sm text-muted-foreground line-through">
                    ${product.unit_price.toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  // Add to wishlist logic
                }}
              >
                <Heart className="h-4 w-4" />
              </Button>

              <Button 
                onClick={handleBuyClick}
                disabled={isPending || product.stock_quantity === 0}
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Buy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Dialog with Full Form */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Place Order</DialogTitle>
            <DialogDescription>
              Order {product.name} from {companyName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Product Info */}
            <div className="rounded-lg bg-muted/50 p-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Product:</span>
                <span className="font-medium">{product.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-medium">${price.toFixed(2)}</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity *
              </Label>
              <Input
                id="quantity"
                type="number"
                min={minQuantity}
                max={maxQuantity}
                value={quantity}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= minQuantity && val <= maxQuantity) {
                    setQuantity(val);
                  }
                }}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-sm text-muted-foreground">
                Min Order
              </Label>
              <div className="col-span-3 text-sm text-muted-foreground">
                {minQuantity} units
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-bold">Total</Label>
              <div className="col-span-3 text-xl font-bold">
                ${(price * quantity).toFixed(2)}
              </div>
            </div>

            <div className="border-t pt-4" />

            {/* Delivery Address */}
            <div className="space-y-2">
              <Label htmlFor="delivery_address">Delivery Address *</Label>
              <div className="flex gap-2">
                <Input
                  id="delivery_address"
                  placeholder="Enter delivery address"
                  value={orderForm.delivery_address}
                  onChange={(e) => {
                    setOrderForm({ ...orderForm, delivery_address: e.target.value });
                    setFormErrors((prev) => ({ ...prev, delivery_address: "" }));
                  }}
                  className={formErrors.delivery_address ? "border-red-500" : ""}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    // Здесь можно открыть карту для выбора адреса
                    // Или использовать геолокацию
                  }}
                  title="Use current location"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              {formErrors.delivery_address && (
                <p className="text-sm text-red-500">{formErrors.delivery_address}</p>
              )}
            </div>

            {/* Contact Phone */}
            <div className="space-y-2">
              <Label htmlFor="contact_phone">Contact Phone *</Label>
              <Input
                id="contact_phone"
                placeholder="+998901234567"
                value={orderForm.contact_phone}
                onChange={(e) => {
                  let value = e.target.value;
                  // Автоматически добавляем +998 если начинается с цифр
                  if (value.match(/^[0-9]/) && !value.startsWith('+998')) {
                    value = '+998' + value;
                  }
                  setOrderForm({ ...orderForm, contact_phone: value });
                  setFormErrors((prev) => ({ ...prev, contact_phone: "" }));
                }}
                className={formErrors.contact_phone ? "border-red-500" : ""}
              />
              {formErrors.contact_phone && (
                <p className="text-sm text-red-500">{formErrors.contact_phone}</p>
              )}
            </div>

            {/* Delivery Date */}
            <div className="space-y-2">
              <Label htmlFor="delivery_date">Delivery Date *</Label>
              <Input
                id="delivery_date"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={orderForm.delivery_date}
                onChange={(e) => {
                  setOrderForm({ ...orderForm, delivery_date: e.target.value });
                  setFormErrors((prev) => ({ ...prev, delivery_date: "" }));
                }}
                className={formErrors.delivery_date ? "border-red-500" : ""}
              />
              {formErrors.delivery_date && (
                <p className="text-sm text-red-500">{formErrors.delivery_date}</p>
              )}
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label htmlFor="payment_method">Payment Method</Label>
              <Select
                value={orderForm.payment_method}
                onValueChange={(value) =>
                  //@ts-ignore
                  setOrderForm({ ...orderForm, payment_method: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Additional notes for delivery..."
                value={orderForm.notes}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, notes: e.target.value })
                }
                rows={2}
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowDialog(false);
                setFormErrors({});
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmBuy} 
              disabled={isPending || quantity < minQuantity || quantity > maxQuantity}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Place Order $${(price * quantity).toFixed(2)}`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}