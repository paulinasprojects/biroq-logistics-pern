import { useEffect } from "react";
import DashboardBanner from "@/components/dashboard/dashboard-banner"
import DashboardFilters from "@/components/dashboard/dashboard-filters"
import { useShipmentStore } from "@/store/shipment-store";


const DashboardPage = () => {
    const {getAllShipments, shipments, isLoading} = useShipmentStore();

    useEffect(() => {
      getAllShipments()
    },[getAllShipments])

  return (
    <div className="w-full h-screen">
      <div className="md:p-6 max-sm:p-2">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <DashboardBanner/>
        </div>
        <DashboardFilters shipments={shipments} isLoading={isLoading}/>
      </div>
    </div>
  )
}

export default DashboardPage