import { useNavigate } from "react-router-dom";
import { User } from "@/types/types";
import { formatDate } from "@/utils/format-date";
import { SmallLogo } from "../common/small-logo";
import EditImage from "./edit-image";

interface ProfileProps {
  user: User
  onEdit: () => void;
}

export default function Profile({ user, onEdit }: ProfileProps) {
  const navigate = useNavigate();

  return (
    <div className="grid lg:grid-cols-2 max-sm:grid-cols-1 gap-10">
      <EditImage user={user}/>
    <div className="flex flex-col gap-6 justify-between border border-[#e8e8e8] rounded-xl p-10">
      <div>
        <SmallLogo />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-gray-700">View your information</p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">First Name</label>
        <p className="text-lg text-gray-700 font-mono">{user.firstName}</p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Last Name</label>
        <p className="text-lg text-gray-700 font-mono">{user.lastName}</p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Email</label>
        <p className="text-lg text-gray-700 font-mono">{user.email}</p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Member since</label>
        <p className="text-lg text-gray-700 font-mono">{formatDate(user.createdAt)}</p>
      </div>
      <div className="flex gap-5">
        <button
          onClick={onEdit}
          className="w-full px-6 py-3  bg-amber-600 text-gray-100 rounded-full hover:bg-amber-700 transition-colors cursor-pointer font-medium">
          Edit profile
        </button>
        <button
          type="button"
          className="w-full px-6 py-3 bg-white text-black rounded-full border-slate-700 border-[0.5px] hover:bg-black/10 transition-colors"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    </div>
    </div>
  )
} 