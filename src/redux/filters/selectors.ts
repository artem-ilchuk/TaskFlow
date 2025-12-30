import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import * as Ops from "../../types/operations";

export const selectProjectSearch = (state: RootState) =>
  state.filters.projectSearch;
export const selectTaskFilters = (state: RootState) =>
  state.filters.taskFilters;

export const selectFilteredProjects = createSelector(
  [
    selectProjectSearch,
    (_state: RootState, projects: Ops.IProject[]) => projects,
  ],
  (search, projects) => {
    if (!search) return projects;
    const lowerSearch = search.toLowerCase();
    return projects.filter((p) => p.title.toLowerCase().includes(lowerSearch));
  }
);

export const selectFilteredTasks = createSelector(
  [selectTaskFilters, (_state: RootState, tasks: Ops.ITask[]) => tasks],
  (filters, tasks) => {
    if (!tasks) return [];

    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description?.toLowerCase().includes(filters.search.toLowerCase());
      const matchesPriority =
        filters.priority === "all" || task.priority === filters.priority;
      const matchesStatus =
        filters.status === "all" || task.status === filters.status;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }
);
