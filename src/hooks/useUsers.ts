import { useQuery } from "@tanstack/react-query";
import { ApiRequest } from "../api/api";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => ApiRequest.getUsers(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
