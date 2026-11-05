import { Shipment } from "@/types/types";
import { Ellipsis, PackageCheck, Package2, Truck, PackageX, Loader2 } from "lucide-react";

interface Props {
  shipments: Shipment[];
  isLoading: boolean;
}

export default function DashboardFilters({shipments, isLoading}: Props) {

  return (
    <div className="mt-6">
      <div className="flex justify-between max-sm:flex-col gap-6">
        <div className="md:flex gap-6 max-sm:grid">
          <button className="text-[14px] outline-1 py-2 px-2 rounded-md hover:bg-black/5">All</button> 
          <button className="text-[14px] outline-1 py-2 px-2 rounded-md hover:bg-black/5">Today</button> 
          <button className="text-[14px] outline-1 py-2 px-2 rounded-md hover:bg-black/5">Week</button> 
          <button className="text-[14px] outline-1 py-2 px-2 rounded-md hover:bg-black/5">Month</button> 
          <button className="text-[14px] outline-1 py-2 px-2 rounded-md hover:bg-black/5">Year</button> 
        </div>
        <div className="flex items-center gap-6">
          <button className="outline p-2 rounded-lg hover:bg-black/5 md:w-auto max-sm:w-full">
            Last month
          </button>
          <button className="outline p-2 rounded-lg hover:bg-black/5 md:w-auto max-sm:w-full">Previous month</button>
        </div>
      </div>
      <div className="grid xl:grid-cols-4 grid-cols-2 max-sm:grid-cols-1 gap-6 mt-6">
        <div className="border border-gray-500 rounded-xl p-6">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Package2 className="size-4" />
                <span className="text-[16px] font-medium">
                  Total Shipments
                </span>
              </div>
              <Ellipsis className="cursor-pointer hover:text-black/55"/>
            </div>
            <span className="text-2xl font-bold">
              {isLoading ? (
                <Loader2 className="animate-spin size-5"/>
              ) : (
                <span>
                  {shipments.length}
                </span>
              )}
            </span>
          </div>
        </div>
        <div className="border border-gray-500 rounded-xl p-6">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <PackageCheck className="size-4" />
                <span className="text-[16px] font-medium">
                  On-time Delivery
                </span>
              </div>
              <Ellipsis className="cursor-pointer hover:text-black/55"/>
            </div>
            <span className="text-2xl font-bold">
              0
            </span>
          </div>
        </div>
        <div className="border border-gray-500 rounded-xl p-6">
           <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Truck className="size-4" />
                <span className="text-[16px] font-medium">
                  In Transit
                </span>
              </div>
              <Ellipsis className="cursor-pointer hover:text-black/55"/>
            </div>
            <span className="text-2xl font-bold">
              0
            </span>
          </div>
        </div>
        <div className="border border-gray-500 rounded-xl p-6">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <PackageX className="size-4" />
                <span className="text-[16px] font-medium">
                  Delayed / Exception
                </span>
              </div>
              <Ellipsis className="cursor-pointer hover:text-black/55"/>
            </div>
            <span className="text-2xl font-bold">
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
