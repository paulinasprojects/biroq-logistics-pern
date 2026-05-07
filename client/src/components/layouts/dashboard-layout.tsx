import { SidebarProvider } from "../dashboard/sidebar/sidebar-context"
import Sidebar from "../dashboard/sidebar/sidebar"
import Navbar from "../dashboard/navbar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout