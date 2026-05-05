import { User } from "@/types/types";
import { formatDate } from "@/utils/format-date";
import { SmallLogo } from "../common/small-logo";

interface ProfileProps {
  user: User
  onEdit: () => void
}

export default function Profile({ user, onEdit }: ProfileProps) {
  return (
    <div className="flex flex-col gap-6 border border-[#e8e8e8] rounded-xl p-10">
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
      <button
        onClick={onEdit}
        className="px-6 py-3  bg-amber-600 text-gray-100 rounded-full hover:bg-amber-700 transition-colors cursor-pointer font-medium">
        Edit profile
      </button>
    </div>
  )
} 