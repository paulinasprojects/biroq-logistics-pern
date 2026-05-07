import { useIsMobile } from "@/hooks/use-mobile"
import { Plus, Search } from "lucide-react"

const Navbar = () => {
  const isMobile = useIsMobile();

  return (
    <div className='border-b border-gray-300 py-3.5 px-6 max-sm:px-3'>
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4" />
          {/* <div> */}
          <input type="text" placeholder="Search..." className="min-w-82.5 max-sm:min-w-45 py-2 bg-gray-100 rounded-lg pl-8 placeholder:text-black border-none outline-none" />
          {/* </div> */}
        </div>
        <div className="">
          <button className="inline-flex gap-2 items-center text-white bg-amber-600 px-3  py-1.5 rounded-full text-sm font-medium">
            <Plus className="size-5" />
            {!isMobile && (
              <span> Create Shipment</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar