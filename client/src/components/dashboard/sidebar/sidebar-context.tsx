/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState, createContext } from "react";

type SidebarContextType = {
  collapsed: boolean;
  toggleCollapse: () => void;
  mobileOpen: boolean;
  openMobile: () => void;
  closeMobile: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        toggleCollapse: () => setCollapsed((s) => !s),
        mobileOpen,
        openMobile: () => setMobileOpen(true),
        closeMobile: () => setMobileOpen(false)
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("Usesidebar must be used inside SidebarProvider");
  return ctx;
}