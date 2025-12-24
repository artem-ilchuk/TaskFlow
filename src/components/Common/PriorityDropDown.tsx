import { FC } from "react";
import { Priority } from "../../types/operations";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { PRIORITY_MAP } from "../../constants.ts/Priority";

interface PriorityDropdownProps {
  value: Priority;
  onChange: (val: Priority) => void;
}

export const PriorityDropdown: FC<PriorityDropdownProps> = ({
  value,
  onChange,
}) => {
  const current = PRIORITY_MAP[value] || PRIORITY_MAP.medium;

  return (
    <div className="dropdown w-full">
      <label
        tabIndex={0}
        className="btn btn-bordered w-full justify-between bg-base-100 border-base-300 hover:border-primary transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              "badge badge-xs border-none shadow-xs",
              current.badge
            )}
          />
          <span className="text-[11px] font-black uppercase tracking-wider">
            {current.label}
          </span>
        </div>
        <ChevronDownIcon className="w-4 h-4 opacity-40" />
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content z-30 menu p-1 shadow-2xl bg-base-100 rounded-xl w-full border border-base-300 mt-2"
      >
        {(["low", "medium", "high"] as Priority[]).map((p) => (
          <li key={p}>
            <button
              type="button"
              onClick={() => {
                onChange(p);
                (document.activeElement as HTMLElement)?.blur();
              }}
              className="flex items-center gap-3 py-3 active:bg-base-200"
            >
              <div
                className={clsx("w-2 h-2 rounded-full", PRIORITY_MAP[p].badge)}
              />
              <span
                className={clsx(
                  "font-black text-[10px] uppercase tracking-widest",
                  PRIORITY_MAP[p].color
                )}
              >
                {PRIORITY_MAP[p].label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
