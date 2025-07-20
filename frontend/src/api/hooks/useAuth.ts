import { useQuery } from "@tanstack/react-query";
import { authQueryOptions } from "../queryOptions/authQueryOptions";

export const useAuth = () => {
  return useQuery(authQueryOptions());
};
