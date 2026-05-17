import { useEffect, useState } from "react";
import { useWarehouseStore } from "@/store/warehouse-store";
import { Loader2, Plus, WarehouseIcon } from "lucide-react";
import WarehouseModal from "@/components/warehouse/warehouse-modal";
import WarehousesList from "@/components/warehouse/warehouse-list";
// import { Warehouse } from "@/types/types";
import WarehouseImageModal from "@/components/warehouse/warehouse-image-modal";

const WarehousesPage = () => {
  const { getAllWarehouses, isLoading, warehouses, error } = useWarehouseStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | undefined>(undefined);
  const [editingImage, setEditingImage] = useState<string | undefined>(undefined);
  const [isWarehouseModalOpen, setIsWarehouseModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getAllWarehouses();
  }, [getAllWarehouses]);

  function handleAddWarehouse() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  function handleCloseImageModal() {
    setIsWarehouseModalOpen(false)
  }

  // function handleEditWarehouse(warehouse: Warehouse) {
  //   setEditingWarehouse(warehouse);
  //   setIsModalOpen(true);
  // }

  function handleEditImage(warehouseId: string) {
    setEditingImage(warehouseId);
    setIsWarehouseModalOpen(true)
  }


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
          <button onClick={handleAddWarehouse} className="flex items-center gap-2 px-4 py-3 bg-amber-600 hover:bg-amber-700 text-gray-100 rounded-sm transition font-medium">
            <Plus className="size-5" />
            Add a warehouse
          </button>
        </div>
        <WarehouseModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </main>
    )
  }

  return (
    <main className="px-4 py-4">
      <div className="pb-2 mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Warehouses</h1>
          <p className="text-gray-400 mt-1">Manage your warehouses</p>
        </div>
        <button
          onClick={handleAddWarehouse}
          className="flex items-center gap-2 px-6 py-3 rounded-sm bg-amber-600 hover:bg-amber-700 text-gray-100"
        >
          <Plus className="size-5" />
          <span className="hidden sm:block">Add warehouse</span>
        </button>
      </div>
      <div>
        <WarehousesList onEditImage={handleEditImage} />
      </div>
      <WarehouseModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <WarehouseImageModal isOpen={isWarehouseModalOpen} onClose={handleCloseImageModal} warehouseId={editingImage} />
    </main>
  )
}

export default WarehousesPage