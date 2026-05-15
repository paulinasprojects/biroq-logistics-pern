import { AxiosError } from 'axios'
import { create } from 'zustand'
import { getAllWarehouses as getAllWarehousesService, createWarehouse as createWarehouseService } from '@/services/warehouse-service'
import { WarehouseState } from '@/types/warehouse-types'

interface WarehouseStore extends WarehouseState {
  getAllWarehouses: () => Promise<void>;
  createWarehouse: (data: {
  name: string,
  address: string,
  capacity: number,
  description: string
}) => Promise<void>;
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
}
}));