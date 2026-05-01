export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export enum BusinessType {
  ECOMMERCE = "ecommerce",
  RETAIL = "retail",
  WHOLESALE = "wholesale",
}

export enum ShippingOrigin {
  WAREHOUSE = "warehouse",
  
}

