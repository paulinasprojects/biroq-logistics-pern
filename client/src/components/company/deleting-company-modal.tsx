import { Company } from "@/types/types";

interface Props {
  isOpen: boolean;
  company: Company | undefined;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export default function DeletingCompanyModal({ isOpen, company, onConfirm, onCancel, isDeleting }: Props) {
  if (!company || !isOpen) return null;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isDeleting) {
      onCancel();
    }
  }


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={handleClickOutside}>
      <div className="bg-white rounded-sm  w-full max-w-md">
          <h2 className=" text-center p-6 text-lg font-bold text-gray-800">Deleting Company {company.name} ?</h2>
        <div className="p-4 space-y-4 text-center">
          <p className="text-md">Are you sure you want to delete your company? This action cannot be undone</p>
          <p className="text-sm">note: All your warehouses will also be deleted</p>
        </div>
        <div className="flex gap-3 p-4">
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