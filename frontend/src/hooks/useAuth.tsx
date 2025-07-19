import { apiClient } from "@/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AuthStatus } from "@/types/authStatus";

export const useAuth = () => {
  const getAuthStatus = async (): Promise<AuthStatus> => {
    try {
      return (await apiClient.get("/status")).data;
    } catch (e: unknown) {
      return { email: "", status: "unauthenticated" } as AuthStatus;
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["authStatus"],
    queryFn: getAuthStatus,
  });

  return { data, isLoading, isError };
};
