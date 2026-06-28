"use client";

import { Trash2 } from "lucide-react";

export default function OrdersTable({
  orders,
  loading,
  onUpdateStatus,
  onDelete,
}: any) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-600 dark:bg-slate-900/70 dark:text-slate-300">
          <tr className="text-left">
            <th className="px-4 py-3 font-medium">Shop</th>
            <th className="px-4 py-3 font-medium">Total</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o: any) => (
            <tr key={o.id} className="border-t border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-950/70">
              <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
                {o.shop?.name || "Shop"}
              </td>
              <td className="px-4 py-3 text-slate-700 dark:text-slate-300">${o.total}</td>

              <td className="px-4 py-3">
                <select
                  value={o.status}
                  onChange={(e) => onUpdateStatus(o.id, e.target.value)}
                  className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <option value="pending">pending</option>
                  <option value="accepted">accepted</option>
                  <option value="rejected">rejected</option>
                  <option value="shipped">shipped</option>
                  <option value="delivered">delivered</option>
                </select>
              </td>

              <td className="px-4 py-3">
                <button
                  onClick={() => onDelete(o.id)}
                  className="rounded-md p-2 text-rose-500 transition-colors hover:bg-rose-500/10 hover:text-rose-600"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}