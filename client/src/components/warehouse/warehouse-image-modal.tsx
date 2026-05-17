import { X } from "lucide-react";
import WarehouseImageForm from "./warehouse-image-form";

interface WarehouseImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  warehouseId?: string
}

export default function WarehouseImageModal({ isOpen, onClose, warehouseId }: WarehouseImageModalProps) {

  if (!isOpen) return null;

  function handleClose() {
    onClose();
  }

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <div onClick={handleClickOutside} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-sm border border-slate-800 w-full max-w-xl">
        <div className="flex items-center justify-between p-3">
          <h2 className="text-lg font-black text-gray-500 pl-3 font-mono">Add New Image</h2>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-100 transition-colors rounded-sm hover:bg-slate-800">
            <X className="size-5" />
          </button>
        </div>
        <WarehouseImageForm onSuccess={handleClose} warehouseId={warehouseId!} />
      </div>
    </div>
  )
}