"use client";

import { useState } from "react";
import NewOrderModal from "./new-orders-madal";

export default function OrdersToolbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Orders
        </h2>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          + New Order
        </button>
      </div>

      {open && <NewOrderModal onClose={() => setOpen(false)} />}
    </>
  );
}