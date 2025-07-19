import { AuthStatus } from "@/types/authStatus";
import { apiClient } from "../apiClient";
import { queryOptions } from "@tanstack/react-query";

export const getAuthStatus = async (): Promise<AuthStatus> => {
  try {
    return (await apiClient.get("/status")).data;
  } catch (e: unknown) {
    return { email: "", status: "unauthenticated" } as AuthStatus;
  }
};

export const authQueryOptions = () =>
  queryOptions({
    queryKey: ["authStatus"],
    queryFn: getAuthStatus,
  });
