import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/training/$id")({
  component: RouteComponent,
});

// TODO:
// - [ ] Check if the training is available for the user
// - [ ] If not, redirect to the training list
// - [ ] If the training is available, show the training details
// - [ ] If the training is not available, show a message
// - [ ] If the training is available, establish a websocket connection to the training

function RouteComponent() {
  return <div>Hello &quot;/auth/training/$id&quot;!</div>;
}
