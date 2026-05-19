import { ApiResponse, Warehouse, WarehouseImage } from "@/types/types";
import api from "./api";

export const getAllWarehouses = async () => {
  const response = await api.get<ApiResponse<Warehouse[]>>("/warehouses")
  return response.data;
}

export const createWarehouse = async (data: {
  name: string,
  address: string,
  capacity: number,
  description: string
}) => {
  const response = await api.post<ApiResponse<Warehouse>>("/warehouses", data);
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

export const updateWarehouse = async (id: string, data: {
  name: string,
  address: string,
  capacity: number,
  description: string
}) => {
  const response = await api.post<ApiResponse<Warehouse>>(`/warehouses/${id}`, data);
  return response.data;
}

export const deleteWarehouse = async (id: string) => {
  const response = await api.delete<ApiResponse<Warehouse>>(`/warehouses/${id}`);
  return response.data;
}