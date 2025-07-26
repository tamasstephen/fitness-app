import { useLiveTrainings } from "@/api/hooks/useLiveTrainings";
import { OnlineSession } from "@/pages/onlineSession/OnlineSession";
import { useAuthStore } from "@/store/auth";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { QueryWrapper } from "@/components/QueryWrapper";

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

  return (
    <QueryWrapper dataset={onlineSession}>
      {(data) => <OnlineSession items={data.items} />}
    </QueryWrapper>
  );
}
