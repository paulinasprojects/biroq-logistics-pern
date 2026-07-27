import { Shipment } from "./types";

export interface ShipmentState {
  shipments: Shipment[];
  isLoading: boolean;
  error: string | null;
  totalCount: number;
}