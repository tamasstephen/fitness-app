import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const Route = createFileRoute("/auth/_auth/online-session")({
  component: RouteComponent,
});

function RouteComponent() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const initSocket = io(import.meta.env.VITE_BACKEND_URL);
    setSocket(initSocket);
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("connected");
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("message", (data) => {
      console.log("message", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (socket && connected) {
      console.log("joining room");
      socket.emit("join_user_room", { room_id: "123" });
    }
  }, [socket, connected]);

  return <div>Hello online session!</div>;
}
