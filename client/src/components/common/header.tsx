import { useAuthStore } from "@/store/auth-store"
import { TextLogo } from "./text-logo";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@/types/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Props {
  user: User | null
  isAuthenticated: boolean;
}

export default function Header({ isAuthenticated, user }: Props) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/")
  }

  return (
    <header className="p-4 sm:px-8 sm:py-4">
      <nav className="flex items-center justify-between gap-8">
        <Link to="/" className="">
          <TextLogo />
        </Link>
        {isAuthenticated ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2">
                  <img src="https://images.pexels.com/photos/7109090/pexels-photo-7109090.jpeg" alt="" className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-black capitalize text-sm font-mono font-bold">{user?.firstName} {" "} {user?.lastName} </span>
                  <ChevronDown className="size-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col min-w-38.75 gap-4 bg-white text-black">
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex w-full items-center justify-between">
                    Go to Dashboard
                    <ChevronRight />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/profile" className="flex w-full items-center justify-between">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={handleLogout}
                    className=" rounded-full transition-colors cursor-pointer">
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-4 py-2 text-white bg-black rounded-full hover:text-white/70 hover:bg-black/80 duration-300 transition-colors cursor-pointer" >Login</Link>
            <Link to="/signup" className="px-4 py-2  bg-amber-600 text-white rounded-full cursor-pointer transition-colors duration-300 hover:text-white/70">Sign up</Link>
          </div>
        )}
      </nav>
    </header >
  )
}