import { useState } from "react";
import TaskColumn from "../components/UIComponents/TaskContainer";
import { Column, Task } from "../components/UIComponents/TaskContainer";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

export const COLUMNS: Column[] = [
  { id: "TODO", title: "TO DO" },
  { id: "IN_PROGRESS", title: "IN PROGRESS" },
  { id: "DONE", title: "DONE" },
];

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "Research project", description: "GATHER", status: "TODO" },
  { id: "2", title: "Design System", description: "GROW", status: "TODO" },
  { id: "3", title: "Development", description: "PLAY", status: "TODO" },
  { id: "4", title: "fhjjf", description: "PLAfffY", status: "TODO" },
];

export const ProjectDetailsPage = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  }

  return (
    <div className="p-4">
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => (
            <TaskColumn
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
