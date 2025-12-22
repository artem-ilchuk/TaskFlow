import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { ApiRequest, IProjectPayload } from "../api/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useProjectOperations = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: () => ApiRequest.getProjects(),
  });

  const createProjectMutation = useMutation({
    mutationFn: (payload: IProjectPayload) => ApiRequest.createProject(payload),
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success(
        `Project"${newProject.title}" Your project created! Let's create some tasks!`
      );
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) => ApiRequest.deleteProject(id),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      queryClient.removeQueries({ queryKey: ["tasks", deletedId] });

      toast.error("We ready didn`t need this)))");

      navigate("/");
    },
  });

  return {
    projects: projectsQuery.data ?? [],
    isLoading: projectsQuery.isLoading,
    isError: projectsQuery.isError,

    createProject: createProjectMutation.mutate,
    isCreating: createProjectMutation.isPending,

    deleteProject: deleteProjectMutation.mutate,
    isDeleting: deleteProjectMutation.isPending,
  };
};
