import { FC } from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "../Cards/TaskCard";
import { ITask, TaskStatus } from "../../types/operations";

interface TaskColumnProps {
  column: { id: TaskStatus; title: string };
  tasks: ITask[];
}

const TaskColumn: FC<TaskColumnProps> = ({ column, tasks }) => {
  return (
    <div className="flex flex-col w-80 bg-gray-100/50 rounded-2xl min-h-150">
      <div className="p-4 flex justify-between items-center">
        <h2 className="font-bold text-gray-700 uppercase tracking-widest text-sm">
          {column.title}
          <span className="ml-2 badge badge-neutral badge-sm bg-gray-200 border-none text-gray-600">
            {tasks.length}
          </span>
        </h2>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-3 flex flex-col gap-3 transition-colors rounded-b-2xl ${
              snapshot.isDraggingOver ? "bg-blue-50/50" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}

            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="border-2 border-dashed border-gray-200 rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs">
                Drop tasks here
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
