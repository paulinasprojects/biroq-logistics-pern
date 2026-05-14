import api from "./api";
import { ApiResponse, Company } from "@/types/types";

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