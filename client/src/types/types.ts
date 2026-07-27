export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  image: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  userId: string;
  name: string;
  address: string;
  image?: string | null;
  businessType: string;
  averageMonthlyShipments: number;
  shippingOrigin: string;
  createdAt: string;
  updatedAt: string;
  user?: User; 
}

export interface Warehouse {
  id: string;
  companyId: string;
  name: string;
  address: string;
  description: string | null;
  image?: string | null;
  capacity: number;
  currentOccupancy: number;
  createdAt: string;
  updatedAt: string;
  company?: Company;
  shipments?: Shipment[];
}


export interface WarehouseImage {
  image: string;
}

export interface CompanyImage {
   image: string;
}

export enum PackageType {
  BOX = "box",
  CUSTOMPACKAGE = "custompackage",
}

export enum ServiceType {
  STANDARD = "standard",
  EXPRESS = "express",
  SAME_DAY = "same_day",
  OVERNIGHT = "overnight",
}

export interface Shipment {
  id: string;
  warehouseId: string;
  shipmentName: string;
  senderName: string;
  senderPhoneNumber: string;
  pickupAddress: string;
  receiverName: string;
  receiverPhoneNumber: string;
  receiverNotes: string | null;
  deliveryAddress: string;
  packageType: PackageType;
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
  serviceType: ServiceType;
  serviceName: string;
  servicePrice: number;
  chargeableWeight: string;
  deliveryTimeFrame: string;
  hasPickUpToday: boolean;
  hasSaturdayDelivery: boolean;
  createdAt: string;
  updatedAt: string;
  warehouse?: Warehouse;
}