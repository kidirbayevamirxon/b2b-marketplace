"use client";

import { useEffect, useState } from "react";
import { api } from "@/api/api";
import { SupplierDashboard } from "@/components/dashboard/supplier-dashboard";
import { StoreDashboard } from "@/components/dashboard/store-dashboard";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

interface DashboardData {
  role: string;
  profile: {
    store_profile_id: string;
    store_name: string;
  };
  summary: {
    orders_total: number;
    pending_orders_total: number;
    confirmed_orders_total: number;
    completed_orders_total: number;
    cancelled_orders_total: number;
    purchased_units_total: number;
    spent_total: number;
    paid_total: number;
  };
  firmalar: any[];
  products: any[];
  recent_orders: any[];
}

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 const fetchDashboardData = async () => {
  try {
    setLoading(true);
    setError(null);

    const { data } = await api.get<DashboardData>("/analytics/dashboard");

    setDashboardData(data);
  } catch (err: any) {
    console.error("Error fetching dashboard data:", err);
    setError(err.response?.data?.message || err.message || "An error occurred");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-destructive/10 p-4">
            <svg
              className="h-8 w-8 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-center text-muted-foreground">
            Failed to load dashboard data
          </p>
          <button
            onClick={fetchDashboardData}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Render appropriate dashboard based on role
  switch (role) {
    case "firma":
      //@ts-ignore
      return <SupplierDashboard data={dashboardData} />;
    case "market":
      //@ts-ignore
      return <StoreDashboard data={dashboardData} />;
    default:
      //@ts-ignore
      return <AdminDashboard data={dashboardData} />;
  }
}