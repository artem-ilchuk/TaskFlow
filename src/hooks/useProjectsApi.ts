import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { ApiRequest } from "../api/api";
import { toast } from "react-hot-toast";
import { RootState } from "../redux/store";
import * as Ops from "../types/operations";

export const useProjectOperations = (search?: string) => {
  const queryClient = useQueryClient();
  const { token, isLoggedIn, isRefreshing, user } = useSelector(
    (state: RootState) => state.auth
  );

  const projectsQuery = useQuery({
    queryKey: ["projects", search],
    queryFn: ({ signal }) => ApiRequest.getProjects(search, signal),
    enabled: !!token && isLoggedIn && !isRefreshing,
    staleTime: 1000 * 60,
  });

  const isLoading =
    projectsQuery.isLoading ||
    isRefreshing ||
    (isLoggedIn && !projectsQuery.data && !projectsQuery.isError);

  const createProjectMutation = useMutation({
    mutationFn: async (payload: Omit<Ops.IProjectPayload, "ownerId">) => {
      const actualId = user?.id || (user as any)?._id;
      if (!actualId) throw new Error("User ID is missing.");
      return ApiRequest.createProject({ ...payload, ownerId: actualId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created!");
    },
    onError: (error: any) => toast.error(error.message),
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Ops.IProjectPayload>;
    }) => {
      return ApiRequest.updateProject(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Updated!");
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) => ApiRequest.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Deleted!");
    },
  });

  return {
    projects: projectsQuery.data ?? [],
    isLoading,
    isError: projectsQuery.isError,
    createProject: createProjectMutation.mutateAsync,
    updateProject: updateProjectMutation.mutateAsync,
    deleteProject: deleteProjectMutation.mutateAsync,
    isCreating: createProjectMutation.isPending,
    isUpdating: updateProjectMutation.isPending,
    isDeleting: deleteProjectMutation.isPending,
  };
};
