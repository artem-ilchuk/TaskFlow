import { FC } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { ITask } from "../../types/operations";

interface TaskCardProps {
  task: ITask;
  index: number;
}

const TaskCard: FC<TaskCardProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => console.log("Task clicked:", task.id)}
          className={`card bg-white shadow-sm border border-gray-100 p-4 rounded-xl transition-all hover:shadow-md active:scale-95 cursor-grab active:cursor-grabbing ${
            snapshot.isDragging ? "shadow-2xl ring-2 ring-blue-500/20" : ""
          }`}
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              {task.status}
            </span>
            <h3 className="text-sm font-bold text-gray-800 leading-tight">
              {task.title}
            </h3>
            {task.description && (
              <p className="text-xs text-gray-500 line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
