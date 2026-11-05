import { Plus, Search } from "lucide-react"
import { useState, useEffect } from "react"
import ShipmentModal from "../shipments/shipment-modal";
import { useWarehouseStore } from "@/store/warehouse-store";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { warehouses, getAllWarehouses } = useWarehouseStore();

    useEffect(() => {
    getAllWarehouses();
  },[getAllWarehouses]);


    function handleAddShipment() {
      setIsModalOpen(true);
    } 

    function handleCloseModal() {
    setIsModalOpen(false)
  }

  return (
    <>
    <div className='border-b border-gray-300 py-3.5 px-6 max-sm:px-3'>
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4" />
          <input
            type="text"
            placeholder="Search..."
            className="min-w-82.5 max-sm:min-w-45 py-2 bg-gray-100 rounded-lg pl-8 placeholder:text-black border-none outline-none"
          />
        </div>
        <div>
          <button onClick={handleAddShipment} className="inline-flex gap-2 items-center text-gray-100 bg-amber-600 hover:bg-amber-700 transition-colors cursor-pointe px-3  py-1.5 rounded-full text-sm font-medium">
            <Plus className="size-5" />
            <span className="hidden sm:block">Create Shipment</span>
          </button>
        </div>
      </div>
    </div>
    <ShipmentModal warehouses={warehouses} isOpen={isModalOpen} onClose={handleCloseModal}/>
    </>
  )
}

export default Navbar