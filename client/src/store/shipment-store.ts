import { AxiosError } from "axios";
import { create } from "zustand";
import {
  getAllShipments as getAllShipmentsService,
  createShipment as createShipmentService
} from "@/services/shipment-service";

import { ShipmentState } from "@/types/shipment-types";

interface ShipmentStore extends ShipmentState {
  getAllShipments: () => Promise<void>;
  createShipment: (data: {
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
  }) => Promise<void>;
  clearError: () => void;
};

export const useShipmentStore = create<ShipmentStore>((set) => ({
  shipments: [],
  isLoading: false,
  error: null,
  totalCount: 0,
  getAllShipments: async () => {
    set({
      isLoading: true,
      error: null
    });

    try {
      const response = await getAllShipmentsService();
      if (response.data) {
        set({
          shipments: response.data,
          isLoading: false,
          error: null
        })
      }
    } catch (error) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false
      })
    }
  },
  createShipment: async (data: {
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
    try {
      const response = await createShipmentService(data);
      if (response.data) {
        set((state) => ({
          shipments: [...state.shipments, response.data!],
          isLoading: false,
          error: null
        }))
      }
    } catch (error) {
       const err = error as AxiosError<{error: string}>;
        set({
          error: err.response?.data?.error,
          isLoading: false
        });
    }
  },
  clearError: () => {
    set({ error: null })
  }
}))

