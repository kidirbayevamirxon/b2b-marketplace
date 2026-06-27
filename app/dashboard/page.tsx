"use client";

import { useEffect, useState } from "react";
import { SupplierDashboard } from "@/components/dashboard/supplier-dashboard";
import { StoreDashboard } from "@/components/dashboard/store-dashboard";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  if (role === "firma") return <SupplierDashboard />;
  if (role === "market") return <StoreDashboard />;
  return <AdminDashboard />;
}