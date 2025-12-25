import { IUser } from "./userTypes";

export type Priority = "low" | "medium" | "high";

export const KANBAN_COLUMNS = [
  { id: "To Do", title: "To Do" },
  { id: "In Progress", title: "In Progress" },
  { id: "Review", title: "Review" },
  { id: "Done", title: "Done" },
] as const;

export type TaskStatus = (typeof KANBAN_COLUMNS)[number]["id"];

export interface ITask {
  id: string;
  _id?: string;
  projectId: string;
  ownerId: string;
  title: string;
  description: string;
  status: TaskStatus;
  deadline?: string | Date | null;
  assignedTo: IUser | null;
  priority?: Priority;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ITaskFilters {
  search: string;
  priority: Priority | "all";
  status: TaskStatus | "all";
}

export interface IProject {
  id: string;
  _id?: string;
  ownerId: string;
  title: string;
  description: string;
  deadline?: string | Date | null;
  img?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProjectPayload {
  title: string;
  description: string;
  ownerId: string;
}

export interface ICreateTaskPayload {
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  deadline?: string | Date | null;
  assignedTo?: string | null;
  priority: Priority;
}

export interface ProjectCardProps {
  id: string;
  title: string;
  description?: string;
  status?: string;
  deadline?: string | Date | null;
  img?: string | null;
}

export interface TaskCardProps {
  task: ITask;
}
