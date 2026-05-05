import { useAuthStore } from "@/store/auth-store"
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login")
  }

  return (
    <div>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default DashboardPage