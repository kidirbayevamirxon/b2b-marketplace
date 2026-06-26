import { SupplierDashboard } from "@/components/dashboard/supplier-dashboard";
import { StoreDashboard } from "@/components/dashboard/store-dashboard";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

export default function DashboardPage() {
  const role =
    typeof window !== "undefined"
      ? localStorage.getItem("role")
      : null;

  if (role === "firma") return <SupplierDashboard />;
  if (role === "market") return <StoreDashboard />;
  return <AdminDashboard />;
}