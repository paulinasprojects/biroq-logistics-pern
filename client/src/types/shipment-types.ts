import { Shipment, PackageType, ServiceType } from "./types";

export interface ShipmentState {
  shipments: Shipment[];
  isLoading: boolean;
  error: string | null;
  totalCount: number;
}

export interface ShipmentFormData {
  shipmentInfo: {
    shipmentName: string;
    senderName: string;
    senderPhoneNumber: string;
    pickupAddress: string;
    receiverName: string;
    receiverPhoneNumber: string;
    receiverNotes: string | null;
    deliveryAddress: string;
  },
  packageInfo: {
    packageType: PackageType | "" | string;
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
  },
  serviceInfo: {
    serviceType: ServiceType | "" | string;
    serviceName: string;
    servicePrice: number;
    chargeableWeight: string;
    deliveryTimeFrame: string;
    hasPickUpToday: boolean;
    hasSaturdayDelivery: boolean;
  }
}

export type ShipmentFormAction = 
| {
  type: "UPDATE_SHIPMENT_INFO",
  payload: Partial<ShipmentFormData["shipmentInfo"]>;
}
| {
  type: "UPDATE_PACKAGE_INFO",
  payload: Partial<ShipmentFormData["packageInfo"]>;
}
| {
  type: "UPDATE_SERVICE_INFO",
  payload: Partial<ShipmentFormData["serviceInfo"]>;
}
| {
  type: "RESET_FORM";
};