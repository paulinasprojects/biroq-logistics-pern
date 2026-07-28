import { useShipmentStore } from "@/store/shipment-store"
import { Package } from "lucide-react";
import ShipmentTable from "./shipment-table";
import {columns} from "./columns";

export default function ShipmentList() {
  const { shipments } = useShipmentStore();

  return (
    <div className="col-span-4 flex flex-col gap-6">
      {shipments.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Package className="size-24 text-gray-400" strokeWidth={1}/>
          <div className="text-center">
            <p className="text-xl text-gray-400 font-medium">No shipments found</p>
            <p className="text-gray-500 mt-1">Start by creating your first shipment.</p>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold text-gray-600">Your Shipments</h2>
          <ShipmentTable columns={columns} data={shipments}/>          
        </>
      )}
    </div>
  )
}
