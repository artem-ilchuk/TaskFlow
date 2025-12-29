import React, { useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useTaskOperations } from "../hooks/useTasksApi";
import { useDebounce } from "../hooks/useDebounce";
import { FilterPanel } from "../components/Modals/FilterPanel";
import TaskColumn from "../components/UIComponents/TaskColumn";
import CreateTaskModule from "../components/Modals/CreateTaskModule";
import * as Ops from "../types/operations";

const ProjectDetailsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const [filters, setFilters] = useState<Ops.ITaskFilters>({
    search: "",
    priority: "all",
    status: "all",
  });

  const debouncedSearch = useDebounce(filters.search, 400);

  const activeFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [debouncedSearch, filters.priority, filters.status]
  );

  const { tasks, isLoading, updateTask } = useTaskOperations(
    projectId || "",
    activeFilters
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;

      if (!destination) return;
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const newStatus = destination.droppableId as Ops.TaskStatus;

      updateTask({
        taskId: draggableId,
        data: { status: newStatus },
      });
    },
    [updateTask]
  );

  return (
    <div className="flex flex-col gap-6">
      <FilterPanel filters={filters} setFilters={setFilters} />

      <header className="flex justify-between items-end bg-base-100 p-6 rounded-2xl border-2 border-base-300 shadow-sm">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase text-primary">
            Project_Board
          </h1>
          <p className="text-[10px] opacity-50 font-mono tracking-widest mt-1">
            NODE_ID: {projectId?.toUpperCase()}
          </p>
        </div>

        <div className="flex items-center">
          {projectId && <CreateTaskModule projectId={projectId} />}
        </div>
      </header>

      {isLoading ? (
        <div className="flex justify-center items-center py-40">
          <span className="loading loading-infinity loading-lg text-primary"></span>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x scroll-px-6 custom-scrollbar min-h-[60vh]">
            {Ops.KANBAN_COLUMNS.map((column) => (
              <div key={column.id} className="snap-start min-w-[320px]">
                <TaskColumn
                  column={column}
                  tasks={tasks.filter((t) => t.status === column.id)}
                />
              </div>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
