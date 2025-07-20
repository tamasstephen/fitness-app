import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/Sidebar";
import { QueryWrapper } from "@/components/QueryWrapper";
import { AppWrapper } from "@/components";
import { useAuth } from "@/api/hooks/useAuth";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const response = useAuth();
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    if (response.data?.user_id) {
      setUser(response.data.user_id);
    }
  }, [response.data?.user_id, setUser]);

  useEffect(() => {
    if (response.data?.status === "unauthenticated") {
      clearUser();
    }
  }, [response.data?.status, clearUser]);

  return (
    <AppWrapper>
      <QueryWrapper dataset={response}>
        {(authStatus) => (
          <>
            <Sidebar authStatus={authStatus} />
            <Outlet />
          </>
        )}
      </QueryWrapper>
    </AppWrapper>
  );
}
