import { api } from "@/api/api";

// lib/markets.ts
export interface Market {
  id: string;
  login: string;
  phone: string;
  owner_first_name: string;
  owner_last_name: string;
  role: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  store_profile: {
    id: string;
    store_name: string;
    address: string | null;
    market_type: string | null;
  };
}

export interface MarketsResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
  markets: Market[];
}

export async function fetchMarkets(page: number = 1, limit: number = 20): Promise<MarketsResponse> {
  try {
    const response = await api.get('/admin/markets', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    throw error;
  }
}

export async function toggleMarketStatus(marketId: string, isActive: boolean): Promise<void> {
  try {
    await api.patch(`/admin/markets/${marketId}/status`, { is_active: isActive });
  } catch (error) {
    console.error('Failed to toggle market status:', error);
    throw error;
  }
}

export async function verifyMarket(marketId: string): Promise<void> {
  try {
    await api.patch(`/admin/markets/${marketId}/verify`);
  } catch (error) {
    console.error('Failed to verify market:', error);
    throw error;
  }
}