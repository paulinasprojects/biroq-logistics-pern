import { Company } from "@/types/types";
import { Pencil, Trash2 } from "lucide-react";
interface Props {
  onEdit: (company: Company) => void;
  company: Company
  onDelete: (company: Company) => void
}

const CompanyCard = ({ onEdit, onDelete, company }: Props) => {
  return (
    <div className="bg-white p-6 border border-black drop-shadow-lg">
      <div className="flex justify-between">
        <div>
          {company.name}
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-full bg-red-500 text-white" onClick={() => onDelete(company)}>
            <Trash2 className="size-2" />
          </button>
          <button className="p-2 rounded-full bg-blue-400 text-white" title="Edit company" onClick={() => onEdit(company)}>
            <Pencil className="size-2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCard