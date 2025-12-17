import { Task } from "../components/UIComponents/TaskContainer";

export interface CreateNewProjectCardProps {
  onClick?: () => void;
}

export type ProjectCardProps = {
  id: string | number;
  title: string;
  description?: string;
  status?: string;
  deadline?: string;
  img?: string;
};

export type TaskCardProps = {
  task: Task;
};
