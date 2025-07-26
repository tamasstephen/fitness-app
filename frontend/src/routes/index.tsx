// src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  return (
    <div>
      <a href={`${BACKEND_URL}/login`}>Login</a>
      <h1>Hello World</h1>
    </div>
  );
}
