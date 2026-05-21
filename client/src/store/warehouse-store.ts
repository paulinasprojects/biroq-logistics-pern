import { AxiosError } from 'axios'
import { create } from 'zustand'
import {
    uploadImage as uploadImageService, 
    getAllWarehouses as getAllWarehousesService, 
    createWarehouse as createWarehouseService,
    updateWarehouse as updateWarehouseService,
    deleteWarehouse as deleteWarehouseService,
    deleteWarehouseImage as deleteWarehouseImageService
  } from '@/services/warehouse-service'
import { WarehouseState } from '@/types/warehouse-types'

interface WarehouseStore extends WarehouseState {
  getAllWarehouses: () => Promise<void>;
  createWarehouse: (data: {
  name: string,
  address: string,
  capacity: number,
  description: string
}) => Promise<void>;
  uploadImage: (file: File, id: string) => Promise<void>;
  deleteWarehouseImage: (id: string) => Promise<void>;
  updateWarehouse: (id: string, data: {
    name: string,
    address: string,
    capacity: number,
    description: string
  }) => Promise<void>;
  deleteWarehouse: (id: string) => Promise<void>
  clearError: () => void;
}

export const useWarehouseStore = create<WarehouseStore>((set) => ({
  warehouses: [],
  isLoading: false,
  error: null,
  totalCount: 0,
  getAllWarehouses: async () => {
    set({
      isLoading: true,
      error: null
    });

    try {
      const response = await getAllWarehousesService();
      if (response.data) {
        set({
          warehouses: response.data,
          isLoading: false,
          error: null,
        })
      }
    } catch (error) {
       const err = error as AxiosError<{error: string}>;
        set({
          error: err.response?.data?.error,
          isLoading: false,
        })
    }
  },
  createWarehouse: async (data: {
  name: string,
  address: string,
  capacity: number,
  description: string
}) => {
  set({
    isLoading: true,
    error: null,
  });

  try {
    const response = await createWarehouseService(data);
    if (response.data) {
      set((state) => ({
        warehouses: [...state.warehouses, response.data!],
        isLoading: false,
        error: null,
      }))
    }
  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    set({
      error: err?.response?.data?.error,
      isLoading: false
    });
  }
},
 uploadImage: async (file: File, id: string) => {
  set({isLoading: true, error: null})
  try {
    const response = await uploadImageService(file, id);
    if (response.data) {
      const { image } = response.data;
      set((state) => ({
        warehouses: state.warehouses.map((w) => 
          w.id === id ? {...w, image} : w),
        isLoading: false,
        error: null
      }))
  };
  } catch (error) {
    const err = error as AxiosError<{error: string}>;
    set({
      error: err.response?.data.error,
      isLoading: false
    })
  }
 },
 deleteWarehouseImage: async (id: string) => {
  set({ isLoading: true, error: null })
  try {
    await deleteWarehouseImageService(id);
    set((state) => ({
      warehouses: state.warehouses.map((w) => w.id === id ? {...w, image: null} : w),
      isLoading: false,
      error: null,
    }))
  } catch (error) {
     const err = error as AxiosError<{error: string}>;
    set({
      error: err.response?.data.error,
      isLoading: false
    })
  }
 },
 updateWarehouse: async (id: string, data: {
    name: string,
    address: string,
    capacity: number,
    description: string
  }) => {
    set({isLoading: true, error: null})
    try {
      const response = await updateWarehouseService(id, data);
      set((state) => ({
        warehouses: state.warehouses.map((warehouse) => warehouse.id === id ? response.data! : warehouse),
        isLoading: false,
        error: null
      }));
    } catch (error) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data.error,
        isLoading: false
      });
    }
 },
 deleteWarehouse: async (id: string) => {
  set({isLoading: true, error: null});

  try {
    await deleteWarehouseService(id);
    set((state) => ({
      warehouses: state.warehouses.filter((warehouse) => warehouse.id !== id),
      totalCount: state.totalCount - 1,
      isLoading: false,
      error: null
    }))
  } catch (error) {
    const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data.error,
        isLoading: false
      });
  }
 },
 clearError: () => {
  set({error: null})
 }
}));