import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { ApiRequest } from "../api/api";
import { toast } from "react-hot-toast";
import { RootState } from "../redux/store";
import * as Ops from "../types/operations";

const useProjectMutations = () => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.auth);

  const createMutation = useMutation({
    mutationFn: async (payload: Ops.IProjectPayload) => {
      const ownerId = user?.id || (user as any)?._id;
      if (!ownerId) throw new Error("Unauthorized: Owner ID missing");

      return ApiRequest.createProject({ ...payload, ownerId } as any);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("PROJECT_INITIALIZED");
    },
    onError: (err: any) => toast.error(err.message || "Failed to create"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => ApiRequest.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("NODE_TERMINATED");
    },
    onError: () => toast.error("Deletion failed"),
  });

  return {
    createProject: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    deleteProject: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};

export default useProjectMutations;
