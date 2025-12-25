import React from "react";
import { Priority } from "../../types/operations";

export const PriorityBadge: React.FC<{ priority: Priority }> = ({
  priority,
}) => {
  const styles = {
    high: "bg-error/10 text-error border-error/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-success/10 text-success border-success/20",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${styles[priority]}`}
    >
      {priority}
    </span>
  );
};
