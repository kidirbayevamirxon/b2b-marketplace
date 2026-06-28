import { api } from "@/api/api";

export interface AdminDashboardStats {
  role: string;
  summary: {
    accounts_total: number;
    products_total: number;
    orders_total: number;
    revenue_total: number;
    paid_total: number;
    units_total: number;
    pending_orders_total: number;
    confirmed_orders_total: number;
    completed_orders_total: number;
    cancelled_orders_total: number;
    admins_total: number;
    firmalar_total: number;
    markets_total: number;
  };
  firmalar: any[];
  markets: any[];
  top_relationships: any[];
  recent_orders: RecentOrder[];
}

export interface RecentOrder {
  id: string;
  order_number: string;
  store_profile_id: string;
  store_name: string;
  firma_id: string;
  firma_name: string;
  product_id: string;
  product_name: string;
  product_image_url: string;
  quantity: number;
  total_price: number;
  delivery_address: string | null;
  contact_phone: string | null;
  delivery_latitude: number | null;
  delivery_longitude: number | null;
  delivery_date: string | null;
  notes: string | null;
  cancel_reason: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed';
  payment_method: string | null;
  confirmed_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  created_at: string;
}

export async function fetchAdminDashboard(): Promise<AdminDashboardStats> {
  try {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch admin dashboard:', error);
    throw error;
  }
}