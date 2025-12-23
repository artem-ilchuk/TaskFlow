import { FC, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useTaskOperations } from "../hooks/useTasksApi";
import TaskColumn from "../components/UIComponents/TaskContainer";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { KANBAN_COLUMNS, TaskStatus } from "../types/operations";

const ProjectDetailsPage: FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { tasks, isLoading, updateTask } = useTaskOperations(projectId ?? "");
  const columns = useMemo(() => KANBAN_COLUMNS, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newStatus = destination.droppableId as TaskStatus;

    updateTask({ taskId: draggableId, data: { status: newStatus } });
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-gray-50/50">
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard/projects")}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            Project Board
          </h1>
        </div>
        <button className="btn btn-primary btn-sm bg-blue-600 border-none text-white gap-2 px-4 shadow-md transition-all active:scale-95">
          <PlusIcon className="w-4 h-4 stroke-2" />
          <span>New Task</span>
        </button>
      </header>

      <main className="flex-1 overflow-x-auto p-8">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 items-start h-full min-w-max">
            {columns.map((column) => (
              <div key={column.id} className="relative group">
                <TaskColumn
                  column={column}
                  tasks={tasks.filter((t) => t.status === column.id)}
                />
                <button className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-200 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </DragDropContext>
      </main>
    </div>
  );
};

export default ProjectDetailsPage;
