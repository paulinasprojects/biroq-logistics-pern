import { Company } from "@/types/types";
import { ImageIcon, Pencil, Trash2 } from "lucide-react";
interface Props {
  onEdit: (company: Company) => void;
  company: Company
  onDelete: (company: Company) => void
  onEditImage: (companyId: string) => void;
}

const CompanyCard = ({ onEdit, onDelete, company, onEditImage }: Props) => {
  return (
    <div className="text-black bg-white flex flex-col border border-gray-100 py-12 gap-6 rounded-xl xl:px-12 transition-all duration-200">
      <div className="flex xl:flex-row flex-col  justify-between gap-6">
        <div className="flex items-center justify-center">
          {company.image ? (
            <div>
              <img src={company.image} alt="" className="rounded-md w-[350px] object-cover" />
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
            <button className="p-4 rounded-full bg-blue-400 text-white" title="Edit company" onClick={() => onEdit(company)}>
              <Pencil className="size-4" />
            </button>
            <button title="Add image" className="p-4 rounded-full text-gray-500 hover:text-green-400 transition-colors opacity-50" onClick={() => onEditImage(company.id)}>
              <ImageIcon className="size-4" />
            </button>
            <button className="p-4 rounded-full bg-red-500 text-white" title="Delete company" onClick={() => onDelete(company)}>
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyCard