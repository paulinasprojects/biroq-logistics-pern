import { useEffect, useState } from "react";
import { useWarehouseStore } from "@/store/warehouse-store";
import { Loader2, Plus, WarehouseIcon } from "lucide-react";
import WarehouseModal from "@/components/warehouse/warehouse-modal";
import WarehousesList from "@/components/warehouse/warehouse-list";
import { Warehouse } from "@/types/types";
import WarehouseImageModal from "@/components/warehouse/warehouse-image-modal";
import WarehouseDeleteModal from "@/components/warehouse/warehouse-delete-modal";
import WarehouseImageDeleteModal from "@/components/warehouse/warehouse-image-delete-modal";
import { toast } from "sonner";

const WarehousesPage = () => {
  const { getAllWarehouses, isLoading, warehouses, error, deleteWarehouse, deleteWarehouseImage } = useWarehouseStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | undefined>(undefined);
  const [deletingWarehouse, setDeletingWarehouse] = useState<Warehouse | undefined>(undefined);
  const [editingImage, setEditingImage] = useState<string | undefined>(undefined);
  const [deletingImage, setDeletingImage] = useState<string | null>(null);
  const [isWarehouseImageModal, setIsWarehouseImageModalOpen] = useState<boolean>(false);
  const [isDeletingWarehouseModalOpen, setIsDeletingWarehouseModalOpen] = useState<boolean>(false);
  const [isDeletingWarehouseImageModalOpen, setIsDeletingWarehouseImageModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getAllWarehouses();
  }, [getAllWarehouses]);

  function handleAddWarehouse() {
    setIsModalOpen(true)
    setEditingWarehouse(undefined);
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingWarehouse(undefined)
  }

  function handleCloseImageModal() {
    setIsWarehouseImageModalOpen(false)
  }

  function handleEditWarehouse(warehouse: Warehouse) {
    setEditingWarehouse(warehouse);
    setIsModalOpen(true);
  }
  function handleDeleteWarehouse(warehouse: Warehouse) {
    setDeletingWarehouse(warehouse);
    setIsDeletingWarehouseModalOpen(true);
  }

  function handleEditImage(warehouseId: string) {
    setEditingImage(warehouseId);
    setIsWarehouseImageModalOpen(true)
  }

  async function handleConfirmDeleteWarehouse() {
    if (!deletingWarehouse) return;
    await deleteWarehouse(deletingWarehouse.id);

    const { error: deleteError } = useWarehouseStore.getState();

    if (!deleteError) {
      setIsDeletingWarehouseModalOpen(false);
      setDeletingWarehouse(undefined)
    }
  };

  function handleDeleteImage(warehouseId: string) {
    setDeletingImage(warehouseId);
    setIsDeletingWarehouseImageModalOpen(true)
  }

  async function handleDeleteWarehouseImage() {
    if (!deletingImage) return;
    await deleteWarehouseImage(deletingImage);
    const { error: deleteImageError } = useWarehouseStore.getState();
    if (!deleteImageError) {
      setIsDeletingWarehouseImageModalOpen(false);
      setDeletingImage(null);
      toast.success("Image deleted successfully");
    }
  }

  function handleCancelDeleteImage() {
    setIsDeletingWarehouseImageModalOpen(false);
    setDeletingImage(null);
  }

  function handleCancelDelete() {
    setIsDeletingWarehouseModalOpen(false);
    setDeletingWarehouse(undefined)
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
        <WarehousesList onEditImage={handleEditImage} onEditWarehouse={handleEditWarehouse} onDelete={handleDeleteWarehouse} onDeleteImage={handleDeleteImage} />
      </div>
      <WarehouseModal isOpen={isModalOpen} onClose={handleCloseModal} warehouse={editingWarehouse} key={editingWarehouse?.id ?? "new"} />
      <WarehouseImageModal isOpen={isWarehouseImageModal} onClose={handleCloseImageModal} warehouseId={editingImage} />
      <WarehouseDeleteModal isOpen={isDeletingWarehouseModalOpen} warehouse={deletingWarehouse} onConfirm={handleConfirmDeleteWarehouse} onCancel={handleCancelDelete} isDeleting={isLoading} />
      <WarehouseImageDeleteModal
        isOpen={isDeletingWarehouseImageModalOpen}
        onConfirm={handleDeleteWarehouseImage}
        onCancel={handleCancelDeleteImage}
        isDeleting={isLoading}
      />
    </main>
  )
}

export default WarehousesPage