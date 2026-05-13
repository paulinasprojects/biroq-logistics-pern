import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { SmallLogo } from "../common/small-logo";

interface ProfileEditFormProps {
  onCancel: () => void;
}

export default function ProfileEditForm({ onCancel }: ProfileEditFormProps) {
  const { error, updateProfile, user, isLoading } = useAuthStore();
  const [firstName, setFirstName] = useState<string>(user?.firstName || "");
  const [lastName, setLastName] = useState<string>(user?.lastName || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev)
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const updateData: { firstName: string, lastName: string, email: string, password?: string } = {
      firstName,
      lastName,
      email
    };

    if (password) {
      updateData.password = password
    }

    await updateProfile(updateData);

    const { error: currentError } = useAuthStore.getState();

    if (!currentError) {
      toast.success("Profile updated successfully");
      onCancel();
    }
  }

  return (
    <div className="col-span-4 sm:col-span-3 flex flex-col gap-6 border border-[#e8e8e8] rounded-xl p-10">
      <div className="">
        <SmallLogo />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <p className="text-gray-700">Update your account information</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <span className="mt-5 text-red-400 text-sm">
            {error}
          </span>
        )}
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="first-name" className="text-sm font-medium">First Name</label>
          <input
            type="text"
            id="first-name"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isLoading}
            className="px-4 py-1 border border-slate-700 rounded-full text-gray-700 placeholder:text-sm focus:outline-none focus:border-slate-300 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="last-name" className="text-sm font-medium">Last Name</label>
          <input
            type="text"
            id="last-name"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isLoading}
            className="px-4 py-1 border border-slate-700 rounded-full text-gray-700 placeholder:text-sm focus:outline-none focus:border-slate-300 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            placeholder="E.g, email@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="px-4 py-1 border border-slate-700 rounded-full text-gray-700 placeholder:text-sm focus:outline-none focus:border-slate-300 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-1 border border-slate-700 rounded-full text-gray-700 placeholder:text-sm focus:outline-none focus:border-slate-300 transition-colors"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <button
            className="px-6 py-3 bg-amber-600 text-gray-100 rounded-full hover:bg-amber-700 transition font-medium"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Saving..." : "Save changes"}
          </button>
          <button
            type="button"
            className="px-6 py-3 bg-white text-black rounded-full border-slate-700 border-[0.5px] hover:bg-black/10 transition-colors"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}