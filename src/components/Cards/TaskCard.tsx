import { FC, memo, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { ITask } from "../../types/operations";
import EditTaskModal from "../Modals/EditTaskModal";
import DeleteTaskModal from "../Modals/DeleteTaskModal";

interface TaskCardProps {
  task: ITask;
  index: number;
}

const TaskCard: FC<TaskCardProps> = ({ task, index }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formattedDeadline = task.deadline
    ? format(new Date(task.deadline), "dd MMM")
    : null;

  const isOverdue =
    task.deadline &&
    new Date(task.deadline) < new Date() &&
    task.status !== "Done";

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`
              group bg-base-100 p-4 rounded-2xl border border-base-300 shadow-sm 
              hover:shadow-md hover:border-primary/30 transition-all duration-200
              ${
                snapshot.isDragging
                  ? "shadow-2xl ring-4 ring-primary/10 rotate-1 z-50 bg-base-100"
                  : ""
              }
            `}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="badge badge-xs badge-ghost opacity-50 font-bold uppercase tracking-tighter">
                ID-{task.id.slice(-4)}
              </div>

              <div
                className={`dropdown dropdown-end ${
                  isMenuOpen ? "dropdown-open" : ""
                }`}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <div
                  role="button"
                  tabIndex={0}
                  className="btn btn-ghost btn-xs btn-circle opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={handleMenuClick}
                >
                  <EllipsisHorizontalIcon className="w-4 h-4" />
                </div>

                {isMenuOpen && (
                  <ul
                    className="dropdown-content z-110 menu p-2 shadow-2xl bg-base-100 border border-base-300 rounded-box w-32 font-bold text-[10px] uppercase tracking-tighter"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <li>
                      <button
                        onClick={() => {
                          setIsEditOpen(true);
                          setIsMenuOpen(false);
                        }}
                      >
                        Edit Task
                      </button>
                    </li>
                    <li>
                      <button
                        className="text-error"
                        onClick={() => {
                          setIsDeleteOpen(true);
                          setIsMenuOpen(false);
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* Title */}
            <h4 className="font-bold text-base-content leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
              {task.title}
            </h4>

            {/* Description */}
            {task.description && (
              <p className="text-xs text-base-content/60 line-clamp-2 mb-4 leading-relaxed">
                {task.description}
              </p>
            )}

            {/* Footer: Meta Info */}
            <div className="flex items-center justify-between pt-3 border-t border-base-200 mt-2">
              <div className="flex items-center gap-2">
                {formattedDeadline && (
                  <div
                    className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${
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

              <div className="flex items-center gap-2">
                {task.priority === "high" && (
                  <div
                    className="w-2 h-2 rounded-full bg-error animate-pulse"
                    title="High Priority"
                  />
                )}
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-6 h-6 ring-2 ring-base-100">
                    <span className="text-[10px] font-black uppercase">
                      {task.assignedTo?.name?.slice(0, 1) || "U"}
                    </span>
                  </div>
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
