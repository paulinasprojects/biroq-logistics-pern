import { useAuthStore } from "@/store/auth-store";
import { User } from "@/types/types";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import UserImageModal from "../auth/user-image-modal";
import DeleteUserImageConfirmationModal from "../auth/delete-user-image-confirmation-modal";

interface EditImageProps {
  user: User
}

export default function EditImage({ user }: EditImageProps) {
  const { deleteUserImage, isLoading } = useAuthStore();
  const [isUserImageModalOpen, setIsUserImageModalOpen] = useState<boolean>(false);
  const [isDeletingImageModalOpen, setIsDeletingImageModalOpen] = useState<boolean>(false);


  function handleEditUserImage() {
    setIsUserImageModalOpen(true)
  }

  function handleCloseImageModal() {
    setIsUserImageModalOpen(false)
  }

    function handleDeleteUserImage() {
    setIsDeletingImageModalOpen(true)
  }

  function handleCloseDeletingUserImageModal() {
    setIsDeletingImageModalOpen(false);
  }

  async function confirmDeleteUserImage() {
      await deleteUserImage();
      const { error } = useAuthStore.getState();
      if (!error) {
        setIsDeletingImageModalOpen(false)
        toast.success("Image deleted successfully")
      }
  }

  return (
    <>
      <div className="flex flex-col gap-5 border border-[#e8e8e8] rounded-xl p-10">
        <div className="flex flex-col gap-2">
          <span className="text-3xl font-bold">Image</span>
          <span className="text-sm font-normal text-gray-400">Change your image</span>
        </div>
        <div className="flex flex-col items-center">
          {user.image ? (
          <div className="relative">
          <img src={user.image} alt={`${user.firstName}'s image`} className="sm:w-[400px] max-sm:w-[350px] object-cover rounded-lg" />
            <div className="absolute top-5 right-5">
              <button onClick={handleDeleteUserImage}  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-400 duration-300 transition-colors">
              <Trash2 className="size-3"/> 
            </button>
            </div>
          </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-5">
              <div >
              <img src="/default-user.png" alt="default placeholder image" className="sm:w-[400px] max-sm:w-[350px] rounded-md object-cover" />
            </div>
                <button className="hover:underline underline-offset-4 w-full px-6 py-3  bg-amber-600 text-gray-100 rounded-full hover:bg-amber-700 transition-colors cursor-pointer font-medium" onClick={handleEditUserImage}>Upload image</button>
              <div>
                <span className="text-sm font-normal text-center text-gray-400">We only support JPG, JPEG, PNG or WEBP file. 5MB max</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <UserImageModal
        isOpen={isUserImageModalOpen}
        onClose={handleCloseImageModal}
      />
      <DeleteUserImageConfirmationModal
        onConfirm={confirmDeleteUserImage}
        isOpen={isDeletingImageModalOpen}
        onCancel={handleCloseDeletingUserImageModal}
        isDeleting={isLoading}
      />
    </>
   
  )
}
