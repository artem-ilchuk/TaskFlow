import React from "react";
import { usePortal } from "../../context/PortalContext";

export const FilterInput: React.FC = () => {
  const { filterRef } = usePortal();

  return (
    <div
      ref={filterRef}
      className="hidden lg:block flex-1 max-w-2xl mx-10 min-h-11"
    />
  );
};
