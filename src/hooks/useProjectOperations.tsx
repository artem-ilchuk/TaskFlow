import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiRequest, IProjectPayload } from "../api/api";

export const useProjectOperations = () => {
  const queryClient = useQueryClient();

  const createProjectMutation = useMutation({
    mutationFn: (payload: IProjectPayload) => ApiRequest.createProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return {
    createProject: createProjectMutation.mutate,
    isCreating: createProjectMutation.isPending,
  };
};
