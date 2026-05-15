import { SelectTriggerProps } from "@/types/select-types";
import React from "react";
import { useSelectContext } from "./select";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/utils";

const SelectTrigger = ({
  className,
  placeholder,
  ...props
}: React.ComponentProps<"button"> & SelectTriggerProps) => {

  const { open, setOpen, value } = useSelectContext();

  return (
    <button
      className={cn(
        "flex items-center justify-between w-full whitespace-nowrap px-3 py-2 border rounded-sm text-sm",
        "border border-slate-700 text-gray-700 placeholder:text-sm focus:outline-none focus:border-slate-300 transition-colors",
        className,
      )}
      onClick={() => setOpen(!open)}
      {...props}
      type="button"
      role="combobox"
      aria-expanded={open}
      aria-controls="select-trigger"
    >
      <span className={cn(value ? "text-gray-600" : "text-gray-500")}>
        {value ? value : (
          <span className="text-gray-500">{placeholder}</span>
        )}
      </span>
      <ChevronDown
        className={cn(
          "w-4 h-4 text-gray-500 transition-transform",
          open && "rotate-180"
        )}
      />
    </button>
  )
}

export { SelectTrigger };