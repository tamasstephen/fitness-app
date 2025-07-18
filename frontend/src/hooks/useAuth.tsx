import { apiClient } from "@/utils/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type AuthStatus = {
  data?: {
    email?: string;
    status: "authenticated" | "unauthenticated";
  };
};

export const useAuth = () => {
  const getAuthStatus = async (): Promise<AuthStatus> => {
    try {
      return await apiClient.get("/status");
    } catch (e: unknown) {
      const error = e as AxiosError;
      if (error.status === 401) {
        return { data: { email: "", status: "unauthenticated" } };
      }
      throw error;
    }
  };

  const {
    data: authStatus,
    isLoading: isAuthLoading,
    isError: isAuthError,
  } = useQuery({
    queryKey: ["authStatus"],
    queryFn: getAuthStatus,
  });

  return { authStatus, isAuthLoading, isAuthError };
};
