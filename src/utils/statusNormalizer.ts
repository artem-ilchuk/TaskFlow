import { TaskStatus } from "../types/operations";

export const normalizeTaskStatus = (rawStatus: string): TaskStatus => {
  const statusMap: Record<string, TaskStatus> = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done",
    review: "Review",
  };

  return (statusMap[rawStatus] || rawStatus) as TaskStatus;
};
