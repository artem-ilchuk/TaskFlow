import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { ApiRequest } from "../api/api";
import { toast } from "react-hot-toast";
import { RootState } from "../redux/store";
import { IProjectPayload, IProject } from "../types/operations";

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
    mutationFn: async (
      payload: Omit<IProjectPayload, "ownerId">
    ): Promise<IProject> => {
      const actualId = user?.id || (user as any)?._id;
      if (!actualId) throw new Error("User ID is missing. Please re-login.");

      const finalData: IProjectPayload = {
        title: payload.title,
        description: payload.description,
        ownerId: actualId,
      };

      return ApiRequest.createProject(finalData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully!");
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Failed to create project";
      toast.error(msg);
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<IProjectPayload>;
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
    isCreating: createProjectMutation.isPending,
    updateProject: updateProjectMutation.mutateAsync,
    isUpdating: updateProjectMutation.isPending,
    deleteProject: deleteProjectMutation.mutateAsync,
    isDeleting: deleteProjectMutation.isPending,
  };
};
