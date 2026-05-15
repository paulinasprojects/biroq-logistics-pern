import { ApiResponse, Warehouse, WarehouseImage } from "@/types/types";
import api from "./api";

export const getAllWarehouses = async () => {
  const response = await api.get<ApiResponse<Warehouse[]>>("/warehouses")
  return response.data;
}

export const uploadImage = async (file: File, id:string) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post<ApiResponse<WarehouseImage>>(
    `/warehouses/${id}/image`,
    formData,
  );

  return response.data;
};