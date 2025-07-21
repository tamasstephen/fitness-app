import { useLiveTrainings } from "@/api/hooks/useLiveTrainings";
import { useAuthStore } from "@/store/auth";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/_auth/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user_id } = useAuthStore();
  const onlineSession = useLiveTrainings(user_id);

  useEffect(() => {
    if (onlineSession.data) {
      console.log("Sessions", onlineSession.data);
    }
  }, [onlineSession.data]);

  return <div>Hello dashboard!</div>;
}
