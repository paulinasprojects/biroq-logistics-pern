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