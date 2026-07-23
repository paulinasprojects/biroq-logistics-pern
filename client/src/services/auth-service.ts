import { AuthResponse, LoginRequest, SignupRequest, UpdateProfileRequest, UserImage } from "@/types/auth-types";
import { ApiResponse, User } from "@/types/types";
import api from "./api";

export const signup = async (data: SignupRequest) => {
  const response = await api.post<ApiResponse<AuthResponse>>("/auth/signup", data);
  return response.data;
};

export const login = async (data: LoginRequest) => {
  const response = await api.post<ApiResponse<AuthResponse>>("/auth/login", data);
  return response.data;
}

export const getProfile = async () => {
  const response = await api.get<ApiResponse<User>>("/profile");
  return response.data;
}

export const updateProfile = async (data: UpdateProfileRequest) => {
  const response = await api.put<ApiResponse<User>>("/profile", data);
  return response.data;
}

export const uploadUserImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post<ApiResponse<UserImage>>("/auth/user/image", formData);
  return response.data;
}

export const deleteUserImage = async () => {
  const response = await api.delete<ApiResponse<null>>("/auth/user/image");
  return response.data;
}