import { Company } from "@/types/types";
import { ImageIcon, Pencil, Trash2 } from "lucide-react";
interface Props {
  onEdit: (company: Company) => void;
  company: Company
  onDelete: (company: Company) => void
  onEditImage: (companyId: string) => void;
  onDeleteImage: (companyId: string) => void;
}

const CompanyCard = ({ onEdit, onDelete, company, onEditImage, onDeleteImage }: Props) => {
  return (
    <div className="flex flex-col px-12 py-4">
      <div className="flex lg:flex-row flex-col justify-between items-center gap-6">
        <div className="flex items-center justify-center">
          {company.image ? (
            <div className="relative">
              <img src={company.image} alt="" className="rounded-md w-[350px] object-cover" />
              <div className="absolute top-2 left-0">
                <button title="Delete image" className="bg-red-500 text-white p-2 rounded-full hover:bg-red-400 duration-300 transition-colors" onClick={() => onDeleteImage(company.id)}>
                  <Trash2 className="size-2" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <img src="https://i.sstatic.net/y9DpT.jpg" alt="" className="w-[550px] rounded-md" />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-6 xl:gap-24">
          <div className="flex flex-col items-center gap-2">
            <span>Company name: {company.name}</span>
            <span>Company address: {company.address}</span>
            <span className="capitalize">Business type: {company.businessType}</span>
            <span>Average Monthly Shipments: {company.averageMonthlyShipments}</span>
            <span className="capitalize">Shipping origin: {company.shippingOrigin}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button className="p-4 rounded-full bg-blue-500 text-white hover:bg-blue-400  duration-300 transition-colors" title="Edit company" onClick={() => onEdit(company)}>
              <Pencil className="size-4" />
            </button>
            <button title="Add image" className="p-4 rounded-full text-gray-500 hover:text-green-400 transition-colors opacity-50" onClick={() => onEditImage(company.id)}>
              <ImageIcon className="size-4" />
            </button>
            <button className="p-4 rounded-full bg-red-500 text-white hover:bg-red-400 duration-300 transition-colors" title="Delete company" onClick={() => onDelete(company)}>
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyCard