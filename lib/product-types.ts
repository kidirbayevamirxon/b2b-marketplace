import { api } from "@/api/api";

export interface ProductType {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
}

export interface ProductTypesResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
  product_types: ProductType[];
}

export interface CreateProductTypeData {
  name: string;
}

export async function fetchProductTypes(page: number = 1, limit: number = 20): Promise<ProductTypesResponse> {
  try {
    const response = await api.get('/admin/product-types', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch product types:', error);
    throw error;
  }
}

export async function createProductType(data: CreateProductTypeData): Promise<ProductType> {
  try {
    const response = await api.post('/admin/product-types', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create product type:', error);
    throw error;
  }
}

export async function updateProductType(id: string, data: { name: string }): Promise<ProductType> {
  try {
    const response = await api.put(`/admin/product-types/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to update product type:', error);
    throw error;
  }
}

export async function toggleProductTypeStatus(id: string, isActive: boolean): Promise<void> {
  try {
    await api.patch(`/admin/product-types/${id}/status`, { is_active: isActive });
  } catch (error) {
    console.error('Failed to toggle product type status:', error);
    throw error;
  }
}

export async function deleteProductType(id: string): Promise<void> {
  try {
    await api.delete(`/admin/product-types/${id}`);
  } catch (error) {
    console.error('Failed to delete product type:', error);
    throw error;
  }
}