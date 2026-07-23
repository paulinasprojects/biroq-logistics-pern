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
}


export interface WarehouseImage {
  image: string;
}

export interface CompanyImage {
   image: string;
}