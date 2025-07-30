// src/routes/index.tsx
import { useAuth } from "@/api/hooks/useAuth";
import { useAuthStore } from "@/store/auth";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const response = useAuth();
  const { setUser } = useAuthStore();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const autLinks = response.data?.user_id ? (
    <a href={`${BACKEND_URL}/auth/logout`}>Logout</a>
  ) : (
    <a href={`${BACKEND_URL}/auth/login`}>Login</a>
  );

  useEffect(() => {
    if (response.data?.user_id) {
      setUser(response.data.user_id);
    }
  }, [response.data?.user_id, setUser]);

  return (
    <div>
      {autLinks}
      <h1>Hello World</h1>
    </div>
  );
}
