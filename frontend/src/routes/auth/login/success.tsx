import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/login/success")({
  component: RouteComponent,
});

const getAuthorizationResponse = createServerFn({ method: "POST" }).handler(
  async () => {
    const res = await fetch("http://localhost:5001/authorize", {
      credentials: "include",
    });
    console.log(res);
    return {
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
      headers: Object.fromEntries(res.headers.entries()),
      body: await res.text(),
    };
  }
);

function RouteComponent() {
  useEffect(() => {
    getAuthorizationResponse().then((res) => {
      console.log(res);
    });
  }, []);
  return <div>Hello "/login/success"!</div>;
}
