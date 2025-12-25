import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { ApiRequest } from "../api/api";
import { toast } from "react-hot-toast";
import { RootState } from "../redux/store";
import * as Ops from "../types/operations";

export const useProjectOperations = () => {
  const queryClient = useQueryClient();
  const { token, isLoggedIn, isRefreshing, user } = useSelector(
    (state: RootState) => state.auth
  );

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: () => ApiRequest.getProjects(),
    enabled: !!token && isLoggedIn && !isRefreshing,
    staleTime: 1000 * 60,
  });

  const createProjectMutation = useMutation({
    mutationFn: async (payload: Omit<Ops.IProjectPayload, "ownerId">) => {
      const actualId = user?.id || (user as any)?._id;
      if (!actualId) throw new Error("User ID is missing. Please re-login.");

      return ApiRequest.createProject({ ...payload, ownerId: actualId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create project");
    },
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
      toast.success("Project updated!");
    },
    onError: () => toast.error("Failed to update project"),
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) => ApiRequest.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted");
    },
    onError: () => toast.error("Failed to delete project"),
  });

  return {
    projects: projectsQuery.data ?? [],
    isLoading: projectsQuery.isLoading,

    createProject: createProjectMutation.mutateAsync,
    updateProject: updateProjectMutation.mutateAsync,
    deleteProject: deleteProjectMutation.mutateAsync,

    isCreating: createProjectMutation.isPending,
    isUpdating: updateProjectMutation.isPending,
    isDeleting: deleteProjectMutation.isPending,
  };
};
