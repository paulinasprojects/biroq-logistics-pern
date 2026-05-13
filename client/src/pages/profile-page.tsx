import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store"
import Profile from "@/components/profile/profile";
import ProfileEditForm from "@/components/profile/profile-edit-form";
import { Loader2 } from "lucide-react";


const ProfilePage = () => {
  const { user, error, getProfile, isLoading } = useAuthStore();
  const [mode, setMode] = useState<"view" | "edit">("view");

  useEffect(() => {
    getProfile();
  }, [getProfile])

  function handleEdit() {
    setMode("edit")
  }

  function handleCancel() {
    setMode("view")
  }

  return (
    <main className="bg-white px-4 py-8 sm:px-8 sm:py-12">
      {isLoading && (
        <div className="flex gap-5 justify-center items-center py-24">
          <Loader2 className="size-12 animate-spin transition-transform" strokeWidth={1} />
          <p>Loading profile</p>
        </div>
      )}
      {error && mode === "view" && (
        <span className="mt-5 text-red-400 text-sm">
          {error}
        </span>
      )}

      {!isLoading && user && mode === "view" && (
        <Profile user={user} onEdit={handleEdit} />
      )}

      {!isLoading && user && mode === "edit" && (
        <ProfileEditForm onCancel={handleCancel} />
      )}
    </main>
  )
}

export default ProfilePage