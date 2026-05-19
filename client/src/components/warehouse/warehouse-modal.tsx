import { X } from "lucide-react";
import React from "react";
import WarehouseForm from "./warehouse-form";
import { Warehouse } from "@/types/types";

interface WarehouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  warehouse?: Warehouse
}

export default function WarehouseModal({
  isOpen,
  onClose,
  warehouse
}: WarehouseModalProps) {

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
          <h2 className="text-lg font-bold text-gray-500">{warehouse ? "Edit warehouse" : "Add a new warehouse"}</h2>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-100 transition-colors rounded-sm hover:bg-slate-800">
            <X className="size-5" />
          </button>
        </div>
        <WarehouseForm onSuccess={handleClose} warehouse={warehouse} />
      </div>
    </div>
  )
}