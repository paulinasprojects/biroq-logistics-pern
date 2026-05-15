import { X } from "lucide-react";
import React from "react";
import CompanyForm from "./company-form";
import { Company } from "@/types/types";
import { useCompanyStore } from "@/store/company-store";

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  company?: Company

}

export default function CompanyModal({ isOpen, onClose, company }: CompanyModalProps) {
  const { clearError } = useCompanyStore();

  if (!isOpen) return null;

  function handleClose() {
    onClose();
    clearError();
  }

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <div onClick={handleClickOutside} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-sm border border-slate-800 w-full max-w-xl">
        <div className="flex items-center justify-between p-3">
          <h2 className="text-lg font-bold text-gray-500 pl-3">{company ? "Edit company" : "Add new company"}</h2>
          <button onClick={handleClose} className="p-2 text-5ray-400 hover:text-gray-100 transition-colors rounded-sm hover:bg-slate-800">
            <X className="size-5" />
          </button>
        </div>
        <CompanyForm onSuccess={handleClose} company={company} />
      </div>
    </div>
  )
}