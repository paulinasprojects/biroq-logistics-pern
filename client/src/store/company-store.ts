import { AxiosError } from "axios";
import { create } from "zustand";
import { 
    createCompany as createCompanyService, 
    deleteCompany as deleteCompanyService, 
    getCompany as getCompanyService, 
    updateCompany as updateCompanyService,
    uploadCompanyImage as uploadCompanyImageService,
    deleteCompanyImage as deleteCompanyImageService
  } 
    from "@/services/company-service";
import { CompanyState } from "@/types/company-types";

interface CompanyStore extends CompanyState {
  createCompany: (data: {
    name: string;
    address: string;
    shippingOrigin: string;
    averageMonthlyShipments: number;
    businessType: string;
  }) => Promise<void>;
  uploadCompanyImage: (file: File, id: string) => Promise<void>;
  deleteCompanyImage: (id: string) => Promise<void>;
  getCompany: () => Promise<void>;
  updateCompany: (id: string, data: {
    name: string;
    address: string;
    shippingOrigin: string;
    averageMonthlyShipments: number;
    businessType: string}) => Promise<void>;
  deleteCompany: (id: string) => Promise<void>;  
  clearError: () => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  company: null,
  isLoading: false,
  error: null,
  createCompany: async (data: {
    name: string;
    address: string;
    shippingOrigin: string;
    averageMonthlyShipments: number;
    businessType: string;
  }) => {
    set({ isLoading: true, error: null })
    try {
      const response = await createCompanyService(data);
      if (response.data) {
        set(() => ({
          company: response.data,
          isLoading: false,
          error: null
        }))
      }
    } catch (error) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false,
      })
    }
  },
  uploadCompanyImage: async (file: File, id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await uploadCompanyImageService(file, id);
      if (response.data) {
        const { image } = response.data;
        set((state) => ({
          company: state.company ? {...state.company, image} : null,
          isLoading: false,
          error: null,
        }))
      }
    } catch (error) {
       const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false,
      })
    }
  },
  deleteCompanyImage: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await deleteCompanyImageService(id);
      set((state) => ({
        company: state.company ? {...state.company, image: null} : null,
        isLoading: false,
        error: null,
      }))
    } catch (error) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false,
      })
    }
  },
  getCompany: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await getCompanyService();

      if (response.data) {
        set({
          company: response.data,
          isLoading: false,
          error: null
        })
      }
    } catch (error) {
      const err = error as AxiosError<{error: string}>;
        if (err.response?.status === 404) {
      set({ company: null, isLoading: false, error: null });
      return;
    }
      set({
        error: err.response?.data?.error,
        isLoading: false,
      })
    }
  },
  updateCompany: async (id: string, data: {
    name: string;
    address: string;
    shippingOrigin: string;
    averageMonthlyShipments: number;
    businessType: string}) => {
      set({isLoading: true, error: null})
      try {
        const response = await updateCompanyService(id, data);
        set({
          company: response.data,
          isLoading: false,
          error: null,
        })
      } catch (error) {
        const err = error as AxiosError<{error: string}>;
        set({
          error: err.response?.data?.error,
          isLoading: false,
        })
      }
  },
  deleteCompany: async (id: string) => {
    set({isLoading: true, error: null})

    try {
      await deleteCompanyService(id);
      set({
        company: null,
        isLoading: false,
        error: null,
      })
    } catch (error) {
       const err = error as AxiosError<{error: string}>;
        set({
          error: err.response?.data?.error,
          isLoading: false,
        })
    }
  },
  clearError: () => {
    set({ error: null })
  }
}));