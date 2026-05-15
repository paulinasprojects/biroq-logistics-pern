import { useEffect } from "react";
import { useWarehouseStore } from "@/store/warehouse-store";
import { Loader2, Plus, WarehouseIcon } from "lucide-react";


const WarehousesPage = () => {
  const { getAllWarehouses, isLoading, warehouses, error } = useWarehouseStore();

  useEffect(() => {
    getAllWarehouses();
  }, [getAllWarehouses]);


  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 animate-spin" />
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500">{error}</p>
      </main>
    )
  }

  if (warehouses.length === 0) {
    return (
      <main>
        <div className="flex flex-col items-center justify-center gap-6 min-h-[60vh]">
          <WarehouseIcon className="size-24" />
          <div className="text-center">
            <h2>No warehouses found</h2>
            <p>Start by creating your first warehouse</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-gray-100">
            <Plus className="size-5" />
            Add a warehouse
          </button>
        </div>
      </main>
    )
  }

  return (
    <div>WarehousesPage</div>
  )
}

export default WarehousesPage