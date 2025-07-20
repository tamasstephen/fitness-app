import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/Sidebar";
import { QueryWrapper } from "@/components/QueryWrapper";
import { AppWrapper } from "@/components";
import { useAuth } from "@/api/hooks/useAuth";

export const Route = createFileRoute("/auth/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const response = useAuth();

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
