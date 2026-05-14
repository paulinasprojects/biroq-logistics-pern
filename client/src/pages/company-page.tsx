import { useEffect, useState } from "react"
import { useCompanyStore } from "@/store/company-store"
import { Building, Loader2, Plus } from "lucide-react";
import CompanyModal from "@/components/company/company-modal";

const CompanyPage = () => {
  const { isLoading, error, getCompany, company } = useCompanyStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getCompany();
  }, [getCompany])


  function handleAddCompany() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 animate-spin" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }


  if (!isLoading && !company) {
    return (
      <main>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">

          <Building className="size-24" />
          <div className="text-center">
            <h2>No company yet</h2>
            <p>Start by creating your company</p>
          </div>
          <button onClick={handleAddCompany} className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-gray-100">
            <Plus className="size-5" />
            Add a company
          </button>
        </div>
        <CompanyModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </main>
    )
  }
  return (
    <div>{company?.name}</div>
  )
}

export default CompanyPage