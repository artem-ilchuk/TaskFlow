import React from "react";
import { createPortal } from "react-dom";
import * as Ops from "../../types/operations";

interface FilterPanelProps {
  filters: Ops.ITaskFilters;
  setFilters: React.Dispatch<React.SetStateAction<Ops.ITaskFilters>>;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  setFilters,
}) => {
  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const slot = document.getElementById("header-filters-slot");
  if (!slot) return null;

  return createPortal(
    <div className="flex items-center gap-2 bg-base-200/80 p-1.5 rounded-xl border border-base-300 backdrop-blur-md shadow-sm">
      <div className="relative flex-1">
        <input
          name="search"
          type="text"
          className="input input-sm input-ghost w-full focus:bg-base-100 focus:outline-none"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={handleUpdate}
        />
      </div>

      <div className="flex gap-1 h-8">
        <select
          name="priority"
          className="select select-sm select-ghost text-xs focus:bg-base-100"
          value={filters.priority}
          onChange={handleUpdate}
        >
          <option value="all">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div className="divider divider-horizontal m-0"></div>

        <select
          name="status"
          className="select select-sm select-ghost text-xs focus:bg-base-100"
          value={filters.status}
          onChange={handleUpdate}
        >
          <option value="all">Status</option>
          {Ops.KANBAN_COLUMNS.map((col) => (
            <option key={col.id} value={col.id}>
              {col.title}
            </option>
          ))}
        </select>
      </div>

      <button
        className="btn btn-ghost btn-xs text-error hover:bg-error/10"
        onClick={() =>
          setFilters({ search: "", priority: "all", status: "all" })
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>,
    slot
  );
};
