import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth/success")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello You are logged in</div>;
}
