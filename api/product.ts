import { api } from "@/api/api";

export interface CreateProductDto {
  product_type_id: string;
  name: string;
  brand?: string;
  package_size?: string;
  description?: string;
  image_url?: string;
  keywords?: string[];
  stock_quantity: number;
  unit_price: number;
  discount_price?: number;
  minimum_order_quantity?: number;
  is_active?: boolean;
}

export const ProductApi = {
  async getTypes() {
    const { data } = await api.get("/catalog/product-types");
    return data;
  },

  async create(dto: CreateProductDto) {
    const { data } = await api.post("/catalog/products", dto);
    return data;
  },

  async upload(file: File) {
    const form = new FormData();

    form.append("file", file);

    const { data } = await api.post("/upload/image", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  },

  async update(id: string, dto: Partial<CreateProductDto>) {
    const { data } = await api.put(`/catalog/products/${id}`, dto);
    return data;
  },
};