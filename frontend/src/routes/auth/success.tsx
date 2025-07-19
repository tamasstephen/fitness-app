import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/success")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["authStatus"] });
  }, []);
  return <div>Hello You are logged in</div>;
}
