import { FC, memo } from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { ITask } from "../../types/operations";

interface TaskCardProps {
  task: ITask;
  index: number;
}

const TaskCard: FC<TaskCardProps> = ({ task, index }) => {
  // Безопасное форматирование даты дедлайна
  const formattedDeadline = task.deadline
    ? format(new Date(task.deadline), "dd MMM")
    : null;

  // Определение цвета для дедлайна (красный, если просрочен)
  const isOverdue = task.deadline && new Date(task.deadline) < new Date();

  return (
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
                ? "shadow-2xl ring-2 ring-primary/20 rotate-1 z-50"
                : ""
            }
          `}
        >
          {/* Header Card */}
          <div className="flex justify-between items-start mb-2">
            <div
              className={`badge badge-xs badge-ghost opacity-50 font-bold uppercase`}
            >
              Task-{task.id.slice(-4)}
            </div>
            <button className="btn btn-ghost btn-xs btn-circle opacity-0 group-hover:opacity-100 transition-opacity">
              <EllipsisHorizontalIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Title */}
          <h4 className="font-bold text-base-content leading-tight mb-1 group-hover:text-primary transition-colors">
            {task.title}
          </h4>

          {/* Description */}
          {task.description && (
            <p className="text-xs text-base-content/60 line-clamp-2 mb-4 leading-relaxed">
              {task.description}
            </p>
          )}

          {/* Footer Card */}
          <div className="flex items-center justify-between pt-3 border-t border-base-200 mt-2">
            <div className="flex items-center gap-2">
              {/* Deadline Badge */}
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

              {/* Comments Placeholder */}
              <div className="flex items-center gap-1 text-[10px] font-bold opacity-40">
                <ChatBubbleLeftRightIcon className="w-3 h-3" />
                <span>0</span>
              </div>
            </div>

            {/* Avatar Placeholder */}
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-6 h-6 ring-2 ring-base-100">
                <span className="text-[10px] font-black">U</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

// Используем memo для предотвращения лишних ререндеров всех карточек при перетаскивании одной
export default memo(TaskCard);
