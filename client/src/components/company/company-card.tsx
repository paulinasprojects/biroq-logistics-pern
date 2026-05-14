import { Company } from "@/types/types";
import { Pencil } from "lucide-react";
interface Props {
  onEdit: (company: Company) => void;
  company: Company
}

const CompanyCard = ({ onEdit, company }: Props) => {
  return (
    <div className="bg-white p-6 border border-black drop-shadow-lg">
      <div className="flex justify-between">
        <div>
          {company.name}
        </div>
        <div>
          <button className="p-2" title="Edit company" onClick={() => onEdit(company)}>
            <Pencil className="size-2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCard