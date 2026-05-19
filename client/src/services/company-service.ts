import api from "./api";
import { ApiResponse, Company, CompanyImage } from "@/types/types";

export const createCompany = async (data: {
  name: string;
  address: string;
  shippingOrigin: string;
  averageMonthlyShipments: number;
  businessType: string;
}) => {
  const response = await api.post<ApiResponse<Company>>("/company", data);
  return response.data;
}

export const getCompany = async () => {
  const response = await api.get<ApiResponse<Company>>("/company");
  return response.data;
}

export const updateCompany = async (id: string, data: {
  name: string;
  address: string;
  shippingOrigin: string;
  averageMonthlyShipments: number;
  businessType: string;
}) => {
  const response = await api.post<ApiResponse<Company>>(`/company/${id}`, data);
  return response.data;
}

export const deleteCompany = async (id: string) => {
  const response = await api.delete<ApiResponse<Company>>(`/company/${id}`);
  return response.data;
}

export const uploadCompanyImage = async (file: File, id: string) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post<ApiResponse<CompanyImage>>(
    `/company/${id}/image`, 
    formData
  );
  return response.data;
}