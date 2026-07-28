import { ApiResponse, Shipment } from "@/types/types";
import api from "./api";

export const getAllShipments = async () => {
  const response = await api.get<ApiResponse<Shipment[]>>("/shipments")
  return response.data
}

export const createShipment = async (data: {
  warehouseId: string;
  shipmentName: string;
  senderName: string;
  senderPhoneNumber: string;
  pickupAddress: string;
  receiverName: string;
  receiverPhoneNumber: string;
  receiverNotes: string | null;
  deliveryAddress: string;
  packageType: string;
  packageDescription: string;
  packageWeight: number;
  packageLength: number;
  packageWidth: number;
  packageHeight: number;
  packageNotes: string | null;
  declaredValue: number;
  hasInsurance: boolean;
  hasCashOnDelivery: boolean;
  hasDangerousGoods: boolean;
  specialHandling: string | null;
  serviceType: string;
  serviceName: string;
  servicePrice: number;
  chargeableWeight: string;
  deliveryTimeFrame: string;
  hasPickUpToday: boolean;
  hasSaturdayDelivery: boolean;
}) => {
  const response = await api.post<ApiResponse<Shipment>>("/shipments", data);
  return response.data;
}