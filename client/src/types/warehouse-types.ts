import { Warehouse } from "./types";

export interface WarehouseState {
  warehouses: Warehouse[],
  isLoading: boolean;
  error: string | null;
  totalCount: number;
}