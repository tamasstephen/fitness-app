import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/Sidebar";
import { authQueryOptions } from "@/api/queryOptions/authQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { QueryWrapper } from "@/components/QueryWrapper";
import { AppWrapper } from "@/components";

export const Route = createFileRoute("/auth/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const response = useQuery(authQueryOptions());

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
