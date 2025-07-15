import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/success")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello You are logged in</div>;
}
