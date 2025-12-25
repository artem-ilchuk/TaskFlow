import { FC, memo, useState, useRef, useEffect } from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { ITask } from "../../types/operations";
import { PriorityBadge } from "../Common/PriorityBadge";
import EditTaskModal from "../Modals/EditTaskModal";
import DeleteTaskModal from "../Modals/DeleteTaskModal";

interface TaskCardProps {
  task: ITask;
  index: number;
}

const TaskCard: FC<TaskCardProps> = ({ task, index }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const formattedDeadline = task.deadline
    ? format(new Date(task.deadline), "dd MMM")
    : null;

  const isOverdue =
    task.deadline &&
    new Date(task.deadline) < new Date() &&
    task.status !== "Done";

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`group bg-base-100 p-4 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition-all duration-200 ${
              snapshot.isDragging
                ? "shadow-2xl ring-4 ring-primary/10 rotate-1 z-50"
                : ""
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <PriorityBadge priority={task.priority ?? "low"} />

              <div
                ref={menuRef}
                className={`dropdown dropdown-end ${
                  showMenu ? "dropdown-open" : ""
                }`}
              >
                <div
                  role="button"
                  tabIndex={0}
                  className="btn btn-ghost btn-xs btn-circle opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={toggleMenu}
                >
                  <EllipsisHorizontalIcon className="w-4 h-4" />
                </div>

                {showMenu && (
                  <ul className="dropdown-content z-100 menu p-2 shadow-2xl bg-base-100 border border-base-300 rounded-box w-32 font-bold text-[10px] uppercase tracking-tighter">
                    <li>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMenu(false);
                          setIsEditOpen(true);
                        }}
                      >
                        Edit
                      </button>
                    </li>
                    <li>
                      <button
                        className="text-error"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMenu(false);
                          setIsDeleteOpen(true);
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <h4 className="font-bold leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
              {task.title}
            </h4>

            {task.description && (
              <p className="text-xs text-base-content/60 line-clamp-2 mb-3 leading-relaxed">
                {task.description}
              </p>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-base-200">
              <div className="flex items-center gap-2">
                {formattedDeadline && (
                  <div
                    className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg uppercase ${
                      isOverdue
                        ? "bg-error/10 text-error"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <CalendarIcon className="w-3 h-3" />
                    {formattedDeadline}
                  </div>
                )}
                <div className="flex items-center gap-1 text-[10px] font-bold opacity-30">
                  <ChatBubbleLeftRightIcon className="w-3 h-3" />
                  <span>0</span>
                </div>
              </div>

              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-6 h-6 ring-2 ring-base-100 flex items-center justify-center border-none">
                  <span className="text-[10px] font-black uppercase">
                    {task.assignedTo?.name?.slice(0, 1) || "U"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>

      {isEditOpen && (
        <EditTaskModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          task={task}
        />
      )}
      {isDeleteOpen && (
        <DeleteTaskModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          taskId={task.id}
          taskTitle={task.title}
          projectId={task.projectId}
        />
      )}
    </>
  );
};

export default memo(TaskCard);
