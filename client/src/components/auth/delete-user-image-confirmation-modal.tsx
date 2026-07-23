
import { AlertTriangle } from "lucide-react";

interface DeleteUserImageConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}



export default function DeleteUserImageConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  isDeleting
}: DeleteUserImageConfirmationModalProps) {
    if (!isOpen) return null;

    function handleClickOutside(e: React.MouseEvent<HTMLDivElement>) {
      if (e.target === e.currentTarget && !isDeleting) {
        onCancel();
      }
    }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={handleClickOutside}>
      <div className="bg-white rounded-sm border border-red-900 w-full max-w-md">
        <div className="flex items-center justify-center gap-3 p-6 border-b border-slate-800">
          <div className="p-2 bg-red-900/20 rounded-sm">
            <AlertTriangle className="size-6 text-red-400"/>
          </div>
        </div>
          <div className="p-6 space-y-4">
             <p>Are you sure you want to delete this image? This action cannot be undone</p>
          </div>
           <div className="flex gap-3 p-6 justify-end">
           <button
            className="flex-1 px-6 py-3 bg-black text-white rounded-sm hover:bg-black/80"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className="flex-1 px-6 py-3 text-gray-100 bg-red-900 rounded-sm hover:bg-red-800"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}
