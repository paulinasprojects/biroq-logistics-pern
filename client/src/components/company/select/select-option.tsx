import { SelectOptionsProps } from "@/types/select-types"
import React from "react"
import { useSelectContext } from "./select"
import { cn } from "@/utils/utils";


const SelectOption = ({
  className,
  children,
  value,
  ...props
}: React.ComponentProps<"div"> & SelectOptionsProps) => {
  const { setValue, value: selectedValue } = useSelectContext();

  const isSelected = selectedValue == value;

  return (
    <div
      role="option"
      onClick={() => setValue(value)}
      className={cn(
        "px-3 py-2 text-sm cursor-pointer transition-colors rounded-sm mx-0.5 my-0.5",
        isSelected ? "text-white hover:bg-amber-600" : "text-white hover:bg-amber-600",
        className,
      )}
      {...props}
      aria-selected={isSelected}
    >
      {children}
    </div>
  )
}

export { SelectOption }