import { useAuthStore } from "@/store/auth-store"
import Header from "../common/header";


const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuthStore();
  return (
    <div>
      <Header user={user} isAuthenticated={isAuthenticated} />
      <div>
        {children}
      </div>
    </div>
  )
}

export default HomeLayout