import { FC } from "react";
import { useUsers } from "../../hooks/useUsers";
import clsx from "clsx";

interface UserSelectProps {
  value: string | null | undefined;
  onChange: (id: string | null) => void;
}

export const UserSelect: FC<UserSelectProps> = ({ value, onChange }) => {
  const { data: users, isLoading } = useUsers();
  const selectedUser = users?.find((u) => u.id === value);

  return (
    <div className="dropdown w-full">
      <label
        tabIndex={0}
        className="btn btn-bordered w-full justify-between bg-base-200/20 border-base-300 h-11 px-3"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {selectedUser ? (
            <>
              <div className="avatar">
                <div className="w-6 h-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                  <img
                    src={
                      selectedUser.avatar ||
                      `https://ui-avatars.com/api/?name=${selectedUser.name}`
                    }
                    alt="avatar"
                  />
                </div>
              </div>
              <span className="text-[11px] font-bold truncate">
                {selectedUser.name}
              </span>
            </>
          ) : (
            <span className="text-[10px] font-black uppercase opacity-30">
              No Assignee
            </span>
          )}
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-50 menu p-2 shadow-2xl bg-base-100 rounded-xl w-full border border-base-300 mt-2 max-h-60 overflow-y-auto"
      >
        <li>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-[10px] font-black uppercase opacity-50 py-3"
          >
            Unassigned
          </button>
        </li>
        <div className="divider my-0 opacity-10" />
        {isLoading ? (
          <li className="p-4 text-center">
            <span className="loading loading-dots loading-sm" />
          </li>
        ) : (
          users?.map((user) => (
            <li key={user.id}>
              <button
                type="button"
                className={clsx(
                  "flex items-center gap-3 py-3",
                  value === user.id && "bg-primary/10"
                )}
                onClick={() => {
                  onChange(user.id);
                  (document.activeElement as HTMLElement)?.blur();
                }}
              >
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full shadow-sm">
                    <img
                      src={
                        user.avatar ||
                        `https://ui-avatars.com/api/?name=${user.name}`
                      }
                      alt={user.name}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start truncate">
                  <span className="font-bold text-xs truncate w-full">
                    {user.name}
                  </span>
                  <span className="text-[9px] opacity-40 truncate w-full">
                    {user.email}
                  </span>
                </div>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
