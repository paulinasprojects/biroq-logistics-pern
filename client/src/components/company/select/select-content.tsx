import React, { useEffect, useRef } from "react"
import { cn } from "@/utils/utils"
import { SelectContentProps } from "@/types/select-types"
import { useSelectContext } from "./select"

const SelectContent = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & SelectContentProps) => {
  const { open, setOpen } = useSelectContext();
  const ref = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  if (!open) return null;


  return (
    <div
      ref={ref}
      className={cn(
        "absolute left-0 -top-10 mt-1 w-full rounded-sm border shadow-md",
        "bg-black",
        className
      )}
      {...props}
      id="select-content"
      role="listbox"
    >
      {children}
    </div>
  )
}

export { SelectContent }