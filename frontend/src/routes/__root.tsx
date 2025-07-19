// src/routes/__root.tsx
/// <reference types="vite/client" />

import "@/style.scss";
import type { ReactNode } from "react";
import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { AppWrapper, Sidebar } from "@/components";
import { QueryClient, useQuery, UseQueryResult } from "@tanstack/react-query";
import { authQueryOptions } from "@/api/queryOptions/authQueryOptions";
import { AuthStatus } from "@/types/authStatus";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          title: "TanStack Start Starter",
        },
      ],
    }),
    component: RootComponent,
  }
);

function RootComponent() {
  const authQuery = useQuery(authQueryOptions());

  return (
    <RootDocument authStatus={authQuery}>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({
  children,
  authStatus,
}: Readonly<{
  children: ReactNode;
  authStatus: UseQueryResult<AuthStatus, Error>;
}>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body style={{ margin: 0 }}>
        <AppWrapper>
          <Sidebar authStatus={authStatus} />
          {children}
        </AppWrapper>
        <Scripts />
      </body>
    </html>
  );
}
