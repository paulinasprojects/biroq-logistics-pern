import { X } from "lucide-react";
import UserImageForm from "./user-image-form";


interface UserImageModalProps {
  isOpen: boolean
  onClose: () => void
}



export default function UserImageModal({ isOpen, onClose }: UserImageModalProps) {
    if (!isOpen) return null;

    function handleClose() {
      onClose();
    }

    function handleClickOutside(e: React.MouseEvent<HTMLDivElement>) {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6" onClick={handleClickOutside}>
      <div className="bg-white rounded-sm border border-slate-800 w-full max-w-xl py-3 px-3">
        <div className="flex items-center justify-between p-3">
          <h2 className="text-lg font-bold text-gray-500">Add new Image</h2>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-100 transition-colors rounded-sm hover:bg-slate-800">
            <X className="size-5" />
          </button>
        </div>
        <UserImageForm onSuccess={handleClose}/>
      </div>
    </div>
  )
}
