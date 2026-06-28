import { CreateProductDto } from "@/hooks/use-create-product";
import { api } from "./api";

export const ProductApi = {
  list: () => api.get("/catalog/products"),

  my: () => api.get("/catalog/products/me"),

  get: (id: string) => api.get(`/catalog/products/${id}`),
  create: (data: CreateProductDto) =>
    api.post("/catalog/products", data).then(res => res.data),
  getProductTypes: async () => {
  console.log("API CALLED");

  const res = await api.get("/catalog/product-types");

  console.log(res.data);

  return res.data;
},
  update: (id: string, data: any) =>
    api.patch(`/catalog/products/${id}`, data),

  remove: (id: string) =>
    api.delete(`/catalog/products/${id}`),

  upload: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return api.post("/catalog/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};