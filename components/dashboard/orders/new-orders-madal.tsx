"use client";

import { useEffect, useState } from "react";
import { api } from "@/api/api";

export default function NewOrderModal({ onClose }: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [shopId, setShopId] = useState("")


  useEffect(() => {
    api.get("/catalog/products").then((res) => {
      const payload = res.data;
      const items = Array.isArray(payload)
        ? payload
        : payload?.items ?? payload?.data ?? [];

      setProducts(Array.isArray(items) ? items : []);
    });
  }, []);
  const add = (p: any) => {
    const exists = selected.find((i) => i.id === p.id);

    if (exists) {
      setSelected(
        selected.map((i) =>
          i.id === p.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setSelected([...selected, { ...p, qty: 1 }]);
    }
  };

  const submit = async () => {
    await api.post("/orders", {
      shopId,
      items: selected.map((p) => ({
        productId: p.id,
        name: p.name,
        price: p.price,
        qty: p.qty,
      })),
    })

    onClose();
  };

  return (<div className="fixed z-50 inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">New Order</h2>
        <button onClick={onClose}>X</button>
      </div>

      <input
        placeholder="Shop ID"
        value={shopId}
        onChange={(e) => setShopId(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <div className="grid grid-cols-2 gap-4">
        {/* products */}
        <div className="space-y-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="border p-2 flex justify-between"
            >
              <span>{p.name}</span>
              <button onClick={() => add(p)}>Add</button>
            </div>
          ))}
        </div>

        {/* selected */}
        <div className="space-y-2">
          {selected.map((p) => (
            <div key={p.id} className="flex justify-between border p-2">
              <span>{p.name}</span>
              <input
                type="number"
                value={p.qty}
                onChange={(e) =>
                  setSelected(
                    selected.map((i) =>
                      i.id === p.id
                        ? { ...i, qty: Number(e.target.value) }
                        : i
                    )
                  )
                }
                className="w-16 border"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={submit}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded"
      >
        Submit Order
      </button>
    </div>
  </div>
  );
}