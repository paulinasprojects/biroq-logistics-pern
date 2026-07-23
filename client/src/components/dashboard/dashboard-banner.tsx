import { ArrowRight } from "lucide-react";

export default function DashboardBanner() {
  return (
    <div className="block max-sm:hidden">
      <div className="relative">
        <img src="/banner-image.png" alt="" className="w-full h-[110px]" />
        <div className="absolute top-0 w-full p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <p className="text-white text-2xl">Network Status</p>
              <p className="text-white text-sm">All hubs operational - monitor live shipments and delivery SLA.</p>
            </div>
            <div>
              <button className="text-white text-[16px] inline-flex gap-2">
                Get started
                <ArrowRight/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
