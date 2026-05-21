import { useEffect, useState } from "react"
import { useCompanyStore } from "@/store/company-store"
import { Building, Loader2, Plus } from "lucide-react";
import CompanyModal from "@/components/company/company-modal";
import { Company } from "@/types/types";
import CompanyCard from "@/components/company/company-card";
import DeletingCompanyModal from "@/components/company/deleting-company-modal";
import { toast } from "sonner";
import CompanyImageModal from "@/components/company/company-image-modal";
import CompanyImageDeleteModal from "@/components/company/company-image-delete-modal";

const CompanyPage = () => {
  const { isLoading, error, getCompany, company, deleteCompany, deleteCompanyImage } = useCompanyStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCompany, setEditingCompany] = useState<Company | undefined>(undefined);
  const [deletingCompany, setDeletingCompany] = useState<Company | undefined>(undefined);
  const [isDeletingCompanyModalOpen, setIsDeletingCompanyModalOpen] = useState<boolean>(false);
  const [editingCompanyImage, setEditingCompanyImage] = useState<string | undefined>(undefined);
  const [isCompanyImageModalOpen, setIsCompanyImageModalOpen] = useState<boolean>(false);
  const [deletingImage, setDeletingImage] = useState<string | null>(null);
  const [isDeletingCompanyImageModalOpen, setIsDeletingCompanyImageModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getCompany();
  }, [getCompany]);


  function handleEdit(company: Company) {
    setEditingCompany(company);
    setIsModalOpen(true)
  }

  function handleDelete(company: Company) {
    setDeletingCompany(company);
    setIsDeletingCompanyModalOpen(true)
  }

  function handleCancel() {
    setIsDeletingCompanyModalOpen(false)
    setDeletingCompany(undefined);
  }


  function handleAddCompany() {
    setEditingCompany(undefined);
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setEditingCompany(undefined)
    setIsModalOpen(false)
  }

  async function handleDeleteConfirm() {
    if (!deletingCompany) return;
    await deleteCompany(deletingCompany?.id)
    const { error: deleteError } = useCompanyStore.getState();

    if (!deleteError) {
      toast.success("Company deleted successfully")
      setIsDeletingCompanyModalOpen(false)
      setDeletingCompany(undefined);
    }
  }

  function handleEditImage(companyId: string) {
    setEditingCompanyImage(companyId);
    setIsCompanyImageModalOpen(true);
  }

  function handleCloseImageModal() {
    setIsCompanyImageModalOpen(false);
  }

  function handleDeleteImage(companyId: string) {
    setDeletingImage(companyId);
    setIsDeletingCompanyImageModalOpen(true)
  }

  async function handleDeleteCompanyImage() {
    if (!deletingImage) return;
    await deleteCompanyImage(deletingImage);
    const { error: deleteImageError } = useCompanyStore.getState();
    if (!deleteImageError) {
      setIsDeletingCompanyImageModalOpen(false);
      setDeletingImage(null)
      toast.success("Image deleted successfully");
    }
  }

  function handleCancelDeleteImage() {
    setIsDeletingCompanyImageModalOpen(false);
    setDeletingImage(null)
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


  if (!company) {
    return (
      <main>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <Building className="size-24" />
          <div className="text-center">
            <h2>No company yet</h2>
            <p>Start by creating your company</p>
          </div>
          <button onClick={handleAddCompany} className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-gray-100 hover:bg-amber-700">
            <Plus className="size-5" />
            Add a company
          </button>
        </div>
        <CompanyModal isOpen={isModalOpen} onClose={handleCloseModal} company={editingCompany} />
      </main>
    )
  }
  return (
    <main className="px-4 py-4">
      <div className="pb-4 mb-4">
        <h1 className="text-3xl font-bold text-black">Company</h1>
        <p className="text-gray-400 mt-1">Manage your company</p>
      </div>
      <div>
        <CompanyCard onEdit={handleEdit} company={company} onDelete={handleDelete} onEditImage={handleEditImage} onDeleteImage={handleDeleteImage} />
      </div>
      <CompanyModal isOpen={isModalOpen} onClose={handleCloseModal} company={editingCompany} />
      <CompanyImageModal
        isOpen={isCompanyImageModalOpen}
        onClose={handleCloseImageModal}
        companyId={editingCompanyImage}
      />
      <DeletingCompanyModal
        isOpen={isDeletingCompanyModalOpen}
        company={deletingCompany}
        onConfirm={handleDeleteConfirm}
        isDeleting={isLoading}
        onCancel={handleCancel}
      />
      <CompanyImageDeleteModal
        isOpen={isDeletingCompanyImageModalOpen}
        onConfirm={handleDeleteCompanyImage}
        onCancel={handleCancelDeleteImage}
        isDeleting={isLoading}
      />
    </main>
  )
}

export default CompanyPage