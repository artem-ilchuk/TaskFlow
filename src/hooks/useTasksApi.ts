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
    onError: (error: Error) =>
      toast.error(error.message || "Failed to delete task"),
  });

  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: Partial<ITask> }) =>
      ApiRequest.updateTask(taskId, data),

    onMutate: async ({ taskId, data }) => {
      await queryClient.cancelQueries({ queryKey: tasksQueryKey });

      const previousTasks = queryClient.getQueryData<ITask[]>(tasksQueryKey);

      queryClient.setQueryData<ITask[]>(tasksQueryKey, (old) => {
        if (!old) return [];
        return old.map((task) =>
          task.id === taskId ? { ...task, ...data } : task
        );
      });

      return { previousTasks };
    },

    onError: (error: Error, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(tasksQueryKey, context.previousTasks);
      }
      toast.error(error.message || "Failed to update task");
    },

    onSettled: () => {
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
