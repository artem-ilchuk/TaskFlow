import { FC, memo } from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "../Cards/TaskCard";
import { ITask, TaskStatus } from "../../types/operations";

interface TaskColumnProps {
  column: { id: TaskStatus; title: string };
  tasks: ITask[];
}

const TaskColumn: FC<TaskColumnProps> = ({ column, tasks }) => {
  return (
    <div className="flex flex-col w-80 bg-base-200/50 rounded-2xl min-h-125">
      <div className="p-4 flex justify-between items-center">
        <h2 className="font-bold text-base-content/70 uppercase tracking-widest text-xs flex items-center gap-2">
          {column.title}
          <span className="badge badge-sm bg-base-300 border-none text-base-content/50">
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
              snapshot.isDraggingOver ? "bg-primary/5" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}

            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="border-2 border-dashed border-base-300 rounded-xl h-24 flex items-center justify-center text-base-content/20 text-[10px] uppercase font-bold">
                Drop tasks here
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default memo(TaskColumn);
