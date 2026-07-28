import { Shipment } from "@/types/types"
import { toast } from "sonner";
import { CopyIcon, Ellipsis, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../common/dropdown-menu";

interface Props {
  data: Shipment
}

export default function CellAction({data}: Props) {

   const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Shipment id copied to the clipboard");
  };

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Ellipsis/>
          <span className="sr-only">Open menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="bg-white text-black rounded-md"
      >
        <DropdownMenuItem onClick={() => onCopy(data.id)} className="focus:bg-gray-200 focus:text-black cursor-pointer">
          <CopyIcon className="w-4 h-4"/>
          Copy Id
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-gray-200 focus:text-black cursor-pointer">
          <Pencil className="w-4 h-4"/>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-gray-200 focus:text-black cursor-pointer">
          <Trash2 className="w-4 h-4"/>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}
