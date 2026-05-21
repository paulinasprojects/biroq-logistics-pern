import { Warehouse } from "@/types/types"
import { ImageIcon, Pencil, Trash2 } from "lucide-react"

interface Props {
  warehouse: Warehouse;
  onEditImage: (warehouseId: string) => void;
  onEditWarehouse: (warehouse: Warehouse) => void;
  onDelete: (warehouse: Warehouse) => void;
  onDeleteImage: (warehouseId: string) => void;
}


export default function WarehouseCard({ warehouse, onEditImage, onEditWarehouse, onDelete, onDeleteImage }: Props) {
  return (
    <div className="text-black bg-white flex flex-col shadow-sm gap-6 rounded-xl border border-gray-300 p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col gap-6">
        <div>
          {warehouse.image ? (
            <div className="relative">
              <img src={warehouse.image} alt="" className="rounded-md object-cover" />
              <div className="absolute top-2 right-2">
                <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 duration-300 transition" onClick={() => onDeleteImage(warehouse.id)}>
                  <Trash2 className="size-2" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <img src="https://i.sstatic.net/y9DpT.jpg" alt="" className="w-[450px] rounded-md " />
            </div>
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <span className="text-sm">{warehouse.name}</span>
          <span className="text-sm">{warehouse.address}</span>
          <span className="text-sm">{warehouse.description}</span>
          <span className="text-sm">Capacity: {warehouse.capacity}</span>
          <span className="text-sm">Occupancy: {warehouse.currentOccupancy}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button title="Edit warehouse" className="p-2 text-gray-500 hover:text-blue-400 transition-colors opacity-50" onClick={() => onEditWarehouse(warehouse)}>
          <Pencil className="size-4" />
        </button>
        <button title="Add image" className="p-2 text-gray-500 hover:text-green-400 transition-colors opacity-50" onClick={() => onEditImage(warehouse.id)}>
          <ImageIcon className="size-4" />
        </button>
        <button title="Delete warehouse" className="p-2 text-gray-500 hover:text-red-400 transition-colors opacity-50" onClick={() => onDelete(warehouse)}>
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  )
}