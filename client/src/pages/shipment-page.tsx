import { useEffect } from "react"
import { useShipmentStore } from "@/store/shipment-store"
import { Loader2, Package, Plus } from "lucide-react";

const ShipmentPage = () => {
  const { getAllShipments, isLoading, shipments, error } = useShipmentStore();


  useEffect(() => {
    getAllShipments();
  },[getAllShipments]);

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 animate-spin"/>
      </main>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (shipments.length === 0) {
    return (
      <main>
        <div className="flex flex-col items-center justify-center gap-6 min-h-[60vh]">
          <Package className="size-24"/>
          <div className="text-center space-y-2">
            <h2>No shipments found</h2>
            <p>Start by creating your first shipment</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-amber-600 hover:bg-amber-700 text-gray-100 rounded-sm transition font-medium">
            <Plus className="size-5"/>
            Add a shipment
          </button>
        </div>
        {/* Modal for adding a new shipment */}
      </main>
    )
  }

  return (
    <div className="px-4 py-4">
      <div className="pb-8 mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Shipments</h1>
          <p className="text-gray-400 mt-1">Manage your shipments</p>
        </div>
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-s bg-amber-600 hover:bg-amber-700 text-gray-100"
        >
          <Plus className="size-5"/>
          <span className="hidden sm:block">Add shipment</span>
        </button>
      </div>
    </div>
  )
}

export default ShipmentPage