import {create} from "zustand";
import { AxiosError } from "axios";
import { TOKEN_KEY } from "@/services/api";
import { AuthState } from "@/types/auth-types";
import { 
    signup as signupService, 
    login as loginService, 
    getProfile as getProfileService, 
    updateProfile as updateProfileService,
    uploadUserImage as uploadUserImageService,
    deleteUserImage as deleteUserImageService,
  } from "@/services/auth-service";

interface AuthStore extends AuthState {
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<void>;
  getProfile: () => Promise<void>;
  updateProfile: (data: {firstName?: string, lastName?: string, email?: string, password?: string}) => Promise<void>;
  uploadUserImage: (file: File) => Promise<void>;
  deleteUserImage: () => Promise<void>;
  logout: () => void;
};

const savedToken = localStorage.getItem(TOKEN_KEY);

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: savedToken,
  isLoading: false,
  error: null,
  isAuthenticated: !!savedToken,
  signup: async (email: string, password: string, firstName: string, lastName: string) => {
    set({isLoading: true, error: null})
    try {
      const response = await signupService({email, password, firstName, lastName})
      if (response.data) {
        const {user} = response.data;

        set({
          user,
          isLoading: false,
        });
        return true;
      }
      return false;
    } catch (error) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false,
        isAuthenticated: false
      });
      return false;
    }
  },
  login: async(email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await loginService({ email, password });
      if (response.data) {
        const { user, token } = response.data;
        localStorage.setItem(TOKEN_KEY, token);

        set({
          user: user,
          token: token,
          isAuthenticated: true,
          isLoading: false,
        })
      }
    } catch (error) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false,
        isAuthenticated: false
      });
    }
  },
  getProfile: async () => {
    set({
      isLoading: true,
    })

    try {
      const response = await getProfileService();
      if (response.data) {
        set({
          user: response.data,
          isLoading: false,
          error: null,
        })
      }
    } catch (error) {
       const err = error as AxiosError<{error: string}>;
        if (err.response?.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        set({ user: null, token: null, isAuthenticated: false, isLoading: false, error: null });
        return;
      }
      set({ error: err.response?.data?.error, isLoading: false });
    }
  },
  updateProfile: async (data: {
    firstName?: string, 
    lastName?: string, 
    email?: string, 
    password?: string
  }) => {
    set({
      isLoading: true,
    })

    try {
      const response = await updateProfileService(data);
      if (response.data) {
        set({
          user: response.data,
          isLoading: false,
          error: null,
        })
      }
    } catch (error) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false,
        isAuthenticated: false
      });
    }
  },
  uploadUserImage: async (file: File) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await uploadUserImageService(file);
      if (response.data) {
        const { image } = response.data;
        set((state) => ({
          user: state.user ? {...state.user, image} : null,
          isLoading: false,
          error: null,
        }))
      }
    } catch (error) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false,
      });
    }
  },
  deleteUserImage: async () => {
    set({
      isLoading: true,
      error: null
    });

    try {
       await deleteUserImageService();
       set((state) => ({
        user: state.user ? {...state.user, image: null} : null,
        isLoading: false,
        error: null,
       })) 
    } catch (error) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false,
      });
    }
  },
  logout:() => {
     localStorage.removeItem(TOKEN_KEY)
     set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
     }) 
  },
}))