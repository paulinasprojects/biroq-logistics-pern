export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
}