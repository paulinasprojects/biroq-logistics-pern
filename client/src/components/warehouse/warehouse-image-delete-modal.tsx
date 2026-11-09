interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}


export default function WarehouseImageDeleteModal({ isOpen, onConfirm, onCancel, isDeleting }: Props) {

  if (!isOpen) return null;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isDeleting) {
      onCancel();
    }
  }

  return (
    <div onClick={handleClickOutside} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-sm w-full max-w-md">
          <p className="pt-8 px-5 space-y-4 text-center">
            Are you sure you want to delete this image? This action  <b>cannot</b> be undone
          </p> 
        <div className="flex gap-3 p-6">
          <button
            className="flex-1 p-3 bg-black text-white rounded-full hover:bg-black/80"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className="flex-1 p-3 text-gray-100 bg-red-700 rounded-full hover:bg-red-800"
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