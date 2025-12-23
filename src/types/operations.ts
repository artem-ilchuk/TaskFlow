export type TaskStatus = "TO DO" | "IN PROGRESS" | "ON REVIEW" | "DONE";

export const KANBAN_COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: "TO DO", title: "To Do" },
  { id: "IN PROGRESS", title: "In Progress" },
  { id: "ON REVIEW", title: "On Review" },
  { id: "DONE", title: "Done" },
];

export interface IProject {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  deadline?: string | null;
  img?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ITask {
  id: string;
  projectId: string;
  ownerId: string;
  title: string;
  description: string;
  status: TaskStatus;
  deadline?: string | null;
  createdAt: string;
  updatedAt: string;
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
}

export interface ProjectCardProps {
  id: string;
  title: string;
  description?: string;
  status?: string;
  deadline?: string;
  img?: string;
}

export interface TaskCardProps {
  task: ITask;
}
