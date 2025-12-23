import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ApiRequest } from "../api/api";
import { ICreateTaskPayload, ITask } from "../types/operations";

export const useTaskOperations = (projectId: string) => {
  const queryClient = useQueryClient();

  const tasksQueryKey = ["projects", projectId, "tasks"];

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: tasksQueryKey,
    queryFn: () => ApiRequest.getTasksByProjectId(projectId),
    enabled: !!projectId,
  });

  const { mutate: createTask, isPending: isCreating } = useMutation({
    mutationFn: (payload: ICreateTaskPayload) => ApiRequest.createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKey });
      toast.success("Task added!");
    },
    onError: (error: Error) =>
      toast.error(error.message || "Failed to add task"),
  });

  const { mutate: deleteTask, isPending: isDeleting } = useMutation({
    mutationFn: (taskId: string) => ApiRequest.deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKey });
      toast.success("Task deleted");
    },
  });

  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: Partial<ITask> }) =>
      ApiRequest.updateTask(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKey });
    },
  });

  return {
    tasks,
    isLoading,
    createTask,
    isCreating,
    deleteTask,
    isDeleting,
    updateTask,
    isUpdating,
  };
};
