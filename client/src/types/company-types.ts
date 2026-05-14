import { Company } from "./types";


export interface CompanyState {
  company: Company | null;
  isLoading: boolean;
  error: string | null;
}

export enum BusinessType {
  ECOMMERCE = "ecommerce",
  RETAIL = "retail",
  WHOLESALE = "wholesale",
}

export enum ShippingOrigin {
  WAREHOUSE = "warehouse",  
}
