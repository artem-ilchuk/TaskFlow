import { FC, useEffect, useMemo, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useTaskOperations } from "../hooks/useTasksApi";
import TaskColumn from "../components/UIComponents/TaskContainer";
import CreateTaskModule from "../components/Modals/CreateTaskModule";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { KANBAN_COLUMNS, TaskStatus } from "../types/operations";
import { normalizeTaskStatus } from "../utils/statusNormalizer";

const ProjectDetailsPage: FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { tasks, isLoading, updateTask } = useTaskOperations(projectId ?? "");

  useEffect(() => {
    if (!projectId) navigate("/dashboard/projects", { replace: true });
  }, [projectId, navigate]);

  const tasksByStatus = useMemo(() => {
    return tasks.reduce((acc, task) => {
      const status = normalizeTaskStatus(task.status);
      if (!acc[status]) acc[status] = [];
      acc[status].push(task);
      return acc;
    }, {} as Record<TaskStatus, typeof tasks>);
  }, [tasks]);

  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;
    if (!destination) return;
    updateTask({
      taskId: draggableId,
      data: { status: destination.droppableId as TaskStatus },
    });
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-infinity loading-lg text-primary" />
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-base-200/50">
      <header className="flex items-center justify-between px-8 py-4 bg-base-100 border-b border-base-300">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard/projects")}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-black uppercase ">Project Board</h1>
        </div>
        <CreateTaskModule projectId={projectId ?? ""} />
      </header>

      <main className="flex-1 overflow-x-auto p-8 scrollbar-hide">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 items-start h-full">
            {KANBAN_COLUMNS.map((column) => (
              <TaskColumn
                key={column.id}
                column={column}
                tasks={tasksByStatus[column.id as TaskStatus] || []}
              />
            ))}
          </div>
        </DragDropContext>
      </main>
    </div>
  );
};

export default memo(ProjectDetailsPage);
