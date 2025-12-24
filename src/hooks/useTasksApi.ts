import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ApiRequest } from "../api/api";
import * as Ops from "../types/operations";

export const useTaskOperations = (projectId: string) => {
  const queryClient = useQueryClient();
  const tasksQueryKey = ["projects", projectId, "tasks"];

  const { data: tasks, isLoading } = useQuery({
    queryKey: tasksQueryKey,
    queryFn: () => ApiRequest.getTasksByProjectId(projectId),
    enabled: !!projectId && projectId !== "undefined",
    staleTime: 1000 * 30,
  });

  const { mutate: createTask, isPending: isCreating } = useMutation({
    mutationFn: (payload: Ops.ICreateTaskPayload) =>
      ApiRequest.createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKey });
      toast.success("Task added!");
    },
    onError: (error: any) =>
      toast.error(
        error.response?.data?.message || error.message || "Failed to add task"
      ),
  });

  const { mutate: deleteTask, isPending: isDeleting } = useMutation({
    mutationFn: (taskId: string) => ApiRequest.deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKey });
      toast.success("Task deleted");
    },
    onError: (error: any) =>
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete task"
      ),
  });

  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationFn: ({
      taskId,
      data,
    }: {
      taskId: string;
      data: Partial<Ops.ITask>;
    }) => ApiRequest.updateTask(taskId, data),
    onMutate: async ({ taskId, data }) => {
      await queryClient.cancelQueries({ queryKey: tasksQueryKey });
      const previousTasks =
        queryClient.getQueryData<Ops.ITask[]>(tasksQueryKey);
      queryClient.setQueryData<Ops.ITask[]>(tasksQueryKey, (old) => {
        if (!old) return [];
        return old.map((task) =>
          task.id === taskId ? { ...task, ...data } : task
        );
      });
      return { previousTasks };
    },
    onError: (error: any, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(tasksQueryKey, context.previousTasks);
      }
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update task"
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKey });
    },
  });

  return {
    tasks: tasks ?? [],
    isLoading,
    createTask,
    isCreating,
    deleteTask,
    isDeleting,
    updateTask,
    isUpdating,
  };
};
