import React, { useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useTaskOperations } from "../hooks/useTasksApi";
import { useDebounce } from "../hooks/useDebounce";
import { FilterPanel } from "../components/Modals/FilterPanel";
import TaskColumn from "../components/UIComponents/TaskColumn";
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

      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Project Board</h1>
          <p className="text-xs opacity-50 uppercase font-bold tracking-tighter mt-1">
            Managing tasks for project ID: {projectId?.slice(-8)}
          </p>
        </div>
      </header>

      {isLoading ? (
        <div className="flex justify-center items-center py-40">
          <span className="loading loading-infinity loading-lg text-primary"></span>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x scroll-px-6 custom-scrollbar">
            {Ops.KANBAN_COLUMNS.map((column) => (
              <div key={column.id} className="snap-start">
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
