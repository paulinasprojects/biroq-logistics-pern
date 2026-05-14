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
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  userId: string;
  name: string;
  address: string;
  businessType: string;
  averageMonthlyShipments: number;
  shippingOrigin: string;
  createdAt: string;
  updatedAt: string;
  user?: User; 
}


export interface WarehouseImage {
  image: string;
}