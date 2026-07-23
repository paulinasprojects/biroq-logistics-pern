import DashboardBanner from "@/components/dashboard/dashboard-banner"

const DashboardPage = () => {
  return (
    <div className="w-full h-screen">
      <div className="p-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <DashboardBanner/>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage