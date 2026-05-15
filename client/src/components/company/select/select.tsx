/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import { SelectProps, SelectContextProps } from "@/types/select-types";

const SelectContext = createContext<SelectContextProps | null>(null);

const Select = ({ value, onValueChange, children, ...props }: React.ComponentProps<"div"> & SelectProps) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(value);
  const [open, setOpen] = useState<boolean>(false);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = (value: string) => {
    if (!isControlled) setInternalValue(value);
    onValueChange?.(value)
    setOpen(false)
  };

  return (
    <SelectContext.Provider
      value={{ value: currentValue, setValue, open, setOpen }}
    >
      <div className="relative w-full" {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  )
}

function useSelectContext() {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("Select subcomponents must be inside <Select>");
  return ctx;
};

export {
  Select,
  useSelectContext,
}