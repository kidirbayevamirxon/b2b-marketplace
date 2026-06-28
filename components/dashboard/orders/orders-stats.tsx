export default function OrdersStats({ orders }: any) {
  const total = orders.length;
  const pending = orders.filter((o: any) => o.status === "pending").length;
  const delivered = orders.filter((o: any) => o.status === "delivered").length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <p className="text-sm text-slate-600 dark:text-slate-300">Total</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{total}</p>
      </div>
      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 shadow-sm dark:border-amber-800/50 dark:bg-amber-950/40">
        <p className="text-sm text-amber-700 dark:text-amber-300">Pending</p>
        <p className="mt-2 text-2xl font-semibold text-amber-900 dark:text-amber-100">{pending}</p>
      </div>
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 shadow-sm dark:border-emerald-800/50 dark:bg-emerald-950/40">
        <p className="text-sm text-emerald-700 dark:text-emerald-300">Delivered</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-900 dark:text-emerald-100">{delivered}</p>
      </div>
    </div>
  );
}