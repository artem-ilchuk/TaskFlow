import React, { createContext, useContext, useRef, ReactNode } from "react";

interface PortalContextType {
  filterRef: React.RefObject<HTMLDivElement | null>;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export const PortalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const filterRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContext.Provider value={{ filterRef }}>
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) throw new Error("usePortal must be used within PortalProvider");
  return context;
};
