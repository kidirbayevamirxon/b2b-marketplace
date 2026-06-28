import { api } from "@/api/api";

export interface Firma {
  id: string;
  login: string;
  phone: string;
  owner_first_name: string;
  owner_last_name: string;
  role: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  firma_profile: {
    id: string;
    company_name: string;
    description: string | null;
    address: string | null;
    min_order_amount: number | null;
    delivery_available: boolean;
  };
}

export interface FirmasResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
  firmalar: Firma[];
}

export async function fetchFirmas(page: number = 1, limit: number = 20): Promise<FirmasResponse> {
  try {
    const response = await api.get('/admin/firmalar', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch firms:', error);
    throw error;
  }
}

export async function toggleFirmaStatus(firmaId: string, isActive: boolean): Promise<void> {
  try {
    await api.patch(`/admin/firmalar/${firmaId}/status`, { is_active: isActive });
  } catch (error) {
    console.error('Failed to toggle firm status:', error);
    throw error;
  }
}

export async function verifyFirma(firmaId: string): Promise<void> {
  try {
    await api.patch(`/admin/firmalar/${firmaId}/verify`);
  } catch (error) {
    console.error('Failed to verify firm:', error);
    throw error;
  }
}