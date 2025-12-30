import React from "react";
import { createPortal } from "react-dom";
import * as Ops from "../../types/operations";
import { usePortal } from "../../context/PortalContext";

interface FilterPanelProps {
  filter: Ops.ITaskFilters;
  setFilter: (payload: Partial<Ops.ITaskFilters>) => void;
  mode?: "projects" | "tasks";
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filter,
  setFilter,
  mode = "tasks",
}) => {
  const { filterRef } = usePortal();

  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilter({ [name]: value });
  };

  if (!filterRef.current) return null;

  const searchValue = filter?.search ?? "";

  return createPortal(
    <div className="flex items-center gap-2 bg-base-200/80 p-1.5 rounded-xl border border-base-300 backdrop-blur-md shadow-sm animate-in fade-in slide-in-from-top-1 duration-300">
      <div className="relative flex-1">
        <input
          name="search"
          type="text"
          className="input input-sm input-ghost w-full focus:bg-base-100 focus:outline-none font-medium"
          placeholder={
            mode === "projects" ? "Search projects..." : "Search tasks..."
          }
          value={searchValue}
          onChange={handleUpdate}
        />
      </div>

      {mode === "tasks" && (
        <div className="flex gap-1 h-8 items-center">
          <select
            name="priority"
            className="select select-sm select-ghost text-[10px] font-black uppercase tracking-tighter focus:bg-base-100"
            value={filter.priority || "all"}
            onChange={handleUpdate}
          >
            <option value="all">Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <div className="divider divider-horizontal m-0 h-4 self-center opacity-20"></div>

          <select
            name="status"
            className="select select-sm select-ghost text-[10px] font-black uppercase tracking-tighter focus:bg-base-100"
            value={filter.status || "all"}
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
      )}

      <button
        type="button"
        className="btn btn-ghost btn-xs text-error hover:bg-error/10"
        onClick={() =>
          setFilter({ search: "", priority: "all", status: "all" })
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
    filterRef.current
  );
};
