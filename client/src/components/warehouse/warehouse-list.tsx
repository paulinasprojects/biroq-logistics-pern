import { useWarehouseStore } from "@/store/warehouse-store"
import WarehouseCard from "./warehouse-card";
import { Warehouse } from "lucide-react";

interface Props {
  onEditImage: (warehouseId: string) => void;
}

export default function WarehouseList({ onEditImage }: Props) {
  const { warehouses } = useWarehouseStore();

  return (
    <section className="col-span-3 flex flex-col gap-6">
      {warehouses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Warehouse className="size-24 text-black" strokeWidth={1} />
          <div className="text-center">
            <p className="text-xl text-gray-400 font-medium">No warehouses found</p>
            <p className="text-gray-500 mt-1">Start by adding your first warehouse</p>
          </div>
        </div>
      ) : (
        <>
          <div className="">
            <h2 className="text-xl font-bold text-black">Your warehouses</h2>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {warehouses.map((warehouse) => (
              <WarehouseCard
                onEditImage={onEditImage}
                warehouse={warehouse}
                key={warehouse.id}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}